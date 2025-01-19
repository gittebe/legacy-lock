import './SignupButton.css';

const SignUpButton = ({ onClick }) => {
  return (
    <button type="submit" className="signup-button" onClick={onClick}>
      Sign up
    </button>
  );
};

export default SignUpButton;
