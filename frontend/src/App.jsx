import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import PublicRoutes from './routes/PublicRoutes';
import AuthenticatedRoutes from './routes/AuthenticatedRoutes';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PublicRoutes />} />
      <Route path="/" element={<AuthenticatedRoutes />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default App;
