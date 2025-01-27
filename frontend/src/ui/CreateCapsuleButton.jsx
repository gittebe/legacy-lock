/**
 * Button component 
 * 
 * Customizable button component that can be used in any component. It takes in children, onClick, type, and className as props. 
 */

import "./CreateCapsuleButton.css";

export const CreateCapsuleButton = ({ onClick }) => {
  return (
    <div className="create-capsule-button-container">
      <button type="submit" className="create-capsule-button" onClick={onClick}>
        Create capsule
      </button>
    </div>
  );
};
