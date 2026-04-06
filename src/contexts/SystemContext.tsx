"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export const Wallpapers = {
  ubuntuDefault: "/wallpapers/ubuntu-aurora.svg",
  ubuntuPurple: "/wallpapers/ubuntu-aurora.svg",
  darkminimal: "/wallpapers/ubuntu-aurora.svg",
};

type WallpaperKey = keyof typeof Wallpapers;

interface SystemContextType {
  wallpaper: string;
  setWallpaper: (key: WallpaperKey) => void;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export function SystemProvider({ children }: { children: ReactNode }) {
  const [wallpaperKey, setWallpaperKey] =
    useState<WallpaperKey>("ubuntuDefault");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SystemContext.Provider
      value={{
        wallpaper: Wallpapers[wallpaperKey],
        setWallpaper: setWallpaperKey,
        isLoggedIn,
        login: () => setIsLoggedIn(true),
        logout: () => setIsLoggedIn(false),
      }}
    >
      {children}
    </SystemContext.Provider>
  );
}

export function useSystemContext() {
  const context = useContext(SystemContext);
  if (!context)
    throw new Error("useSystemContext must be used within a SystemProvider");
  return context;
}
