import { create } from "zustand";
import { User } from "../features/user/shared/user.types";

export type UserState = {
  accessToken: string | null;
  user: User;
  setAccessToken: (accessToken: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
};

const useUserStore = create<UserState>((set) => ({
  accessToken: null,
  user: {} as User,
  setAccessToken: (accessToken: string) => {
    set({ accessToken });
  },
  setUser: (user: User) => {
    set({ user });
  },
  logout: () => {
    set({ user: {} as User });
    set({ accessToken: null });
  },
}));

export default useUserStore;
