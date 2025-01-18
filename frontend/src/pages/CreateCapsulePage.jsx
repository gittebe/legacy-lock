import { useState } from "react";

const CreateCapsulePage = () => {
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  
  return (
    <div>
      <h1>Create a new Capsule</h1>
      <p>Welcome to the CreateCapsulePage!</p>
    </div>
  );
};

export default CreateCapsulePage;
