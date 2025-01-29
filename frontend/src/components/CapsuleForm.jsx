/** 
 * 
 * Component used to create a new Capsule
 * 
 */

import { MessageInput } from "./MessageInput";
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
            className={`capsule-title ${errors.title ? "error-input" : ""}`}
            required 
          />
          {errors.title && <p className="error-message">{errors.title}</p>}

          {/* Set date field */}
          <label htmlFor="capsule-unlock-date">
            Choose the release date
            <Tooltip text="Release date means when the locket will be automatically opened - before the release date the locket can not be opened" />
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

          {/* Message input field */}
          <label htmlFor="capsule-message">Content of the locket</label>
          <MessageInput
            message={message}
            setMessage={setMessage}
            fileInput={fileInput}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </form>
        <button className="close-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CapsuleForm;
