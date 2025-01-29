import useStore from "../store/store";
import { useState, useEffect } from "react";
import "./ProfileForm.css";

export const ProfileSettingsModal = ({ onClose }) => {
  const user = useStore((state) => state.user);
  const uploadProfilePicture = useStore((state) => state.uploadProfileImage);

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (user?.profileImage) {
      setProfileImage(user.profileImage);
    }
  }, [user]);

  const handleChangePicture = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const url = await uploadProfilePicture(file);
        console.log("Uploaded image URL:", url);
        setProfileImage(url);
        useStore.setState({ user: { ...user, profileImage: url } })
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        alert("Failed to upload profile picture.");
      }
    }
  };

  const handleDeletePicture = async () => {
    try {
      await useStore.setState({ user: { ...user, profileImage: "" } });
      setProfileImage("");
  
      console.log("ProfileImage has been deleted.");
    } catch (error) {
      console.error("error deleting image:", error);
      alert("Error deleting the profile picture.");
    }
  };
  

  // const handleSave = async () => {
  //   try {
  //     console.log("Changes saved:", { username, email, profileImage });
  //     onClose();
  //   } catch (error) {
  //     console.error("Error saving profile data:", error);
  //     alert("Failed to save changes.");
  //   }
  // };
  const handleSave = async () => {
    try {
      // Update the global store with the new values
      await useStore.setState({
        user: { 
          ...user, 
          username: username, 
          email: email, 
          profileImage: profileImage 
        }
      });
  
      console.log("Changes saved:", { username, email, profileImage });
  
      // Optionally, if you're saving the data to a backend, make an API call here
  
      // Close the modal after saving
      onClose();
    } catch (error) {
      console.error("Error saving profile data:", error);
      alert("Failed to save changes.");
    }
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
          <button
            type="button"
            className="save-button"
            onClick={handleSave}
          >
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};
