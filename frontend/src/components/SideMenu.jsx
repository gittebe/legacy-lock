import "./SideMenu.css";
import useStore from "../store/store";
import { useState } from "react";
import { ProfileSettingsModal } from "../components/ProfileForm";

export const SideMenu = ({ showMenu, toggleMenu, onLoginClick, onSignUpClick, isLoggedIn }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Manage profile modal state
  const navigate = useNavigate();
  const { setIsLoggedIn } = useStore();

  const handleProfileClick = () => {
    navigate("/profile")
  }

  const onLogoutClick = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <>
      <aside className={`side-menu ${showMenu ? 'open' : ""}`} onClick={toggleMenu}>
        <div className={`side-menu-content ${isLoggedIn ? 'logged-in' : ''}`} onClick={(e) => e.stopPropagation()}>
          {isLoggedIn ? (
            <>
              <div className="menu-logged-in"></div>
              <button onClick={() => setIsProfileOpen(true)}>Profile</button>
              <button onClick={onLogoutClick}>Sign out</button>
            </>
          ) : (
            <>
              <button onClick={onLoginClick}>Log in</button>
              <button onClick={onSignUpClick}>Sign up</button>
            </>
          )}
        </div>
      </aside>

      {/* Render Profile Modal */}
      {isProfileOpen && <ProfileSettingsModal onClose={() => setIsProfileOpen(false)} />}
    </>
  );
};
