/**
 * This component contains the Authenticated routes of the application.
 * 
 * If page not found, redirect to dashboard.
 */

import { Route, Routes, Navigate } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import ProfileSettingsPage from "../pages/ProfileSettingsPage";
import CreateCapsulePage from "../pages/CreateCapsulePage";
import CapsuleDetailsPage from "../pages/CapsuleDetailsPage";

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/profile" element={<ProfileSettingsPage />} />
      <Route path="/capsules/create" element={<CreateCapsulePage />} />
      <Route path="/capsules/:id" element={<CapsuleDetailsPage />} />

       {/* Redirect to Dashboard if no matching route is found */} 
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AuthenticatedRoutes;
