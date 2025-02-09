import "./CapsuleCardText.css";

export const CapsuleCardText = ({ title, openAt }) => {
  return (
    <div className="capsule-card-text-container">
      <p className="title">{title}</p>
      <h4 className="release-date">Release date:</h4>
      <p className="date">{openAt}</p>
    </div>
  );
};