import "./CapsuleCardImage.css";
import defaultImage from "../../public/default-image.png"; 

export const CapsuleCardImage = ({ mediaUrls, isBlurred, variant }) => {
  const containerClass = `capsule-card-image-container ${variant} ${
    isBlurred ? "blurred" : ""
  }`;

  // Use the default image when mediaUrls is empty or undefined
  const mediaUrl = mediaUrls && mediaUrls.length > 0 ? mediaUrls[0] : defaultImage;
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
          src={defaultImage}
          alt="Default Capsule"
        />
      )}
    </div>
  );
};
