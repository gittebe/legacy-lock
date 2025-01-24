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

export const CreateCapsulePage = ({ onClose }) => {
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
    <>
    <Header toggleMenu={() => setShowMenu(!showMenu)}/>
    <SideMenu
          showMenu={showMenu}
          toggleMenu={() => setShowMenu(false)}
          isLoggedIn={!!user}
          onLogoutClick={handleLogout}
    />
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
          Unlock Date adn Time
          <input
            type="datetime-local"
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
    </>
  );
};
