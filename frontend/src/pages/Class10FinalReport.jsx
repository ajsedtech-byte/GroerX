import React, { useEffect, useMemo, useState } from "react";
import { getClass10FinalReport } from "../services/class10Api";

const TEST_TOTAL_QUESTIONS = 20;

const REQUIRED_TESTS = [
  { key: "riasec", name: "RIASEC Interest Test" },
  { key: "aptitude", name: "Aptitude Test" },
  { key: "personality", name: "Personality Test" },
  { key: "academic-style", name: "Academic Style Test" },
  { key: "situational-iq", name: "Situational IQ Test" },
  { key: "values", name: "Values Test" },
  { key: "confidence", name: "Confidence Test" },
];

function safeParseArray(value) {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getRoundOneAttemptedCount(testKey) {
  const attempted = safeParseArray(
    localStorage.getItem(`class10_attempted_${testKey}`)
  );

  const roundOneAttempts = attempted.filter((item) =>
    String(item).startsWith("round-1-q-")
  );

  return Math.min(
    TEST_TOTAL_QUESTIONS,
    Array.from(new Set(roundOneAttempts)).length
  );
}

function getTestProgress() {
  return REQUIRED_TESTS.map((test) => {
    const attempted = getRoundOneAttemptedCount(test.key);

    return {
      ...test,
      attempted,
      completed: attempted >= TEST_TOTAL_QUESTIONS,
      percentage: Math.min(
        100,
        Math.round((attempted / TEST_TOTAL_QUESTIONS) * 100)
      ),
    };
  });
}

function areAllRoundOneTestsCompleted() {
  return getTestProgress().every((test) => test.completed);
}

function getCompletedCount() {
  return getTestProgress().filter((test) => test.completed).length;
}

function normalizeArray(value, fallback = []) {
  if (Array.isArray(value) && value.length > 0) return value;
  return fallback;
}

function hasValidReport(rawReport) {
  if (!rawReport) return false;

  const rawStream =
    rawReport.recommendedStream ||
    rawReport.stream ||
    rawReport.topStream ||
    rawReport.recommendation?.recommendedStream ||
    null;

  return Boolean(rawStream);
}

function normalizeReport(rawReport) {
  if (!hasValidReport(rawReport)) {
    return null;
  }

  const raw = rawReport || {};

  const rawStream =
    raw.recommendedStream ||
    raw.stream ||
    raw.topStream ||
    raw.recommendation?.recommendedStream ||
    null;

  const recommendedStream =
    typeof rawStream === "string"
      ? rawStream
      : rawStream?.name ||
        rawStream?.title ||
        rawStream?.streamName ||
        raw.streamName ||
        "Recommended Stream";

  const matchScore =
    raw.matchScore ||
    raw.match ||
    rawStream?.matchScore ||
    rawStream?.match ||
    raw.recommendation?.matchScore ||
    null;

  return {
    completion:
      raw.completion || raw.completionPercentage || raw.progressPercent || 100,

    recommendedStream,

    matchScore,

    hollandCode:
      raw.hollandCode ||
      raw.profile?.hollandCode ||
      raw.recommendation?.hollandCode ||
      "Pending",

    summary:
      raw.summary ||
      raw.finalRecommendation ||
      raw.recommendationSummary ||
      rawStream?.summary ||
      raw.recommendation?.summary ||
      "This report has been generated after completing Round 1 of all Class 10 assessments. The stream direction should be reviewed with parents, teachers, and counsellors before final decision-making.",

    whyThisStream: normalizeArray(
      raw.whyThisStream || raw.reasons || rawStream?.reasons,
      [
        "This stream matches the student's completed Round 1 assessment profile.",
        "Interest, aptitude, personality, learning style, values, situational intelligence, and confidence were considered.",
        "The recommendation should support decision-making, not replace parent and counsellor discussion.",
      ]
    ),

    strengths: normalizeArray(
      raw.strengths || raw.studentStrengths || raw.profile?.strengths,
      [
        "Self-awareness from completed Round 1 assessments",
        "Career direction clarity",
        "Stream exploration readiness",
      ]
    ),

    improvementAreas: normalizeArray(
      raw.improvementAreas || raw.weaknesses || raw.developmentAreas,
      [
        "Discuss stream choice with parents",
        "Explore subjects in detail",
        "Build communication and study consistency",
      ]
    ),

    suggestedSubjects: normalizeArray(
      raw.suggestedSubjects || raw.subjects || rawStream?.subjects,
      ["Subjects will depend on the final stream and school options."]
    ),

    suggestedCareers: normalizeArray(
      raw.suggestedCareers || raw.careers || rawStream?.careers,
      ["Career options will be explored in Career Explorer."]
    ),

    assessmentScores: normalizeArray(
      raw.assessmentScores || raw.scores || raw.testScores,
      REQUIRED_TESTS.map((test) => ({
        name: test.name,
        score: 100,
      }))
    ),

    parentGuidance:
      raw.parentGuidance ||
      raw.guidanceForParents ||
      raw.parentNote ||
      "Parents should use this report as a structured guidance tool. The final decision should be made after understanding the student's interest, confidence, learning style, and long-term career possibilities.",

    roadmap: normalizeArray(
      raw.roadmap || raw.nextSteps || raw.thirtyDayRoadmap,
      [
        "Review the recommended stream with parents.",
        "Explore the suggested subjects in detail.",
        "Talk to seniors, teachers, or counsellors.",
        "Understand career options connected to the stream.",
        "Create a 30-day stream exploration plan.",
      ]
    ),
  };
}

export default function Class10FinalReport({ setActivePage }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progressKey, setProgressKey] = useState(0);

  const testProgress = useMemo(() => getTestProgress(), [progressKey]);
  const completedCount = useMemo(() => getCompletedCount(), [progressKey]);
  const allTestsCompleted = useMemo(
    () => areAllRoundOneTestsCompleted(),
    [progressKey]
  );

  async function loadReport() {
    try {
      setLoading(true);

      if (!areAllRoundOneTestsCompleted()) {
        setReport(null);
        return;
      }

      const response = await getClass10FinalReport().catch(() => null);
      const data = response?.data || response?.report || response;

      setReport(data || null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReport();

    const refreshOnFocus = () => {
      setProgressKey((previous) => previous + 1);
    };

    window.addEventListener("focus", refreshOnFocus);

    return () => {
      window.removeEventListener("focus", refreshOnFocus);
    };
  }, []);

  const reportData = useMemo(() => {
    if (!allTestsCompleted) return null;
    return normalizeReport(report);
  }, [report, allTestsCompleted]);

  function handlePrint() {
    window.print();
  }

  if (loading) {
    return (
      <section className="fr-loading">
        <style>{reportCss}</style>

        <div className="fr-loader-card">
          <div className="fr-loader-icon">📄</div>
          <h2>Loading Final Report...</h2>
          <p>Checking Round 1 completion first.</p>
        </div>
      </section>
    );
  }

  if (!allTestsCompleted) {
    return (
      <section className="fr-page">
        <style>{reportCss}</style>

        <div className="fr-bg-blob"></div>
        <div className="fr-star">✦</div>

        <div className="fr-locked-wrap">
          <button
            type="button"
            className="fr-back-btn"
            onClick={() => setActivePage("dashboard")}
          >
            ← Back to Dashboard
          </button>

          <div className="fr-locked-card">
            <div className="fr-lock-icon">🔒</div>

            <p className="fr-locked-eyebrow">Locked Module</p>

            <h1>Final Report Locked</h1>

            <p className="fr-locked-text">
              Complete Round 1 of all 7 Class 10 assessments first. The final
              career report will appear only after the Round 1 journey is
              completed.
            </p>

            <div className="fr-locked-progress">
              <div className="fr-progress-top">
                <span>Round 1 Unlock Progress</span>
                <strong>
                  {completedCount}/{REQUIRED_TESTS.length}
                </strong>
              </div>

              <div className="fr-progress-track">
                <div
                  style={{
                    width: `${Math.round(
                      (completedCount / REQUIRED_TESTS.length) * 100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="fr-required-list">
              {testProgress.map((test) => (
                <div
                  key={test.key}
                  className={`fr-required-item ${test.completed ? "done" : ""}`}
                >
                  <span>{test.completed ? "✓" : "•"}</span>
                  <p>{test.name}</p>
                  <strong>
                    {test.attempted}/{TEST_TOTAL_QUESTIONS}
                  </strong>
                </div>
              ))}
            </div>

            <div className="fr-locked-actions">
              <button
                type="button"
                onClick={() => setActivePage("assessment:riasec")}
              >
                Go to Career Assessment
              </button>

              <button
                type="button"
                className="secondary"
                onClick={() => setActivePage("dashboard")}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!reportData) {
    return (
      <section className="fr-page">
        <style>{reportCss}</style>

        <div className="fr-bg-blob"></div>
        <div className="fr-star">✦</div>

        <div className="fr-locked-wrap">
          <button
            type="button"
            className="fr-back-btn"
            onClick={() => setActivePage("dashboard")}
          >
            ← Back to Dashboard
          </button>

          <div className="fr-locked-card">
            <div className="fr-lock-icon">✨</div>

            <p className="fr-locked-eyebrow">Report Not Ready</p>

            <h1>Generate Stream Recommendation First</h1>

            <p className="fr-locked-text">
              Round 1 of all 7 assessments is complete. Please open Stream
              Explorer and generate your stream recommendation first. The final
              report will be available after the recommendation is created.
            </p>

            <div className="fr-locked-actions">
              <button
                type="button"
                onClick={() => setActivePage("stream-explorer")}
              >
                Go to Stream Explorer
              </button>

              <button
                type="button"
                className="secondary"
                onClick={() => setActivePage("dashboard")}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="fr-page">
      <style>{reportCss}</style>

      <div className="fr-bg-blob"></div>
      <div className="fr-star">✦</div>

      <div className="fr-content">
        <header className="fr-header no-print">
          <div>
            <button
              type="button"
              className="fr-back-btn"
              onClick={() => setActivePage("dashboard")}
            >
              ← Back to Dashboard
            </button>

            <p className="fr-breadcrumb">
              <span>Dashboard</span> <b>›</b> Stream Explorer <b>›</b> Final
              Report
            </p>

            <h1>Final Career Report</h1>

            <h3>
              Complete Class 10 career direction summary with stream,
              strengths, improvement areas, subjects, careers, and roadmap.
            </h3>
          </div>

          <div className="fr-header-actions">
            <button
              type="button"
              className="fr-secondary-action"
              onClick={() => setActivePage("stream-explorer")}
            >
              🧭 Stream Explorer
            </button>

            <button
              type="button"
              className="fr-primary-action"
              onClick={handlePrint}
            >
              📥 Download / Print
            </button>
          </div>
        </header>

        <section className="fr-report-sheet">
          <section className="fr-hero-card">
            <div className="fr-hero-left">
              <p className="fr-eyebrow">GroerX Class 10 Final Career Report</p>

              <h2>Your Career Direction Report</h2>

              <p className="fr-summary">
                This report combines interest, aptitude, personality, learning
                style, values, situational intelligence, and confidence to
                suggest a suitable Class 11 stream direction.
              </p>

              <div className="fr-metrics-grid">
                <MetricCard
                  label="Completion"
                  value={`${reportData.completion}%`}
                />

                <MetricCard
                  label="Recommended Stream"
                  value={reportData.recommendedStream}
                />

                <MetricCard
                  label="Match Score"
                  value={
                    reportData.matchScore
                      ? `${reportData.matchScore}%`
                      : "Pending"
                  }
                />

                <MetricCard
                  label="Holland Code"
                  value={reportData.hollandCode}
                />
              </div>
            </div>

            <div className="fr-match-circle">
              <div>
                <strong>{reportData.matchScore || "--"}%</strong>
                <span>Match</span>
              </div>
            </div>
          </section>

          <section className="fr-main-grid">
            <Card title="Final Recommendation" icon="🎯" large>
              <h3 className="fr-stream-name">
                {reportData.recommendedStream}
              </h3>
              <p className="fr-body-text">{reportData.summary}</p>
            </Card>

            <Card title="Why this stream?" icon="💡">
              <ul className="fr-clean-list">
                {reportData.whyThisStream.map((item, index) => (
                  <li key={index}>
                    <span>✓</span>
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
            </Card>

            <Card title="Student Strengths" icon="💪">
              <div className="fr-chip-grid">
                {reportData.strengths.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </Card>

            <Card title="Improvement Areas" icon="📈">
              <div className="fr-chip-grid warning">
                {reportData.improvementAreas.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </Card>

            <Card title="Suggested Subjects" icon="📚">
              <div className="fr-chip-grid subjects">
                {reportData.suggestedSubjects.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </Card>

            <Card title="Suggested Careers" icon="💼">
              <div className="fr-career-grid">
                {reportData.suggestedCareers.map((career) => (
                  <button
                    type="button"
                    key={career}
                    onClick={() => setActivePage("career-explorer")}
                  >
                    <span>{career}</span>
                    <b>›</b>
                  </button>
                ))}
              </div>
            </Card>
          </section>

          <section className="fr-wide-grid">
            <div className="fr-card fr-score-card">
              <div className="fr-card-title">
                <span>📊</span>
                <h2>Assessment Score Summary</h2>
              </div>

              <div className="fr-score-list">
                {reportData.assessmentScores.map((scoreItem, index) => {
                  const name =
                    scoreItem.name ||
                    scoreItem.testName ||
                    scoreItem.testType ||
                    `Assessment ${index + 1}`;

                  const score =
                    scoreItem.score ||
                    scoreItem.percentage ||
                    scoreItem.percent ||
                    scoreItem.totalScore ||
                    100;

                  return (
                    <div key={name} className="fr-score-row">
                      <p>{name}</p>

                      <div className="fr-score-bar">
                        <div style={{ width: `${score}%` }}></div>
                      </div>

                      <strong>{score}%</strong>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="fr-card fr-parent-card">
              <div className="fr-card-title">
                <span>👨‍👩‍👧</span>
                <h2>Parent Guidance</h2>
              </div>

              <p className="fr-body-text">{reportData.parentGuidance}</p>

              <div className="fr-note-box">
                <strong>Important Note:</strong>
                <p>
                  This recommendation should support decision-making, not
                  replace discussion with parents, teachers, counsellors, and
                  the student.
                </p>
              </div>
            </div>
          </section>

          <section className="fr-roadmap-card">
            <div className="fr-card-title">
              <span>🗺️</span>
              <h2>Next 30-Day Roadmap</h2>
            </div>

            <div className="fr-roadmap-list">
              {reportData.roadmap.map((step, index) => (
                <div key={index} className="fr-roadmap-step">
                  <div>{index + 1}</div>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </section>
        </section>
      </div>
    </section>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="fr-metric-card">
      <p>{label}</p>
      <h3>{value}</h3>
    </div>
  );
}

function Card({ title, icon, children, large }) {
  return (
    <div className={`fr-card ${large ? "large" : ""}`}>
      <div className="fr-card-title">
        <span>{icon}</span>
        <h2>{title}</h2>
      </div>

      {children}
    </div>
  );
}

const reportCss = `
.fr-page {
  position: relative;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background: #fbfbff;
  color: #111827;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.fr-page::-webkit-scrollbar {
  width: 10px;
}

.fr-page::-webkit-scrollbar-track {
  background: #EFF6FF;
}

.fr-page::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #005BFF, #00A3FF);
  border-radius: 999px;
}

.fr-content {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  padding: 20px 28px 40px;
}

.fr-bg-blob {
  position: fixed;
  right: -140px;
  top: -160px;
  width: 520px;
  height: 360px;
  background: radial-gradient(circle, rgba(0, 91, 255, 0.18), transparent 65%);
  border-radius: 999px;
  pointer-events: none;
}

.fr-star {
  position: fixed;
  right: 80px;
  top: 74px;
  color: #0B63F6;
  font-size: 34px;
  opacity: 0.65;
}

.fr-header {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 16px;
}

.fr-back-btn {
  border: 1px solid #BFD7FF;
  background: #ffffff;
  color: #005BFF;
  border-radius: 14px;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 10px 22px rgba(0, 91, 255, 0.08);
  margin-bottom: 12px;
}

.fr-back-btn:hover {
  background: #F6FAFF;
}

.fr-breadcrumb {
  margin: 0 0 6px;
  color: #64748b;
  font-size: 13px;
  font-weight: 750;
}

.fr-breadcrumb span {
  color: #005BFF;
}

.fr-breadcrumb b {
  color: #94a3b8;
  margin: 0 4px;
}

.fr-header h1 {
  margin: 0;
  font-size: 36px;
  line-height: 1.03;
  color: #0f172a;
  letter-spacing: -1px;
  font-weight: 950;
}

.fr-header h3 {
  margin: 8px 0 0;
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
  max-width: 820px;
}

.fr-header-actions {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-top: 34px;
}

.fr-primary-action,
.fr-secondary-action {
  border-radius: 15px;
  padding: 12px 17px;
  font-size: 13px;
  font-weight: 950;
  cursor: pointer;
  white-space: nowrap;
}

.fr-primary-action {
  border: none;
  background: linear-gradient(135deg, #005BFF, #00A3FF);
  color: white;
  box-shadow: 0 14px 26px rgba(0, 91, 255, 0.22);
}

.fr-secondary-action {
  border: 1px solid #60A5FA;
  background: white;
  color: #005BFF;
}

.fr-report-sheet {
  display: grid;
  gap: 16px;
}

.fr-hero-card {
  border: 1px solid #D6E6FF;
  background: linear-gradient(135deg, #ffffff 0%, #F6FAFF 100%);
  border-radius: 24px;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.06);
  padding: 26px;
  display: grid;
  grid-template-columns: 1fr 150px;
  gap: 24px;
  align-items: center;
}

.fr-eyebrow {
  margin: 0 0 10px;
  color: #005BFF;
  font-size: 14px;
  font-weight: 950;
}

.fr-hero-left h2 {
  margin: 0;
  color: #0f172a;
  font-size: 42px;
  line-height: 1.05;
  letter-spacing: -1.2px;
  font-weight: 950;
}

.fr-summary {
  max-width: 900px;
  margin: 14px 0 0;
  color: #475569;
  font-size: 15px;
  line-height: 1.55;
  font-weight: 600;
}

.fr-metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-top: 22px;
}

.fr-metric-card {
  border: 1px solid #D6E6FF;
  background: white;
  border-radius: 17px;
  padding: 15px;
}

.fr-metric-card p {
  margin: 0 0 6px;
  color: #64748b;
  font-size: 12px;
  font-weight: 850;
}

.fr-metric-card h3 {
  margin: 0;
  color: #111827;
  font-size: 19px;
  font-weight: 950;
}

.fr-match-circle {
  width: 136px;
  height: 136px;
  border-radius: 999px;
  background:
    radial-gradient(circle at center, #ffffff 0 52%, transparent 53%),
    conic-gradient(#00A3FF 0 96%, #E6F0FF 96% 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 18px 35px rgba(0, 91, 255, 0.18);
}

.fr-match-circle div {
  width: 94px;
  height: 94px;
  border-radius: 999px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.fr-match-circle strong {
  color: #005BFF;
  font-size: 28px;
  font-weight: 950;
}

.fr-match-circle span {
  color: #64748b;
  font-size: 12px;
  font-weight: 800;
}

.fr-main-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.fr-wide-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 16px;
}

.fr-card,
.fr-roadmap-card {
  border: 1px solid #D6E6FF;
  background: #ffffff;
  border-radius: 22px;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.055);
  padding: 20px;
}

.fr-card.large {
  min-height: 230px;
}

.fr-card-title {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 14px;
}

.fr-card-title span {
  width: 32px;
  height: 32px;
  background: #EFF6FF;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fr-card-title h2 {
  margin: 0;
  color: #111827;
  font-size: 20px;
  font-weight: 950;
}

.fr-stream-name {
  margin: 0 0 12px;
  color: #005BFF;
  font-size: 34px;
  font-weight: 950;
}

.fr-body-text {
  margin: 0;
  color: #475569;
  font-size: 15px;
  line-height: 1.65;
  font-weight: 600;
}

.fr-clean-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 11px;
}

.fr-clean-list li {
  display: grid;
  grid-template-columns: 26px 1fr;
  gap: 10px;
  align-items: start;
}

.fr-clean-list span {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: #dcfce7;
  color: #08a63f;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 950;
}

.fr-clean-list p {
  margin: 0;
  color: #475569;
  font-size: 14px;
  line-height: 1.45;
  font-weight: 650;
}

.fr-chip-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.fr-chip-grid span {
  border: 1px solid #BFD7FF;
  background: #F6FAFF;
  color: #005BFF;
  border-radius: 999px;
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 900;
}

.fr-chip-grid.warning span {
  border-color: #fed7aa;
  background: #fff7ed;
  color: #c2410c;
}

.fr-chip-grid.subjects span {
  border-color: #bae6fd;
  background: #f0f9ff;
  color: #0369a1;
}

.fr-career-grid {
  display: grid;
  gap: 10px;
}

.fr-career-grid button {
  height: 42px;
  border-radius: 13px;
  border: 1px solid #D6E6FF;
  background: linear-gradient(135deg, #ffffff, #F6FAFF);
  color: #111827;
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.fr-career-grid span {
  font-size: 14px;
  font-weight: 900;
}

.fr-career-grid b {
  color: #005BFF;
  font-size: 22px;
}

.fr-score-list {
  display: grid;
  gap: 12px;
}

.fr-score-row {
  display: grid;
  grid-template-columns: 190px 1fr 48px;
  gap: 12px;
  align-items: center;
}

.fr-score-row p {
  margin: 0;
  color: #111827;
  font-size: 13px;
  font-weight: 850;
}

.fr-score-bar {
  height: 8px;
  border-radius: 999px;
  background: #E6F0FF;
  overflow: hidden;
}

.fr-score-bar div {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #005BFF, #00A3FF);
}

.fr-score-row strong {
  color: #005BFF;
  font-size: 13px;
  font-weight: 950;
}

.fr-note-box {
  margin-top: 16px;
  border: 1px solid #BFD7FF;
  background: #F6FAFF;
  border-radius: 16px;
  padding: 14px;
}

.fr-note-box strong {
  color: #005BFF;
  font-size: 13px;
  font-weight: 950;
}

.fr-note-box p {
  margin: 6px 0 0;
  color: #475569;
  font-size: 13px;
  line-height: 1.5;
  font-weight: 650;
}

.fr-roadmap-card {
  margin-bottom: 8px;
}

.fr-roadmap-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
}

.fr-roadmap-step {
  border: 1px solid #D6E6FF;
  background: linear-gradient(135deg, #ffffff, #F6FAFF);
  border-radius: 17px;
  padding: 15px;
}

.fr-roadmap-step div {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: linear-gradient(135deg, #005BFF, #00A3FF);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 950;
  margin-bottom: 10px;
}

.fr-roadmap-step p {
  margin: 0;
  color: #475569;
  font-size: 13px;
  line-height: 1.45;
  font-weight: 650;
}

.fr-loading {
  height: 100vh;
  background: #fbfbff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fr-loader-card {
  width: 360px;
  background: white;
  border: 1px solid #D6E6FF;
  border-radius: 24px;
  padding: 34px;
  text-align: center;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.08);
}

.fr-loader-icon {
  font-size: 44px;
  margin-bottom: 12px;
}

.fr-loader-card h2 {
  margin: 0 0 8px;
  color: #0f172a;
}

.fr-loader-card p {
  margin: 0;
  color: #64748b;
}

/* Locked screen */
.fr-locked-wrap {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  padding: 28px;
  display: flex;
  flex-direction: column;
}

.fr-locked-card {
  width: 100%;
  max-width: 720px;
  margin: auto;
  background: #ffffff;
  border: 1px solid #d6e6ff;
  border-radius: 30px;
  padding: 42px;
  text-align: center;
  box-shadow: 0 24px 60px rgba(0, 43, 120, 0.10);
}

.fr-lock-icon {
  width: 88px;
  height: 88px;
  border-radius: 28px;
  margin: 0 auto 22px;
  background: linear-gradient(135deg, #005BFF, #00A3FF);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 38px;
  box-shadow: 0 18px 36px rgba(0, 91, 255, 0.24);
}

.fr-locked-eyebrow {
  margin: 0 0 10px;
  color: #005BFF;
  font-size: 14px;
  font-weight: 950;
}

.fr-locked-card h1 {
  margin: 0;
  color: #071B5F;
  font-size: 36px;
  line-height: 1.05;
  letter-spacing: -1px;
  font-weight: 950;
}

.fr-locked-text {
  max-width: 560px;
  margin: 14px auto 0;
  color: #64748b;
  font-size: 15px;
  line-height: 1.6;
  font-weight: 650;
}

.fr-locked-progress {
  margin-top: 26px;
  padding: 18px;
  border: 1px solid #d6e6ff;
  border-radius: 18px;
  background: #f6faff;
}

.fr-progress-top {
  display: flex;
  justify-content: space-between;
  color: #071B5F;
  font-size: 14px;
  font-weight: 950;
  margin-bottom: 10px;
}

.fr-progress-track {
  height: 10px;
  border-radius: 999px;
  background: #e6f0ff;
  overflow: hidden;
}

.fr-progress-track div {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #005BFF, #00A3FF);
}

.fr-required-list {
  margin-top: 18px;
  display: grid;
  gap: 9px;
}

.fr-required-item {
  min-height: 42px;
  display: grid;
  grid-template-columns: 26px 1fr 72px;
  align-items: center;
  gap: 10px;
  border: 1px solid #e6f0ff;
  background: #ffffff;
  border-radius: 14px;
  padding: 8px 12px;
  text-align: left;
}

.fr-required-item span {
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: #f1f5f9;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 950;
}

.fr-required-item.done span {
  background: #dcfce7;
  color: #08a63f;
}

.fr-required-item p {
  margin: 0;
  color: #071B5F;
  font-size: 13px;
  font-weight: 850;
}

.fr-required-item strong {
  color: #005BFF;
  font-size: 13px;
  font-weight: 950;
  text-align: right;
}

.fr-locked-actions {
  margin-top: 26px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.fr-locked-actions button {
  border: none;
  background: linear-gradient(135deg, #005BFF, #00A3FF);
  color: #ffffff;
  border-radius: 14px;
  padding: 13px 20px;
  font-size: 14px;
  font-weight: 950;
  cursor: pointer;
}

.fr-locked-actions button.secondary {
  background: #ffffff;
  color: #005BFF;
  border: 1px solid #bfd7ff;
}

@media (max-width: 1200px) {
  .fr-hero-card,
  .fr-main-grid,
  .fr-wide-grid {
    grid-template-columns: 1fr;
  }

  .fr-match-circle {
    margin: 0 auto;
  }

  .fr-metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .fr-roadmap-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 720px) {
  .fr-content {
    padding: 18px;
  }

  .fr-header {
    flex-direction: column;
  }

  .fr-header h1 {
    font-size: 30px;
  }

  .fr-header-actions {
    margin-top: 0;
    flex-wrap: wrap;
  }

  .fr-hero-left h2 {
    font-size: 30px;
  }

  .fr-metrics-grid,
  .fr-roadmap-list {
    grid-template-columns: 1fr;
  }

  .fr-score-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .fr-locked-wrap {
    padding: 18px;
  }

  .fr-locked-card {
    padding: 28px 20px;
  }

  .fr-locked-card h1 {
    font-size: 28px;
  }
}

@media (max-height: 760px) {
  .fr-content {
    padding: 16px 22px 36px;
  }

  .fr-header h1 {
    font-size: 31px;
  }

  .fr-header h3 {
    font-size: 12.5px;
  }

  .fr-hero-card {
    padding: 20px;
  }

  .fr-hero-left h2 {
    font-size: 32px;
  }

  .fr-summary {
    font-size: 13px;
  }

  .fr-card,
  .fr-roadmap-card {
    padding: 16px;
  }
}

@media print {
  body {
    background: white !important;
  }

  .gx-sidebar,
  .no-print,
  .fr-bg-blob,
  .fr-star {
    display: none !important;
  }

  .gx-shell {
    display: block !important;
  }

  .gx-main {
    height: auto !important;
    overflow: visible !important;
  }

  .fr-page {
    height: auto !important;
    overflow: visible !important;
    background: white !important;
  }

  .fr-content {
    padding: 0 !important;
  }

  .fr-report-sheet {
    gap: 12px !important;
  }

  .fr-card,
  .fr-roadmap-card,
  .fr-hero-card {
    box-shadow: none !important;
    break-inside: avoid;
  }
}
`;