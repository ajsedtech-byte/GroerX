import mongoose from "mongoose";

const CareerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: String,

  averageSalary: String,

  futureDemand: Number,

  icon: String
});

const SubjectSchema = new mongoose.Schema({
  name: String,
  description: String
});

const SkillSchema = new mongoose.Schema({
  title: String,
  score: Number
});

const StreamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },

    slug: {
      type: String,
      required: true,
      unique: true
    },

    icon: String,

    bannerImage: String,

    matchScore: {
      type: Number,
      default: 0
    },

    recommendationLevel: {
      type: String,
      enum: [
        "Excellent",
        "Very Good",
        "Good",
        "Average",
        "Low"
      ],
      default: "Good"
    },

    shortDescription: String,

    longDescription: String,

    whyRecommended: [String],

    strengths: [String],

    weaknesses: [String],

    suitableStudents: [String],

    subjectsClass11: [SubjectSchema],

    subjectsClass12: [SubjectSchema],

    careers: [CareerSchema],

    requiredSkills: [SkillSchema],

    higherStudies: [String],

    entranceExams: [String],

    colleges: [String],

    myths: [
      {
        myth: String,
        reality: String
      }
    ],

    opportunitiesIndia: [String],

    opportunitiesAbroad: [String],

    growthFields: [String],

    averagePreparationTime: String,

    recommendationReason: String,

    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Stream", StreamSchema);