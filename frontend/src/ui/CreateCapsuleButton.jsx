/**
 * Button component 
 * 
 * Customizable button component that can be used in any component. It takes in children, onClick, type, and className as props. 
 */

export const CreateCapsuleButton = ({ onClick }) => {
  return (
    <button type="submit" className="create-capsule-button" onClick={onClick}>
      Create capsule
    </button>
  );
};
