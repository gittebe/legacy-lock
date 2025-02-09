// Component used for the message input field in the CapsuleForm component
import "./MessageInput.css"; 
import { ClipIcon } from "../ui/ClipIcon";
import { CreateCapsuleButton } from "../ui/CreateCapsuleButton";
import { AttachmentIndicator } from "./AttachmentIndicator"
import { useState, useRef } from "react";

export const MessageInput = ({
  message,
  setMessage,
  handleSubmit,
  loading,
}) => {

  const [selectedFile, setSelectedFile] = useState();
  const fileInput = useRef(); 

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile();
    }
  };

  const handleClipIconClick = () => {
    if (fileInput.current) {
      fileInput.current.click(); 
    }
  };

  return (
    <div className="message-input-container">
      <textarea
        id="capsule-message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        className="message-textarea"
        required
      />
      <div className="textarea-actions">
        <div className={`media-upload ${selectedFile ? "file-uploaded" : ""}`}>
          <input 
            type="file"
            ref={fileInput} 
            style={{ display: "none" }} 
            onChange={handleFileChange}
          />
          <div 
            className="clip-icon-wrapper" 
            onClick={handleClipIconClick} 
            style={{ cursor: "pointer" }}
          >
            <ClipIcon />
          </div>
          {selectedFile && (
            <div className="attachment-container">
              <AttachmentIndicator />
              <span className="file-name">{selectedFile.name}</span>
            </div>
          )}
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