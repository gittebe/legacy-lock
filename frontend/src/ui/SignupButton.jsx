import "./SignupButton.css";

export const SignUpButton = ({ onClick }) => {
  return (
    <button type="submit" className="signup-button" onClick={onClick} aria-label="Sign up for an account">
      Sign up
    </button>
  );
};