// import "./CountdownContainer.css";

// export const CountdownContainer = () => {
//   return(
//     <div className="countdown-container">
//       <p>your latest locket is opening on</p>
//     </div>
//   )
// }

import { useState, useEffect } from "react";
import useStore from "../store/store"; // assuming you are using this for your capsules state
import "./CountdownContainer.css";

export const CountdownContainer = () => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [nextCapsule, setNextCapsule] = useState(null);

  const capsules = useStore((state) => state.capsules.created); // Get the created capsules from store

  useEffect(() => {
    if (capsules.length === 0) {
      return; // If no capsules exist, don't start the countdown
    }

    // Find the next capsule that is not yet open
    const sortedCapsules = capsules.filter((capsule) => capsule.openAt).sort((a, b) => new Date(a.openAt) - new Date(b.openAt));
    const nextCapsule = sortedCapsules.find((capsule) => new Date(capsule.openAt) > new Date());

    if (!nextCapsule) {
      return; // No upcoming capsules
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
          <p>Your latest locket is opening on {new Date(nextCapsule.openAt).toLocaleString()}</p>
          <p>Time left: {timeLeft}</p>
        </>
      ) : (
        <p>No upcoming capsules</p>
      )}
    </div>
  );
};
