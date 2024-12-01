import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartupPage from "../pages/startupPage";
import DashboardPage from "../pages/dashboardPage";
import ReflectionPage from "../pages/reflectionPage";
import SignupPage from "../pages/signUpPage";
import LoginPage from "../pages/loginPage";
import ResetPasswordPage from "../pages/resetPasswordPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
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
