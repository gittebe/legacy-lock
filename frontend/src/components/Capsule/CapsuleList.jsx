/**
 * CapsuleList Component
 * 
 * Renders a list of capsules using the CapsuleCard component. It goes through the capsules array, and creates a new CapsuleCard component for each item.
 * 
 * Props:
 * - `capsules`: An array of capsule objects to display.
 *   - Each capsule object should have:
 *     - `id`: A unique identifier for the capsule.
 *     - Additional fields required by CapsuleCard like `title`, `message`, and `media`. 
 * - `key`: prop by React to give each capsule a unique identifier
 * 
 */

import React, { useEffect } from "react";
import useStore from "../../store/store";
import CapsuleCard from "./CapsuleCard";

const CapsuleList = () => {
  const { fetchCapsules, capsules, loading } = useStore((state) => ({
    fetchCapsules: state.fetchCapsules,
    capsules: state.capsules || { created: [], received: [] },
    loading: state.loading,
  }));

  useEffect(() => {
    console.warn("Fetching capsules triggered...");
    //fetchCapsules();
  }, []);

  if (loading) return <p>Loading capsules...</p>;

  if (!capsules.created.length && !capsules.received.length) {
    return <p>No capsules available.</p>;
  }

  return (
    <div>
      <h2>Created Capsules</h2>
      {capsules.created.map((capsule) => (
        <CapsuleCard key={capsule._id} capsule={capsule} />
      ))}

      <h2>Received Capsules</h2>
      {capsules.received.map((capsule) => (
        <CapsuleCard key={capsule._id} capsule={capsule} />
      ))}
    </div>
  );
};

export default CapsuleList;

