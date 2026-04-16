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
  const [projectTab, setProjectTab] = useState<'cyber' | 'devops' | 'fullstack'>('cyber');

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
    <div className="hidden md:flex w-1/3 bg-[#300a24] text-white p-8 flex-col justify-between border-r border-[#E95420]/30">
      <div>
        <div className="flex items-center space-x-3 mb-10">
          <FiPackage size={48} className="text-[#E95420]" />
          <h1 className="text-2xl font-bold font-ubuntu">About_me.deb</h1>
        </div>

         <ul className="space-y-5">
           {steps.map((label, i) => {
             const num = i + 1;
             const isActive = step === num;
             return (
               <li
                 key={num}
                 className={`flex items-center cursor-pointer group transition-all p-2 -mx-2 rounded-lg ${isActive ? "bg-white/10" : "hover:bg-white/5"}`}
                 onClick={() => setStep(num)}
               >
                 <div
                   className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${isActive
                       ? "bg-[#E95420] scale-110 shadow-lg shadow-[#E95420]/30"
                       : step > num
                         ? "bg-green-500"
                         : "bg-white/20 group-hover:bg-white/30"
                     }`}
                 >
                   {step > num ? "✓" : num}
                 </div>
                 <span className={`ml-3 text-sm transition-colors ${isActive ? "text-white font-bold" : "text-white/70 group-hover:text-white"}`}>
                   {label}
                 </span>
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

      case 4: // EXPERIENCE
        return (
          <div className="text-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-[#E95420]">Experience</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 border border-gray-200 rounded">
                <p className="font-bold text-lg border-b pb-2 mb-2">Intern DevOps Engineer (Dec 2025 - May 2026)</p>
                <p className="text-gray-600 font-bold mb-3">@ Sri Lanka Telecom</p>
                <ul className="list-disc ml-5 space-y-2 text-gray-700">
                  <li>Worked with real production application hosting and deployment.</li>
                  <li>Managed infrastructure provisioning and firewall operations.</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-6 mb-4 text-[#E95420]">Volunteering</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 border border-gray-200 rounded">
                <p className="font-bold text-md text-gray-900">Cyber Rush Dev Team (2025)</p>
                <p className="text-gray-600 text-sm">Designed interactive cryptography CTF challenges.</p>
              </div>
              <div className="bg-gray-50 p-3 border border-gray-200 rounded">
                <p className="font-bold text-md text-gray-900">CSE 40 Logistics Committee (2025)</p>
                <p className="text-gray-600 text-sm">Organized the 40th anniversary of UoM CSE Dept.</p>
              </div>
              <div className="bg-gray-50 p-3 border border-gray-200 rounded">
                <p className="font-bold text-md text-gray-900">IESL Robogames (2024/2025)</p>
                <p className="text-gray-600 text-sm">Member of logistics team for Sri Lanka's largest robotics competition.</p>
              </div>
            </div>
          </div>
        );

      case 5: // PROJECTS
        return (
          <div className="text-gray-800 flex flex-col h-full bg-white">
            <h2 className="text-2xl font-bold mb-4 text-[#E95420] shrink-0">Projects Portfolio</h2>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-4 shrink-0 overflow-x-auto">
              <button
                onClick={() => setProjectTab('cyber')}
                className={`py-2 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${projectTab === 'cyber' ? 'border-[#E95420] text-[#E95420]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Cyber Security
              </button>
              <button
                onClick={() => setProjectTab('devops')}
                className={`py-2 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${projectTab === 'devops' ? 'border-[#E95420] text-[#E95420]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                DevOps & Cloud
              </button>
              <button
                onClick={() => setProjectTab('fullstack')}
                className={`py-2 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${projectTab === 'fullstack' ? 'border-[#E95420] text-[#E95420]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Full-Stack
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto pr-2 pb-2 space-y-4">
              {projectTab === 'cyber' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="bg-gray-50 p-4 border border-gray-200 rounded hover:border-[#E95420]/30 transition-colors">
                    <h3 className="font-bold text-lg text-gray-900">Web Domain Scanner & Service Discovery</h3>
                    <p className="text-xs text-[#E95420] font-mono mb-2 bg-[#E95420]/10 inline-block px-2 py-1 rounded">Python • RustScan • Nmap • Gemini API</p>
                    <p className="text-gray-700 text-sm mb-3">Passive & active recon tool with AI LLM wordlist generation, CDN tracking, and API detection.</p>
                    <a href="https://github.com/DaminduDeSilva/web-domain-scanner.git" target="_blank" className="text-blue-600 text-sm hover:underline font-medium">View Source →</a>
                  </div>
                  <div className="bg-gray-50 p-4 border border-gray-200 rounded hover:border-[#E95420]/30 transition-colors">
                    <h3 className="font-bold text-lg text-gray-900">Cryptographic CTF Challenge - Web App</h3>
                    <p className="text-xs text-[#E95420] font-mono mb-2 bg-[#E95420]/10 inline-block px-2 py-1 rounded">Python (Flask) • AES • ECDSA</p>
                    <p className="text-gray-700 text-sm mb-3">Simulated challenge with AES-encrypted passwords & ECDSA private key recovery via nonce reuse attack patterns.</p>
                    <a href="https://github.com/DaminduDeSilva/CTF-Challenge-Cryptography" target="_blank" className="text-blue-600 text-sm hover:underline font-medium">View Source →</a>
                  </div>
                  <div className="bg-gray-50 p-4 border border-gray-200 rounded hover:border-[#E95420]/30 transition-colors">
                    <h3 className="font-bold text-lg text-gray-900">Android App Security Analysis - InsecureBankv2</h3>
                    <p className="text-xs text-[#E95420] font-mono mb-2 bg-[#E95420]/10 inline-block px-2 py-1 rounded">Burp Suite • JADX • APKTool</p>
                    <p className="text-gray-700 text-sm mb-3">OWASP Mobile security assessment finding insecure storage and weak authentication mechanisms.</p>
                    <a href="https://bit.ly/android-security-analysis" target="_blank" className="text-blue-600 text-sm hover:underline font-medium">View Report →</a>
                  </div>
                </div>
              )}

              {projectTab === 'devops' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="bg-gray-50 p-4 border border-[#E95420]/40 rounded hover:border-[#E95420] transition-colors relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 right-0 bg-[#E95420] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg tracking-wider">FEATURED</div>
                    <h3 className="font-bold text-lg text-gray-900 pr-16">CI-Insight: Unified CI/CD Intelligence</h3>
                    <p className="text-xs text-[#E95420] font-mono mb-2 bg-[#E95420]/10 inline-block px-2 py-1 rounded mt-2">Next.js 16 • Tailwind CSS • App Router</p>
                    <p className="text-gray-700 text-sm mb-3">An AI-powered CI/CD intelligence platform that unifies pipeline data, enables AI-driven security analysis, and supports DevSecOps workflows through a cinematic, interactive dashboard framework.</p>
                    <a href="https://github.com/Dark-Side-Mora/ci-insight-presentation" target="_blank" className="text-blue-600 text-sm hover:underline font-medium flex items-center gap-1">
                      View Platform <span className="text-xs">→</span>
                    </a>
                  </div>
                  <div className="bg-gray-50 p-4 border border-gray-200 rounded hover:border-[#E95420]/30 transition-colors">
                    <h3 className="font-bold text-lg text-gray-900">MySLT Dashboard Monitoring App</h3>
                    <p className="text-xs text-[#E95420] font-mono mb-2 bg-[#E95420]/10 inline-block px-2 py-1 rounded mt-1">Sri Lanka Telecom • Infrastructure • Monitoring</p>
                    <p className="text-gray-700 text-sm mb-0">Engineered a dedicated monitoring service tailored to track operations and visualize core infrastructure health/analytics for the internal MySLT dashboard environment.</p>
                  </div>
                </div>
              )}

              {projectTab === 'fullstack' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="bg-gray-50 p-4 border border-gray-200 rounded hover:border-[#E95420]/30 transition-colors">
                    <h3 className="font-bold text-lg text-gray-900">Salon Management SaaS Platform</h3>
                    <p className="text-xs text-[#E95420] font-mono mb-2 bg-[#E95420]/10 inline-block px-2 py-1 rounded mt-1">Node.js • Supabase • React.js</p>
                    <p className="text-gray-700 text-sm mb-3">Complete multi-tenant platform connecting individual salons & customers seamlessly with secure OAuth authentication and scheduling.</p>
                    <a href="https://github.com/Vivora-Solutions" target="_blank" className="text-blue-600 text-sm hover:underline font-medium">View Source →</a>
                  </div>
                  <div className="bg-gray-50 p-4 border border-gray-200 rounded hover:border-[#E95420]/30 transition-colors">
                    <h3 className="font-bold text-lg text-gray-900">Healthcare Management Microservices</h3>
                    <p className="text-xs text-[#E95420] font-mono mb-2 bg-[#E95420]/10 inline-block px-2 py-1 rounded mt-1">Spring Boot • Angular • Hyperledger Fabric</p>
                    <p className="text-gray-700 text-sm mb-3">Decentralized health records platform utilizing structural blockchain integrity paired with AI diagnosis models and WebRTC live streaming.</p>
                    <a href="https://github.com/DaminduDeSilva/Healthcare-Appointment-and-Management-System.git" target="_blank" className="text-blue-600 text-sm hover:underline font-medium">View Source →</a>
                  </div>
                  <div className="bg-gray-50 p-4 border border-gray-200 rounded hover:border-[#E95420]/30 transition-colors">
                    <h3 className="font-bold text-lg text-gray-900">Supply Chain Management Platform</h3>
                    <p className="text-xs text-[#E95420] font-mono mb-2 bg-[#E95420]/10 inline-block px-2 py-1 rounded mt-1">React.js • Node.js • MySQL</p>
                    <p className="text-gray-700 text-sm mb-3">End-to-end global logistics dashboard capable of orchestrating complex railway and trucking transit operations simultaneously from one hub.</p>
                    <a href="https://github.com/DaminduDeSilva/Supply-Chain-Management-System" target="_blank" className="text-blue-600 text-sm hover:underline font-medium">View Source →</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 6: // ACHIEVEMENTS
        return (
          <div className="text-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-[#E95420]">Awards & Achievements</h2>
            <div className="bg-gray-50 p-4 border border-gray-200 rounded space-y-3 shadow-inner">
              
              <div className="flex items-start">
                <FiCheckCircle className="text-[#E95420] mt-1 shrink-0 mr-3" />
                <p className="text-gray-800"><b>Cybershield 4.0 Finalist</b> – 2025, organized by IEEE Computer Society of SLIIT in collaboration with Hashx</p>
              </div>
              <div className="flex items-start">
                <FiCheckCircle className="text-[#E95420] mt-1 shrink-0 mr-3" />
                <p className="text-gray-800"><b>CryptX Finalist</b> – 2025, organized by Faculty of Technology, University of Sri Jayewardenepura</p>
              </div>
              <div className="flex items-start">
                <FiCheckCircle className="text-[#E95420] mt-1 shrink-0 mr-3" />
                <p className="text-gray-800"><b>DEV{'{'}thon{'}'} 3.0 2nd Runners Up</b> – 2026, organized by Rotaract Club of University of Moratuwa</p>
              </div>
              <div className="flex items-start">
                <FiCheckCircle className="text-[#E95420] mt-1 shrink-0 mr-3" />
                <p className="text-gray-800"><b>GENZIPHER Hackathon 1st Runner Up</b> – 2026, organized by CSSL GENZ Chapter of UCSC</p>
              </div>
              <div className="flex items-start">
                <FiCheckCircle className="text-[#E95420] mt-1 shrink-0 mr-3" />
                <p className="text-gray-800"><b>Capture The Flag (CTF) Competition 1st Runner Up</b> – 2025, organized by CICRA Holdings / Daily FT</p>
              </div>
              <div className="flex items-start">
                <FiCheckCircle className="text-[#E95420] mt-1 shrink-0 mr-3" />
                <p className="text-gray-800"><b>Cypher 3.0 - Inside a Hacker's Mind</b> – 2025, organized by IEEE Student Branch of KDU</p>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-300">
                <h3 className="font-bold text-lg mb-2 text-gray-800">Certifications</h3>
                <p className="text-gray-700 text-sm flex items-center"><span className="text-[#E95420] font-bold mr-2">•</span>Linux Command Line: From Zero to Hero (Udemy)</p>
                <p className="text-gray-700 text-sm flex items-center mt-1"><span className="text-[#E95420] font-bold mr-2">•</span>Metasploit from Scratch: Beginner to Professional (Udemy)</p>
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
              <button onClick={handleBack} className="px-4 py-2 bg-gray-400">
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
