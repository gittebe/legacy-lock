import useStore from "../store/store";
import { useState, useEffect } from "react";
import { LogoutButton } from "../ui/LogoutButton";
import "./ProfileForm.css";

export const ProfileSettingsModal = ({ onClose }) => {
  const user = useStore((state) => state.user);
  const uploadProfilePicture = useStore((state) => state.uploadProfileImage);

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileImage, setProfileImage] = useState(user?.profileImage  || "" );

  useEffect(() => {
    if (user?.profileImage) {
      setProfileImage(user.profileImage);
    } else {
      const storedImage = localStorage.getItem("profileImage");
      if (storedImage) {
        setProfileImage(storedImage);
      }
    }
  }, [user]);

  const handleChangePicture = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const url = await uploadProfilePicture(file);
    
        setProfileImage(url);
        useStore.setState({ user: { ...user, profileImage: url } }); 
        localStorage.setItem("profileImage", url);

      } catch (error) {
        alert("Failed to upload profile picture.");
      }
    }
  };

  const handleDeletePicture = async () => {
    try {
      await useStore.getState().deleteProfileImage();
      localStorage.removeItem("profileImage");
      setProfileImage("");
    } catch (error) {
      alert("Error deleting the profile image.");
    }
  };
  
  const handleSave = async () => {
    try {
      if (!profileImage) {
      }
  
      const userData = {
        username: username,
        email: email,
        profileImage: profileImage || "",
      };
  
      const updatedUser = await useStore.getState().updateUserProfile(userData);
  
      onClose();
    } catch (error) {
      alert("Failed to save changes.");
    }
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
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
          <button
            type="button"
            className="save-button"
            onClick={handleSave}
          >
            Save changes
          </button>
          <LogoutButton />
        </form>
      </div>
    </div>
  );
};