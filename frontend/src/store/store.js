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
    if (get().loading) return;

    set({ loading: true });

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }

      const [userCapsulesResponse, receivedCapsulesResponse] = await Promise.all([
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

      if (!userCapsulesResponse.ok || !receivedCapsulesResponse.ok) {
        throw new Error("Failed to fetch capsules");
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
      console.error(error);
      set({ loading: false });
    }
  },
}));

export default useStore;
