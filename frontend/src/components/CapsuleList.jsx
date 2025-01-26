/**
 * CapsuleList Component
 * 
**/
import React, { useEffect } from "react";
import useStore from "../store/store";
import { CapsuleCard } from "./CapsuleCard";

export const CapsuleList = ({ filter }) => {
  console.log("CapsuleList rendered with filter:", filter);

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

  // Filter capsules

  let filteredCapsules = [];
  if (!filter) {
    filteredCapsules = [
      ...(capsules?.created || []),
      ...(capsules?.received || []),
    ];
  } else if (filter === "created") {
    filteredCapsules = capsules?.created || [];
  } else if (filter === "received") {
    filteredCapsules = capsules?.received || [];
  } else if (filter === "recent") {
    const allCapsules = [
      ...(capsules?.created || []),
      ...(capsules?.received || []),
    ];
    filteredCapsules = allCapsules
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
}

if (!filteredCapsules.length) {
  return <p>No capsules available.</p>;
}
};
