import { create } from "zustand";
import { persist } from "zustand/middleware";
import verifyTokenExpiry from "../utils/verifyTokenExpiry";

// interface authState {
//   login: (username: string, password: string) => void;
//   signup: (username: string, password: string) => void;
//   token: string | null;
//   setToken: (token: string) => void;
//   clearToken: () => void;
// }

export const useAuthStore = create(
  persist(
    (set, get: any) => ({
      isAuthenticated: false,
      isAdminAuthenticated: false,
      // "persists" saves the object to local storage
      login: async (username: string, password: string) => {
        const credentialsJson = JSON.stringify({ username, password });

        try {
          const response = await fetch(
            "https://elite-manager.onrender.com/api/login",
            {
              method: "post",
              headers: { "Content-Type": "Application/json" },
              body: credentialsJson,
            },
          );

          const responseBody = await response.json();

          if (responseBody.success) {
            localStorage.setItem("token", responseBody.token);
            // localStorage.setItem("loggedIn", "true");
            if (responseBody.isAdmin) {
              set({ isAdminAuthenticated: true, isAuthenticated: true });
            } else {
              set({ isAuthenticated: true });
            }
          }

          return responseBody;
        } catch (error: any) {
          throw error;
        }
      },
      signup: async (
        fName: string,
        lName: string,
        username: string,
        password: string,
        isAdmin: boolean,
      ) => {
        const credentials = {
          fName,
          lName,
          username,
          password,
          isAdmin,
        };

        const credentialsJson = JSON.stringify(credentials);

        try {
          const response = await fetch(
            "https://elite-manager.onrender.com/api/signup",
            {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: credentialsJson,
            },
          );

          return response;
        } catch (error: any) {
          throw error;
        }
      },
      logout: async () => {
        try {
          const response = await fetch(
            "https://elite-manager.onrender.com/api/logout",
          );

          if (!response.ok) {
            throw new Error("Logout failed.");
          }

          const responseBody = await response.json();

          if (responseBody.success) {
            localStorage.removeItem("token");
            set({ isAuthenticated: false, isAdminAuthenticated: false });
          }
        } catch (error: any) {
          console.error(error.message);
        }
      },
      checkSession: () => {
        const token = localStorage.getItem("token");
        const isExpiredToken = verifyTokenExpiry(token);
        console.log(isExpiredToken);
        // const isLoggedIn = localStorage.getItem("loggedIn") === "true";
        if (isExpiredToken || !get().isAuthenticated) {
          get().logout();
        }
      },
    }),
    { name: "auth-storage" },
  ),
);
