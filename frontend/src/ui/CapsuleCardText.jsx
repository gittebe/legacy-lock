import "./CapsuleCardText.css";

export const CapsuleCardText = ({title, openAt}) => {
  return(
    <div>
      <h4>Titel:</h4>
      <p>{title}</p>
      <h4>Release date: </h4>
      <p>{openAt}</p>
    </div>
  )
}