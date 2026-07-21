export const CLASS10_TESTS = [
  {
    key: "riasec",
    name: "RIASEC Interest Test",
    description: "Interest pattern using Holland Code.",
  },
  {
    key: "aptitude",
    name: "Aptitude Test",
    description: "Logic, reasoning, and problem-solving.",
  },
  {
    key: "personality",
    name: "Personality Test",
    description: "Behaviour, discipline, confidence, and style.",
  },
  {
    key: "academic-style",
    name: "Academic Style Test",
    description: "Learning and study style.",
  },
  {
    key: "situational-iq",
    name: "Situational IQ Test",
    description: "Real-life decision-making.",
  },
  {
    key: "values",
    name: "Values Test",
    description: "Career values and priorities.",
  },
  {
    key: "confidence",
    name: "Confidence Test",
    description: "Self-belief and readiness.",
  },
];

const STORAGE_KEY = "groerx_class10_progress";
const CURRENT_TEST_KEY = "groerx_class10_current_test";

export function getClass10Progress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return {
        completedTests: [],
        recommendationGenerated: false,
      };
    }

    const parsed = JSON.parse(saved);

    return {
      completedTests: Array.isArray(parsed.completedTests)
        ? parsed.completedTests
        : [],
      recommendationGenerated: Boolean(parsed.recommendationGenerated),
    };
  } catch {
    return {
      completedTests: [],
      recommendationGenerated: false,
    };
  }
}

export function saveClass10Progress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function markClass10TestCompleted(testKey) {
  const progress = getClass10Progress();

  const completedTests = Array.from(
    new Set([...(progress.completedTests || []), testKey])
  );

  saveClass10Progress({
    ...progress,
    completedTests,
  });
}

export function markClass10RecommendationGenerated() {
  const progress = getClass10Progress();

  saveClass10Progress({
    ...progress,
    recommendationGenerated: true,
  });
}

export function getCompletedClass10TestCount() {
  return getClass10Progress().completedTests.length;
}

export function areAllClass10TestsCompleted() {
  const progress = getClass10Progress();

  return CLASS10_TESTS.every((test) =>
    progress.completedTests.includes(test.key)
  );
}

export function canOpenClass10ResultModules() {
  return areAllClass10TestsCompleted();
}

export function getNextIncompleteClass10Test() {
  const progress = getClass10Progress();

  const nextTest = CLASS10_TESTS.find(
    (test) => !progress.completedTests.includes(test.key)
  );

  return nextTest || CLASS10_TESTS[0];
}

export function setCurrentClass10Test(testKey) {
  localStorage.setItem(CURRENT_TEST_KEY, testKey);
}

export function getCurrentClass10Test() {
  const saved = localStorage.getItem(CURRENT_TEST_KEY);

  const validSavedTest = CLASS10_TESTS.find((test) => test.key === saved);

  if (validSavedTest) {
    return validSavedTest;
  }

  return getNextIncompleteClass10Test();
}

export function resetClass10Progress() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(CURRENT_TEST_KEY);
}