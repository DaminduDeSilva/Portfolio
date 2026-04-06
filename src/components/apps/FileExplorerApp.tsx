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
  FiExternalLink,
  FiX
} from "react-icons/fi";
import { FcFolder, FcDatabase, FcGlobe, FcApproval, FcDocument } from "react-icons/fc";

interface FileNode {
  type: "folder" | "file";
  name: string;
  target?: string;
  content?: string;
  link?: string;
  size?: string;
  date?: string;
  icon?: React.ReactNode;
}

const SECTIONS: Record<string, FileNode[]> = {
  home: [
    { type: "folder", name: "Cyber_Security", target: "Cyber_Security", icon: <FcGlobe size={44} className="drop-shadow mb-2" /> },
    { type: "folder", name: "DevOps_Cloud", target: "DevOps_Cloud", icon: <FcDatabase size={44} className="drop-shadow mb-2" /> },
    { type: "folder", name: "Full_Stack", target: "Full_Stack", icon: <FcFolder size={44} className="drop-shadow mb-2" /> },
    { type: "folder", name: "Achievements", target: "Achievements", icon: <FcApproval size={44} className="drop-shadow mb-2" /> },
    { type: "file", name: "README.md", content: "# Welcome\n\nNavigate through the folders to view my projects, write-ups, and security assessments.", size: "1 KB", date: "Today", icon: <FcDocument size={44} className="drop-shadow mb-2" /> },
  ],
  Cyber_Security: [
    { type: "file", name: "Web_Domain_Scanner.md", content: "### Web Domain Scanner & Service Discovery\n\nPassive & active recon tool with AI LLM wordlist generation, CDN tracking, and API detection.\n\n**Technologies:** Python • RustScan • Nmap • Gemini API", link: "https://github.com/DaminduDeSilva/web-domain-scanner.git", size: "45 KB", date: "2025" },
    { type: "file", name: "Cryptographic_CTF.md", content: "### Cryptographic CTF Challenge - Web App\n\nSimulated challenge with AES-encrypted passwords & ECDSA private key recovery via nonce reuse attack patterns.\n\n**Technologies:** Python (Flask) • AES • ECDSA", link: "https://github.com/DaminduDeSilva/CTF-Challenge-Cryptography", size: "12 KB", date: "2025" },
    { type: "file", name: "Android_Sec_Analysis.pdf", content: "### Android App Security Analysis\n\nOWASP Mobile security assessment finding insecure storage and weak authentication mechanisms in InsecureBankv2.\n\n**Tools:** Burp Suite • JADX • APKTool", link: "https://bit.ly/android-security-analysis", size: "1.2 MB", date: "2025" },
  ],
  DevOps_Cloud: [
    { type: "file", name: "CI_Insight.tsx", content: "### CI-Insight: Unified CI/CD Intelligence\n\nAn AI-powered CI/CD intelligence platform that unifies pipeline data, enables AI-driven security analysis, and supports DevSecOps workflows through a cinematic, interactive dashboard framework.\n\n**Technologies:** Next.js 16 • Tailwind CSS • App Router", link: "https://github.com/Dark-Side-Mora/ci-insight-presentation", size: "140 KB", date: "2026" },
    { type: "file", name: "MySLT_Monitoring.yaml", content: "### MySLT Dashboard Monitoring App\n\nEngineered a dedicated monitoring service tailored to track operations and visualize core infrastructure health/analytics for the internal MySLT dashboard environment.\n\n**Target:** Sri Lanka Telecom", link: "", size: "8 KB", date: "2026" },
  ],
  Full_Stack: [
    { type: "file", name: "Salon_Management.ts", content: "### Salon Management SaaS Platform\n\nComplete multi-tenant platform connecting individual salons & customers seamlessly with secure OAuth authentication and scheduling.\n\n**Technologies:** Node.js • Supabase • React.js", link: "https://github.com/Vivora-Solutions", size: "320 KB", date: "2025" },
    { type: "file", name: "Healthcare_Microservices.java", content: "### Healthcare Management Microservices\n\nDecentralized health records platform utilizing structural blockchain integrity paired with AI diagnosis models and WebRTC live streaming.\n\n**Technologies:** Spring Boot • Angular • Hyperledger Fabric", link: "https://github.com/DaminduDeSilva/Healthcare-Appointment-and-Management-System.git", size: "850 KB", date: "2025" },
    { type: "file", name: "Supply_Chain_Platform.js", content: "### Supply Chain Management Platform\n\nEnd-to-end global logistics dashboard capable of orchestrating complex railway and trucking transit operations simultaneously from one hub.\n\n**Technologies:** React.js • Node.js • MySQL", link: "https://github.com/DaminduDeSilva/Supply-Chain-Management-System", size: "410 KB", date: "2026" },
  ],
  Achievements: [
    { type: "file", name: "Cybershield_4.0_Finalist.png", content: "### Cybershield 4.0 Finalist\n\nOrganized by SLIIT\nYear: 2025", link: "", size: "2 MB", date: "2025" },
    { type: "file", name: "CryptX_Finalist.png", content: "### CryptX Finalist\n\nOrganized by University of Sri Jayawardhanapura\nYear: 2025", link: "", size: "1.8 MB", date: "2025" },
    { type: "file", name: "Devthon_3.0_Runner_Up.png", content: "### Devthon 3.0 2nd Runners Up\n\nOrganized by University of Moratuwa\nYear: 2026", link: "", size: "1.5 MB", date: "2026" },
    { type: "file", name: "Gencipher_Runner_Up.png", content: "### Gencipher 1st Runner Up\n\nOrganized by UCSC\nYear: 2026", link: "", size: "2.1 MB", date: "2026" },
    { type: "file", name: "CircraCTF_Runner_Up.png", content: "### CircraCTF 1st Runner Up\n\nOrganized by Cicra Campus\nYear: 2025", link: "", size: "1.9 MB", date: "2025" },
    { type: "file", name: "Certifications.txt", content: "### Certifications\n\n- Linux Command Line: From Zero to Hero (Udemy)\n- Metasploit from Scratch: Beginner to Professional (Udemy)", link: "", size: "4 KB", date: "2025" },
  ]
};

