//**************************************************************************
// 
// Component used for the message input field in the CapsuleForm component
//  
//**************************************************************************

import "./MessageInput.css"; 
import { ClipIcon } from "../ui/ClipIcon";
import { CreateCapsuleButton } from "../ui/CreateCapsuleButton";

export const MessageInput = ({
  message,
  setMessage,
  fileInput,
  handleSubmit,
  loading,
}) => {
  return (
    <div className="message-input-container">
      {/* Textarea */}
      <textarea
        id="capsule-message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        className="message-textarea"
        required
      />
      {/* ClipIcon and CreateCapsuleButton placed inside the textarea */}
      <div className="textarea-actions">
        <ClipIcon fileInputRef={fileInput} />
        <CreateCapsuleButton
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </CreateCapsuleButton>
      </div>
    </div>
  );
};
