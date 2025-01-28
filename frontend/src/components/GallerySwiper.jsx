import { useEffect } from "react";
import useStore from "../store/store";
import { GalleryImage } from "../ui/GalleryImage";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../utils/date";
import "./GallerySwiper.css"

export const GallerySwiper = () => {
  const capsules = useStore((state) => state.capsules);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);
  const fetchCapsules = useStore((state) => state.fetchCapsules);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("CapsuleList useEffect: fetching capsules...");
    fetchCapsules();
  }, [fetchCapsules]);

  if (loading) {
    return <p>Loading capsules...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  // No capsules available
  if (
    (!capsules?.created?.length) &&
    (!capsules?.received?.length)
  ) {
    return <p>No capsules available.</p>;
  }

  // Render capsules
  return (
    <div className="gallery">
      <div className="collection-text">
        <h2>Created Collections</h2>
        <p
        className="see-all"
        onClick={() => navigate("/capsules")}
        >
          See all</p>
      </div>
    <div className="gallery-container">
      {capsules.created.slice(0, 3).map((capsule) => {
        console.log("Capsule data:", capsule);
        if (!capsule || !capsule._id) {
          console.error("Invalid capsule data:", capsule);
          return null;
        }

        // Check if the capsule is open
        const isCapsuleOpen = capsule.openAt ? new Date() >= new Date(capsule.openAt) : false;
        const formattedOpenAt = capsule.openAt
          ? formatDateTime(new Date(capsule.openAt), "yyyy-MM-dd HH:mm")
          : "Invalid date";

        // Pass handleViewCapsule and capsule data to GalleryImage
        return (
          <div
            key={capsule._id}
          >
            <GalleryImage  mediaUrls={capsule.mediaUrls} isBlurred={!isCapsuleOpen} />
          </div>
        );
      })}
    </div>
    <div>
    <div className="collection-text">
        <h2>Received Collections</h2>
        <p
        className="see-all"
        onClick={() => navigate("/capsules")}
        >
          See all</p>
      </div>
      <div className="gallery-container">
      {capsules.received.slice(0, 3).map((capsule) => {
        if (!capsule || !capsule._id) {
          console.warn("Capsule missing _id:", capsule);
          return null;
        }

        // Check if the capsule is open
        const isCapsuleOpen = capsule.openAt ? new Date() >= new Date(capsule.openAt) : false;
        const formattedOpenAt = capsule.openAt
          ? formatDateTime(new Date(capsule.openAt), "yyyy-MM-dd HH:mm")
          : "Invalid date";

        return (
          <div
            key={capsule._id}
          >
            <GalleryImage mediaUrls={capsule.mediaUrls} isBlurred={!isCapsuleOpen} />
          </div>
        );
      })}
    </div>
    </div>
    </div>
  );
};