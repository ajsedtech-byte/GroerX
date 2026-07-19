import React, { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Phone,
  Lock,
  EyeOff,
  Eye,
  Check,
  BrainCircuit,
  Sparkles,
} from "lucide-react";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

body { 
  font-family: 'Outfit', sans-serif; 
  background-color: #fbfbfe; 
  color: #111827; 
  -webkit-font-smoothing: antialiased; 
  min-height: 100vh; 
}

button, input, select, textarea { font-family: inherit; }
a { text-decoration: none; color: inherit; }

.app-container {
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fbfbfe;
}

.bg-gradient-1 {
  position: absolute;
  top: -18%;
  right: -10%;
  width: 72vh;
  height: 72vh;
  background: radial-gradient(circle, rgba(0, 163, 255, 0.16) 0%, rgba(250, 250, 255, 0) 70%);
  border-radius: 50%;
  z-index: 0;
  pointer-events: none;
}

.bg-gradient-2 {
  position: absolute;
  bottom: -18%;
  left: -10%;
  width: 60vh;
  height: 60vh;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, rgba(250, 250, 255, 0) 70%);
  border-radius: 50%;
  z-index: 0;
  pointer-events: none;
}

.content-wrapper {
  position: relative;
  z-index: 1;
  width: 96vw;
  height: 94vh;
  max-width: 1600px;
  display: flex;
  flex-direction: column;
  gap: 2.1vh;
}

.toast {
  position: fixed;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid #e5e7eb;
  box-shadow: 0 16px 35px rgba(15, 23, 42, 0.12);
  border-radius: 14px;
  padding: 10px 14px;
  font-size: 12px;
  font-weight: 700;
  color: #374151;
}

.toast.success { color: #059669; }
.toast.error { color: #e11d48; }
.toast.info { color: #005BFF; }

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  font-size: 24px;
  color: #0f172a;
}

.logo-icon {
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, #0B63F6, #6b21a8);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 12px 24px rgba(0, 163, 255, 0.24);
}

.logo-icon svg {
  width: 22px;
  height: 22px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 17px;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  background: white;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);
}

.back-btn:hover {
  background: #f8fafc;
}

.title-section {
  flex-shrink: 0;
}

.title-section h1 {
  font-size: clamp(34px, 3.4vw, 56px);
  font-weight: 800;
  margin-bottom: 8px;
  color: #0f172a;
  letter-spacing: -1.6px;
  line-height: 1.02;
}

.text-gradient {
  background: linear-gradient(to right, #0B63F6, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title-section p {
  color: #64748b;
  font-size: clamp(13px, 0.95vw, 17px);
  max-width: 680px;
  line-height: 1.45;
  font-weight: 500;
}

.main-grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 24px;
  flex: 1;
  min-height: 0;
}

.form-panel,
.info-panel {
  background: white;
  border-radius: 22px;
  padding: 24px 28px;
  box-shadow: 0 18px 45px -25px rgba(15, 23, 42, 0.25);
  border: 1px solid #e8edf5;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.form-panel {
  overflow: hidden;
}

.info-panel {
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
}

.form-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 15px;
  flex-shrink: 0;
}

.form-icon-bg {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: #EFF6FF;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #005BFF;
}

.form-header-text h2 {
  font-size: 22px;
  font-weight: 800;
  color: #111827;
}

.form-header-text p {
  color: #94a3b8;
  font-size: 13px;
  margin-top: 1px;
  font-weight: 500;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 13px 20px;
  flex-shrink: 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.form-group.full-width {
  grid-column: span 2;
}

.form-group label {
  font-size: 13px;
  font-weight: 800;
  color: #111827;
}

.input-wrapper,
.mobile-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  height: 42px;
}

.input-icon {
  position: absolute;
  left: 13px;
  color: #94a3b8;
  display: flex;
  z-index: 2;
  pointer-events: none;
}

.input-icon svg {
  width: 17px;
  height: 17px;
}

.input-field {
  width: 100%;
  height: 100%;
  padding: 0 13px 0 42px;
  border: 1px solid #dbe4ef;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
  outline: none;
  background: #ffffff;
  color: #0f172a;
}

.input-field::placeholder {
  color: #94a3b8;
  font-weight: 500;
}

.input-field:focus {
  border-color: #0B63F6;
  box-shadow: 0 0 0 3px rgba(0, 163, 255, 0.1);
}

.country-code {
  height: 100%;
  width: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 1px solid #dbe4ef;
  border-right: none;
  border-radius: 10px 0 0 10px;
  background: white;
  color: #334155;
  font-size: 14px;
  font-weight: 800;
  flex-shrink: 0;
}

.mobile-input {
  border-radius: 0 10px 10px 0;
  flex: 1;
  padding-left: 16px;
}

