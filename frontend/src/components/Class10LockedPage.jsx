import React from "react";
import {
  CLASS10_TESTS,
  getCompletedClass10TestCount,
} from "../utils/class10Progress";

export default function Class10LockedPage({
  title = "Module Locked",
  message = "Complete all Class 10 assessments to unlock this module.",
  setActivePage,
}) {
  const completed = getCompletedClass10TestCount();
  const total = CLASS10_TESTS.length;

  return (
    <section style={styles.page}>
      <div style={styles.card}>
        <div style={styles.icon}>🔒</div>

        <p style={styles.eyebrow}>Locked Module</p>

        <h1 style={styles.title}>{title}</h1>

        <p style={styles.message}>{message}</p>

        <div style={styles.progressBox}>
          <div style={styles.progressTop}>
            <span>Assessment Progress</span>
            <strong>
              {completed}/{total}
            </strong>
          </div>

          <div style={styles.progressTrack}>
            <div
              style={{
                ...styles.progressFill,
                width: `${Math.round((completed / total) * 100)}%`,
              }}
            />
          </div>
        </div>

        <div style={styles.actions}>
          <button
            type="button"
            style={styles.primaryBtn}
            onClick={() => setActivePage?.("career-assessment")}
          >
            Go to Career Assessment
          </button>

          <button
            type="button"
            style={styles.secondaryBtn}
            onClick={() => setActivePage?.("dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </section>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    background:
      "radial-gradient(circle at 90% 5%, rgba(0, 91, 255, 0.12), transparent 35%), #fbfdff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  card: {
    width: "100%",
    maxWidth: "620px",
    background: "#ffffff",
    border: "1px solid #d6e6ff",
    borderRadius: "28px",
    padding: "42px",
    textAlign: "center",
    boxShadow: "0 24px 60px rgba(0, 43, 120, 0.10)",
  },
  icon: {
    width: "86px",
    height: "86px",
    borderRadius: "26px",
    margin: "0 auto 22px",
    background: "linear-gradient(135deg, #005BFF, #00A3FF)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "38px",
    boxShadow: "0 16px 35px rgba(0, 91, 255, 0.25)",
  },
  eyebrow: {
    margin: "0 0 10px",
    color: "#005BFF",
    fontSize: "14px",
    fontWeight: "900",
  },
  title: {
    margin: "0",
    color: "#071B5F",
    fontSize: "34px",
    fontWeight: "950",
    letterSpacing: "-1px",
  },
  message: {
    margin: "14px auto 0",
    color: "#64748b",
    fontSize: "16px",
    lineHeight: "1.6",
    fontWeight: "600",
    maxWidth: "480px",
  },
  progressBox: {
    marginTop: "26px",
    padding: "18px",
    borderRadius: "18px",
    background: "#f6faff",
    border: "1px solid #d6e6ff",
  },
  progressTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    color: "#071B5F",
    fontWeight: "900",
  },
  progressTrack: {
    height: "10px",
    borderRadius: "999px",
    background: "#e6f0ff",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: "999px",
    background: "linear-gradient(90deg, #005BFF, #00A3FF)",
  },
  actions: {
    marginTop: "28px",
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    border: "none",
    background: "linear-gradient(135deg, #005BFF, #00A3FF)",
    color: "#ffffff",
    borderRadius: "14px",
    padding: "13px 22px",
    fontSize: "14px",
    fontWeight: "900",
    cursor: "pointer",
  },
  secondaryBtn: {
    border: "1px solid #bfd7ff",
    background: "#ffffff",
    color: "#005BFF",
    borderRadius: "14px",
    padding: "13px 22px",
    fontSize: "14px",
    fontWeight: "900",
    cursor: "pointer",
  },
};