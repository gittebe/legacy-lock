import { useState } from "react";

const CreateCapsulePage = () => {
  const fileInput = useRef(); // Create a reference to the Cloudinary file input  
  const [text, setText] = useState("");
  const [unlockDate, setUnlockDate] = useState("");

  const handleMediaUpload = (event) => {

  return (
    <div>
      <h1>Create a new Capsule</h1>
      <p>Welcome to the CreateCapsulePage!</p>
    </div>
  );
};

export default CreateCapsulePage;
