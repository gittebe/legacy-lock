import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";
import { DashboardPage } from "../pages/DashboardPage";
import { CreateCapsulePage } from "../pages/CreateCapsulePage";
import { CapsuleDetailsPage } from "../pages/CapsuleDetailsPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ProfileSettingsPage } from "../pages/ProfileSettingsPage";
import useStore from "../store/store";
import { useEffect, useState } from "react";

export const RoutesConfig = () => {
  const { isLoggedIn, setIsLoggedIn } = useStore();
  const [loading, setLoading] = useState(true); // Track loading state for authentication check
  const token = localStorage.getItem("accessToken"); // get Token from the local Storage

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const response = await fetch("http://localhost:5000/dashboard", {
            headers: { "Authorization": `Bearer ${token}` },
          });

          if (response.ok) {
            const data = await response.json();
            setIsLoggedIn(true, data.user);
          } else {
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error('Error verifying token:', error);
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
      {/* publiuc routes */}
      {!isLoggedIn ? (
        <Route path="/" element={<LandingPage />} />
      ) : (
        <>
          {/* authenticated routes */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfileSettingsPage />} />
          <Route path="/capsules" element={<CreateCapsulePage />} />
          <Route path="/capsules/:id" element={<CapsuleDetailsPage />} />
        </>
      )}

      {/* Fallback-Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};