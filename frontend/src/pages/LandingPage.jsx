import React, { useState } from 'react';
import './LandingPage.css';
import Header from '../components/Header';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import LearnMoreButton from '../ui/LearnMore';

const LandingPage = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const closePopup = () => {
    setShowLoginPopup(false);
    setShowSignupPopup(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    closePopup();
    console.log("User logged in");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    closePopup();
    console.log("User signed up");
  };

  return (
    <div className="landing-page">
      {/* Header Component */}
      <Header toggleMenu={() => setShowMenu(!showMenu)} />

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

      <LearnMoreButton />

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
