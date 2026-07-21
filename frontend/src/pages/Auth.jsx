import React, { useState } from "react";

export default function Auth({ setActivePage, onAuthSuccess }) {
  const [mode, setMode] = useState("login");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    profile: "class10",
  });

  const [error, setError] = useState("");

  function updateField(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!form.password.trim()) {
      setError("Password is required.");
      return;
    }

    if (mode === "signup") {
      if (!form.fullName.trim()) {
        setError("Full name is required.");
        return;
      }

      if (!form.mobile.trim()) {
        setError("Mobile number is required.");
        return;
      }

      if (form.password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }

      if (form.password !== form.confirmPassword) {
        setError("Password and confirm password do not match.");
        return;
      }
    }

    const user = {
      fullName: mode === "signup" ? form.fullName : "GroerX Student",
      email: form.email,
      mobile: form.mobile,
      profile: form.profile,
      isLoggedIn: true,
      loginTime: new Date().toISOString(),
    };

    localStorage.setItem("groerx_user", JSON.stringify(user));
    localStorage.setItem("groerx_selected_profile", form.profile);

    if (typeof onAuthSuccess === "function") {
      onAuthSuccess(user);
      return;
    }

    if (form.profile === "class10") {
      setActivePage?.("dashboard");
      return;
    }

    setActivePage?.("profile-selection");
  }

  return (
    <section className="auth-page">
      <style>{authCss}</style>

      <div className="auth-bg-one"></div>
      <div className="auth-bg-two"></div>

      <div className="auth-shell">
        <div className="auth-brand-panel">
          <div className="auth-logo-card">
            <div className="auth-elephant">🐘</div>
            <div>
              <h1>GroerX</h1>
              <p>Guiding Futures. Building Success.</p>
            </div>
          </div>

          <div className="auth-brand-content">
            <p className="auth-eyebrow">Career Guidance Engine</p>

            <h2>Stop guessing your future. Start building it.</h2>

            <p>
              Login or create your student profile to begin assessments, unlock
              stream recommendations, explore careers, and generate your final
              career report.
            </p>
          </div>

          <div className="auth-feature-list">
            <div>
              <span>✅</span>
              <p>Class 10 Career OS</p>
            </div>

            <div>
              <span>🧠</span>
              <p>7 Assessment Tests</p>
            </div>

            <div>
              <span>🎓</span>
              <p>Stream Recommendation</p>
            </div>

            <div>
              <span>📄</span>
              <p>Final Career Report</p>
            </div>
          </div>
        </div>

        <div className="auth-form-panel">
          <div className="auth-tabs">
            <button
              type="button"
              className={mode === "login" ? "active" : ""}
              onClick={() => {
                setMode("login");
                setError("");
              }}
            >
              Login
            </button>

            <button
              type="button"
              className={mode === "signup" ? "active" : ""}
              onClick={() => {
                setMode("signup");
                setError("");
              }}
            >
              Sign Up
            </button>
          </div>

          <div className="auth-form-header">
            <p>{mode === "login" ? "Welcome Back" : "Create Student Account"}</p>

            <h2>
              {mode === "login"
                ? "Login to GroerX"
                : "Start your GroerX journey"}
            </h2>

            <h3>
              {mode === "login"
                ? "Continue your career assessment journey."
                : "Create your profile and begin Class 10 Career OS."}
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {mode === "signup" && (
              <>
                <div className="auth-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter student name"
                    value={form.fullName}
                    onChange={(event) =>
                      updateField("fullName", event.target.value)
                    }
                  />
                </div>

                <div className="auth-field">
                  <label>Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="Enter mobile number"
                    value={form.mobile}
                    onChange={(event) =>
                      updateField("mobile", event.target.value)
                    }
                  />
                </div>
              </>
            )}

            <div className="auth-field">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter email address"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
              />
            </div>

            <div className="auth-field">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={(event) =>
                  updateField("password", event.target.value)
                }
              />
            </div>

            {mode === "signup" && (
              <>
                <div className="auth-field">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={form.confirmPassword}
                    onChange={(event) =>
                      updateField("confirmPassword", event.target.value)
                    }
                  />
                </div>

                <div className="auth-field">
                  <label>Select Profile</label>
                  <select
                    value={form.profile}
                    onChange={(event) =>
                      updateField("profile", event.target.value)
                    }
                  >
                    <option value="class10">Class 10 Career OS</option>
                    <option value="class12">Class 12</option>
                    <option value="ug">Undergraduate</option>
                    <option value="pg">Postgraduate</option>
                    <option value="working-professional">
                      Working Professional
                    </option>
                  </select>
                </div>
              </>
            )}

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className="auth-submit">
              {mode === "login" ? "Login →" : "Create Account →"}
            </button>
          </form>

          <p className="auth-switch-text">
            {mode === "login"
              ? "New to GroerX?"
              : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setError("");
              }}
            >
              {mode === "login" ? "Create account" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}

