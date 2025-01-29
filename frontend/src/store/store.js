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

// export default useStore;
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

  logout: async () => {
    set({ loading: true });
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log("Access Token:", accessToken);
      if (!accessToken) {
        console.error("No token found for logout.");
        set({ loading: false, error: "No token found for logout." });
        return;
      }

      // API-request to logout
      const response = await fetch("http://localhost:5000/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ accessToken }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Logout failed");
      }

      localStorage.removeItem("accessToken");
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

  // Add a new capsule to the store
  addCapsule: (newCapsule) =>
    set((state) => ({
      capsules: {
        ...state.capsules,
        created: [...state.capsules.created, newCapsule],
      },
    })),

  // Get a single capsule by ID
  getCapsuleById: async (id) => {
    const { capsules, fetchCapsules } = get();

    try {
      if (!id) {
        throw new Error("No ID provided");
      }
      const token = localStorage.getItem("accessToken");
      console.log("Store: Fetching capsule by ID:", id, "Access Token:", token);
      const url = `http://localhost:5000/capsule/getCapsule/${id}`;
      console.log("URL being fetched:", url);
      
      if (!token) {
        console.error("No access token found");
        return null;
      }

      const response = await fetch(`http://localhost:5000/capsule/getCapsule/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to fetch capsule");
      }

      const capsule = await response.json();
      return capsule;
    } catch (error) {
      console.error("Store: Error fetching capsule:", error);
      return null;
    }
  },

  // *** Profile Picture Upload Action ***
  uploadProfileImage: async (file) => {
    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/users/upload-profile-image", {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload profile picture");
      }

      const data = await response.json();
      return data.profileImageUrl;
    } catch (error) {
      console.error("Error uploading profile picture:", error.message);
      throw error;
    }
  },
}));

export default useStore;