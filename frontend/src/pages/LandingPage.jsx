/**
 * This component is the landing page for unauthenticated users.
 * 
 * It displays a welcome message and provides links to the login and signup pages.
 */

import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h1>Legacy Lock</h1>
      <p>Welcome to the Landing page!</p>
      <p>Sign up or login to get started.</p>
      <p><Link to="/login">Login here</Link></p>
      <p><Link to="/signup">Sign up here</Link></p>
    </div>
  );
};

export default LandingPage;
