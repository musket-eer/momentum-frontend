import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartupPage from "../pages/startupPage";
import DashboardPage from "../pages/dashboardPage";
import ReflectionPage from "../pages/reflectionPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the startup page */}
        <Route path="/startup" element={<StartupPage />} />

        {/* Route for the dashboard page */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Route for the reflection page */}
        <Route path="/reflection" element={<ReflectionPage />} />

        {/* Default route - redirect to startup */}
        <Route path="/" element={<StartupPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
