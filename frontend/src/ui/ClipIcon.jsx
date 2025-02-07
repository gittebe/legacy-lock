import clipIcon from "../assets/clipicon.png";

export const ClipIcon = ({ fileInputRef }) => {
  const handleFileUpload = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click(); 
    }
  };

  return (
    <div 
    className="clip-icon-container" 
    onClick={handleFileUpload}
    role="button"
    tabIndex="0"
    aria-label="Attach media"
    >
      <img src={clipIcon}
        alt="Attach media"
        className="clip-icon" />
    </div>
  );
};