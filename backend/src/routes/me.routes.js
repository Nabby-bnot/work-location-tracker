import express from "express";
import { me } from "../controllers/me.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);
router.get("/", me);

export default router;
