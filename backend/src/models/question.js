import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
  {
    key: String,
    text: String
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    questionCode: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    assessmentCode: {
      type: String,
      default: "RIASEC_120"
    },

    section: {
      type: String,
      default: "RIASEC"
    },

    dimension: {
      type: String,
      required: true
    },

    subDimension: {
      type: String
    },

    questionText: {
      type: String,
      required: true
    },

    questionType: {
      type: String,
      enum: ["likert", "mcq", "scenario"],
      default: "likert"
    },

    options: [optionSchema],

    order: {
      type: Number,
      required: true
    },

    isReverseScored: {
      type: Boolean,
      default: false
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);