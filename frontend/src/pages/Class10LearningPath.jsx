import React, { useState } from "react";

export default function Class10LearningPath({ setActivePage }) {
  const [activeModule, setActiveModule] = useState(null);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const learningModules = [
    {
      id: "board-booster",
      number: "01",
      icon: "🎯",
      title: "Board Booster Plan",
      label: "Start Here",
      desc: "Auto-create a practical board preparation path for Class 10.",
      action: "Open Plan",
    },
    {
      id: "smart-notes",
      number: "02",
      icon: "📝",
      title: "Smart Notes Path",
      label: "Revise Faster",
      desc: "Create a notes strategy for formulas, definitions, diagrams, and key points.",
      action: "Make Notes Plan",
    },
    {
      id: "practice-zone",
      number: "03",
      icon: "🧠",
      title: "Practice Zone",
      label: "Improve Accuracy",
      desc: "Create a question-practice path for weak topics and board-style questions.",
      action: "Start Practice",
    },
    {
      id: "revision-path",
      number: "04",
      icon: "⏱️",
      title: "Revision Path",
      label: "Revise Smartly",
      desc: "Generate a simple revision routine so no subject is ignored.",
      action: "Build Revision",
    },
    {
      id: "mock-test",
      number: "05",
      icon: "📄",
      title: "Mock Test Path",
      label: "Exam Ready",
      desc: "Prepare a mock-test system to improve speed, confidence, and marks.",
      action: "Create Test Plan",
    },
    {
      id: "confidence-coach",
      number: "06",
      icon: "🔥",
      title: "Confidence Coach",
      label: "Stay Motivated",
      desc: "Get a motivation and discipline path for Class 10 board preparation.",
      action: "Motivate Me",
    },
  ];

  const subjects = [
    { name: "Maths", icon: "➗", focus: "Formulas + daily practice" },
    { name: "Science", icon: "🔬", focus: "Concepts + diagrams" },
    { name: "SST", icon: "🌍", focus: "Maps + answer points" },
    { name: "English", icon: "📖", focus: "Writing + grammar" },
    { name: "Hindi", icon: "✍️", focus: "Literature + presentation" },
  ];

  const generatePlan = (module) => {
    const planMap = {
      "board-booster": {
        title: "Your Auto Board Booster Plan",
        subtitle:
          "A simple study path to move from pending syllabus to board-ready confidence.",
        motivation:
          "You do not need to study everything at once. You need to study the right thing at the right time.",
        tasks: [
          "Pick one weak subject first instead of jumping between all subjects.",
          "Complete one chapter, then immediately solve questions from that chapter.",
          "Keep a daily 20-minute revision slot for formulas, definitions, and dates.",
          "Every Sunday, check what is pending, weak, and completed.",
        ],
        weeklyPath: [
          "Day 1-2: Finish one weak chapter",
          "Day 3: Make short notes",
          "Day 4-5: Practice questions",
          "Day 6: Revise and fix mistakes",
          "Day 7: Take a mini test",
        ],
      },
      "smart-notes": {
        title: "Your Auto Smart Notes Plan",
        subtitle: "A notes system that helps you revise faster before exams.",
        motivation:
          "Good notes are not long. Good notes help you remember quickly under pressure.",
        tasks: [
          "Make one-page notes for every important chapter.",
          "Write formulas, definitions, diagrams, dates, and keywords separately.",
          "Use bullet points instead of long paragraphs.",
          "Before sleeping, revise only your short notes for 15 minutes.",
        ],
        weeklyPath: [
          "Maths: Formula sheet",
          "Science: Definitions + diagrams",
          "SST: Dates + maps + keywords",
          "English: Formats + summaries",
          "Hindi: Key points + grammar",
        ],
      },
      "practice-zone": {
        title: "Your Auto Practice Plan",
        subtitle:
          "A practical question-solving path to improve marks and confidence.",
        motivation: "Marks improve when you solve, check, correct, and repeat.",
        tasks: [
          "Solve 10 questions daily from one subject.",
          "Mark every wrong answer as a mistake type.",
          "Repeat weak questions after 48 hours.",
          "Do not just read solutions. Rewrite the correct answer once.",
        ],
        weeklyPath: [
          "2 days: Maths practice",
          "2 days: Science practice",
          "1 day: SST answer writing",
          "1 day: English/Hindi writing",
          "1 day: Mixed revision test",
        ],
      },
      "revision-path": {
        title: "Your Auto Revision Path",
        subtitle:
          "A simple revision routine so you do not forget what you already studied.",
        motivation:
          "Revision is not extra work. Revision is what converts study into marks.",
        tasks: [
          "Revise old chapters before starting new ones.",
          "Use 30-30-30 method: 30 minutes old topic, 30 minutes new topic, 30 minutes practice.",
          "Keep difficult formulas and definitions visible on your desk.",
          "Revise weak topics every third day.",
        ],
        weeklyPath: [
          "Monday: Maths + Science",
          "Tuesday: SST + English",
          "Wednesday: Weak chapters",
          "Thursday: Notes revision",
          "Friday: Question practice",
          "Saturday: Mini mock test",
          "Sunday: Mistake correction",
        ],
      },
      "mock-test": {
        title: "Your Auto Mock Test Plan",
        subtitle:
          "A test strategy to improve time management and exam confidence.",
        motivation:
          "Mock tests are not for judging you. They are for training your brain before the real exam.",
        tasks: [
          "Take one small test every week.",
          "Check time taken for each section.",
          "Write mistakes in a mistake notebook.",
          "Retake wrong questions after two days.",
        ],
        weeklyPath: [
          "Week 1: Chapter test",
          "Week 2: Subject test",
          "Week 3: Mixed test",
          "Week 4: Full mock test",
          "After every test: Analyse mistakes",
        ],
      },
      "confidence-coach": {
        title: "Your Auto Confidence Plan",
        subtitle:
          "A motivation system to stay calm, consistent, and focused.",
        motivation:
          "You are not behind. You only need a clear plan and daily consistency.",
        tasks: [
          "Study in small blocks instead of waiting for long perfect hours.",
          "Celebrate small wins after completing each chapter.",
          "Avoid comparing your preparation with friends.",
          "When stressed, solve one easy question first to restart momentum.",
        ],
        weeklyPath: [
          "Daily: 2 focused study blocks",
          "Daily: 10-minute confidence revision",
          "Weekly: One mock test",
          "Weekly: One mistake review",
          "Weekly: One rest/recovery slot",
        ],
      },
    };

    setGeneratedPlan(planMap[module.id]);
  };

  const openModule = (module) => {
    setActiveModule(module);
    setGeneratedPlan(null);
  };

  return (
    <section className="lp-page">
      <style>{learningPathCss}</style>

      <div className="lp-bg-glow"></div>

      <header className="lp-header">
        <div>
          <p className="lp-breadcrumb">
            <span>Dashboard</span> <b>›</b> Class 10 Career OS <b>›</b>{" "}
            Learning Path
          </p>

          <h1>Class 10 Learning Path</h1>

          <h3>
            Auto-created board preparation path for notes, revision, practice,
            mock tests, and confidence building.
          </h3>
        </div>

        <button
          type="button"
          className="lp-header-btn"
          onClick={() => setActivePage("assessment:academic-style")}
        >
          Check Study Style →
        </button>
      </header>

      <main className="lp-content">
        <section className="lp-hero-card">
          <div className="lp-hero-copy">
            <p>AI Board Preparation Mentor</p>

            <h2>Build your board exam path automatically</h2>

            <h4>
              No manual data needed right now. Start any module and GroerX will
              auto-create study direction, tasks, motivation, and a weekly plan.
            </h4>

            <div className="lp-stats">
              <div>
                <strong>6</strong>
                <span>Auto Modules</span>
              </div>

              <div>
                <strong>5</strong>
                <span>Subjects</span>
              </div>

              <div>
                <strong>1</strong>
                <span>Clear Study Path</span>
              </div>
            </div>
          </div>

          <div className="lp-hero-visual">
            <strong>10</strong>
            <span>Board Mode</span>
          </div>
        </section>

        <section className="lp-subject-row">
          {subjects.map((subject) => (
            <div key={subject.name} className="lp-subject-card">
              <div>{subject.icon}</div>

              <section>
                <h3>{subject.name}</h3>
                <p>{subject.focus}</p>
              </section>
            </div>
          ))}
        </section>

        <section className="lp-module-card">
          <div className="lp-section-head">
            <div>
              <p>Auto Learning Modules</p>
              <h2>Choose what you want to improve today</h2>
            </div>

            <span>AI Generated</span>
          </div>

          <div className="lp-module-grid">
            {learningModules.map((module) => (
              <article
                key={module.id}
                className="lp-step-card"
                onClick={() => openModule(module)}
              >
                <div className="lp-step-bg-number">{module.number}</div>

                <div className="lp-step-top">
                  <div className="lp-step-icon">{module.icon}</div>
                  <strong>{module.number}</strong>
                </div>

                <p>{module.label}</p>
                <h3>{module.title}</h3>
                <h4>{module.desc}</h4>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    openModule(module);
                  }}
                >
                  {module.action} <b>›</b>
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>

      {activeModule && (
        <div className="lp-modal-backdrop" onClick={() => setActiveModule(null)}>
          <div className="lp-modal" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="lp-modal-close"
              onClick={() => setActiveModule(null)}
            >
              ×
            </button>

            <div className="lp-modal-head">
              <div className="lp-modal-icon">{activeModule.icon}</div>

              <div>
                <p>{activeModule.label}</p>
                <h2>{activeModule.title}</h2>
                <h4>{activeModule.desc}</h4>
              </div>
            </div>

            {!generatedPlan && (
              <div className="lp-ai-empty">
                <p>Auto Creation Ready</p>
                <h3>
                  Click the button below and GroerX will create a useful study
                  plan for this module.
                </h3>

                <div className="lp-ai-preview-grid">
                  <div>
                    <strong>Study Tasks</strong>
                    <span>What to do next</span>
                  </div>

                  <div>
                    <strong>Weekly Flow</strong>
                    <span>How to study</span>
                  </div>

                  <div>
                    <strong>Motivation</strong>
                    <span>How to stay consistent</span>
                  </div>
                </div>
              </div>
            )}

            {generatedPlan && (
              <div className="lp-generated-box">
                <div className="lp-generated-head">
                  <p>AI-Created Plan</p>
                  <h3>{generatedPlan.title}</h3>
                  <h4>{generatedPlan.subtitle}</h4>
                </div>

                <div className="lp-motivation-card">
                  <p>Motivation</p>
                  <h3>{generatedPlan.motivation}</h3>
                </div>

                <div className="lp-plan-grid">
                  <div className="lp-plan-box">
                    <h3>Today’s Tasks</h3>

                    <ul>
                      {generatedPlan.tasks.map((task) => (
                        <li key={task}>{task}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="lp-plan-box">
                    <h3>Weekly Study Flow</h3>

                    <ul>
                      {generatedPlan.weeklyPath.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="lp-modal-actions">
              <button type="button" onClick={() => setActiveModule(null)}>
                Close
              </button>

              <button
                type="button"
                className="primary"
                onClick={() => generatePlan(activeModule)}
              >
                {generatedPlan ? "Regenerate Plan" : "Auto Create Plan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

const learningPathCss = `
.lp-page {
  position: relative;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 24px 32px 34px;
  background:
    radial-gradient(circle at 88% 5%, rgba(0, 163, 255, 0.18), transparent 30%),
    radial-gradient(circle at 18% 95%, rgba(59, 130, 246, 0.08), transparent 26%),
    #fbfbff;
  color: #111827;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.lp-bg-glow {
  position: absolute;
  right: -180px;
  top: -210px;
  width: 620px;
  height: 460px;
  background: radial-gradient(circle, rgba(0, 91, 255, 0.18), transparent 68%);
  border-radius: 999px;
  pointer-events: none;
}

.lp-header {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 22px;
  margin-bottom: 18px;
}

.lp-breadcrumb {
  margin: 0 0 9px;
  color: #64748b;
  font-size: 14px;
  font-weight: 750;
}

.lp-breadcrumb span {
  color: #005BFF;
}

.lp-breadcrumb b {
  color: #94a3b8;
  margin: 0 5px;
}

.lp-header h1 {
  margin: 0;
  color: #0f172a;
  font-size: 38px;
  line-height: 1.02;
  letter-spacing: -1.3px;
  font-weight: 950;
}

.lp-header h3 {
  margin: 9px 0 0;
  color: #64748b;
  font-size: 15px;
  font-weight: 600;
  max-width: 950px;
  line-height: 1.45;
}

.lp-header-btn {
  border: none;
  border-radius: 15px;
  padding: 13px 18px;
  background: linear-gradient(135deg, #005BFF, #00A3FF);
  color: white;
  font-size: 14px;
  font-weight: 950;
  cursor: pointer;
  box-shadow: 0 16px 34px rgba(0, 91, 255, 0.24);
  white-space: nowrap;
}

.lp-content {
  position: relative;
  z-index: 2;
  display: grid;
  gap: 16px;
}

.lp-hero-card,
.lp-subject-card,
.lp-module-card {
  border: 1px solid rgba(191, 215, 255, 0.75);
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(16px);
  border-radius: 26px;
  box-shadow: 0 20px 42px rgba(15, 23, 42, 0.07);
}

.lp-hero-card {
  position: relative;
  overflow: hidden;
  min-height: 170px;
  padding: 24px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 150px;
  gap: 22px;
  align-items: center;
}

.lp-hero-card::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 7px;
  height: 100%;
  background: linear-gradient(180deg, #005BFF, #00A3FF);
}

.lp-hero-copy {
  position: relative;
  z-index: 2;
  min-width: 0;
}

.lp-hero-card p {
  margin: 0 0 8px;
  color: #005BFF;
  font-size: 13px;
  font-weight: 950;
}

.lp-hero-card h2 {
  margin: 0;
  color: #0f172a;
  font-size: 28px;
  font-weight: 950;
  letter-spacing: -0.9px;
  line-height: 1.12;
}

.lp-hero-card h4 {
  margin: 10px 0 15px;
  color: #64748b;
  font-size: 14px;
  font-weight: 650;
  max-width: 900px;
  line-height: 1.48;
}

.lp-stats {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.lp-stats div {
  min-width: 132px;
  border: 1px solid #D6E6FF;
  background: #ffffff;
  border-radius: 999px;
  padding: 9px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.lp-stats strong {
  color: #005BFF;
  font-size: 22px;
  font-weight: 950;
  line-height: 1;
}

.lp-stats span {
  color: #64748b;
  font-size: 11px;
  font-weight: 850;
  line-height: 1.2;
}

.lp-hero-visual {
  position: relative;
  z-index: 2;
  width: 118px;
  height: 118px;
  border-radius: 999px;
  justify-self: end;
  background: conic-gradient(from 90deg, #005BFF, #00A3FF, #3b82f6, #005BFF);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0 18px 36px rgba(0, 91, 255, 0.16);
}

.lp-hero-visual strong {
  font-size: 39px;
  font-weight: 950;
  line-height: 1;
}

.lp-hero-visual span {
  font-size: 11px;
  font-weight: 950;
}

.lp-subject-row {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 14px;
}

.lp-subject-card {
  border-radius: 20px;
  padding: 14px 15px;
  display: grid;
  grid-template-columns: 42px 1fr;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.lp-subject-card > div {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: #EFF6FF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.lp-subject-card section {
  min-width: 0;
}

.lp-subject-card h3 {
  margin: 0 0 3px;
  color: #111827;
  font-size: 15px;
  font-weight: 950;
  white-space: nowrap;
}

.lp-subject-card p {
  margin: 0;
  color: #64748b;
  font-size: 11px;
  font-weight: 750;
  line-height: 1.35;
}

.lp-module-card {
  padding: 22px;
  overflow: visible;
}

.lp-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.lp-section-head p {
  margin: 0 0 4px;
  color: #005BFF;
  font-size: 12px;
  font-weight: 950;
}

.lp-section-head h2 {
  margin: 0;
  color: #111827;
  font-size: 25px;
  font-weight: 950;
  letter-spacing: -0.4px;
}

.lp-section-head > span {
  border: 1px solid #BFD7FF;
  background: #F6FAFF;
  color: #005BFF;
  border-radius: 999px;
  padding: 8px 13px;
  font-size: 12px;
  font-weight: 950;
  white-space: nowrap;
}

.lp-module-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.lp-step-card {
  position: relative;
  overflow: hidden;
  min-height: 205px;
  border: 1px solid #edf2f7;
  background: linear-gradient(135deg, rgba(255,255,255,0.98), rgba(251,247,255,0.94));
  border-radius: 22px;
  padding: 18px;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.lp-step-card:hover {
  transform: translateY(-4px);
  border-color: #60A5FA;
  box-shadow: 0 18px 30px rgba(0, 91, 255, 0.12);
}

.lp-step-bg-number {
  position: absolute;
  right: 10px;
  bottom: -16px;
  color: rgba(0, 91, 255, 0.055);
  font-size: 88px;
  font-weight: 950;
  line-height: 1;
}

.lp-step-top {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 13px;
}

.lp-step-icon {
  width: 43px;
  height: 43px;
  border-radius: 16px;
  background: linear-gradient(135deg, #005BFF, #00A3FF);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.lp-step-top strong {
  color: #BFD7FF;
  font-size: 25px;
  font-weight: 950;
}

.lp-step-card p,
.lp-step-card h3,
.lp-step-card h4,
.lp-step-card button {
  position: relative;
  z-index: 2;
}

.lp-step-card p {
  margin: 0 0 6px;
  color: #005BFF;
  font-size: 11px;
  font-weight: 950;
}

.lp-step-card h3 {
  margin: 0 0 8px;
  color: #111827;
  font-size: 18px;
  font-weight: 950;
  line-height: 1.2;
}

.lp-step-card h4 {
  margin: 0 0 16px;
  color: #64748b;
  font-size: 12.5px;
  font-weight: 650;
  line-height: 1.45;
}

.lp-step-card button {
  border: 1px solid #D6E6FF;
  background: #ffffff;
  color: #005BFF;
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 11px;
  font-weight: 950;
  cursor: pointer;
}

.lp-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(15, 23, 42, 0.48);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.lp-modal {
  position: relative;
  width: min(900px, 96vw);
  max-height: 88vh;
  overflow-y: auto;
  background: #ffffff;
  border: 1px solid #D6E6FF;
  border-radius: 28px;
  padding: 26px;
  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.25);
}

.lp-modal-close {
  position: absolute;
  right: 18px;
  top: 16px;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: 1px solid #D6E6FF;
  background: white;
  color: #005BFF;
  font-size: 24px;
  font-weight: 900;
  cursor: pointer;
}

.lp-modal-head {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
  padding-right: 42px;
}

.lp-modal-icon {
  width: 60px;
  height: 60px;
  border-radius: 18px;
  background: linear-gradient(135deg, #005BFF, #00A3FF);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}

.lp-modal-head p {
  margin: 0 0 5px;
  color: #005BFF;
  font-size: 13px;
  font-weight: 950;
}

.lp-modal-head h2 {
  margin: 0;
  color: #111827;
  font-size: 30px;
  font-weight: 950;
}

.lp-modal-head h4 {
  margin: 7px 0 0;
  color: #64748b;
  font-size: 14px;
  font-weight: 650;
}

.lp-ai-empty,
.lp-generated-box {
  border: 1px solid #edf2f7;
  background: linear-gradient(135deg, #ffffff, #F6FAFF);
  border-radius: 20px;
  padding: 18px;
}

.lp-ai-empty > p,
.lp-generated-head p,
.lp-motivation-card p {
  margin: 0 0 7px;
  color: #005BFF;
  font-size: 12px;
  font-weight: 950;
}

.lp-ai-empty h3,
.lp-generated-head h3,
.lp-motivation-card h3 {
  margin: 0;
  color: #111827;
  font-size: 20px;
  font-weight: 950;
  line-height: 1.35;
}

.lp-generated-head h4 {
  margin: 7px 0 0;
  color: #64748b;
  font-size: 13px;
  font-weight: 650;
}

.lp-ai-preview-grid,
.lp-plan-grid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 13px;
}

.lp-ai-preview-grid div,
.lp-plan-box,
.lp-motivation-card {
  border: 1px solid #D6E6FF;
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
}

.lp-ai-preview-grid strong {
  display: block;
  margin-bottom: 5px;
  color: #111827;
  font-size: 15px;
  font-weight: 950;
}

.lp-ai-preview-grid span {
  color: #64748b;
  font-size: 12px;
  font-weight: 700;
}

.lp-motivation-card {
  margin-top: 14px;
}

.lp-plan-grid {
  grid-template-columns: 1fr 1fr;
}

.lp-plan-box h3 {
  margin: 0 0 11px;
  color: #111827;
  font-size: 17px;
  font-weight: 950;
}

.lp-plan-box ul {
  margin: 0;
  padding-left: 18px;
  color: #475569;
  font-size: 13px;
  font-weight: 650;
  line-height: 1.65;
}

.lp-modal-actions {
  margin-top: 18px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.lp-modal-actions button {
  border: 1px solid #BFD7FF;
  background: #ffffff;
  color: #005BFF;
  border-radius: 14px;
  padding: 11px 16px;
  font-size: 13px;
  font-weight: 950;
  cursor: pointer;
}

.lp-modal-actions button.primary {
  border: none;
  background: linear-gradient(135deg, #005BFF, #00A3FF);
  color: white;
}

@media (max-width: 1180px) {
  .lp-subject-row {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .lp-module-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .lp-page {
    padding: 18px;
  }

  .lp-header,
  .lp-hero-card {
    grid-template-columns: 1fr;
    display: grid;
  }

  .lp-hero-visual {
    justify-self: start;
  }

  .lp-subject-row,
  .lp-module-grid,
  .lp-ai-preview-grid,
  .lp-plan-grid {
    grid-template-columns: 1fr;
  }
}
`;

