import { ClockIcon } from "../ui/ClockIcon";
import { PlayButton } from "../ui/PlayButton";
import { CapsuleCardImage } from "../ui/CapsuleCardImage";
import "./LatestLocket.css";

export const LatestLocket = () => {
  return (
    <div className="latest-locket">
      <div className="locket-content">
        <p>Your latest locket is opening on</p>
        <div className="locket-date">
          <ClockIcon />
          <span>20.01.2025</span>
        </div>
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
