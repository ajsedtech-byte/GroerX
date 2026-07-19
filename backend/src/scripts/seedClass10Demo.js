import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Class10Question from "../models/class10Question.js";
import Class10Result from "../models/class10Result.js";
import Class10Recommendation from "../models/class10Recommendation.js";

const TEST_NAMES = {
  riasec: "RIASEC Interest Test",
  aptitude: "Aptitude Test",
  personality: "Personality Test",
  "academic-style": "Academic Style Test",
  "situational-iq": "Situational IQ Test",
  values: "Values Test",
  confidence: "Confidence Test",
};

function makeOptions(dimension, streamWeights) {
  return [
    {
      key: "A",
      text: "Strongly Agree",
      score: 4,
      traits: { [dimension]: 4 },
      streamWeights,
    },
    {
      key: "B",
      text: "Agree",
      score: 3,
      traits: { [dimension]: 3 },
      streamWeights: multiplyWeights(streamWeights, 0.75),
    },
    {
      key: "C",
      text: "Neutral",
      score: 2,
      traits: { [dimension]: 2 },
      streamWeights: multiplyWeights(streamWeights, 0.5),
    },
    {
      key: "D",
      text: "Disagree",
      score: 1,
      traits: { [dimension]: 1 },
      streamWeights: multiplyWeights(streamWeights, 0.25),
    },
  ];
}

function multiplyWeights(weights, multiplier) {
  const result = {};
  Object.entries(weights).forEach(([key, value]) => {
    result[key] = Number((value * multiplier).toFixed(2));
  });
  return result;
}

