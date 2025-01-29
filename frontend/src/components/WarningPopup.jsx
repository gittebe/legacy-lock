import "./WarningPopup.css";
import warningIcon from "../assets/warningicon.png"; 

export const WarningPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <img src={warningIcon} alt="Warning icon" className="warning-icon" />
        <p className="warning-title">Warning!</p>
        <br />
        <p className="warning-text">Can’t open a locket before its release date.</p>
        <br />
        <button onClick={onClose} className="popup-button">OK</button>
      </div>
    </div>
  );
};
