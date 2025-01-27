
import "./ClipIcon.css"; 

export const ClipIcon = ({ fileInputRef }) => {
  const handleFileUpload = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click(); 
    }
  };

  return (
    <div className="clip-icon-container" onClick={handleFileUpload}>
      <img
        src="/assets/clip.svg"
        alt="Attach media"
        className="clip-icon"
      />
    </div>
  );
};
