
import "./Tooltip.css";

export const Tooltip = ({ text }) => {
  return (
    <div className="tooltip-container">
      <div className="info-icon">i</div>
      <div className="tooltip-text">{text}</div>
    </div>
  );
};

export default Tooltip;