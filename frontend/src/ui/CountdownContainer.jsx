import { useState, useEffect } from "react";
import useStore from "../store/store";
import "./CountdownContainer.css";

export const CountdownContainer = () => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [nextCapsule, setNextCapsule] = useState(null);

  const capsules = useStore((state) => state.capsules.created);

  useEffect(() => {
    if (capsules.length === 0) {
      return;
    }

    // Find the next capsule that is not yet open
    const sortedCapsules = capsules.filter((capsule) => capsule.openAt).sort((a, b) => new Date(a.openAt) - new Date(b.openAt));
    const nextCapsule = sortedCapsules.find((capsule) => new Date(capsule.openAt) > new Date());

    if (!nextCapsule) {
      return;
    }

    setNextCapsule(nextCapsule);
    
    // Calculate time left until the next capsule opens
    const interval = setInterval(() => {
      const currentTime = new Date();
      const targetTime = new Date(nextCapsule.openAt);
      const diff = targetTime - currentTime;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft("The capsule is now open!");
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    // Clean up interval on component unmount or when the next capsule changes
    return () => clearInterval(interval);
  }, [capsules]); // Re-run if capsules change

  return (
    <div className="countdown-container">
      {nextCapsule ? (
        <>
          <p className="countdown-text">Your latest locket is opening on</p> 
          <p className="countdown-text">{new Date(nextCapsule.openAt).toLocaleString()}</p>
          <p className="countdown-text" aria-live="polite">Time left: {timeLeft}</p>
        </>
      ) : (
        <p className="countdown-text" aria-live="polite">No upcoming capsules</p>
      )}
    </div>
  );
};