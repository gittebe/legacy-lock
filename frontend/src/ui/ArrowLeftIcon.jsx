import { useNavigate } from "react-router-dom";
import "./ArrowLeftIcon.css";

export const ArrowLeftIcon = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  return (
    <button className="arrow-icon-container" onClick={handleBackClick} aria-label="Go back">
      <img className="arrow-icon" src="../../arrow-left.png" alt="Back" />
    </button>
  );
};
