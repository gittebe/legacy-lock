
import { create } from 'zustand';

export const useStore = create((set) => ({
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
}));

export default useStore;
