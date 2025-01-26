/**
 * DashboardPage Component
 */

import { useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
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

        <h2>Your latest lockets:</h2>
        <CapsuleList filter="recent" /> 

        <h2>Collections</h2>
        <CapsuleList filter="recent" />
        <div style={{ marginTop: "1rem" }}>
          <h3>
            <Link to="/capsules">See all</Link>
          </h3>
        </div>
      </div>
      <div>
        <div>
        <h2>Create a new Capsule</h2>
        <button onClick={openPopup}>Create Capsule</button>
          <CreateCapsule isOpen={isPopupOpen} onClose={closePopup} />
        </div>
      </div>
      <FooterMobile/>
    </>
  );
};
