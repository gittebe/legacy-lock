// import { Routes, Route } from 'react-router-dom';
// import { LandingPage } from '../pages/LandingPage';
// import { DashboardPage } from '../pages/DashboardPage';
// import {CreateCapsulePage} from "../pages/CreateCapsulePage"
// import { CapsuleDetailsPage } from '../pages/CapsuleDetailsPage';
// import { NotFoundPage } from '../pages/NotFoundPage';

// // checks if user has access Token
// const isAuthenticated = () => {
//   const token = localStorage.getItem('token');
//   console.log("Token found:", token)
//   return !!token; // Wenn Token vorhanden ist, ist der Benutzer authentifiziert
// };

// export const RoutesConfig = ({ isLoggedIn }) => {
//   const { isLoggedIn } = useStore(); // hole den isLoggedIn Zustand aus dem Store

//   console.log('Is user authenticated (from store):', isLoggedIn); 
//   // const authenticated = isLoggedIn || isAuthenticated(); // Falls der State isLoggedIn von useStore wahr ist, ist der Benutzer authentifiziert

//   return (
//     <Routes>
//       {/* Öffentliche Routen, wenn der Benutzer nicht eingeloggt ist */}
//       {!authenticated ? (
//         <>
//           <Route path="/" element={<LandingPage />} />
//         </>
//       ) : (
//         // Authentifizierte Routen, wenn der Benutzer eingeloggt ist
//         <>
//           <Route path="/dashboard" element={<DashboardPage />} />
//           <Route path="/profile" element={<ProfileSettingsPage />} />
//           <Route path="/capsules/create" element={<CreateCapsulePage />} />
//           <Route path="/capsules/:id" element={<CapsuleDetailsPage />} />
//         </>
//       )}

//       {/* Fallback für nicht existierende Routen */}
//       <Route path="*" element={<NotFoundPage />} />
//     </Routes>
//   );
// };

import { Routes, Route } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';
import { DashboardPage } from '../pages/DashboardPage';
import { CreateCapsulePage } from "../pages/CreateCapsulePage";
import { CapsuleDetailsPage } from '../pages/CapsuleDetailsPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ProfileSettingsPage } from '../pages/ProfileSettingsPage'; // Falls vorhanden
import useStore from '../store/store';

const token = localStorage.getItem('accessToken');
const response = await fetch('http://localhost:5000/dashboard', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

export const RoutesConfig = () => {
  const { isLoggedIn } = useStore(); // hole den isLoggedIn Zustand aus dem Store

  console.log('Is user authenticated (from store):', isLoggedIn); // Debugging, um zu sehen, ob der Zustand korrekt ist

  return (
    <Routes>
      {/* Öffentliche Routen, wenn der Benutzer nicht eingeloggt ist */}
      {!isLoggedIn ? (
        <>
          <Route path="/" element={<LandingPage />} />
          {console.log('Public route (LandingPage)')} {/* Debugging public route */}
        </>
      ) : (
        // Authentifizierte Routen, wenn der Benutzer eingeloggt ist
        <>
          <Route 
          path="/dashboard" 
          element={isLoggedIn ? <DashboardPage /> : <Navigate to="/" /> } />
          {console.log('Authenticated route (DashboardPage)')} {/* Debugging authenticated route */}
          <Route path="/profile" element={<ProfileSettingsPage />} />
          {console.log('Authenticated route (ProfileSettingsPage)')} {/* Debugging authenticated route */}
          <Route path="/capsules/create" element={<CreateCapsulePage />} />
          {console.log('Authenticated route (CreateCapsulePage)')} {/* Debugging authenticated route */}
          <Route path="/capsules/:id" element={<CapsuleDetailsPage />} />
          {console.log('Authenticated route (CapsuleDetailsPage)')} {/* Debugging authenticated route */}
        </>
      )}

      {/* Fallback für nicht existierende Routen */}
      <Route path="*" element={<NotFoundPage />} />
      {console.log('Fallback route (NotFoundPage)')} {/* Debugging fallback route */}
    </Routes>
  );
};
