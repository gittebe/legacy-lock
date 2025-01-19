import React from 'react';
import './LoginPage.css';
import LoginButton from '../ui/LoginButton'; // Import the reusable LoginButton component

const LoginPage = ({ onClose, openSignup, handleLogin }) => {
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
          <label htmlFor="email">Email or username</label>
          <input type="text" id="email" placeholder="Email or username" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" />
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
