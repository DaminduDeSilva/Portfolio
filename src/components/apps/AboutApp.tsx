"use client";

import React, { useState, useEffect } from "react";
import {
  FiPackage,
  FiCheckCircle,
  FiTerminal,
  FiMonitor,
} from "react-icons/fi";
import { useWindowContext } from "@/contexts/WindowContext";
import Window from "../desktop/Window";

export default function AboutApp() {
  const { windows, closeWindow } = useWindowContext();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (windows["about"]?.isOpen) {
      setStep(1);
      setProgress(0);
    }
  }, [windows["about"]?.isOpen]);

  useEffect(() => {
    if (step === 3) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep(4), 500); // Wait a half sec then go to finished
            return 100;
          }
          return prev + Math.floor(Math.random() * 15) + 5;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [step]);



  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleCancel = () => closeWindow("about");

  const renderSidebar = () => (
    <div className="w-1/3 bg-[#300a24] text-white p-8 flex flex-col justify-between shrink-0 rounded-l-xl border-r border-[#E95420]/30 shadow-[inset_-5px_0_15px_rgba(0,0,0,0.3)]">
      <div>
        <div className="flex items-center space-x-3 mb-10">
          <FiPackage size={48} className="text-[#E95420]" />
          <h1 className="text-2xl font-bold font-ubuntu leading-tight">
            about_me.deb <br />
            <span className="text-base text-gray-300 font-normal">
              Installation
            </span>
          </h1>
        </div>
        <ul className="space-y-6 relative ml-2">
          {/* Timeline lines */}
          <div className="absolute left-[11px] top-6 bottom-6 w-0.5 bg-white/20 z-0" />
          
          {[
            { num: 1, label: "Welcome" },
            { num: 2, label: "Extracting Bio" },
            { num: 3, label: "Building Skills" },
            { num: 4, label: "Installation Complete" },
          ].map((s) => (
            <li key={s.num} className="flex items-center z-10 relative">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === s.num
                    ? "bg-[#E95420] text-white shadow-[0_0_12px_#E95420]"
                    : step > s.num
                      ? "bg-green-500 text-white"
                      : "bg-white/20 text-white/50"
                }`}
              >
                {step > s.num ? "✓" : s.num}
              </div>
              <span
                className={`ml-4 text-base ${
                  step === s.num
                    ? "font-semibold text-white drop-shadow-md"
                    : step > s.num
                      ? "text-gray-300"
                      : "text-gray-500"
                }`}
              >
                {s.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-sm text-white/40">v24.04 (LTS) - Stable Release</div>
    </div>
  );

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col h-full animate-fade-in text-gray-800">
            <h2 className="text-3xl font-bold mb-6 font-ubuntu text-gray-900 border-b pb-3">
              Welcome to Damindu's Setup Wizard
            </h2>
            <div className="flex gap-6 mb-6">
              <div className="flex-1">
                <p className="mb-4 text-lg leading-relaxed">
                  This wizard will install <b>Damindu De Silva's Portfolio</b> on
                  your computer. It is recommended that you grab a coffee before
                  continuing.
                </p>
                <p className="mb-4 text-lg leading-relaxed">
                  Damindu is an innovative Undergraduate Software Engineer currently
                  pursuing a BSc in Computer Science and Engineering at the
                  University of Moratuwa.
                </p>
              </div>
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#E95420] to-[#772953] p-1 shadow-lg shrink-0">
                <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center overflow-hidden">
                  <img src="https://ui-avatars.com/api/?name=Damindu+De+Silva&background=E95420&color=fff&size=256" alt="Damindu" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm flex items-start gap-3">
                <FiMonitor className="text-[#E95420] mt-1" size={24} />
                <div>
                  <p className="font-bold text-gray-900">Web Development</p>
                  <p className="text-sm text-gray-600">React, Next.js, TypeScript & Modern UI/UX</p>
                </div>
              </div>
              <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm flex items-start gap-3">
                <FiTerminal className="text-[#E95420] mt-1" size={24} />
                <div>
                  <p className="font-bold text-gray-900">Cybersecurity</p>
                  <p className="text-sm text-gray-600">CTF Player, Pentesting & Network Security</p>
                </div>
              </div>
            </div>

            <p className="mt-auto pt-6 text-base text-gray-500 font-medium">
              Click Next to continue, or Cancel to exit Setup.
            </p>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col h-full animate-fade-in text-gray-800">
            <h2 className="text-3xl font-bold mb-6 font-ubuntu text-gray-900 border-b pb-3">
              Professional Biography
            </h2>
            <p className="mb-3 text-base font-medium text-gray-700">Detailed academic and professional summary:</p>
            <div className="flex-1 overflow-y-auto mb-6 bg-white border border-gray-300 p-6 text-base rounded-md shadow-inner space-y-6">
              <section>
                <h3 className="font-bold text-lg mb-2 text-[#E95420] flex items-center border-b pb-1">
                  <span className="bg-[#E95420] text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs mr-2">1</span> Education
                </h3>
                <div className="ml-8 space-y-4">
                  <div>
                    <p className="font-bold text-gray-900 text-lg">BSc (Hons) in Computer Science & Engineering</p>
                    <p className="text-gray-700 font-medium">University of Moratuwa (2022 - Present)</p>
                    <p className="text-[#E95420] font-bold mt-1 inline-block bg-[#fff3ef] px-2 py-0.5 rounded border border-[#ffd8cc]">Current GPA: 3.52 / 4.20</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">G.C.E Advanced Level (Physical Science Stream)</p>
                    <p className="text-gray-700 font-medium">Bandaranayake College Gampaha (2020)</p>
                    <p className="text-gray-600 text-sm italic">3A's - Maths Stream | District Rank: 40 | Island Rank: 500+</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-bold text-lg mb-2 text-[#E95420] flex items-center border-b pb-1">
                  <span className="bg-[#E95420] text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs mr-2">2</span> Key Projects
                </h3>
                <ul className="ml-12 list-disc space-y-2 text-gray-700">
                  <li><b>Ubuntu OS Portfolio</b> - A fully functional web-based desktop environment.</li>
                  <li><b>CyberGuard AI</b> - Machine learning model for network intrusion detection.</li>
                  <li><b>DevFlow</b> - Collaborative task management system for engineering teams.</li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-lg mb-2 text-[#E95420] flex items-center border-b pb-1">
                  <span className="bg-[#E95420] text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs mr-2">3</span> Achievements
                </h3>
                <ul className="ml-12 list-disc space-y-2 text-gray-700">
                  <li>Finalist at HackMoratuwa 2023</li>
                  <li>Top 10 in University CTF Competition</li>
                  <li>Dean's List for Academic Excellence (Semester 1, 2, 4)</li>
                </ul>
              </section>
            </div>
            <div className="flex items-center space-x-3 mt-auto p-3 bg-gray-100 rounded border border-gray-200">
              <input type="radio" id="accept" name="license" defaultChecked className="accent-[#E95420] w-6 h-6 cursor-pointer" />
              <label htmlFor="accept" className="text-base font-semibold cursor-pointer select-none text-gray-800">
                I acknowledge Damindu's expertise and professional background
              </label>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col h-full animate-fade-in text-gray-800">
            <h2 className="text-3xl font-bold mb-6 font-ubuntu text-gray-900 border-b pb-3">
              Deploying Core Modules...
            </h2>
            <p className="mb-6 text-lg text-gray-600">
              Please wait while the wizard configures environment variables and
              installs the full stack of skills required for this portfolio.
            </p>
            
            <div className="mt-4 space-y-4 bg-white p-6 border border-gray-300 rounded-lg shadow-inner">
              <div className="flex justify-between text-base font-bold text-gray-800">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-[#E95420] rounded-full mr-2 animate-ping" />
                  {progress < 20 ? "Initializing..." : 
                   progress < 40 ? "Configuring Frontend (React/Next)..." : 
                   progress < 60 ? "Linking Backend (Node/Go)..." : 
                   progress < 85 ? "Securing Environment (Cyber)..." : 
                   "Finalizing deployment..."}
                </span>
                <span className="text-[#E95420]">{Math.min(progress, 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6 p-1 shadow-inner border border-gray-300">
                <div
                  className="bg-gradient-to-r from-[#E95420] via-[#ff6e3c] to-[#c64010] h-full rounded-full transition-all duration-300 ease-out flex items-center justify-end px-2"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                >
                  {progress > 10 && <div className="text-[10px] text-white font-bold">INSTALLING</div>}
                </div>
              </div>
            </div>

            <div className="mt-6 bg-[#1e1e1e] text-[#4af626] font-mono text-sm p-4 rounded-md h-40 overflow-y-auto border-2 border-gray-700 shadow-2xl custom-scrollbar">
              <div className="text-gray-500 text-xs mb-1"># Ubuntu 24.04 (Noble Numbat) dpkg logs</div>
              {progress > 5 && <div>&gt; Reading package lists... Done</div>}
              {progress > 15 && <div>&gt; Unpacking react-dom (18.2.0-stable)... 100%</div>}
              {progress > 25 && <div>&gt; Setting up tailwindcss-jit-engine... OK</div>}
              {progress > 35 && <div>&gt; Processing: Moratuwa-CSE-Core-Concept... [PASS]</div>}
              {progress > 45 && <div>&gt; Fetching project-assets from /var/cache/apt/archives...</div>}
              {progress > 55 && <div className="text-white">&gt; MD5 Checksum: d41d8cd98f00b204e9800998ecf8427e</div>}
              {progress > 65 && <div>&gt; Linking cybersecurity-toolkit to /usr/bin/ctf</div>}
              {progress > 75 && <div>&gt; Compiling Damindu-Profile-Data.cpp... Done</div>}
              {progress > 85 && <div>&gt; Creating symlinks for portfolio-os...</div>}
              {progress >= 100 && <div className="text-yellow-400 font-bold animate-pulse">&gt; SUCCESS: Damindu De Silva has been installed!</div>}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col h-full animate-fade-in text-gray-800">
            <div className="flex items-center mb-6 mt-4">
              <div className="relative">
                <FiCheckCircle size={72} className="text-green-500 drop-shadow-lg" />
                <div className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-20 scale-125" />
              </div>
              <div className="ml-5">
                <h2 className="text-4xl font-bold font-ubuntu text-gray-900 leading-tight">
                  Installation <br/> Successfully Finished
                </h2>
              </div>
            </div>
            
            <div className="bg-white border border-gray-300 p-6 rounded-xl shadow-sm space-y-4">
              <p className="text-lg leading-relaxed text-gray-700">
                Setup has finished installing <b>Damindu De Silva's Portfolio System</b>.
                All project modules and tech-stack dependencies were successfully deployed.
              </p>
              
              <div className="grid grid-cols-3 gap-4 py-2 text-center text-sm font-bold">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-[#E95420] text-xl">10+</p>
                  <p className="text-gray-500">Projects</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-[#E95420] text-xl">15+</p>
                  <p className="text-gray-500">Skills</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-[#E95420] text-xl">100%</p>
                  <p className="text-gray-500">Quality</p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-lg font-medium text-gray-800">
              You can now launch applications from the taskbar to explore his work.
            </p>

            <div className="bg-gradient-to-r from-[#E95420]/10 to-transparent p-4 border-l-4 border-l-[#E95420] rounded-r mt-auto shadow-sm">
              <p className="italic text-gray-800 font-ubuntu">
                "Code is like humor. When you have to explain it, it’s bad." — Let the projects speak.
              </p>
            </div>
            
            <p className="mt-6 text-base text-gray-400 font-medium text-right">
              Click Finish to enter the environment.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Window id="about" defaultSize={{ width: 900, height: 600 }} defaultMaximized={false}>
      <div className="flex w-full h-full bg-white overflow-hidden text-gray-800">
        {renderSidebar()}
        <div className="flex-1 flex flex-col pt-8 pb-5 px-8 bg-gradient-to-b from-white to-[#eaebec]">
          <div className="flex-1 min-h-0 overflow-y-auto pr-2 pb-2">
            {renderContent()}
          </div>
          
          {/* Footer Buttons */}
          <div className="mt-6 pt-5 border-t border-gray-300 flex justify-end space-x-4 shrink-0">
            {step < 4 && (
              <button
                onClick={handleCancel}
                className="px-8 py-2.5 rounded text-base font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 border border-gray-400 transition-colors shadow-sm focus:ring-2 focus:ring-gray-400 focus:outline-none hover:shadow"
              >
                Cancel
              </button>
            )}
            
            {step > 1 && step < 4 && (
              <button
                onClick={handleBack}
                disabled={step === 3}
                className={`px-8 py-2.5 rounded text-base font-bold border transition-colors shadow-sm focus:ring-2 focus:ring-gray-400 focus:outline-none hover:shadow ${
                  step === 3 
                    ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                    : "text-gray-700 bg-gray-200 hover:bg-gray-300 border-gray-400"
                }`}
              >
                Back
              </button>
            )}
            
            <button
              onClick={step === 4 ? handleCancel : handleNext}
              disabled={step === 3}
              className={`px-8 py-2.5 rounded text-base font-bold shadow-sm transition-all focus:ring-2 focus:ring-[#E95420] focus:outline-none flex items-center hover:shadow ${
                step === 3
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-400"
                  : "bg-gradient-to-b from-[#E95420] to-[#c64010] text-white border border-[#b2360a] hover:from-[#ff6e3c] hover:to-[#db4b17]"
              }`}
            >
              {step === 1 || step === 2 ? "Next >" : step === 3 ? "Installing" : "Finish"}
            </button>
          </div>
        </div>
      </div>
    </Window>
  );
}
