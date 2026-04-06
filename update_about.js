const fs = require('fs');

const content = `"use client";

import React, { useState, useEffect } from "react";
import Window from "../desktop/Window";
import {
  FiMonitor,
  FiCpu,
  FiCheckCircle,
  FiUser,
  FiMapPin,
  FiShield,
  FiAward
} from "react-icons/fi";

export default function AboutApp() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (step === 2) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep(3), 400);
            return 100;
          }
          return prev + Math.floor(Math.random() * 12) + 2;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [step]);

  const steps = [
    { id: 1, name: "Welcome & Profile" },
    { id: 2, name: "Installing Details" },
    { id: 3, name: "Ready" }
  ];

  return (
    <Window
      id="about"
      defaultSize={{ width: 780, height: 520 }}
      defaultMaximized={false}
    >
      <div className="h-full w-full bg-[#f0f4f8] text-slate-800 flex font-sans select-none overflow-hidden rounded-b-xl border border-t-0 border-[#d7deea]">
        
        {/* Left Sidebar - Installer Steps */}
        <div className="w-64 bg-slate-800 text-white shrink-0 hidden md:block border-r border-slate-700">
          <div className="p-6">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-8">
              <FiMonitor className="text-blue-400"/> Damindu OS
            </h2>
            <ul className="space-y-4">
              {steps.map((s) => (
                <li 
                  key={s.id} 
                  className={\`flex items-center gap-3 text-sm font-medium transition-colors \${
                    step === s.id ? "text-blue-400" : step > s.id ? "text-slate-400" : "text-slate-500"
                  }\`}
                >
                  <span className={\`w-2.5 h-2.5 rounded-full \${
                    step === s.id ? "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" : step > s.id ? "bg-slate-400" : "bg-slate-600"
                  }\`}></span>
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
          
          <div className="flex-1 p-8 overflow-y-auto">
            {step === 1 && (
              <div className="animate-in fade-in duration-300 space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">Welcome</h1>
                  <p className="text-sm text-slate-500 mt-1">Reviewing user profile before installation...</p>
                </div>

                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-sm shrink-0">
                    <FiUser size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">Damindu De Silva</h2>
                    <p className="text-sm text-slate-600">Computer Science & Engineering Undergrad</p>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                      <FiMapPin size={10} /> University of Moratuwa, Sri Lanka
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#eef4ff] border border-[#d5e5ff] rounded-lg px-3 py-2">
                    <p className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mb-0.5">GPA</p>
                    <p className="text-lg font-bold text-blue-700">3.5</p>
                  </div>
                  <div className="bg-[#eef4ff] border border-[#d5e5ff] rounded-lg px-3 py-2">
                    <p className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mb-0.5">CTF Finals</p>
                    <p className="text-lg font-bold text-blue-700">2+</p>
                  </div>
                  <div className="bg-[#eef4ff] border border-[#d5e5ff] rounded-lg px-3 py-2">
                    <p className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mb-0.5">Focus</p>
                    <p className="text-lg font-bold text-blue-700">Cybersecurity</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <h3 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                     <FiAward className="text-blue-500"/> Key Milestones
                  </h3>
                   <ul className="space-y-1.5 text-xs text-slate-600">
                      <li>• Cybersecurity enthusiast & CTF Finalist (Cybershield 4.0, CryptX)</li>
                      <li>• Logistics Committee Member for CSE 40th Anniversary</li>
                      <li>• Operations handler for IESL Robogames 2024</li>
                   </ul>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in zoom-in-95 duration-300 text-center flex flex-col items-center justify-center h-full">
                <FiCpu className="text-5xl text-blue-500 animate-pulse mb-6" />
                <h2 className="text-xl font-bold text-slate-800 mb-2">Installing Dependencies</h2>
                <p className="text-sm text-slate-500 mb-8">Unpacking achievements and generating portfolio...</p>
                
                <div className="w-full max-w-sm space-y-2">
                  <div className="flex justify-between text-xs font-medium text-slate-500 mb-1 px-1">
                    <span>Copying files...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-200 ease-out"
                      style={{ width: \`\${progress}%\` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center flex flex-col items-center justify-center h-full">
                <FiCheckCircle className="text-6xl text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Installation Complete
                </h2>
                <p className="text-sm text-slate-500 max-w-sm mx-auto">
                  Damindu's profile has been successfully installed. You can now explore the rest of the desktop environment.
                </p>
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex justify-between items-center shrink-0">
            <div className="text-sm text-slate-500">
              {step === 1 && "Start the installation"}
              {step === 2 && "Please wait..."}
              {step === 3 && "Setup is finished"}
            </div>
            <div className="flex gap-3">
              {step === 1 && (
                <>
                  <button
                    onClick={() => {
                      const closeBtn = document.querySelector('[data-window-id="about"] button[aria-label="Close"]') as HTMLButtonElement | null;
                      if (closeBtn) closeBtn.click();
                    }}
                    className="px-6 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg transition-colors shadow-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                  >
                    Install Now
                  </button>
                </>
              )}
              {step === 3 && (
                <button
                  onClick={() => {
                    const closeBtn = document.querySelector('[data-window-id="about"] button[aria-label="Close"]') as HTMLButtonElement | null;
                    if (closeBtn) closeBtn.click();
                    else window.dispatchEvent(new CustomEvent('close-window', { detail: 'about' }));
                  }}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                >
                  Restart Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}
`;

fs.writeFileSync('src/components/apps/AboutApp.tsx', content);
console.log('Successfully wrote AboutApp.tsx');
