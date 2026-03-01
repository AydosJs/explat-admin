import { create } from "zustand";

/** Role from ADMIN_SIDEBAR_AND_ROLES.md: main admin, trader, or merchant */
export type UserRole = "admin" | "trader" | "merchant";

interface UserState {
  /** Current user role. Replace with real auth (e.g. from API / JWT) when backend is wired. */
  role: UserRole;
  setRole: (role: UserRole) => void;
}

export const useUserStore = create<UserState>((set) => ({
  role: "admin",
  setRole: (role) => set({ role }),
}));
