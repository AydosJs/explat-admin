import { create } from "zustand";

const SIDEBAR_STORAGE_KEY = "explat-sidebar-open";

function getStoredSidebarOpen(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const v = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    return v !== "false";
  } catch {
    return true;
  }
}

function setStoredSidebarOpen(open: boolean) {
  try {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(open));
  } catch {}
}

interface AppState {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: getStoredSidebarOpen(),
  setSidebarOpen: (open) => {
    setStoredSidebarOpen(open);
    set({ sidebarOpen: open });
  },
  toggleSidebar: () => {
    set((state) => {
      const next = !state.sidebarOpen;
      setStoredSidebarOpen(next);
      return { sidebarOpen: next };
    });
  },
}));
