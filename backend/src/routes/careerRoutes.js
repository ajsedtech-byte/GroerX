import express from "express";

import {
  getAllCareers,
  getCareerBySlug,
} from "../controllers/careerController.js";

const router = express.Router();

router.get("/", getAllCareers);
router.get("/:slug", getCareerBySlug);

export default router;