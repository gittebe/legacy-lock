import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import useStore from './store/store';
import PublicRoutes from './routes/PublicRoutes';
import AuthenticatedRoutes from './routes/AuthenticatedRoutes';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  const isLoggedIn = useStore((state) => state.isLoggedIn); // Check if user is logged in
  
  return (
    <Router>
      <Routes>
        {/* Authenticated routes */}
        {isLoggedIn ? (
        // If user is logged in, show authenticated routes
          < Route path="/*" element={<AuthenticatedRoutes />} />
        ) : (
        // Redirect to login if no matching route is found
        <Route path="/*" element={<Navigate to="/login" replace />} />
        )}
        
        {/* Public Routes */}
        {/* If user is not logged in, show public routes */}
        {!isLoggedIn && <Route path="/login" element={<PublicRoutes />} />}

        {/* 404 page */}
        {/* If no matching route is found, show 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
