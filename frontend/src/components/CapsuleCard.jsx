/**
 * CapsuleCard Component
 * 
**/

import { useNavigate } from "react-router-dom";
import { CapsuleCardButton } from "../ui/CapsuleCardButton";
import { formatDateTime }  from "/utils/date";

export const CapsuleCard = ({ capsule }) => {
  const { title, id, message, media, recipients, createdAt, openAt } = capsule;
  const navigateToCapsule = useNavigate();

  const handleViewCapsule = () => {
    navigateToCapsule(`/capsules/${id}`);
  };

  const formattedCreatedAt = formatDateTime(new Date(createdAt), "yyyy-MM-dd HH:mm");
  const formattedOpenAt = formatDateTime(new Date(openAt), "yyyy-MM-dd HH:mm");

  return (
    <div>
      <h5>Title: {title}</h5>
      <p>ID: {id}</p>
      <p>Message: {message}</p>
      <p>Recipients: {recipients}</p>
      <p>Created: {formattedCreatedAt}</p>
      <p>Unlocks on: {formattedOpenAt}</p>
      {/* Media-URL */}
      {media && <img src={media} alt={title} />}
      <CapsuleCardButton onClick={handleViewCapsule}>View Capsule</CapsuleCardButton>
    </div>
  );
}
