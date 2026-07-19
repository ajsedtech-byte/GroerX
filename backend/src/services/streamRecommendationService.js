const careerMap = {
  science: [
    "AI Engineer",
    "Software Engineer",
    "Doctor",
    "Data Scientist",
    "Robotics Engineer"
  ],

  commerce: [
    "Chartered Accountant",
    "Business Analyst",
    "Entrepreneur",
    "Marketing Manager",
    "Financial Planner"
  ],

  arts: [
    "Designer",
    "Psychologist",
    "Teacher",
    "Content Creator",
    "Civil Services"
  ]
};

export function buildReport(scores) {
  const r = scores.riasec || {};
  const t = scores.traits || {};
  const s = scores.stream || {};

  const science =
    (r.investigative || 0) * 0.45 +
    (r.realistic || 0) * 0.25 +
    (t.analyticalThinking || 0) * 0.15 +
    (t.curiosity || 0) * 0.15 +
    (s.science || 0) * 0.3;

  const commerce =
    (r.enterprising || 0) * 0.4 +
    (r.conventional || 0) * 0.3 +
    (t.leadership || 0) * 0.15 +
    (t.planning || 0) * 0.15 +
    (s.commerce || 0) * 0.3;

  const arts =
    (r.artistic || 0) * 0.45 +
    (r.social || 0) * 0.2 +
    (t.creativity || 0) * 0.2 +
    (t.communication || 0) * 0.15 +
    (s.arts || 0) * 0.3;

  const streamScores = {
    science: Math.round(science),
    commerce: Math.round(commerce),
    arts: Math.round(arts)
  };

  const rankedStreams = Object.entries(streamScores)
    .map(([slug, score]) => ({
      slug,
      score
    }))
    .sort((a, b) => b.score - a.score);

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
    rankedStreams,

    topRiasecCode,

    recommendedStream:
      recommendedKey.charAt(0).toUpperCase() +
      recommendedKey.slice(1),

    streamScores,

    confidence: Math.min(
      95,
      Math.max(40, streamScores[recommendedKey])
    ),

    topTraits,

    recommendedCareers:
      careerMap[recommendedKey] || [],

    reasons: [
      `Top RIASEC code is ${topRiasecCode}`,
      `Highest branch score is ${recommendedKey}`,
      `Strong traits: ${topTraits.join(", ")}`
    ]
  };
}