import mongoose from "mongoose";

const testAttemptSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    assessmentCode: {
      type: String,
      default: "RIASEC_120"
    },

    status: {
      type: String,
      enum: ["in-progress", "completed"],
      default: "in-progress"
    },

    currentQuestion: {
      type: Number,
      default: 0
    },

    totalQuestions: {
      type: Number,
      default: 0
    },

    startedAt: {
      type: Date,
      default: Date.now
    },

    completedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

export default mongoose.model("TestAttempt", testAttemptSchema);
