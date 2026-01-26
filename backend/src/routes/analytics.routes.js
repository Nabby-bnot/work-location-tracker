import express from "express";
import { allSummary, mySummary } from "../controllers/analytics.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

router.get("/summary", mySummary);
router.get("/summary/all", allSummary);

export default router;
