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

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 8));
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
                <p className="font-bold text-lg">BSc (Hons) in Computer Science & Engineering</p>
                <p className="text-gray-600 font-medium">University of Moratuwa (2022 - Present)</p>
                <p className="text-[#E95420] font-bold mt-2 inline-block bg-[#fff3ef] px-2 py-0.5 rounded border border-[#ffd8cc]">
                  Current GPA: 3.52 / 4.20
                </p>
              </div>
              <div className="bg-gray-50 p-4 border border-gray-200 rounded">
                <p className="font-bold text-lg">G.C.E Advanced Level (Physical Science Stream)</p>
                <p className="text-gray-600 font-medium">Bandaranayake College Gampaha (2020)</p>
                <p className="text-gray-500 text-sm mt-1">3A's - Maths Stream | District Rank: 40 | Island Rank: 500+</p>
              </div>
            </div>
          </div>
        );

      case 4: // EXPERIENCE
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
            <h2 className="text-2xl font-bold mb-4 text-[#E95420]">Key Projects</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 border border-gray-200 rounded">
                <h3 className="font-bold text-lg">Ubuntu OS Portfolio</h3>
                <p className="text-sm text-gray-600 mb-2">Next.js • TailwindCSS • React</p>
                <p className="text-gray-700">A fully functional web-based desktop environment simulating Ubuntu Linux.</p>
              </div>
              <div className="bg-gray-50 p-4 border border-gray-200 rounded">
                <h3 className="font-bold text-lg">CyberGuard AI</h3>
                <p className="text-sm text-gray-600 mb-2">Python • TensorFlow • Scikit-Learn</p>
                <p className="text-gray-700">A machine learning model designed to detect anomalies in network intrusion scenarios.</p>
              </div>
              <div className="bg-gray-50 p-4 border border-gray-200 rounded">
                <h3 className="font-bold text-lg">DevFlow</h3>
                <p className="text-sm text-gray-600 mb-2">Node.js • Express • MongoDB</p>
                <p className="text-gray-700">A collaborative task management system specifically tailored for agile engineering teams.</p>
              </div>
            </div>
          </div>
        );

      case 6: // ACHIEVEMENTS
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
