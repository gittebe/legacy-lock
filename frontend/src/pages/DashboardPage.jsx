/**
 * This component is the dashboard page for authenticated users.
 * 
 * It get the user's login status from Zustand store, and displays a welcome message if the user is logged in.
 * 
 */
import { Navigate } from "react-router-dom";
import useStore from "../store/store";
import CapsuleList from "../components/Capsule/CapsuleList";
import { useEffect } from "react";

const DashboardPage = () => {
  const user = useStore((state) => state.user)// Get the user's login status from Zustand store
  const fetchCapsules = useStore((state) => state.fetchCapsules); // Get the fetchCapsules function from Zustand store
  const loading = useStore((state) => state.loading); // Get the loading status from Zustand store

  useEffect(() => {
    if (user) {
      fetchCapsules();
    }
  }, [user, fetchCapsules]); 

  if (loading) {
    return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <CapsuleList capsules={fetchCapsules()} />
    </div>
  );
};

export default DashboardPage;
