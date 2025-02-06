import "./FAB.css";

export const FAB = ({ onClick }) => {
  return (
    <button className="fab" onClick={onClick} aria-label="Create new item">
      <span className="fab-icon">+</span>
    </button>
  );
};