export default function FileExplorerApp() {
  const [currentDir, setCurrentDir] = useState<string>("home");
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);

  const handleItemClick = (item: FileNode) => {
    if (item.type === "folder" && item.target) {
      setCurrentDir(item.target);
      setSelectedFile(null);
    } else if (item.type === "file") {
      setSelectedFile(item);
    }
  };

  return (
    <Window id="projects" defaultSize={{ width: 1000, height: 700 }}>
      <div className="bg-[#f3f6fb] h-full w-full flex text-[#1f2937] font-sans">
        
        {/* Sidebar - Desktop Level Navigation */}
        <div className="hidden md:flex w-52 bg-[#eef2f9] border-r border-[#d5ddeb] py-4 flex-col">
          <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Quick Access
          </div>
          <ul className="space-y-1">
            <li
              className={`px-4 py-2 mx-2 rounded-lg flex items-center space-x-3 cursor-pointer ${currentDir === "home" ? "bg-[#E95420] text-white shadow-sm" : "text-slate-700 hover:bg-white"}`}
              onClick={() => { setCurrentDir("home"); setSelectedFile(null); }}
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
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Toolbar / Breadcrumb */}
          <div className="h-12 bg-white flex items-center px-4 border-b border-[#d5ddeb] space-x-2 shrink-0">
            <div
              className={`p-1 rounded cursor-pointer transition-colors ${currentDir === "home" ? "text-slate-900 font-medium" : "text-slate-500 hover:bg-slate-100"}`}
              onClick={() => { setCurrentDir("home"); setSelectedFile(null); }}
            >
              Home
            </div>
            {currentDir !== "home" && (
              <>
                <FiChevronRight className="text-slate-400 shrink-0" />
                <div className="p-1 rounded cursor-default font-medium text-slate-900">
                  {currentDir.replace(/_/g, " ")}
                </div>
              </>
            )}

            <div className="ml-auto w-48 lg:w-60 h-8 rounded-md border border-[#d7deea] bg-[#f8fbff] flex items-center px-2 text-slate-400 text-sm hidden sm:flex">
              <FiSearch className="mr-2" /> Search files...
            </div>
          </div>

          {/* Files UI Split Area */}
          <div className="flex-1 flex overflow-hidden">
            
            {/* Grid Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-[#f8fbff]">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {SECTIONS[currentDir]?.map((item, idx) => {
                  const isSelected = selectedFile?.name === item.name;
                  return (
                    <div
                      key={idx}
                      className={`flex flex-col items-center justify-start p-4 rounded-lg cursor-pointer group transition-all border ${isSelected ? 'bg-blue-50 border-blue-200 shadow-sm' : 'border-transparent hover:bg-white hover:border-[#d7deea]'}`}
                      onClick={() => handleItemClick(item)}
                    >
                      {item.icon ? (
                        item.icon
                      ) : item.type === "folder" ? (
                        <FcFolder size={44} className="drop-shadow mb-2" />
                      ) : (
                        <div className="w-12 h-12 bg-white border border-gray-200 shadow-sm rounded flex items-center justify-center mb-2">
                           <span className="text-xs font-bold text-gray-400 uppercase">{item.name.split('.').pop()}</span>
                        </div>
                      )}
                      <span className={`text-xs text-center break-words w-full mt-1 ${isSelected ? 'text-blue-700 font-medium' : 'text-slate-600 group-hover:text-slate-900'}`}>
                        {item.name.replace(/_/g, " ")}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              {(!SECTIONS[currentDir] || SECTIONS[currentDir].length === 0) && (
                <div className="text-slate-500 text-center w-full mt-10">
                  Folder is empty
                </div>
              )}
            </div>

            {/* Preview Pane (Right Side) */}
            {selectedFile && (
              <div className="w-72 bg-white border-l border-[#d5ddeb] flex flex-col animate-in slide-in-from-right-8 duration-200">
                <div className="h-12 border-b border-[#d5ddeb] flex items-center justify-between px-4">
                  <span className="font-semibold text-slate-800 truncate pr-2">File Preview</span>
                  <button onClick={() => setSelectedFile(null)} className="text-slate-400 hover:text-slate-700 rounded-full p-1 hover:bg-slate-100">
                    <FiX />
                  </button>
                </div>
                
                <div className="p-4 flex-1 overflow-y-auto">
                  <div className="flex justify-center mb-6 mt-4">
                    <div className="w-24 h-24 bg-gray-50 border border-gray-200 shadow-sm rounded-lg flex items-center justify-center">
                       {selectedFile.icon ? selectedFile.icon : <FcDocument size={64} className="drop-shadow-sm" />}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg text-slate-900 text-center mb-2">{selectedFile.name.replace(/_/g, " ")}</h3>
                  <div className="flex justify-center space-x-4 text-xs text-slate-500 mb-6">
                    <span>{selectedFile.size}</span>
                    <span>•</span>
                    <span>{selectedFile.date}</span>
                  </div>

                  <div className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed border-t border-gray-100 pt-4">
                    {selectedFile.content}
                  </div>

                  {selectedFile.link && (
                    <a
                      href={selectedFile.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 flex items-center justify-center space-x-2 w-full py-2 bg-[#E95420] hover:bg-[#E95420]/90 text-white rounded-md transition-colors font-medium text-sm shadow-sm"
                    >
                      <FiExternalLink />
                      <span>Open External Link</span>
                    </a>
                  )}
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </Window>
  );
}
