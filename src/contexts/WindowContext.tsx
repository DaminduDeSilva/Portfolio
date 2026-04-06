"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type AppId =
  | "terminal"
  | "about"
  | "projects"
  | "skills"
  | "contact"
  | "settings";

export interface WindowData {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

interface WindowContextType {
  windows: Record<AppId, WindowData>;
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  focusedWindow: AppId | null;
}

const defaultWindows: Record<AppId, WindowData> = {
  terminal: {
    id: "terminal",
    title: "CLI Terminal",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
  },
  about: {
    id: "about",
    title: "about_me.deb Installation",
    isOpen: true,
    isMinimized: false,
    zIndex: 20,
  },
  projects: {
    id: "projects",
    title: "File Explorer",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
  },
  skills: {
    id: "skills",
    title: "Tech Stack",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
  },
  contact: {
    id: "contact",
    title: "Contact",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
  },
  settings: {
    id: "settings",
    title: "Settings - Display",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
  },
};

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] =
    useState<Record<AppId, WindowData>>(defaultWindows);
  const [zIndexCounter, setZIndexCounter] = useState(20);
  const [focusedWindow, setFocusedWindow] = useState<AppId | null>(null);

  const focusWindow = (id: AppId) => {
    setZIndexCounter((prevZ) => {
      const nextZ = prevZ + 1;
      setWindows((prev) => ({
        ...prev,
        [id]: { ...prev[id], zIndex: nextZ, isMinimized: false },
      }));
      return nextZ;
    });
    setFocusedWindow(id);
  };

  const openWindow = (id: AppId) => {
    setZIndexCounter((prevZ) => {
      const nextZ = prevZ + 1;
      setWindows((prev) => ({
        ...prev,
        [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: nextZ },
      }));
      return nextZ;
    });
    setFocusedWindow(id);
  };

  const closeWindow = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }));
    if (focusedWindow === id) setFocusedWindow(null);
  };

  const minimizeWindow = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
    if (focusedWindow === id) setFocusedWindow(null);
  };

  return (
    <WindowContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        focusWindow,
        focusedWindow,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
}

export function useWindowContext() {
  const context = useContext(WindowContext);
  if (!context)
    throw new Error("useWindowContext must be used within a WindowProvider");
  return context;
}
