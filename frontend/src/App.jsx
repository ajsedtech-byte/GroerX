import React, { useState } from "react";

import { profileConfigs } from "./config/profileModules.js";

import GroerXLayout from "./components/GroerXLayout.jsx";

import Auth from "./pages/Auth.jsx";
import ProfileSelection from "./pages/ProfileSelection.jsx";
import ProfileDashboard from "./pages/ProfileDashboard.jsx";

import Class10Dashboard from "./pages/Class10Dashboard.jsx";
import Class10Assessment from "./pages/Class10Assessment.jsx";
import Class10StreamExplorer from "./pages/Class10StreamExplorer.jsx";
import Class10CareerExplorer from "./pages/Class10CareerExplorer.jsx";
import Class10FinalReport from "./pages/Class10FinalReport.jsx";

function getSavedUser() {
  try {
    const savedUser = localStorage.getItem("groerx_user");

    if (!savedUser) {
      return null;
    }

    const parsedUser = JSON.parse(savedUser);

    if (!parsedUser || parsedUser.isLoggedIn !== true) {
      return null;
    }

    return parsedUser;
  } catch {
    return null;
  }
}

function getSavedProfile() {
  return (
    localStorage.getItem("groerx_selected_profile") ||
    localStorage.getItem("selectedProfile") ||
    ""
  );
}

function getDefaultModule(profileKey) {
  const profile = profileConfigs[profileKey];

  if (!profile) {
    return "dashboard";
  }

  return profile.defaultModule || "dashboard";
}

function LockedLearningPath({ setActivePage }) {
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
          onClick={() => setActivePage("dashboard")}
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
  const [loggedUser, setLoggedUser] = useState(getSavedUser());

  const [selectedProfile, setSelectedProfile] = useState(() => {
    const savedProfile = getSavedProfile();

    if (!savedProfile) {
      return "";
    }

    if (!profileConfigs[savedProfile]) {
      return "";
    }

    return savedProfile;
  });

  const [currentModule, setCurrentModule] = useState(
    localStorage.getItem("currentModule") || "dashboard"
  );

  function handleAuthSuccess(user) {
    const profileKey = user?.profile || "class10";
    const validProfileKey = profileConfigs[profileKey] ? profileKey : "class10";
    const defaultModule = getDefaultModule(validProfileKey);

    const finalUser = {
      ...user,
      profile: validProfileKey,
      isLoggedIn: true,
    };

    localStorage.setItem("groerx_user", JSON.stringify(finalUser));
    localStorage.setItem("groerx_selected_profile", validProfileKey);

    localStorage.setItem("selectedProfile", validProfileKey);
    localStorage.setItem("currentModule", defaultModule);

    setLoggedUser(finalUser);
    setSelectedProfile(validProfileKey);
    setCurrentModule(defaultModule);
  }

  function selectProfile(profileKey) {
    const profile = profileConfigs[profileKey];

    if (!profile) {
      return;
    }

    const defaultModule = profile.defaultModule || "dashboard";

    const updatedUser = {
      ...(loggedUser || {}),
      profile: profileKey,
      isLoggedIn: true,
    };

    localStorage.setItem("groerx_user", JSON.stringify(updatedUser));
    localStorage.setItem("groerx_selected_profile", profileKey);

    localStorage.setItem("selectedProfile", profileKey);
    localStorage.setItem("currentModule", defaultModule);

    setLoggedUser(updatedUser);
    setSelectedProfile(profileKey);
    setCurrentModule(defaultModule);
  }

  function logout() {
    localStorage.removeItem("groerx_user");
    localStorage.removeItem("groerx_selected_profile");

    localStorage.removeItem("selectedProfile");
    localStorage.removeItem("currentModule");
    localStorage.removeItem("studentName");
    localStorage.removeItem("studentMobile");

    setLoggedUser(null);
    setSelectedProfile("");
    setCurrentModule("dashboard");
  }

  function setActivePage(page) {
    localStorage.setItem("currentModule", page);
    setCurrentModule(page);
  }

  if (!loggedUser) {
    return (
      <Auth
        setActivePage={setActivePage}
        onAuthSuccess={handleAuthSuccess}
      />
    );
  }

  if (!selectedProfile) {
    return <ProfileSelection onSelectProfile={selectProfile} />;
  }

  const profile = profileConfigs[selectedProfile];

  if (!profile) {
    return <ProfileSelection onSelectProfile={selectProfile} />;
  }

  let page = null;

  if (selectedProfile === "class10") {
    page = <Class10Dashboard setActivePage={setActivePage} />;

    if (currentModule === "dashboard") {
      page = <Class10Dashboard setActivePage={setActivePage} />;
    }

    if (
      currentModule === "career-assessment" ||
      currentModule === "assessment"
    ) {
      page = (
        <Class10Assessment
          testType="riasec"
          setActivePage={setActivePage}
        />
      );
    }

    if (currentModule.startsWith("assessment:")) {
      const testType = currentModule.split(":")[1] || "riasec";

      page = (
        <Class10Assessment
          testType={testType}
          setActivePage={setActivePage}
        />
      );
    }

    if (currentModule === "learning-path") {
      page = <LockedLearningPath setActivePage={setActivePage} />;
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
      onSwitchProfile={logout}
    >
      {page}
    </GroerXLayout>
  );
}