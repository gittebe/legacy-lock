import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useStore from "../store/store";
import { Header } from "../components/Header";
import { SideMenu } from "../components/SideMenu";
import { FooterMobile } from "../components/FooterMobile";
import { DashboardWelcome } from "../components/DashboardWelcome";
import { LatestLocket } from "../components/LatestLocket";
import { DashboardCreatedList } from "../components/DashboardCreatedList";
import { DashboardReceivedList } from "../components/DashboardReceivedList";
import { FAB } from "../ui/FAB";
import { CreateCapsule } from "../components/CreateCapsule";
import "./DashboardPage.css";

export const DashboardPage = () => {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header toggleMenu={() => setShowMenu(!showMenu)} />
      <SideMenu
        showMenu={showMenu}
        toggleMenu={() => setShowMenu(false)}
        onLogoutClick={logout}
        isLoggedIn={!!user}
      />
      <DashboardWelcome username={user.username} />
      <LatestLocket />
      <div className="collections-container">
        <DashboardCreatedList />
        <DashboardReceivedList />
      </div>
      <FooterMobile />
      
      <FAB onClick={() => setIsPopupOpen(true)} /> 
      
      <CreateCapsule isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
};
