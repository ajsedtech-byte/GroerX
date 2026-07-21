import React, { useEffect, useMemo, useState } from "react";

const TOTAL_QUESTIONS_PER_TEST = 100;
const QUESTIONS_PER_ROUND = 20;

const LOCAL_API_BASE_URL = "http://localhost:5000/api";
const PRODUCTION_API_BASE_URL = "https://groerx-backend.onrender.com/api";

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

function isLocalFrontend() {
  if (typeof window === "undefined") return false;

  return (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  );
}

function getApiBaseUrl() {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  return isLocalFrontend() ? LOCAL_API_BASE_URL : PRODUCTION_API_BASE_URL;
}

function safeParseArray(value) {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function safeParseObject(value) {
  try {
    const parsed = JSON.parse(value || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed
      : {};
  } catch {
    return {};
  }
}

function getRoundCompletedKey(testType, round) {
  return `class10_round_${round}_completed_${testType}`;
}

function isRoundCompleted(testType, round) {
  return localStorage.getItem(getRoundCompletedKey(testType, round)) === "true";
}

function getUnlockedRound(testType) {
  let unlockedRound = 1;

  for (let roundNo = 1; roundNo <= 4; roundNo++) {
    if (isRoundCompleted(testType, roundNo)) {
      unlockedRound = roundNo + 1;
    } else {
      break;
    }
  }

  return unlockedRound;
}

function isRoundUnlocked(testType, roundNo) {
  return roundNo <= getUnlockedRound(testType);
}

function getInitialRound(testType) {
  const savedRound = Number(localStorage.getItem(`${testType}_currentRound`));
  const unlockedRound = getUnlockedRound(testType);

  if (!Number.isInteger(savedRound)) return unlockedRound;
  if (savedRound < 1 || savedRound > 5) return unlockedRound;
  if (!isRoundUnlocked(testType, savedRound)) return unlockedRound;

  return savedRound;
}

function saveClass10AttemptProgress(testType, round, questionNo) {
  if (!testType || !round || !questionNo) return;

  const attemptedKey = `class10_attempted_${testType}`;
  const oldAttempted = safeParseArray(localStorage.getItem(attemptedKey));

  const attemptId = `round-${round}-q-${Number(questionNo)}`;
  const nextAttempted = Array.from(new Set([...oldAttempted, attemptId]));

  localStorage.setItem(attemptedKey, JSON.stringify(nextAttempted));

  const allProgress = safeParseObject(
    localStorage.getItem("class10AssessmentProgress")
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
    options: Array.isArray(question.options)
      ? question.options.map((option, optionIndex) => {
          if (typeof option === "string") {
            return {
              key: String.fromCharCode(65 + optionIndex),
              text: option,
            };
          }

          return {
            ...option,
            key: option.key || String.fromCharCode(65 + optionIndex),
            text: option.text || option.label || option.title || "Option",
          };
        })
      : [],
  }));
}

