import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDB from "./src/config/db.js";
import Class10Question from "./src/models/class10Question.js";

const scoring = {
  type: "riasec-option-map",
  selectedOptionScore: 5,
  mapping: {
    A: "R",
    B: "I",
    C: "A",
    D: "S",
    E: "E",
    F: "C",
  },
};

const makeOptions = (a, b, c, d, e, f) => [
  {
    key: "A",
    text: a,
    score: 5,
    riasec: "R",
    dimension: "Realistic",
    traits: { realistic: 5 },
    streamWeights: { vocational: 4, "science-pcm": 2 },
  },
  {
    key: "B",
    text: b,
    score: 5,
    riasec: "I",
    dimension: "Investigative",
    traits: { investigative: 5 },
    streamWeights: { "science-pcm": 4, "science-pcb": 3 },
  },
  {
    key: "C",
    text: c,
    score: 5,
    riasec: "A",
    dimension: "Artistic",
    traits: { artistic: 5 },
    streamWeights: { "arts-humanities": 4, vocational: 2 },
  },
  {
    key: "D",
    text: d,
    score: 5,
    riasec: "S",
    dimension: "Social",
    traits: { social: 5 },
    streamWeights: { "arts-humanities": 4, "science-pcb": 2 },
  },
  {
    key: "E",
    text: e,
    score: 5,
    riasec: "E",
    dimension: "Enterprising",
    traits: { enterprising: 5 },
    streamWeights: { commerce: 4, "arts-humanities": 2 },
  },
  {
    key: "F",
    text: f,
    score: 5,
    riasec: "C",
    dimension: "Conventional",
    traits: { conventional: 5 },
    streamWeights: { commerce: 4, "science-pcm": 1.5 },
  },
];

