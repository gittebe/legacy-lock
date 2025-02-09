//**************************************************************************
// 
// Component used for the create capsule button in the CapsuleForm component
//  
//**************************************************************************
import "./CreateCapsuleButton.css";

export const CreateCapsuleButton = ({ onClick, children }) => {
  return (
    <div className="create-capsule-button-container">
      <button 
        type="submit" 
        className="create-capsule-button" 
        onClick={onClick}
        aria-label="Create Capsule"
        >
        {children}
      </button>
    </div>
  );
};