import React, { useState } from 'react';
import './LoginPage.css';
import LoginButton from '../ui/LoginButton';
import useStore from '../store/store';

const LoginPage = ({ onClose, openSignup }) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = useStore((state) => state.login);

  const handleLogin = async (event) => {
    event.preventDefault();
    const loginData = {
      emailOrUsername,
      password,
    };
    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('accessToken', data.accessToken);
        login(data.user);
        setEmailOrUsername('');
        setPassword('');
        console.log('Login successful:', data);
        onClose(); // Close the popup
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
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

export default LoginPage;
