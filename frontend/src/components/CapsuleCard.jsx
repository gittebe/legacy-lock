/**
 * CapsuleCard Component
 * 
**/

import { useNavigate } from "react-router-dom";
import { CreateCapsuleButton } from "../ui/CreateCapsuleButton";

export const CapsuleCard = ({ capsule }) => {
  const { title, id, message, media, recipients, createdAt, openAt } = capsule;
  const navigateToCapsule = useNavigate();

  const handleViewCapsule = () => {
    navigateToCapsule(`/capsules/${id}`);
  };

  return (
    <div>
      <h5>Title: {title}</h5>
      <p>ID: {id}</p>
      <p>Message: {message}</p>
      <p>Recipients: {recipients}</p>
      <p>Created: {createdAt}</p>
      <p>Unlock date: {openAt}</p>
      {/* Media-URL */}
      {media && <img src={media} alt={title} />}
      <CreateCapsuleButton onClick={handleViewCapsule}>View Capsule</CreateCapsuleButton>
    </div>
  );
}
