/**
 * CapsuleCard Component
 * 
**/

import { useNavigate } from "react-router-dom";
import { CreateCapsuleButton } from "../ui/CreateCapsuleButton";

export const CapsuleCard = ({ capsule }) => {
  const { title, id, message, media, recipients, createdAt, openAt } = capsule;
  const navigateToCapsule = useNavigate();

  capsule.recipients.forEach((recipient) =>
    console.log("Recipient:", recipient)
  );

  const handleViewCapsule = () => {
    navigateToCapsule(`/capsules/${id}`);
  };

  return (
    <div>
      <h5>Title: {title}</h5>
      <p>Capsule ID: {id}</p> {/* Capsule ID */}
      <p>Message: {message}</p>
      <p>Recipient: {capsule.recipients?.[0]?.username || "No recipient available"}</p>
      <p>Created: {createdAt}</p>
      <p>Unlock date: {openAt}</p>
      {/* Media-URL */}
      {media && <img src={media} alt={title} />}
      <CreateCapsuleButton onClick={handleViewCapsule}>View Capsule</CreateCapsuleButton>
    </div>
  );
}
