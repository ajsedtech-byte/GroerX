import mongoose from "mongoose";

const studentScoreSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    testAttemptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestAttempt",
      required: true,
      unique: true,
    },

    riasec: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({
        realistic: 0,
        investigative: 0,
        artistic: 0,
        social: 0,
        enterprising: 0,
        conventional: 0,
      }),
    },

    traits: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({
        leadership: 0,
        creativity: 0,
        analyticalThinking: 0,
        teamwork: 0,
        riskTaking: 0,
        empathy: 0,
        planning: 0,
        communication: 0,
        curiosity: 0,
        decisionMaking: 0,
        handsOn: 0,
        practicalThinking: 0,
        mechanicalInterest: 0,
        scientificInterest: 0,
        businessMindset: 0,
        discipline: 0,
        confidence: 0,
        memory: 0,
        logicalReasoning: 0,
        numericalAbility: 0,
        verbalAbility: 0,
        visualThinking: 0,
        physicalFitness: 0,
        attentionToDetail: 0,
        organization: 0,
        problemSolving: 0,
      }),
    },

    stream: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({
        sciencePcm: 0,
        sciencePcb: 0,
        sciencePcmb: 0,
        commerceWithMaths: 0,
        commerceWithoutMaths: 0,
        humanities: 0,
        artsDesign: 0,
        vocationalSkillBased: 0,
        diplomaPolytechnic: 0,
        agriculture: 0,
        healthcareParamedical: 0,
        sportsPhysicalEducation: 0,
        animationMultimedia: 0,
        lawFoundation: 0,
        entrepreneurship: 0,
        aiRobotics: 0,
      }),
    },
  },
  { timestamps: true }
);

export default mongoose.model("StudentScore", studentScoreSchema);
