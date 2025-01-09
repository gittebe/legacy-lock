/**
 * This component is a form that allows users to sign up for an account.
 * 
 * Features:
 * - Manages email and password input using useState.
 * - Includes a reusable Button component for submission.
 * - Prevents default form behavior (to have control of what happens on submit) and prepares for API integration.
 * 
 */

import { useState } from 'react';
import Button from '../components/button';
import { Link } from 'react-router-dom';
import useStore from "../store/store";

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useStore((state) => state.login);

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("User data stored locally when signing up", { email, password }); // Output email. Replace with API call? 

    login({ email, password });// Save user data to the store
    console.log("User data stored by Zustand:", { email, password }); // Output user data.

    setEmail(""); // Clear the email input
    setPassword(""); // Clear the password input
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <p>Welcome to the sign up page!</p>
        <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder='Enter your email'
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder='Enter your password'
            required
        />
        <Button type="submit">Sign Up</Button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </main>
  );
};

export default SignUpPage;
