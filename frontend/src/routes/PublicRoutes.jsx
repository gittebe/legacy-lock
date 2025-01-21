/**
 * This component contains the public routes of the application.
 */

import { Route, Routes } from "react-router-dom";
// import LandingPage from "../pages/LandingPage";
// import LoginPage from "../pages/LoginPage";
import { LandingPage } from "../pages/LandingPage";
import NotFoundPage from "../pages/NotFoundPage";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
} 

export default PublicRoutes;
