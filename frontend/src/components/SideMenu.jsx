import "./SideMenu.css";

export const SideMenu = ({ showMenu, toggleMenu, onLoginClick, onSignUpClick }) => {
  return (
    <aside className={`side-menu ${showMenu ? 'open' : ""}`} onClick={toggleMenu}>
      <div className="side-menu-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onLoginClick}>Log in</button>
        <button onClick={onSignUpClick}>Sign up</button>
      </div>
    </aside>
  );
};