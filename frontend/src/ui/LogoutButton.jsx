import { useNavigate } from "react-router-dom";
import useStore from "../store/store";
import "./LogoutButton.css";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useStore();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <button type="button" className="custom-logout-button" onClick={handleLogout}>
      Log out
    </button>
  );
};
