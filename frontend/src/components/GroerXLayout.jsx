import React from "react";
import groerxFullLogo from "../assets/groerx-full-logo.png";

export default function GroerXLayout({
  children,
  currentModule,
  setActivePage,
  profile,
  onSwitchProfile,
}) {
  const menuItems = profile?.menu || [];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("student");
    localStorage.removeItem("class10StudentId");
    localStorage.removeItem("currentProfile");
    localStorage.removeItem("selectedProfile");

    sessionStorage.clear();

    window.location.replace("/");
  };

  return (
    <div className="gx-shell">
      <style>{layoutCss}</style>

      <aside className="gx-sidebar">
        <div className="gx-brand">
          <img
            src={groerxFullLogo}
            alt="GroerX"
            className="gx-full-logo-img"
          />
        </div>

        <nav className="gx-nav">
          {menuItems.map((item) => {
            const active =
              currentModule === item.key ||
              (item.key.startsWith("assessment:") &&
                currentModule?.startsWith("assessment:"));

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActivePage(item.key)}
                className={`gx-nav-btn ${active ? "active" : ""}`}
              >
                <span className="gx-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="gx-sidebar-space" />

        <div className="gx-profile-card">
          <p>Current Profile</p>
          <h3>{profile?.title || "Class 10 Career OS"}</h3>

          <button
            type="button"
            onClick={handleLogout}
            className="gx-logout-btn"
          >
            🚪 Logout
          </button>
        </div>

        <div className="gx-help-card">
          <h3>Need Help?</h3>
          <p>Ask Groer AI Mentor</p>

          <button type="button">💬 Chat Now →</button>
        </div>
      </aside>

      <main className="gx-main">{children}</main>
    </div>
  );
}

const layoutCss = `
.gx-shell {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 230px 1fr;
  background: #fbfbff;
  color: #0f172a;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.gx-sidebar {
  height: 100vh;
  background: linear-gradient(180deg, #ffffff 0%, #faf7ff 100%);
  border-right: 1px solid #e7e2f4;
  padding: 18px 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.gx-brand {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 26px;
  width: 100%;
}

.gx-full-logo-img {
  width: 200px;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}

.gx-nav {
  display: grid;
  gap: 10px;
}

.gx-nav-btn {
  border: none;
  background: transparent;
  color: #111827;
  padding: 13px 13px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 11px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 900;
  text-align: left;
}

.gx-nav-btn:hover {
  background: #f7f0ff;
}

.gx-nav-btn.active {
  background: linear-gradient(135deg, #EFF6FF, #F6FAFF);
  color: #005BFF;
  border: 1px solid #BFD7FF;
  box-shadow: 0 12px 24px rgba(0, 91, 255, 0.12);
}

.gx-nav-icon {
  width: 22px;
  display: inline-flex;
  justify-content: center;
}

.gx-sidebar-space {
  flex: 1;
  min-height: 16px;
}

.gx-profile-card {
  border: 1px solid #BFD7FF;
  background: linear-gradient(135deg, #ffffff, #F6FAFF);
  border-radius: 18px;
  padding: 16px;
  box-shadow: 0 12px 28px rgba(0, 91, 255, 0.08);
}

.gx-profile-card p {
  margin: 0 0 7px;
  color: #005BFF;
  font-weight: 900;
  font-size: 12px;
}

.gx-profile-card h3 {
  margin: 0 0 14px;
  font-size: 14px;
  color: #111827;
  font-weight: 750;
}

.gx-logout-btn {
  width: 100%;
  border-radius: 13px;
  padding: 11px 12px;
  font-size: 13px;
  font-weight: 950;
  cursor: pointer;
  background: #ffffff;
  color: #dc2626;
  border: 1px solid #fca5a5;
  transition: all 0.2s ease;
}

.gx-logout-btn:hover {
  background: #fef2f2;
  border-color: #ef4444;
  color: #b91c1c;
}

.gx-help-card {
  margin-top: 14px;
  border: 1px solid #e7e2f4;
  background: #ffffff;
  border-radius: 18px;
  padding: 16px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06);
}

.gx-help-card h3 {
  margin: 0;
  color: #005BFF;
  font-size: 16px;
  font-weight: 850;
}

.gx-help-card p {
  margin: 7px 0 14px;
  color: #64748b;
  font-size: 12px;
  font-weight: 650;
}

.gx-help-card button {
  width: 100%;
  border: none;
  border-radius: 13px;
  padding: 11px 12px;
  font-size: 13px;
  font-weight: 950;
  cursor: pointer;
  background: linear-gradient(135deg, #005BFF, #00A3FF);
  color: white;
  box-shadow: 0 12px 24px rgba(0, 91, 255, 0.2);
}

.gx-main {
  height: 100vh;
  overflow: hidden;
}
`;



