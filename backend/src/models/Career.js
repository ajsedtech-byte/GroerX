import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },

    category: String,
    streamSlugs: [String],

    shortDescription: String,
    longDescription: String,

    averageSalary: String,
    futureDemand: Number,
    matchScore: Number,

    difficultyLevel: String,
    studyYears: String,
    workLifeBalance: String,

    requiredSkills: [String],
    subjectsNeeded: [String],
    entranceExams: [String],
    degrees: [String],

    pros: [String],
    cons: [String],

    roadmap: [String],

    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Career", careerSchema);