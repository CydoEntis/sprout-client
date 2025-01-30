import { create } from "zustand";
import { User } from "../features/user/shared/user.types";

export type AuthState = {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: User | null;
  setAccessToken: (accessToken: string) => void;
  setUser: (user: User) => void;
  logoutUser: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  accessToken: null,
  user: null,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setAccessToken: (accessToken: string) => {
    set({ accessToken });
  },
  setUser: (user: User) => {
    set({ user });
  },
  logoutUser: () => {
    set({ user: null });
    set({ accessToken: null });
  },
}));

export default useAuthStore;
