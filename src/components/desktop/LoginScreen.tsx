"use client";

import React, { useState, useEffect } from "react";
import { useSystemContext } from "@/contexts/SystemContext";
import { format } from "date-fns";
import { FiUser, FiArrowRight } from "react-icons/fi";
import Image from "next/image";

export default function LoginScreen() {
  const { login, wallpaper } = useSystemContext();
  const [time, setTime] = useState(new Date());
  const [password, setPassword] = useState("");
  const [isWrong, setIsWrong] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (password.toLowerCase() === "guest" || password === "") {
      login();
    } else {
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 1000);
    }
  };

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden transition-all duration-1000 select-none"
      onClick={() => setShowLogin(true)}
    >
      {/* Background Image */}
      <Image
        src={wallpaper}
        alt="Login Wallpaper"
        fill
        className={`object-cover transition-all duration-700 ease-in-out ${showLogin ? "scale-105 blur-lg opacity-70" : "scale-100 blur-none opacity-100"}`}
        priority
      />

      {/* Heavy Blur Overlay when Login is active */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-700 ${showLogin ? "opacity-100" : "opacity-0"}`}
      />

      {/* Lock Screen Time/Date */}
      <div
        className={`absolute top-24 flex flex-col items-center transition-all duration-500 ease-in-out ${showLogin ? "-translate-y-10 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}
      >
        <h1 className="text-8xl font-light text-white mb-2 drop-shadow-md">
          {format(time, "HH:mm")}
        </h1>
        <h2 className="text-2xl text-white font-medium drop-shadow-md">
          {format(time, "EEEE, MMMM d")}
        </h2>
      </div>

      {/* Login Screen Form */}
      <div
        className={`relative z-10 flex flex-col items-center w-full max-w-sm transition-all duration-500 ease-in-out ${showLogin ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"}`}
      >
        <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-[#E95420] to-[#77216F] mb-6 flex items-center justify-center shadow-xl border-4 border-white/10">
          <FiUser size={64} className="text-white/80" />
        </div>

        <h3 className="text-3xl font-semibold text-white mb-8 drop-shadow-md tracking-wide">
          Damindu
        </h3>

        <form
          onSubmit={handleLogin}
          className="w-full relative flex items-center justify-center"
        >
          <input
            type="password"
            placeholder="PIN"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-64 bg-black/40 backdrop-blur-md text-white rounded-md px-4 py-2 pr-10 border focus:outline-none transition-all placeholder:text-white/50 text-center ${
              isWrong
                ? "border-red-500 bg-red-500/20"
                : "border-white/20 focus:border-[#E95420] focus:bg-black/60"
            }`}
            autoFocus={showLogin}
          />
          <button
            type="submit"
            className="absolute right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
          >
            <FiArrowRight />
          </button>
        </form>
        <p
          className="text-white/60 text-sm text-center mt-6 tracking-wide hover:text-white/90 transition-colors cursor-pointer"
          onClick={() => login()}
        >
          Log in as Guest
        </p>
      </div>

      {/* Click anywhere hint */}
      {!showLogin && (
        <div className="absolute bottom-16 text-white/60 text-sm animate-pulse flex flex-col items-center">
          <span>Click anywhere to unlock</span>
        </div>
      )}

      {/* Network/Battery icons bottom right */}
      <div className="absolute bottom-4 right-6 flex items-center space-x-4 text-white/80">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
          <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
          <line x1="12" y1="20" x2="12.01" y2="20"></line>
        </svg>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect>
          <line x1="23" y1="13" x2="23" y2="11"></line>
        </svg>
      </div>
    </div>
  );
}
