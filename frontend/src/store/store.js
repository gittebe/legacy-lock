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
  // *** Login state ***
  isLoggedIn: false,
  user: null,

  // *** Capsules state ***
  capsules: { created: [], received: [] },
  loading: false,
  error: null,

  // *** Login actions ***
  login: (user) => set({
    isLoggedIn: true,
    user: user,
  }),

  logout: () => set({
    isLoggedIn: false,
    user: null,
    capsules: { created: [], received: [] },
  }),

  setIsLoggedIn: (isLoggedIn, user = null) => set({
    isLoggedIn: isLoggedIn,
    user: user,
  }),

  // *** Capsules actions ***
  fetchCapsules: async () => {
    if (get().loading) return; // Prevent multiple requests

    set({ loading: true, error: null });

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found");
        set({ error: "No access token found", loading: false });
        return;
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
        set({ error: "Failed to fetch capsules", loading: false });
        return;
      }

      const userCapsules = await userCapsulesResponse.json();
      const receivedCapsules = await receivedCapsulesResponse.json();

      set({
        capsules: {
          created: userCapsules.data || [],
          received: receivedCapsules.data || [],
        },
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching capsules:", error);
      set({ loading: false, error: error.message });
    }
  },
}));

export default useStore;
