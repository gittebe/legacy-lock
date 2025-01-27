import "./GalleryImage.css"

export const GalleryImage = ({ mediaUrls, isBlurred }) => {
  if (!mediaUrls || mediaUrls.length === 0) {
    return (
      <div className="gallery-image-container">
        <img
          className={`gallery-image ${isBlurred ? "blurred" : ""}`}
          src="../../capsule-image.png"
          alt="Capsule Image in Gallery Style"
        />
      </div>
    );
  }

  const mediaUrl = mediaUrls[0];

  const isImage = mediaUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i);
  const isVideo = mediaUrl.match(/\.(mp4|webm|ogg)$/i);

  return (
    <div className={`gallery-image-container ${isBlurred ? "blurred" : ""}`}>
      {isImage && (
        <img
          className={`gallery-image ${isBlurred ? "blurred" : ""}`}
          src={mediaUrl}
          alt="Capsule"
        />
      )}
      {isVideo && (
        <video
          className={`gallery-video ${isBlurred ? "blurred" : ""}`}
          controls={!isBlurred}
        >
          <source src={mediaUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {!isImage && !isVideo && (
        <img
          className={`gallery-image ${isBlurred ? "blurred" : ""}`}
          src="../../capsule-image.png"
          alt="Capsule Image in Gallery Style"
        />
      )}
    </div>
  );
};