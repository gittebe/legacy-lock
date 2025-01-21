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

const useStore = create((set, get) => ({
  // Initial state
  isLoggedIn: false,
  user: null,
  capsules: { created: [], received: [] },
  loading: false,

  // Actions
  login: (user) => set({
    isLoggedIn: true,
    user: user,
  }),
  logout: () => set({
    isLoggedIn: false,
    user: null,
    capsules: { created: [], received: [] },
  }),

  // Fetch Capsules
  fetchCapsules: async () => {
    const { loading } = get(); // Get the loading status
    if (loading) {
      return; // Stop script if fetech is already in progress
    }

    set({ loading: true }); // Set loading to true

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found");
        set({ loading: false });
        return; // // Stop script if no token is found
      }
  
      const [userCapsulesResponse, receivedCapsulesResponse] = await Promise.all([
        fetch("http://localhost:5000/capsule/getUserCapsules", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/capsule/getReceivedCapsules", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
  
      if (!userCapsulesResponse.ok || !receivedCapsulesResponse.ok) {
        console.error("Failed to fetch capsules");
        set({ loading: false });
        return; // Stop script on error
      }
  
      const userCapsules = await userCapsulesResponse.json();
      const receivedCapsules = await receivedCapsulesResponse.json();
  
      set({
        capsules: {
          created: userCapsules.data || [],
          received: receivedCapsules.data || [],
        },
      });
    } catch (error) {
      console.error("Error fetching capsules:", error);
      set({ loading: false });
      return; // Stop script on error
    } finally {
      set({ loading: false });
    }
  },
}));

export default useStore;
