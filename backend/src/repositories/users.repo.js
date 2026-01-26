import pool from "../db/index.js";

export async function getUserById(userId) {
  const { rows } = await pool.query(
    `
    SELECT id, email, role
    FROM users
    WHERE id = $1
      AND is_active = true
    `,
    [userId],
  );

  return rows[0];
}
