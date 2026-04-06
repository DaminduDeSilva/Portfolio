"use client";

import React, { useState } from "react";
import Window from "../desktop/Window";
import {
  FiFolder,
  FiFileText,
  FiChevronRight,
  FiHardDrive,
  FiHome,
  FiSearch,
  FiClock,
} from "react-icons/fi";

const SECTIONS = {
  home: [
    { type: "folder", name: "CTF_Competitions" },
    { type: "folder", name: "University_Projects" },
    { type: "folder", name: "Volunteering" },
    { type: "file", name: "README.md" },
  ],
  CTF_Competitions: [
    { type: "file", name: "Cybershield_4.0_Finalist.md" },
    { type: "file", name: "CryptX_Finalist.md" },
  ],
  University_Projects: [{ type: "file", name: "Cyber_Rush_CTF_Dev.tsx" }],
  Volunteering: [
    { type: "file", name: "CSE_40_Logistics.txt" },
    { type: "file", name: "IESL_Robogames_2024.txt" },
  ],
};

type Directory = keyof typeof SECTIONS;

export default function FileExplorerApp() {
  const [currentDir, setCurrentDir] = useState<Directory>("home");

  const handleItemClick = (item: { type: string; name: string }) => {
    if (item.type === "folder") {
      setCurrentDir(item.name as Directory);
    } else {
      alert(
        `Opening ${item.name} is not supported directly here. Head over to my GitHub /DaminduDeSilva to view my real source files!`,
      );
    }
  };

  return (
    <Window id="projects" defaultSize={{ width: 1000, height: 700 }}>
      <div className="bg-[#f3f6fb] h-full w-full flex text-[#1f2937] font-sans">
        {/* Sidebar */}
        <div className="w-52 bg-[#eef2f9] border-r border-[#d5ddeb] py-4 h-full flex flex-col">
          <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Quick Access
          </div>
          <ul className="space-y-1">
            <li
              className={`px-4 py-2 mx-2 rounded-lg flex items-center space-x-3 cursor-pointer ${currentDir === "home" ? "bg-blue-500 text-white" : "text-slate-700 hover:bg-white"}`}
              onClick={() => setCurrentDir("home")}
            >
              <FiHome /> <span>Home</span>
            </li>
            <li className="px-4 py-2 mx-2 rounded-lg flex items-center space-x-3 text-slate-700 hover:bg-white cursor-pointer">
              <FiHardDrive /> <span>Documents</span>
            </li>
            <li className="px-4 py-2 mx-2 rounded-lg flex items-center space-x-3 text-slate-700 hover:bg-white cursor-pointer">
              <FiClock /> <span>Recent</span>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar / Breadcrumb */}
          <div className="h-12 bg-white flex items-center px-4 border-b border-[#d5ddeb] space-x-2">
            <div
              className="hover:bg-slate-100 p-1 rounded cursor-pointer transition-colors"
              onClick={() => setCurrentDir("home")}
            >
              Home
            </div>
            {currentDir !== "home" && (
              <>
                <FiChevronRight className="text-slate-400" />
                <div className="hover:bg-slate-100 p-1 rounded cursor-pointer transition-colors">
                  {currentDir.replace("_", " ")}
                </div>
              </>
            )}

            <div className="ml-auto w-60 h-8 rounded-md border border-[#d7deea] bg-[#f8fbff] flex items-center px-2 text-slate-400 text-sm">
              <FiSearch className="mr-2" /> Search
            </div>
          </div>

          {/* Files Grid */}
          <div className="p-4 flex-1 overflow-auto bg-[#f8fbff]">
            <div className="grid grid-cols-4 gap-3">
              {SECTIONS[currentDir].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center p-4 hover:bg-white rounded-lg cursor-pointer group active:bg-blue-100 transition-colors border border-transparent hover:border-[#d7deea]"
                  onClick={() => handleItemClick(item)}
                >
                  {item.type === "folder" ? (
                    <FiFolder
                      size={44}
                      className="text-blue-500 drop-shadow mb-2"
                    />
                  ) : (
                    <FiFileText
                      size={44}
                      className="text-slate-500 drop-shadow mb-2"
                    />
                  )}
                  <span className="text-xs text-center break-words w-full group-hover:text-slate-900 text-slate-600">
                    {item.name.replace(/_/g, " ")}
                  </span>
                </div>
              ))}
            </div>
            {SECTIONS[currentDir].length === 0 && (
              <div className="text-slate-500 text-center w-full mt-10">
                Folder is empty
              </div>
            )}
          </div>
        </div>
      </div>
    </Window>
  );
}
