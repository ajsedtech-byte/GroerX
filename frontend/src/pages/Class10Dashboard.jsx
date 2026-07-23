import React, { useEffect, useMemo, useState } from "react";

import {
  getClass10Recommendation,
  generateClass10Recommendation,
} from "../services/class10Api";

const TEST_TOTAL_QUESTIONS = 20;

const TEST_CONFIG = [
  {
    key: "riasec",
    name: "RIASEC Interest Test",
    icon: "🧬",
    color: "linear-gradient(135deg, #005BFF, #3b82f6)",
  },
  {
    key: "aptitude",
    name: "Aptitude Test",
    icon: "🧠",
    color: "linear-gradient(135deg, #3b82f6, #06b6d4)",
  },
  {
    key: "personality",
    name: "Personality Test",
    icon: "👤",
    color: "linear-gradient(135deg, #84cc16, #65a30d)",
  },
  {
    key: "academic-style",
    name: "Academic Style Test",
    icon: "📖",
    color: "linear-gradient(135deg, #f59e0b, #f97316)",
  },
  {
    key: "situational-iq",
    name: "Situational IQ Test",
    icon: "🎯",
    color: "linear-gradient(135deg, #0ea5e9, #0284c7)",
  },
  {
    key: "values",
    name: "Values Test",
    icon: "💎",
    color: "linear-gradient(135deg, #06b6d4, #0891b2)",
  },
  {
    key: "confidence",
    name: "Confidence Test",
    icon: "🛡️",
    color: "linear-gradient(135deg, #0B63F6, #6366f1)",
  },
];

