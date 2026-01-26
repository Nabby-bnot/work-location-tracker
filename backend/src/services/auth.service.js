import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db/index.js";

const SALT_ROUNDS = 10;

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set in environment variables");
}

/**
 * Register a new user (DEV / internal use for now)
 */
export async function registerUser(email, password, role = "EMPLOYEE") {
  if (!email || !password) {
    throw new Error("email and password are required");
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const { rows } = await pool.query(
    `
    INSERT INTO users (email, password_hash, role)
    VALUES ($1, $2, $3)
    RETURNING id, email, role
    `,
    [email, passwordHash, role],
  );

  return rows[0];
}

/**
 * Authenticate user and issue JWT
 */
export async function loginUser(email, password) {
  if (!email || !password) {
    throw new Error("email and password are required");
  }

  const { rows } = await pool.query(
    `
    SELECT id, email, password_hash, role
    FROM users
    WHERE email = $1
      AND is_active = true
    `,
    [email],
  );

  if (!rows.length) {
    throw new Error("Invalid credentials");
  }

  const user = rows[0];

  const isValidPassword = await bcrypt.compare(password, user.password_hash);

  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      sub: user.id,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    },
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
}
