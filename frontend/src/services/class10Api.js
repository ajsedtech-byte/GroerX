const LOCAL_API_BASE_URL = "http://localhost:5000/api";
const PRODUCTION_API_BASE_URL = "https://groerx-backend.onrender.com/api";

const STUDENT_ID = "demo-student";

const VALID_TEST_TYPES = [
  "riasec",
  "aptitude",
  "personality",
  "academic-style",
  "situational-iq",
  "values",
  "confidence",
];

function isLocalFrontend() {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  );
}

function getPrimaryApiBaseUrl() {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  if (isLocalFrontend()) {
    return LOCAL_API_BASE_URL;
  }

  return PRODUCTION_API_BASE_URL;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getSafeRound(round) {
  const parsedRound = Number(round);

  if (!Number.isInteger(parsedRound)) {
    return 1;
  }

  if (parsedRound < 1) {
    return 1;
  }

  if (parsedRound > 5) {
    return 5;
  }

  return parsedRound;
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 8000) {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function apiRequest(endpoint, options = {}) {
  const primaryBaseUrl = getPrimaryApiBaseUrl();

  const fallbackBaseUrl =
    primaryBaseUrl === LOCAL_API_BASE_URL
      ? PRODUCTION_API_BASE_URL
      : LOCAL_API_BASE_URL;

  const urlsToTry = [
    `${primaryBaseUrl}${endpoint}`,
    `${fallbackBaseUrl}${endpoint}`,
  ];

  let lastError = null;

  for (const url of urlsToTry) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const headers = {
          ...(options.headers || {}),
        };

        if (options.body) {
          headers["Content-Type"] = "application/json";
        }

        const response = await fetchWithTimeout(
          url,
          {
            method: options.method || "GET",
            mode: "cors",
            headers,
            ...options,
          },
          8000
        );

        const contentType = response.headers.get("content-type") || "";

        if (!contentType.includes("application/json")) {
          const text = await response.text();

          console.error("Wrong API response from:", url);
          console.error("Received:", text.slice(0, 500));

          throw new Error(`Backend returned non-JSON response from: ${url}`);
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "API request failed");
        }

        return data;
      } catch (error) {
        lastError = error;

        console.error(
          `API failed: ${url} | attempt ${attempt}`,
          error.message
        );

        if (attempt < 2) {
          await wait(700);
        }
      }
    }
  }

  throw lastError || new Error("API request failed");
}

export function getClass10Dashboard() {
  return apiRequest(`/class10/dashboard?studentId=${STUDENT_ID}`);
}

export function getClass10Questions(testType, round = 1) {
  if (!VALID_TEST_TYPES.includes(testType)) {
    throw new Error(`Invalid Class 10 test type: ${testType}`);
  }

  const safeRound = getSafeRound(round);

  return apiRequest(`/class10/questions/${testType}?round=${safeRound}`);
}

export function submitClass10Assessment({ testType, round = 1, answers = [] }) {
  if (!VALID_TEST_TYPES.includes(testType)) {
    throw new Error(`Invalid Class 10 test type: ${testType}`);
  }

  const safeRound = getSafeRound(round);

  return apiRequest("/class10/submit", {
    method: "POST",
    body: JSON.stringify({
      studentId: STUDENT_ID,
      testType,
      round: safeRound,
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