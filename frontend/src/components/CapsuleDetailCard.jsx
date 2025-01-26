/**
 * CapsuleCard Component
 * 
**/

import { formatDateTime }  from "../utils/date";

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
  const formattedCreatedAt = formatDateTime(new Date(createdAt), "yyyy-MM-dd HH:mm");
  const formattedOpenAt = formatDateTime(new Date(openAt), "yyyy-MM-dd HH:mm");

  return (
    <div>
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
      {/* Media-URL */}
      {mediaUrls.length > 0 && <img src={mediaUrls[0]} alt={title} />}
    </div>
  );
}