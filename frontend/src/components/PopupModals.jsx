import { SignUpForm } from "./SignUpForm";
import { LoginForm } from "./LoginForm";


export const PopupModals = ({ showLoginPopup, showSignupPopup, onLoginClose, onSignupClose, openSignup }) => {
  return (
    <>
      {showLoginPopup && (
        <LoginForm onClose={onLoginClose} openSignup={openSignup} />
      )}
      {showSignupPopup && (
        <SignUpForm onClose={onSignupClose} />
      )}
    </>
  );
};