import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api/axios";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: true,
      error: null,
      checkAuth: async () => {
        try {
          const res = await api.get("/auth/me");

          set({
            user: res.data.user,
            loading: false,
            error: null,
          });

        } catch (err) {
          set({
            user: null,
            loading: false,
          });
        }
      },

      
      login: async (data) => {
        try {
          set({ loading: true });

          await api.post("/auth/login", data);

          await get().checkAuth();

        } catch (err) {
          set({
            error:
              err.response?.data?.message ||
              "Login failed",
            loading: false,
          });

          throw err;
        }
      },

      register: async (data) => {
        try {
          set({ loading: true });

          await api.post("/auth/register", data);

          await get().login(data);

        } catch (err) {
          set({
            error:
              err.response?.data?.message ||
              "Register failed",
            loading: false,
          });

          throw err;
        }
      },
      logout: async () => {
        try {
          await api.post("/auth/logout");
        } finally {
          set({
            user: null,
            loading: false,
          });
        }
      },

      clearError: () => set({ error: null }),
    }),

   
    {
      name: "auth-store", // key in localStorage

      partialize: (state) => ({
        user: state.user, // only save user
      }),

      onRehydrateStorage: () => (state) => {
        state?.checkAuth();
      },
    }
  )
);
