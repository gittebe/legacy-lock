import React, { useEffect } from "react";
import useStore from "../store/store";
import { CapsuleCard } from "./CapsuleCard";
import "./CapsuleList.css";

export const CapsuleList = () => {
  const capsules = useStore((state) => state.capsules);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);
  const fetchCapsules = useStore((state) => state.fetchCapsules);

  useEffect(() => {
    console.log("CapsuleList useEffect: fetching capsules...");
    fetchCapsules();
  }, [fetchCapsules]);

  if (loading) {
    return <p>Loading capsules...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  // No capsules available
  if (
    (!capsules?.created?.length) &&
    (!capsules?.received?.length)
  ) {
    return <p>No capsules available.</p>;
  }

  // Render capsules
  return (
    <div>
    <div className="created-capsule-container">
      <h2 className="header-capsules">Created Capsules</h2>
      <div className="capsule-grid">
      {capsules.created.map((capsule) => {
        // Check if the capsule is valid and has a _id
        if (!capsule || !capsule._id) {
          console.error("Invalid capsule data (created):", capsule);
          return null; // Skip rendering invalid capsules
        }
        return <CapsuleCard key={capsule._id} capsule={capsule} />;
      })}
      </div>
    </div>
    
    <div>
      <h2 className="header-capsules">Received Capsules</h2>
      <div className="capsule-grid"></div>
      {capsules.received.map((capsule) => {
        // Check if the capsule is valid and has a _id
        if (!capsule || !capsule._id) {
          console.warn("Invalid capsule data (received):", capsule);
          return null; // Skip rendering invalid capsules
        }
        return <CapsuleCard key={capsule._id} capsule={capsule} />;
      })}
    </div>
  </div>
  );
}
