import React, { useEffect, useMemo, useState } from "react";

const TOTAL_QUESTIONS_PER_TEST = 100;

function saveClass10AttemptProgress(testType, round, questionNo) {
  if (!testType || !round || !questionNo) return;

  const attemptedKey = `class10_attempted_${testType}`;
  const oldAttempted = JSON.parse(localStorage.getItem(attemptedKey) || "[]");
  const attemptId = `round-${round}-q-${Number(questionNo)}`;
  const nextAttempted = Array.from(new Set([...oldAttempted, attemptId]));

  localStorage.setItem(attemptedKey, JSON.stringify(nextAttempted));

  const allProgress = JSON.parse(
    localStorage.getItem("class10AssessmentProgress") || "{}"
  );

  allProgress[testType] = {
    testType,
    attempted: nextAttempted.length,
    total: TOTAL_QUESTIONS_PER_TEST,
    percentage: Math.min(
      100,
      Math.round((nextAttempted.length / TOTAL_QUESTIONS_PER_TEST) * 100)
    ),
    completed: nextAttempted.length >= TOTAL_QUESTIONS_PER_TEST,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(
    "class10AssessmentProgress",
    JSON.stringify(allProgress)
  );
}

const API_BASE_URL = "https://groerx-backend.onrender.com/api";
const STUDENT_ID = "demo-student";

const TEST_META = {
  riasec: {
    title: "RIASEC Interest Test",
    subtitle: "Finds the student's interest pattern using Holland Code.",
  },
  aptitude: {
    title: "Aptitude Test",
    subtitle: "Measures logic, reasoning, and problem-solving ability.",
  },
  personality: {
    title: "Personality Test",
    subtitle: "Understands behaviour, discipline, confidence, and working style.",
  },
  "academic-style": {
    title: "Academic Style Test",
    subtitle: "Identifies the student's learning and study approach.",
  },
  "situational-iq": {
    title: "Situational IQ Test",
    subtitle: "Checks real-life decision-making ability.",
  },
  values: {
    title: "Values Test",
    subtitle: "Understands what matters most while choosing a path.",
  },
  confidence: {
    title: "Confidence Test",
    subtitle: "Measures self-belief and career readiness.",
  },
};

function normalizeQuestions(apiQuestions = []) {
  return apiQuestions.map((question, index) => ({
    id: String(question._id || question.id || `q-${index + 1}`),
    originalId: question._id || question.id || `q-${index + 1}`,
    questionNo: question.questionNo || index + 1,
    questionText:
      question.questionText ||
      question.question ||
      question.text ||
      `Question ${index + 1}`,
    dimension: question.dimension || "General",
    options: Array.isArray(question.options) ? question.options : [],
  }));
}

export default function Class10Assessment({
  testType = "riasec",
  setActivePage,
}) {
  const meta = TEST_META[testType] || TEST_META.riasec;

  const [round, setRound] = useState(
    Number(localStorage.getItem(`${testType}_currentRound`)) || 1
  );

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backendInfo, setBackendInfo] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem(`${testType}_currentRound`, String(round));
    loadQuestions(round);
  }, [testType, round]);

  async function loadQuestions(selectedRound = 1) {
    try {
      setLoading(true);
      setError("");
      setQuestions([]);
      setCurrentIndex(0);

      const url = `${API_BASE_URL}/class10/questions/${testType}?round=${selectedRound}&t=${Date.now()}`;

      console.log("FETCHING QUESTIONS FROM:", url);

      const response = await fetch(url);
      const data = await response.json();

      console.log("QUESTIONS API RESPONSE:", data);

      setBackendInfo(data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch questions.");
      }

      const rawQuestions = data.questions || data.data || [];

      if (!Array.isArray(rawQuestions) || rawQuestions.length === 0) {
        throw new Error(
          `No questions found for ${testType}, round ${selectedRound}.`
        );
      }

      const normalized = normalizeQuestions(rawQuestions);
      setQuestions(normalized);

      const savedAnswers = JSON.parse(
        localStorage.getItem(
          `class10_${testType}_round_${selectedRound}_answers`
        ) || "{}"
      );

      setAnswers(savedAnswers);
    } catch (err) {
      console.error("QUESTION LOAD ERROR:", err);
      setError(err.message || "Unable to load questions.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    localStorage.setItem(
      `class10_${testType}_round_${round}_answers`,
      JSON.stringify(answers)
    );
  }, [answers, testType, round]);

  const currentQuestion = questions[currentIndex];

  const answeredCount = useMemo(() => {
    return questions.filter((question) => answers[question.id]).length;
  }, [answers, questions]);

  const progressPercent = useMemo(() => {
    if (!questions.length) return 0;
    return Math.round((answeredCount / questions.length) * 100);
  }, [answeredCount, questions.length]);

  const progressDegrees = progressPercent * 3.6;

  function selectOption(optionKey) {
    if (!currentQuestion) return;

    saveClass10AttemptProgress(testType, round, currentQuestion.questionNo);

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: optionKey,
    }));
  }

  function goToNext() {
    setCurrentIndex((previous) => Math.min(questions.length - 1, previous + 1));
  }

  function goToPrevious() {
    setCurrentIndex((previous) => Math.max(0, previous - 1));
  }

  async function submitAssessment() {
    const firstMissingIndex = questions.findIndex(
      (question) => !answers[question.id]
    );

    if (firstMissingIndex !== -1) {
      setCurrentIndex(firstMissingIndex);
      alert(`Question ${firstMissingIndex + 1} is unanswered.`);
      return;
    }

    try {
      setSubmitting(true);

      questions.forEach((question) => {
        if (answers[question.id]) {
          saveClass10AttemptProgress(testType, round, question.questionNo);
        }
      });

      const payloadAnswers = questions.map((question) => ({
        questionId: question.originalId,
        questionNo: question.questionNo,
        selectedOption: answers[question.id],
        answer: answers[question.id],
      }));

      const response = await fetch(`${API_BASE_URL}/class10/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: STUDENT_ID,
          testType,
          round,
          answers: payloadAnswers,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Assessment submit failed.");
      }

      localStorage.removeItem(`class10_${testType}_round_${round}_answers`);

      alert("Assessment submitted successfully.");
      setActivePage("dashboard");
    } catch (err) {
      alert(err.message || "Submit failed.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <section className="a10-page">
        <style>{assessmentCss}</style>
        <div className="a10-loader-card">
          <div className="a10-loader-icon">🧠</div>
          <h2>Loading questions from backend...</h2>
          <p>Please wait.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="a10-page">
      <style>{assessmentCss}</style>

      <main className="a10-content">
        <button
          type="button"
          className="a10-back-btn"
          onClick={() => setActivePage("dashboard")}
        >
          ← Back to Dashboard
        </button>

        <section className="a10-hero-card">
          <div>
            <p className="a10-eyebrow">Class 10 Career Assessment</p>

            <h1>{meta.title}</h1>

            <h3>{meta.subtitle}</h3>

            <div className="a10-api-badge">
              Backend Status:{" "}
              <b>
                {backendInfo?.source || "API"} | Count:{" "}
                {backendInfo?.count || questions.length}
              </b>
            </div>

            <p className="a10-progress-text">
              Answered <span>{answeredCount}</span> of{" "}
              <span>{questions.length}</span> questions
            </p>
          </div>

          <div
            className="a10-progress-ring"
            style={{
              background: `conic-gradient(#005BFF 0deg ${progressDegrees}deg, #E6F0FF ${progressDegrees}deg 360deg)`,
            }}
          >
            <div className="a10-progress-ring-inner">
              <p className="a10-progress-round">Round {round} / 5</p>
              <strong>{progressPercent}%</strong>
              <span className="a10-progress-done">Done</span>
            </div>
          </div>
        </section>

        <section className="a10-round-card">
          <div>
            <p>Current Round</p>
            <h2>Round {round}</h2>
          </div>

          <div className="a10-round-buttons">
            {[1, 2, 3, 4, 5].map((roundNo) => (
              <button
                key={roundNo}
                type="button"
                className={round === roundNo ? "active" : ""}
                onClick={() => setRound(roundNo)}
              >
                {roundNo}
              </button>
            ))}
          </div>
        </section>

        {error && (
          <section className="a10-error-card">
            <h2>No Questions Loaded</h2>
            <p>{error}</p>

            <button type="button" onClick={() => loadQuestions(round)}>
              Reload Questions
            </button>

            <pre>{JSON.stringify(backendInfo, null, 2)}</pre>
          </section>
        )}

        {!error && questions.length > 0 && (
          <>
            <section className="a10-step-strip">
              {questions.map((question, index) => {
                const active = index === currentIndex;
                const done = Boolean(answers[question.id]);

                return (
                  <button
                    key={question.id}
                    type="button"
                    className={`a10-step ${active ? "active" : ""} ${
                      done ? "done" : ""
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </section>

            <section className="a10-question-card">
              <div className="a10-question-top">
                <p>
                  Question {currentIndex + 1} of {questions.length}
                </p>

                <span>Dimension: {currentQuestion?.dimension}</span>
              </div>

              <h2>{currentQuestion?.questionText}</h2>

              <div className="a10-options">
                {currentQuestion?.options?.map((option) => {
                  const selected = answers[currentQuestion.id] === option.key;

                  return (
                    <button
                      key={option.key}
                      type="button"
                      className={`a10-option ${selected ? "selected" : ""}`}
                      onClick={() => selectOption(option.key)}
                    >
                      <span>{option.key}</span>

                      <div>
                        <p>{option.text}</p>

                        {option.dimension && (
                          <small>
                            {option.riasec ? `${option.riasec} - ` : ""}
                            {option.dimension}
                          </small>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="a10-footer">
                <button
                  type="button"
                  className="a10-secondary-btn"
                  onClick={goToPrevious}
                  disabled={currentIndex === 0}
                >
                  Previous
                </button>

                <div className="a10-footer-center">
                  {answeredCount}/{questions.length} answered
                </div>

                {currentIndex < questions.length - 1 ? (
                  <button
                    type="button"
                    className="a10-primary-btn"
                    onClick={goToNext}
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="button"
                    className="a10-primary-btn"
                    onClick={submitAssessment}
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit Assessment"}
                  </button>
                )}
              </div>
            </section>
          </>
        )}
      </main>
    </section>
  );
}

const assessmentCss = `
.a10-page {
  position: relative;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background: #fbfbff;
  color: #111827;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.a10-content {
  position: relative;
  z-index: 2;
  padding: 18px 26px 36px;
  min-height: 100vh;
}

.a10-back-btn {
  border: 1px solid #BFD7FF;
  background: #ffffff;
  color: #005BFF;
  border-radius: 14px;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  margin-bottom: 14px;
}

.a10-hero-card {
  border: 1px solid #e7e2f4;
  background: linear-gradient(135deg, #ffffff 0%, #F6FAFF 100%);
  border-radius: 24px;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.06);
  padding: 24px 26px;
  display: grid;
  grid-template-columns: 1fr 170px;
  gap: 26px;
  align-items: center;
  margin-bottom: 14px;
}

.a10-eyebrow {
  margin: 0 0 7px;
  color: #005BFF;
  font-size: 14px;
  font-weight: 950;
}

.a10-hero-card h1 {
  margin: 0;
  color: #0f172a;
  font-size: 34px;
  line-height: 1.05;
  font-weight: 950;
  letter-spacing: -1px;
}

.a10-hero-card h3 {
  margin: 8px 0 10px;
  color: #64748b;
  font-size: 14px;
  font-weight: 650;
}

.a10-api-badge {
  width: fit-content;
  border: 1px solid #BFD7FF;
  background: #ffffff;
  color: #005BFF;
  border-radius: 999px;
  padding: 7px 12px;
  font-size: 12px;
  font-weight: 850;
  margin-bottom: 14px;
}

.a10-progress-text {
  margin: 0;
  color: #64748b;
  font-size: 13px;
  font-weight: 850;
}

.a10-progress-text span {
  color: #005BFF;
}

.a10-progress-ring {
  width: 150px;
  height: 150px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: end;
  box-shadow: 0 16px 36px rgba(0, 91, 255, 0.12);
  padding: 12px;
}

.a10-progress-ring-inner {
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: inset 0 0 0 1px #EFF6FF;
  text-align: center;
}

.a10-progress-round {
  margin: 0 0 6px;
  color: #005BFF;
  font-size: 12px;
  font-weight: 950;
  line-height: 1;
}

.a10-progress-ring-inner strong {
  color: #005BFF;
  font-size: 36px;
  font-weight: 950;
  line-height: 1;
  margin-bottom: 6px;
}

.a10-progress-done {
  color: #64748b;
  font-size: 13px;
  font-weight: 850;
  line-height: 1;
}

.a10-round-card {
  border: 1px solid #e7e2f4;
  background: #ffffff;
  border-radius: 18px;
  padding: 14px 18px;
  margin-bottom: 14px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
}

.a10-round-card p {
  margin: 0 0 2px;
  color: #005BFF;
  font-size: 12px;
  font-weight: 950;
}

.a10-round-card h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 950;
}

.a10-round-buttons {
  display: flex;
  gap: 8px;
}

.a10-round-buttons button {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: 1px solid #BFD7FF;
  background: white;
  color: #005BFF;
  font-weight: 950;
  cursor: pointer;
}

.a10-round-buttons button.active {
  background: linear-gradient(135deg, #005BFF, #00A3FF);
  color: white;
  border-color: transparent;
}

.a10-error-card {
  border: 1px solid #fecaca;
  background: #fff1f2;
  color: #991b1b;
  border-radius: 20px;
  padding: 20px;
  margin-top: 16px;
}

.a10-error-card button {
  border: none;
  background: #dc2626;
  color: white;
  border-radius: 12px;
  padding: 10px 14px;
  font-weight: 900;
  cursor: pointer;
  margin: 10px 0;
}

.a10-error-card pre {
  max-height: 260px;
  overflow: auto;
  background: #111827;
  color: white;
  border-radius: 14px;
  padding: 14px;
  font-size: 12px;
}

.a10-step-strip {
  display: flex;
  gap: 9px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}

.a10-step {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid #d6d3f1;
  background: #ffffff;
  color: #475569;
  font-size: 14px;
  font-weight: 950;
  cursor: pointer;
}

.a10-step.done {
  background: #EFF6FF;
  border-color: #BFD7FF;
  color: #005BFF;
}

.a10-step.active {
  background: linear-gradient(135deg, #005BFF, #00A3FF);
  border-color: transparent;
  color: white;
}

.a10-question-card {
  border: 1px solid #e7e2f4;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.06);
  padding: 20px;
}

.a10-question-top {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

.a10-question-top p {
  margin: 0;
  color: #3b82f6;
  font-size: 14px;
  font-weight: 950;
}

.a10-question-top span {
  color: #64748b;
  font-size: 13px;
  font-weight: 850;
}

.a10-question-card h2 {
  margin: 0 0 16px;
  color: #0f172a;
  font-size: 24px;
  line-height: 1.3;
  font-weight: 950;
}

.a10-options {
  display: grid;
  gap: 10px;
}

.a10-option {
  min-height: 56px;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  padding: 11px 15px;
  display: flex;
  align-items: center;
  gap: 14px;
  text-align: left;
  cursor: pointer;
}

.a10-option:hover {
  border-color: #60A5FA;
  background: #F6FAFF;
}

.a10-option.selected {
  border-color: #005BFF;
  background: linear-gradient(135deg, #f7f0ff 0%, #fcf8ff 100%);
  box-shadow: 0 12px 24px rgba(0, 91, 255, 0.12);
}

.a10-option span {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: #eff6ff;
  color: #1d4ed8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 950;
  flex-shrink: 0;
}

.a10-option.selected span {
  background: #005BFF;
  color: white;
}

.a10-option p {
  margin: 0;
  color: #0f172a;
  font-size: 16px;
  font-weight: 850;
}

.a10-option small {
  display: block;
  margin-top: 3px;
  color: #64748b;
  font-size: 12px;
  font-weight: 700;
}

.a10-footer {
  position: sticky;
  bottom: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.88), #ffffff);
  margin-top: 16px;
  padding-top: 12px;
  display: grid;
  grid-template-columns: 150px 1fr 180px;
  align-items: center;
  gap: 14px;
}

.a10-footer-center {
  text-align: center;
  color: #64748b;
  font-size: 13px;
  font-weight: 850;
}

.a10-secondary-btn,
.a10-primary-btn {
  height: 42px;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 950;
  cursor: pointer;
}

.a10-secondary-btn {
  border: 1px solid #d1d5db;
  background: white;
  color: #475569;
}

.a10-primary-btn {
  border: none;
  background: linear-gradient(135deg, #005BFF 0%, #00A3FF 100%);
  color: white;
  box-shadow: 0 14px 30px rgba(0, 91, 255, 0.18);
}

.a10-secondary-btn:disabled,
.a10-primary-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.a10-loader-card {
  width: 360px;
  background: white;
  border: 1px solid #e7e2f4;
  border-radius: 24px;
  padding: 34px;
  text-align: center;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.08);
  margin: 100px auto;
}

.a10-loader-icon {
  font-size: 44px;
  margin-bottom: 12px;
}
`;



