import "./FAB.css";

export const FAB = ({ onClick }) => {
  return (
    <button className="fab" onClick={onClick}>
      <span className="fab-icon">+</span>
    </button>
  );
};
