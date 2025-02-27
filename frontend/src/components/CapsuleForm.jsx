import { useRef } from "react";
import "./CapsuleForm.css";
import { ClipIcon } from "../ui/ClipIcon";
import { AttachmentIndicator } from "./AttachmentIndicator";
import { Tooltip } from "../ui/Tooltip";

const CapsuleForm = ({
  handleSubmit,
  title,
  setTitle,
  unlockDate,
  setUnlockDate,
  recipientUsername,
  setRecipientUsername,
  message,
  setMessage,
  file,
  setFile,
  errors,
  loading,
  onClose,
}) => {
  const fileInputRef = useRef();

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile); 
    } else {
      setFile(null);
    }
  };

  const handleClipIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); 
    }
  };

  return (
    <div
      className="popup-overlay"
      role="dialog"
      aria-labelledby="create-capsule-popup-title"
      aria-describedby="create-capsule-popup-desc"
      onClick={onClose}
    >
      <div className="popup" onClick={(event) => event.stopPropagation()}>
        <h3 id="create-capsule-popup-title">
          Start creating <strong>your locket</strong>
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Capsule title */}
          <label htmlFor="capsule-title">Title of the locket</label>
          <input
            type="text"
            id="capsule-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className={`capsule-title ${errors.title ? "error-input" : ""}`}
            required
          />
          {errors.title && <p className="error-message">{errors.title}</p>}

          {/* Set date field */}
          <label htmlFor="capsule-unlock-date">
            Choose the release date
            <Tooltip text="Release date means when the locket will be automatically opened. Before the release date, the locket cannot be opened." />
          </label>
          <input
            type="datetime-local"
            id="capsule-unlock-date"
            value={unlockDate}
            onChange={(event) => setUnlockDate(event.target.value)}
            className={`capsule-date ${errors.unlockDate ? "error-input" : ""}`}
            placeholder="yyyy-mm-dd, hh:mm"
            required
          />
          {errors.unlockDate && <p className="error-message">{errors.unlockDate}</p>}

          {/* Recipient Username */}
          <label htmlFor="recipient-username">Recipient Username</label>
          <input
            type="text"
            id="recipient-username"
            value={recipientUsername}
            onChange={(event) => setRecipientUsername(event.target.value)}
            className={`recipient-username ${errors.recipientUsername ? "error-input" : ""}`}
            required
          />
          {errors.recipientUsername && (
            <p className="error-message">{errors.recipientUsername}</p>
          )}

          {/* Message container */}
          <label htmlFor="capsule-message">Message of the locket</label>
          <textarea
            id="create-capsule-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="create-capsule-message"
            placeholder="Write your message here..."
            required
          />

          {/* File Input */}
          <label htmlFor="capsule-file">Image of the locket</label>
          <div className="file-input-container">
            {file ? (
              <AttachmentIndicator
                fileName={file.name}
                onRemove={() => setFile(null)}
              />
            ) : (
              <div className="clip-icon-wrapper" onClick={handleClipIconClick}>
                <ClipIcon />
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden-file-input"
              onChange={handleFileChange}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
        <button className="close-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CapsuleForm;