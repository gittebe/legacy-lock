import "./CapsuleCardText.css";

export const CapsuleCardText = ({title, openAt}) => {
  return(
    <div className="capsule-card-text-container">
      <h4 className="capsule-card-title">Titel:</h4>
      <p className="title">{title}</p>
      <h4 className="release-date">Release date: </h4>
      <p className="date">{openAt}</p>
    </div>
  )
}