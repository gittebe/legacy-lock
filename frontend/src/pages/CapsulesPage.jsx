import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useStore from "../store/store";
import { CapsuleList } from "../components/CapsuleList";
import { Header } from "../components/Header";
import { SideMenu } from "../components/SideMenu";
import { CreateCapsule } from "../components/CreateCapsule";
import { HeaderMobileCapsules } from "../components/HeaderMobileCapsules";
import "./CapsulePage.css"

export const CapsulesPage = () => {
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
   
      <Header className="header" toggleMenu={() => setShowMenu(!showMenu)} />
    
      <SideMenu
      className="side-menu"
        showMenu={showMenu}
        toggleMenu={() => setShowMenu(false)}
        onLogoutClick={logout}
        isLoggedIn={!!user}
      />
      <header className="header-mobile-capsule">
      <HeaderMobileCapsules />
      </header>
      <div>
     
        <CapsuleList />
      </div>
    </>
  );
};

