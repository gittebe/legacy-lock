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
import "./CreateCapsule.css";
import { useValidation } from "../utils/useValidation";

export const CreateCapsule = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [recipientUsername, setRecipientUsername] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInput = useRef();
  const addCapsule = useStore((state) => state.addCapsule);
  const { errors, validateFields, setErrors } = useValidation();

  if (!isOpen) return null; // Return null if the popup is not open

  const handleCreateCapsule = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Validate the input fields before sending the request to the server
    if (!validateFields({ title, message, recipientUsername, unlockDate })) {
      setLoading(false);
      return;
    }

    //Get token from local storage
    const token = localStorage.getItem("accessToken");
    console.log("Token being sent:", token);

    if (!token) {
      console.error("No token found for creating Capsule.");
      alert("You need to be logged in to create a Capsule.");
      setLoading(false);
      return;
    }

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
      console.log("Created capsule response:", data);
      
      if (response.ok) {  
        alert("The Capsule was successfully created!");
        addCapsule(data.capsule);

        // Clear the input fields
        setTitle("");
        setMessage("");
        setRecipientUsername("");
        setUnlockDate("");
        fileInput.current.value = "";
        onClose(); // Close popup
      } else {
        // Handle error response from the server
        if (data.message === "Recipient not found") {
          setErrors({ recipientUsername: "Recipient not found." });
        } else {
        alert(data.message || "The Capsule could not be created:");
        }
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
            className={errors.title ? "error-input" : ""}
            required
          />
          {errors.title && <p className="error-message">{errors.title}</p>}

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
          {errors.recipientUsername && <p className="error-message">{errors.recipientUsername}</p>}

          {/* Message input field */}
          <label htmlFor="capsule-message">Message</label>
          <textarea
            id="capsule-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className={errors.message ? "error-input" : ""}
            placeholder="Write your message"
            required
          />
          {errors.message && <p className="error-message">{errors.message}</p>}

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
            className={errors.unlockDate ? "error-input" : ""}
            required
          />
          {errors.openAt && <p className="error-message">{errors.openAt}</p>}

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
