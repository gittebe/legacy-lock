/**
 * 
 * The Zustand Store
 * 
 * This store handles global authentication state.
 * 
 * Features:
 * - isLoggedIn: Tracks whether the user is logged in.
 * - user: Stores the logged-in user's object (e.g., email and password).
 * - set: A function provided by Zustand to update the store's state.
 * - login(user): Updates the store with user details and sets `isLoggedIn` to true.
 * - logout(): Resets the store to its initial state (logs out the user).
 */

import { create } from 'zustand';

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
}));

export default useStore;
