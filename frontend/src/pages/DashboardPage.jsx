/**
 * DashboardPage Component
 */

import React from "react";
import { Navigate } from "react-router-dom";
import useStore from "../store/store";
import { CapsuleList } from "../components/CapsuleList";
import { Header } from "../components/Header";

export const DashboardPage = () => {
  const user = useStore((state) => state.user)// Get the user's login status from Zustand store

  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
    <Header/>
    <div>
      <h1>Welcome, {user.username}!</h1>
      <h2>Your Capsules</h2>
      <CapsuleList />
    </div>
    </>
  );
};
