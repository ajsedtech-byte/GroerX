import Student from "../models/Student.js";
import Question from "../models/Question.js";
import QuestionMapping from "../models/QuestionMapping.js";
import StudentResponse from "../models/StudentResponse.js";
import TestAttempt from "../models/testAttempt.js";
import StudentScore from "../models/studentScore.js";
import CareerReport from "../models/careerReport.js";

import { applyMapping } from "../services/scoringService.js";
import { buildReport } from "../services/recommendationService.js";

export async function createStudent(req, res) {
  try {
    const { name, email, age } = req.body;

    const student = await Student.create({
      name,
      email,
      age,
      className: "10"
    });

    res.status(201).json({
      success: true,
      student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export async function startTest(req, res) {
  try {
    const { studentId, assessmentCode = "RIASEC_120" } = req.body;

    const totalQuestions = await Question.countDocuments({
      assessmentCode,
      isActive: true
    });

    const attempt = await TestAttempt.create({
      studentId,
      assessmentCode,
      totalQuestions
    });

    const score = await StudentScore.create({
      studentId,
      testAttemptId: attempt._id
    });

    res.status(201).json({
      success: true,
      attempt,
      score
    });
  } catch (error) {
    console.error("START TEST ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export async function getQuestions(req, res) {
  try {
   const { assessmentCode = "RIASEC_100" } = req.query;

    const questions = await Question.find({
      assessmentCode,
      isActive: true
    })
      .select("-__v")
      .sort({ order: 1 });

    res.json({
      success: true,
      questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export async function submitAnswer(req, res) {
  try {
    const {
      studentId,
      testAttemptId,
      questionCode,
      selectedOption
    } = req.body;

    await StudentResponse.findOneAndUpdate(
      { testAttemptId, questionCode },
      {
        studentId,
        testAttemptId,
        questionCode,
        selectedOption,
        answeredAt: new Date()
      },
      { upsert: true, new: true }
    );

    const mappingDoc = await QuestionMapping.findOne({ questionCode });

    if (!mappingDoc) {
      return res.status(404).json({
        success: false,
        message: "Question mapping not found"
      });
    }

    const selectedMapping = mappingDoc.mapping[selectedOption];

    if (!selectedMapping) {
      return res.status(400).json({
        success: false,
        message: "Invalid selected option"
      });
    }

    let scoreDoc = await StudentScore.findOne({ testAttemptId });

    if (!scoreDoc) {
      scoreDoc = await StudentScore.create({
        studentId,
        testAttemptId
      });
    }

    applyMapping(scoreDoc, selectedMapping);

    await scoreDoc.save();

    await TestAttempt.findByIdAndUpdate(testAttemptId, {
      $inc: { currentQuestion: 1 }
    });

    res.json({
      success: true,
      message: "Answer saved successfully",
      scores: scoreDoc
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export async function getLiveScore(req, res) {
  try {
    const score = await StudentScore.findOne({
      testAttemptId: req.params.attemptId
    });

    res.json({
      success: true,
      score
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export async function completeTest(req, res) {
  try {
    const attempt = await TestAttempt.findById(req.params.attemptId);

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Attempt not found"
      });
    }

    const scores = await StudentScore.findOne({
      testAttemptId: attempt._id
    });

    const reportData = buildReport(scores || {});

    const report = await CareerReport.findOneAndUpdate(
      { testAttemptId: attempt._id },
      {
        studentId: attempt.studentId,
        testAttemptId: attempt._id,
        ...reportData
      },
      { upsert: true, new: true }
    );

    attempt.status = "completed";
    attempt.completedAt = new Date();

    await attempt.save();

    res.json({
      success: true,
      report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}