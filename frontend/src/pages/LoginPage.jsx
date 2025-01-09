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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useStore((state) => state.login);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("User data stored locally when logging in:", { email, password }); // Output. Replace with API call?

    const userData = { email, password }; // Store user data in an object
    
    login({ email, password });// Save user data to the store
    console.log("User data stored by Zustand:", { email, password }); // Output user data.

    setEmail(""); // Clear the email input
    setPassword(""); // Clear the password input
  };

  return (
    <div>
      <header>
        <h1>Login</h1>
        <p>Welcome to the login page!</p>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
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
      </main>
    </div>
  );
};

export default LoginPage;
