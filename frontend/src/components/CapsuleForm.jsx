/** 
 * 
 * Component used to create a new Capsule
 * 
 */

import { ClipIcon } from "../ui/ClipIcon";
import { CreateCapsuleButton } from "../ui/CreateCapsuleButton";

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
  fileInput,
  errors,
  loading,
  onClose,
  
}) => {
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
            className={errors.title ? "error-input" : ""}
            required
          />
          {errors.title && <p className="error-message">{errors.title}</p>}

          {/* Set date field */}
          <label htmlFor="capsule-unlock-date">Choose the release date and time</label>
          <input
            type="datetime-local"
            id="capsule-unlock-date"
            value={unlockDate}
            onChange={(event) => setUnlockDate(event.target.value)}
            className={errors.unlockDate ? "error-input" : ""}
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
            className={errors.recipientUsername ? "error-input" : ""}
            placeholder="Enter the recipient's username"
            required
          />
          {errors.recipientUsername && (
            <p className="error-message">{errors.recipientUsername}</p>
          )}

          {/* Message input field */}
          <label htmlFor="capsule-message">Content of the locket</label>
          <div className="text-input-container">
            <textarea
              id="capsule-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className={errors.message ? "error-input" : ""}
              required
            />
            {errors.message && <p className="error-message">{errors.message}</p>}

            {/* Media uploading field */}
            <ClipIcon fileInputRef={fileInput} />
          </div>

          {/* Submit button */}
          <CreateCapsuleButton
            disabled={loading}
            className="create-capsule-button"
          >
            {loading ? "Creating..." : "Create Capsule"}
          </CreateCapsuleButton>
        </form>
        <button className="close-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CapsuleForm;
