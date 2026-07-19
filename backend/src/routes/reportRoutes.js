import express from "express";
import { getReport } from "../controllers/reportcontroller.js";
const router = express.Router();

router.get("/:attemptId", getReport);

export default router;