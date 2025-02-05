import { useState, useEffect } from "react";

export const useConfetti = (isCapsuleOpen) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [hasPlayedConfetti, setHasPlayedConfetti] = useState(false);

  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    if (isCapsuleOpen && !hasPlayedConfetti) {
      setShowConfetti(true);
      setHasPlayedConfetti(true);
      setTimeout(() => setShowConfetti(false), 6000); // 6 seconds
    }
  }, [isCapsuleOpen, hasPlayedConfetti]);

  return { showConfetti, width, height, setHasPlayedConfetti };
};
