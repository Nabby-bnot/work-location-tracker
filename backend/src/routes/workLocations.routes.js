import express from "express";
import {
  createWorkLocation,
  deleteWorkLocation,
  getWorkLocations,
  updateWorkLocation,
} from "../controllers/workLocations.controller.js";

const router = express.Router();

router.get("/", getWorkLocations);
router.post("/", createWorkLocation);
router.put("/:id", updateWorkLocation);
router.delete("/:id", deleteWorkLocation);

export default router;
