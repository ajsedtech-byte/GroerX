import express from "express";

import {
  getAllStreams,
  getStreamBySlug,
  getRecommendedStream,
} from "../controllers/streamController.js";

const router = express.Router();

router.get("/", getAllStreams);

router.get("/recommended/:studentId", getRecommendedStream);

router.get("/:slug", getStreamBySlug);

export default router;