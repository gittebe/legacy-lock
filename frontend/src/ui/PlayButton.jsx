import "./PlayButton.css";

export const PlayButton = ({ onClick }) => {
  return (
    <div className="play-button-wrapper" onClick={onClick}>
      <img className="play-icon" src="../../play-button.png" alt="Play" />
    </div>
  );
};
