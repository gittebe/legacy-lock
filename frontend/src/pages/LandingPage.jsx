import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // The styling file to implement all the visual requirements.

const LandingPage = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const toggleLoginPopup = () => setShowLoginPopup(!showLoginPopup);
  const toggleSignupPopup = () => setShowSignupPopup(!showSignupPopup);
  const toggleMenu = () => setShowMenu(!showMenu);
  const closePopup = () => {
    setShowLoginPopup(false);
    setShowSignupPopup(false);
  };

  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1 className="logo">Legacy Lock</h1>
        <button
          className="hamburger-menu"
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        {showMenu && (
          <aside
            className="side-menu"
            onClick={() => setShowMenu(false)}
          >
            <div
              className="side-menu-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={toggleLoginPopup}>Log in</button>
              <button onClick={toggleSignupPopup}>Sign up</button>
            </div>
          </aside>
        )}
      </header>
      <main>
        <div className="animated-text">
          <span>MEMORIES</span>
        </div>
        <div className="image-container">
          <img
            src="/src/assets/landingimage.jpg"
            alt="Landing image"
            className="animated-image"
          />
        </div>
        <p className="subtext">
          Raise your memories from the archive and select the best ones.
        </p>
      </main>

      {showLoginPopup && (
        <div
          className="popup-overlay"
          role="dialog"
          aria-labelledby="login-popup-title"
          aria-describedby="login-popup-desc"
          onClick={closePopup}
        >
          <div
            className="popup"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="login-popup-title">Login</h3>
            <form>
              <label htmlFor="email">Email or username</label>
              <input
                type="text"
                id="email"
                placeholder="Email or username"
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
              />
              <button type="submit" className="login-button">
                Log in
              </button>
            </form>
            <p>
              Don’t have an account?{' '}
              <Link to="/signup" onClick={toggleSignupPopup}>
                Sign up
              </Link>
            </p>
            <button
              className="close-popup"
              onClick={closePopup}
              aria-label="Close popup"
            >
              ✖
            </button>
          </div>
        </div>
      )}

      {showSignupPopup && (
        <div
          className="popup-overlay"
          role="dialog"
          aria-labelledby="signup-popup-title"
          aria-describedby="signup-popup-desc"
          onClick={closePopup}
        >
          <div
            className="popup"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="signup-popup-title">Sign up</h3>
            <form>
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
              <button type="submit" className="signup-button">
                Sign up
              </button>
            </form>
            <button
              className="close-popup"
              onClick={closePopup}
              aria-label="Close popup"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
