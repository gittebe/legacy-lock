/**
 * This component is the dashboard page for authenticated users.
 * 
 * It get the user's login status from Zustand store, and displays a welcome message if the user is logged in.
 * 
 */
import { Navigate } from "react-router-dom";
import useStore from "../store/store";

const DashboardPage = () => {
  const user = useStore((state) => state.user)// Get the user's login status from Zustand store

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>This is your dashboard!</p>
    </div>
  );
};

export default DashboardPage;
