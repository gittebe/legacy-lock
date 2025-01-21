import "./Header.css";

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
    </header>
  );
};