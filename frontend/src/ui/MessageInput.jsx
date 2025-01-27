import React from "react";
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
      {/* Textruta */}
      <textarea
        id="capsule-message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        className="message-textarea"
        placeholder="Write your message here"
        required
      />
      {/* ClipIcon och CreateCapsuleButton */}
      <div className="actions-container">
        <ClipIcon fileInputRef={fileInput} />
        <CreateCapsuleButton onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating..." : "Create Capsule"}
        </CreateCapsuleButton>
      </div>
    </div>
  );
};