.password-toggle {
  position: absolute;
  right: 12px;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  background: none;
  border: none;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s;
}

.password-toggle:hover {
  color: #475569;
}

.password-toggle svg {
  width: 17px;
  height: 17px;
}

.profile-section {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.profile-section h3 {
  font-size: 13px;
  font-weight: 800;
  color: #111827;
  margin-bottom: 8px;
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

.profile-card {
  border: 1px solid #dbe4ef;
  border-radius: 13px;
  height: 86px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  background: white;
}

.profile-card:hover {
  border-color: #BFD7FF;
  background: #F6FAFF;
}

.profile-card.active {
  border-color: #005BFF;
  background: #F6FAFF;
  box-shadow: 0 6px 16px rgba(0, 91, 255, 0.08);
}

.check-indicator {
  position: absolute;
  top: 7px;
  right: 7px;
  width: 20px;
  height: 20px;
  background: #005BFF;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.emoji-icon {
  font-size: 24px;
}

.large-emoji-icon {
  font-size: 48px;
}

.profile-card p {
  font-size: 12px;
  font-weight: 800;
  color: #111827;
  text-align: center;
  line-height: 1.05;
}

.profile-card span {
  font-size: 9px;
  color: #64748b;
  text-align: center;
  font-weight: 500;
}

.terms-wrapper {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: 13px;
  flex-shrink: 0;
  cursor: pointer;
}

.custom-checkbox {
  width: 20px;
  height: 20px;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.custom-checkbox.checked {
  background: #005BFF;
  border-color: #005BFF;
  color: white;
}

.terms-text {
  font-size: 13px;
  color: #475569;
  font-weight: 600;
}

.terms-text a {
  color: #005BFF;
  font-weight: 800;
}

.submit-btn {
  width: 100%;
  height: 44px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(to right, #005BFF, #c800ff);
  color: white;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 9px;
  transition: all 0.25s;
  flex-shrink: 0;
  margin-top: 12px;
  box-shadow: 0 12px 22px rgba(0, 163, 255, 0.24);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  filter: brightness(0.98);
}

.submit-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  margin-top: 10px;
  font-size: 12px;
  color: #64748b;
  flex-shrink: 0;
  font-weight: 600;
}

.login-link a {
  color: #005BFF;
  font-weight: 800;
}

.info-header {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 12px;
  flex-shrink: 0;
}

.info-header h3 {
  font-size: 14px;
  font-weight: 800;
  color: #111827;
}

.info-header-icon {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #EFF6FF;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #005BFF;
}

.info-header-icon svg {
  width: 14px;
  height: 14px;
}

.selected-profile-banner {
  background: linear-gradient(to right, #F6FAFF, #EFF6FF);
  border: 1px solid #D6E6FF;
  border-radius: 15px;
  padding: 18px 22px;
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 18px;
  flex-shrink: 0;
}

.selected-profile-banner h4 {
  font-size: 23px;
  font-weight: 800;
  color: #111827;
}

.selected-profile-banner p {
  font-size: 14px;
  color: #475569;
  font-weight: 500;
}

.modules-title {
  font-size: 14px;
  font-weight: 800;
  color: #111827;
  margin-bottom: 10px;
  flex-shrink: 0;
}

.modules-title span {
  color: #005BFF;
}

.modules-list {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
  flex-grow: 1;
  min-height: 0;
}

.module-item {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 9px 0;
  border-bottom: 1px solid #edf2f7;
}

.module-item:last-child {
  border-bottom: none;
}

.module-icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.emoji-wrapper {
  font-size: 20px;
}

.module-text h5 {
  font-size: 14px;
  font-weight: 800;
  color: #111827;
  margin-bottom: 2px;
}

.module-text p {
  font-size: 11px;
  color: #64748b;
  font-weight: 500;
}

.icon-green { background: #dcfce7; color: #16a34a; }
.icon-pink { background: #fce7f3; color: #db2777; }
.icon-orange { background: #ffedd5; color: #ea580c; }
.icon-purple { background: #EFF6FF; color: #005BFF; }
.icon-blue { background: #dbeafe; color: #2563eb; }

.info-art {
  position: absolute;
  right: 32px;
  bottom: 20px;
  display: flex;
  align-items: flex-end;
  gap: 14px;
  pointer-events: none;
}

.speech-bubble {
  position: absolute;
  right: 100px;
  bottom: 108px;
  border: 2px solid #005BFF;
  color: #005BFF;
  background: #fff;
  border-radius: 14px;
  padding: 10px 16px;
  font-size: 12px;
  line-height: 1.2;
  font-weight: 800;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 91, 255, 0.12);
}

.art-emoji.rocket { font-size: 46px; }
.art-emoji.elephant { font-size: 82px; }
.art-emoji.books { font-size: 46px; }

.footer-strip {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  align-items: center;
  gap: 38px;
  min-height: 72px;
  background: white;
  border: 1px solid #e8edf5;
  border-radius: 18px;
  box-shadow: 0 18px 45px -28px rgba(15, 23, 42, 0.28);
  padding: 0 64px;
  flex-shrink: 0;
}

.footer-divider {
  width: 1px;
  height: 36px;
  background: #e5e7eb;
}

.footer-item {
  display: flex;
  align-items: center;
  gap: 14px;
}

.footer-icon {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.footer-icon.green { background: #dcfce7; color: #16a34a; }
.footer-icon.purple { background: #EFF6FF; color: #005BFF; }
.footer-icon.pink { background: #fce7f3; color: #db2777; }

.footer-item h4 {
  font-size: 14px;
  font-weight: 800;
  color: #111827;
  margin-bottom: 2px;
}

.footer-item p {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}

@media (max-height: 760px) {
  .content-wrapper { gap: 1.5vh; height: 96vh; }
  .form-panel, .info-panel { padding: 18px 22px; }
  .title-section h1 { font-size: 34px; }
  .title-section p { font-size: 12px; }
  .input-wrapper, .mobile-input-wrapper { height: 36px; }
  .form-grid { gap: 10px 16px; }
  .profile-card { height: 74px; }
  .selected-profile-banner { padding: 12px 16px; margin-bottom: 12px; }
  .module-item { padding: 6px 0; }
  .module-icon-wrapper { width: 34px; height: 34px; }
  .speech-bubble, .info-art { display: none; }
  .footer-strip { min-height: 58px; padding: 0 44px; }
}
`;

const profiles = [
  {
    id: "class10",
    title: "Class 10",
    subtitle: "School Student",
    emoji: "🎓",
  },
  {
    id: "class12",
    title: "Class 12",
    subtitle: "School Student",
    emoji: "🎓",
  },
  {
    id: "ug",
    title: "UG",
    subtitle: "Undergraduate",
    emoji: "📖",
  },
  {
    id: "pg",
    title: "PG",
    subtitle: "Postgraduate",
    emoji: "🎓",
  },
  {
    id: "working",
    title: "Working Professional",
    subtitle: "Professional",
    emoji: "💼",
  },
];

const modules = [
  {
    emoji: "🎛️",
    title: "Dashboard",
    desc: "Your personalized hub for progress and next steps.",
    colorClass: "icon-green",
  },
  {
    emoji: "🧠",
    title: "Career Assessment",
    desc: "Discover your strengths, interests, and best-fit careers.",
    colorClass: "icon-pink",
  },
  {
    emoji: "🧭",
    title: "Stream Explorer",
    desc: "Explore streams, subjects, and future opportunities.",
    colorClass: "icon-orange",
  },
  {
    emoji: "💼",
    title: "Career Explorer",
    desc: "Detailed career insights, skills, and job outlook.",
    colorClass: "icon-purple",
  },
  {
    emoji: "🗓️",
    title: "Study Planner",
    desc: "Smart planner to track goals, topics, and preparation.",
    colorClass: "icon-blue",
  },
  {
    emoji: "📄",
    title: "Final Report",
    desc: "Download your complete career report and roadmap.",
    colorClass: "icon-purple",
  },
];

export default function ProfileSelection({ onSelectProfile }) {
  const [selectedProfile, setSelectedProfile] = useState("class10");
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const selectedProfileData =
    profiles.find((profile) => profile.id === selectedProfile) || profiles[0];

  const showToast = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 2400);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.fullName.trim()) {
      showToast("Please enter your full name.", "error");
      return;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      showToast("Please enter a valid email address.", "error");
      return;
    }

    if (!formData.mobile.trim() || formData.mobile.length < 8) {
      showToast("Please enter a valid mobile number.", "error");
      return;
    }

    if (formData.password.length < 6) {
      showToast("Password must be at least 6 characters.", "error");
      return;
    }

    if (!termsAccepted) {
      showToast("Please accept the terms and privacy policy.", "error");
      return;
    }

    const defaultModules = {
      class10: "dashboard",
      class12: "class12-dashboard",
      ug: "ug-dashboard",
      pg: "pg-dashboard",
      working: "working-dashboard",
    };

    localStorage.setItem("studentName", formData.fullName.trim());
    localStorage.setItem("studentEmail", formData.email.trim());
    localStorage.setItem("studentMobile", formData.mobile.trim());
    localStorage.setItem("selectedProfile", selectedProfile);
    localStorage.setItem(
      "currentModule",
      defaultModules[selectedProfile] || "dashboard"
    );

    showToast("Account created successfully.", "success");

    setTimeout(() => {
      if (onSelectProfile) {
        onSelectProfile(selectedProfile);
      } else {
        window.location.reload();
      }
    }, 400);
  };

  return (
    <>
      <style>{styles}</style>

      <div className="app-container">
        {notification && (
          <div className={`toast ${notification.type}`}>
            <Sparkles size={15} />
            {notification.message}
          </div>
        )}

        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>

        <div className="content-wrapper">
          <header>
            <div className="logo-container">
              <div className="logo-icon">
                <BrainCircuit size={24} color="white" />
              </div>
              GroerX
            </div>

            <button
              type="button"
              className="back-btn"
              onClick={() => showToast("Back to Home clicked.", "info")}
            >
              <ArrowLeft size={16} /> Back to Home
            </button>
          </header>

          <div className="title-section">
            <h1>
              Create your <span className="text-gradient">Career OS</span>{" "}
              account
            </h1>
            <p>
              Join GroerX and get a personalized dashboard, assessments, study
              planner, and career roadmap tailored just for you.
            </p>
          </div>

          <div className="main-grid">
            <div className="form-panel">
              <div className="form-header">
                <div className="form-icon-bg">
                  <User size={24} />
                </div>
                <div className="form-header-text">
                  <h2>Sign Up</h2>
                  <p>Fill in your details to get started with GroerX.</p>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      className="input-field"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      className="input-field"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>Mobile Number</label>
                  <div className="mobile-input-wrapper">
                    <div className="country-code">
                      <Phone size={16} /> +91
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      name="mobile"
                      className="input-field mobile-input"
                      placeholder="Enter your mobile number"
                      value={formData.mobile}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>Password</label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="input-field"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3>Select Profile</h3>
                <div className="profile-grid">
                  {profiles.map((profile) => (
                    <button
                      type="button"
                      key={profile.id}
                      className={`profile-card ${
                        selectedProfile === profile.id ? "active" : ""
                      }`}
                      onClick={() => setSelectedProfile(profile.id)}
                    >
                      {selectedProfile === profile.id && (
                        <div className="check-indicator">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}

                      <div className="profile-icon emoji-icon">
                        {profile.emoji}
                      </div>

                      <p>{profile.title}</p>
                      <span>{profile.subtitle}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="terms-wrapper"
                onClick={() => setTermsAccepted(!termsAccepted)}
              >
                <div
                  className={`custom-checkbox ${
                    termsAccepted ? "checked" : ""
                  }`}
                >
                  {termsAccepted && <Check size={14} strokeWidth={3} />}
                </div>

                <div className="terms-text">
                  I agree to the <a href="#">Terms & Conditions</a> and{" "}
                  <a href="#">Privacy Policy</a>
                </div>
              </button>

              <button
                type="button"
                className="submit-btn"
                onClick={handleSubmit}
              >
                Create Account <ArrowRight size={18} />
              </button>

              <div className="login-link">
                Already have an account? <a href="#">Sign In</a>
              </div>
            </div>

            <div className="info-panel">
              <div className="info-header">
                <div className="info-header-icon">
                  <User size={16} />
                </div>
                <h3>Selected Profile</h3>
              </div>

              <div className="selected-profile-banner">
                <div className="profile-icon large-emoji-icon">
                  {selectedProfileData.emoji}
                </div>
                <div>
                  <h4>{selectedProfileData.title}</h4>
                  <p>{selectedProfileData.subtitle}</p>
                </div>
              </div>

              <div className="modules-title">
                After sign up, you'll get access to{" "}
                <span>these modules:</span>
              </div>

              <div className="modules-list">
                {modules.map((mod, index) => (
                  <div key={index} className="module-item">
                    <div
                      className={`module-icon-wrapper emoji-wrapper ${mod.colorClass}`}
                    >
                      {mod.emoji}
                    </div>

                    <div className="module-text">
                      <h5>{mod.title}</h5>
                      <p>{mod.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="speech-bubble">
                Let's build your
                <br />
                future, together!
              </div>

              <div className="info-art">
                <div className="art-emoji rocket">🚀</div>
                <div className="art-emoji elephant">🐘</div>
                <div className="art-emoji books">📚</div>
              </div>
            </div>
          </div>

          <div className="footer-strip">
            <div className="footer-item">
              <div className="footer-icon green">🛡️</div>
              <div>
                <h4>Secure & Private</h4>
                <p>Your data is safe with us.</p>
              </div>
            </div>

            <div className="footer-divider"></div>

            <div className="footer-item">
              <div className="footer-icon purple">👥</div>
              <div>
                <h4>Personalized for You</h4>
                <p>AI-powered recommendations just for your profile.</p>
              </div>
            </div>

            <div className="footer-divider"></div>

            <div className="footer-item">
              <div className="footer-icon pink">📈</div>
              <div>
                <h4>Built for Your Growth</h4>
                <p>Structured guidance at every step of your journey.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

