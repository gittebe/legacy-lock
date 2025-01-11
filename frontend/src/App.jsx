import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useStore from './store/store';
import PublicRoutes from './routes/PublicRoutes';
import AuthenticatedRoutes from './routes/AuthenticatedRoutes';

const App = () => {
  const isLoggedIn = useStore((state) => state.isLoggedIn); // Check if user is logged in
  
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
        // If user is logged in, show authenticated routes
          < Route path="/*" element={<AuthenticatedRoutes />} />
        ) : (
          // If user is NOT logged in, show public routes
          <Route path="/*" element={<PublicRoutes />} />
        )}

        {/* Fallback: Check login status and redirect to dashboard or login depending on status */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </Router>
  );
};

export default App;
