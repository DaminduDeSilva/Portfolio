"use client";

import React, { useState, useEffect } from "react";
import Window from "../desktop/Window";
import { useWindowContext } from "@/contexts/WindowContext";
import {
  FiFolder,
  FiFileText,
  FiChevronRight,
  FiHardDrive,
  FiHome,
  FiSearch,
  FiClock,
  FiExternalLink,
  FiX,
  FiPackage,
} from "react-icons/fi";
import { BsFiletypePdf } from "react-icons/bs";
import {
  FcFolder,
  FcDatabase,
  FcGlobe,
  FcApproval,
  FcDocument,
} from "react-icons/fc";
import { clsx } from "clsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface FileNode {
  type: "folder" | "file";
  name: string;
  path: string;
  target?: string;
  content?: string;
  link?: string;
  size?: string;
  date?: string;
  icon?: React.ReactNode;
}

const VFS: Record<string, FileNode[]> = {
  "/": [
    {
      type: "folder",
      name: "Desktop",
      path: "/Desktop",
      icon: <FcFolder size={44} className="drop-shadow mb-2" />,
    },
    {
      type: "file",
      name: "Damindu_De_Silva_CV.pdf",
      path: "/Desktop",
      content:
        "### Damindu De Silva - Senior Penetration Tester\n\nExpert in offensive security, vulnerability research, and full-stack development.\n\n[Official PDF Available]",
      link: "/resume.pdf",
      size: "1.2 MB",
      date: "Today",
      icon: <BsFiletypePdf size={44} className="text-red-500 mb-2" />,
    },
    {
      type: "folder",
      name: "Projects",
      path: "/Projects",
      icon: <FcFolder size={44} className="drop-shadow mb-2" />,
    },
    {
      type: "folder",
      name: "Documents",
      path: "/Documents",
      icon: <FcFolder size={44} className="drop-shadow mb-2" />,
    },
    {
      type: "folder",
      name: "Downloads",
      path: "/Downloads",
      icon: <FcFolder size={44} className="drop-shadow mb-2" />,
    },
    {
      type: "file",
      name: "README.md",
      path: "/",
      content:
        "# System Navigator\n\nWelcome to my professional workspace navigation engine.\n\nYou can explore my work history, technical projects, and certifications through this file system.",
      size: "1 KB",
      date: "Today",
      icon: <FcDocument size={44} className="drop-shadow mb-2" />,
    },
  ],
  "/Desktop": [
    {
      type: "folder",
      name: "Achievements",
      path: "/Desktop/Achievements",
      icon: <FcApproval size={44} className="drop-shadow mb-2" />,
    },
    {
      type: "file",
      name: "About_me.deb",
      path: "/Desktop",
      content:
        "### Ubuntu Package: About Me\n\nThis is a simulated installer for my professional profile app.",
      size: "450 KB",
      date: "Recent",
      icon: <FiPackage size={44} className="text-[#E95420] mb-2" />,
    },
    {
      type: "file",
      name: "technologies.html",
      path: "/Desktop",
      content:
        "### Tech Stack Config\n\nA JSON configuration file containing my full technology stack proficiency.",
      size: "12 KB",
      date: "Recent",
      icon: <FiFileText size={44} className="text-cyan-500 mb-2" />,
    },
    {
      type: "file",
      name: "Damindu_De_Silva_CV.pdf",
      path: "/Desktop",
      content:
        "### Damindu De Silva - Senior Penetration Tester\n\nExpert in offensive security, vulnerability research, and full-stack development.\n\n[Official PDF Available]",
      link: "/resume.pdf",
      size: "1.2 MB",
      date: "Today",
      icon: <BsFiletypePdf size={44} className="text-red-500 mb-2" />,
    },
    {
      type: "folder",
      name: "Projects",
      path: "/Projects",
      icon: <FcFolder size={44} className="drop-shadow mb-2" />,
    },
  ],
  "/Documents": [
    {
      type: "file",
      name: "Certifications.txt",
      path: "/Documents",
      content:
        "### Professional Certifications\n\n- Linux Command Line: From Zero to Hero\n- Metasploit Beginner to Professional\n- OWASP Web Security Assessment",
      size: "4 KB",
      date: "2025",
      icon: <FcDocument size={44} className="drop-shadow mb-2" />,
    },
  ],
  "/Projects": [
    {
      type: "folder",
      name: "Cyber_Security",
      path: "/Projects/Cyber_Security",
    },
    { type: "folder", name: "DevOps_Cloud", path: "/Projects/DevOps_Cloud" },
    { type: "folder", name: "Full_Stack", path: "/Projects/Full_Stack" },
  ],
  "/Projects/Cyber_Security": [
    {
      type: "file",
      name: "Web_Domain_Scanner.md",
      path: "/Projects/Cyber_Security",
      content:
        "### Web Domain Scanner & Service Discovery\n\nPassive & active recon tool with AI LLM wordlist generation, CDN tracking, and API detection.\n\n**Technologies:** Python • RustScan • Nmap • Gemini API",
      link: "https://github.com/DaminduDeSilva/web-domain-scanner.git",
      size: "45 KB",
      date: "2025",
    },
    {
      type: "file",
      name: "Cryptographic_CTF.md",
      path: "/Projects/Cyber_Security",
      content:
        "### Cryptographic CTF Challenge - Web App\n\nSimulated challenge with AES-encrypted passwords & ECDSA private key recovery via nonce reuse attack patterns.\n\n**Technologies:** Python (Flask) • AES • ECDSA",
      link: "https://github.com/DaminduDeSilva/CTF-Challenge-Cryptography",
      size: "12 KB",
      date: "2025",
    },
    {
      type: "file",
      name: "Android_Sec_Analysis.pdf",
      path: "/Projects/Cyber_Security",
      content:
        "### Android App Security Analysis\n\nOWASP Mobile security assessment finding insecure storage and weak authentication mechanisms in InsecureBankv2.\n\n**Tools:** Burp Suite • JADX • APKTool",
      link: "https://bit.ly/android-security-analysis",
      size: "1.2 MB",
      date: "2025",
    },
  ],
  "/Projects/DevOps_Cloud": [
    {
      type: "file",
      name: "CI_Insight.tsx",
      path: "/Projects/DevOps_Cloud",
      content:
        "### CI-Insight: Unified CI/CD Intelligence\n\nAn AI-powered CI/CD intelligence platform that unifies pipeline data, enables AI-driven security analysis, and supports DevSecOps workflows through a cinematic, interactive dashboard framework.\n\n**Technologies:** Next.js 16 • Tailwind CSS • App Router",
      link: "https://github.com/Dark-Side-Mora/ci-insight-presentation",
      size: "140 KB",
      date: "2026",
    },
    {
      type: "file",
      name: "MySLT_Monitoring.yaml",
      path: "/Projects/DevOps_Cloud",
      content:
        "### MySLT Dashboard Monitoring App\n\nEngineered a dedicated monitoring service tailored to track operations and visualize core infrastructure health/analytics for the internal MySLT dashboard environment.\n\n**Target:** Sri Lanka Telecom",
      link: "",
      size: "8 KB",
      date: "2026",
    },
  ],
  "/Projects/Full_Stack": [
    {
      type: "file",
      name: "Salon_Management.ts",
      path: "/Projects/Full_Stack",
      content:
        "### Salon Management SaaS Platform\n\nComplete multi-tenant platform connecting individual salons & customers seamlessly with secure OAuth authentication and scheduling.\n\n**Technologies:** Node.js • Supabase • React.js",
      link: "https://github.com/Vivora-Solutions",
      size: "320 KB",
      date: "2025",
    },
    {
      type: "file",
      name: "Healthcare_Microservices.java",
      path: "/Projects/Full_Stack",
      content:
        "### Healthcare Management Microservices\n\nDecentralized health records platform utilizing structural blockchain integrity paired with AI diagnosis models and WebRTC live streaming.\n\n**Technologies:** Spring Boot • Angular • Hyperledger Fabric",
      link: "https://github.com/DaminduDeSilva/Healthcare-Appointment-and-Management-System.git",
      size: "850 KB",
      date: "2025",
    },
    {
      type: "file",
      name: "Supply_Chain_Platform.js",
      path: "/Projects/Full_Stack",
      content:
        "### Supply Chain Management Platform\n\nEnd-to-end global logistics dashboard capable of orchestrating complex railway and trucking transit operations simultaneously from one hub.\n\n**Technologies:** React.js • Node.js • MySQL",
      link: "https://github.com/DaminduDeSilva/Supply-Chain-Management-System",
      size: "410 KB",
      date: "2026",
    },
  ],
  "/Desktop/Achievements": [
    {
      type: "file",
      name: "Cybershield_4.0_Finalist.png",
      path: "/Desktop/Achievements",
      content: "### Cybershield 4.0 Finalist\n\nOrganized by IEEE Computer Society of SLIIT in collaboration with Hashx\nYear: 2025",
      link: "/certificates/cybershield.png",
      size: "701 KB",
      date: "2025",
    },
    {
      type: "file",
      name: "CryptX_Finalist.png",
      path: "/Desktop/Achievements",
      content:
        "### CryptX Finalist\n\nOrganized by Faculty of Technology, University of Sri Jayewardenepura\nYear: 2025",
      link: "/certificates/cryptx.png",
      size: "470 KB",
      date: "2025",
    },
    {
      type: "file",
      name: "Cypher_3.0.jpg",
      path: "/Desktop/Achievements",
      content: "### Cypher 3.0 - Inside a Hacker's Mind\n\nOrganized by IEEE Student Branch of KDU\nYear: 2025",
      link: "/certificates/cypher.jpg",
      size: "326 KB",
      date: "2025",
    },
    {
      type: "file",
      name: "Devthon_3.0_Runner_Up.jpg",
      path: "/Desktop/Achievements",
      content:
        "### DEV{thon} 3.0 2nd Runners Up\n\nOrganized by Rotaract Club of University of Moratuwa\nYear: 2026",
      link: "/certificates/devthon.jpg",
      size: "281 KB",
      date: "2026",
    },
    {
      type: "file",
      name: "Gencipher_Runner_Up.jpg",
      path: "/Desktop/Achievements",
      content: "### GENZIPHER Hackathon 1st Runner Up\n\nOrganized by CSSL GENZ Chapter of UCSC\nYear: 2026",
      link: "/certificates/genzipher.jpg",
      size: "175 KB",
      date: "2026",
    },
    {
      type: "file",
      name: "CircraCTF_Runner_Up.jpg",
      path: "/Desktop/Achievements",
      content:
        "### Capture The Flag (CTF) Competition 1st Runner Up\n\nOrganized by CICRA Holdings / Daily FT\nYear: 2025",
      link: "/certificates/cicra.jpg",
      size: "301 KB",
      date: "2025",
    },
  ],
  "/Downloads": [
    {
      type: "file",
      name: "About_me.deb",
      path: "/Downloads",
      content:
        "### Ubuntu Package: About Me\n\nThis is a simulated installer for my professional profile app.",
      size: "450 KB",
      date: "Recent",
      icon: <FiPackage size={44} className="text-[#E95420] mb-2" />,
    },
    {
      type: "file",
      name: "technologies.html",
      path: "/Downloads",
      content:
        "### Tech Stack Config\n\nA JSON configuration file containing my full technology stack proficiency.",
      size: "12 KB",
      date: "Recent",
      icon: <FiFileText size={44} className="text-cyan-500 mb-2" />,
    },
  ],
};

