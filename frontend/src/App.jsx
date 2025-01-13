import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useStore from './store/store';
import PublicRoutes from './routes/PublicRoutes';
import AuthenticatedRoutes from './routes/AuthenticatedRoutes';

const App = () => {
  const isLoggedIn = useStore((state) => state.isLoggedIn); // Check if user is logged in
  
  return (
    <Router>
      <Routes>
        < Route
          path="/*"
          element={isLoggedIn ? <AuthenticatedRoutes /> : <PublicRoutes />}
        />
      </Routes>
    </Router>
  );
};

export default App;
