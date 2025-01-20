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
  isLoggedIn: true,
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

  // *** Capsules ***
  fetchCapsules: async () => {
    console.log("Fetching capsules...");
    set({ loading: true });
    try {
      const response = await fetch("http://localhost:5000/capsules");
      // Check if the response is ok
      if (!response.ok) {
        throw new Error("Failed to fetch capsules");
      }
      const data = await response.json();
      console.log("Capsules fetched:", data);
      set({ capsules: data });
    } catch (error) {
      console.error("Error fetching capsules:", error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useStore;
