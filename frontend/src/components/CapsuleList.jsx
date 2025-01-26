/**
 * CapsuleList Component
 * 
**/
import React, { useEffect } from "react";
import useStore from "../store/store";
import { CapsuleCard } from "./CapsuleCard";

export const CapsuleList = () => {
  console.log("CapsuleList rendered");
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
      {/* Created Capsules */}
      <h2>Created by You</h2>
      {capsules.created.map((capsule) => {
        if (!capsule || !capsule._id) {
          console.error("Invalid capsule data:", capsule);
          return null;
        }
        return <CapsuleCard key={capsule._id} capsule={capsule} />;
      })}

      {/* Received Capsules */}
      <h2>Received by You</h2>
      {capsules.received.map((capsule) => {
        if (!capsule || !capsule._id) {
          console.warn("Capsule missing _id:", capsule);
          return null;
        }
        return <CapsuleCard key={capsule._id} capsule={capsule} />;
      })}
    </div>
  );
};
