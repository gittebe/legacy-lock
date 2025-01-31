import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useStore from "../store/store";
import { CapsuleList } from "../components/CapsuleList";
import { Header } from "../components/Header";
import { SideMenu } from "../components/SideMenu";
import { HeaderMobileCapsules } from "../components/HeaderMobileCapsules";
import { FooterMobile } from "../components/FooterMobile";
import "./CapsulePage.css";

export const CapsulesPage = () => {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

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
      <div className="capsule-list-container">
        <CapsuleList />
      </div>
      <FooterMobile />
    </>
  );
};
