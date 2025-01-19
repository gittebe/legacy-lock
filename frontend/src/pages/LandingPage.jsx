import React, { useState } from 'react';
import './LandingPage.css';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

const LandingPage = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);

  const closePopup = () => {
    setShowLoginPopup(false);
    setShowSignupPopup(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    closePopup();
  };

  const handleSignup = (e) => {
    e.preventDefault();
    closePopup();
  };

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="header">
          <div className="logo">
            <span>Legacy</span>
            <span>Lock</span>
          </div>
          <button
            className="hamburger-menu"
            aria-label="Toggle menu"
            onClick={() => setShowMenu(!showMenu)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <aside
            className={`side-menu ${showMenu ? 'open' : ''}`}
            onClick={() => setShowMenu(false)}
          >
            <div
              className="side-menu-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setShowLoginPopup(true)}>Log in</button>
              <button onClick={() => setShowSignupPopup(true)}>Sign up</button>
            </div>
          </aside>
        </div>
      </header>

      <main>
        <div className="animated-text-container">
          <div className="animated-text">
            <span className="light">MEMORIES</span>
            <span className="dark">MEMORIES</span>
            <span className="light">MEMORIES</span>
            <span className="dark">MEMORIES</span>
            <span className="light">MEMORIES</span>
            <span className="dark">MEMORIES</span>
          </div>
          <div className="animated-text">
            <span className="light">MEMORIES</span>
            <span className="dark">MEMORIES</span>
            <span className="light">MEMORIES</span>
            <span className="dark">MEMORIES</span>
            <span className="light">MEMORIES</span>
            <span className="dark">MEMORIES</span>
          </div>
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

      <button className="learn-more-button" onClick={() => setShowLearnMore(!showLearnMore)}>
        + Learn more
      </button>
      {showLearnMore && (
        <div className="learn-more-overlay" onClick={() => setShowLearnMore(false)}>
          <div
            className="learn-more-container"
            onClick={(e) => e.stopPropagation()}
          >
            <p>
              Imagine sneaking a note into a secret vault that only opens in the
              future—no spoilers allowed! That’s the magic of our Virtual Time
              Capsule: lock away your photos and words of wisdom (or whimsy)
              today, and let them emerge exactly when they’re meant to. Ready to
              share a slice of tomorrow’s nostalgia? Dive in and start
              time-traveling… minus any space-time paradoxes!
            </p>
          </div>
        </div>
      )}

      {showLoginPopup && (
        <LoginPage
          onClose={() => setShowLoginPopup(false)}
          openSignup={() => {
            setShowLoginPopup(false);
            setShowSignupPopup(true);
          }}
          handleLogin={handleLogin}
        />
      )}

      {showSignupPopup && (
        <SignUpPage
          onClose={() => setShowSignupPopup(false)}
          handleSignup={handleSignup}
        />
      )}
    </div>
  );
};

export default LandingPage;
