import { useState, useEffect } from "react";

export const useCapsuleStatus = (capsule) => {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  if (!capsule) return { capsuleId: null, isCapsuleOpen: false, timeLeft };

  const capsuleId = capsule._id || capsule.id;
  const isCapsuleOpen = new Date() >= new Date(capsule.openAt);

  useEffect(() => {
    if (!capsule.openAt) return;

    const interval = setInterval(() => {
      const currentTime = new Date();
      const targetTime = new Date(capsule.openAt);
      const diff = targetTime.getTime() - currentTime.getTime();

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

    return () => clearInterval(interval);
  }, [capsule]);

  return { capsuleId, isCapsuleOpen, timeLeft };
};
