import React, { useState } from "react";

import { profileConfigs } from "./config/profileModules.js";

import GroerXLayout from "./components/GroerXLayout.jsx";

import ProfileSelection from "./pages/ProfileSelection.jsx";
import ProfileDashboard from "./pages/ProfileDashboard.jsx";

import Class10Dashboard from "./pages/Class10Dashboard.jsx";
import Class10Assessment from "./pages/Class10Assessment.jsx";
import Class10LearningPath from "./pages/Class10LearningPath.jsx";
import Class10StreamExplorer from "./pages/Class10StreamExplorer.jsx";
import Class10CareerExplorer from "./pages/Class10CareerExplorer.jsx";
import Class10FinalReport from "./pages/Class10FinalReport.jsx";
function LockedLearningPath() {
  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "radial-gradient(circle at 90% 5%, rgba(0, 91, 255, 0.12), transparent 30%), #fbfdff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "620px",
          background: "#ffffff",
          border: "1px solid #d6e6ff",
          borderRadius: "28px",
          padding: "44px",
          textAlign: "center",
          boxShadow: "0 24px 60px rgba(0, 43, 120, 0.10)",
        }}
      >
        <div
          style={{
            width: "86px",
            height: "86px",
            borderRadius: "28px",
            margin: "0 auto 22px",
            background: "linear-gradient(135deg, #005BFF, #00A3FF)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "38px",
            boxShadow: "0 16px 35px rgba(0, 91, 255, 0.25)",
          }}
        >
          🔒
        </div>

        <p
          style={{
            margin: "0 0 10px",
            color: "#005BFF",
            fontSize: "14px",
            fontWeight: "900",
          }}
        >
          Coming Soon
        </p>

        <h1
          style={{
            margin: "0",
            color: "#071B5F",
            fontSize: "34px",
            fontWeight: "950",
            letterSpacing: "-1px",
          }}
        >
          Learning Path is Locked
        </h1>

        <p
          style={{
            margin: "14px auto 0",
            color: "#64748b",
            fontSize: "16px",
            lineHeight: "1.6",
            fontWeight: "600",
            maxWidth: "460px",
          }}
        >
          This module is not available right now. We will open it in the future
          after completing the assessment, stream explorer, career explorer, and
          final report flow.
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{
            marginTop: "28px",
            border: "none",
            background: "linear-gradient(135deg, #005BFF, #00A3FF)",
            color: "#ffffff",
            borderRadius: "14px",
            padding: "13px 22px",
            fontSize: "14px",
            fontWeight: "900",
            cursor: "pointer",
            boxShadow: "0 14px 28px rgba(0, 91, 255, 0.22)",
          }}
        >
          Back to Dashboard
        </button>
      </div>
    </section>
  );
}
export default function App() {
  const [selectedProfile, setSelectedProfile] = useState(
    localStorage.getItem("selectedProfile") || ""
  );

  const [currentModule, setCurrentModule] = useState(
    localStorage.getItem("currentModule") || "dashboard"
  );

  const selectProfile = (profileKey) => {
    const profile = profileConfigs[profileKey];

    localStorage.setItem("selectedProfile", profileKey);
    localStorage.setItem("currentModule", profile.defaultModule);

    setSelectedProfile(profileKey);
    setCurrentModule(profile.defaultModule);
  };

  const switchProfile = () => {
    localStorage.removeItem("selectedProfile");
    localStorage.removeItem("currentModule");
    localStorage.removeItem("studentName");
    localStorage.removeItem("studentMobile");

    setSelectedProfile("");
    setCurrentModule("dashboard");
  };

  const setActivePage = (page) => {
    localStorage.setItem("currentModule", page);
    setCurrentModule(page);
  };

  if (!selectedProfile) {
    return <ProfileSelection onSelectProfile={selectProfile} />;
  }

  const profile = profileConfigs[selectedProfile];

  let page = null;

  if (selectedProfile === "class10") {
    page = <Class10Dashboard setActivePage={setActivePage} />;

    if (currentModule === "dashboard") {
      page = <Class10Dashboard setActivePage={setActivePage} />;
    }

if (currentModule === "learning-path") {
  page = <LockedLearningPath />;
}
    if (currentModule === "stream-explorer") {
      page = <Class10StreamExplorer setActivePage={setActivePage} />;
    }

    if (currentModule === "career-explorer") {
      page = <Class10CareerExplorer setActivePage={setActivePage} />;
    }

    if (currentModule === "final-report") {
      page = <Class10FinalReport setActivePage={setActivePage} />;
    }

    if (currentModule.startsWith("assessment:")) {
      const testType = currentModule.split(":")[1];

      page = (
        <Class10Assessment
          testType={testType}
          setActivePage={setActivePage}
        />
      );
    }
  } else {
    page = (
      <ProfileDashboard
        profile={profile}
        currentModule={currentModule}
      />
    );
  }

  return (
    <GroerXLayout
      profile={profile}
      currentModule={currentModule}
      setActivePage={setActivePage}
      onSwitchProfile={switchProfile}
    >
      {page}
    </GroerXLayout>
  );
}


