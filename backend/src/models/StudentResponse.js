import mongoose from "mongoose";
const studentResponseSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    testAttemptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestAttempt",
      required: true
    },
    questionCode: {
      type: String,
      required: true
    },
    selectedOption: {
      type: String,
      required: true
    },
    answeredAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);
studentResponseSchema.index(
  { testAttemptId: 1, questionCode: 1 },
  { unique: true }
);
export default mongoose.model("StudentResponse", studentResponseSchema);
