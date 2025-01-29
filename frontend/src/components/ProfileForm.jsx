import useStore from "../store/store";
import { useState } from "react";
import "./ProfileForm.css";

export const ProfileSettingsModal = ({ onClose }) => {
  const user = useStore((state) => state.user);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSave = () => {
    console.log("Changes saved:", { username, email });
    onClose(); // Close the modal after saving
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Profile Settings</h2>
        <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
          <div className="profile-picture-container">
            <div className="profile-picture"></div>
            <div className="profile-picture-buttons">
              <button className="change-button" type="button">
                Change picture
              </button>
              <button className="delete-button" type="button">
                Delete picture
              </button>
            </div>
          </div>
          <div className="profile-details">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <button className="save-button" onClick={handleSave}>
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};
