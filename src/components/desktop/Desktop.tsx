"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSystemContext } from "@/contexts/SystemContext";
import Taskbar from "./Taskbar";

// Import components
import LoginScreen from "./LoginScreen";
import ContextMenu from "./ContextMenu";
import DesktopIcons from "./DesktopIcons";

import TerminalApp from "../apps/TerminalApp";
import SettingsApp from "../apps/SettingsApp";
import FileExplorerApp from "../apps/FileExplorerApp";
import AboutApp from "../apps/AboutApp";
import ResumeApp from "../apps/ResumeApp";
import ContactApp from "../apps/ContactApp";
import SkillsApp from "../apps/SkillsApp";
import ImageViewerApp from "../apps/ImageViewerApp";
import MarkdownViewerApp from "../apps/MarkdownViewerApp";
import UbuntuCyberWallpaper from "../3d/UbuntuCyberWallpaper";

// We'll use a direct SVG for Ubuntu
export default function Desktop() {
  const { isLoggedIn, wallpaper } = useSystemContext();
  const [booting, setBooting] = useState(true);

  // Fake boot screen effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setBooting(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (booting) {
    return (
      <div className="h-screen w-screen bg-[#2c001e] flex flex-col items-center justify-center text-white">
        <div className="mb-4 text-[#E95420]">
          {/* Ubuntu-style Boot Logo */}
          <svg width="60" height="60" viewBox="0 0 512 512" fill="currentColor">
            <path d="M407.2 165.4c-15.6 0-30 5.4-41.5 14.3-15.4-25.1-40-42.6-69.1-47.5-6.5-47.9-47.5-85.1-97.1-85.1-53.9 0-97.6 43.7-97.6 97.6 0 11.2 2 21.9 5.5 31.9-48.4 12.8-84.3 56.4-84.3 108.9 0 52.8 36.3 96.6 85 109.2-3.6 10-5.6 20.8-5.6 32.2 0 53.9 43.7 97.6 97.6 97.6 49.3 0 90.1-36.6 96.9-84.2 29 -5.1 53.5-22.9 68.8-48.3 11.6 9 26 14.4 41.7 14.4 37.8 0 68.5-30.7 68.5-68.5 0-34.9-26.3-63.6-60.1-68-1.7-16-1.7-33 0-48.7 33.7-4.4 59.9-33.1 59.9-67.9-.1-38-30.8-68.7-68.6-68.7zM200.7 114c0-26 18.2-47.6 42.4-53.5V168c-24.1-5.9-42.4-27.5-42.4-54zm-22.6 171.4c-26.5 0-48-21.5-48-48 0-26.5 21.5-48 48-48s48 21.5 48 48-21.5 48-48 48zm65 174v-107.5c24.1 5.9 42.4 27.5 42.4 53.5 0 26-18.2 47.6-42.4 53.5v.5zm165-171.4c-26.5 0-48-21.5-48-48 0-26.5 21.5-48 48-48s48 21.5 48 48-21.5 48-48 48z"/>
          </svg>
        </div>
        <div className="mb-6">
          <div className="w-10 h-10 border-4 border-[#E95420]/40 border-t-[#E95420] rounded-full animate-spin"></div>
        </div>
        <p className="font-mono text-gray-300">Starting Portfolio OS...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden relative select-none">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[#2c001e]">
        <UbuntuCyberWallpaper />
        <Image
          src={wallpaper}
          alt="Ubuntu Wallpaper"
          fill
          className="object-cover transition-opacity duration-1000 opacity-60 mix-blend-screen"
          priority
        />
        {/* Subtle blur overlay for readability */}
        <div className="absolute inset-0 bg-black/10" id="desktop-wallpaper" />
      </div>

      {/* Main Area */}
      <div className="flex-1 flex relative z-10 w-full" id="main-desktop-area">
        {/* Desktop / Window Area */}
        <div className="flex-1 relative">
          <DesktopIcons />
          <ContextMenu />

          <TerminalApp />
          <SettingsApp />
          <FileExplorerApp />
          <AboutApp />
          <ResumeApp />
          <ContactApp />
          <SkillsApp />
          <ImageViewerApp />
          <MarkdownViewerApp />
        </div>
      </div>

      {/* Taskbar at the bottom */}
      <Taskbar />
    </div>
  );
}
