import { useNavigate } from "react-router-dom";
import useStore from "../store/store";

export const handleLogout = () => {
  const navigate = useNavigate();
  const logout = useStore((state) => state.logout);

  // API fetch for logout
  fetch("http://localhost:5000/users/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accessToken: localStorage.getItem("accessToken") })
  })
  .then(async (response) => {
    localStorage.removeItem("accessToken");

    // Logout in the store
    logout();

    if (response.ok) {
      console.log("Logged out successfully");
    } else {
      const data = await response.json();
      alert(data.message || "Logout failed");
    }

    navigate("/");
  })
  .catch((error) => {
    console.error("Error logging out:", error);
  });
};