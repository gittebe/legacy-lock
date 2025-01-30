import { useState } from 'react';
import { SignUpButton } from '../ui/SignupButton';
import useStore from '../store/store';
import { useNavigate } from 'react-router-dom';

export const SignUpForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const login = useStore((state) => state.login); // useStore hook
  const navigate = useNavigate(); // use navigate to redirect user

  const handleSignup = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    const signupData = { email, username, password };

    try {
      const response = await fetch('https://legacy-lock-2.onrender.com/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.ok) {
        // registration successful
        localStorage.setItem('accessToken', data.accessToken);
        login(data.user); // login into Zustand
        onClose(); // close Popup
        console.log('Signup successful:', data);

        // redirect user to the dashboard
        navigate('/dashboard');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@domain.com"
            required
          />
          <label htmlFor="username-signup">Username</label>
          <input
            type="text"
            id="username-signup"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <label htmlFor="password-signup">Password</label>
          <input
            type="password"
            id="password-signup"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <label htmlFor="confirm-password-signup">Confirm Password</label>
          <input
            type="password"
            id="confirm-password-signup"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <SignUpButton />
        </form>
        <p>Your password must contain 10 characters</p>
      </div>
    </div>
  );
};
