/**
 * DashboardPage Component
 */

import React from "react";
import { Navigate } from "react-router-dom";
import useStore from "../store/store";
import CapsuleList from "../components/Capsule/CapsuleList";

const DashboardPage = () => {
  const user = useStore((state) => state.user);

  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <h2>Your Capsules</h2>
      <CapsuleList />
    </div>
  );
};

export default DashboardPage;


