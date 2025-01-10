import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import CreateCapsulePage from './pages/CreateCapsulePage';
import CapsuleDetailsPage from './pages/CapsuleDetailsPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/profile" element={<ProfileSettingsPage />} />
      <Route path="/capsules/create" element={<CreateCapsulePage />} />
      <Route path="/capsules/:id" element={<CapsuleDetailsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default App;
