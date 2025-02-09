import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import useStore from "../store/store";
import { LoginButton } from "../ui/LoginButton";

export const LoginForm = ({ onClose, openSignup }) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = useStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();

    const loginData = {
      emailOrUsername,
      password,
    };

    // API request
    try {
      const response = await fetch("https://legacy-lock-2.onrender.com/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        login(data.user);
        setEmailOrUsername(""); // Clear email or username input
        setPassword(""); // Clear password input
        onClose(); // Close the login popup

        navigate("/dashboard")

      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div
      className="popup-overlay"
      role="dialog"
      aria-labelledby="login-popup-title"
      aria-describedby="login-popup-desc"
      onClick={onClose}
    >
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h3 id="login-popup-title">Login</h3>
        <form onSubmit={handleLogin}>
          <label htmlFor="email-or-username">Email or Username</label>
          <input
            type="text"
            id="email-or-username"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            placeholder="Enter your email or username"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <LoginButton />
        </form>
        <p>
          Don’t have an account?{' '}
          <button
            type="button"
            className="text-button"
            onClick={() => {
              onClose();
              openSignup();
            }}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};