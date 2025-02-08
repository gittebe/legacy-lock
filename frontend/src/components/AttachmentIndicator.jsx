import "./AttachmentIndicator.css";

export const AttachmentIndicator = ({ fileName, onRemove }) => {
  const maxLength = 25;
  const shortenedFileName =
    fileName && fileName.length > maxLength
      ? fileName.slice(0, maxLength) + "..."
      : fileName || "";

  return (
    <div className="attachment-indicator">
      <span className="file-name">{shortenedFileName}</span>
      <button
        type="button"
        className="remove-file-button"
        onClick={onRemove}
        aria-label="Remove file"
      >
        X
      </button>
    </div>
  );
};
