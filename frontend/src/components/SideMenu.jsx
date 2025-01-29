import "./SideMenu.css";
import useStore from "../store/store";
import { useNavigate } from "react-router-dom";

export const SideMenu = ({ showMenu, toggleMenu, onLoginClick, onSignUpClick, isLoggedIn }) => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useStore();

  const handleProfileClick = () => {
    navigate("/profile")
  }

  const onLogoutClick = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    navigate("/landingpage");
  }

  return (
      <aside className={`side-menu ${showMenu ? 'open' : ""}`} onClick={toggleMenu}>
        <div className={`side-menu-content ${isLoggedIn ? 'logged-in' : ''}`} onClick={(e) => e.stopPropagation()}>
        {isLoggedIn ? (
          <>
          <div className="menu-logged-in"></div>
          <button onClick={handleProfileClick}>Profile</button>
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
  );
};
