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

  // Install animation
  useEffect(() => {
    if (step === 7) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep(8), 500);
            return 100;
          }
          return prev + Math.floor(Math.random() * 10) + 5;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleNext = () => setStep((prev) => prev >= 6 ? 7 : prev + 1);
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleCancel = () => closeWindow("about");

  const steps = [
    "Intro",
    "About",
    "Education",
    "Experience",
    "Projects",
    "Achievements",
    "Installing",
    "Complete",
  ];

  const renderSidebar = () => (
    <div className="w-1/3 bg-[#300a24] text-white p-8 flex flex-col justify-between border-r border-[#E95420]/30">
      <div>
        <div className="flex items-center space-x-3 mb-10">
          <FiPackage size={48} className="text-[#E95420]" />
          <h1 className="text-2xl font-bold font-ubuntu">About_me.deb</h1>
        </div>

        <ul className="space-y-5">
          {steps.map((label, i) => {
            const num = i + 1;
            return (
              <li key={num} className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step === num
                      ? "bg-[#E95420]"
                      : step > num
                        ? "bg-green-500"
                        : "bg-white/20"
                  }`}
                >
                  {step > num ? "✓" : num}
                </div>
                <span className="ml-3 text-sm">{label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (step) {
      case 1: // INTRO
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <img
              src="https://ui-avatars.com/api/?name=Damindu+De+Silva&background=E95420&color=fff&size=256"
              className="w-32 h-32 rounded-full mb-6 shadow-lg object-cover"
              alt="Damindu De Silva"
            />
            <h2 className="text-3xl font-bold mb-2 text-gray-800">Damindu De Silva</h2>
            <p className="text-gray-600 font-medium">
              Cybersecurity & Full-stack Developer
            </p>
          </div>
        );

      case 2: // ABOUT
        return (
          <div className="text-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-[#E95420]">About Me</h2>
            <div className="space-y-4 leading-relaxed bg-gray-50 p-4 border border-gray-200 rounded">
              <p>
                Hello! I am an ambitious undergraduate pursuing my BSc (Hons) in Computer Science & Engineering at the University of Moratuwa.
              </p>
              <p>
                I specialize in Cybersecurity, Full-Stack Development, and System Architecture. I have a deep passion for open-source software, Linux environments, and creating tools that solve complex problems efficiently and securely.
              </p>
            </div>
          </div>
        );

            case 3: // EDUCATION
        return (
          <div className="text-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-[#E95420]">Education</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 border border-gray-200 rounded">
                <p className="font-bold text-lg">BSc. Engineering (Hons) in Computer Science and Engineering</p>
                <p className="text-gray-600 font-medium">University of Moratuwa (2023 - Present)</p>
                <p className="text-[#E95420] font-bold mt-2 inline-block bg-[#fff3ef] px-2 py-0.5 rounded border border-[#ffd8cc]">
                  Current GPA: 3.55 (3rd Year)
                </p>
              </div>
              <div className="bg-gray-50 p-4 border border-gray-200 rounded">
                <p className="font-bold text-lg">G.C.E. Advanced Level Examination</p>
                <p className="text-gray-600 font-medium">Maliyadeva College, Kurunegala (2021) [2022]</p>
                <p className="text-gray-500 text-sm mt-1">Physical Science Stream - 3 As (Distinction)</p>
                <p className="text-gray-500 text-sm mt-1 font-bold">Z-score: 2.3958 | Island Rank: 262</p>
              </div>
            </div>
          </div>
        );


        return (
          <div className="text-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-[#E95420]">Experience</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 border border-gray-200 rounded">
                <p className="font-bold text-lg border-b pb-2 mb-2">Freelance Web & Security Consultant</p>
                <ul className="list-disc ml-5 space-y-1 text-gray-700">
                  <li>Consulted on full-stack web applications prioritizing security best-practices.</li>
                  <li>Performed environment hardening and deployment automated workflows via CI/CD for clients.</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 border border-gray-200 rounded">
                <p className="font-bold text-lg border-b pb-2 mb-2">Open Source Contributor</p>
                <ul className="list-disc ml-5 space-y-1 text-gray-700">
                  <li>Building and distributing custom utilities across Linux forums.</li>
                  <li>Exploring security vulnerabilities in modern web architectures.</li>
                </ul>
              </div>
            </div>
          </div>
        );

            case 5: // PROJECTS
        return (
          <div className="text-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-[#E95420]">Cyber Security Projects</h2>
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 border border-gray-200 rounded">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">Web Domain Scanner & Service Discovery</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Python • RustScan • Nmap • Gemini API</p>
                <p className="text-gray-700 text-sm mb-2">Passive & active recon tool with AI LLM wordlist generation, CDN tracking, and API detection.</p>
                <a href="https://github.com/DaminduDeSilva/web-domain-scanner" target="_blank" className="text-blue-600 text-sm hover:underline">github.com/DaminduDeSilva/web-domain-scanner</a>
              </div>
              <div className="bg-gray-50 p-4 border border-gray-200 rounded">
                <h3 className="font-bold text-lg">Cryptographic CTF Challenge - Web App</h3>
                <p className="text-sm text-gray-600 mb-2">Python (Flask) • AES • ECDSA</p>
                <p className="text-gray-700 text-sm mb-2">Simulated challenge with AES-encrypted passwords & ECDSA private key recovery (nonce reuse).</p>
                <a href="https://github.com/DaminduDeSilva/CTF-Challenge-Cryptography" target="_blank" className="text-blue-600 text-sm hover:underline">github.com/DaminduDeSilva/CTF-Challenge-Cryptography</a>
              </div>
              <div className="bg-gray-50 p-4 border border-gray-200 rounded">
                <h3 className="font-bold text-lg">Android App Security Analysis - InsecureBankv2</h3>
                <p className="text-sm text-gray-600 mb-2">Burp Suite • JADX • APKTool</p>
                <p className="text-gray-700 text-sm mb-2">OWASP Mobile security assessment finding insecure storage and weak auth.</p>
                <a href="https://bit.ly/android-security-analysis" target="_blank" className="text-blue-600 text-sm hover:underline">View Report</a>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-[#E95420]">Full-Stack Projects</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 border border-gray-200 rounded">
                <h3 className="font-bold text-lg">Salon Management SaaS Platform</h3>
                <p className="text-sm text-gray-600 mb-2">Node.js • Supabase • React.js</p>
                <p className="text-gray-700 text-sm mb-2">Complete platform connecting salons & customers with secure OAuth auth.</p>
                <a href="https://github.com/Vivora-Solutions" target="_blank" className="text-blue-600 text-sm hover:underline">github.com/Vivora-Solutions</a>
              </div>
              <div className="bg-gray-50 p-4 border border-gray-200 rounded">
                <h3 className="font-bold text-lg">Healthcare Management Microservices</h3>
                <p className="text-sm text-gray-600 mb-2">Spring Boot • Angular • Hyperledger Fabric</p>
                <p className="text-gray-700 text-sm mb-2">Decentralized health records via blockchain, AI diagnosis, and WebRTC streaming.</p>
                <a href="https://github.com/DaminduDeSilva/Healthcare-Appointment-and-Management-System" target="_blank" className="text-blue-600 text-sm hover:underline">github.com/DaminduDeSilva/Healthcare-Appointment-and-Management-System</a>
              </div>
              <div className="bg-gray-50 p-4 border border-gray-200 rounded">
                <h3 className="font-bold text-lg">Supply Chain Management Platform</h3>
                <p className="text-sm text-gray-600 mb-2">React.js • Node.js • MySQL</p>
                <p className="text-gray-700 text-sm mb-2">End-to-end logistics platform managing railway & truck transit operations.</p>
                <a href="https://github.com/DaminduDeSilva/Supply-Chain-Management-System" target="_blank" className="text-blue-600 text-sm hover:underline">github.com/DaminduDeSilva/Supply-Chain-Management-System</a>
              </div>
            </div>
          </div>
        );


        return (
          <div className="text-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-[#E95420]">Achievements</h2>
            <div className="bg-gray-50 p-5 border border-gray-200 rounded space-y-3 shadow-inner">
              <div className="flex items-start">
                <FiCheckCircle className="text-green-500 mt-1 shrink-0 mr-3" />
                <p className="text-gray-700"><b>A/L District Rank 40</b> & Island Rank 500+ (Physical Science Stream)</p>
              </div>
              <div className="flex items-start">
                <FiCheckCircle className="text-green-500 mt-1 shrink-0 mr-3" />
                <p className="text-gray-700">Selection into the prestigious <b>University of Moratuwa</b> CSE program</p>
              </div>
              <div className="flex items-start">
                <FiCheckCircle className="text-green-500 mt-1 shrink-0 mr-3" />
                <p className="text-gray-700">Active participant in university-level Hackathons and CTF (Capture The Flag) challenges.</p>
              </div>
            </div>
          </div>
        );

      case 7: // INSTALLING
        return (
          <div className="text-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-[#E95420]">Installing dependencies...</h2>

            <div className="bg-[#300a24] text-green-400 font-mono p-4 mb-4 rounded border border-gray-600 shadow-inner h-32 overflow-hidden flex flex-col justify-end">
              <div>&gt; sudo apt-get install damindu-core-deps</div>
              <div>&gt; Unpacking skills...</div>
              <div>&gt; Setting up workspace...</div>
              <div className="animate-pulse">&gt; _</div>
            </div>

            <div className="w-full bg-gray-200 h-4 rounded overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-[#E95420] to-[#c64010] h-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        );

      case 8: // COMPLETE
        return (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-800">
            <div className="bg-green-100 p-6 rounded-full mb-6">
              <FiCheckCircle size={64} className="text-green-500" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Installation Complete</h2>
            <p className="text-gray-600">
              The environment is now ready. Click <b>Finish</b> to explore the portfolio!
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Window id="about" defaultSize={{ width: 900, height: 600 }}>
      <div className="flex w-full h-full bg-white">
        {renderSidebar()}

        <div className="flex-1 flex flex-col p-8 overflow-hidden">
          <div className="flex-1 overflow-y-auto pr-2 pb-2">{renderContent()}</div>

          <div className="mt-6 flex justify-end space-x-3 shrink-0">
            {step > 1 && step < 7 && (
              <button onClick={handleBack} className="px-4 py-2 bg-gray-200">
                Back
              </button>
            )}

            {step < 7 && (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-[#E95420] text-white"
              >
                Next
              </button>
            )}

            {step === 7 && (
              <button
                disabled
                className="px-4 py-2 bg-gray-400 text-white cursor-not-allowed"
              >
                Installing...
              </button>
            )}

            {step === 8 && (
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-[#E95420] text-white"
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </div>
    </Window>
  );
}
