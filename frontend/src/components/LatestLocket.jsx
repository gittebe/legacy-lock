import { useState, useEffect } from "react";
import { ClockIcon } from "../ui/ClockIcon";
import { PlayButton } from "../ui/PlayButton";
import { CapsuleCardImage } from "../ui/CapsuleCardImage";
import { WarningPopup } from "./WarningPopup";
import useStore from "../store/store";
import "./LatestLocket.css";
import { useNavigate } from "react-router-dom";
import { useCapsuleStatus } from "../hooks/useCapsuleStatus";

export const LatestLocket = () => {
  const [showWarning, setShowWarning] = useState(false);
  const capsules = useStore((state) => state.capsules.created) || [];
  const navigateToCapsule = useNavigate();
  
  const nextCapsule = capsules
    .filter((capsule) => capsule?.openAt)
    .sort((a, b) => new Date(a.openAt).getTime() - new Date(b.openAt).getTime())
    .find((capsule) => new Date(capsule.openAt) > new Date()) || null;

  const { capsuleId, isCapsuleOpen, timeLeft } = useCapsuleStatus(nextCapsule);

  const handlePlayButtonClick = () => {
    if (!capsuleId) return;

    if (isCapsuleOpen) {
      navigateToCapsule(`/capsules/${capsuleId}`);
    } else {
      setShowWarning(true);
    }
  }

  return (
    <>
    <div className="latest-locket">
      <div className="locket-content">
        {nextCapsule ? (
          <>
            <p>Your latest locket is opening on</p>
            <div className="locket-date">
              <ClockIcon />
              <span>{new Date(nextCapsule.openAt).toLocaleString()}</span>
            </div>
            <p className="countdown-text">Time left: {timeLeft}</p>
          </>
        ) : (
          <p className="countdown-text">No upcoming capsules</p>
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
    { showWarning && <WarningPopup onClose={() => setShowWarning(false)} /> }
  </>
  );
};
