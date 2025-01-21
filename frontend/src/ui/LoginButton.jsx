import "./LoginButton.css";

export const LoginButton = ({ onClick }) => {
  return (
    <button type="submit" className="login-button" onClick={onClick}>
      Log in
    </button>
  );
};