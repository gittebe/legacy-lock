/**
 * This component is the dashboard page for authenticated users.
 * 
 * It get the user's login status from Zustand store, and displays a welcome message if the user is logged in.
 * 
 */
import useStore from "../store/store";

const DashboardPage = () => {
  const user = useStore((state) => state.user) || { email: "user@legacy-lock.com", username: "user", password: "1234" };; // Get the user's login status from Zustand store
  
  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>This is your dashboard!</p>
    </div>
  );
};

export default DashboardPage;
