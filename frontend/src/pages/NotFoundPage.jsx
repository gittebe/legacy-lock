// This component displays a "404 - Page Not Found" message when the user navigates to a non-existent route. 
// It imports Link from react-router-dom to create a navigation link for Go Back to Home.  

import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="page-not-found">
      {/* Main heading for the error message */}
      <h1>Oh no!</h1>

      {/* Subheading to clarify that the page was not found */}
      <h2>404 Not Found</h2>

      {/* Message explaining the situation to the user */}
      <p>It seems that the page you are trying to access does not exist.</p>

      {/* Link component to navigate back to the home page */}
      {/* The link points to "/go-back-to-home", which is routed to render the Home component */}
      <Link to="/">Go Back to Home</Link>
    </div>
  );
};