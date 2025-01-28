import { CapsuleCardImage } from "../ui/CapsuleCardImage";
import "./DashboardReceivedList.css";

export const DashboardReceivedList = () => {
  return (
    <div className="collections-section">
      <div className="collections-header">
        <h2 className="collections-title">Received Collections</h2>
        <button className="see-more-button" onClick={() => alert("See More!")}>
          See all
        </button>
      </div>
      <div className="collections-images">
        <CapsuleCardImage
          mediaUrls={["https://via.placeholder.com/150"]}
          isBlurred={false}
        />
        <CapsuleCardImage
          mediaUrls={["https://via.placeholder.com/150"]}
          isBlurred={false}
        />
        <CapsuleCardImage
          mediaUrls={["https://via.placeholder.com/150"]}
          isBlurred={false}
        />
      </div>
    </div>
  );
};
