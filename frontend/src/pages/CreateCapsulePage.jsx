/**
 * CreateCapsulePage Component
 * 
 * Documatation for Cloudinary: 
 * https://technigo.notion.site/Cloudinary-6e50a871c3844378ad235a5746298349
 * 
 **/

import { useState, useRef } from "react";
import { CreateCapsuleButton } from "../ui/CreateCapsuleButton";
import useStore from "../store/store";
import { Navigate } from "react-router-dom";

export const CreateCapsulePage = () => {
  const user = useStore((state) => state.user)// Get the user's login status from Zustand store

  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Create a reference to the Cloudinary file input:
  const fileInput = useRef();

  // Create state variables:
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [recipientUsername, setRecipientUsername] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("accessToken"); // Get the token from local storage
    console.log("Token being sent:", token);

    if (!token) {
      console.error("No token found");
      setLoading(false);
      return;
    }

    // Create a new FormData object:
    const formData = new FormData();
    if (fileInput.current?.files?.[0]) {
      formData.append("file", fileInput.current.files[0]);
      console.log("File being sent:", fileInput.current.files[0].name);
    }
    formData.append("title", title);
    formData.append("message", message);
    formData.append("recipientUsername", recipientUsername);
    formData.append("createdAt", new Date().toISOString());
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
        console.log("The Capsule was successfully created", data);

        // Clear the input fields
        setTitle("");
        setMessage("");
        setRecipientUsername("");
        setUnlockDate("");
        fileInput.current.value = "";
      } else {
        console.error("The Capsule could not be created:", data);
      }
    } catch (error) {
      console.error("Error during creation of Capsule:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create a Capsule</h1>
      <form onSubmit={handleSubmit}>
        {/* Title input field */}
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </label>

        {/* Recipient Username */}
        <label>
          Recipient Username
          <input
            type="text"
            value={recipientUsername}
            onChange={(event) => setRecipientUsername(event.target.value)}
            required
          />
        </label>

        {/* Message input field */}
        <label>
          Message
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Write your message"
            required
          />
        </label>

        {/* Media uploading field */}
        <label>
          Upload Media (optional)
          <input type="file" ref={fileInput} />
        </label>

        {/* Set date field */}
        <label>
          Unlock Date
          <input
            type="date"
            value={unlockDate}
            onChange={(event) => setUnlockDate(event.target.value)}
            required
          />
        </label>

        {/* Submit button */}
        <CreateCapsuleButton type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Capsule"}
        </CreateCapsuleButton>
      </form>
    </div>
  );
};
