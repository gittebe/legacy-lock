import { useState } from "react";
import { HomeIcon } from "../ui/HomeIcon";
import { SettingsIcon } from "../ui/SettingsIcon";
import { ProfileSettingsModal } from "../components/ProfileForm"; 
import "./FooterMobile.css";

export const FooterMobile = ({ toggleMenu }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <footer className="footer-mobile">
        <HomeIcon />
        <SettingsIcon toggleMenu={() => setIsProfileOpen(true)} />
      </footer>

      {isProfileOpen && <ProfileSettingsModal onClose={() => setIsProfileOpen(false)} />}
    </>
  );
};
