import { useState, useEffect } from "react";
import { ClockIcon } from "../ui/ClockIcon";
import { PlayButton } from "../ui/PlayButton";
import { CapsuleCardImage } from "../ui/CapsuleCardImage";
import useStore from "../store/store";
import "./LatestLocket.css";

export const LatestLocket = () => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [nextCapsule, setNextCapsule] = useState(null);

  const capsules = useStore((state) => state.capsules.created);

  useEffect(() => {
    if (capsules.length === 0) {
      return;
    }

    const sortedCapsules = capsules
      .filter((capsule) => capsule.openAt)
      .sort((a, b) => new Date(a.openAt) - new Date(b.openAt));
    const nextCapsule = sortedCapsules.find(
      (capsule) => new Date(capsule.openAt) > new Date()
    );

    if (!nextCapsule) {
      return;
    }

    setNextCapsule(nextCapsule);

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

    return () => clearInterval(interval);
  }, [capsules]);

  return (
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
      <PlayButton onClick={() => alert("Play Locket!")} />
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
  );
};
