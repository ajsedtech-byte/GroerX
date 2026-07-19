import mongoose from "mongoose";

const class10AnswerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    selectedKey: {
      type: String,
      required: true,
    },
    selectedText: {
      type: String,
      default: "",
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const class10ResultSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      default: "demo-student",
      index: true,
    },
    testType: {
      type: String,
      required: true,
      enum: [
        "riasec",
        "aptitude",
        "personality",
        "academic-style",
        "situational-iq",
        "values",
        "confidence",
      ],
    },
    testName: {
      type: String,
      required: true,
    },
    answers: {
      type: [class10AnswerSchema],
      default: [],
    },
    totalScore: {
      type: Number,
      default: 0,
    },
    maxScore: {
      type: Number,
      default: 0,
    },
    percentage: {
      type: Number,
      default: 0,
    },
    traitScores: {
      type: Map,
      of: Number,
      default: {},
    },
    streamScores: {
      type: Map,
      of: Number,
      default: {},
    },
    completed: {
      type: Boolean,
      default: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

class10ResultSchema.index({ studentId: 1, testType: 1 }, { unique: true });

export default mongoose.model("Class10Result", class10ResultSchema);