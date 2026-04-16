"use client";

import React, { useState, useEffect, useRef } from "react";
import { useWindowContext, AppId } from "@/contexts/WindowContext";
import { useSystemContext } from "@/contexts/SystemContext";
import {
  FiWifi,
  FiBattery,
  FiVolume2,
  FiUser,
  FiPackage,
  FiFileText,
  FiImage,
} from "react-icons/fi";
import { FaEnvelope, FaTerminal, FaUserCircle, FaUbuntu } from "react-icons/fa";
import { BsFolder2Open, BsCpu, BsSearch, BsFiletypePdf } from "react-icons/bs";
import { clsx } from "clsx";

const apps: { id: AppId; icon: React.ReactElement; label: string }[] = [
  { id: "resume", icon: <BsFiletypePdf size={15} />, label: "Resume" },
  { id: "terminal", icon: <FaTerminal size={15} />, label: "Terminal" },
  { id: "about", icon: <FiPackage size={15} />, label: "About_me.deb" },
  { id: "projects", icon: <BsFolder2Open size={15} />, label: "Files" },
  { id: "skills", icon: <FiFileText size={15} />, label: "technologies.html" },
  { id: "contact", icon: <FaEnvelope size={15} />, label: "Contact" },
];

export default function Taskbar() {
  const { openWindow, windows, focusedWindow } = useWindowContext();
  const { logout } = useSystemContext();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      );
      setDate(
        now.toLocaleDateString([], {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }),
      );
    };
    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!showMenu) return;
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [showMenu]);

  return (
    <>
      <div className="h-14 w-full bg-[#2c001e]/85 backdrop-blur-xl border-t border-[#E95420]/25 flex flex-row items-center px-4 z-50 text-white relative select-none">
        {/* Left side: empty so we can properly center the middle section */}
        <div className="flex-[1] flex items-center justify-start"></div>

        {/* Middle: centered app icons with Ubuntu Menu Launcher at the start */}
        <div className="flex-[2] flex items-center justify-center space-x-2">
          {/* Ubuntu Menu Launcher */}
          <div
            onClick={() => setShowMenu(!showMenu)}
            className={clsx(
              "w-11 h-11 flex items-center justify-center rounded-md transition-all duration-200 hover:bg-white/10 active:scale-95 cursor-pointer",
              showMenu && "bg-white/10",
            )}
            title="Applications"
          >
            <div className="w-9 h-9 rounded-md flex items-center justify-center text-[#E95420]">
              <FaUbuntu size={24} />
            </div>
          </div>

          <div className="w-[1px] h-6 bg-white/10 mx-1" />

          {/* Normal App Icons */}
          {apps.map((app) => {
            const isOpen = windows[app.id].isOpen;
            const isActive = focusedWindow === app.id;

            return (
              <div
                key={app.id}
                onClick={() => openWindow(app.id)}
                className={clsx(
                  "group relative w-11 h-11 flex items-center justify-center rounded-md cursor-pointer transition-all duration-200",
                  "hover:bg-white/10 active:scale-95",
                  isOpen ? "bg-white/5" : "",
                )}
                title={app.label}
              >
                <div
                  className={clsx(
                    "w-8 h-8 rounded-md flex items-center justify-center transition-all duration-200",
                    isActive
                      ? "text-[#ffd1bf] bg-[#E95420]/35 shadow-inner"
                      : "text-gray-200 bg-white/5",
                  )}
                >
                  {React.cloneElement(app.icon as React.ReactElement<any>, {
                    size: 18,
                  })}
                </div>

                {isOpen && (
                  <div
                    className={clsx(
                      "absolute bottom-0 h-1 bg-[#E95420] rounded-t-md transition-all duration-200",
                      isActive
                        ? "w-5 shadow-[0_0_8px_#E95420]"
                        : "w-1.5 opacity-50",
                    )}
                  />
                )}
              </div>
            );
          })}

          {/* Dynamic Apps (Image/Markdown Viewer) */}
          {(["imageviewer", "markdownviewer"] as AppId[])
            .filter((id) => windows[id].isOpen)
            .map((id) => {
              const isActive = focusedWindow === id;
              const icon =
                id === "imageviewer" ? (
                  <FiImage size={18} />
                ) : (
                  <FiFileText size={18} />
                );
              const label = windows[id].title;

              return (
                <div
                  key={id}
                  onClick={() => openWindow(id)}
                  className={clsx(
                    "group relative w-11 h-11 flex items-center justify-center rounded-md cursor-pointer transition-all duration-200",
                    "hover:bg-white/10 active:scale-95 bg-white/5",
                  )}
                  title={label}
                >
                  <div
                    className={clsx(
                      "w-8 h-8 rounded-md flex items-center justify-center transition-all duration-200",
                      isActive
                        ? "text-[#ffd1bf] bg-[#E95420]/35 shadow-inner"
                        : "text-gray-200 bg-white/5",
                    )}
                  >
                    {icon}
                  </div>
                  <div
                    className={clsx(
                      "absolute bottom-0 h-1 bg-[#E95420] rounded-t-md transition-all duration-200",
                      isActive
                        ? "w-5 shadow-[0_0_8px_#E95420]"
                        : "w-1.5 opacity-50",
                    )}
                  />
                </div>
              );
            })}
        </div>

        {/* Right side: System Tray */}
        <div className="flex-[1] flex items-center justify-end space-x-2 pr-2">
          <div
            onClick={() => setShowMenu(!showMenu)}
            className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/10 cursor-pointer text-gray-200 transition-colors"
            title="Search"
          >
            <BsSearch size={16} />
          </div>
          <div className="flex items-center space-x-3 px-3 py-1.5 hover:bg-white/10 rounded-md cursor-pointer transition-colors text-gray-200">
            <FiWifi size={16} />
            <FiVolume2 size={16} />
            <FiBattery size={16} />
          </div>
          <div className="flex flex-col items-center justify-center px-3 py-1 hover:bg-white/10 rounded-md cursor-pointer transition-colors text-xs text-gray-100 font-medium">
            <span>{time}</span>
            <span className="text-[10px] text-gray-300">{date}</span>
          </div>
        </div>
      </div>

      {showMenu && (
        <div
          ref={menuRef}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[520px] h-[500px] bg-[#2c001e]/95 backdrop-blur-2xl border border-[#E95420]/30 rounded-xl shadow-2xl flex flex-col p-6 z-40 text-white"
        >
          <div className="w-full h-11 bg-black/25 rounded-md border border-[#E95420]/25 flex items-center px-4 mb-6 shadow-inner">
            <BsSearch size={14} className="text-gray-400 mr-2" />
            <input
              autoFocus
              type="text"
              placeholder="Search apps, settings, files..."
              className="bg-transparent border-none outline-none text-sm text-gray-200 w-full placeholder:text-gray-400"
            />
          </div>

          <h3 className="text-sm font-semibold mb-4 px-2 text-gray-100">
            Pinned
          </h3>
          <div className="grid grid-cols-5 gap-3">
            {apps.map((app) => (
              <div
                key={app.id}
                onClick={() => {
                  openWindow(app.id);
                  setShowMenu(false);
                }}
                className="flex flex-col items-center justify-center space-y-2 p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-all"
              >
                <div className="w-11 h-11 bg-white/10 text-[#ffb59a] rounded-md flex items-center justify-center shadow-lg border border-[#E95420]/25">
                  {app.icon}
                </div>
                <span className="text-xs text-gray-300">{app.label}</span>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-semibold mt-6 mb-3 px-2 text-gray-100">
            Recent
          </h3>
          <div className="space-y-2 px-2">
            <div className="h-10 rounded-lg bg-white/5 border border-[#E95420]/20 flex items-center px-3 text-sm text-gray-200">
              Resume.pdf
            </div>
            <div className="h-10 rounded-lg bg-white/5 border border-[#E95420]/20 flex items-center px-3 text-sm text-gray-200">
              My Story.txt
            </div>
          </div>

          <div className="mt-auto h-16 border-t border-white/10 flex items-center justify-between px-2 pt-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-tr from-[#E95420] to-[#77216F] rounded-full flex items-center justify-center shadow-inner">
                <FiUser size={16} />
              </div>
              <span className="text-sm text-gray-200">Guest User</span>
            </div>
            <div
              onClick={logout}
              className="w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center cursor-pointer text-gray-300 hover:text-red-400 transition-colors"
              title="Log Out"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                <line x1="12" y1="2" x2="12" y2="12"></line>
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
