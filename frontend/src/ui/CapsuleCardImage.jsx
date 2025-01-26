// import "./CapsuleCardImage.css"

// export const CapsuleCardImage = ({ mediaUrls, isBlurred }) => {
  
//   if (!mediaUrls || mediaUrls.length === 0) {
//     // if there is no media then it shows a fallback img
//     return (
//       <div className="capsule-card-image-container">
//         <img className="capsule-card-image" src="../../capsule-image.png" alt="Capsule" />
//       </div>
//     );
//   }
  
//   const mediaUrl = mediaUrls[0];
  
//   // Check if url is an image or a video
//   const isImage = mediaUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i);
//   const isVideo = mediaUrl.match(/\.(mp4|webm|ogg)$/i);
  
//   return (
//     <div className="capsule-card-image-container">
//       {isImage && <img className="capsule-card-image" src={mediaUrl} alt="Capsule" />}
//       {isVideo && (
//         <video className="capsule-card-video" controls>
//           <source src={mediaUrl} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       )}
//       {!isImage && !isVideo && (
//         <img className="capsule-card-image" src={fallbackImage} alt="Capsule" />
//       )}
//     </div>
//   );
// };
  
import "./CapsuleCardImage.css";

export const CapsuleCardImage = ({ mediaUrls, isBlurred }) => {
  if (!mediaUrls || mediaUrls.length === 0) {
    return (
      <div className="capsule-card-image-container">
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
    <div className={`capsule-card-image-container ${isBlurred ? "blurred" : ""}`}>
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
