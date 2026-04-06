"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useWindowContext } from "@/contexts/WindowContext";
import { BsFiletypePdf } from "react-icons/bs";
import { FiPackage, FiFolder } from "react-icons/fi";
import { FcFolder } from "react-icons/fc";

export default function DesktopIcons() {
  const { openWindow } = useWindowContext();
  const constraintsRef = useRef(null);

  const icons = [
    {
      id: "resume",
      label: "Resume.pdf",
      icon: <BsFiletypePdf size={34} className="text-red-400" />,
      x: 20,
      y: 20,
    },
    {
      id: "about_me",
      label: "About_me.deb",
      icon: <FiPackage size={34} className="text-[#E95420]" />,
      x: 20,
      y: 120,
    },
    {
      id: "projects",
      label: "Projects",
      icon: <FcFolder size={38} className="drop-shadow-sm" />,
      x: 20,
      y: 220,
    },
  ];

  return (
    <div ref={constraintsRef} className="absolute inset-0 z-0 p-4">
      {icons.map((icon) => (
        <motion.div
          key={icon.id}
          drag
          dragConstraints={constraintsRef}
          dragMomentum={false}
          style={{ top: icon.y, left: icon.x }}
          className="absolute flex flex-col items-center justify-center w-24 h-24 rounded-lg hover:bg-white/10 cursor-pointer transition-colors active:cursor-grabbing group select-none"
          onDoubleClick={() => {
            if (icon.id === "about_me") openWindow("about");
            if (icon.id === "resume") openWindow("resume");
            if (icon.id === "projects") openWindow("projects");
          }}
        >
          <div className="text-white drop-shadow-md group-hover:scale-105 transition-transform">
            {icon.icon}
          </div>
          <span className="mt-1 text-xs text-white drop-shadow-md text-center max-w-[86px] leading-tight font-medium px-1 rounded bg-black/20">
            {icon.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
