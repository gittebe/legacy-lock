/**
 * 
 * This component is a form that allows users to login to their account.
 * 
 * Features:
 * - useState to handle email and password input.
 * - Reusable Button component for submission.
 * - handleSubmit function to prevent default form behavior (to controll what happens on submit) and log the email and username.
 * 
 */

import { useState } from "react";
import Button from "../components/Button/Button";
import { Link } from "react-router-dom";
import useStore from "../store/store";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useStore((state) => state.login);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      emailOrUsername: email || username,
      password,
    };
    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(loginData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        login(data.user);
        setEmail("");
        setUsername("");
        console.log("Login successful:", data);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error to signin", error);
    }
  }

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
