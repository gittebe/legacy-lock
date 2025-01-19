/**
 * This component is a form that allows users to sign up for an account.
 * 
 * Features:
 * - Manages email and password input using useState.
 * - Includes a reusable Button component for submission.
 * - Prevents default form behavior (to have control of what happens on submit) and prepares for API integration.
 * 
 */

import { useState } from "react";
import Button from "../components/Button/Button";
import { Link } from "react-router-dom";
import useStore from "../store/store";

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // Zustand store hook:
  const login = useStore((state) => state.login);

  const handleSubmit = async (event) => {
    event.preventDefault()

    /* Check the password and confirm password match */
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    //Prepare data for signup
    const signupData = {
      email,
      username,
      password
    };

    try {
      const response = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(signupData),
      });

      const data = await response.json();
      if (response.ok){
        localStorage.setItem("accessToken", data.accessToken);
        login(data.user);
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        console.log("Signup successful", data);
      } else {
        addListener(data.message || "Signup failed" );
      }
    } catch (error) {
      console.error("Error during signup", error)
    }
  }

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
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder='Enter your username'
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
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder='Confirm your password'
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
