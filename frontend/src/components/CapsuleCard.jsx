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
  const { title, id, openAt } = capsule;
  const navigateToCapsule = useNavigate();

  capsule.recipients.forEach((recipient) =>
    console.log("Recipient:", recipient)
  );

  const handleViewCapsule = () => {
    navigateToCapsule(`/capsules/${id}`);
  };

  const formattedOpenAt = openAt
    ? formatDateTime(new Date(openAt), "yyyy-MM-dd HH:mm")
    : "Invalid date";

  return (
    <div className="capsule-card" onClick={handleViewCapsule}>
      <CapsuleCardImage/>
      <CapsuleCardText title={title} openAt={formattedOpenAt}/>
    </div>
  );
}