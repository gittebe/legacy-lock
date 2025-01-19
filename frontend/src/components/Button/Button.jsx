/**
 * Button component 
 * 
 * Customizable button component that can be used in any component. It takes in children, onClick, type, and className as props. 
 */

const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