export default function FileExplorerApp() {
  const { windows, openWindow } = useWindowContext();
  const [currentPath, setCurrentPath] = useState<string>("/");
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentFiles, setRecentFiles] = useState<FileNode[]>([]);

  // Sync with window params for deep-linking (e.g. from Desktop shortcuts)
  useEffect(() => {
    const params = windows["projects"]?.params;
    if (params?.initialPath) {
      setCurrentPath(params.initialPath);
      setSelectedFile(null);
      // We don't delete from the context directly here to avoid mutation issues,
      // the openWindow call handles the update.
    }
  }, [windows["projects"]?.params]);

  const handleItemClick = (item: FileNode) => {
    if (item.type === "folder") {
      setCurrentPath(item.path);
      setSelectedFile(null);
    } else if (item.type === "file") {
      if (!recentFiles.find((f) => f.name === item.name)) {
        setRecentFiles((prev) => [item, ...prev].slice(0, 10));
      }
      setSelectedFile(item);
    }
  };

  const currentFiles =
    currentPath === "recent" ? recentFiles : VFS[currentPath] || [];

  const filteredFiles = currentFiles.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getBreadcrumbs = () => {
    if (currentPath === "recent") return ["History", "Recent"];
    if (currentPath === "/") return ["Home"];
    return ["Home", ...currentPath.split("/").filter(Boolean)];
  };

  return (
    <Window id="projects" defaultSize={{ width: 1000, height: 700 }}>
      <div className="bg-[#f3f6fb] h-full w-full flex text-[#1f2937] font-sans">
        {/* Sidebar */}
        <aside className="hidden md:flex w-52 bg-[#eef2f9] border-r border-[#d5ddeb] py-4 flex-col">
          <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Quick Access
          </div>
          <ul className="space-y-1">
            <li
              className={clsx(
                "px-4 py-2 mx-2 rounded-lg flex items-center space-x-3 cursor-pointer transition-all",
                currentPath === "/"
                  ? "bg-[#E95420] text-white shadow-sm"
                  : "text-slate-700 hover:bg-white",
              )}
              onClick={() => {
                setCurrentPath("/");
                setSelectedFile(null);
              }}
            >
              <FiHome /> <span>Home</span>
            </li>
            <li
              className={clsx(
                "px-4 py-2 mx-2 rounded-lg flex items-center space-x-3 cursor-pointer transition-all",
                currentPath === "/Desktop"
                  ? "bg-[#E95420] text-white shadow-sm"
                  : "text-slate-700 hover:bg-white",
              )}
              onClick={() => {
                setCurrentPath("/Desktop");
                setSelectedFile(null);
              }}
            >
              <FiFolder /> <span>Desktop</span>
            </li>
            <li
              className={clsx(
                "px-4 py-2 mx-2 rounded-lg flex items-center space-x-3 cursor-pointer transition-all",
                currentPath === "/Documents"
                  ? "bg-[#E95420] text-white shadow-sm"
                  : "text-slate-700 hover:bg-white",
              )}
              onClick={() => {
                setCurrentPath("/Documents");
                setSelectedFile(null);
              }}
            >
              <FiHardDrive /> <span>Documents</span>
            </li>
            <li
              className={clsx(
                "px-4 py-2 mx-2 rounded-lg flex items-center space-x-3 cursor-pointer transition-all",
                currentPath === "recent"
                  ? "bg-[#E95420] text-white shadow-sm"
                  : "text-slate-700 hover:bg-white",
              )}
              onClick={() => {
                setCurrentPath("recent");
                setSelectedFile(null);
              }}
            >
              <FiClock /> <span>Recent</span>
            </li>
          </ul>

          <div className="mt-6 px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Internal Systems
          </div>
          <ul className="space-y-1">
            <li
              className="px-4 py-2 mx-2 rounded-lg flex items-center space-x-3 text-slate-700 hover:bg-white cursor-pointer transition-all"
              onClick={() => setCurrentPath("/Projects/Cyber_Security")}
            >
              <FiChevronRight className="text-slate-400" />{" "}
              <span>Security Hub</span>
            </li>
            <li
              className="px-4 py-2 mx-2 rounded-lg flex items-center space-x-3 text-slate-700 hover:bg-white cursor-pointer transition-all"
              onClick={() => setCurrentPath("/Downloads")}
            >
              <FiChevronRight className="text-slate-400" />{" "}
              <span>Binaries</span>
            </li>
          </ul>
        </aside>

        {/* Main Area */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Toolbar */}
          <header className="h-12 bg-white flex items-center px-4 border-b border-[#d5ddeb] space-x-2 shrink-0">
            <nav className="flex items-center space-x-1">
              {getBreadcrumbs().map((crumb, idx, arr) => (
                <React.Fragment key={idx}>
                  <button
                    className={clsx(
                      "p-1.5 rounded cursor-pointer transition-colors text-sm outline-none",
                      idx === arr.length - 1
                        ? "text-slate-900 font-bold"
                        : "text-slate-500 hover:bg-slate-100",
                    )}
                    onClick={() => {
                      if (crumb === "Home") setCurrentPath("/");
                      else if (crumb === "Recent") setCurrentPath("recent");
                      else {
                        // Reconstruct path for deeper folders
                        const targetPath =
                          "/" + arr.slice(1, idx + 1).join("/");
                        setCurrentPath(targetPath);
                      }
                      setSelectedFile(null);
                    }}
                  >
                    {crumb.replace(/_/g, " ")}
                  </button>
                  {idx < arr.length - 1 && (
                    <FiChevronRight className="text-slate-400 text-xs shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </nav>

            <div className="ml-auto w-48 lg:w-64 h-8 rounded-md border border-[#d7deea] bg-[#f8fbff] flex items-center px-2 text-gray-900 text-sm hidden sm:flex">
              <FiSearch className="mr-2 text-slate-400" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none w-full placeholder:text-slate-400"
              />
            </div>
          </header>

          <section className="flex-1 flex overflow-hidden">
            <div className="flex-1 p-4 overflow-y-auto bg-[#f8fbff]">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredFiles.map((item, idx) => {
                  const isSelected = selectedFile?.name === item.name;
                  return (
                    <article
                      key={idx}
                      className={clsx(
                        "flex flex-col items-center justify-start p-4 rounded-xl cursor-pointer group transition-all border outline-none",
                        isSelected
                          ? "bg-white border-[#E95420]/30 shadow-md scale-[1.02]"
                          : "border-transparent hover:bg-white hover:border-[#d7deea]",
                      )}
                      onClick={() => handleItemClick(item)}
                      onDoubleClick={() => {
                        if (item.type === "folder") {
                          handleItemClick(item);
                        } else if (item.type === "file") {
                          if (item.name.toLowerCase().endsWith(".md")) {
                            // Extract just the raw content by removing markdown headings that might be from our VFS structure
                            // Or let it stay with the heading. Let's just pass the content.
                            // The VFS has a special content property. Let's process the content a bit or just pass it directly.
                            let mkdwn = item.content || "Empty file";
                            if (
                              item.link &&
                              mkdwn.includes(item.link) === false
                            ) {
                              mkdwn += `\n\n[Link to source](${item.link})`;
                            }
                            openWindow("markdownviewer", {
                              content: mkdwn,
                              name: item.name,
                            });
                          } else if (
                            item.name
                              .toLowerCase()
                              .match(/\.(png|jpe?g|gif|webp)$/i)
                          ) {
                            // If it has a link to an image in public folder
                            if (item.link) {
                              openWindow("imageviewer", {
                                link: item.link,
                                name: item.name,
                              });
                            }
                          } else if (item.name.toLowerCase().endsWith(".pdf")) {
                            // You could create a resume-viewer override or just open the existing Resume App and change its link if supported.
                            if (item.link) {
                              // If there's a link to the pdf, open it in browser or fallback.
                              // Wait, we have the ResumeApp, but it's hardcoded for CV right now.
                              // Let's just open in new tab for generics
                              window.open(item.link, "_blank");
                            }
                          }
                        }
                      }}
                    >
                      {item.icon ? (
                        item.icon
                      ) : item.type === "folder" ? (
                        <FcFolder
                          size={44}
                          className="drop-shadow-sm mb-2 group-hover:scale-110 transition-transform"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-white border border-gray-100 shadow-sm rounded-lg flex items-center justify-center mb-2 group-hover:bg-slate-50">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                            {item.name.split(".").pop()}
                          </span>
                        </div>
                      )}
                      <span
                        className={clsx(
                          "text-xs text-center break-words w-full mt-2 transition-colors",
                          isSelected
                            ? "text-[#E95420] font-bold"
                            : "text-slate-600 group-hover:text-slate-900",
                        )}
                      >
                        {item.name.replace(/_/g, " ")}
                      </span>
                    </article>
                  );
                })}
              </div>

              {filteredFiles.length === 0 && (
                <div className="text-slate-400 text-center w-full mt-20 flex flex-col items-center">
                  <FiSearch size={40} className="mb-4 opacity-20" />
                  <p className="text-sm">No files matching "{searchQuery}"</p>
                </div>
              )}
            </div>

            {selectedFile && (
              <aside className="w-80 bg-white border-l border-[#d5ddeb] flex flex-col animate-in slide-in-from-right-8 duration-300">
                <div className="h-12 border-b border-[#d5ddeb] flex items-center justify-between px-4 bg-slate-50/50">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Metadata
                  </span>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-slate-400 hover:text-red-500 rounded-full p-1.5 transition-colors"
                  >
                    <FiX />
                  </button>
                </div>

                <div className="p-6 flex-1 overflow-y-auto">
                  <div className="flex justify-center mb-8">
                    <div className="w-28 h-28 bg-[#f8fbff] border border-gray-100 shadow-inner rounded-2xl flex items-center justify-center">
                      {selectedFile.icon ? (
                        selectedFile.icon
                      ) : (
                        <FcDocument size={64} className="drop-shadow-sm" />
                      )}
                    </div>
                  </div>

                  <h3 className="font-bold text-xl text-slate-900 text-center mb-1 leading-tight">
                    {selectedFile.name.replace(/_/g, " ")}
                  </h3>
                  <div className="flex justify-center space-x-3 text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-8">
                    <span className="bg-slate-100 px-2 py-0.5 rounded-full">
                      {selectedFile.size}
                    </span>
                    <span>•</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-full">
                      {selectedFile.date}
                    </span>
                  </div>

                  <div
                    className="text-sm text-slate-700 leading-relaxed bg-[#f8fbff] p-5 rounded-xl border border-blue-50 shadow-sm min-h-[100px] overflow-auto
                    [&>h1]:text-xl [&>h1]:font-bold [&>h1]:mb-3 [&>h1]:text-[#E95420]
                    [&>h2]:text-lg [&>h2]:font-semibold [&>h2]:mt-4 [&>h2]:mb-2 [&>h2]:text-slate-800
                    [&>h3]:text-base [&>h3]:font-medium [&>h3]:mt-3 [&>h3]:mb-1 [&>h3]:text-slate-800
                    [&>p]:mb-3 [&>p]:leading-relaxed
                    [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-3 [&>ul>li]:mb-1
                    [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-3 [&>ol>li]:mb-1
                    [&>a]:text-blue-600 [&>a]:underline [&>a:hover]:text-blue-800
                    [&>pre]:bg-slate-800 [&>pre]:p-3 [&>pre]:rounded-md [&>pre]:overflow-x-auto [&>pre]:mb-3 [&>pre]:text-slate-200
                    [&>code]:bg-slate-200 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-red-600
                  "
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {selectedFile.content || "Empty file."}
                    </ReactMarkdown>
                  </div>
                </div>
              </aside>
            )}
          </section>
        </main>
      </div>
    </Window>
  );
}
