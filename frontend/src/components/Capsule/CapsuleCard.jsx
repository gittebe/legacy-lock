/**
 * CapsuleCard Component
 * 
 * Displays the details of a single capsule, including its title, ID, message, and media. 
 * 
 * Uses `useNavigate` from React Router to handle navigation to the detailed view.
 * 
 * Features:
 * - Displays capsule information (title, ID, message, media).
 * - Navigates to the detailed view of the capsule when the button is clicked.
 * 
 * Props:
 * - `capsule`: The capsule data to display.
 *   - `id`: A unique identifier for the capsule (used for navigation).
 *   - `title`: The title of the capsule.
 *   - `message`: The message associated with the capsule.
 *   - `media`: A URL to the media file (e.g., image or video) for the capsule.
 *
**/

import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const CapsuleCard = ({ capsule }) => {
  const { title, id, message, media } = capsule;
  const navigateToCapsule = useNavigate();

  const handleViewCapsule = () => {
    navigateToCapsule(`/capsules/${id}`);
  };

  return (
    <div>
      <h5>{title}</h5>
      <p>{id}</p>
      <p>{message}</p>
      <img src={media} alt={title} />
      <Button onClick={handleViewCapsule}>View Capsule</Button>
    </div>
  );
}

export default CapsuleCard;
