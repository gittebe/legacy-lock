
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';

const CapsuleCard = ({ capsule }) => {
  const { title, message, id } = capsule;
  const navigateToCapsule = useNavigate();

  const handleViewCapsule = () => {
    navigateToCapsule(`/capsules/${id}`);
  };

  return (
    <div>
        <h5>{title}</h5>
        <p>{id}</p>
        <p>{message}</p>
        <Button onClick={handleViewCapsule}>View Capsule</Button>
      </div>
    </div>
  );
}

export default CapsuleCard;
