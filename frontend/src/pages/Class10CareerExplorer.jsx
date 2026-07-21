import React, { useEffect, useMemo, useState } from "react";
import { getClass10Recommendation } from "../services/class10Api";

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

const careerBank = {
  commerce: [
    {
      title: "Chartered Accountant",
      match: 96,
      demand: "Very High",
      salary: "₹6 - ₹25 LPA",
      exams: ["CA Foundation", "CA Intermediate", "CA Final"],
      skills: ["Accounting", "Taxation", "Auditing", "Finance"],
      roadmap:
        "Choose Commerce with Accountancy and Mathematics. Start CA Foundation preparation after Class 12.",
      icon: "📊",
    },
    {
      title: "Investment Banker",
      match: 93,
      demand: "High",
      salary: "₹10 - ₹40 LPA",
      exams: ["B.Com", "BBA", "MBA Finance", "CFA"],
      skills: ["Finance", "Markets", "Valuation", "Communication"],
      roadmap:
        "Build strong finance basics, learn stock markets, Excel, valuation, and pursue MBA/CFA later.",
      icon: "🏦",
    },
    {
      title: "Business Analyst",
      match: 90,
      demand: "High",
      salary: "₹6 - ₹22 LPA",
      exams: ["BBA", "B.Com", "BCA", "MBA"],
      skills: ["Data Analysis", "Business Thinking", "Excel", "SQL"],
      roadmap:
        "Study Commerce with Mathematics or Economics. Build analytical, data, and presentation skills.",
      icon: "📈",
    },
    {
      title: "Entrepreneur",
      match: 88,
      demand: "High",
      salary: "Variable",
      exams: ["BBA", "B.Com", "Startup Programs"],
      skills: ["Sales", "Marketing", "Finance", "Leadership"],
      roadmap:
        "Start learning business basics early. Build small projects, understand customers, and practice selling.",
      icon: "🚀",
    },
  ],

  science: [
    {
      title: "Software Engineer",
      match: 91,
      demand: "Very High",
      salary: "₹6 - ₹50 LPA",
      exams: ["JEE", "CUET", "Engineering Entrance"],
      skills: ["Coding", "Logic", "DSA", "System Design"],
      roadmap:
        "Choose Science with Mathematics. Learn programming and build projects consistently.",
      icon: "💻",
    },
    {
      title: "Doctor",
      match: 88,
      demand: "Very High",
      salary: "₹8 - ₹40 LPA",
      exams: ["NEET"],
      skills: ["Biology", "Discipline", "Empathy", "Memory"],
      roadmap:
        "Choose PCB and start NEET preparation with strong Biology, Chemistry, and Physics foundations.",
      icon: "🩺",
    },
    {
      title: "Data Scientist",
      match: 84,
      demand: "High",
      salary: "₹8 - ₹35 LPA",
      exams: ["JEE", "CUET", "B.Sc Data Science"],
      skills: ["Maths", "Python", "Statistics", "AI"],
      roadmap:
        "Choose PCM. Build strong Mathematics and start learning Python, statistics, and AI basics.",
      icon: "🤖",
    },
    {
      title: "Architect",
      match: 82,
      demand: "High",
      salary: "₹5 - ₹25 LPA",
      exams: ["NATA", "JEE Paper 2"],
      skills: ["Design", "Maths", "Drawing", "Planning"],
      roadmap:
        "Choose Science with Mathematics. Build design sense, spatial thinking, and prepare for architecture entrance exams.",
      icon: "🏛️",
    },
  ],

  arts: [
    {
      title: "Psychologist",
      match: 90,
      demand: "High",
      salary: "₹4 - ₹20 LPA",
      exams: ["BA Psychology", "MA Psychology"],
      skills: ["Listening", "Human Behavior", "Research", "Empathy"],
      roadmap:
        "Choose Humanities with Psychology. Build communication, research, and counselling skills.",
      icon: "🧠",
    },
    {
      title: "Lawyer",
      match: 87,
      demand: "High",
      salary: "₹5 - ₹30 LPA",
      exams: ["CLAT", "AILET", "CUET"],
      skills: ["Reading", "Reasoning", "Writing", "Debating"],
      roadmap:
        "Choose Humanities or Commerce. Prepare for CLAT with reasoning, GK, legal aptitude, and reading practice.",
      icon: "⚖️",
    },
    {
      title: "Journalist",
      match: 82,
      demand: "Medium",
      salary: "₹3 - ₹15 LPA",
      exams: ["BA Journalism", "Mass Communication"],
      skills: ["Writing", "Research", "Communication", "Storytelling"],
      roadmap:
        "Choose Humanities. Build writing, current affairs, public speaking, and digital media skills.",
      icon: "📰",
    },
  ],

  vocational: [
    {
      title: "UX Designer",
      match: 88,
      demand: "High",
      salary: "₹5 - ₹25 LPA",
      exams: ["Design Entrance", "Portfolio Based Courses"],
      skills: ["Design Thinking", "User Research", "Figma", "Creativity"],
      roadmap:
        "Build design skills, create a portfolio, understand users, and learn digital product design tools.",
      icon: "🎨",
    },
    {
      title: "Digital Marketer",
      match: 84,
      demand: "High",
      salary: "₹3 - ₹20 LPA",
      exams: ["Marketing Courses", "BBA", "Certifications"],
      skills: ["Content", "Analytics", "Sales", "Social Media"],
      roadmap:
        "Start with content creation, ads, branding, analytics, and real business campaigns.",
      icon: "📣",
    },
    {
      title: "Video Editor",
      match: 80,
      demand: "High",
      salary: "₹3 - ₹18 LPA",
      exams: ["Portfolio Based", "Media Courses"],
      skills: ["Editing", "Storytelling", "Motion Graphics", "Creativity"],
      roadmap:
        "Build editing projects, learn storytelling, create a portfolio, and work on real content.",
      icon: "🎬",
    },
  ],

  general: [
    {
      title: "Career Research Track",
      match: 75,
      demand: "Growing",
      salary: "Depends on path",
      exams: ["Stream Based", "Skill Based"],
      skills: ["Self Awareness", "Research", "Communication", "Consistency"],
      roadmap:
        "Explore multiple streams, complete counselling, talk to parents and mentors, and build a skill-based roadmap.",
      icon: "🧭",
    },
  ],
};

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