export default function Class10Assessment({
  testType = "riasec",
  setActivePage,
}) {
  const meta = TEST_META[testType] || TEST_META.riasec;

  const [round, setRound] = useState(() => getInitialRound(testType));
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backendInfo, setBackendInfo] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [roundRefreshKey, setRoundRefreshKey] = useState(0);

  useEffect(() => {
    const unlockedRound = getUnlockedRound(testType);

    if (!isRoundUnlocked(testType, round)) {
      setRound(unlockedRound);
      return;
    }

    localStorage.setItem(`${testType}_currentRound`, String(round));
    loadQuestions(round);
  }, [testType, round, roundRefreshKey]);

  async function loadQuestions(selectedRound = 1) {
    try {
      setLoading(true);
      setError("");
      setQuestions([]);
      setCurrentIndex(0);

      const apiBaseUrl = getApiBaseUrl();
      const url = `${apiBaseUrl}/class10/questions/${testType}?round=${selectedRound}&t=${Date.now()}`;

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

      const normalized = normalizeQuestions(rawQuestions).slice(
        0,
        QUESTIONS_PER_ROUND
      );

      setQuestions(normalized);

      const savedAnswers = safeParseObject(
        localStorage.getItem(
          `class10_${testType}_round_${selectedRound}_answers`
        )
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

  function openRound(roundNo) {
    if (!isRoundUnlocked(testType, roundNo)) {
      alert(`Round ${roundNo} is locked. Complete Round ${roundNo - 1} first.`);
      return;
    }

    setRound(roundNo);
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

      const apiBaseUrl = getApiBaseUrl();

      const response = await fetch(`${apiBaseUrl}/class10/submit`, {
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
        console.warn(
          "Backend submit failed but local round completion will continue:",
          data
        );
      }

      localStorage.removeItem(`class10_${testType}_round_${round}_answers`);

      localStorage.setItem(getRoundCompletedKey(testType, round), "true");

      if (round === 1) {
        localStorage.setItem(`class10_round1_completed_${testType}`, "true");
      }

      setRoundRefreshKey((previous) => previous + 1);

      if (round < 5) {
        const nextRound = round + 1;

        alert(`Round ${round} completed. Round ${nextRound} is now unlocked.`);
        setRound(nextRound);
        return;
      }

      alert("All 5 rounds of this assessment are completed.");
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

      <main className="a10-screen">
        <section className="a10-left-panel">
          <div className="a10-top-line">
            <button
              type="button"
              className="a10-back-btn"
              onClick={() => setActivePage("dashboard")}
            >
              ← Back
            </button>

            <div>
              <p>Question {currentIndex + 1}</p>
              <span>of {questions.length}</span>
            </div>
          </div>

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

          {!error && currentQuestion && (
            <section className="a10-question-area">
              <div className="a10-question-top">
                <p>Dimension: {currentQuestion?.dimension}</p>
                <span>
                  Backend Count: {backendInfo?.count || questions.length}
                </span>
              </div>

              <h1>{currentQuestion?.questionText}</h1>

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
            </section>
          )}
        </section>

        <aside className="a10-side-panel">
          <div className="a10-test-card">
            <p className="a10-eyebrow">Class 10 Career Assessment</p>
            <h2>{meta.title}</h2>
            <h3>{meta.subtitle}</h3>
          </div>

          <div className="a10-progress-card">
            <div className="a10-progress-head">
              <span>Progress</span>
              <strong>{progressPercent}%</strong>
            </div>

            <div className="a10-progress-track">
              <div style={{ width: `${progressPercent}%` }}></div>
            </div>

            <p>
              <b>{answeredCount}</b> / {questions.length} answered
            </p>
          </div>

          <div className="a10-round-card">
            <div>
              <p>Current Round</p>
              <h2>Round {round}</h2>
            </div>

            <div className="a10-round-buttons">
              {[1, 2, 3, 4, 5].map((roundNo) => {
                const locked = !isRoundUnlocked(testType, roundNo);
                const completed = isRoundCompleted(testType, roundNo);

                return (
                  <button
                    key={roundNo}
                    type="button"
                    title={
                      locked
                        ? `Round ${roundNo} locked`
                        : completed
                        ? `Round ${roundNo} completed`
                        : `Round ${roundNo} unlocked`
                    }
                    className={[
                      round === roundNo ? "active" : "",
                      locked ? "locked" : "",
                      completed ? "completed" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => openRound(roundNo)}
                  >
                    {roundNo}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="a10-step-card">
            <p>Questions</p>

            <div className="a10-step-grid">
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
            </div>
          </div>

          <div className="a10-action-card">
            <button
              type="button"
              className="a10-secondary-btn"
              onClick={goToPrevious}
              disabled={currentIndex === 0}
            >
              Previous
            </button>

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
                {submitting ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>
        </aside>
      </main>
    </section>
  );
}

const assessmentCss = `
.a10-page {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background:
    radial-gradient(circle at 82% 8%, rgba(0, 163, 255, 0.12), transparent 28%),
    #fbfbff;
  color: #111827;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.a10-screen {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding: 14px 18px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 330px;
  gap: 14px;
  box-sizing: border-box;
}

.a10-left-panel,
.a10-side-panel {
  min-height: 0;
}

.a10-left-panel {
  height: 100%;
  display: grid;
  grid-template-rows: 44px minmax(0, 1fr);
  gap: 10px;
}

.a10-top-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.a10-top-line div {
  display: flex;
  align-items: baseline;
  gap: 5px;
  color: #64748b;
  font-size: 12px;
  font-weight: 850;
}

.a10-top-line p {
  margin: 0;
  color: #005BFF;
  font-size: 16px;
  font-weight: 950;
}

.a10-top-line span {
  color: #64748b;
  font-size: 12px;
  font-weight: 800;
}

.a10-back-btn {
  border: 1px solid #BFD7FF;
  background: #ffffff;
  color: #005BFF;
  border-radius: 13px;
  padding: 9px 15px;
  font-size: 13px;
  font-weight: 950;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 91, 255, 0.08);
}

.a10-question-area {
  min-height: 0;
  height: 100%;
  border: 1px solid #d6e6ff;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);
  padding: 22px 24px;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr);
  gap: 14px;
}

.a10-question-top {
  display: flex;
  justify-content: space-between;
  gap: 14px;
}

.a10-question-top p,
.a10-question-top span {
  margin: 0;
  color: #005BFF;
  font-size: 12px;
  font-weight: 950;
}

.a10-question-top span {
  color: #64748b;
}

.a10-question-area h1 {
  margin: 0;
  color: #071b5f;
  font-size: clamp(24px, 2vw, 34px);
  line-height: 1.16;
  letter-spacing: -0.8px;
  font-weight: 950;
  max-width: 940px;
}

.a10-options {
  min-height: 0;
  display: grid;
  gap: 10px;
  align-content: start;
}

.a10-option {
  min-height: 54px;
  border-radius: 16px;
  border: 1px solid #d6e6ff;
  background: #ffffff;
  padding: 9px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
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
  box-shadow: 0 10px 20px rgba(0, 91, 255, 0.10);
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
  font-size: 14px;
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
  font-size: 14px;
  line-height: 1.25;
  font-weight: 850;
}

.a10-option small {
  display: block;
  margin-top: 2px;
  color: #64748b;
  font-size: 11px;
  line-height: 1.2;
  font-weight: 700;
}

.a10-side-panel {
  height: 100%;
  display: grid;
  grid-template-rows: auto auto auto minmax(0, 1fr) auto;
  gap: 10px;
  min-height: 0;
}

.a10-test-card,
.a10-progress-card,
.a10-round-card,
.a10-step-card,
.a10-action-card {
  border: 1px solid #d6e6ff;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.05);
  padding: 14px;
}

.a10-eyebrow {
  margin: 0 0 5px;
  color: #005BFF;
  font-size: 11px;
  line-height: 1.2;
  font-weight: 950;
}

.a10-test-card h2 {
  margin: 0;
  color: #071b5f;
  font-size: 21px;
  line-height: 1.05;
  font-weight: 950;
  letter-spacing: -0.5px;
}

.a10-test-card h3 {
  margin: 7px 0 0;
  color: #0f172a;
  font-size: 12px;
  line-height: 1.35;
  font-weight: 750;
}

.a10-progress-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #071b5f;
  font-size: 13px;
  font-weight: 950;
  margin-bottom: 8px;
}

.a10-progress-head strong {
  color: #005BFF;
}

.a10-progress-track {
  height: 9px;
  border-radius: 999px;
  background: #e6f0ff;
  overflow: hidden;
}

.a10-progress-track div {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #005BFF, #00A3FF);
}

.a10-progress-card p {
  margin: 9px 0 0;
  color: #64748b;
  font-size: 12px;
  font-weight: 800;
}

.a10-progress-card b {
  color: #005BFF;
}

.a10-round-card {
  display: grid;
  gap: 10px;
}

.a10-round-card p {
  margin: 0 0 2px;
  color: #005BFF;
  font-size: 11px;
  font-weight: 950;
}

.a10-round-card h2 {
  margin: 0;
  color: #071b5f;
  font-size: 18px;
  font-weight: 950;
}

.a10-round-buttons {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 7px;
}

.a10-round-buttons button {
  height: 36px;
  border-radius: 999px;
  border: 1px solid #BFD7FF;
  background: white;
  color: #005BFF;
  font-size: 13px;
  font-weight: 950;
  cursor: pointer;
}

.a10-round-buttons button.active {
  background: linear-gradient(135deg, #005BFF, #00A3FF);
  color: white;
  border-color: transparent;
}

.a10-round-buttons button.locked {
  opacity: 0.45;
  cursor: not-allowed;
  background: #f8fafc;
  color: #94a3b8;
  border-color: #e5e7eb;
}

.a10-round-buttons button.completed {
  border-color: #22c55e;
  color: #16a34a;
  background: #f0fdf4;
}

.a10-round-buttons button.completed.active {
  background: linear-gradient(135deg, #005BFF, #00A3FF);
  color: white;
  border-color: transparent;
}

.a10-step-card {
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.a10-step-card p {
  margin: 0 0 10px;
  color: #005BFF;
  font-size: 12px;
  font-weight: 950;
}

.a10-step-grid {
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 7px;
  align-content: start;
}

.a10-step {
  height: 33px;
  border-radius: 12px;
  border: 1px solid #d6d3f1;
  background: #ffffff;
  color: #475569;
  font-size: 12px;
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

.a10-action-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9px;
}

.a10-secondary-btn,
.a10-primary-btn {
  height: 40px;
  border-radius: 13px;
  font-size: 13px;
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
  box-shadow: 0 12px 24px rgba(0, 91, 255, 0.16);
}

.a10-secondary-btn:disabled,
.a10-primary-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.a10-error-card {
  border: 1px solid #fecaca;
  background: #fff1f2;
  color: #991b1b;
  border-radius: 20px;
  padding: 18px;
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
  max-height: 220px;
  overflow: auto;
  background: #111827;
  color: white;
  border-radius: 14px;
  padding: 14px;
  font-size: 12px;
}

.a10-loader-card {
  width: 340px;
  background: white;
  border: 1px solid #e7e2f4;
  border-radius: 24px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.08);
  margin: 100px auto;
}

.a10-loader-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

@media (max-width: 1100px) {
  .a10-screen {
    grid-template-columns: 1fr;
    overflow-y: auto;
  }

  .a10-page {
    overflow-y: auto;
  }

  .a10-side-panel {
    height: auto;
  }
}
`;