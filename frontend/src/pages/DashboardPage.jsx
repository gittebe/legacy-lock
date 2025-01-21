/**
 * DashboardPage Component
 * 
 * Displays the dashboard for authenticated users, including a welcome message
 * and a list of capsules fetched from the backend.
 * 
 * Features:
 * - Redirects unauthenticated users to the login page.
 * - Fetches capsule data using Zustand and displays a loading indicator during the fetch.
 * - Shows a list of capsules using the CapsuleList component.
 * 
 * Props:
 * - None, all state and actions are handled via the Zustand store.
 * 
 * Zustand Store:
 * - `user`: The authenticated user's data.
 * - `fetchCapsules`: Fetches the user's capsules from the backend.
 * - `loading`: Indicates whether capsule data is being fetched.
 * - `capsules`: An array of capsule objects to display.
 * 
 * Notes:
 * - The `useEffect` hook is used to trigger the fetchCapsules function when the user is logged in.
 * - Redirects unauthenticated users to `/login` using React Router's `Navigate`.
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

  const token = localStorage.getItem("accessToken"); // Get the token from local storage

  useEffect(() => {
    if (user && token) {
      fetchCapsules(); // Fetch the capsules if the user is logged in
    }
  }, [user, fetchCapsules, token]); 

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
