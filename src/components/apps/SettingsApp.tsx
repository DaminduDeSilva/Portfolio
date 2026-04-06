"use client";

import React from "react";
import Window from "../desktop/Window";
import { useSystemContext, Wallpapers } from "@/contexts/SystemContext";

export default function SettingsApp() {
  const { wallpaper, setWallpaper } = useSystemContext();

  return (
    <Window id="settings" defaultSize={{ width: 900, height: 650 }}>
      <div className="bg-[#f2f2f2] h-full w-full flex text-[#333]">
        {/* Settings Sidebar */}
        <div className="w-48 bg-[#e8e8e8] border-r border-[#d4d4d4] py-4 h-full">
          <ul className="space-y-1">
            <li className="px-4 py-2 bg-[#d4d4d4] font-medium text-sm rounded mx-2">Background</li>
            <li className="px-4 py-2 text-sm text-[#555] hover:bg-[#e0e0e0] cursor-pointer rounded mx-2">Appearance</li>
            <li className="px-4 py-2 text-sm text-[#555] hover:bg-[#e0e0e0] cursor-pointer rounded mx-2">Notifications</li>
          </ul>
        </div>

        {/* Settings Content */}
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-light mb-6">Background</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {(Object.keys(Wallpapers) as Array<keyof typeof Wallpapers>).map((key) => (
              <div 
                key={key} 
                onClick={() => setWallpaper(key)}
                className={`relative w-full h-32 rounded-lg cursor-pointer overflow-hidden border-2 transition-all ${
                  wallpaper === Wallpapers[key] ? "border-blue-500 scale-105 shadow-lg" : "border-transparent hover:border-gray-400"
                }`}
              >
                {/* Use a simple div with background image to preview */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${Wallpapers[key]})` }}
                />
                <div className="absolute bottom-0 w-full bg-black/50 text-white text-xs text-center py-1 font-medium capitalize">
                  {key}
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-8">
            Select a wallpaper to instantly change the desktop background.
          </p>
        </div>
      </div>
    </Window>
  );
}
