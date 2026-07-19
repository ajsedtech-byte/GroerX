import mongoose from "mongoose";

const streamRecommendationSchema = new mongoose.Schema(
  {
    slug: String,
    name: String,
    match: Number,
    reasons: [String],
    suggestedSubjects: [String],
    suggestedCareers: [String],
  },
  { _id: false }
);

const class10RecommendationSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      default: "demo-student",
      unique: true,
      index: true,
    },
    completionPercentage: {
      type: Number,
      default: 0,
    },
    completedTests: {
      type: [String],
      default: [],
    },
    topStream: {
      type: streamRecommendationSchema,
      default: null,
    },
    streams: {
      type: [streamRecommendationSchema],
      default: [],
    },
    profile: {
      hollandCode: {
        type: String,
        default: "",
      },
      strengths: {
        type: [String],
        default: [],
      },
      improvementAreas: {
        type: [String],
        default: [],
      },
      summary: {
        type: String,
        default: "",
      },
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Class10Recommendation", class10RecommendationSchema);