function getStreamKey(streamName = "") {
  const value = String(streamName).toLowerCase();

  if (value.includes("commerce")) return "commerce";
  if (value.includes("science")) return "science";
  if (value.includes("arts") || value.includes("humanities")) return "arts";

  if (
    value.includes("vocational") ||
    value.includes("skill") ||
    value.includes("design")
  ) {
    return "vocational";
  }

  return "general";
}

export default function Class10CareerExplorer({ setActivePage }) {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
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

    return { streamName, matchScore };
  }, [recommendation, allTestsCompleted]);

  const streamKey = streamData ? getStreamKey(streamData.streamName) : "general";
  const careers = streamData ? careerBank[streamKey] || careerBank.general : [];
  const topCareer = careers[0] || null;

  const filteredCareers = careers.filter((career) => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return true;

    return (
      career.title.toLowerCase().includes(query) ||
      career.skills.some((skill) => skill.toLowerCase().includes(query)) ||
      career.exams.some((exam) => exam.toLowerCase().includes(query))
    );
  });

  if (loading) {
    return (
      <section className="ce-loading">
        <style>{careerCss}</style>

        <div className="ce-loader-card">
          <div className="ce-loader-icon">💼</div>
          <h2>Loading Career Explorer...</h2>
          <p>Checking Round 1 completion first.</p>
        </div>
      </section>
    );
  }

  if (!allTestsCompleted) {
    return (
      <section className="ce-page">
        <style>{careerCss}</style>

        <div className="ce-bg-blob"></div>

        <div className="ce-locked-wrap">
          <button
            type="button"
            className="ce-back-btn"
            onClick={() => setActivePage("dashboard")}
          >
            ← Back to Dashboard
          </button>

          <div className="ce-locked-card">
            <div className="ce-lock-icon">🔒</div>

            <p className="ce-locked-eyebrow">Locked Module</p>

            <h1>Career Explorer Locked</h1>

            <p className="ce-locked-text">
              Complete Round 1 of all 7 Class 10 assessments first. Career
              matches, salary range, exams, skills, and roadmaps will appear
              only after the Round 1 journey is completed.
            </p>

            <div className="ce-locked-progress">
              <div className="ce-progress-top">
                <span>Round 1 Unlock Progress</span>
                <strong>
                  {completedCount}/{REQUIRED_TESTS.length}
                </strong>
              </div>

              <div className="ce-progress-track">
                <div
                  style={{
                    width: `${Math.round(
                      (completedCount / REQUIRED_TESTS.length) * 100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="ce-required-list">
              {testProgress.map((test) => (
                <div
                  key={test.key}
                  className={`ce-required-item ${test.completed ? "done" : ""}`}
                >
                  <span>{test.completed ? "✓" : "•"}</span>
                  <p>{test.name}</p>
                  <strong>
                    {test.attempted}/{TEST_TOTAL_QUESTIONS}
                  </strong>
                </div>
              ))}
            </div>

            <div className="ce-locked-actions">
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

  if (!streamData || !topCareer) {
    return (
      <section className="ce-page">
        <style>{careerCss}</style>

        <div className="ce-bg-blob"></div>

        <div className="ce-locked-wrap">
          <button
            type="button"
            className="ce-back-btn"
            onClick={() => setActivePage("dashboard")}
          >
            ← Back to Dashboard
          </button>

          <div className="ce-locked-card">
            <div className="ce-lock-icon">✨</div>

            <p className="ce-locked-eyebrow">Recommendation Required</p>

            <h1>Generate Stream Recommendation First</h1>

            <p className="ce-locked-text">
              Round 1 of all 7 assessments is complete. Please open Stream
              Explorer and generate the stream recommendation. Career matches
              will unlock after the recommended stream is available.
            </p>

            <div className="ce-locked-actions">
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
    <section className="ce-page">
      <style>{careerCss}</style>

      <div className="ce-bg-blob"></div>

      <div className="ce-content">
        <header className="ce-header">
          <div>
            <button
              type="button"
              className="ce-back-btn"
              onClick={() => setActivePage("dashboard")}
            >
              ← Back to Dashboard
            </button>

            <p className="ce-breadcrumb">
              <span>Dashboard</span> <b>›</b> Stream Explorer <b>›</b> Career
              Explorer
            </p>

            <h1>Careers matching {streamData.streamName}</h1>

            <h3>
              Explore careers, salary range, exams, skills, and roadmap
              connected to your recommended stream.
            </h3>
          </div>

          <button
            type="button"
            className="ce-report-btn"
            onClick={() => setActivePage("final-report")}
          >
            📄 View Final Report
          </button>
        </header>

        <section className="ce-hero-card">
          <div className="ce-hero-left">
            <p className="ce-eyebrow">Best Career Direction</p>

            <h2>{topCareer.title}</h2>

            <p className="ce-match-line">
              Recommended Stream: <span>{streamData.streamName}</span>
            </p>

            <p className="ce-summary">
              This career matches the student’s current stream recommendation
              and career profile. It connects with skills, interests, subject
              direction, and long-term growth possibilities.
            </p>

            <div className="ce-hero-actions">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("career-matches")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Matches →
              </button>

              <button
                type="button"
                className="secondary"
                onClick={() => setActivePage("stream-explorer")}
              >
                Back to Stream
              </button>
            </div>
          </div>

          <div className="ce-match-circle">
            <div>
              <strong>{topCareer.match}%</strong>
              <span>Career Match</span>
            </div>
          </div>
        </section>

        <section className="ce-search-card">
          <div>
            <p>Search careers</p>
            <h2>Find the right career path faster</h2>
          </div>

          <input
            type="text"
            placeholder="Search careers, skills, exams..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </section>

        <section className="ce-stats-grid">
          <StatCard
            icon="🎯"
            label="Recommended Stream"
            value={streamData.streamName}
          />

          <StatCard
            icon="📈"
            label="Stream Match"
            value={
              streamData.matchScore ? `${streamData.matchScore}%` : "Pending"
            }
          />

          <StatCard icon="💼" label="Career Matches" value={careers.length} />
          <StatCard icon="🚀" label="Top Demand" value={topCareer.demand} />
        </section>

        <section id="career-matches" className="ce-main-section">
          <div className="ce-section-head">
            <div>
              <p>Best Career Matches</p>
              <h2>
                {filteredCareers.length} careers found for{" "}
                {streamData.streamName}
              </h2>
            </div>

            <button type="button" onClick={() => setSearchTerm("")}>
              Clear Search
            </button>
          </div>

          <div className="ce-career-grid">
            {filteredCareers.map((career) => (
              <article key={career.title} className="ce-career-card">
                <div className="ce-career-top">
                  <div className="ce-career-icon">{career.icon}</div>

                  <div>
                    <h3>{career.title}</h3>
                    <p>Demand: {career.demand}</p>
                  </div>

                  <div className="ce-match-badge">{career.match}%</div>
                </div>

                <div className="ce-career-info">
                  <div>
                    <span>Salary Range</span>
                    <strong>{career.salary}</strong>
                  </div>

                  <div>
                    <span>Best Exams / Path</span>
                    <strong>{career.exams.slice(0, 2).join(", ")}</strong>
                  </div>
                </div>

                <div className="ce-chip-section">
                  <p>Skills to build</p>

                  <div className="ce-chip-grid">
                    {career.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="ce-roadmap">
                  <p>Roadmap</p>
                  <h4>{career.roadmap}</h4>
                </div>

                <button
                  type="button"
                  className="ce-card-btn"
                  onClick={() => setActivePage("final-report")}
                >
                  Add to Final Report →
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="ce-stat-card">
      <div>{icon}</div>

      <section>
        <p>{label}</p>
        <h3>{value}</h3>
      </section>
    </div>
  );
}

const careerCss = `
.ce-page {
  position: relative;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background: #fbfbff;
  color: #111827;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.ce-content {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  padding: 20px 28px 38px;
}

.ce-bg-blob {
  position: fixed;
  right: -140px;
  top: -160px;
  width: 520px;
  height: 360px;
  background: radial-gradient(circle, rgba(0, 91, 255, 0.18), transparent 65%);
  border-radius: 999px;
  pointer-events: none;
}

.ce-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 16px;
}

.ce-back-btn {
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

.ce-breadcrumb {
  margin: 0 0 6px;
  color: #64748b;
  font-size: 13px;
  font-weight: 750;
}

.ce-breadcrumb span {
  color: #005BFF;
}

.ce-breadcrumb b {
  color: #94a3b8;
  margin: 0 4px;
}

.ce-header h1 {
  margin: 0;
  font-size: 36px;
  line-height: 1.03;
  color: #0f172a;
  letter-spacing: -1px;
  font-weight: 950;
}

.ce-header h3 {
  margin: 8px 0 0;
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
}

.ce-report-btn {
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

.ce-hero-card,
.ce-search-card,
.ce-main-section,
.ce-career-card,
.ce-stat-card,
.ce-locked-card {
  border: 1px solid #D6E6FF;
  background: #ffffff;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.06);
}

.ce-hero-card {
  border-radius: 24px;
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr 170px;
  gap: 24px;
  align-items: center;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #ffffff 0%, #F6FAFF 100%);
}

.ce-eyebrow {
  margin: 0 0 8px;
  color: #005BFF;
  font-size: 14px;
  font-weight: 950;
}

.ce-hero-left h2 {
  margin: 0;
  color: #0f172a;
  font-size: 34px;
  line-height: 1;
  letter-spacing: -1px;
  font-weight: 950;
}

.ce-match-line,
.ce-summary {
  color: #475569;
  font-weight: 650;
}

.ce-match-line {
  margin: 11px 0 0;
  font-size: 15px;
}

.ce-match-line span {
  color: #005BFF;
  font-weight: 950;
}

.ce-summary {
  max-width: 880px;
  margin: 11px 0 0;
  font-size: 14px;
  line-height: 1.5;
}

.ce-hero-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.ce-hero-actions button,
.ce-card-btn,
.ce-locked-actions button {
  border: none;
  background: linear-gradient(135deg, #005BFF, #00A3FF);
  color: white;
  border-radius: 13px;
  padding: 11px 16px;
  font-size: 13px;
  font-weight: 950;
  cursor: pointer;
}

.ce-hero-actions button.secondary,
.ce-locked-actions button.secondary {
  background: #ffffff;
  color: #005BFF;
  border: 1px solid #60A5FA;
}

.ce-match-circle {
  width: 152px;
  height: 152px;
  border-radius: 999px;
  background:
    radial-gradient(circle at center, #ffffff 0 59%, transparent 60%),
    conic-gradient(#00A3FF 0 96%, #E6F0FF 96% 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;
  box-shadow: 0 18px 35px rgba(0, 91, 255, 0.18);
}

.ce-match-circle div {
  width: 110px;
  height: 110px;
  border-radius: 999px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  text-align: center;
}

.ce-match-circle strong {
  color: #005BFF;
  font-size: 28px;
  line-height: 1;
  font-weight: 950;
}

.ce-match-circle span {
  color: #64748b;
  font-size: 11px;
  line-height: 1;
  font-weight: 850;
  white-space: nowrap;
}

.ce-search-card {
  border-radius: 22px;
  padding: 18px 20px;
  margin-bottom: 16px;
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 18px;
  align-items: center;
}

.ce-search-card p,
.ce-section-head p,
.ce-chip-section p,
.ce-roadmap p {
  margin: 0 0 4px;
  color: #005BFF;
  font-size: 13px;
  font-weight: 950;
}

.ce-search-card h2,
.ce-section-head h2 {
  margin: 0;
  color: #111827;
  font-size: 20px;
  font-weight: 950;
}

.ce-search-card input {
  width: 100%;
  height: 48px;
  border: 1px solid #BFD7FF;
  background: #F6FAFF;
  border-radius: 15px;
  padding: 0 18px;
  color: #111827;
  font-size: 15px;
  font-weight: 650;
  outline: none;
}

.ce-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 18px;
}

.ce-stat-card {
  border-radius: 20px;
  padding: 18px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.ce-stat-card > div {
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: #EFF6FF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.ce-stat-card p {
  margin: 0 0 4px;
  color: #64748b;
  font-size: 13px;
  font-weight: 750;
}

.ce-stat-card h3 {
  margin: 0;
  color: #111827;
  font-size: 20px;
  font-weight: 950;
}

.ce-main-section {
  border-radius: 24px;
  padding: 22px;
}

.ce-section-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.ce-section-head button {
  border: 1px solid #60A5FA;
  background: white;
  color: #005BFF;
  border-radius: 13px;
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;
}

.ce-career-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.ce-career-card {
  border-radius: 21px;
  padding: 20px;
  background: linear-gradient(135deg, #ffffff, #f6faff);
}

.ce-career-top {
  display: grid;
  grid-template-columns: 52px 1fr 62px;
  gap: 14px;
  align-items: center;
  margin-bottom: 16px;
}

.ce-career-icon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: #EFF6FF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.ce-career-top h3 {
  margin: 0;
  color: #111827;
  font-size: 20px;
  font-weight: 950;
}

.ce-career-top p {
  margin: 4px 0 0;
  color: #64748b;
  font-size: 13px;
  font-weight: 700;
}

.ce-match-badge {
  width: 56px;
  height: 56px;
  border-radius: 999px;
  background: linear-gradient(135deg, #005BFF, #00A3FF);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 950;
}

.ce-career-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}

.ce-career-info div,
.ce-roadmap {
  background: #F6FAFF;
  border: 1px solid #D6E6FF;
  border-radius: 15px;
  padding: 12px;
}

.ce-career-info span {
  display: block;
  color: #005BFF;
  font-size: 12px;
  font-weight: 950;
  margin-bottom: 6px;
}

.ce-career-info strong,
.ce-roadmap h4 {
  color: #111827;
  font-size: 14px;
  line-height: 1.35;
  font-weight: 850;
}

.ce-chip-section {
  margin-bottom: 16px;
}

.ce-chip-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.ce-chip-grid span {
  border: 1px solid #BFD7FF;
  background: #ffffff;
  color: #005BFF;
  border-radius: 999px;
  padding: 8px 11px;
  font-size: 12px;
  font-weight: 850;
}

.ce-roadmap {
  margin-bottom: 16px;
}

.ce-roadmap h4 {
  margin: 0;
  color: #475569;
}

.ce-card-btn {
  width: 100%;
  height: 42px;
}

.ce-loading {
  height: 100vh;
  background: #fbfbff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ce-loader-card {
  width: 360px;
  background: white;
  border: 1px solid #D6E6FF;
  border-radius: 24px;
  padding: 34px;
  text-align: center;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.08);
}

.ce-loader-icon {
  font-size: 44px;
  margin-bottom: 12px;
}

.ce-loader-card h2 {
  margin: 0 0 8px;
  color: #0f172a;
}

.ce-loader-card p {
  margin: 0;
  color: #64748b;
}

.ce-locked-wrap {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  padding: 28px;
  display: flex;
  flex-direction: column;
}

.ce-locked-card {
  width: 100%;
  max-width: 720px;
  margin: auto;
  border-radius: 30px;
  padding: 42px;
  text-align: center;
}

.ce-lock-icon {
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

.ce-locked-eyebrow {
  margin: 0 0 10px;
  color: #005BFF;
  font-size: 14px;
  font-weight: 950;
}

.ce-locked-card h1 {
  margin: 0;
  color: #071B5F;
  font-size: 36px;
  line-height: 1.05;
  letter-spacing: -1px;
  font-weight: 950;
}

.ce-locked-text {
  max-width: 560px;
  margin: 14px auto 0;
  color: #64748b;
  font-size: 15px;
  line-height: 1.6;
  font-weight: 650;
}

.ce-locked-progress {
  margin-top: 26px;
  padding: 18px;
  border: 1px solid #d6e6ff;
  border-radius: 18px;
  background: #f6faff;
}

.ce-progress-top {
  display: flex;
  justify-content: space-between;
  color: #071B5F;
  font-size: 14px;
  font-weight: 950;
  margin-bottom: 10px;
}

.ce-progress-track {
  height: 10px;
  border-radius: 999px;
  background: #e6f0ff;
  overflow: hidden;
}

.ce-progress-track div {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #005BFF, #00A3FF);
}

.ce-required-list {
  margin-top: 18px;
  display: grid;
  gap: 9px;
}

.ce-required-item {
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

.ce-required-item span {
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

.ce-required-item.done span {
  background: #dcfce7;
  color: #08a63f;
}

.ce-required-item p {
  margin: 0;
  color: #071B5F;
  font-size: 13px;
  font-weight: 850;
}

.ce-required-item strong {
  color: #005BFF;
  font-size: 13px;
  font-weight: 950;
  text-align: right;
}

.ce-locked-actions {
  margin-top: 26px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

@media (max-width: 1180px) {
  .ce-hero-card,
  .ce-search-card {
    grid-template-columns: 1fr;
  }

  .ce-match-circle {
    margin-left: auto;
    margin-right: auto;
  }

  .ce-stats-grid,
  .ce-career-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 720px) {
  .ce-content {
    padding: 18px;
  }

  .ce-header {
    flex-direction: column;
  }

  .ce-header h1 {
    font-size: 30px;
  }

  .ce-stats-grid,
  .ce-career-grid {
    grid-template-columns: 1fr;
  }

  .ce-career-info {
    grid-template-columns: 1fr;
  }

  .ce-locked-wrap {
    padding: 18px;
  }

  .ce-locked-card {
    padding: 28px 20px;
  }

  .ce-locked-card h1 {
    font-size: 28px;
  }
}
`;