import mongoose from "mongoose";

const class10OptionSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    traits: {
      type: Map,
      of: Number,
      default: {},
    },
    streamWeights: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  { _id: false }
);

const class10QuestionSchema = new mongoose.Schema(
  {
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
      index: true,
    },
    testName: {
      type: String,
      required: true,
    },
    questionNo: {
      type: Number,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    dimension: {
      type: String,
      default: "",
    },
    options: {
      type: [class10OptionSchema],
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

class10QuestionSchema.index({ testType: 1, questionNo: 1 }, { unique: true });

export default mongoose.model("Class10Question", class10QuestionSchema);