import "./AttachmentIndicator.css";

export const AttachmentIndicator = ({ fileName }) => {
  return (
    <div className="attachment-indicator">
      <span className="file-name">
        <strong>Attachments:</strong> {fileName}
      </span>
    </div>
  );
};