const templates = {
  riasec: [
    ["realistic", "I enjoy building, repairing, fixing, or working with tools and machines.", { vocational: 4, "science-pcm": 2 }],
    ["investigative", "I like solving problems, finding patterns, and understanding how things work.", { "science-pcm": 4, "science-pcb": 3 }],
    ["artistic", "I enjoy creative activities like designing, writing, music, drawing, or storytelling.", { "arts-humanities": 4, vocational: 2 }],
    ["social", "I like helping people, teaching others, counselling, or understanding emotions.", { "arts-humanities": 4, "science-pcb": 3 }],
    ["enterprising", "I enjoy leading, selling ideas, managing people, or starting something new.", { commerce: 4, "arts-humanities": 2 }],
    ["conventional", "I like organized work, numbers, records, planning, and structured tasks.", { commerce: 4, "science-pcm": 2 }],
    ["investigative", "I feel curious about science experiments, technology, or research-based topics.", { "science-pcm": 4, "science-pcb": 3 }],
    ["artistic", "I prefer expressing ideas in a unique or creative way instead of following fixed patterns.", { "arts-humanities": 4 }],
    ["enterprising", "I like taking responsibility in group projects and influencing decisions.", { commerce: 4 }],
    ["realistic", "I learn better when I can do practical work instead of only reading theory.", { vocational: 4, "science-pcm": 2 }],
  ],

  aptitude: [
    ["logical", "I can understand logic-based questions and puzzles quickly.", { "science-pcm": 4, commerce: 2 }],
    ["numerical", "I am comfortable working with numbers, calculations, and formulas.", { "science-pcm": 4, commerce: 4 }],
    ["verbal", "I can understand written information and explain ideas clearly.", { "arts-humanities": 4, commerce: 2 }],
    ["analytical", "I can compare options and choose the most practical answer.", { commerce: 3, "science-pcm": 3 }],
    ["spatial", "I can imagine shapes, designs, objects, and visual patterns in my mind.", { "science-pcm": 3, vocational: 3 }],
    ["scientific", "I enjoy understanding cause-and-effect relationships in science topics.", { "science-pcm": 4, "science-pcb": 3 }],
    ["memory", "I can remember facts, definitions, examples, and concepts after studying.", { "science-pcb": 3, "arts-humanities": 2 }],
    ["reasoning", "I can identify mistakes in arguments or wrong assumptions.", { "arts-humanities": 3, commerce: 3 }],
    ["data", "I like reading charts, tables, graphs, and information patterns.", { commerce: 4, "science-pcm": 3 }],
    ["problem-solving", "I stay calm when I have to solve a difficult academic problem.", { "science-pcm": 4, commerce: 2 }],
  ],

  personality: [
    ["leadership", "I naturally take charge when a group needs direction.", { commerce: 4, "arts-humanities": 2 }],
    ["collaboration", "I work well with classmates and can adjust in a team.", { "arts-humanities": 3, commerce: 2 }],
    ["curiosity", "I ask questions when I do not understand something deeply.", { "science-pcm": 3, "science-pcb": 3 }],
    ["discipline", "I can follow a study routine even when the topic is difficult.", { "science-pcm": 3, commerce: 3 }],
    ["creativity", "I like finding new ways to present or solve something.", { "arts-humanities": 4, vocational: 2 }],
    ["patience", "I can spend time understanding a concept without giving up quickly.", { "science-pcb": 3, "science-pcm": 3 }],
    ["confidence", "I can share my opinion even if others disagree.", { commerce: 3, "arts-humanities": 3 }],
    ["empathy", "I can understand how others feel in a situation.", { "arts-humanities": 4, "science-pcb": 2 }],
    ["independence", "I prefer making my own decisions after thinking properly.", { commerce: 3, vocational: 2 }],
    ["adaptability", "I can adjust when plans or situations change suddenly.", { commerce: 2, "arts-humanities": 2 }],
  ],

  "academic-style": [
    ["visual", "I learn better through diagrams, charts, videos, and visual examples.", { "science-pcm": 3, vocational: 2 }],
    ["reading", "I learn better by reading textbooks, notes, and written explanations.", { "arts-humanities": 3, "science-pcb": 2 }],
    ["practical", "I understand topics better when I do activities or experiments.", { vocational: 4, "science-pcm": 3 }],
    ["discussion", "I learn better when someone explains and discusses the topic with me.", { "arts-humanities": 3, commerce: 2 }],
    ["structured", "I prefer clear steps, rules, and organized study material.", { commerce: 3, "science-pcm": 2 }],
    ["conceptual", "I prefer understanding the concept rather than memorizing answers.", { "science-pcm": 4, "science-pcb": 3 }],
    ["creative-learning", "I like projects, presentations, and creative assignments.", { "arts-humanities": 4, vocational: 2 }],
    ["practice", "I improve when I solve many practice questions.", { "science-pcm": 3, commerce: 3 }],
    ["observation", "I learn by observing examples from real life.", { "science-pcb": 2, "arts-humanities": 2 }],
    ["portfolio", "I like creating things that show my skills practically.", { vocational: 4, "arts-humanities": 2 }],
  ],

  "situational-iq": [
    ["decision-making", "When confused, I compare options before making a decision.", { commerce: 3, "science-pcm": 2 }],
    ["ethics", "I choose the honest option even when shortcuts are available.", { "arts-humanities": 3, "science-pcb": 2 }],
    ["responsibility", "If I make a mistake, I accept it and try to fix it.", { commerce: 2, "arts-humanities": 2 }],
    ["pressure-handling", "I can stay calm when exams or deadlines are near.", { "science-pcm": 3, commerce: 3 }],
    ["problem-solving", "If a plan fails, I quickly think of another solution.", { commerce: 3, vocational: 2 }],
    ["prioritization", "I can decide which task is more important when many tasks are pending.", { commerce: 4 }],
    ["social-judgement", "I can understand what is appropriate to say in different situations.", { "arts-humanities": 4 }],
    ["risk-awareness", "I think about consequences before taking a risky decision.", { commerce: 3, "science-pcm": 2 }],
    ["conflict", "I try to solve disagreements peacefully instead of reacting angrily.", { "arts-humanities": 3 }],
    ["clarity", "I ask for clarity when instructions are confusing.", { commerce: 2, "science-pcm": 2 }],
  ],

  values: [
    ["achievement", "I want a career where I can grow, achieve, and prove myself.", { commerce: 3, "science-pcm": 3 }],
    ["stability", "I prefer a stable and secure career path.", { commerce: 3, "science-pcb": 2 }],
    ["creativity", "I want a career where I can express original ideas.", { "arts-humanities": 4, vocational: 2 }],
    ["service", "I want my work to help people or society.", { "science-pcb": 4, "arts-humanities": 3 }],
    ["independence", "I want a career where I can make independent decisions.", { commerce: 3, vocational: 3 }],
    ["knowledge", "I value deep learning, research, and understanding complex topics.", { "science-pcm": 4, "science-pcb": 3 }],
    ["recognition", "I feel motivated when my work is appreciated publicly.", { commerce: 3, "arts-humanities": 2 }],
    ["impact", "I want to work on problems that affect many people.", { "arts-humanities": 3, "science-pcb": 2 }],
    ["money", "Financial growth is an important factor in my career choice.", { commerce: 4, "science-pcm": 2 }],
    ["skill", "I prefer building practical skills that can be used directly.", { vocational: 4, commerce: 2 }],
  ],

  confidence: [
    ["academic-confidence", "I believe I can improve in difficult subjects with the right practice.", { "science-pcm": 3, commerce: 2 }],
    ["communication-confidence", "I can explain my thoughts clearly to others.", { "arts-humanities": 4, commerce: 2 }],
    ["decision-confidence", "I can take decisions without depending completely on others.", { commerce: 3, vocational: 2 }],
    ["exam-confidence", "I can handle exam pressure if I prepare properly.", { "science-pcm": 3, "science-pcb": 2 }],
    ["social-confidence", "I can interact with new people without too much hesitation.", { "arts-humanities": 3, commerce: 3 }],
    ["career-confidence", "I feel confident that I can build a good future if I get the right direction.", { commerce: 2, "arts-humanities": 2 }],
    ["learning-confidence", "I can learn new topics even if they look difficult at first.", { "science-pcm": 3, vocational: 2 }],
    ["self-awareness", "I understand my strengths and weaknesses better than before.", { "arts-humanities": 2, commerce: 2 }],
    ["growth-mindset", "I believe marks can improve through better strategy and practice.", { "science-pcm": 2, commerce: 2 }],
    ["presentation-confidence", "I can present my work or ideas in front of others.", { commerce: 3, "arts-humanities": 3 }],
  ],
};

const questions = [];

Object.entries(templates).forEach(([testType, items]) => {
  items.forEach(([dimension, question, streamWeights], index) => {
    questions.push({
      testType,
      testName: TEST_NAMES[testType],
      questionNo: index + 1,
      question,
      dimension,
      options: makeOptions(dimension, streamWeights),
      active: true,
    });
  });
});

async function seed() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Class10Question.deleteMany({});
    await Class10Result.deleteMany({});
    await Class10Recommendation.deleteMany({});

    await Class10Question.insertMany(questions);

    console.log(`Seeded ${questions.length} Class 10 demo questions`);
    console.log("Class 10 demo data ready");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
}

seed();