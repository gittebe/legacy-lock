import { Routes, Route, Navigate } from "react-router-dom";
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
          const response = await fetch("http://localhost:5001/dashboard", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            const data = await response.json();
            setIsLoggedIn(true, data.user);

            // If user data contains a profile picture, save it
            if (data.user?.profilePicture) {
              updateProfilePicture(data.user.profilePicture);
            }
          } else {
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    };

    verifyToken();
  }, [token, setIsLoggedIn, updateProfilePicture]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {!isLoggedIn ? (
        <>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/capsules" element={<CapsulesPage />} />
          <Route path="/capsules/:id" element={<CapsuleDetailsPage />} />
          <Route
            path="/profile"
            element={
              <ProfileSettingsModal
                onClose={() => console.log("Profile modal closed")}
              />
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      )}

      {/* Fallback Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
