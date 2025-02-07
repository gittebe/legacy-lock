import "./AttachmentIndicator.css";

export const AttachmentIndicator = ({ fileName }) => {
  const maxLength = 15;
  const shortenedFileName = 
    fileName && fileName.length > maxLength 
      ? fileName.slice(0, maxLength) + "..." 
      : fileName || ""; 

  return (
    <div className="attachment-indicator">
      <span className="file-name">
        {shortenedFileName}
      </span>
    </div>
  );
};
