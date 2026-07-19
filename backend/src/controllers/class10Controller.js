import Class10Question from "../models/class10Question.js";
import Class10Result from "../models/class10Result.js";
import Class10Recommendation from "../models/class10Recommendation.js";

const TESTS = [
  { key: "riasec", name: "RIASEC Interest Test" },
  { key: "aptitude", name: "Aptitude Test" },
  { key: "personality", name: "Personality Test" },
  { key: "academic-style", name: "Academic Style Test" },
  { key: "situational-iq", name: "Situational IQ Test" },
  { key: "values", name: "Values Test" },
  { key: "confidence", name: "Confidence Test" },
];

const STREAMS = {
  "science-pcm": {
    slug: "science-pcm",
    name: "Science PCM",
    reasons: [
      "Strong analytical and logical reasoning ability",
      "Good fit for mathematics, engineering, technology, and research careers",
      "Matches investigative and problem-solving traits",
    ],
    suggestedSubjects: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
    suggestedCareers: ["Engineer", "Data Scientist", "AI Engineer", "Architect", "Researcher"],
  },

  "science-pcb": {
    slug: "science-pcb",
    name: "Science PCB",
    reasons: [
      "Good fit for biology, healthcare, research, and life sciences",
      "Strong curiosity about living systems and human wellbeing",
      "Matches scientific learning and service-oriented careers",
    ],
    suggestedSubjects: ["Physics", "Chemistry", "Biology", "Psychology"],
    suggestedCareers: ["Doctor", "Biotechnologist", "Psychologist", "Pharmacist", "Researcher"],
  },

  commerce: {
    slug: "commerce",
    name: "Commerce",
    reasons: [
      "Strong fit for business, finance, management, and entrepreneurship",
      "Matches enterprising and conventional thinking patterns",
      "Good for students interested in money, markets, and organization",
    ],
    suggestedSubjects: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
    suggestedCareers: ["CA", "Investment Banker", "Entrepreneur", "Business Analyst", "Marketing Manager"],
  },

  "arts-humanities": {
    slug: "arts-humanities",
    name: "Arts / Humanities",
    reasons: [
      "Strong fit for creativity, communication, people, society, and ideas",
      "Matches artistic, social, and expressive traits",
      "Good for careers in design, law, psychology, writing, and public service",
    ],
    suggestedSubjects: ["Political Science", "Psychology", "History", "Sociology", "Fine Arts"],
    suggestedCareers: ["Lawyer", "Psychologist", "Designer", "Civil Servant", "Journalist"],
  },

  vocational: {
    slug: "vocational",
    name: "Vocational / Skill-Based Path",
    reasons: [
      "Strong practical orientation and hands-on learning preference",
      "Good fit for applied skills, technical training, and early employability",
      "Matches realistic and action-based learning traits",
    ],
    suggestedSubjects: ["IT", "Design", "Retail", "Automobile", "Electronics"],
    suggestedCareers: ["UI Designer", "Technician", "Digital Marketer", "Animator", "Entrepreneur"],
  },
};

const RIASEC_TRAIT_MAP = {
  R: "realistic",
  I: "investigative",
  A: "artistic",
  S: "social",
  E: "enterprising",
  C: "conventional",
};

const RIASEC_STREAM_WEIGHTS = {
  realistic: {
    vocational: 4,
    "science-pcm": 2,
  },
  investigative: {
    "science-pcm": 4,
    "science-pcb": 3,
  },
  artistic: {
    "arts-humanities": 4,
    vocational: 2,
  },
  social: {
    "arts-humanities": 4,
    "science-pcb": 2,
  },
  enterprising: {
    commerce: 4,
    "arts-humanities": 2,
  },
  conventional: {
    commerce: 4,
    "science-pcm": 1.5,
  },
};

function getStudentId(req) {
  return req.params.studentId || req.query.studentId || req.body.studentId || "demo-student";
}

function mapToObject(value) {
  if (!value) return {};
  if (value instanceof Map) return Object.fromEntries(value);
  return value;
}

function addToBucket(bucket, values, multiplier = 1) {
  const plainValues = mapToObject(values);

  Object.entries(plainValues).forEach(([key, value]) => {
    bucket[key] = (bucket[key] || 0) + Number(value || 0) * multiplier;
  });
}

function getTestName(testType) {
  return TESTS.find((test) => test.key === testType)?.name || testType;
}

function isValidTest(testType) {
  return TESTS.some((test) => test.key === testType);
}

