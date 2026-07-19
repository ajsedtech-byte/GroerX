import express from "express";
import Question from "../models/Question.js";
import QuestionMapping from "../models/QuestionMapping.js";

const router = express.Router();

router.post("/bulk-upload", async (req, res) => {
  try {
    const { questions, mappings } = req.body;

    if (!Array.isArray(questions) || !Array.isArray(mappings)) {
      return res.status(400).json({
        success: false,
        message: "questions and mappings must be arrays"
      });
    }

    if (questions.length === 0 || mappings.length === 0) {
      return res.status(400).json({
        success: false,
        message: "questions or mappings cannot be empty"
      });
    }

    const questionCodes = questions.map(q => q.questionCode);
    const uniqueCodes = new Set(questionCodes);

    if (uniqueCodes.size !== questionCodes.length) {
      return res.status(400).json({
        success: false,
        message: "Duplicate questionCode found in questions"
      });
    }

    const mappingCodes = mappings.map(m => m.questionCode);

    const missingMappings = questionCodes.filter(
      code => !mappingCodes.includes(code)
    );

    if (missingMappings.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Some questions do not have mappings",
        missingMappings
      });
    }

    await Question.deleteMany({
      questionCode: { $in: questionCodes }
    });

    await QuestionMapping.deleteMany({
      questionCode: { $in: questionCodes }
    });

    await Question.insertMany(questions);
    await QuestionMapping.insertMany(mappings);

    res.status(201).json({
      success: true,
      message: "Bulk questions uploaded successfully",
      insertedQuestions: questions.length,
      insertedMappings: mappings.length
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
