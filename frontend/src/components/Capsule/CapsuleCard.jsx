
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
