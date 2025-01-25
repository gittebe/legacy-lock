/**
 * This hook is used to validate the fields of the CreateCapsule form.
 */

import { useState } from "react";

export const useValidation = () => {
  const [errors, setErrors] = useState({});

  const validateFields = ({ title, message, recipientUsername, unlockDate }) => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!message.trim()) newErrors.message = "Message is required.";
    if (!recipientUsername.trim()) newErrors.recipientUsername = "Recipient username is required.";
    if (!unlockDate) newErrors.unlockDate = "Unlock date is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  return { errors, validateFields, setErrors };
};
