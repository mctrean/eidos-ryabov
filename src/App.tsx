import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import StudySessions from "./pages/StudySessions";
import NotFound from "./pages/NotFound";
import type { UserProfile, AppConfig } from "./types";

const App: React.FC = () => {
  const [user] = useState<UserProfile>({
    name: "Барнаби Мармадюк",
    role: "Преподаватель",
    initials: "БМ",
  });

  const [config] = useState<AppConfig>({
    version: APP_VERSION,
    language: "Русский",
  });

  const handleLogout = () => {
    // TODO
  };

  const handleLanguageChange = (_language: string) => {
    // TODO
  };

  return (
    <MainLayout
      user={user}
      config={config}
      onLogout={handleLogout}
      onLanguageChange={handleLanguageChange}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/study-sessions" replace />} />
        <Route path="/schedule" element={<NotFound />} />
        <Route path="/study-sessions" element={<StudySessions />} />
        <Route path="/room-list" element={<NotFound />} />
        <Route path="/users" element={<NotFound />} />
        <Route path="/study-groups" element={<NotFound />} />
        <Route path="/device-list" element={<NotFound />} />
        <Route path="/system-settings" element={<NotFound />} />
        <Route path="/archive" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
