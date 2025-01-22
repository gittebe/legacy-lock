/**
 * CapsuleCard Component
 * 
**/

import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const CapsuleCard = ({ capsule }) => {
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
      <Button onClick={handleViewCapsule}>View Capsule</Button>
    </div>
  );
}

export default CapsuleCard;