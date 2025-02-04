//**************************************************************************
// CreateCapsule Component
//
// Documatation for Cloudinary: 
// https://technigo.notion.site/Cloudinary-6e50a871c3844378ad235a5746298349
//  
//**************************************************************************

import { useState, useRef } from "react";
import useStore from "../store/store";
import "./CreateCapsule.css";
import { useValidation } from "../hooks/useValidation";
import CapsuleForm from "./CapsuleForm";

export const CreateCapsule = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [recipientUsername, setRecipientUsername] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInput = useRef();

  const addCapsule = useStore((state) => state.addCapsule);
  const fetchCapsules = useStore((state) => state.fetchCapsules);
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
      const response = await fetch("https://legacy-lock-2.onrender.com/capsule/create", {
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

        // Fetch capsules from server to update the list
        await fetchCapsules();

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
    <CapsuleForm
      handleSubmit={handleCreateCapsule}
      title={title}
      setTitle={setTitle}
      unlockDate={unlockDate}
      setUnlockDate={setUnlockDate}
      recipientUsername={recipientUsername}
      setRecipientUsername={setRecipientUsername}
      message={message}
      setMessage={setMessage}
      fileInput={fileInput}
      errors={errors}
      loading={loading}
      onClose={onClose}
    />
  );
};
