import { create } from "zustand";
import { User } from "../features/user/shared/user.types";

export type AuthState = {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: User | null;
  loginUser: (user: User, accessToken: string) => void;
  logoutUser: () => void;
};

const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  accessToken: null,
  user: null,
  loginUser: (user: User, accessToken: string) => {
    set({ user, accessToken, isAuthenticated: true });
    console.log(get().isAuthenticated);
  },
  logoutUser: () => {
    set({ user: null, accessToken: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
