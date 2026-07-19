const API_BASE_URL = "http://localhost:5000/api";
const STUDENT_ID = "demo-student";

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
}

export function getClass10Dashboard() {
  return apiRequest(`/class10/dashboard?studentId=${STUDENT_ID}`);
}

export function getClass10Questions(testType, round = 1) {
  return apiRequest(`/class10/questions/${testType}?round=${round}`);
}

export function submitClass10Assessment({ testType, answers }) {
  return apiRequest("/class10/submit", {
    method: "POST",
    body: JSON.stringify({
      studentId: STUDENT_ID,
      testType,
      answers,
    }),
  });
}

export function getClass10Progress() {
  return apiRequest(`/class10/progress/${STUDENT_ID}`);
}

export function generateClass10Recommendation() {
  return apiRequest(`/class10/generate-recommendation/${STUDENT_ID}`, {
    method: "POST",
  });
}

export function getClass10Recommendation() {
  return apiRequest(`/class10/recommendation/${STUDENT_ID}`);
}

export function getClass10FinalReport() {
  return apiRequest(`/class10/final-report/${STUDENT_ID}`);
}

export const class10Tests = [
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

