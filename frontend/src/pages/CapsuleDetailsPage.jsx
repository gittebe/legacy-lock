/**
 * This page is for view an individual capsule.
 */

import useStore from "../store/store";
import { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { SideMenu } from "../components/SideMenu";
import { Header } from "../components/Header";
import { formatDateTime } from "../utils/date";
import { CapsuleCard } from "../components/CapsuleCard";


export const CapsuleDetailsPage = () => {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { id } = useParams(); // Get the capsule ID from the URL
  console.log("Capsule ID from URL:", id);
  const getCapsuleById = useStore((state) => state.getCapsuleById); // Get the method to fetch a capsule by ID
  const [capsuleDetails, setCapsuleDetails] = useState(null); // Store the capsule in the local state
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Fetch the capsule details when the component mounts
    const fetchCapsule = async () => {
      try {
        const capsule = await getCapsuleById(id);
        setCapsuleDetails(capsule);
      } catch (error) {
        console.error("Error fetching capsule details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCapsule();
  }, [id, getCapsuleById]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout(); // Call the logout method from your store
    navigate("/"); // Redirect to home or login page
  };

  // Handle loading state
  if (loading) {
    return <p>Loading capsule details...</p>;
  }

  // Handle capsule not found
  if (!capsuleDetails) {
    return <p>Capsule not found.</p>;
  }

  // Check if the capsule is locked
  const isLocked = new Date() < new Date(capsule.openAt);

  return (
    <>
      <Header toggleMenu={() => setShowMenu(!showMenu)} />
      <SideMenu
        showMenu={showMenu}
        toggleMenu={() => setShowMenu(false)}
        isLoggedIn={!!user}
        onLogoutClick={handleLogout}
      />
      <div>
        <h1>Capsule Details Page</h1>
        {isLocked ? (
          <p>This capsule is locked until {formatDateTime(capsuleDetails.openAt)}.</p>
        ) : (
          <CapsuleCard capsule={capsuleDetails} />
          )}
      </div>
    </>
  );
};
