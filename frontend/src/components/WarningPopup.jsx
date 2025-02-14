import "./WarningPopup.css";
import warningIcon from "../assets/warningicon.png"; 
import { OkButton } from "../ui/OkButton";
import { motion } from "framer-motion";
import { useEffect } from "react";

export const WarningPopup = ({ onClose }) => {
  useEffect(() => {
    const img = new Image();
    img.src = warningIcon;
  }, []); 

  return (
    <div className="popup-overlay" role="alert">
      <motion.div 
        className="popup"
        initial={{ x: 0 }}
        animate={{ x: [-5, 5, -5, 5, 0] }} 
        transition={{ duration: 0.3 }}
      >
        <img src={warningIcon} alt="Warning icon" className="warning-icon" />
        <p className="warning-title">Warning!</p>
        <p className="warning-text">
          Can’t open a locket <br /> before its release date.
        </p>
        <OkButton onClick={onClose} />
      </motion.div>
    </div>
  );
};
