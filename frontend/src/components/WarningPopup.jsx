import "./WarningPopup.css";
import warningIcon from "../assets/warningicon.png"; 
import { OkButton } from "../ui/OkButton";

export const WarningPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <img src={warningIcon} alt="Warning icon" className="warning-icon" />
        <p className="warning-title">Warning!</p>
        <p className="warning-text">
          Can’t open a locket
          <br />
          before its release date.</p>
        <br />
        <OkButton onClick={onClose} />
      </div>
    </div>
  );
};
