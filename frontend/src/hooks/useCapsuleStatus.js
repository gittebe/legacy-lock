import { useState, useEffect } from "react";

export const useCapsuleStatus = (capsule) => {

  const [timeLeft, setTimeLeft] = useState(null);

  const capsuleId = capsule?._id || capsule?.id || null;
  const isCapsuleOpen = capsule ? new Date() >= new Date(capsule.openAt) : false;

  useEffect(() => {
    if (!capsule || !capsule.openAt) return;

    const interval = setInterval(() => {
      const currentTime = new Date();
      const targetTime = new Date(capsule.openAt);
      const diff = targetTime - currentTime;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft("The locket is now open!");
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [capsule]);

  return { capsuleId, isCapsuleOpen, timeLeft };
};
