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
    user: user
  }),

  logout: () => set({
    isLoggedIn: false,
    user: null,
    capsules: { created: [], received: [] },
  }),
}));

export default useStore;
