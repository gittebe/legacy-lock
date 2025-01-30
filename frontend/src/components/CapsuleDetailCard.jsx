import "./CapsuleDetailCard.css";

export const CapsuleDetailCard = ({ capsule }) => {
  const {
    title,
    message,
    mediaUrls = [],
    recipients = [],
  } = capsule.data || {};

  return (
    <div className="capsule-detail-card">
      <h2 className="section-header">Photos</h2>
      <div className="photos-container">
        {mediaUrls.length > 0 ? (
          mediaUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Capsule Photo ${index + 1}`}
              className="photo"
            />
          ))
        ) : (
          <p>No photos available</p>
        )}
      </div>

      <h2 className="section-header">Messages</h2>
      <div className="messages-container">
        {message ? (
          <div className="capsule-message">{message}</div>
        ) : (
          <p>No messages available</p>
        )}
      </div>
    </div>
  );
};