const authCss = `
.auth-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: #f8fbff;
  color: #111827;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 34px;
}

.auth-bg-one {
  position: absolute;
  top: -180px;
  right: -160px;
  width: 560px;
  height: 420px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(0, 91, 255, 0.18), transparent 65%);
}

.auth-bg-two {
  position: absolute;
  bottom: -220px;
  left: -180px;
  width: 560px;
  height: 420px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(0, 163, 255, 0.14), transparent 65%);
}

.auth-shell {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1180px;
  min-height: 660px;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  background: #ffffff;
  border: 1px solid #d6e6ff;
  border-radius: 34px;
  overflow: hidden;
  box-shadow: 0 30px 90px rgba(0, 43, 120, 0.13);
}

.auth-brand-panel {
  position: relative;
  padding: 42px;
  color: #ffffff;
  background:
    radial-gradient(circle at 80% 20%, rgba(255,255,255,0.20), transparent 32%),
    linear-gradient(135deg, #005BFF, #00A3FF);
  display: flex;
  flex-direction: column;
}

.auth-logo-card {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  width: fit-content;
  background: rgba(255,255,255,0.14);
  border: 1px solid rgba(255,255,255,0.24);
  border-radius: 22px;
  padding: 14px 18px;
  backdrop-filter: blur(14px);
}

.auth-elephant {
  width: 52px;
  height: 52px;
  border-radius: 18px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.auth-logo-card h1 {
  margin: 0;
  font-size: 30px;
  line-height: 1;
  font-weight: 950;
}

.auth-logo-card p {
  margin: 5px 0 0;
  font-size: 11px;
  font-weight: 800;
  opacity: 0.9;
}

.auth-brand-content {
  margin-top: auto;
  margin-bottom: auto;
  max-width: 520px;
}

.auth-eyebrow {
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 950;
  opacity: 0.92;
}

.auth-brand-content h2 {
  margin: 0;
  font-size: 50px;
  line-height: 1.02;
  letter-spacing: -1.8px;
  font-weight: 950;
}

.auth-brand-content p:last-child {
  margin: 18px 0 0;
  font-size: 16px;
  line-height: 1.65;
  font-weight: 650;
  opacity: 0.92;
}

.auth-feature-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.auth-feature-list div {
  background: rgba(255,255,255,0.13);
  border: 1px solid rgba(255,255,255,0.24);
  border-radius: 18px;
  padding: 14px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.auth-feature-list span {
  font-size: 20px;
}

.auth-feature-list p {
  margin: 0;
  font-size: 13px;
  font-weight: 900;
}

.auth-form-panel {
  padding: 42px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.auth-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #eff6ff;
  border: 1px solid #d6e6ff;
  border-radius: 18px;
  padding: 5px;
  margin-bottom: 28px;
}

.auth-tabs button {
  height: 46px;
  border: none;
  border-radius: 14px;
  background: transparent;
  color: #64748b;
  font-size: 14px;
  font-weight: 950;
  cursor: pointer;
}

.auth-tabs button.active {
  background: #ffffff;
  color: #005BFF;
  box-shadow: 0 8px 18px rgba(0, 91, 255, 0.12);
}

.auth-form-header p {
  margin: 0 0 8px;
  color: #005BFF;
  font-size: 14px;
  font-weight: 950;
}

.auth-form-header h2 {
  margin: 0;
  color: #071B5F;
  font-size: 34px;
  line-height: 1.08;
  letter-spacing: -1px;
  font-weight: 950;
}

.auth-form-header h3 {
  margin: 10px 0 0;
  color: #64748b;
  font-size: 14px;
  line-height: 1.55;
  font-weight: 650;
}

.auth-form {
  margin-top: 24px;
  display: grid;
  gap: 14px;
}

.auth-field {
  display: grid;
  gap: 7px;
}

.auth-field label {
  color: #0f172a;
  font-size: 13px;
  font-weight: 900;
}

.auth-field input,
.auth-field select {
  width: 100%;
  height: 48px;
  border: 1px solid #bfd7ff;
  background: #f8fbff;
  border-radius: 15px;
  padding: 0 15px;
  color: #111827;
  font-size: 14px;
  font-weight: 650;
  outline: none;
}

.auth-field input:focus,
.auth-field select:focus {
  border-color: #005BFF;
  box-shadow: 0 0 0 4px rgba(0, 91, 255, 0.10);
}

.auth-error {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  border-radius: 14px;
  padding: 12px 14px;
  font-size: 13px;
  font-weight: 800;
}

.auth-submit {
  height: 50px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(135deg, #005BFF, #00A3FF);
  color: #ffffff;
  font-size: 15px;
  font-weight: 950;
  cursor: pointer;
  box-shadow: 0 16px 34px rgba(0, 91, 255, 0.24);
}

.auth-switch-text {
  margin: 20px 0 0;
  text-align: center;
  color: #64748b;
  font-size: 14px;
  font-weight: 700;
}

.auth-switch-text button {
  border: none;
  background: transparent;
  color: #005BFF;
  font-weight: 950;
  cursor: pointer;
}

@media (max-width: 980px) {
  .auth-shell {
    grid-template-columns: 1fr;
  }

  .auth-brand-panel {
    min-height: 460px;
  }
}

@media (max-width: 640px) {
  .auth-page {
    padding: 14px;
  }

  .auth-shell {
    border-radius: 24px;
  }

  .auth-brand-panel,
  .auth-form-panel {
    padding: 26px 20px;
  }

  .auth-brand-content h2 {
    font-size: 36px;
  }

  .auth-feature-list {
    grid-template-columns: 1fr;
  }

  .auth-form-header h2 {
    font-size: 28px;
  }
}
`;