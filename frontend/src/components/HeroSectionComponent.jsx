import { LoginButton } from "../ui/LoginButton";
import { SignUpButton } from "../ui/SignupButton";
import { LearnMoreButton } from "../ui/LearnMoreButton";

export const HeroSection = ({ isSmallScreen, onLoginClick, onSignUpClick }) => {
  return (
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
        <img src="/landingimage.jpg" alt="Landing image" className="animated-image" />
      </div>
      <p className="subtext">
        Raise your memories from the archive and select the best ones.
      </p>

      {isSmallScreen && (
        <div className="landing-buttons">
          <LoginButton onClick={onLoginClick} />
          <SignUpButton onClick={onSignUpClick} />
        </div>
      )}
      <LearnMoreButton />
    </main>
  );
};