import "./Header.css";
import "../ui/ProfileIcon";
import { ProfileIcon } from "../ui/ProfileIcon"; 

export const Header = ({ toggleMenu }) => {
  return (
    <header className="header">
      <div className="logo">
        <span>Legacy</span>
        <span>Lock</span>
      </div>
      <button
        className="hamburger-menu"
        aria-label="Toggle menu"
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <button
     className="icon" 
     aria-label="toggle menu"
     onClick={toggleMenu}
      >
        <ProfileIcon/>
      </button>
    </header>
  );
};