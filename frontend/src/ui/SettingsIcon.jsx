
import { useNavigate } from "react-router-dom";
import "./SettingsIcon.css";

export const SettingsIcon = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dashboard");
  }

  return (
    <div className="settings-icon-container" onClick={handleClick}>
      <img className="settings-icon" src="../../settings-icon.png" />
    </div>
  )
}