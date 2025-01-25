import { useNavigate } from "react-router-dom";
import "./HomeIcon.css";

export const HomeIcon = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dashboard");
  }

  return (
    <div className="home-icon-container" onClick={handleClick}>
      <img className="home-icon" src="../../home.png"/>
    </div>
  )
}