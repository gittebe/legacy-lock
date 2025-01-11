/**
 * 
 * This component is a form that allows users to login to their account.
 * 
 * Features:
 * - useState to handle email and password input.
 * - Reusable Button component for submission.
 * - handleSubmit function to prevent default form behavior (to controll what happens on submit) and log the email.
 * 
 */

import { useState } from "react";
import Button from "../components/button";
import { Link } from "react-router-dom";
import useStore from "../store/store";
import { set } from "mongoose";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useStore((state) => state.login);

  const handleSubmit = (event) => {
    event.preventDefault();

    const fictiveDatabase = [
      { email: "user@legacy-lock.com", username: "testuser", password: "1234" },
    ];

    // Check if the email or username exists in the fictive database
    const foundUser = fictiveDatabase.find((user) => (user.email === email || user.username === username) && user.password === password);

    if (foundUser) {
      console.log("User data stored locally when logging in:", foundUser); // Output. Replace with API call?

      const userData = { email, username, password }; // Store user data in an object
    
      login({ email, username, password });// Save user data to the store
      console.log("User data stored by Zustand:", { email, username, password }); // Output user data.

      setEmail(""); // Clear the email input
      setUsername(""); // Clear the username input
      setPassword(""); // Clear the password input
    } else {
      alert("User not found. Please try again.");
    }
  };

    return (
      <div>
        <header>
          <h1>Login</h1>
          <p>Welcome to the login page!</p>
        </header>
        <main>
          <form onSubmit={handleSubmit}>
            <label>Email or Username</label>
            <input
              type="text"
              value={email || username}
              onChange={(event) => {
                const value = event.target.value; // Get the value from the input field
                if (value.includes("@")) {
                  setEmail(value); // Set the email state
                  setUsername(""); // Clear the username state
                } else {
                  setUsername(value); // Set the username state
                  setEmail(""); // Clear the email state
                }
              }}
              placeholder="Enter your email or username"
              required
            />
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
            />
            <Button type="submit">Login</Button>
          </form>
          <p>
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </p>
          <p>
            Forgot your password? <Link to="/resetpassword">Reset password</Link>
          </p>
        </main>
      </div >
    )
  };

export default LoginPage;
