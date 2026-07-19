import mongoose from "mongoose";

const careerReportSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    testAttemptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestAttempt",
      required: true,
      unique: true
    },

    topRiasecCode: String,

    recommendedStream: String,

    streamScores: {
      type: mongoose.Schema.Types.Mixed
    },

    confidence: Number,

    topTraits: [String],

    recommendedCareers: [String],

    reasons: [String]
  },
  { timestamps: true }
);

export default mongoose.model("CareerReport", careerReportSchema);
