import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Class10Question from "../models/class10Question.js";
import { riasecQuestions } from "../data/riasecQuestions.js";

async function seedRiasecQuestions() {
  try {
    await connectDB();

    console.log("Questions found in riasecQuestions.js:", riasecQuestions.length);

    if (!Array.isArray(riasecQuestions) || riasecQuestions.length === 0) {
      throw new Error("riasecQuestions.js is empty or not exported correctly.");
    }

    console.log("Deleting all old RIASEC questions...");

    await Class10Question.deleteMany({
      testType: "riasec",
    });

    console.log("Old RIASEC questions deleted.");

    const questionsToInsert = riasecQuestions.map((question, index) => ({
      classLevel: "class10",
      testType: "riasec",
      testName: "RIASEC Interest Test",

      round: question.round || Math.ceil((index + 1) / 20),
      questionNo: question.questionNo || index + 1,

      questionText: question.questionText,
      question: question.questionText,

      dimension: question.dimension || "RIASEC",
      questionType: question.questionType || "single-choice",

      options: question.options || [],

      scoring: question.scoring || {
        type: "riasec-option-map",
        selectedOptionScore: 5,
        mapping: {
          A: "R",
          B: "I",
          C: "A",
          D: "S",
          E: "E",
          F: "C",
        },
      },

      isActive: true,
      active: true,

      meta: {
        source: "GroerX RIASEC Question Bank",
        originalId: question.id,
      },
    }));

    await Class10Question.insertMany(questionsToInsert);

    const finalCount = await Class10Question.countDocuments({
      testType: "riasec",
    });

    console.log("RIASEC seed completed successfully.");
    console.log("Inserted questions:", finalCount);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("RIASEC seed failed:", error.message);
    await mongoose.connection.close().catch(() => {});
    process.exit(1);
  }
}

seedRiasecQuestions();