import { useState, useEffect } from "react";

export const useCapsuleStatus = (capsule) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isCapsuleOpen, setIsCapsuleOpen] = useState(false);

  const capsuleId = capsule?._id || capsule?.id || null;

  useEffect(() => {
    if (!capsule || !capsule.openAt) return;

    const date = new Date(capsule.openAt);

    const targetTime = date.getTime();
    if (isNaN(targetTime)) {
      return;
    }

    const interval = setInterval(() => {
      const currentTime = Date.now();
      
      const diff = targetTime - currentTime;

      if (diff <= 0) {
        clearInterval(interval);
        setIsCapsuleOpen(true);
        setTimeLeft("The locket is now open!");
      } else {
        setIsCapsuleOpen(false);
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