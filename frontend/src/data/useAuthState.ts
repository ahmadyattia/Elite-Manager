import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate, type NavigateFunction } from "react-router";

interface authState {
  login: (username: string, password: string) => void;
  signup: (username: string, password: string) => void;
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create(
  persist(
    (set, get: any) => ({
      isAuthenticated: false,
      isAdminAuthenticated: false,
      // "persists" saves the object to local storage
      login: async (username: string, password: string) => {
        const credentialsJson = JSON.stringify({ username, password });

        try {
          const response = await fetch("http://localhost:5000/api/login", {
            method: "post",
            headers: { "Content-Type": "Application/json" },
            body: credentialsJson,
            credentials: "include",
          });

          const responseBody = await response.json();

          if (responseBody.success) {
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
          const response = await fetch("http://localhost:5000/api/signup", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: credentialsJson,
          });

          return response;
        } catch (error: any) {
          throw error;
        }
      },
      logout: async () => {
        try {
          const response = await fetch("http://localhost:5000/api/logout", {
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error("Logout failed.");
          }

          const responseBody = await response.json();

          if (responseBody.success) {
            set({ isAuthenticated: false, isAdminAuthenticated: false });
          }
        } catch (error: any) {
          console.error(error.message);
        }
      },
      checkSessionCookie: () => {
        if (!document.cookie.includes("logged_in=") && get().isAuthenticated) {
          get().logout();
        }
      },
    }),
    { name: "auth-storage" },
  ),
);
