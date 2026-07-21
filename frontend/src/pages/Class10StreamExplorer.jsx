import React, { useEffect, useMemo, useState } from "react";
import {
  getClass10Recommendation,
  generateClass10Recommendation,
} from "../services/class10Api";

const TEST_TOTAL_QUESTIONS = 20;

const REQUIRED_TESTS = [
  {
    key: "riasec",
    name: "RIASEC Interest Test",
  },
  {
    key: "aptitude",
    name: "Aptitude Test",
  },
  {
    key: "personality",
    name: "Personality Test",
  },
  {
    key: "academic-style",
    name: "Academic Style Test",
  },
  {
    key: "situational-iq",
    name: "Situational IQ Test",
  },
  {
    key: "values",
    name: "Values Test",
  },
  {
    key: "confidence",
    name: "Confidence Test",
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

function hasValidRecommendation(recommendation) {
  if (!recommendation) return false;

  const rawStream =
    recommendation?.recommendedStream ||
    recommendation?.topStream ||
    recommendation?.stream ||
    recommendation?.recommendation?.recommendedStream ||
    null;

  return Boolean(rawStream);
}

export default function Class10StreamExplorer({ setActivePage }) {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const testProgress = useMemo(() => getTestProgress(), [progressKey]);
  const completedCount = useMemo(() => getCompletedCount(), [progressKey]);
  const allTestsCompleted = useMemo(
    () => areAllRoundOneTestsCompleted(),
    [progressKey]
  );

  async function loadRecommendation() {
    try {
      setLoading(true);

      if (!areAllRoundOneTestsCompleted()) {
        setRecommendation(null);
        return;
      }

      const response = await getClass10Recommendation().catch(() => null);
      const data = response?.data || response?.recommendation || response;

      setRecommendation(data || null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRecommendation();

    const refreshOnFocus = () => {
      setProgressKey((previous) => previous + 1);
    };

    window.addEventListener("focus", refreshOnFocus);

    return () => {
      window.removeEventListener("focus", refreshOnFocus);
    };
  }, []);

  const streamData = useMemo(() => {
    if (!allTestsCompleted || !hasValidRecommendation(recommendation)) {
      return null;
    }

    const raw = recommendation || {};

    const rawStream =
      raw.recommendedStream ||
      raw.topStream ||
      raw.stream ||
      raw.recommendation?.recommendedStream ||
      null;

    const streamName =
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

    const summary =
      raw.summary ||
      rawStream?.summary ||
      raw.description ||
      raw.recommendation?.summary ||
      "Your stream recommendation has been generated based on your completed Round 1 Class 10 assessment journey.";

    const reasons =
      raw.reasons ||
      raw.whyThisStream ||
      rawStream?.reasons ||
      rawStream?.why ||
      [
        "This stream matches your completed Round 1 assessment profile.",
        "Your interest, aptitude, confidence, and decision-making patterns were considered.",
        "This recommendation should be discussed with parents, teachers, and counsellors before final selection.",
      ];

    const subjects =
      raw.suggestedSubjects ||
      raw.subjects ||
      rawStream?.subjects ||
      rawStream?.suggestedSubjects ||
      ["Subject options will appear here after deeper report generation."];

    const careers =
      raw.suggestedCareers ||
      raw.careers ||
      rawStream?.careers ||
      rawStream?.suggestedCareers ||
      ["Career directions will appear here after deeper report generation."];

    const streamMatches =
      raw.streamMatches ||
      raw.allStreamMatches ||
      raw.allStreams ||
      raw.matches ||
      [
        {
          name: streamName,
          match: matchScore || 0,
          icon: "🎓",
        },
      ];

    return {
      streamName,
      matchScore,
      summary,
      reasons: Array.isArray(reasons) ? reasons : [],
      subjects: Array.isArray(subjects) ? subjects : [],
      careers: Array.isArray(careers) ? careers : [],
      streamMatches: Array.isArray(streamMatches) ? streamMatches : [],
    };
  }, [recommendation, allTestsCompleted]);

  async function handleGenerate() {
    if (!allTestsCompleted) {
      alert(
        "Complete Round 1 of all 7 assessments first to generate your stream recommendation."
      );
      return;
    }

    try {
      setGenerating(true);
      await generateClass10Recommendation();
      await loadRecommendation();
    } finally {
      setGenerating(false);
    }
  }

  if (loading) {
    return (
      <section className="sx-loading">
        <style>{streamCss}</style>

        <div className="sx-loader-card">
          <div className="sx-loader-icon">🧭</div>
          <h2>Loading Stream Explorer...</h2>
          <p>Please wait while we check your Round 1 progress.</p>
        </div>
      </section>
    );
  }

  if (!allTestsCompleted) {
    return (
      <section className="sx-page">
        <style>{streamCss}</style>

        <div className="sx-bg-blob"></div>
        <div className="sx-star">✦</div>

        <div className="sx-locked-wrap">
          <button
            type="button"
            className="sx-back-btn"
            onClick={() => setActivePage("dashboard")}
          >
            ← Back to Dashboard
          </button>

          <div className="sx-locked-card">
            <div className="sx-lock-icon">🔒</div>

            <p className="sx-locked-eyebrow">Locked Module</p>

            <h1>Stream Explorer Locked</h1>

            <p className="sx-locked-text">
              Complete Round 1 of all 7 Class 10 assessments first. Your
              recommended stream, subjects, career directions, and match score
              will appear only after the Round 1 journey is completed.
            </p>

            <div className="sx-locked-progress">
              <div className="sx-progress-top">
                <span>Round 1 Unlock Progress</span>
                <strong>
                  {completedCount}/{REQUIRED_TESTS.length}
                </strong>
              </div>

              <div className="sx-progress-track">
                <div
                  style={{
                    width: `${Math.round(
                      (completedCount / REQUIRED_TESTS.length) * 100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="sx-required-list">
              {testProgress.map((test) => (
                <div
                  key={test.key}
                  className={`sx-required-item ${test.completed ? "done" : ""}`}
                >
                  <span>{test.completed ? "✓" : "•"}</span>
                  <p>{test.name}</p>
                  <strong>
                    {test.attempted}/{TEST_TOTAL_QUESTIONS}
                  </strong>
                </div>
              ))}
            </div>

            <div className="sx-locked-actions">
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

  if (!streamData) {
    return (
      <section className="sx-page">
        <style>{streamCss}</style>

        <div className="sx-bg-blob"></div>
        <div className="sx-star">✦</div>

        <div className="sx-locked-wrap">
          <button
            type="button"
            className="sx-back-btn"
            onClick={() => setActivePage("dashboard")}
          >
            ← Back to Dashboard
          </button>

          <div className="sx-locked-card">
            <div className="sx-lock-icon">✨</div>

            <p className="sx-locked-eyebrow">Round 1 Completed</p>

            <h1>Generate Your Stream Recommendation</h1>

            <p className="sx-locked-text">
              Round 1 of all 7 assessments is complete. Now generate your stream
              recommendation to unlock stream details, subjects, and career
              directions.
            </p>

            <div className="sx-locked-actions">
              <button type="button" onClick={handleGenerate}>
                {generating ? "Generating..." : "Generate Recommendation"}
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
    <section className="sx-page">
      <style>{streamCss}</style>

      <div className="sx-bg-blob"></div>
      <div className="sx-star">✦</div>

      <div className="sx-content">
        <header className="sx-header">
          <div>
            <button
              type="button"
              className="sx-back-btn"
              onClick={() => setActivePage("dashboard")}
            >
              ← Back to Dashboard
            </button>

            <p className="sx-breadcrumb">
              <span>Dashboard</span> <b>›</b> Career Assessment <b>›</b> Stream
              Explorer
            </p>

            <h1>Stream Explorer</h1>

            <h3>
              Explore Class 11 stream options based on completed Round 1
              assessment results.
            </h3>
          </div>

          <button
            type="button"
            className="sx-generate-btn"
            onClick={handleGenerate}
          >
            {generating ? "Generating..." : "✨ Generate Again"}
          </button>
        </header>

        <section className="sx-hero-card">
          <div className="sx-hero-left">
            <p className="sx-eyebrow">Best Recommended Stream</p>

            <h2>{streamData.streamName}</h2>

            <p className="sx-match-line">
              Match Score:{" "}
              <span>
                {streamData.matchScore
                  ? `${streamData.matchScore}%`
                  : "Pending"}
              </span>
            </p>

            <p className="sx-summary">{streamData.summary}</p>

            <div className="sx-hero-actions">
              <button
                type="button"
                onClick={() => setActivePage("career-explorer")}
              >
                Explore Careers →
              </button>

              <button
                type="button"
                className="secondary"
                onClick={() => setActivePage("final-report")}
              >
                View Final Report
              </button>
            </div>
          </div>

          <div className="sx-match-circle">
            <div>
              <strong>{streamData.matchScore || "--"}%</strong>
              <span>Career Match</span>
            </div>
          </div>
        </section>

        <section className="sx-content-grid">
          <div className="sx-card sx-reasons-card">
            <div className="sx-card-title">
              <span>💡</span>
              <h2>Why this stream?</h2>
            </div>

            <div className="sx-reason-list">
              {streamData.reasons.map((reason, index) => (
                <div key={index} className="sx-reason-item">
                  <span>✓</span>
                  <p>{reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="sx-card sx-subjects-card">
            <div className="sx-card-title">
              <span>📚</span>
              <h2>Suggested Subjects</h2>
            </div>

            <div className="sx-chip-grid">
              {streamData.subjects.map((subject) => (
                <span key={subject}>{subject}</span>
              ))}
            </div>
          </div>

          <div className="sx-card sx-careers-card">
            <div className="sx-card-title">
              <span>💼</span>
              <h2>Career Directions</h2>
            </div>

            <div className="sx-career-list">
              {streamData.careers.map((career) => (
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
          </div>

          <div className="sx-card sx-compare-card">
            <div className="sx-card-title">
              <span>📊</span>
              <h2>Stream Match Comparison</h2>
            </div>

            <div className="sx-stream-list">
              {streamData.streamMatches.map((stream, index) => {
                const name =
                  stream.name ||
                  stream.streamName ||
                  stream.title ||
                  `Stream ${index + 1}`;

                const match =
                  stream.match || stream.matchScore || stream.score || 0;

                const icon = stream.icon || "🎓";

                return (
                  <div key={name} className="sx-stream-row">
                    <div className="sx-stream-main">
                      <span>{icon}</span>
                      <p>{name}</p>
                    </div>

                    <div className="sx-stream-bar">
                      <div style={{ width: `${match}%` }}></div>
                    </div>

                    <strong>{match}%</strong>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

const streamCss = `
.sx-page {
  position: relative;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background: #fbfdff;
  color: #111827;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.sx-page::-webkit-scrollbar {
  width: 10px;
}

.sx-page::-webkit-scrollbar-track {
  background: #EFF6FF;
}

.sx-page::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #005BFF, #00A3FF);
  border-radius: 999px;
}

.sx-content {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  padding: 20px 28px 36px;
}

.sx-bg-blob {
  position: fixed;
  right: -130px;
  top: -160px;
  width: 500px;
  height: 340px;
  background: radial-gradient(circle, rgba(0, 91, 255, 0.18), transparent 65%);
  border-radius: 999px;
  pointer-events: none;
}

.sx-star {
  position: fixed;
  right: 74px;
  top: 72px;
  color: #0B63F6;
  font-size: 34px;
  opacity: 0.65;
}

.sx-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 16px;
}

.sx-back-btn {
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

.sx-back-btn:hover {
  background: #F6FAFF;
}

.sx-breadcrumb {
  margin: 0 0 6px;
  color: #64748b;
  font-size: 13px;
  font-weight: 750;
}

.sx-breadcrumb span {
  color: #005BFF;
}

.sx-breadcrumb b {
  color: #94a3b8;
  margin: 0 4px;
}

.sx-header h1 {
  margin: 0;
  font-size: 34px;
  line-height: 1.03;
  color: #071B5F;
  letter-spacing: -1px;
  font-weight: 950;
}

.sx-header h3 {
  margin: 8px 0 0;
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
}

.sx-generate-btn {
  margin-top: 34px;
  border: none;
  background: linear-gradient(135deg, #005BFF, #00A3FF);
  color: white;
  border-radius: 15px;
  padding: 12px 17px;
  font-size: 13px;
  font-weight: 950;
  cursor: pointer;
  box-shadow: 0 14px 26px rgba(0, 91, 255, 0.22);
}

.sx-hero-card {
  border: 1px solid #D6E6FF;
  background: linear-gradient(135deg, #ffffff 0%, #F6FAFF 100%);
  border-radius: 24px;
  box-shadow: 0 18px 36px rgba(0, 43, 120, 0.06);
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr 190px;
  gap: 24px;
  align-items: center;
  margin-bottom: 16px;
}

.sx-eyebrow {
  margin: 0 0 8px;
  color: #005BFF;
  font-size: 14px;
  font-weight: 950;
}

.sx-hero-left h2 {
  margin: 0;
  color: #071B5F;
  font-size: 34px;
  line-height: 1;
  letter-spacing: -1px;
  font-weight: 950;
}

.sx-match-line {
  margin: 11px 0 0;
  color: #475569;
  font-size: 15px;
  font-weight: 750;
}

.sx-match-line span {
  color: #08a63f;
  font-weight: 950;
}

.sx-summary {
  max-width: 880px;
  margin: 11px 0 0;
  color: #475569;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 600;
}

.sx-hero-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.sx-hero-actions button {
  border: none;
  background: linear-gradient(135deg, #005BFF, #00A3FF);
  color: white;
  border-radius: 13px;
  padding: 11px 16px;
  font-size: 13px;
  font-weight: 950;
  cursor: pointer;
}

.sx-hero-actions button.secondary {
  background: #ffffff;
  color: #005BFF;
  border: 1px solid #60A5FA;
}

.sx-match-circle {
  width: 170px;
  height: 170px;
  border-radius: 999px;
  background:
    radial-gradient(circle at center, #ffffff 0 60%, transparent 61%),
    conic-gradient(#00A3FF 0 96%, #E6F0FF 96% 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;
  box-shadow: 0 18px 35px rgba(0, 91, 255, 0.18);
}

.sx-match-circle div {
  width: 124px;
  height: 124px;
  border-radius: 999px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  text-align: center;
}

.sx-match-circle strong {
  color: #005BFF;
  font-size: 31px;
  line-height: 1;
  font-weight: 950;
  display: block;
}

.sx-match-circle span {
  color: #64748b;
  font-size: 12px;
  line-height: 1;
  font-weight: 850;
  display: block;
  white-space: nowrap;
  text-align: center;
}

.sx-content-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 16px;
  align-items: stretch;
}

.sx-card {
  border: 1px solid #D6E6FF;
  background: #ffffff;
  border-radius: 22px;
  box-shadow: 0 18px 36px rgba(0, 43, 120, 0.055);
  padding: 20px;
  min-height: 190px;
}

.sx-card-title {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 14px;
}

.sx-card-title span {
  width: 32px;
  height: 32px;
  background: #EFF6FF;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sx-card-title h2 {
  margin: 0;
  color: #071B5F;
  font-size: 20px;
  font-weight: 950;
}

.sx-reason-list {
  display: grid;
  gap: 10px;
}

.sx-reason-item {
  display: grid;
  grid-template-columns: 26px 1fr;
  gap: 10px;
  align-items: start;
}

.sx-reason-item span {
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

.sx-reason-item p {
  margin: 0;
  color: #475569;
  font-size: 14px;
  line-height: 1.45;
  font-weight: 650;
}

.sx-chip-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.sx-chip-grid span {
  border: 1px solid #BFD7FF;
  background: #F6FAFF;
  color: #005BFF;
  border-radius: 999px;
  padding: 11px 15px;
  font-size: 14px;
  font-weight: 900;
}

.sx-career-list {
  display: grid;
  gap: 10px;
}

.sx-career-list button {
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

.sx-career-list span {
  font-size: 14px;
  font-weight: 900;
}

.sx-career-list b {
  color: #005BFF;
  font-size: 22px;
}

.sx-stream-list {
  display: grid;
  gap: 12px;
}

.sx-stream-row {
  display: grid;
  grid-template-columns: 155px 1fr 45px;
  gap: 12px;
  align-items: center;
}

.sx-stream-main {
  display: flex;
  align-items: center;
  gap: 9px;
}

.sx-stream-main span {
  width: 30px;
  height: 30px;
  background: #EFF6FF;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sx-stream-main p {
  margin: 0;
  font-size: 14px;
  color: #111827;
  font-weight: 900;
}

.sx-stream-bar {
  height: 8px;
  border-radius: 999px;
  background: #E6F0FF;
  overflow: hidden;
}

.sx-stream-bar div {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #005BFF, #00A3FF);
}

.sx-stream-row strong {
  color: #005BFF;
  font-size: 14px;
  font-weight: 950;
}

.sx-loading {
  height: 100vh;
  background: #fbfdff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sx-loader-card {
  width: 360px;
  background: white;
  border: 1px solid #D6E6FF;
  border-radius: 24px;
  padding: 34px;
  text-align: center;
  box-shadow: 0 18px 36px rgba(0, 43, 120, 0.08);
}

.sx-loader-icon {
  font-size: 44px;
  margin-bottom: 12px;
}

.sx-loader-card h2 {
  margin: 0 0 8px;
  color: #071B5F;
}

.sx-loader-card p {
  margin: 0;
  color: #64748b;
}

/* Locked screen */
.sx-locked-wrap {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  padding: 28px;
  display: flex;
  flex-direction: column;
}

.sx-locked-card {
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

.sx-lock-icon {
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

.sx-locked-eyebrow {
  margin: 0 0 10px;
  color: #005BFF;
  font-size: 14px;
  font-weight: 950;
}

.sx-locked-card h1 {
  margin: 0;
  color: #071B5F;
  font-size: 36px;
  line-height: 1.05;
  letter-spacing: -1px;
  font-weight: 950;
}

.sx-locked-text {
  max-width: 560px;
  margin: 14px auto 0;
  color: #64748b;
  font-size: 15px;
  line-height: 1.6;
  font-weight: 650;
}

.sx-locked-progress {
  margin-top: 26px;
  padding: 18px;
  border: 1px solid #d6e6ff;
  border-radius: 18px;
  background: #f6faff;
}

.sx-progress-top {
  display: flex;
  justify-content: space-between;
  color: #071B5F;
  font-size: 14px;
  font-weight: 950;
  margin-bottom: 10px;
}

.sx-progress-track {
  height: 10px;
  border-radius: 999px;
  background: #e6f0ff;
  overflow: hidden;
}

.sx-progress-track div {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #005BFF, #00A3FF);
}

.sx-required-list {
  margin-top: 18px;
  display: grid;
  gap: 9px;
}

.sx-required-item {
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

.sx-required-item span {
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

.sx-required-item.done span {
  background: #dcfce7;
  color: #08a63f;
}

.sx-required-item p {
  margin: 0;
  color: #071B5F;
  font-size: 13px;
  font-weight: 850;
}

.sx-required-item strong {
  color: #005BFF;
  font-size: 13px;
  font-weight: 950;
  text-align: right;
}

.sx-locked-actions {
  margin-top: 26px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.sx-locked-actions button {
  border: none;
  background: linear-gradient(135deg, #005BFF, #00A3FF);
  color: #ffffff;
  border-radius: 14px;
  padding: 13px 20px;
  font-size: 14px;
  font-weight: 950;
  cursor: pointer;
}

.sx-locked-actions button.secondary {
  background: #ffffff;
  color: #005BFF;
  border: 1px solid #bfd7ff;
}

@media (max-width: 1100px) {
  .sx-content-grid {
    grid-template-columns: 1fr;
  }

  .sx-hero-card {
    grid-template-columns: 1fr;
  }

  .sx-match-circle {
    margin-left: auto;
    margin-right: auto;
  }
}

@media (max-width: 700px) {
  .sx-content {
    padding: 18px;
  }

  .sx-header {
    flex-direction: column;
  }

  .sx-hero-card {
    padding: 20px;
  }

  .sx-content-grid {
    gap: 12px;
  }

  .sx-stream-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .sx-locked-wrap {
    padding: 18px;
  }

  .sx-locked-card {
    padding: 28px 20px;
  }

  .sx-locked-card h1 {
    font-size: 28px;
  }
}

@media (max-height: 760px) {
  .sx-content {
    padding: 16px 22px 32px;
  }

  .sx-back-btn {
    padding: 9px 13px;
    margin-bottom: 9px;
  }

  .sx-breadcrumb {
    font-size: 12px;
  }

  .sx-header h1 {
    font-size: 31px;
  }

  .sx-header h3 {
    font-size: 12.5px;
  }

  .sx-generate-btn {
    margin-top: 28px;
    padding: 10px 14px;
    font-size: 12px;
  }

  .sx-hero-card {
    padding: 18px 20px;
    grid-template-columns: 1fr 170px;
  }

  .sx-hero-left h2 {
    font-size: 31px;
  }

  .sx-summary {
    font-size: 12.5px;
  }

  .sx-match-circle {
    width: 152px;
    height: 152px;
    background:
      radial-gradient(circle at center, #ffffff 0 60%, transparent 61%),
      conic-gradient(#00A3FF 0 96%, #E6F0FF 96% 100%);
  }

  .sx-match-circle div {
    width: 112px;
    height: 112px;
    gap: 6px;
  }

  .sx-match-circle strong {
    font-size: 28px;
    line-height: 1;
  }

  .sx-match-circle span {
    font-size: 11px;
    line-height: 1;
    white-space: nowrap;
  }

  .sx-card {
    min-height: 170px;
    padding: 16px;
  }
}
`;