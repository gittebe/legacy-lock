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
        <div className="media-upload">
          <input type="file"
            ref={fileInput}
            style={{ display: "none" }} //Hide the input field
            onChange={(event) => {
              console.log("Selected file:", event.target.files[0]);
            }}
          />
          <ClipIcon fileInputRef={fileInput} />
        </div>
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
