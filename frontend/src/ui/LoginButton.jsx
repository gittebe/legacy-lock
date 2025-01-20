import './LoginButton.css';

const LoginButton = ({ onClick }) => {
  return (
    <button type="submit" className="login-button" onClick={onClick}>
      Log in
    </button>
  );
};

export default LoginButton;
