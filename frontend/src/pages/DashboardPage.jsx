/**
 * DashboardPage Component
 */

import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useStore from "../store/store";
import { CapsuleList } from "../components/CapsuleList";
import { Header } from "../components/Header";
import { SideMenu } from "../components/SideMenu";
import { FooterMobile } from "../components/FooterMobile";
import { CreateCapsule } from "../components/CreateCapsule";

export const DashboardPage = () => {
  console.log("DashboardPage rendered");
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true); 
  const closePopup = () => setIsPopupOpen(false); 

  // If user is not logedin
  if (!user) {
    return <Navigate to="/login" replace />;
  }

    const handleLogout = () => {
      console.log("Logout button clicked");
      logout(); // Call the logout method from your store
      navigate("/"); // Redirect to home or login page
    };

  return (
    <>
      <Header toggleMenu={() => setShowMenu(!showMenu)} />
      <SideMenu
        showMenu={showMenu}
        toggleMenu={() => setShowMenu(false)}
        onLogoutClick={handleLogout}
        isLoggedIn={!!user} 
      />
      
      <div>
        <h1>Welcome, {user.username}!</h1>
        <h2>Your Capsules</h2>
        <CapsuleList />
      </div>
      <div>
        <button onClick={openPopup}>Create Capsule</button>
        <CreateCapsule isOpen={isPopupOpen} onClose={closePopup} />
      </div>
      <FooterMobile/>
    </>
  );
};
