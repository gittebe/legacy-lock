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

const useCapsuleStore = create((set, get) => ({
  isLoggedIn: false,
  user: null,
  capsules: { created: [], received: [] },
  loading: false,
  error: null, // valfritt

  login: (user) => set({
    isLoggedIn: true,
    user,
  }),

  logout: () => set({
    isLoggedIn: false,
    user: null,
    capsules: { created: [], received: [] },
  }),

  fetchCapsules: async () => {
    // Kolla om redan laddar
    if (get().loading) return;

    set({ loading: true, error: null });

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.log("No access token found");
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
        console.log("Failed to fetch capsules");
        set({ loading: false, error: "Fetch failed" });
        return;
      }

      const userCapsules = await userCapsulesResponse.json();
      const receivedCapsules = await receivedCapsulesResponse.json();

      // Uppdatera capsules och stäng av loading
      set({
        capsules: {
          created: userCapsules.data || [],
          received: receivedCapsules.data || [],
        },
        loading: false,
      });
    } catch (error) {
      console.log("Error fetching capsules:", error);
      set({ loading: false, error: error.message });
    }
  },
}));

export default useCapsuleStore;

