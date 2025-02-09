import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CapsuleCardText } from "../ui/CapsuleCardText";
import { CapsuleCardImage } from "../ui/CapsuleCardImage";
import { formatDateTime } from "../utils/date";
import { WarningPopup } from "./WarningPopup";
import "./CapsuleCard.css";

export const CapsuleCard = ({ capsule }) => {
  const { title, _id: id, openAt, mediaUrls } = capsule;
  const navigateToCapsule = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const isCapsuleOpen = openAt ? new Date().getTime() >= new Date(openAt).getTime() : false;
  const formattedOpenAt = openAt ? formatDateTime(openAt) : "Invalid date";

  const handleViewCapsule = () => {
    if (isCapsuleOpen) {
      navigateToCapsule(`/capsules/${id}`);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <>
      <div className="capsule-card" onClick={handleViewCapsule}>
        <CapsuleCardImage mediaUrls={mediaUrls} isBlurred={!isCapsuleOpen} />
        <CapsuleCardText title={title} openAt={formattedOpenAt} />
      </div>
      
      {showWarning && <WarningPopup onClose={() => setShowWarning(false)} />}
    </>
  );
};