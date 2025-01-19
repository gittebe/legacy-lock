/**
 * This component is the dashboard page for authenticated users.
 * 
 * It gets the user's login status from Zustand store, fetches capsule data, 
 * and displays a list of capsules if the user is logged in.
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
  const capsules = useStore((state) => state.capsules); // Get the capsules from Zustand store

  useEffect(() => {
    if (user) {
      fetchCapsules(); // Fetch the capsules if the user is logged in
    }
  }, [user, fetchCapsules]); 

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  if (loading) {
    return <p>Loading...</p>; // Display loading message if loading
  }
  
  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <CapsuleList capsules={capsules} />
    </div>
  );
};

export default DashboardPage;
