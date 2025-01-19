import React from 'react';
import './SignUpPage.css';
import SignUpButton from '../ui/SignupButton'; 

const SignUpPage = ({ onClose, handleSignup }) => {
  return (
    <div
      className="popup-overlay"
      role="dialog"
      aria-labelledby="signup-popup-title"
      aria-describedby="signup-popup-desc"
      onClick={onClose}
    >
      <div className="popup signup" onClick={(e) => e.stopPropagation()}>
        <h3 id="signup-popup-title">Sign up</h3>
        <form onSubmit={handleSignup}>
          <label htmlFor="email-signup">Email address</label>
          <input
            type="email"
            id="email-signup"
            placeholder="name@domain.com"
          />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
          />
          <label htmlFor="password-signup">Password</label>
          <input
            type="password"
            id="password-signup"
            placeholder="Password"
          />
          <p>Your password must contain 10 characters</p>
          <SignUpButton />
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
