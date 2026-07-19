import React, { useEffect, useMemo, useState } from "react";

import {
  getClass10Progress,
  getClass10Recommendation,
  generateClass10Recommendation,
} from "../services/class10Api";

const TEST_TOTAL_QUESTIONS = 100;

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
    color: "linear-gradient(135deg, #3b82f6, #ec4899)",
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
    color: "linear-gradient(135deg, #ec4899, #f43f5e)",
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

function getClass10TestProgress(testKey) {
  const attempted = safeParseArray(
    localStorage.getItem(`class10_attempted_${testKey}`)
  );

  const attemptedCount = Array.from(new Set(attempted)).length;

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
        ? "Completed"
        : progress.attempted > 0
        ? "In Progress"
        : "Not Started",
    };
  });
}

export default function Class10Dashboard({ setActivePage }) {
  const [progress, setProgress] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const tests = useMemo(() => getAssessmentTests(), [refreshKey]);

  async function loadDashboard() {
    try {
      setLoading(true);

      const progressResponse = await getClass10Progress().catch(() => null);
      const recommendationResponse = await getClass10Recommendation().catch(
        () => null
      );

      setProgress(progressResponse?.data || progressResponse || null);
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

  function getStreamName() {
    const raw =
      recommendation?.recommendedStream ||
      recommendation?.stream ||
      recommendation?.topStream ||
      recommendation?.recommendation?.recommendedStream;

    if (!raw) return "Commerce";
    if (typeof raw === "string") return raw;

    return raw.name || raw.streamName || raw.title || "Commerce";
  }

  function getMatchScore() {
    return (
      recommendation?.matchScore ||
      recommendation?.match ||
      recommendation?.recommendedStream?.matchScore ||
      recommendation?.recommendation?.matchScore ||
      96
    );
  }

  async function handleGenerateRecommendation() {
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
          Complete assessments, generate stream recommendation, explore careers,
          and create the final career report.
        </h3>
      </header>

      <section className="cx-summary-grid">
        <SummaryCard
          icon="📈"
          label="Career Progress"
          value={`${progressPercent}%`}
          progress
        />

        <SummaryCard
          icon="📋"
          label="Completed Tests"
          value={`${completedCount}/7`}
          progress
        />

        <SummaryCard icon="🎓" label="Recommended Stream" value={streamName} />

        <SummaryCard
          icon="🚀"
          label="Next Action"
          value="Generate final stream recommendation"
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
            {tests.map((test) => {
              return (
                <div key={test.key} className="cx-test-row">
                  <div
                    className="cx-test-icon"
                    style={{ background: test.color }}
                  >
                    {test.icon}
                  </div>

                  <div className="cx-test-info">
                    <h4>{test.name}</h4>
                    <p>{test.status}</p>
                  </div>

                  <strong className="cx-score">{test.percentage}%</strong>

                  <button
                    type="button"
                    onClick={() => setActivePage(`assessment:${test.key}`)}
                    className="cx-retake-btn"
                  >
                    {test.attempted > 0 ? "Retake" : "Start"}
                  </button>
                </div>
              );
            })}
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
              <span>▶️ Start Assessment</span>
              <b>›</b>
            </button>

            <button
              type="button"
              className="cx-action-btn"
              onClick={handleGenerateRecommendation}
            >
              <span>
                ✨ {generating ? "Generating..." : "Generate Recommendation"}
              </span>
              <b>›</b>
            </button>

            <button
              type="button"
              className="cx-action-btn"
              onClick={() => setActivePage("stream-explorer")}
            >
              <span>🧭 Open Stream Explorer</span>
              <b>›</b>
            </button>

            <button
              type="button"
              className="cx-action-btn"
              onClick={() => setActivePage("career-explorer")}
            >
              <span>💼 Open Career Explorer</span>
              <b>›</b>
            </button>

            <button
              type="button"
              className="cx-action-btn"
              onClick={() => setActivePage("final-report")}
            >
              <span>📄 View Final Report</span>
              <b>›</b>
            </button>
          </div>

          <div className="cx-recommend-card">
            <div className="cx-trophy">🏆</div>

            <div>
              <p>Latest Recommendation</p>
              <h3>{streamName}</h3>
              <h4>
                Match: <span>{matchScore}%</span>
              </h4>
            </div>
          </div>
        </aside>
      </section>
    </section>
  );
}

function SummaryCard({ icon, label, value, small, progress }) {
  return (
    <div className="cx-summary-card">
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
  height: 100vh;
  overflow: hidden;
  padding: 26px 34px 24px;
  background: #fbfbff;
  color: #111827;
  display: grid;
  grid-template-rows: auto 96px 1fr;
  gap: 18px;
}

.cx-bg-blob {
  position: absolute;
  right: -140px;
  top: -160px;
  width: 500px;
  height: 360px;
  background: radial-gradient(circle, rgba(0, 91, 255, 0.18), transparent 66%);
  border-radius: 999px;
  pointer-events: none;
}

.cx-stars {
  position: absolute;
  right: 82px;
  top: 72px;
  color: #0B63F6;
  font-size: 34px;
  opacity: 0.65;
}

.cx-header {
  position: relative;
  z-index: 2;
}

.cx-header p {
  margin: 0 0 12px;
  color: #64748b;
  font-size: 15px;
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
  font-size: 42px;
  line-height: 1.02;
  color: #0f172a;
  letter-spacing: -1.3px;
  font-weight: 950;
}

.cx-header h3 {
  margin: 12px 0 0;
  color: #64748b;
  font-size: 16px;
  font-weight: 600;
}

.cx-summary-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.cx-summary-card {
  border-radius: 19px;
  border: 1px solid #e7e2f4;
  background: #ffffff;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.055);
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cx-summary-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cx-summary-icon {
  width: 50px;
  height: 50px;
  border-radius: 999px;
  background: #EFF6FF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 23px;
  flex-shrink: 0;
}

.cx-summary-card p {
  margin: 0 0 4px;
  color: #64748b;
  font-weight: 780;
  font-size: 14px;
}

.cx-summary-card h2 {
  margin: 0;
  color: #005BFF;
  font-size: 27px;
  font-weight: 950;
  line-height: 1.08;
}

.cx-summary-card h2.small {
  color: #111827;
  font-size: 17px;
  line-height: 1.15;
  max-width: 210px;
}

.cx-card-progress {
  margin-top: 13px;
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
  grid-template-columns: 1.42fr 0.95fr;
  gap: 20px;
}

.cx-card {
  border-radius: 22px;
  border: 1px solid #e7e2f4;
  background: #ffffff;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.065);
}

.cx-assessment-card,
.cx-action-card {
  min-height: 0;
  padding: 20px;
}

.cx-section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.cx-title-icon {
  width: 29px;
  height: 29px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
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
  font-size: 25px;
  font-weight: 950;
  letter-spacing: -0.4px;
}

.cx-test-list {
  height: calc(100% - 46px);
  border: 1px solid #e7e2f4;
  border-radius: 17px;
  overflow: hidden;
  display: grid;
  grid-template-rows: repeat(7, 1fr);
}

.cx-test-row {
  display: grid;
  grid-template-columns: 42px 1fr 70px 96px;
  align-items: center;
  gap: 12px;
  padding: 0 17px;
  border-bottom: 1px solid #edf2f7;
  background: #ffffff;
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

.cx-test-info h4 {
  margin: 0;
  color: #111827;
  font-size: 14px;
  font-weight: 900;
}

.cx-test-info p {
  margin: 2px 0 0;
  color: #64748b;
  font-size: 12px;
  font-weight: 650;
}

.cx-score {
  color: #08a63f;
  font-size: 14px;
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
}

.cx-action-list {
  display: grid;
  gap: 11px;
}

.cx-action-btn {
  width: 100%;
  height: 47px;
  border-radius: 14px;
  border: 1px solid #D6E6FF;
  background: linear-gradient(135deg, #ffffff, #F6FAFF);
  color: #111827;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.cx-action-btn span {
  font-size: 14px;
  font-weight: 900;
}

.cx-action-btn b {
  color: #005BFF;
  font-size: 25px;
  line-height: 1;
}

.cx-action-btn:hover {
  background: #F6FAFF;
}

.cx-recommend-card {
  margin-top: auto;
  border: 1px solid #BFD7FF;
  background: linear-gradient(135deg, #f8f3ff, #ffffff);
  border-radius: 18px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 106px;
}

.cx-trophy {
  width: 56px;
  height: 56px;
  border-radius: 999px;
  background: linear-gradient(135deg, #E6F0FF, #ddd6fe);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 27px;
  flex-shrink: 0;
}

.cx-recommend-card p {
  margin: 0 0 5px;
  color: #005BFF;
  font-size: 13px;
  font-weight: 900;
}

.cx-recommend-card h3 {
  margin: 0;
  color: #111827;
  font-size: 22px;
  font-weight: 950;
}

.cx-recommend-card h4 {
  margin: 5px 0 0;
  color: #64748b;
  font-size: 15px;
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
  border: 1px solid #e7e2f4;
  border-radius: 22px;
  padding: 34px;
  text-align: center;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.08);
}

.cx-loader-icon {
  font-size: 42px;
  margin-bottom: 14px;
}

@media (max-height: 760px) {
  .cx-page {
    padding: 18px 24px 16px;
    grid-template-rows: auto 78px 1fr;
    gap: 12px;
  }

  .cx-header p {
    margin-bottom: 6px;
    font-size: 12px;
  }

  .cx-header h1 {
    font-size: 31px;
  }

  .cx-header h3 {
    margin-top: 6px;
    font-size: 12.5px;
  }

  .cx-summary-grid {
    gap: 12px;
  }

  .cx-summary-card {
    border-radius: 16px;
    padding: 11px 12px;
  }

  .cx-summary-icon {
    width: 34px;
    height: 34px;
    font-size: 16px;
  }

  .cx-summary-card p {
    font-size: 11px;
  }

  .cx-summary-card h2 {
    font-size: 20px;
  }

  .cx-summary-card h2.small {
    font-size: 13px;
  }

  .cx-card-progress {
    margin-top: 8px;
    height: 4px;
  }

  .cx-main-grid {
    gap: 12px;
  }

  .cx-assessment-card,
  .cx-action-card {
    padding: 12px;
  }

  .cx-section-title {
    margin-bottom: 8px;
  }

  .cx-title-icon {
    width: 24px;
    height: 24px;
    font-size: 15px;
  }

  .cx-section-title h2 {
    font-size: 19px;
  }

  .cx-test-list {
    height: calc(100% - 34px);
  }

  .cx-test-row {
    grid-template-columns: 34px 1fr 52px 78px;
    gap: 9px;
    padding: 0 12px;
  }

  .cx-test-icon {
    width: 25px;
    height: 25px;
    font-size: 12px;
  }

  .cx-test-info h4 {
    font-size: 11.5px;
  }

  .cx-test-info p {
    font-size: 10px;
  }

  .cx-score {
    font-size: 11.5px;
  }

  .cx-retake-btn {
    height: 25px;
    font-size: 10.5px;
  }

  .cx-action-list {
    gap: 7px;
  }

  .cx-action-btn {
    height: 33px;
    border-radius: 11px;
  }

  .cx-action-btn span {
    font-size: 11.5px;
  }

  .cx-action-btn b {
    font-size: 20px;
  }

  .cx-recommend-card {
    min-height: 72px;
    padding: 12px;
  }

  .cx-trophy {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .cx-recommend-card p {
    font-size: 11px;
  }

  .cx-recommend-card h3 {
    font-size: 18px;
  }

  .cx-recommend-card h4 {
    font-size: 12px;
  }
}
`;

