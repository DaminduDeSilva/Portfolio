"use client";

import React from "react";
import Window from "../desktop/Window";
import { FiMail, FiGithub, FiLinkedin, FiMapPin } from "react-icons/fi";

export default function ContactApp() {
  return (
    <Window id="contact" defaultSize={{ width: 900, height: 650 }}>
      {/* Clean UI Container */}
      <div className="bg-[#1e1e1e] h-full w-full flex flex-col items-center justify-center p-8 text-white relative overflow-hidden">
        
        {/* Soft Background glow representing Windows styling */}
        <div className="absolute top-[-50%] right-[-20%] w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-30%] left-[-10%] w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px] pointer-events-none" />

        <h1 className="text-4xl font-bold mb-2 z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Get in Touch</h1>
        <p className="text-gray-400 mb-8 z-10 text-center max-w-sm">
          Feel free to reach out for collaborations, opportunities, or just a quick hello.
        </p>

        <div className="z-10 grid gap-4 w-full max-w-md">
          {/* Email */}
          <a
            href="mailto:desilva.wdt@gmail.com"
            className="flex items-center p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group shrink-0"
          >
            <div className="w-12 h-12 bg-blue-500/20 text-blue-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
              <FiMail size={24} />
            </div>
            <div>
              <p className="font-semibold text-lg">Email</p>
              <p className="text-blue-400 group-hover:text-blue-300 transition-colors">desilva.wdt@gmail.com</p>
            </div>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/DaminduDeSilva"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group shrink-0"
          >
            <div className="w-12 h-12 bg-blue-500/20 text-blue-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
              <FiGithub size={24} />
            </div>
            <div>
              <p className="font-semibold text-lg">GitHub</p>
              <p className="text-gray-400 group-hover:text-white transition-colors">github.com/DaminduDeSilva</p>
            </div>
          </a>

          {/* LinkedIn (Placeholder) */}
          <a
            href="https://linkedin.com/in/damindu-de-silva"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group shrink-0"
          >
            <div className="w-12 h-12 bg-blue-500/20 text-blue-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
              <FiLinkedin size={24} />
            </div>
            <div>
              <p className="font-semibold text-lg">LinkedIn</p>
              <p className="text-blue-400 group-hover:text-blue-300 transition-colors">Connect with me</p>
            </div>
          </a>
        </div>

        {/* Small location bit */}
        <div className="mt-8 flex items-center text-gray-500 z-10 text-sm">
          <FiMapPin className="mr-2" /> Local-host // Earth
        </div>
      </div>
    </Window>
  );
}
