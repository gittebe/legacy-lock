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
 *  - user: Stores the logged-in user's object (e.g., email, username, profilePicture).
 *  - set: A function provided by Zustand to update the store's state.
 *  - login(user): Updates the store with user details and sets `isLoggedIn` to true.
 *  - logout(): Resets the store to its initial state (logs out the user).
 *  - setIsLoggedIn(isLoggedIn, user): Manually sets the login state and updates the user object.
 *  - initializeUser(): Loads the user and profile picture from localStorage on app initialization.
 *  - updateProfilePicture(file): Handles uploading a profile picture to the server and updating the user's state.
 * - Capsules:
 *  - capsules: Stores a list of the user's capsules (created and received).
 *  - fetchCapsules(): Retrieves the user's capsules from the server.
 *  - addCapsule(newCapsule): Adds a new capsule to the created list.
 *  - getCapsuleById(id): Retrieves a specific capsule's details from the server.
 *  - loading: Loading indicator to show whether the data is being fetched.
 *  - error: Error state for handling failures.
 */

import { create } from "zustand";
import { uploadProfilePicture } from "../utils/uploadProfilePicture";

const useStore = create((set, get) => ({
  // *** Login state ***
  isLoggedIn: false,
  user: null,

  // *** Capsules state ***
  capsules: { created: [], received: [] },
  loading: false,
  error: null,

  // *** Login actions ***
  login: (user) => {
    // Save the user and profile picture to localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("profilePicture", user.profilePicture || ""); // Save the profile picture if it exists
    set({
      isLoggedIn: true,
      user: { ...user, profilePicture: user.profilePicture || "" },
    });
  },

  logout: async () => {
    set({ loading: true });
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("No token found for logout.");
        set({ loading: false, error: "No token found for logout." });
        return;
      }

      const response = await fetch("http://localhost:5001/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ accessToken }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Logout failed");
      }

      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("profilePicture"); // Remove profile picture from storage
      set({
        isLoggedIn: false,
        user: null,
        capsules: { created: [], received: [] },
        loading: false,
      });
    } catch (error) {
      console.error("Error logging out:", error);
      set({ loading: false, error: error.message });
    }
  },

  setIsLoggedIn: (isLoggedIn, user = null) => {
    if (isLoggedIn) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("profilePicture", user.profilePicture || ""); // Save profile picture
      set({ isLoggedIn: true, user: { ...user, profilePicture: user.profilePicture || "" } });
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("profilePicture"); // Remove profile picture
      set({ isLoggedIn: false, user: null });
    }
  },

  initializeUser: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const profilePicture = localStorage.getItem("profilePicture");
    if (user) {
      set({
        isLoggedIn: true,
        user: { ...user, profilePicture: profilePicture || "" },
      });
    }
  },

  updateProfilePicture: async (file) => {
    try {
      // Upload to backend
      const url = await uploadProfilePicture(file);

      // Update user state with new profile picture URL
      const { user } = get();
      const updatedUser = { ...user, profilePicture: url };

      // Save to localStorage
      localStorage.setItem("profilePicture", url);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Update Zustand state
      set({
        user: updatedUser,
      });
    } catch (error) {
      console.error("Failed to update profile picture:", error);
    }
  },

  // *** Capsules actions ***
  fetchCapsules: async () => {
    if (get().loading) return;

    set({ loading: true, error: null });

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found");
        set({ error: "No access token found", loading: false });
        return;
      }

      const [userCapsulesResponse, receivedCapsulesResponse] = await Promise.all([
        fetch("http://localhost:5001/capsule/getUserCapsules", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5001/capsule/getReceivedCapsules", {
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

  addCapsule: (newCapsule) =>
    set((state) => ({
      capsules: {
        ...state.capsules,
        created: [...state.capsules.created, newCapsule],
      },
    })),

  getCapsuleById: async (id) => {
    const { capsules, fetchCapsules } = get();

    try {
      if (!id) {
        throw new Error("No ID provided");
      }
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:5001/capsule/getCapsule/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to fetch capsule");
      }

      return await response.json();
    } catch (error) {
      console.error("Store: Error fetching capsule:", error);
      return null;
    }
  },
}));

export default useStore;
