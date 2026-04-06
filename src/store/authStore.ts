import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      isLoading: true,

      login: async (email: string, _password: string) => {
        await wait(1100);
        const user = {
          email,
          name: email.split("@")[0].replace(/[._-]/g, " "),
          role: "Security Lead",
        };
        const token = `shieldtest-${crypto.randomUUID()}`;
        set({ isAuthenticated: true, user, token, isLoading: false });
        return true;
      },

      register: async (name: string, email: string, _password: string) => {
        await wait(1400);
        const user = {
          email,
          name,
          role: "Platform Admin",
        };
        const token = `shieldtest-${crypto.randomUUID()}`;
        set({ isAuthenticated: true, user, token, isLoading: false });
        return true;
      },

      logout: () => {
        set({ isAuthenticated: false, user: null, token: null, isLoading: false });
      },

      checkAuth: () => {
        const { isAuthenticated, user, token } = get();
        set({
          isAuthenticated: Boolean(isAuthenticated && user && token),
          user: isAuthenticated && user && token ? user : null,
          token: isAuthenticated && user && token ? token : null,
          isLoading: false,
        });
      },
    }),
    {
      name: "shieldtest-auth",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
      }),
    },
  ),
);
