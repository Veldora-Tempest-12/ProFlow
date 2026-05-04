import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

/**
 * Type definitions for auth store payloads and state.
 */
interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirm_password?: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthState {
  user: any | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  register: (
    userData: RegisterData,
  ) => Promise<{ success: boolean; error?: string }>;
  login: (
    credentials: LoginCredentials,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (
    profileData: any,
  ) => Promise<{ success: boolean; error?: string }>;
  checkAuth: () => void;
  getProfile: () => Promise<{ success: boolean; error?: string }>;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

const API_BASE = "http://localhost:8000";

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      isCheckingAuth: true,
      error: null,

      // Actions
      register: async (userData: RegisterData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(
            `${API_BASE}/accounts/user/`,
            userData,
          );
          const data = response.data;

          set({
            user: data.user,
            token: data.access,
            refreshToken: data.refresh,
            isAuthenticated: true,
            isLoading: false,
          });
          return { success: true };
        } catch (error: any) {
          console.log(error);
          const message =
            error?.response?.data?.username ||
            error?.response?.data?.email ||
            error?.response?.data?.password ||
            error.message ||
            "Registration failed";
          set({ error: message, isLoading: false });
          return { success: false, error: message };
        }
      },

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(
            `${API_BASE}/accounts/token/`,
            credentials,
          );
          const data = response.data;

          set({
            token: data.access,
            refreshToken: data.refresh,
            isAuthenticated: true,
            isLoading: false,
          });
          return { success: true };
        } catch (error: any) {
          const message =
            error?.response?.data?.detail || error.message || "Login failed";
          set({ error: message, isLoading: false });
          return { success: false, error: message };
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null,
        });
      },

      updateProfile: async (profileData: any) => {
        const { token } = get();
        set({ isLoading: true, error: null });
        try {
          const response = await axios.patch(
            `${API_BASE}/accounts/user/`,
            profileData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const data = response.data;

          set({ user: data.user, isLoading: false });
          return { success: true };
        } catch (error: any) {
          const message =
            error?.response?.data?.detail || error.message || "Update failed";
          set({ error: message, isLoading: false });
          return { success: false, error: message };
        }
      },

      getProfile: async () => {
        const { token } = get();
        if (!token) {
          set({ error: "No token", isLoading: false });
          return { success: false, error: "No token" };
        }
        set({ isLoading: true, error: null });
        try {
          const response = await axios.get(`${API_BASE}/accounts/profile/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          set({ user: response.data, isLoading: false });
          console.log(response.data);
          return { success: true };
        } catch (error: any) {
          const message =
            error?.response?.data?.detail ||
            error.message ||
            "Failed to fetch profile";
          set({ error: message, isLoading: false });
          return { success: false, error: message };
        }
      },

      checkAuth: async () => {
        const { refreshToken } = get();
        set({ isCheckingAuth: true, error: null });
        try {
          const response = await axios.post(
            `${API_BASE}/accounts/token/refresh/`,
            { refresh: refreshToken },
          );
          const data = response.data;
          set({
            token: data.access,
            isAuthenticated: true,
            isCheckingAuth: false,
          });
        } catch (error) {
          set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "proflow-auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export default useAuthStore;
