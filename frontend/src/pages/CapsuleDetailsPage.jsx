/**
 * This page is for view an individual capsule.
 */

// import useStore from "../store/store";
// import { useState, useEffect } from "react";
// import { useParams, Navigate, useNavigate } from "react-router-dom";
// import { SideMenu } from "../components/SideMenu";
// import { Header } from "../components/Header";
// import { formatDateTime } from "../utils/date";
// import { CapsuleDetailCard } from "../components/CapsuleDetailCard";


// export const CapsuleDetailsPage = () => {
//   const user = useStore((state) => state.user);
//   const logout = useStore((state) => state.logout);
//   const navigate = useNavigate();
//   const [showMenu, setShowMenu] = useState(false);
//   const { id } = useParams(); // Get the capsule ID from the URL
//   console.log("Capsule ID from URL:", id);

//   const getCapsuleById = useStore((state) => state.getCapsuleById); // Get the method to fetch a capsule by ID
//   const [capsuleDetails, setCapsuleDetails] = useState(null); // Store the capsule in the local state
//   const [loading, setLoading] = useState(true); // Track loading state

//   useEffect(() => {
//     // Fetch the capsule details when the component mounts
//     console.log("Frontend: Fetching capsule for ID:", id);

//     const fetchCapsule = async () => {
//       try {
//         const capsule = await getCapsuleById(id);
//         console.log("Frontend: Fetched capsule:", capsule);
//         setCapsuleDetails(capsule);
//       } catch (error) {
//         console.error("Frontend: Error fetching capsule details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchCapsule();
//     } else {
//       console.log("Frontend: No ID provided for fetching capsule.");
//       setLoading(false);
//     }
//   }, [id, getCapsuleById]);

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   const handleLogout = () => {
//     logout(); // Call the logout method from your store
//     navigate("/"); // Redirect to home or login page
//   };

//   // Handle loading state
//   if (loading) {
//     return <p>Loading capsule details...</p>;
//   }

//   // Handle capsule not found
//   if (!capsuleDetails) {
//     return <p>Capsule not found.</p>;
//   }

//   // Check if the capsule is locked
//   const isLocked = new Date() < new Date(capsuleDetails.openAt);

//   return (
//     <>
//       <Header toggleMenu={() => setShowMenu(!showMenu)} />
//       <SideMenu
//         showMenu={showMenu}
//         toggleMenu={() => setShowMenu(false)}
//         isLoggedIn={!!user}
//         onLogoutClick={handleLogout}
//       />
//       <div>
//         <h1>Capsule Details Page</h1>
//         {isLocked ? (
//           <p>
//            This capsule is locked until{" "}
//            {formatDateTime(new Date(capsuleDetails.openAt))}.
//           </p>
//         ) : (
//           <CapsuleDetailCard capsule={capsuleDetails} />
//           )}
//       </div>
//     </>
//   );
// };

import useStore from "../store/store";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { SideMenu } from "../components/SideMenu";
import { Header } from "../components/Header";

export const CapsuleDetailsPage = () => {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    console.log("Logout button clicked");
    logout(); // Call the logout method from your store
    navigate("/"); // Redirect to home or login page
  };

  return (
    <>
 <Header toggleMenu={() => setShowMenu(!showMenu)}/>
    <SideMenu
          showMenu={showMenu}
          toggleMenu={() => setShowMenu(false)}
          isLoggedIn={!!user}
          onLogoutClick={handleLogout}
    />
    <div>
      <h1>Capsule Details Page</h1>
      <p>Welcome to the CapsuleDetailsPage!</p>
    </div>
    </>
  );
};
