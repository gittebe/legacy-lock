import { useNavigate } from "react-router-dom";
import "./ArrowLeftIcon.css";

export const ArrowLeftIcon = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (window.history.length > 2) {
      navigate(-1); // go back if there's a valid history
    } else {
      navigate("/dashboard"); // fallback if no history exists
    }
  };

  return (
    <button 
      className="arrow-icon-container" 
      onClick={handleBackClick} 
      aria-label="Go back"
      >
      <img className="arrow-icon" src="../../arrow-left.png" alt="Back" />
    </button>
  );
};