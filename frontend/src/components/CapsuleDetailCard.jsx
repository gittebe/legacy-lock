/**
 * CapsuleDetailsCard Component
 * Combines media and CapsuleCardImage functionality from CapsuleCard.
 */

import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../utils/date";
import { CapsuleCardImage } from "../ui/CapsuleCardImage";

export const CapsuleDetailCard = ({ capsule }) => {
  const {
    id,
    title,
    message,
    mediaUrls = [],
    createdAt = null,
    openAt = null,
    recipients = [],
  } = capsule.data || {};

  console.log("Recipients data:", recipients);
  console.log("Created At:", createdAt);
  console.log("Open At:", openAt);

  const navigateToCapsule = useNavigate();

  const handleViewCapsule = () => {
    navigateToCapsule(`/capsules/${id}`);
  };

  const isCapsuleOpen = openAt ? new Date() >= new Date(openAt) : false;
  const formattedCreatedAt = createdAt
    ? formatDateTime(new Date(createdAt), "yyyy-MM-dd HH:mm")
    : "Invalid date";
  const formattedOpenAt = openAt
    ? formatDateTime(new Date(openAt), "yyyy-MM-dd HH:mm")
    : "Invalid date";

  return (
    <div className="capsule-detail-card" onClick={handleViewCapsule}>
      <CapsuleCardImage mediaUrls={mediaUrls} isBlurred={!isCapsuleOpen} />
      <h5>Title: {title}</h5>
      <p>Message: {message}</p>
      <p>Recipients:</p>
      <ul>
        {Array.isArray(recipients) && recipients.length > 0 ? (
          recipients.map((recipient) => (
            <li key={recipient._id}>{recipient.username}</li>
          ))
        ) : (
          <li>No recipients available</li>
        )}
      </ul>
      <p>Created: {formattedCreatedAt}</p>
      <p>Unlocks on: {formattedOpenAt}</p>
    </div>
  );
};
