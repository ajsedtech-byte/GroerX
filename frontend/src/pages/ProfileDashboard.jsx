import React from "react";

const moduleData = {
  "class12-dashboard": {
    title: "Class 12 Dashboard",
    description:
      "Plan courses, colleges, entrance exams, scholarships, and future careers.",
    cards: ["Course Direction", "College Shortlist", "Entrance Planner", "Career Roadmap"],
  },
  "ug-dashboard": {
    title: "UG Dashboard",
    description:
      "Build skills, internships, resume, portfolio, and job readiness.",
    cards: ["Skill Gap", "Internship Plan", "Resume Score", "Job Roles"],
  },
  "pg-dashboard": {
    title: "PG Dashboard",
    description:
      "Choose specialization, research path, placement direction, and industry skills.",
    cards: ["Specialization", "Research Direction", "Placement Plan", "Industry Skills"],
  },
  "working-dashboard": {
    title: "Working Professional Dashboard",
    description:
      "Plan career switch, salary growth, upskilling, LinkedIn, and interview readiness.",
    cards: ["Career Switch", "Salary Growth", "Upskilling", "Interview Prep"],
  },
};

export default function ProfileDashboard({ profile, currentModule }) {
  const dashboard = moduleData[currentModule] || {
    title: profile?.title,
    description: profile?.subtitle,
    cards: profile?.menu?.map((item) => item.label) || [],
  };

  return (
    <main style={pageStyle}>
      <p style={{ color: "#93c5fd", fontWeight: "800" }}>
        GroerX &gt; {profile?.title}
      </p>

      <section style={heroStyle}>
        <p style={{ color: "#67e8f9", fontWeight: "800" }}>
          {profile?.emoji} {profile?.title}
        </p>

        <h1 style={{ fontSize: "46px", margin: "10px 0" }}>
          {dashboard.title}
        </h1>

        <p style={{ color: "#cbd5e1", fontSize: "18px", maxWidth: "780px" }}>
          {dashboard.description}
        </p>
      </section>

      <section style={gridStyle}>
        {dashboard.cards.map((card) => (
          <div key={card} style={cardStyle}>
            <h2>{card}</h2>
            <p style={{ color: "#94a3b8", lineHeight: "1.7" }}>
              This module will use the same GroerX architecture: assessment,
              profile analysis, recommendation, roadmap, and final report.
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#050816",
  color: "white",
  padding: "40px",
};

const heroStyle = {
  background: "linear-gradient(135deg, #1a0b48, #071426)",
  border: "1px solid #312e81",
  borderRadius: "30px",
  padding: "36px",
  marginBottom: "26px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "22px",
};

const cardStyle = {
  background: "#111827",
  border: "1px solid #263244",
  borderRadius: "24px",
  padding: "26px",
};

