import  { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { PopupModals } from "../components/PopupModals";
import { HeroSection } from "../components/HeroSectionComponent";
import { SideMenu } from "../components/SideMenu";
import "./LandingPage.css"

export const LandingPage = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closePopup = () => {
    setShowLoginPopup(false);
    setShowSignupPopup(false);
  };

  return (
    <div className="landing-page">
      <Header toggleMenu={() => setShowMenu(!showMenu)} />
      <SideMenu
        showMenu={showMenu}
        toggleMenu={() => setShowMenu(false)}
        onLoginClick={() => setShowLoginPopup(true)}
        onSignUpClick={() => setShowSignupPopup(true)}
      />

      <HeroSection
        isSmallScreen={isSmallScreen}
        onLoginClick={() => setShowLoginPopup(true)}
        onSignUpClick={() => setShowSignupPopup(true)}
      />

      <PopupModals
        showLoginPopup={showLoginPopup}
        showSignupPopup={showSignupPopup}
        onLoginClose={() => setShowLoginPopup(false)}
        onSignupClose={() => setShowSignupPopup(false)}
        openSignup={() => {
          setShowLoginPopup(false);
          setShowSignupPopup(true);
        }}
      />
    </div>
  );
};