const riasecQuestions = [
  {
    questionNo: 1,
    questionText: "Which activity would you enjoy the most during your summer vacation?",
    options: makeOptions(
      "Repairing a bicycle or fixing electronic gadgets",
      "Performing science experiments",
      "Painting a beautiful landscape",
      "Teaching children in your neighborhood",
      "Selling handmade products online",
      "Organizing books in a library"
    ),
  },
  {
    questionNo: 2,
    questionText: "Your school starts six new clubs. Which one do you join first?",
    options: makeOptions(
      "Robotics Club",
      "Science Club",
      "Drama Club",
      "Community Service Club",
      "Entrepreneurship Club",
      "Finance Club"
    ),
  },
  {
    questionNo: 3,
    questionText: "Which YouTube channel would you watch first?",
    options: makeOptions(
      "DIY Machine Building",
      "Space Science",
      "Digital Art",
      "Psychology",
      "Startup Stories",
      "Productivity Tips"
    ),
  },
  {
    questionNo: 4,
    questionText: "If your school announces a competition, which one excites you the most?",
    options: makeOptions(
      "Robotics Competition",
      "Science Quiz",
      "Poster Design",
      "Debate Competition",
      "Business Pitch",
      "Data Management Challenge"
    ),
  },
  {
    questionNo: 5,
    questionText: "You receive ₹10,000 for a school project. What would you build?",
    options: makeOptions(
      "A robot",
      "A research experiment",
      "An art exhibition",
      "A community learning center",
      "A student startup",
      "A school database"
    ),
  },
  {
    questionNo: 6,
    questionText: "Which type of homework do you enjoy most?",
    options: makeOptions(
      "Building a working model",
      "Research report",
      "Creative presentation",
      "Group awareness campaign",
      "Business plan",
      "Spreadsheet work"
    ),
  },
  {
    questionNo: 7,
    questionText: "Which activity sounds most exciting?",
    options: makeOptions(
      "Repairing a computer",
      "Discovering a new planet",
      "Designing a game character",
      "Helping an elderly person",
      "Running a company",
      "Organizing school records"
    ),
  },
  {
    questionNo: 8,
    questionText: "If you could spend one day with a professional, who would it be?",
    options: makeOptions(
      "Mechanical Engineer",
      "Scientist",
      "Film Director",
      "Teacher",
      "CEO",
      "Chartered Accountant"
    ),
  },
  {
    questionNo: 9,
    questionText: "Which school subject would you study even if there were no exams?",
    options: makeOptions(
      "Robotics",
      "Physics",
      "Fine Arts",
      "Psychology",
      "Business Studies",
      "Mathematics"
    ),
  },
  {
    questionNo: 10,
    questionText: "Your dream room would mostly contain",
    options: makeOptions(
      "Machines and tools",
      "Science books",
      "Paintings and music",
      "People and discussions",
      "Business magazines",
      "Files and planners"
    ),
  },
  {
    questionNo: 11,
    questionText: "You are asked to organize a school event. Which responsibility do you choose?",
    options: makeOptions(
      "Stage setup",
      "Research and facts",
      "Decorations",
      "Managing volunteers",
      "Sponsorship",
      "Registration desk"
    ),
  },
  {
    questionNo: 12,
    questionText: "Which activity gives you the most satisfaction?",
    options: makeOptions(
      "Building something useful",
      "Solving a difficult problem",
      "Creating something beautiful",
      "Helping someone succeed",
      "Leading a team",
      "Keeping everything organized"
    ),
  },
  {
    questionNo: 13,
    questionText: "What would you rather buy with your savings?",
    options: makeOptions(
      "Tool kit",
      "Telescope",
      "Graphic tablet",
      "Charity books",
      "Small business supplies",
      "Planner and stationery"
    ),
  },
  {
    questionNo: 14,
    questionText: "Which summer camp would you attend?",
    options: makeOptions(
      "Adventure Engineering",
      "Space Science",
      "Creative Arts",
      "Leadership & Service",
      "Entrepreneurship",
      "Financial Literacy"
    ),
  },
  {
    questionNo: 15,
    questionText: "Which school project sounds most fun?",
    options: makeOptions(
      "Solar-powered car",
      "Water purification research",
      "School mural",
      "Mental health campaign",
      "Student business fair",
      "Digital attendance system"
    ),
  },
  {
    questionNo: 16,
    questionText: "Your teacher gives complete freedom for a project. What do you choose?",
    options: makeOptions(
      "Build a machine",
      "Conduct research",
      "Produce a short movie",
      "Organize a community drive",
      "Launch a mini startup",
      "Create a filing system"
    ),
  },
  {
    questionNo: 17,
    questionText: "Which career documentary would you watch?",
    options: makeOptions(
      "Civil Engineer",
      "Neuroscientist",
      "Fashion Designer",
      "Clinical Psychologist",
      "Entrepreneur",
      "Investment Banker"
    ),
  },
  {
    questionNo: 18,
    questionText: "Your school introduces a new lab. Which one interests you most?",
    options: makeOptions(
      "Robotics Lab",
      "AI Research Lab",
      "Design Studio",
      "Counseling Center",
      "Startup Incubator",
      "Finance Lab"
    ),
  },
  {
    questionNo: 19,
    questionText: "Which competition would you enter?",
    options: makeOptions(
      "Drone Building",
      "Math Olympiad",
      "Digital Art",
      "Public Speaking",
      "Startup Challenge",
      "Accounting Quiz"
    ),
  },
  {
    questionNo: 20,
    questionText: "If success meant doing something every day, what would you choose?",
    options: makeOptions(
      "Building",
      "Discovering",
      "Creating",
      "Helping",
      "Leading",
      "Organizing"
    ),
  },
];

async function resetRiasecNow() {
  try {
    await connectDB();

    console.log("Deleting old RIASEC questions...");

    await Class10Question.deleteMany({
      testType: "riasec",
    });

    console.log("Old RIASEC questions deleted.");

    const questionsToInsert = riasecQuestions.map((question, index) => ({
      classLevel: "class10",
      testType: "riasec",
      testName: "RIASEC Interest Test",

      round: 1,
      questionNo: question.questionNo || index + 1,

      questionText: question.questionText,
      question: question.questionText,

      dimension: "RIASEC",
      questionType: "single-choice",

      options: question.options,
      scoring,

      isActive: true,
      active: true,

      meta: {
        source: "GroerX RIASEC Question Bank",
        round: 1,
        originalId: `riasec-r1-q${question.questionNo || index + 1}`,
      },
    }));

    await Class10Question.insertMany(questionsToInsert);

    const finalCount = await Class10Question.countDocuments({
      testType: "riasec",
    });

    console.log("RIASEC reset completed successfully.");
    console.log("Inserted questions:", finalCount);
    console.log("First question:", questionsToInsert[0].questionText);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("RIASEC reset failed:", error);
    await mongoose.connection.close().catch(() => {});
    process.exit(1);
  }
}

resetRiasecNow();
