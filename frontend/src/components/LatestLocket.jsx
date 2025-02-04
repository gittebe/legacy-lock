import { useState, useEffect, useMemo } from "react";
import { PlayButton } from "../ui/PlayButton";
import { CapsuleCardImage } from "../ui/CapsuleCardImage";
import { WarningPopup } from "./WarningPopup"; 
import useStore from "../store/store";
import "./LatestLocket.css";
import { useNavigate } from "react-router-dom";
import { useCapsuleStatus } from "../hooks/useCapsuleStatus";
import { LocketCountdown } from "./LocketCountdown"; 
import { useConfetti } from "../hooks/useConfetti"; 
import Confetti from "react-confetti"; 

export const LatestLocket = () => {
  const [nextCapsule, setNextCapsule] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false); 
  const capsules = useStore((state) => state.capsules?.created) || [];
  const navigateToCapsule = useNavigate();

  // **🧠 useMemo**
  const futureCapsules = useMemo(() => {
    return capsules
      .filter((locket) => locket?.openAt && new Date(locket.openAt) > new Date()) 
      .sort((a, b) => new Date(a.openAt) - new Date(b.openAt)); 
  }, [capsules]);

  useEffect(() => {
    if (isWaiting || !futureCapsules.length) {
      return;
    }
    setNextCapsule(futureCapsules[0]);
  }, [futureCapsules, isWaiting]);

  const { capsuleId, isCapsuleOpen, timeLeft } = useCapsuleStatus(nextCapsule);

  // 🎉 Confetti hook
  const { showConfetti, width, height, setHasPlayedConfetti } = useConfetti(isCapsuleOpen);

  // Reset confetti before next capsule countdown starts
  useEffect(() => {
    setHasPlayedConfetti(false);
  }, [nextCapsule]);

  useEffect(() => {
    if (!nextCapsule || !isCapsuleOpen) return;

    setIsWaiting(true);
    const timer = setTimeout(() => {
      setIsWaiting(false);
    }, 600000); // 10 minutes

    return () => clearTimeout(timer);
  }, [nextCapsule, isCapsuleOpen]);

  const handlePlayButtonClick = () => {
    if (!capsuleId || !nextCapsule) return;

    if (isCapsuleOpen) {
      navigateToCapsule(`/capsules/${capsuleId}`);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <>
      {/* 🎉 CONFETTI */}
      {showConfetti && <Confetti width={width} height={height} />}

      <div className="latest-locket">
        <LocketCountdown nextLocket={nextCapsule} timeLeft={timeLeft} />
        <PlayButton onClick={handlePlayButtonClick} />

        <div className="locket-images">
          <CapsuleCardImage mediaUrls={["https://via.placeholder.com/150"]} isBlurred={false} variant="tilted" />
          <CapsuleCardImage mediaUrls={["https://via.placeholder.com/150"]} isBlurred={false} variant="tilted" />
          <CapsuleCardImage mediaUrls={["https://via.placeholder.com/150"]} isBlurred={false} variant="tilted" />
        </div>
      </div>

      {/* ⚠️ WarningPopup - Shows an alert if the capsule is not yet open */}
      {showWarning && (
        <WarningPopup onClose={() => setShowWarning(false)} />
      )}
    </>
  );
};

