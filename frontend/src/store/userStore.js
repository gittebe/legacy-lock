import zustand from 'zustand';

const useUserStore = zustand((set) => ({
  user: null,
}));
