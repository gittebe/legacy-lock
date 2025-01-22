import "./SideMenu.css";

export const SideMenu = ({ showMenu, toggleMenu, onLoginClick, onSignUpClick, onSignOutClick, isLoggedIn }) => {
  return (
    <aside className={`side-menu ${showMenu ? 'open' : ""}`} onClick={toggleMenu}>
      <div className="side-menu-content" onClick={(e) => e.stopPropagation()}>
        {isLoggedIn ? (
          <button onClick = {onSignOutClick}>Sign out</button>
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