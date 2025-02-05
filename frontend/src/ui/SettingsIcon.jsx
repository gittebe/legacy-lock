import "./SettingsIcon.css";

export const SettingsIcon = ({toggleMenu}) => {

  const handleClick = () => {
    toggleMenu();
  }

  return (
    <div className="settings-icon-container" onClick={handleClick}>
      <img className="settings-icon" src="../../settings-icon.png" />
    </div>
  )
}