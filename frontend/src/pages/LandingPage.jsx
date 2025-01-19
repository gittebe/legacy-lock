import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import Header from '../components/Header';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import LearnMoreButton from '../ui/LearnMore';
import LoginButton from '../ui/LoginButton';
import SignUpButton from '../ui/SignupButton';

const LandingPage = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closePopup = () => {
    setShowLoginPopup(false);
    setShowSignupPopup(false);
  };

  return (
    <div className="landing-page">
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

        {isSmallScreen && (
          <div className="landing-buttons">
            <LoginButton onClick={() => setShowLoginPopup(true)} />
            <SignUpButton onClick={() => setShowSignupPopup(true)} />
          </div>
        )}
      </main>

      <LearnMoreButton />

      {showLoginPopup && (
        <LoginPage
          onClose={() => setShowLoginPopup(false)}
          openSignup={() => {
            setShowLoginPopup(false);
            setShowSignupPopup(true);
          }}
        />
      )}

      {showSignupPopup && (
        <SignUpPage
          onClose={() => setShowSignupPopup(false)}
        />
      )}
    </div>
  );
};

export default LandingPage;
