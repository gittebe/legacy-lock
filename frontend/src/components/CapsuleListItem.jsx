/**
 * CapsuleListItem component
 */

import { useNavigate } from "react-router-dom";
import { ViewCapsuleButton } from "../ui/ViewCapsuleButton";
import { formatDateTime } from "../utils/date";

export const CapsuleListItem = ({ capsule }) => {
  const { title, id, message, media, recipients = [], createdAt, openAt } = capsule; // Destructure the capsule data
  const navigateToCapsule = useNavigate();

  console.log("Capsule data in CapsuleListItem:", capsule);

  const handleViewCapsule = () => {
    navigateToCapsule(`/capsules/${id}`);
  };

  const formattedCreatedAt = createdAt
    ? formatDateTime(new Date(createdAt), "yyyy-MM-dd HH:mm")
    : "Unknown date";

  const formattedOpenAt = openAt
    ? formatDateTime(new Date(openAt), "yyyy-MM-dd HH:mm")
    : "Unknown date";

  return (
    <div>
      <h5>Title: {title}</h5>
      <p>Capsule ID: {id}</p>
      <p>Message: {message}</p>
      <p>Recipients:</p>
      <ul>
        {Array.isArray(recipients) && recipients.length > 0 ? (
          recipients.map((recipient) => (
            <li key={recipient._id}>{recipient.username}</li>
          ))
        ) : (
          <li>No recipient available</li>
        )}
      </ul>
      <p>Created: {formattedCreatedAt}</p>
      <p>Unlocks on: {formattedOpenAt}</p>
      {media && <img src={media} alt={title} />}
      <ViewCapsuleButton onClick={handleViewCapsule}>View Capsule</ViewCapsuleButton>
    </div>
  );
};
