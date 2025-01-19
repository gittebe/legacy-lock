/**
 * CapsuleList Component
 * 
 * Renders a list of capsules using the CapsuleCard component. It goes through the capsules array, and creates a new CapsuleCard component for each item.
 * 
 * Props:
 * - capsules: An array of capsule objects to display.
 *   - Each capsule object should have:
 *     - id: A unique identifier for the capsule.
 *     - Additional fields required by CapsuleCard like title, message, and media. 
 * - key: prop by React to give each capsule a unique identifier
 * 
 */

import CapsuleCard from "./CapsuleCard";

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
