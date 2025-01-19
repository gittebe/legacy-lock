import CapsuleCard from 'components/Capsule/CapsuleCard';

const CapsuleList = ({ capsules }) => {
if (!capsules) {
    return <p>No capsules available</p>;
  }

  return (
    <div>
      {capsules.map(capsule => (
        <CapsuleCard key={capsule.id} capsule={capsule} />
      ))}
    </div>
  );
};

export default CapsuleList;
