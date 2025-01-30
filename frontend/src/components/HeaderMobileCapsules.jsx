import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "../ui/ArrowLeftIcon";
import "./HeaderMobileCapsules.css";

export const HeaderMobileCapsules = () => {
  const navigate = useNavigate();

  const handleArrowClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="header-mobile-capsules">
      <div className="arrow-left" onClick={handleArrowClick}>
      <ArrowLeftIcon/>
      </div>
    </div>
  )
}