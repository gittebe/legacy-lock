import { useState } from "react";

const CreateCapsulePage = () => {
  const fileInput = useRef(); // Create a reference to the Cloudinary file input  
  const [text, setText] = useState(""); // Create a state variable to store the text
  const [unlockDate, setUnlockDate] = useState(""); // Create a state variable to store the unlock date

  const handleSubmit = async (event) => { // Create a function to handle the media upload
    event.preventDefault(); // Prevent the default form behavior
    setLoading(true); // Set the loading state to true

    const formData = new FormData(); // Create a new FormData object
    formData.append("file", fileInput.current.files[0]); // Append the file to the FormData object
    formData.append("text", text ); // Append the upload the message to the FormData object
    formData.append("unlockDate", unlockDate); // Append the unlock date to the FormData object

    try { // Try to fetch the API
      const response = await fetch("http://localhost:5000/capsules/create", 
      { method: 'POST', 
        body: formData }); 
        
        const data = await response.json(); // Parse the JSON response
        if {response.ok} { // If the response is ok
          console.log("The Capsule was successfully created", data); 

          //Clear the input fields
          setText(""); 
          setUnlockDate("");
          fileInput.current.value = ""; 

        } else { // If the response is not ok 
          console.error("The Capsule could not be created", data); 
        } catch (error) { // Catch any errors
          console.error("Error during creation of Capsule", error); 
        } finally { // Finally
          setLoading(false); // Set loading state to false
        }
      } 
    };
return (
  <div> 
    <h1>Create a Capsule</h1>
    <form onSubmit={handleFormSubmit}>
      {/* Media uploading field */}
    <label>
      Upload Media
      <input type="file" ref={fileInput} />
    </label>
    
    {/* Message input field */}
    <label>
      Message
      <textarea
      value:{"text"}
       value={name} onChange={(e) => setName(e.target.value)} />
    </label>

    {/* Set date field */}
    <label>
      Unlock Date
      <input type="date" value={unlockDate} onChange={(e) => setUnlockDate(event.target.value)} />
    </label>
    
    {/* Submit button */}
    <button type="submit">
      Submit
    </button>
  </form>
)
}

export default CreateCapsulePage;
