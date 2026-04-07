"use client";
import React, { useState } from "react";
import Window from "../desktop/Window";
import BurpLogo from "@/public/BurpSuite_logo.svg";
import {
  FiCode,
  FiDatabase,
  FiLayers,
  FiCpu,
  FiTool,
  FiTerminal,
  FiGlobe,
  FiServer,
  FiLayout,
  FiShield,
  FiCommand
} from "react-icons/fi";
import StackIcon from "tech-stack-icons";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

type TabId = "frontend" | "backend" | "security" | "toolkit";

const skillsData: Record<TabId, { title: string; description: string; items: { name: string; icon: string }[] }> = {
  frontend: {
    title: "Frontend Engineering",
    description: "Architecting modern, high-performance user interfaces and responsive web applications.",
    items: [
      { name: "React.js", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "TailwindCSS", icon: "tailwindcss" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "js" },
      { name: "HTML5 & CSS3", icon: "html5" },
    ],
  },
  backend: {
    title: "Backend & Systems",
    description: "Building resilient server-side logic, efficient APIs, and scalable database architectures.",
    items: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Express.js", icon: "expressjs" },
      { name: "Spring Boot", icon: "spring" },
      { name: "Python", icon: "python" },
      { name: "Java", icon: "java" },
      { name: "MySQL", icon: "mysql" },
      { name: "Flask", icon: "flask" },
    ],
  },
  security: {
    title: "Security & Systems",
    description: "Leveraging Linux-based environments and specialized tools for penetration testing and auditing.",
    items: [
      { name: "Linux Systems", icon: "linux" },
      { name: "Ubuntu", icon: "ubuntu" },
      { name: "Bash Scripting", icon: "bash" },
      { name: "Docker", icon: "docker" },
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "Burp Suite", icon: "burp" },
    ],
  },
  toolkit: {
    title: "Professional Toolkit",
    description: "The essential professional utilities that streamline development and security workflows.",
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Postman", icon: "postman" },
      { name: "Vercel", icon: "vercel" },
      { name: "npm", icon: "npm" },
    ],
  },
};

export default function SkillsApp() {
  const [activeTab, setActiveTab] = useState<TabId>("frontend");
  const sidebarItems: { id: TabId; label: string; icon: React.ComponentType<any> }[] = [
    { id: "frontend", label: "Frontend", icon: FiLayout },
    { id: "backend", label: "Backend", icon: FiServer },
    { id: "security", label: "Security & OS", icon: FiShield },
    { id: "toolkit", label: "Toolkit", icon: FiCommand },
  ];

  return (
    <Window id="skills" defaultSize={{ width: 950, height: 700 }}>
      <div className="bg-white h-full w-full flex text-slate-800 overflow-hidden font-ubuntu">
        {/* Ubuntu Aubergine Sidebar */}
        <aside className="w-20 md:w-60 bg-[#300a24] flex flex-col items-center md:items-stretch py-6 border-r border-[#E95420]/20 shrink-0 select-none">
          <div className="px-6 mb-8 hidden md:block">
            <h2 className="text-xs uppercase tracking-[0.2em] text-[#aea79f] font-bold">
              Integrated Systems
            </h2>
          </div>

          <div className="space-y-2 px-3 flex-1 overflow-y-auto">
            {sidebarItems.map(({ id, label, icon: Icon }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={clsx(
                    "w-full group flex items-center gap-3 px-3 py-3 rounded-md transition-all duration-200 outline-none",
                    isActive
                      ? "bg-[#E95420] text-white shadow-lg"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <div className={clsx(
                    "flex items-center justify-center transition-transform duration-300",
                    isActive ? "scale-110" : "group-hover:scale-110"
                  )}>
                    <Icon size={22} strokeWidth={2.5} />
                  </div>
                  <span className="hidden md:inline font-medium text-sm">
                    {label}
                  </span>
                </button>
              );
            })}
          </div>


        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden relative flex flex-col bg-gray-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex-1 p-8 md:p-12 overflow-y-auto"
            >
              {/* Header Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-10 relative overflow-hidden group">
                {/* Accent line on left */}
                <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#E95420]" />

                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                    {skillsData[activeTab].title}
                  </h1>
                </div>
                <p className="text-gray-600 font-medium max-w-2xl leading-relaxed">
                  {skillsData[activeTab].description}
                </p>
              </div>

              {/* Grid Layout for Skills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillsData[activeTab].items.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-[#E95420]/30 transition-all flex items-center group overflow-hidden"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center mr-4 group-hover:bg-[#E95420]/5 transition-colors p-2.5">
                      {item.icon === "burp" ? (
                        <BurpIcon className="w-full h-full object-contain" />
                      ) : (
                        <StackIcon name={item.icon} className="w-full h-full object-contain" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-gray-800 text-lg group-hover:text-[#E95420] transition-colors block truncate">
                        {item.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </Window>
  );
}

const BurpIcon = ({ className }: { className?: string }) => (
  <img
    src="/BurpSuite_logo.svg"
    className={className}
    alt="Burp Suite"
  />
);

