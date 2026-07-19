import React, { useEffect, useMemo, useState } from "react";
import { getClass10FinalReport } from "../services/class10Api";

const fallbackReport = {
  completion: 100,
  recommendedStream: "Commerce",
  matchScore: 96,
  hollandCode: "REA",
  summary:
    "The student shows alignment with commerce, management, finance, and entrepreneurship. Commerce can be suitable if the student enjoys business, money, systems, and decision-making.",
  whyThisStream: [
    "Strong fit for business, finance, management, and entrepreneurship.",
    "Matches enterprising and conventional thinking patterns.",
    "Good for students interested in money, markets, and organization.",
  ],
  strengths: [
    "Business thinking",
    "Decision-making ability",
    "Structured thinking",
    "Interest in finance and management",
  ],
  improvementAreas: [
    "Improve mathematical confidence",
    "Build communication skills",
    "Practice financial reasoning",
    "Explore real-world business case studies",
  ],
  suggestedSubjects: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
  suggestedCareers: [
    "Chartered Accountant",
    "Business Analyst",
    "Investment Banker",
    "Entrepreneur",
    "Product Manager",
  ],
  assessmentScores: [
    { name: "RIASEC Interest Test", score: 75 },
    { name: "Aptitude Test", score: 90 },
    { name: "Personality Test", score: 100 },
    { name: "Academic Style Test", score: 100 },
    { name: "Situational IQ Test", score: 100 },
    { name: "Values Test", score: 100 },
    { name: "Confidence Test", score: 100 },
  ],
  parentGuidance:
    "Parents should support the student by encouraging exposure to business, money management, communication, and decision-making activities instead of forcing a stream based only on marks.",
  roadmap: [
    "Explore Commerce subjects in detail.",
    "Talk to seniors, teachers, and professionals from commerce fields.",
    "Start basic financial literacy and business case study reading.",
    "Build confidence in Mathematics and communication.",
    "Create a 30-day stream exploration plan before final admission.",
  ],
};

function normalizeArray(value, fallback) {
  if (Array.isArray(value) && value.length > 0) return value;
  return fallback;
}

function normalizeReport(rawReport) {
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
        fallbackReport.recommendedStream;

  return {
    completion:
      raw.completion ||
      raw.completionPercentage ||
      raw.progressPercent ||
      fallbackReport.completion,

    recommendedStream,

    matchScore:
      raw.matchScore ||
      raw.match ||
      rawStream?.matchScore ||
      raw.recommendation?.matchScore ||
      fallbackReport.matchScore,

    hollandCode:
      raw.hollandCode ||
      raw.profile?.hollandCode ||
      raw.recommendation?.hollandCode ||
      fallbackReport.hollandCode,

    summary:
      raw.summary ||
      raw.finalRecommendation ||
      raw.recommendationSummary ||
      rawStream?.summary ||
      raw.recommendation?.summary ||
      fallbackReport.summary,

    whyThisStream: normalizeArray(
      raw.whyThisStream || raw.reasons || rawStream?.reasons,
      fallbackReport.whyThisStream
    ),

    strengths: normalizeArray(
      raw.strengths || raw.studentStrengths || raw.profile?.strengths,
      fallbackReport.strengths
    ),

    improvementAreas: normalizeArray(
      raw.improvementAreas || raw.weaknesses || raw.developmentAreas,
      fallbackReport.improvementAreas
    ),

    suggestedSubjects: normalizeArray(
      raw.suggestedSubjects || raw.subjects || rawStream?.subjects,
      fallbackReport.suggestedSubjects
    ),

    suggestedCareers: normalizeArray(
      raw.suggestedCareers || raw.careers || rawStream?.careers,
      fallbackReport.suggestedCareers
    ),

    assessmentScores: normalizeArray(
      raw.assessmentScores || raw.scores || raw.testScores,
      fallbackReport.assessmentScores
    ),

    parentGuidance:
      raw.parentGuidance ||
      raw.guidanceForParents ||
      raw.parentNote ||
      fallbackReport.parentGuidance,

    roadmap: normalizeArray(
      raw.roadmap || raw.nextSteps || raw.thirtyDayRoadmap,
      fallbackReport.roadmap
    ),
  };
}

export default function Class10FinalReport({ setActivePage }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadReport() {
    try {
      setLoading(true);

      const response = await getClass10FinalReport().catch(() => null);
      const data = response?.data || response?.report || response;

      setReport(data || null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReport();
  }, []);

  const reportData = useMemo(() => normalizeReport(report), [report]);

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
          <p>Preparing the student career direction report.</p>
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

            <button type="button" className="fr-primary-action" onClick={handlePrint}>
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
                <MetricCard label="Completion" value={`${reportData.completion}%`} />
                <MetricCard label="Recommended Stream" value={reportData.recommendedStream} />
                <MetricCard label="Match Score" value={`${reportData.matchScore}%`} />
                <MetricCard label="Holland Code" value={reportData.hollandCode} />
              </div>
            </div>

            <div className="fr-match-circle">
              <div>
                <strong>{reportData.matchScore}%</strong>
                <span>Match</span>
              </div>
            </div>
          </section>

          <section className="fr-main-grid">
            <Card title="Final Recommendation" icon="🎯" large>
              <h3 className="fr-stream-name">{reportData.recommendedStream}</h3>
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
  background: #f3efff;
}

.fr-page::-webkit-scrollbar-thumb {
  background: #60A5FA;
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
  border: 1px solid #e7e2f4;
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
  border: 1px solid #e7e2f4;
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
  border: 1px solid #e7e2f4;
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



