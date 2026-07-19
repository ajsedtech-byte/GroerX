import React from "react";

export default function GroerXLayout({
  children,
  currentModule,
  setActivePage,
  profile,
  onSwitchProfile,
}) {
  const menuItems = profile?.menu || [];

  return (
    <div className="gx-shell">
      <style>{layoutCss}</style>

      <aside className="gx-sidebar">
        <div className="gx-brand">
          <div className="gx-logo">{profile?.emoji || "🎒"}</div>
          <div>
            <h2>GroerX</h2>
            <p>{profile?.title || "Class 10 Career OS"}</p>
          </div>
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
                onClick={() => setActivePage(item.key)}
                className={`gx-nav-btn ${active ? "active" : ""}`}
              >
                <span className="gx-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="gx-spacer" />

        <div className="gx-profile-card">
          <p>Current Profile</p>
          <h3>{profile?.title || "Class 10 Career OS"}</h3>

          <button onClick={onSwitchProfile}>👥 Switch Profile</button>
        </div>

        <div className="gx-help-card">
          <h3>Need Help?</h3>
          <p>Ask Groer AI Mentor</p>

          <button>💬 Chat Now →</button>
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
  gap: 10px;
  margin-bottom: 22px;
}

.gx-logo {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: linear-gradient(135deg, #005BFF, #00A3FF);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 21px;
  box-shadow: 0 14px 24px rgba(0, 91, 255, 0.22);
}

.gx-brand h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 950;
  color: #111827;
}

.gx-brand p {
  margin: 3px 0 0;
  color: #64748b;
  font-size: 12px;
  font-weight: 650;
}

.gx-nav {
  display: grid;
  gap: 8px;
}

.gx-nav-btn {
  border: none;
  background: transparent;
  color: #111827;
  padding: 11px 12px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 850;
  text-align: left;
}

.gx-nav-btn:hover {
  background: #f5efff;
}

.gx-nav-btn.active {
  background: linear-gradient(135deg, #EFF6FF, #F6FAFF);
  color: #005BFF;
  border: 1px solid #BFD7FF;
  box-shadow: 0 10px 20px rgba(0, 91, 255, 0.12);
}

.gx-nav-icon {
  width: 22px;
  display: inline-flex;
  justify-content: center;
}

.gx-spacer {
  flex: 1;
  min-height: 12px;
}

.gx-profile-card {
  border: 1px solid #BFD7FF;
  background: linear-gradient(135deg, #ffffff, #F6FAFF);
  border-radius: 18px;
  padding: 15px;
  box-shadow: 0 12px 25px rgba(0, 91, 255, 0.08);
}

.gx-profile-card p {
  margin: 0 0 6px;
  color: #005BFF;
  font-weight: 850;
  font-size: 12px;
}

.gx-profile-card h3 {
  margin: 0 0 12px;
  font-size: 14px;
  color: #111827;
}

.gx-profile-card button,
.gx-help-card button {
  width: 100%;
  border: none;
  border-radius: 13px;
  padding: 10px 12px;
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;
}

.gx-profile-card button {
  background: #ffffff;
  color: #005BFF;
  border: 1px solid #60A5FA;
}

.gx-help-card {
  margin-top: 14px;
  border: 1px solid #e7e2f4;
  background: #ffffff;
  border-radius: 18px;
  padding: 15px;
  box-shadow: 0 12px 25px rgba(15, 23, 42, 0.06);
}

.gx-help-card h3 {
  margin: 0;
  color: #005BFF;
  font-size: 15px;
}

.gx-help-card p {
  margin: 6px 0 12px;
  color: #64748b;
  font-size: 12px;
  font-weight: 650;
}

.gx-help-card button {
  background: linear-gradient(135deg, #005BFF, #00A3FF);
  color: white;
  box-shadow: 0 12px 24px rgba(0, 91, 255, 0.2);
}

.gx-main {
  height: 100vh;
  overflow: hidden;
}
`;



