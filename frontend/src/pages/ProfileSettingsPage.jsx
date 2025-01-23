import useStore from "../store/store";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { SideMenu } from "../components/SideMenu";
import { Header } from "../components/Header";

export const ProfileSettingsPage = () => {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    console.log("Logout button clicked");
    logout(); // Call the logout method from your store
    navigate("/"); // Redirect to home or login page
  };
  return (
    <>
 <Header toggleMenu={() => setShowMenu(!showMenu)}/>
    <SideMenu
          showMenu={showMenu}
          toggleMenu={() => setShowMenu(false)}
          isLoggedIn={!!user}
          onLogoutClick={handleLogout}
    />
    <div>
      <h1>Profile Setting Page</h1>
      <p>Welcome to the Profile settings page!</p>
    </div>
    </>
  );
};