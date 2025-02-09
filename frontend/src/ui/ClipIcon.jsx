import clipIcon from "../assets/clipicon.png";
import "./ClipIcon.css";

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
      <img src={clipIcon}
        alt="Attach media"
        className="clip-icon"
      />
    </div>
  );
};