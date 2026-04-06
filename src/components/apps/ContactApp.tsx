"use client";

import React from "react";
import Window from "../desktop/Window";
import { FiMail, FiGithub, FiLinkedin, FiMapPin } from "react-icons/fi";

export default function ContactApp() {
  return (
    <Window id="contact" defaultSize={{ width: 900, height: 650 }}>
      {/* Clean UI Container */}
      <div className="bg-white h-full w-full flex flex-col items-center justify-center p-8 text-gray-800 relative overflow-hidden">
        
        {/* Soft Background glow representing Ubuntu/light styling */}
        <div className="absolute top-[-50%] right-[-20%] w-96 h-96 bg-[#E95420]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-30%] left-[-10%] w-64 h-64 bg-[#77216F]/10 rounded-full blur-[80px] pointer-events-none" />

        <h1 className="text-4xl font-bold mb-2 z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#E95420] to-[#77216F]">Get in Touch</h1>
        <p className="text-gray-600 mb-8 z-10 text-center max-w-sm">
          Feel free to reach out for collaborations, opportunities, or just a quick hello.
        </p>

        <div className="z-10 grid gap-4 w-full max-w-md">
          {/* Email */}
          <a
            href="mailto:desilva.wdt@gmail.com"
            className="flex items-center p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#E95420]/50 hover:bg-[#fff3ef] transition-all group shrink-0 shadow-sm"
          >
            <div className="w-12 h-12 bg-[#E95420]/10 text-[#E95420] rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
              <FiMail size={24} />
            </div>
            <div>
              <p className="font-bold text-lg text-gray-900">Email</p>
              <p className="text-[#E95420] font-medium transition-colors">desilva.wdt@gmail.com</p>
            </div>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/DaminduDeSilva"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#E95420]/50 hover:bg-[#fff3ef] transition-all group shrink-0 shadow-sm"
          >
            <div className="w-12 h-12 bg-[#E95420]/10 text-[#E95420] rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
              <FiGithub size={24} />
            </div>
            <div>
              <p className="font-bold text-lg text-gray-900">GitHub</p>
              <p className="text-gray-600 group-hover:text-[#E95420] font-medium transition-colors">github.com/DaminduDeSilva</p>
            </div>
          </a>

          {/* LinkedIn (Placeholder) */}
          <a
            href="https://linkedin.com/in/damindu-de-silva"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#E95420]/50 hover:bg-[#fff3ef] transition-all group shrink-0 shadow-sm"
          >
            <div className="w-12 h-12 bg-[#E95420]/10 text-[#E95420] rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
              <FiLinkedin size={24} />
            </div>
            <div>
              <p className="font-bold text-lg text-gray-900">LinkedIn</p>
              <p className="text-[#E95420] font-medium transition-colors">Connect with me</p>
            </div>
          </a>
        </div>

        {/* Small location bit */}
        <div className="mt-8 flex items-center text-gray-500 z-10 text-sm font-medium">
          <FiMapPin className="mr-2" /> Colombo, Sri Lanka
        </div>
      </div>
    </Window>
  );
}
