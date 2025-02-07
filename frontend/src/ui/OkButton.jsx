import "./OkButton.css";

export const OkButton = ({ onClick }) => {
  return (
    <button 
    type="submit" 
    className="ok-button" 
    onClick={onClick}
    aria-label="Confirm action"
    >
      Ok
    </button>
  );
};