/**
 * CapsuleCard Component
 * 
**/

import { useNavigate } from "react-router-dom";
import { ViewCapsuleButton } from "../ui/ViewCapsuleButton";
import { formatDateTime }  from "../utils/date";
import "./CapsuleCard.css";
import { CapsuleCardText } from "../ui/CapsuleCardText";
import { CapsuleCardImage } from "../ui/CapsuleCardImage";

export const CapsuleCard = ({ capsule }) => {
  const { title, id, openAt, mediaUrls } = capsule;
  const navigateToCapsule = useNavigate();

  const handleViewCapsule = () => {
    navigateToCapsule(`/capsules/${id}`);
  };
   const isCapsuleOpen = openAt ? new Date() >= new Date(openAt) : false

  const formattedOpenAt = openAt
    ? formatDateTime(new Date(openAt), "yyyy-MM-dd HH:mm")
    : "Invalid date";

  return (
    <div className="capsule-card" onClick={handleViewCapsule}>
      {/* Übergabe des Arrays an das Medien-Rendering */}
      <CapsuleCardImage mediaUrls={mediaUrls} isBlurred={!isCapsuleOpen}/>
      <CapsuleCardText title={title} openAt={formattedOpenAt} />
    </div>
  );
};