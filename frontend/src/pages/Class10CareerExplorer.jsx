import React, { useEffect, useMemo, useState } from "react";
import { getClass10Recommendation } from "../services/class10Api";

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
    {
      title: "Product Manager",
      match: 86,
      demand: "Very High",
      salary: "₹12 - ₹45 LPA",
      exams: ["BBA", "Engineering", "MBA", "Product Courses"],
      skills: ["Product Thinking", "User Research", "Data", "Communication"],
      roadmap:
        "Combine commerce, technology, user psychology, and business skills. Build small digital products.",
      icon: "🧩",
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
        "Choose Humanities with Psychology. Build communication and research skills.",
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
        "Choose Humanities or Commerce. Prepare for CLAT with reasoning, GK, and reading practice.",
      icon: "⚖️",
    },
  ],
};

const fallbackRecommendation = {
  streamName: "Commerce",
  matchScore: 96,
};

function getStreamKey(streamName = "Commerce") {
  const value = String(streamName).toLowerCase();

  if (value.includes("commerce")) return "commerce";
  if (value.includes("science")) return "science";
  if (value.includes("arts") || value.includes("humanities")) return "arts";

  return "commerce";
}

export default function Class10CareerExplorer({ setActivePage }) {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  async function loadRecommendation() {
    try {
      setLoading(true);

      const response = await getClass10Recommendation().catch(() => null);
      const data = response?.data || response?.recommendation || response;

      setRecommendation(data || null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRecommendation();
  }, []);

  const streamData = useMemo(() => {
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
          fallbackRecommendation.streamName;

    const matchScore =
      raw.matchScore ||
      raw.match ||
      rawStream?.matchScore ||
      rawStream?.match ||
      raw.recommendation?.matchScore ||
      fallbackRecommendation.matchScore;

    return { streamName, matchScore };
  }, [recommendation]);

  const streamKey = getStreamKey(streamData.streamName);
  const careers = careerBank[streamKey] || careerBank.commerce;

  const filteredCareers = careers.filter((career) => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return true;

    return (
      career.title.toLowerCase().includes(query) ||
      career.skills.some((skill) => skill.toLowerCase().includes(query)) ||
      career.exams.some((exam) => exam.toLowerCase().includes(query))
    );
  });

  const topCareer = careers[0];

  if (loading) {
    return (
      <section className="ce-loading">
        <style>{careerCss}</style>

        <div className="ce-loader-card">
          <div className="ce-loader-icon">💼</div>
          <h2>Loading Career Explorer...</h2>
          <p>Preparing career matches for your stream.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="ce-page">
      <style>{careerCss}</style>

      <div className="ce-bg-blob"></div>
      <div className="ce-star">✦</div>

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
              and career profile. It connects well with business thinking,
              financial understanding, problem-solving, and long-term career
              growth.
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
          <StatCard icon="🎯" label="Recommended Stream" value={streamData.streamName} />
          <StatCard icon="📈" label="Stream Match" value={`${streamData.matchScore}%`} />
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

.ce-page::-webkit-scrollbar {
  width: 10px;
}

.ce-page::-webkit-scrollbar-track {
  background: #f3efff;
}

.ce-page::-webkit-scrollbar-thumb {
  background: #60A5FA;
  border-radius: 999px;
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

.ce-star {
  position: fixed;
  right: 80px;
  top: 74px;
  color: #0B63F6;
  font-size: 34px;
  opacity: 0.65;
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

.ce-back-btn:hover {
  background: #F6FAFF;
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

.ce-hero-card {
  border: 1px solid #e7e2f4;
  background: linear-gradient(135deg, #ffffff 0%, #F6FAFF 100%);
  border-radius: 24px;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.06);
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr 145px;
  gap: 24px;
  align-items: center;
  margin-bottom: 16px;
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

.ce-match-line {
  margin: 11px 0 0;
  color: #475569;
  font-size: 15px;
  font-weight: 750;
}

.ce-match-line span {
  color: #005BFF;
  font-weight: 950;
}

.ce-summary {
  max-width: 880px;
  margin: 11px 0 0;
  color: #475569;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 600;
}

.ce-hero-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.ce-hero-actions button {
  border: none;
  background: linear-gradient(135deg, #005BFF, #00A3FF);
  color: white;
  border-radius: 13px;
  padding: 11px 16px;
  font-size: 13px;
  font-weight: 950;
  cursor: pointer;
}

.ce-hero-actions button.secondary {
  background: #ffffff;
  color: #005BFF;
  border: 1px solid #60A5FA;
}

.ce-match-circle {
  width: 132px;
  height: 132px;
  border-radius: 999px;
  background:
    radial-gradient(circle at center, #ffffff 0 52%, transparent 53%),
    conic-gradient(#00A3FF 0 96%, #E6F0FF 96% 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 18px 35px rgba(0, 91, 255, 0.18);
}

.ce-match-circle div {
  width: 92px;
  height: 92px;
  border-radius: 999px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.ce-match-circle strong {
  color: #005BFF;
  font-size: 27px;
  font-weight: 950;
}

.ce-match-circle span {
  color: #64748b;
  font-size: 12px;
  font-weight: 800;
}

.ce-search-card {
  border: 1px solid #e7e2f4;
  background: #ffffff;
  border-radius: 22px;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.055);
  padding: 18px 20px;
  margin-bottom: 16px;
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 18px;
  align-items: center;
}

.ce-search-card p {
  margin: 0 0 4px;
  color: #005BFF;
  font-size: 13px;
  font-weight: 950;
}

.ce-search-card h2 {
  margin: 0;
  color: #111827;
  font-size: 20px;
  font-weight: 950;
}

.ce-search-card input {
  width: 100%;
  height: 48px;
  border: 1px solid #e5d8ff;
  background: #F6FAFF;
  border-radius: 15px;
  padding: 0 18px;
  color: #111827;
  font-size: 15px;
  font-weight: 650;
  outline: none;
}

.ce-search-card input:focus {
  border-color: #0B63F6;
  box-shadow: 0 0 0 4px rgba(0, 163, 255, 0.12);
}

.ce-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 18px;
}

.ce-stat-card {
  border: 1px solid #e7e2f4;
  background: white;
  border-radius: 20px;
  padding: 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.045);
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
  border: 1px solid #e7e2f4;
  background: #ffffff;
  border-radius: 24px;
  padding: 22px;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.055);
}

.ce-section-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.ce-section-head p {
  margin: 0 0 5px;
  color: #005BFF;
  font-size: 14px;
  font-weight: 950;
}

.ce-section-head h2 {
  margin: 0;
  color: #111827;
  font-size: 24px;
  font-weight: 950;
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
  border: 1px solid #D6E6FF;
  background: linear-gradient(135deg, #ffffff, #fdfbff);
  border-radius: 21px;
  padding: 20px;
  box-shadow: 0 12px 26px rgba(15, 23, 42, 0.04);
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

.ce-career-info div {
  background: #F6FAFF;
  border: 1px solid #D6E6FF;
  border-radius: 15px;
  padding: 12px;
}

.ce-career-info span,
.ce-chip-section p,
.ce-roadmap p {
  display: block;
  color: #005BFF;
  font-size: 12px;
  font-weight: 950;
  margin-bottom: 6px;
}

.ce-career-info strong {
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
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 13px;
  margin-bottom: 16px;
}

.ce-roadmap h4 {
  margin: 0;
  color: #475569;
  font-size: 13px;
  line-height: 1.45;
  font-weight: 650;
}

.ce-card-btn {
  width: 100%;
  height: 42px;
  border: none;
  background: linear-gradient(135deg, #005BFF, #00A3FF);
  color: white;
  border-radius: 13px;
  font-size: 13px;
  font-weight: 950;
  cursor: pointer;
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
  border: 1px solid #e7e2f4;
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

@media (max-height: 760px) {
  .ce-content {
    padding: 16px 22px 34px;
  }

  .ce-back-btn {
    padding: 9px 13px;
    margin-bottom: 9px;
  }

  .ce-breadcrumb {
    font-size: 12px;
  }

  .ce-header h1 {
    font-size: 31px;
  }

  .ce-header h3 {
    font-size: 12.5px;
  }

  .ce-report-btn {
    margin-top: 28px;
    padding: 10px 14px;
    font-size: 12px;
  }

  .ce-hero-card {
    padding: 18px 20px;
  }

  .ce-hero-left h2 {
    font-size: 31px;
  }

  .ce-summary {
    font-size: 12.5px;
  }

  .ce-match-circle {
    width: 108px;
    height: 108px;
  }

  .ce-match-circle div {
    width: 76px;
    height: 76px;
  }

  .ce-match-circle strong {
    font-size: 23px;
  }

  .ce-search-card {
    padding: 15px;
  }

  .ce-stat-card {
    padding: 14px;
  }
}
`;



