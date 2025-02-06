import { useState } from "react";
import { Navigate } from "react-router-dom";
import useStore from "../store/store";
import { Header } from "../components/Header";
import { SideMenu } from "../components/SideMenu";
import { FooterMobile } from "../components/FooterMobile";
import { DashboardWelcome } from "../components/DashboardWelcome";
import { LatestLocket } from "../components/LatestLocket";
import { GallerySwiper } from "../components/GallerySwiper";
import { FAB } from "../ui/FAB";
import { CreateCapsule } from "../components/CreateCapsule";
import "./DashboardPage.css";

export const DashboardPage = () => {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const [showMenu, setShowMenu] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };
  
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
      <GallerySwiper />
      <FooterMobile toggleMenu={toggleMenu}/>
      <div className="capsule-create-button-container">
        <FAB className="create-button" onClick={() => setIsPopupOpen(true)} />
      </div>
      <CreateCapsule isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
};
