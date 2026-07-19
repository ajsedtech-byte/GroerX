import mongoose from "mongoose";

const questionMappingSchema = new mongoose.Schema(
  {
    questionCode: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    mapping: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },

    validation: {
      theory: String,
      reason: String,
      source: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("QuestionMapping", questionMappingSchema);
