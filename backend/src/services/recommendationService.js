const careerMap = {
  "science-pcm": ["Software Engineer", "AI Engineer", "Data Scientist", "Robotics Engineer", "Architect"],
  "science-pcb": ["Doctor", "Biotechnologist", "Pharmacist", "Psychologist", "Nutritionist"],
  "science-pcmb": ["Biomedical Engineer", "Doctor", "AI Healthcare Specialist", "Research Scientist"],
  "commerce-with-maths": ["CA", "Investment Banker", "Business Analyst", "Economist", "Financial Planner"],
  "commerce-without-maths": ["Entrepreneur", "Marketing Manager", "HR Manager", "Sales Manager", "Business Owner"],
  humanities: ["Lawyer", "Psychologist", "Civil Servant", "Journalist", "Policy Analyst"],
  "arts-design": ["UX Designer", "Graphic Designer", "Animator", "Filmmaker", "Content Creator"],
  "vocational-skill-based": ["Web Developer", "Technician", "Digital Marketer", "Chef", "Healthcare Assistant"],
  "diploma-polytechnic": ["Junior Engineer", "CAD Technician", "Manufacturing Supervisor", "Site Engineer"]
};

const normalize = (value = 0) => Math.min(100, Math.max(0, Number(value) || 0));

const weighted = (...items) => {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  const score = items.reduce((sum, item) => sum + normalize(item.value) * item.weight, 0);
  return Math.round(score / totalWeight);
};

export function buildReport(scores) {
  const r = scores.riasec || {};
  const t = scores.traits || {};
  const s = scores.stream || {};

  const streamScores = {
    "science-pcm": weighted(
      { value: r.investigative, weight: 25 },
      { value: r.realistic, weight: 15 },
      { value: t.analyticalThinking, weight: 20 },
      { value: t.problemSolving, weight: 20 },
      { value: s.science, weight: 20 }
    ),

    "science-pcb": weighted(
      { value: r.investigative, weight: 25 },
      { value: r.social, weight: 15 },
      { value: t.curiosity, weight: 20 },
      { value: t.empathy, weight: 15 },
      { value: s.science, weight: 25 }
    ),

    "science-pcmb": weighted(
      { value: r.investigative, weight: 25 },
      { value: t.analyticalThinking, weight: 20 },
      { value: t.problemSolving, weight: 20 },
      { value: t.curiosity, weight: 15 },
      { value: s.science, weight: 20 }
    ),

    "commerce-with-maths": weighted(
      { value: r.enterprising, weight: 25 },
      { value: r.conventional, weight: 20 },
      { value: t.planning, weight: 15 },
      { value: t.decisionMaking, weight: 15 },
      { value: s.commerce, weight: 25 }
    ),

    "commerce-without-maths": weighted(
      { value: r.enterprising, weight: 30 },
      { value: t.leadership, weight: 20 },
      { value: t.communication, weight: 20 },
      { value: t.planning, weight: 10 },
      { value: s.commerce, weight: 20 }
    ),

    humanities: weighted(
      { value: r.social, weight: 25 },
      { value: r.artistic, weight: 15 },
      { value: t.communication, weight: 20 },
      { value: t.empathy, weight: 20 },
      { value: s.arts, weight: 20 }
    ),

    "arts-design": weighted(
      { value: r.artistic, weight: 35 },
      { value: t.creativity, weight: 30 },
      { value: t.communication, weight: 15 },
      { value: s.arts, weight: 20 }
    ),

    "vocational-skill-based": weighted(
      { value: r.realistic, weight: 35 },
      { value: t.handsOn, weight: 25 },
      { value: t.practicalThinking, weight: 25 },
      { value: t.problemSolving, weight: 15 }
    ),

    "diploma-polytechnic": weighted(
      { value: r.realistic, weight: 30 },
      { value: r.investigative, weight: 15 },
      { value: t.mechanicalInterest, weight: 25 },
      { value: t.practicalThinking, weight: 20 },
      { value: t.problemSolving, weight: 10 }
    )
  };

  const rankedStreams = Object.entries(streamScores)
    .sort((a, b) => b[1] - a[1])
    .map(([slug, score]) => ({ slug, score }));

  const recommendedKey = rankedStreams[0].slug;

  const topRiasecCode = Object.entries(r)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => key[0].toUpperCase())
    .join("");

  const topTraits = Object.entries(t)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([key]) => key);

  return {
    topRiasecCode,
    recommendedStream: recommendedKey,
    streamScores,
    rankedStreams,
    confidence: Math.min(95, Math.max(40, streamScores[recommendedKey])),
    topTraits,
    recommendedCareers: careerMap[recommendedKey] || [],
    reasons: [
      `Top RIASEC code is ${topRiasecCode}`,
      `Highest stream match is ${recommendedKey}`,
      topTraits.length
        ? `Strong traits: ${topTraits.join(", ")}`
        : "Trait data is limited"
    ]
  };
}