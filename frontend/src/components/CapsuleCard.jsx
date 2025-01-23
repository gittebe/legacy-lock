/**
 * CapsuleCard Component
 * 
**/

import { useNavigate } from "react-router-dom";
import { CreateCapsuleButton } from "../ui/CreateCapsuleButton";
import format from "date-fns";

export const CapsuleCard = ({ capsule }) => {
  const { title, id, message, media, recipients, createdAt, openAt } = capsule;
  const navigateToCapsule = useNavigate();

  const handleViewCapsule = () => {
    navigateToCapsule(`/capsules/${id}`);
  };
  export const formattedCreatedAt = format(new Date(createdAt), "yyyy-MM-dd HH:mm");
  export const formattedOpenAt = format(new Date(openAt), "yyyy-MM-dd HH:mm");

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
      <CreateCapsuleButton onClick={handleViewCapsule}>View Capsule</CreateCapsuleButton>
    </div>
  );
}