function safeParseArray(value) {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getRoundOneAttempts(testKey) {
  const attempted = safeParseArray(
    localStorage.getItem(`class10_attempted_${testKey}`)
  );

  const roundOneAttempts = attempted.filter((item) =>
    String(item).startsWith("round-1-q-")
  );

  return Array.from(new Set(roundOneAttempts));
}

function getClass10TestProgress(testKey) {
  const roundOneAttempts = getRoundOneAttempts(testKey);
  const attemptedCount = Math.min(TEST_TOTAL_QUESTIONS, roundOneAttempts.length);

  return {
    attempted: attemptedCount,
    total: TEST_TOTAL_QUESTIONS,
    percentage: Math.min(
      100,
      Math.round((attemptedCount / TEST_TOTAL_QUESTIONS) * 100)
    ),
    completed: attemptedCount >= TEST_TOTAL_QUESTIONS,
  };
}

function getAssessmentTests() {
  return TEST_CONFIG.map((test) => {
    const progress = getClass10TestProgress(test.key);

    return {
      ...test,
      attempted: progress.attempted,
      total: progress.total,
      percentage: progress.percentage,
      completed: progress.completed,
      status: progress.completed
        ? "Round 1 Completed"
        : progress.attempted > 0
        ? "Round 1 In Progress"
        : "Not Started",
    };
  });
}

function isValidRecommendation(recommendation) {
  if (!recommendation) return false;

  const stream =
    recommendation?.recommendedStream ||
    recommendation?.stream ||
    recommendation?.topStream ||
    recommendation?.recommendation?.recommendedStream;

  return Boolean(stream);
}

export default function Class10Dashboard({ setActivePage }) {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const tests = useMemo(() => getAssessmentTests(), [refreshKey]);

  async function loadDashboard() {
    try {
      setLoading(true);

      const recommendationResponse = await getClass10Recommendation().catch(
        () => null
      );

      setRecommendation(
        recommendationResponse?.data || recommendationResponse || null
      );

      setRefreshKey((previous) => previous + 1);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();

    const refreshOnFocus = () => {
      setRefreshKey((previous) => previous + 1);
    };

    window.addEventListener("focus", refreshOnFocus);

    return () => {
      window.removeEventListener("focus", refreshOnFocus);
    };
  }, []);

  function getCompletedCount() {
    return tests.filter((test) => test.completed).length;
  }

  function getProgressPercent() {
    const totalAttempted = tests.reduce(
      (sum, test) => sum + Number(test.attempted || 0),
      0
    );

    const totalQuestions = tests.length * TEST_TOTAL_QUESTIONS;

    if (!totalQuestions) return 0;

    return Math.min(100, Math.round((totalAttempted / totalQuestions) * 100));
  }

  function areAllRoundOneTestsCompleted() {
    return getCompletedCount() === TEST_CONFIG.length;
  }

  function getStreamName() {
    if (!areAllRoundOneTestsCompleted()) {
      return "Locked";
    }

    if (!isValidRecommendation(recommendation)) {
      return "Generate First";
    }

    const raw =
      recommendation?.recommendedStream ||
      recommendation?.stream ||
      recommendation?.topStream ||
      recommendation?.recommendation?.recommendedStream;

    if (typeof raw === "string") return raw;

    return raw?.name || raw?.streamName || raw?.title || "Recommended";
  }

  function getMatchScore() {
    if (!areAllRoundOneTestsCompleted()) {
      return null;
    }

    return (
      recommendation?.matchScore ||
      recommendation?.match ||
      recommendation?.recommendedStream?.matchScore ||
      recommendation?.recommendation?.matchScore ||
      null
    );
  }

  function openLockedModule(pageName) {
    if (!areAllRoundOneTestsCompleted()) {
      alert("Complete Round 1 of all 7 assessments first to unlock this module.");
      return;
    }

    setActivePage(pageName);
  }

  async function handleGenerateRecommendation() {
    if (!areAllRoundOneTestsCompleted()) {
      alert(
        "Complete Round 1 of all 7 assessments first before generating recommendation."
      );
      return;
    }

    try {
      setGenerating(true);
      await generateClass10Recommendation();
      await loadDashboard();
    } finally {
      setGenerating(false);
    }
  }

  const completedCount = getCompletedCount();
  const progressPercent = getProgressPercent();
  const allTestsCompleted = areAllRoundOneTestsCompleted();
  const streamName = getStreamName();
  const matchScore = getMatchScore();

  if (loading) {
    return (
      <div className="cx-loading">
        <style>{dashboardCss}</style>

        <div className="cx-loader-card">
          <div className="cx-loader-icon">🎒</div>
          <h2>Loading Class 10 Dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <section className="cx-page">
      <style>{dashboardCss}</style>

      <div className="cx-bg-blob"></div>
      <div className="cx-stars">✦</div>

      <header className="cx-header">
        <p>
          <span>Dashboard</span> <b>›</b> Class 10 Career OS
        </p>

        <h1>Class 10 Career Dashboard</h1>

        <h3>
          Complete Round 1 of all 7 assessments. Stream Explorer, Career
          Explorer, and Final Report unlock after Round 1 completion.
        </h3>
      </header>

      <section className="cx-summary-grid">
        <SummaryCard
          icon="📈"
          label="Round 1 Progress"
          value={`${progressPercent}%`}
          progress
        />

        <SummaryCard
          icon="📋"
          label="Round 1 Tests Completed"
          value={`${completedCount}/7`}
          progress
        />

        <SummaryCard
          icon={allTestsCompleted ? "🎓" : "🔒"}
          label="Recommended Stream"
          value={streamName}
          locked={!allTestsCompleted}
        />

        <SummaryCard
          icon={allTestsCompleted ? "🚀" : "🔐"}
          label="Next Action"
          value={
            allTestsCompleted
              ? "Generate final stream recommendation"
              : "Complete Round 1 assessments"
          }
          small
        />
      </section>

      <section className="cx-main-grid">
        <div className="cx-card cx-assessment-card">
          <div className="cx-section-title">
            <span className="cx-title-icon green">✅</span>
            <h2>Assessment Progress</h2>
          </div>

          <div className="cx-test-list">
            {tests.map((test) => (
              <div key={test.key} className="cx-test-row">
                <div
                  className="cx-test-icon"
                  style={{ background: test.color }}
                >
                  {test.icon}
                </div>

                <div className="cx-test-info">
                  <h4>{test.name}</h4>
                  <p>
                    {test.status} · {test.attempted}/{test.total} questions
                  </p>
                </div>

                <strong className="cx-score">{test.percentage}%</strong>

                <button
                  type="button"
                  onClick={() => setActivePage(`assessment:${test.key}`)}
                  className="cx-retake-btn"
                >
                  {test.attempted > 0 ? "Continue" : "Start"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <aside className="cx-card cx-action-card">
          <div className="cx-section-title">
            <span className="cx-title-icon orange">⚡</span>
            <h2>Quick Actions</h2>
          </div>

          <div className="cx-action-list">
            <button
              type="button"
              className="cx-action-btn"
              onClick={() => setActivePage("assessment:riasec")}
            >
              <span>▶️ Start Round 1 Assessment</span>
              <b>›</b>
            </button>

            <button
              type="button"
              className={`cx-action-btn ${!allTestsCompleted ? "locked" : ""}`}
              onClick={handleGenerateRecommendation}
            >
              <span>
                {!allTestsCompleted
                  ? "🔒 Generate Recommendation"
                  : `✨ ${
                      generating ? "Generating..." : "Generate Recommendation"
                    }`}
              </span>
              <b>›</b>
            </button>

            <button
              type="button"
              className={`cx-action-btn ${!allTestsCompleted ? "locked" : ""}`}
              onClick={() => openLockedModule("stream-explorer")}
            >
              <span>
                {allTestsCompleted
                  ? "🧭 Open Stream Explorer"
                  : "🔒 Stream Explorer Locked"}
              </span>
              <b>›</b>
            </button>

            <button
              type="button"
              className={`cx-action-btn ${!allTestsCompleted ? "locked" : ""}`}
              onClick={() => openLockedModule("career-explorer")}
            >
              <span>
                {allTestsCompleted
                  ? "💼 Open Career Explorer"
                  : "🔒 Career Explorer Locked"}
              </span>
              <b>›</b>
            </button>

            <button
              type="button"
              className={`cx-action-btn ${!allTestsCompleted ? "locked" : ""}`}
              onClick={() => openLockedModule("final-report")}
            >
              <span>
                {allTestsCompleted
                  ? "📄 View Final Report"
                  : "🔒 Final Report Locked"}
              </span>
              <b>›</b>
            </button>
          </div>

          {!allTestsCompleted ? (
            <div className="cx-locked-card">
              <div className="cx-trophy">🔒</div>

              <div className="cx-locked-content">
                <p>Result Modules Locked</p>
                <h3>Complete Round 1 of all 7 tests</h3>
                <h4>
                  Stream Explorer, Career Explorer, and Final Report unlock
                  after 20 questions from each assessment are completed.
                </h4>
              </div>
            </div>
          ) : (
            <div className="cx-recommend-card">
              <div className="cx-trophy">🏆</div>

              <div className="cx-locked-content">
                <p>Latest Recommendation</p>
                <h3>{streamName}</h3>
                <h4>
                  Match:{" "}
                  <span>{matchScore ? `${matchScore}%` : "Generate first"}</span>
                </h4>
              </div>
            </div>
          )}
        </aside>
      </section>
    </section>
  );
}

function SummaryCard({ icon, label, value, small, progress, locked }) {
  return (
    <div className={`cx-summary-card ${locked ? "locked" : ""}`}>
      <div className="cx-summary-content">
        <div className="cx-summary-icon">{icon}</div>

        <div>
          <p>{label}</p>
          <h2 className={small ? "small" : ""}>{value}</h2>
        </div>
      </div>

      {progress && <div className="cx-card-progress"></div>}
    </div>
  );
}

const dashboardCss = `
.cx-page {
  position: relative;
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 22px 30px 26px;
  background: #fbfbff;
  color: #111827;
  display: grid;
  grid-template-rows: auto auto auto;
  gap: 16px;
  box-sizing: border-box;
}

.cx-bg-blob {
  position: absolute;
  right: -140px;
  top: -160px;
  width: 500px;
  height: 360px;
  background: radial-gradient(circle, rgba(0, 91, 255, 0.16), transparent 66%);
  border-radius: 999px;
  pointer-events: none;
}

.cx-stars {
  position: absolute;
  right: 82px;
  top: 72px;
  color: #0B63F6;
  font-size: 30px;
  opacity: 0.55;
}

.cx-header {
  position: relative;
  z-index: 2;
}

.cx-header p {
  margin: 0 0 8px;
  color: #64748b;
  font-size: 14px;
  font-weight: 750;
}

.cx-header p span {
  color: #005BFF;
}

.cx-header p b {
  color: #94a3b8;
  margin: 0 5px;
}

.cx-header h1 {
  margin: 0;
  font-size: 36px;
  line-height: 1.02;
  color: #0f172a;
  letter-spacing: -1px;
  font-weight: 950;
}

.cx-header h3 {
  max-width: 880px;
  margin: 9px 0 0;
  color: #64748b;
  font-size: 14px;
  line-height: 1.45;
  font-weight: 650;
}

.cx-summary-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.cx-summary-card {
  min-height: 88px;
  border-radius: 18px;
  border: 1px solid #d6e6ff;
  background: #ffffff;
  box-shadow: 0 12px 26px rgba(15, 23, 42, 0.05);
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
}

.cx-summary-card.locked {
  background: linear-gradient(135deg, #ffffff, #f8fbff);
}

.cx-summary-content {
  display: flex;
  align-items: center;
  gap: 14px;
}

.cx-summary-icon {
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: #EFF6FF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 21px;
  flex-shrink: 0;
}

.cx-summary-card p {
  margin: 0 0 4px;
  color: #64748b;
  font-weight: 800;
  font-size: 13px;
}

.cx-summary-card h2 {
  margin: 0;
  color: #005BFF;
  font-size: 24px;
  font-weight: 950;
  line-height: 1.08;
}

.cx-summary-card h2.small {
  color: #111827;
  font-size: 16px;
  line-height: 1.18;
  max-width: 230px;
}

.cx-card-progress {
  margin-top: 10px;
  width: 100%;
  height: 5px;
  border-radius: 999px;
  background: linear-gradient(90deg, #005BFF, #00A3FF);
}

.cx-main-grid {
  position: relative;
  z-index: 2;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(360px, 0.95fr);
  gap: 18px;
  align-items: start;
}

.cx-card {
  border-radius: 22px;
  border: 1px solid #d6e6ff;
  background: #ffffff;
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.06);
  box-sizing: border-box;
}

.cx-assessment-card,
.cx-action-card {
  padding: 18px;
}

.cx-section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.cx-title-icon {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  flex-shrink: 0;
}

.cx-title-icon.green {
  background: #dcfce7;
}

.cx-title-icon.orange {
  background: #fff7ed;
}

.cx-section-title h2 {
  margin: 0;
  color: #111827;
  font-size: 24px;
  font-weight: 950;
  letter-spacing: -0.3px;
}

.cx-test-list {
  border: 1px solid #d6e6ff;
  border-radius: 17px;
  overflow: hidden;
  display: grid;
}

.cx-test-row {
  min-height: 58px;
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) 58px 90px;
  align-items: center;
  gap: 11px;
  padding: 9px 14px;
  border-bottom: 1px solid #edf2f7;
  background: #ffffff;
  box-sizing: border-box;
}

.cx-test-row:last-child {
  border-bottom: none;
}

.cx-test-icon {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}

.cx-test-info {
  min-width: 0;
}

.cx-test-info h4 {
  margin: 0;
  color: #111827;
  font-size: 14px;
  line-height: 1.15;
  font-weight: 900;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cx-test-info p {
  margin: 3px 0 0;
  color: #64748b;
  font-size: 12px;
  line-height: 1.2;
  font-weight: 650;
}

.cx-score {
  color: #08a63f;
  font-size: 13px;
  font-weight: 950;
  text-align: right;
}

.cx-retake-btn {
  height: 34px;
  border-radius: 10px;
  border: 1px solid #0B63F6;
  background: #ffffff;
  color: #005BFF;
  font-size: 13px;
  font-weight: 950;
  cursor: pointer;
}

.cx-retake-btn:hover {
  background: #F6FAFF;
}

.cx-action-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: visible;
}

.cx-action-card .cx-section-title {
  margin-bottom: 0;
}

.cx-action-list {
  display: grid;
  gap: 9px;
}

.cx-action-btn {
  width: 100%;
  min-height: 44px;
  border-radius: 14px;
  border: 1px solid #D6E6FF;
  background: linear-gradient(135deg, #ffffff, #F6FAFF);
  color: #111827;
  padding: 9px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  box-sizing: border-box;
}

.cx-action-btn.locked {
  opacity: 0.78;
  background: linear-gradient(135deg, #ffffff, #f8fafc);
  color: #64748b;
}

.cx-action-btn span {
  min-width: 0;
  font-size: 13px;
  line-height: 1.22;
  font-weight: 900;
  white-space: normal;
}

.cx-action-btn b {
  color: #005BFF;
  font-size: 22px;
  line-height: 1;
  flex-shrink: 0;
}

.cx-action-btn:hover {
  background: #F6FAFF;
}

.cx-recommend-card,
.cx-locked-card {
  position: static;
  width: 100%;
  margin-top: 4px;
  border-radius: 18px;
  padding: 14px;
  display: grid;
  grid-template-columns: 46px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  box-sizing: border-box;
  overflow: visible;
}

.cx-recommend-card {
  border: 1px solid #BFD7FF;
  background: linear-gradient(135deg, #f8fbff, #ffffff);
}

.cx-locked-card {
  border: 1px solid #fed7aa;
  background: linear-gradient(135deg, #fff7ed, #ffffff);
}

.cx-trophy {
  width: 44px;
  height: 44px;
  border-radius: 15px;
  background: linear-gradient(135deg, #E6F0FF, #dbeafe);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}

.cx-locked-content {
  min-width: 0;
}

.cx-recommend-card p,
.cx-locked-card p {
  margin: 0 0 3px;
  color: #8aa0bd;
  font-size: 11px;
  line-height: 1.15;
  font-weight: 900;
}

.cx-recommend-card h3,
.cx-locked-card h3 {
  margin: 0;
  color: #071b5f;
  font-size: 17px;
  line-height: 1.15;
  font-weight: 950;
  letter-spacing: -0.2px;
}

.cx-recommend-card h4,
.cx-locked-card h4 {
  margin: 5px 0 0;
  color: #4f6b93;
  font-size: 11px;
  line-height: 1.3;
  font-weight: 750;
}

.cx-recommend-card h4 span {
  color: #005BFF;
}

.cx-loading {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fbfbff;
}

.cx-loader-card {
  background: white;
  border: 1px solid #d6e6ff;
  border-radius: 22px;
  padding: 34px;
  text-align: center;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.08);
}

.cx-loader-icon {
  font-size: 42px;
  margin-bottom: 14px;
}

@media (max-width: 1100px) {
  .cx-page {
    padding: 18px;
  }

  .cx-summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .cx-main-grid {
    grid-template-columns: 1fr;
  }

  .cx-test-list {
    display: block;
  }

  .cx-test-row {
    min-height: 68px;
  }
}

@media (max-width: 700px) {
  .cx-page {
    padding: 16px;
  }

  .cx-header h1 {
    font-size: 30px;
  }

  .cx-summary-grid {
    grid-template-columns: 1fr;
  }

  .cx-test-row {
    grid-template-columns: 36px 1fr;
    gap: 10px;
    padding: 14px;
  }

  .cx-score,
  .cx-retake-btn {
    grid-column: 2;
  }

  .cx-score {
    text-align: left;
  }

  .cx-retake-btn {
    width: 120px;
  }

  .cx-recommend-card,
  .cx-locked-card {
    grid-template-columns: 42px 1fr;
  }

  .cx-trophy {
    width: 40px;
    height: 40px;
  }
}
`;