/**
 * CreateCapsule Component
 * 
 * Documatation for Cloudinary: 
 * https://technigo.notion.site/Cloudinary-6e50a871c3844378ad235a5746298349
 * 
 **/

import { useState, useRef } from "react";
import { CreateCapsuleButton } from "../ui/CreateCapsuleButton";
import useStore from "../store/store";

export const CreateCapsule = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Do not render the component if the modal is closed

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [recipientUsername, setRecipientUsername] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInput = useRef();
  const addCapsuleToStore = useStore((state) => state.addCapsule);

  const handleCreateCapsule = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (fileInput.current?.files?.[0]) {
      formData.append("file", fileInput.current.files[0]);
    }
    formData.append("title", title);
    formData.append("message", message);
    formData.append("recipientUsername", recipientUsername);
    formData.append("openAt", unlockDate);

    try {
      // Send the formData to the server:
      const response = await fetch("http://localhost:5000/capsule/create", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {  
        alert("The Capsule was successfully created!");
        addCapsuleToStore(data.capsule);

        // Clear the input fields
        setTitle("");
        setMessage("");
        setRecipientUsername("");
        setUnlockDate("");
        fileInput.current.value = "";
        onClose(); // Close popup
      } else {
        alert(data.message || "The Capsule could not be created:");
      }
    } catch (error) {
      console.error("Error during creation of Capsule:", error);
      alert("An error occurred. Please try again later");
    } finally {
      setLoading(false);
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
      {/* Prevent closing the popup when clicking inside: */}
      <div className="popup" onClick={(event) => event.stopPropagation()}> 

        <h2 id="create-capsule-popup-title">Create a Capsule</h2>
        <form onSubmit={handleCreateCapsule}>

          {/* Capsule title */}
          <label htmlFor="capsule-title">Title</label>
          <input
            type="text"
            id="capsule-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          {/* Recipient Username */}
          <label htmlFor="recipient-username">Recipient Username</label>
          <input
            type="text"
            id="recipient-username"
            value={recipientUsername}
            onChange={(event) => setRecipientUsername(event.target.value)}
            placeholder="Enter the recipient's username"
            required
          />
          {/* Message input field */}
          <label htmlFor="capsule-message">Message</label>
          <textarea
            id="capsule-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Write your message"
            required
          />

          {/* Media uploading field */}
          <label htmlFor="capsule-media">Upload Media (optional)</label>
          <input type="file" ref={fileInput} />

          {/* Set date field */}
          <label htmlFor="capsule-unlock-date">Unlock Date and Time</label>
          <input
            type="datetime-local"
            id="capsule-unlock-date"
            value={unlockDate}
            onChange={(event) => setUnlockDate(event.target.value)}
            required
          />
           {/* Submit button */}
          <CreateCapsuleButton disabled={loading}>
            {loading ? "Creating..." : "Create Capsule"}
          </CreateCapsuleButton>
        </form>
        <button className="close-button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};
