import "./OkButton.css";

export const OkButton = ({ onClick }) => {
  return (
    <button type="submit" className="ok-button" onClick={onClick}>
      Ok
    </button>
  );
};