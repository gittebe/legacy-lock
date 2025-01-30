import { useState, useEffect, useMemo } from "react";
import { ClockIcon } from "../ui/ClockIcon";
import { PlayButton } from "../ui/PlayButton";
import { CapsuleCardImage } from "../ui/CapsuleCardImage";
import { WarningPopup } from "./WarningPopup"; 
import useStore from "../store/store";
import "./LatestLocket.css";
import { useNavigate } from "react-router-dom";
import { useCapsuleStatus } from "../hooks/useCapsuleStatus";

export const LatestLocket = () => {
  const [nextCapsule, setNextCapsule] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false); 
  const capsules = useStore((state) => state.capsules?.created) || [];
  const navigateToCapsule = useNavigate();

  /**
   * useMemo stores the filtered and sorted capsule list to avoid recalculations on every render.
   * - Filters out only future capsules (openAt > now)
   * - Sorts capsules in ascending order (soonest first)
   */
  const futureCapsules = useMemo(() => {
    return capsules
      .filter((locket) => locket?.openAt && new Date(locket.openAt) > new Date()) 
      .sort((a, b) => new Date(a.openAt) - new Date(b.openAt)); 
  }, [capsules]);

  // Pick the next capsule to be opened (only if we are not in the 10-minute waiting)
  useEffect(() => {
    if (isWaiting || !futureCapsules.length) {
      return;
    }
    setNextCapsule(futureCapsules[0]);
  }, [futureCapsules, isWaiting]);

  // Use countdown hook for timeLeft and isCapsuleOpen on nextCapsule
  const { capsuleId, isCapsuleOpen, timeLeft } = useCapsuleStatus(nextCapsule);

  // When capsule is open, wait 10 minutes before showing the next one
  useEffect(() => {
    if (!nextCapsule || !isCapsuleOpen) return;

    setIsWaiting(true);
    const timer = setTimeout(() => {
      setIsWaiting(false);
    }, 600000); // 10 minutes

    return () => clearTimeout(timer);
  }, [nextCapsule, isCapsuleOpen]);

  // Click Play button and verify that the capsule has an id and that there is a next capsule, otherwise nothing happens. 
  const handlePlayButtonClick = () => {
    if (!capsuleId || !nextCapsule) return;

    if (isCapsuleOpen) {
      // Navigate to the capsule
      navigateToCapsule(`/capsules/${capsuleId}`);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <>
      <div className="latest-locket">
        <div className="locket-content">
          {/* If there is a capsule to open */}
          {nextCapsule ? (
            <>
              <p>Your latest locket is opening on</p>
              <div className="locket-date">
                <ClockIcon />
                <span>{new Date(nextCapsule.openAt).toLocaleString()}</span>
              </div>
              <p className="countdown-text">{timeLeft}</p>
            </>
          ) : (
            // No more lockets
            <p className="countdown-text">No upcoming lockets</p>
          )}
        </div>

        <PlayButton onClick={handlePlayButtonClick} />

        <div className="locket-images">
          <CapsuleCardImage
            mediaUrls={["https://via.placeholder.com/150"]}
            isBlurred={false}
            variant="tilted"
          />
          <CapsuleCardImage
            mediaUrls={["https://via.placeholder.com/150"]}
            isBlurred={false}
            variant="tilted"
          />
          <CapsuleCardImage
            mediaUrls={["https://via.placeholder.com/150"]}
            isBlurred={false}
            variant="tilted"
          />
        </div>
      </div>

      {/* Warning */}
      {showWarning && (
        <WarningPopup onClose={() => setShowWarning(false)} />
      )}
    </>
  );
};

