/**
 * CapsuleList Component
 * 
**/
import React, { useEffect } from "react";
import useStore from "../store/store";
import { CapsuleListItem } from "./CapsuleListItem";

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

  
};
