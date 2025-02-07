//**************************************************************************
// 
// Component used for the message input field in the CapsuleForm component
//  
//**************************************************************************

import "./MessageInput.css"; 
import { ClipIcon } from "../ui/ClipIcon";
import { CreateCapsuleButton } from "../ui/CreateCapsuleButton";
import { AttachmentIndicator } from "./AttachmentIndicator"

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
      {/* ClipIcon, AttachmentIndicator och CreateCapsuleButton placerade inuti textarea-actions */}
      <div className="textarea-actions">
        <div className="media-upload">
          <input 
            type="file"
            ref={fileInput}
            style={{ display: "none" }} // Håller input fältet dolt
            onChange={handleFileChange}
          />
          {/* ClipIcon triggar filuppladdning */}
          <div onClick={handleClipIconClick} style={{ cursor: "pointer" }}>
            <ClipIcon fileInputRef={fileInput} />
          </div>
        </div>

        {/* Visar AttachmentIndicator enbart när en fil är uppladdad */}
        {fileUploaded && <AttachmentIndicator />}

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
