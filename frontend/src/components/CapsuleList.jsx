import React, { useEffect, useState } from "react";
import useStore from "../store/store";
import { CapsuleCard } from "./CapsuleCard";
import { ArrowLeftIcon } from "../ui/ArrowLeftIcon";
import { CreateCapsule } from "./CreateCapsule";
import { FAB } from "../ui/FAB";
import "./CapsuleList.css";

export const CapsuleList = () => {
  const capsules = useStore((state) => state.capsules);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);
  const fetchCapsules = useStore((state) => state.fetchCapsules);
  const [isCreateCapsuleOpen, setCreateCapsuleOpen] = useState(false);

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

  if (!capsules?.created?.length && !capsules?.received?.length) {
    return <p>No capsules available.</p>;
  }

  return (
    <div className="scroll-container">
      <ArrowLeftIcon />
      <div className="created-capsule-container">
        <h2 className="header-capsules">Created Collections</h2>
        <div className="capsule-grid">
          {capsules.created.map((capsule) => {
            if (!capsule || !capsule._id) {
              console.error("Invalid capsule data (created):", capsule);
              return null;
            }
            return <CapsuleCard key={capsule._id} capsule={capsule} />;
          })}
        </div>
      </div>
      <div className="received-capsule-container">
        <h2 className="header-capsules">Received Collections</h2>
        <div className="capsule-grid">
          {capsules.received.map((capsule) => {
            if (!capsule || !capsule._id) {
              console.warn("Invalid capsule data (received):", capsule);
              return null;
            }
            return <CapsuleCard key={capsule._id} capsule={capsule} />;
          })}
        </div>
      </div>
      <FAB onClick={() => setCreateCapsuleOpen(true)} />
      <CreateCapsule
        isOpen={isCreateCapsuleOpen}
        onClose={() => setCreateCapsuleOpen(false)}
      />
    </div>
  );
};
