import { useState } from "react";
import "./AttachmentIndicator.css";

export const AttachmentIndicator = () => {
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileUploaded(true);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {fileUploaded && <div className="attachment-indicator"></div>}
    </div>
  );
};

