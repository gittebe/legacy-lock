import { useEffect } from "react";
import useStore from "../store/store";
import { GalleryImage } from "../ui/GalleryImage";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../utils/date";
import "./GallerySwiper.css";

export const GallerySwiper = () => {
  const capsules = useStore((state) => state.capsules);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);
  const fetchCapsules = useStore((state) => state.fetchCapsules);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCapsules();
  }, [fetchCapsules]);

  if (loading) {
    return <p>Loading capsules...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  if (!capsules?.created?.length && !capsules?.received?.length) {
    return <p>No capsules available.</p>;
  }

  return (
    <div className="collections-container">

      <div className="collections-section">
        <div className="collections-header">
          <h2 className="collections-title">Created Collections</h2>
          <button
            className="see-more-button"
            onClick={() => navigate("/created")}
          >
            See all
          </button>
        </div>
        <div className="collections-images">
          {capsules.created.slice(0, 3).map((capsule) => (
            <GalleryImage
              key={capsule._id}
              mediaUrls={capsule.mediaUrls}
              isBlurred={new Date() < new Date(capsule.openAt)}
            />
          ))}
        </div>
      </div>

      <div className="collections-section">
        <div className="collections-header">
          <h2 className="collections-title">Received Collections</h2>
          <button
            className="see-more-button"
            onClick={() => navigate("/received")}
          >
            See all
          </button>
        </div>
        <div className="collections-images">
          {capsules.received.slice(0, 3).map((capsule) => (
            <GalleryImage
              key={capsule._id}
              mediaUrls={capsule.mediaUrls}
              isBlurred={new Date() < new Date(capsule.openAt)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};