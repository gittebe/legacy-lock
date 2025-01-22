import "./SideMenu.css";
import useStore from "../store/store";
import { useNavigate } from "react-router-dom";

export const SideMenu = ({ showMenu, toggleMenu, onLoginClick, onSignUpClick, onLogoutClick, isLoggedIn }) => {
  const navigate = useNavigate();

  return (
    <aside className={`side-menu ${showMenu ? 'open' : ""}`} onClick={toggleMenu}>
      <div className="side-menu-content" onClick={(e) => e.stopPropagation()}>
        {isLoggedIn ? (
          <button onClick = {onLogoutClick}>Sign out</button>
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