export const uploadProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append("profilePicture", file);
  
    try {
      const response = await fetch("http://localhost:5001/api/profile/uploadProfilePicture", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload profile picture");
      }
  
      const data = await response.json();
      return data.url; // Return the uploaded image URL
    } catch (error) {
      console.error("Error uploading profile picture:", error.message);
      throw error;
    }
  };
  