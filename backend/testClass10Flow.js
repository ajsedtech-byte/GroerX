const BASE_URL = "http://localhost:5000/api/class10";

const studentId = "demo-student";

const tests = [
  "riasec",
  "aptitude",
  "personality",
  "academic-style",
  "situational-iq",
  "values",
  "confidence",
];

async function request(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    console.error("Request failed:", url);
    console.error(data);
    process.exit(1);
  }

  return data;
}

async function run() {
  console.log("Starting Class 10 backend flow test...\n");

  for (const testType of tests) {
    console.log(`Fetching questions for: ${testType}`);

    const questionResponse = await request(`${BASE_URL}/questions/${testType}`);
    const questions = questionResponse.data;

    if (!questions.length) {
      throw new Error(`No questions found for ${testType}`);
    }

    const answers = questions.map((question) => ({
      questionId: question._id,
      selectedKey: "A",
    }));

    console.log(`Submitting ${answers.length} answers for: ${testType}`);

    await request(`${BASE_URL}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId,
        testType,
        answers,
      }),
    });

    console.log(`${testType} submitted successfully\n`);
  }

  console.log("Checking progress...");

  const progress = await request(`${BASE_URL}/progress/${studentId}`);
  console.log("Progress:", progress.data.completionPercentage + "%");

  console.log("\nGenerating recommendation...");

  const recommendation = await request(`${BASE_URL}/generate-recommendation/${studentId}`, {
    method: "POST",
  });

  console.log("Recommended Stream:", recommendation.data.topStream.name);
  console.log("Match:", recommendation.data.topStream.match + "%");

  console.log("\nFetching final report...");

  const report = await request(`${BASE_URL}/final-report/${studentId}`);

  console.log("\nFinal Report Ready:");
  console.log("Top Stream:", report.data.topStream.name);
  console.log("Holland Code:", report.data.profile.hollandCode);
  console.log("Summary:", report.data.profile.summary);

  console.log("\nCLASS 10 BACKEND FLOW IS WORKING SUCCESSFULLY");
}

run().catch((error) => {
  console.error("Test failed:", error.message);
  process.exit(1);
});