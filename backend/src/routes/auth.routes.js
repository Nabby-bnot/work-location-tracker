import express from "express";
import { login, register } from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * POST /api/auth/login
 * body: { email, password }
 */
router.post("/login", login);

/**
 * POST /api/auth/register
 * DEV ONLY
 * body: { email, password, role? }
 */
router.post("/register", register);

export default router;
