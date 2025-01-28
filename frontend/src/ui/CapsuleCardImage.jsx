import "./CapsuleCardImage.css";

export const CapsuleCardImage = ({ mediaUrls, isBlurred, variant }) => {
  const containerClass = `capsule-card-image-container ${variant} ${
    isBlurred ? "blurred" : ""
  }`;

  if (!mediaUrls || mediaUrls.length === 0) {
    return (
      <div className={containerClass}>
        <img
          className={`capsule-card-image ${isBlurred ? "blurred" : ""}`}
          src="../../capsule-image.png"
          alt="Capsule"
        />
      </div>
    );
  }

  const mediaUrl = mediaUrls[0];
  const isImage = mediaUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i);
  const isVideo = mediaUrl.match(/\.(mp4|webm|ogg)$/i);

  return (
    <div className={containerClass}>
      {isImage && (
        <img
          className={`capsule-card-image ${isBlurred ? "blurred" : ""}`}
          src={mediaUrl}
          alt="Capsule"
        />
      )}
      {isVideo && (
        <video
          className={`capsule-card-video ${isBlurred ? "blurred" : ""}`}
          controls={!isBlurred}
        >
          <source src={mediaUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {!isImage && !isVideo && (
        <img
          className={`capsule-card-image ${isBlurred ? "blurred" : ""}`}
          src="../../capsule-image.png"
          alt="Capsule"
        />
      )}
    </div>
  );
};
