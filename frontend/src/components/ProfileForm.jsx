import useStore from "../store/store";
import { useState, useEffect } from "react";
import "./ProfileForm.css";

export const ProfileSettingsModal = ({ onClose }) => {
  const user = useStore((state) => state.user);
  const updateProfilePicture = useStore((state) => state.updateProfilePicture);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (user?.profilePicture) {
      setProfileImage(user.profilePicture);
    }
  }, [user]);

  const handleChangePicture = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const url = await updateProfilePicture(file); // Upload and update profile picture
        setProfileImage(url); // Update local preview
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        alert("Failed to upload profile picture.");
      }
    }
  };

  const handleDeletePicture = () => {
    setProfileImage("");
  };

  const handleSave = () => {
    console.log("Changes saved:", { username, email, profileImage });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Profile Settings</h2>
        <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
          <div className="profile-picture-container">
            <div
              className="profile-picture"
              style={{
                backgroundImage: profileImage ? `url(${profileImage})` : "none",
                backgroundColor: profileImage ? "transparent" : "#000",
              }}
            ></div>
            <div className="profile-picture-buttons">
              <label className="change-button">
                Change picture
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleChangePicture}
                  style={{ display: "none" }}
                />
              </label>
              <button
                type="button"
                className="delete-button"
                onClick={handleDeletePicture}
              >
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
