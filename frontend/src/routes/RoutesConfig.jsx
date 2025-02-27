import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";
import { DashboardPage } from "../pages/DashboardPage";
import { CapsulesPage } from "../pages/CapsulesPage";
import { CapsuleDetailsPage } from "../pages/CapsuleDetailsPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ProfileSettingsModal } from "../components/ProfileForm";
import useStore from "../store/store";
import { useEffect, useState } from "react";

export const RoutesConfig = () => {
  const { isLoggedIn, setIsLoggedIn, updateProfilePicture } = useStore();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const response = await fetch("https://legacy-lock-2.onrender.com/dashboard", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            const data = await response.json();
            setIsLoggedIn(true, data.user);
          } else {
            setIsLoggedIn(false);
          }
        } catch (error) {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    };

    verifyToken();
  }, [token, setIsLoggedIn]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Dynamic route `/` */}
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <LandingPage />}
      />
      {/* Authenticated routes */}
      {isLoggedIn && (
        <>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfileSettingsModal />} />
          <Route path="/capsules" element={<CapsulesPage />} />
          <Route path="/capsules/:id" element={<CapsuleDetailsPage />} />
        </>
      )}

      <Route path="*" element={<NotFoundPage />} />
      {/* Logout - please see SideMenu component */}
    </Routes>
  );
};