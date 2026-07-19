import express from "express";

import {
  createStudent,
  startTest,
  getQuestions,
  submitAnswer,
  getLiveScore,
  completeTest
} from "../controllers/testcontroller.js";

const router = express.Router();

router.post("/students", createStudent);

router.post("/start", startTest);

router.get("/questions", getQuestions);

router.post("/answer", submitAnswer);

router.get("/:attemptId/live-score", getLiveScore);

router.post("/:attemptId/complete", completeTest);

export default router;