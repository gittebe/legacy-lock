/**
 * This component contains the Authenticated routes of the application.
 */

import { Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import ProfileSettingsPage from "../pages/ProfileSettingsPage";
import CreateCapsulePage from "../pages/CreateCapsulePage";
import CapsuleDetailsPage from "../pages/CapsuleDetailsPage";
import NotFoundPage from "../pages/NotFoundPage";

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/profile" element={<ProfileSettingsPage />} />
      <Route path="/capsules/create" element={<CreateCapsulePage />} />
      <Route path="/capsules/:id" element={<CapsuleDetailsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AuthenticatedRoutes;