function getHollandCode(traits = {}) {
  const riasecKeys = [
    "realistic",
    "investigative",
    "artistic",
    "social",
    "enterprising",
    "conventional",
  ];

  return riasecKeys
    .map((key) => ({ key, value: Number(traits[key] || 0) }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 3)
    .map((item) => item.key[0].toUpperCase())
    .join("");
}

function buildProfile(topStream, riasecTraits = {}) {
  const hollandCode = getHollandCode(riasecTraits);

  const profileMap = {
    "science-pcm": {
      strengths: ["Logical thinking", "Problem solving", "Analytical learning"],
      improvementAreas: ["Communication practice", "Time management", "Concept revision discipline"],
      summary:
        "The student shows strong potential for analytical and problem-solving fields. Science PCM can be a suitable direction if the student is comfortable with mathematics and consistent practice.",
    },

    "science-pcb": {
      strengths: ["Scientific curiosity", "Observation", "Service mindset"],
      improvementAreas: ["Concept retention", "Diagram-based learning", "Exam writing structure"],
      summary:
        "The student shows alignment with biology, healthcare, and life-science related fields. Science PCB can be suitable if the student enjoys understanding living systems and human wellbeing.",
    },

    commerce: {
      strengths: ["Business thinking", "Organization", "Decision-making"],
      improvementAreas: ["Numerical accuracy", "Financial concepts", "Presentation confidence"],
      summary:
        "The student shows alignment with commerce, management, finance, and entrepreneurship. Commerce can be suitable if the student enjoys business, money, systems, and decision-making.",
    },

    "arts-humanities": {
      strengths: ["Communication", "Creativity", "Understanding people"],
      improvementAreas: ["Structured writing", "Research discipline", "Critical analysis"],
      summary:
        "The student shows alignment with humanities, communication, social sciences, creativity, and people-centered careers. Arts/Humanities can be suitable if the student enjoys ideas, society, expression, and human behaviour.",
    },

    vocational: {
      strengths: ["Practical learning", "Hands-on execution", "Skill-based growth"],
      improvementAreas: ["Theory connection", "Portfolio building", "Professional communication"],
      summary:
        "The student shows alignment with practical, hands-on, and skill-based learning. A vocational or applied career path can be suitable if the student prefers learning by doing.",
    },
  };

  return {
    hollandCode,
    ...(profileMap[topStream.slug] || profileMap.commerce),
  };
}

function normalizeQuestionForFrontend(question) {
  const plainQuestion = question.toObject ? question.toObject() : question;

  return {
    ...plainQuestion,
    questionText: plainQuestion.questionText || plainQuestion.question || "",
    isActive: plainQuestion.isActive !== false && plainQuestion.active !== false,
  };
}

function getSelectedKey(answer) {
  return answer.selectedKey || answer.selectedOption || answer.answer || answer.key;
}

function buildTraitAndStreamScoresFromOption(selectedOption) {
  const traitScores = {};
  const streamScores = {};

  if (selectedOption.traits) {
    addToBucket(traitScores, selectedOption.traits);
  }

  if (selectedOption.streamWeights) {
    addToBucket(streamScores, selectedOption.streamWeights);
  }

  if (selectedOption.riasec) {
    const traitKey = RIASEC_TRAIT_MAP[selectedOption.riasec];

    if (traitKey) {
      traitScores[traitKey] = (traitScores[traitKey] || 0) + Number(selectedOption.score || 5);

      const streamWeights = RIASEC_STREAM_WEIGHTS[traitKey] || {};
      addToBucket(streamScores, streamWeights, Number(selectedOption.score || 5));
    }
  }

  if (selectedOption.dimension && !selectedOption.riasec) {
    const dimensionKey = String(selectedOption.dimension).toLowerCase();

    if (dimensionKey) {
      traitScores[dimensionKey] = (traitScores[dimensionKey] || 0) + Number(selectedOption.score || 0);

      const streamWeights = RIASEC_STREAM_WEIGHTS[dimensionKey] || {};
      addToBucket(streamScores, streamWeights, Number(selectedOption.score || 1));
    }
  }

  return { traitScores, streamScores };
}

export async function getClass10Dashboard(req, res) {
  console.log("NEW CLASS10 QUESTION CONTROLLER HIT:", req.params.testType, req.query.round);
  try {
    const studentId = getStudentId(req);

    const results = await Class10Result.find({ studentId }).lean();
    const recommendation = await Class10Recommendation.findOne({ studentId }).lean();

    const completedTests = results.map((result) => result.testType);

    const tests = TESTS.map((test) => ({
      ...test,
      completed: completedTests.includes(test.key),
      score: results.find((result) => result.testType === test.key)?.percentage || 0,
    }));

    const completionPercentage = Math.round((completedTests.length / TESTS.length) * 100);

    return res.status(200).json({
      success: true,
      data: {
        studentId,
        completionPercentage,
        completedTests,
        totalTests: TESTS.length,
        tests,
        recommendation,
        nextAction:
          completionPercentage === 100
            ? "Generate final stream recommendation"
            : "Complete remaining assessments",
      },
    });
  } catch (error) {
    console.error("Dashboard fetch failed:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getClass10Questions(req, res) {
  try {
    const { testType } = req.params;
    const round = Number(req.query.round) || 1;

    if (!isValidTest(testType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid test type",
      });
    }

    const query = {
      classLevel: "class10",
      testType,
      round,
      $or: [{ isActive: true }, { active: true }],
    };

    let questions = await Class10Question.find(query).sort({ questionNo: 1 }).lean();

    if (questions.length === 0) {
      questions = await Class10Question.find({
        testType,
        round,
        $or: [{ isActive: true }, { active: true }],
      })
        .sort({ questionNo: 1 })
        .lean();
    }

    if (questions.length === 0) {
      questions = await Class10Question.find({
        testType,
        $or: [{ isActive: true }, { active: true }],
      })
        .sort({ questionNo: 1 })
        .limit(20)
        .lean();
    }

    const normalizedQuestions = questions.map(normalizeQuestionForFrontend);

    return res.status(200).json({
      success: true,
      testType,
      round,
      count: normalizedQuestions.length,
      data: normalizedQuestions,
      questions: normalizedQuestions,
    });
  } catch (error) {
    console.error("Class 10 questions fetch failed:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch Class 10 questions",
      error: error.message,
    });
  }
}

export async function submitClass10Assessment(req, res) {
  try {
    const studentId = getStudentId(req);
    const { testType, answers } = req.body;

    if (!isValidTest(testType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid test type",
      });
    }

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "answers must be a non-empty array",
      });
    }

    const questionIds = answers.map((answer) => answer.questionId).filter(Boolean);

    let questions = await Class10Question.find({
      _id: { $in: questionIds },
      testType,
      $or: [{ isActive: true }, { active: true }],
    });

    if (questions.length !== answers.length) {
      const questionNumbers = answers.map((answer) => answer.questionNo).filter(Boolean);

      questions = await Class10Question.find({
        testType,
        questionNo: { $in: questionNumbers },
        $or: [{ isActive: true }, { active: true }],
      });
    }

    if (questions.length !== answers.length) {
      return res.status(400).json({
        success: false,
        message: "Some questions are invalid or do not belong to this test",
        expectedAnswers: answers.length,
        matchedQuestions: questions.length,
      });
    }

    let totalScore = 0;
    let maxScore = 0;

    const traitScores = {};
    const streamScores = {};
    const savedAnswers = [];

    for (const answer of answers) {
      const selectedKey = getSelectedKey(answer);

      const question =
        questions.find((q) => q._id.toString() === String(answer.questionId)) ||
        questions.find((q) => Number(q.questionNo) === Number(answer.questionNo));

      if (!question) {
        return res.status(400).json({
          success: false,
          message: `Question not found for answer ${JSON.stringify(answer)}`,
        });
      }

      const selectedOption = question.options.find((option) => option.key === selectedKey);

      if (!selectedOption) {
        return res.status(400).json({
          success: false,
          message: `Invalid selected option for question ${question._id}`,
          selectedKey,
        });
      }

      const optionScore = Number(selectedOption.score || 0);
      const questionMaxScore = Math.max(
        ...question.options.map((option) => Number(option.score || 0)),
        1
      );

      totalScore += optionScore;
      maxScore += questionMaxScore;

      const optionBuckets = buildTraitAndStreamScoresFromOption(selectedOption);

      addToBucket(traitScores, optionBuckets.traitScores);
      addToBucket(streamScores, optionBuckets.streamScores);

      savedAnswers.push({
        questionId: question._id,
        questionNo: question.questionNo,
        selectedKey: selectedOption.key,
        selectedText: selectedOption.text,
        score: optionScore,
        riasec: selectedOption.riasec,
        dimension: selectedOption.dimension,
      });
    }

    const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

    const result = await Class10Result.findOneAndUpdate(
      { studentId, testType },
      {
        studentId,
        testType,
        testName: getTestName(testType),
        answers: savedAnswers,
        totalScore,
        maxScore,
        percentage,
        traitScores,
        streamScores,
        completed: true,
        submittedAt: new Date(),
      },
      { new: true, upsert: true }
    );

    await Class10Recommendation.deleteOne({ studentId });

    return res.status(200).json({
      success: true,
      message: "Assessment submitted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Assessment submit failed:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getClass10Progress(req, res) {
  try {
    const studentId = getStudentId(req);

    const results = await Class10Result.find({ studentId }).lean();
    const completedTests = results.map((result) => result.testType);

    return res.status(200).json({
      success: true,
      data: {
        studentId,
        totalTests: TESTS.length,
        completedCount: completedTests.length,
        completionPercentage: Math.round((completedTests.length / TESTS.length) * 100),
        completedTests,
        pendingTests: TESTS.filter((test) => !completedTests.includes(test.key)),
        results,
      },
    });
  } catch (error) {
    console.error("Progress fetch failed:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function generateClass10Recommendation(req, res) {
  try {
    const studentId = getStudentId(req);

    const results = await Class10Result.find({ studentId }).lean();

    if (results.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No completed assessments found",
      });
    }

    const completedTests = results.map((result) => result.testType);
    const completionPercentage = Math.round((completedTests.length / TESTS.length) * 100);

    const streamScore = {
      "science-pcm": 0,
      "science-pcb": 0,
      commerce: 0,
      "arts-humanities": 0,
      vocational: 0,
    };

    const allTraits = {};
    const riasecTraits = {};

    results.forEach((result) => {
      addToBucket(streamScore, result.streamScores);

      const traits = mapToObject(result.traitScores);
      addToBucket(allTraits, traits);

      if (result.testType === "riasec") {
        addToBucket(riasecTraits, traits);
      }

      if (result.testType === "aptitude") {
        streamScore["science-pcm"] += result.percentage * 0.35;
        streamScore["science-pcb"] += result.percentage * 0.25;
        streamScore.commerce += result.percentage * 0.2;
      }

      if (result.testType === "personality") {
        streamScore.commerce += result.percentage * 0.15;
        streamScore["arts-humanities"] += result.percentage * 0.2;
      }

      if (result.testType === "academic-style") {
        streamScore.vocational += result.percentage * 0.2;
        streamScore["science-pcm"] += result.percentage * 0.15;
      }

      if (result.testType === "situational-iq") {
        streamScore.commerce += result.percentage * 0.2;
        streamScore["arts-humanities"] += result.percentage * 0.15;
      }

      if (result.testType === "values") {
        streamScore["science-pcb"] += result.percentage * 0.2;
        streamScore["arts-humanities"] += result.percentage * 0.2;
      }

      if (result.testType === "confidence") {
        streamScore.commerce += result.percentage * 0.1;
        streamScore["science-pcm"] += result.percentage * 0.1;
      }
    });

    const maxScore = Math.max(...Object.values(streamScore), 1);

    const streams = Object.entries(streamScore)
      .map(([slug, score]) => {
        const base = STREAMS[slug];

        return {
          ...base,
          match: Math.min(99, Math.max(35, Math.round((score / maxScore) * 96))),
        };
      })
      .sort((a, b) => b.match - a.match);

    const topStream = streams[0];
    const profile = buildProfile(topStream, riasecTraits);

    const recommendation = await Class10Recommendation.findOneAndUpdate(
      { studentId },
      {
        studentId,
        completionPercentage,
        completedTests,
        topStream,
        streams,
        profile,
        generatedAt: new Date(),
      },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      success: true,
      message: "Recommendation generated successfully",
      data: recommendation,
    });
  } catch (error) {
    console.error("Recommendation generation failed:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getClass10Recommendation(req, res) {
  try {
    const studentId = getStudentId(req);

    const recommendation = await Class10Recommendation.findOne({ studentId }).lean();

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: "Recommendation not generated yet",
      });
    }

    return res.status(200).json({
      success: true,
      data: recommendation,
    });
  } catch (error) {
    console.error("Recommendation fetch failed:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getClass10FinalReport(req, res) {
  try {
    const studentId = getStudentId(req);

    const results = await Class10Result.find({ studentId }).lean();
    const recommendation = await Class10Recommendation.findOne({ studentId }).lean();

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: "Generate recommendation before viewing final report",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        studentId,
        generatedAt: recommendation.generatedAt,
        completionPercentage: recommendation.completionPercentage,
        topStream: recommendation.topStream,
        alternativeStreams: recommendation.streams?.slice(1, 3) || [],
        profile: recommendation.profile,
        assessmentResults: results,
        parentGuidance: [
          "Do not force stream selection only based on marks.",
          "Discuss the recommendation with the child calmly.",
          "Compare interest, aptitude, and confidence before taking final decision.",
          "Use this report as guidance, not as pressure.",
        ],
        next30DayRoadmap: [
          "Revise basic concepts of the recommended stream.",
          "Talk to two seniors currently studying that stream.",
          "Explore 5 careers connected to the recommended stream.",
          "Discuss subject difficulty honestly with parents and teachers.",
          "Create a 30-day trial study plan before final selection.",
        ],
      },
    });
  } catch (error) {
    console.error("Final report fetch failed:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}