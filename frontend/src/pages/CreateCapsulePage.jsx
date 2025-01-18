import { useState } from "react";

const CreateCapsulePage = () => {
  const fileInput = useRef(); // Create a reference to the Cloudinary file input  
  const [text, setText] = useState(""); // Create a state variable to store the text
  const [unlockDate, setUnlockDate] = useState(""); // Create a state variable to store the unlock date

  const handleMediaUpload = async (event) => { // Create a function to handle the media upload
    event.preventDefault(); // Prevent the default form behavior

    const formData = new FormData(); // Create a new FormData object
    formData.append("file", fileInput.current.files[0]); // Append the file to the FormData object
    formData.append("text", text ); // Append the upload the message to the FormData object
    formData.append("unlockDate", unlockDate); // Append the unlock date to the FormData object

    fetch(API_URL, { method: 'POST', body: formData })
    .then((res) => res.json())
    .then((json) => {
      console.log(json)
    })
}

return (
  <form onSubmit={handleFormSubmit}>
    <label>
      Pet Image
      <input type="file" ref={fileInput} />
    </label>

    <label>
      Pet name
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    </label>

    <button type="submit">
      Submit
    </button>
  </form>
)
}

export default CreateCapsulePage;
