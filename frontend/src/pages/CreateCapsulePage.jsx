/**
 * CreateCapsulePage Component
 * 
 * This component allows users to create a capsule by uploading a media file, adding a message, and setting a future unlock date.
 * 
 * Features:
 * - Submits data via a POST request to the backend.
 * - Displays a loading indicator during submission.
 * - Clears input fields if response is ok.
 * 
 * useStates:
 * - `text`: Capsule message.
 * - `unlockDate`: Future unlock date.
 * - `loading`: Submission status.
 * 
 * Documatation for Cloudinary: 
 * https://technigo.notion.site/Cloudinary-6e50a871c3844378ad235a5746298349
 * 
 **/

import { useState, useRef } from "react";
import Button from "../components/button";

const CreateCapsulePage = () => {
  // Create a reference to the Cloudinary file input:
  const fileInput = useRef(); 
  // Create a state variable to store the text:
  const [text, setText] = useState(""); 
  // Create a state variable to store the unlock date:
  const [unlockDate, setUnlockDate] = useState(""); 
  // Create a state variable to store the loading state:
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => { // Create a function to handle the media upload
    event.preventDefault(); // Prevent the default form behavior
    setLoading(true); // Set the loading state to true

    const formData = new FormData(); // Create a new FormData object
    formData.append("file", fileInput.current.files[0]); // Append the file to the FormData object
    formData.append("text", text ); // Append the upload the message to the FormData object
    formData.append("unlockDate", unlockDate); // Append the unlock date to the FormData object

    try { // Try to fetch the API
      const response = await fetch("http://localhost:5000/capsules/create", {
        method: "POST",
        body: formData,
      });
    
      const data = await response.json();
      if (response.ok) { // If the response is ok
        console.log("The Capsule was successfully created", data);
    
        // Clear the input fields
        setText("");
        setUnlockDate("");
        fileInput.current.value = "";

      } else { // If the response is not ok
        console.error("The Capsule could not be created:", data);
      }

    } catch (error) { // Catch any errors
      console.error("Error during creation of Capsule:", error);

    } finally { // Finally, set the loading state to false
      setLoading(false);
    }
  };

return (
  <div> 
    <h1>Create a Capsule</h1>
    <form onSubmit={handleSubmit}>
      {/* Media uploading field */}
    <label>
      Upload Media (optional)
      <input type="file" ref={fileInput} />
    </label>
    
    {/* Message input field */}
    <label>
      Message
      <textarea
      value={text}
      required
      onChange={(event) => setText(event.target.value)} 
      placeholder="Write your message"
      />
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
    <Button type="submit">Create capsule</Button>
  </form>
</div>
  );
};

export default CreateCapsulePage;
