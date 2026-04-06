"use client";

import React, { useState, useEffect } from "react";
import { useWindowContext } from "@/contexts/WindowContext";
import { FiTerminal, FiImage, FiCode } from "react-icons/fi";

export default function ContextMenu() {
  const { openWindow } = useWindowContext();
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      // Prevent custom menu if clicking on an interactive element (like a window)
      // A simple check is to see if we clicked right on the desktop background
      const target = e.target as HTMLElement;
      if (target.id === "desktop-wallpaper") {
        e.preventDefault();
        setPosition({ x: e.pageX, y: e.pageY });
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    const handleClick = () => {
      if (visible) setVisible(false);
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("click", handleClick);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="absolute z-[9999] bg-[#1e1e1e]/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl overflow-hidden py-1 min-w-[200px]"
      style={{ left: position.x, top: position.y }}
    >
      <button
        onClick={() => openWindow("settings")}
        className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-500 transition-colors flex items-center space-x-3"
      >
        <FiImage />
        <span>Change Background...</span>
      </button>
      <div className="h-[1px] bg-white/10 my-1 mx-2" />
      <button
        onClick={() => openWindow("terminal")}
        className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-500 transition-colors flex items-center space-x-3"
      >
        <FiTerminal />
        <span>Open Terminal</span>
      </button>
      <button
        onClick={() => openWindow("projects")}
        className="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-500 transition-colors flex items-center space-x-3"
      >
        <FiCode />
        <span>View Source Code</span>
      </button>
    </div>
  );
}
