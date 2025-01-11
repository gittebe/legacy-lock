/**
 * This component is the dashboard page for authenticated users.
 * 
 */
import useStore from "../store/store";

const DashboardPage = () => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  
  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      <p>This is your dashboard!</p>
    </div>
  );
};

export default DashboardPage;
