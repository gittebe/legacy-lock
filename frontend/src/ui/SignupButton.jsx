import './SignupButton.css';

export const SignUpButton = ({ onClick }) => {
  return (
    <button type="submit" className="signup-button" onClick={onClick}>
      Sign up
    </button>
  );
};