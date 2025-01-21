/**
 * 
 * The Zustand Store
 * 
 * This store handles global authentication state.
 * 
 * Features:
 * 
 * - Authentication:
 *  - isLoggedIn: Tracks whether the user is logged in.
 *  - user: Stores the logged-in user's object (e.g., email and password).
 *  - set: A function provided by Zustand to update the store's state.
 *  - login(user): Updates the store with user details and sets `isLoggedIn` to true.
 *  - logout(): Resets the store to its initial state (logs out the user).
 * - Capsules:
 *  - capsules: Stores a list of the user's capsules.
 *  - fetchCapsules(): Retrieves the user's capsules from the server.
 *  - loading: Loading indicator to show whether the data is being fetched. 
 */

import { create } from "zustand";

 // *** Login ***

const useStore = create((set) => ({
  // *** Initial state ***
  isLoggedIn: false,
  user: null,

  // *** Actions ***
  login: (user) => set ({
    isLoggedIn: true,
    user: user
  }),
  logout: () => set({
    isLoggedIn: false,
    user: null,
  }),

  // *** Fetch Capsules ***
  fetchCapsules: async () => {
    console.log("Fetching capsules...");
    set({ loading: true });
    try {
      const token = localStorage.getItem("accessToken");
      const [userCapsules, receivedCapsules] = await Promise.all([
        fetch("http://localhost:5000/getUserCapsules", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch("http://localhost:5000/getReceivedCapsules", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }), 
      ]);
  
      // Check if the response is ok
      if (!response.ok) {
        throw new Error("Failed to fetch capsules");
      }

      const userCapsules = await response.json();
      const receivedCapsules = await response.json();

      console.log("Capsules fetched:", { userCapsules, receivedCapsules });

      // Update Zustand state with the fetched capsules

      set({ 
        capsules: {
          created: userCapsules.data,
          received: receivedCapsules.data,
        },
      });
    } catch (error) {
      console.error("Error fetching capsules:", error);
      
    } finally {
      set({ loading: false });
    }
  },
}));

export default useStore;
