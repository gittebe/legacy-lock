/**
 * CapsuleCard Component
 * 
**/

import { useNavigate } from "react-router-dom";
import { ViewCapsuleButton } from "../ui/ViewCapsuleButton";
import { formatDateTime }  from "../utils/date";

export const CapsuleCard = ({ capsule }) => {
  const {
    id,
    title,
    message,
    mediaUrls = [],
    createdAt = null,
    openAt = null,
    recipients = "No recipient available",
  } = capsule.data || {}; 

  console.log("Recipients data:", recipients);

  const navigateToCapsule = useNavigate();

  const handleViewCapsule = () => {
    if (capsule.id) {
      navigateToCapsule(`/capsules/${capsule._id}`);
    } else {
      console.error("Invalid capsule data:", capsule);
    }
  };

  console.log("Created At:", createdAt);
  console.log("Open At:", openAt);
  const formattedCreatedAt = formatDateTime(new Date(createdAt), "yyyy-MM-dd HH:mm");
  const formattedOpenAt = formatDateTime(new Date(openAt), "yyyy-MM-dd HH:mm");

  return (
    <div>
      <h5>Title: {title}</h5>
      <p>Message: {message}</p>
      <p>Recipients:</p>{recipients.map((recipient) => (
        <li key={recipient._id}>{recipient.username}</li>
      ))}
      <p>Created: {formattedCreatedAt}</p>
      <p>Unlocks on: {formattedOpenAt}</p>
      {/* Media-URL */}
      {mediaUrls.length > 0 && <img src={mediaUrls[0]} alt={title} />}
      <ViewCapsuleButton onClick={handleViewCapsule}>View Capsule</ViewCapsuleButton>
    </div>
  );
}
