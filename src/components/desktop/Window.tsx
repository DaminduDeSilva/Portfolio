"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useDragControls } from "framer-motion";
import { useWindowContext, AppId } from "@/contexts/WindowContext";
import { FiX, FiMinus, FiSquare } from "react-icons/fi";
import { clsx } from "clsx";

interface WindowProps {
  id: AppId;
  children: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  defaultMaximized?: boolean;
}

export default function Window({
  id,
  children,
  defaultPosition,
  defaultSize = { width: 700, height: 500 },
  defaultMaximized = false,
}: WindowProps) {
  const { windows, closeWindow, minimizeWindow, focusWindow } =
    useWindowContext();
  const windowData = windows[id];
  const windowRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  const [isMaximized, setIsMaximized] = useState(defaultMaximized);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const sizeRef = useRef<{ width: string; height: string } | null>(null);
  const [windowDimensions, setWindowDimensions] = useState({ width: 1000, height: 800 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getInitialPos = () => {
        if (defaultPosition) return defaultPosition;
        const x = Math.max(0, (window.innerWidth - defaultSize.width) / 2);
        const y = Math.max(0, (window.innerHeight - defaultSize.height) / 2);
        return { x, y };
      };

      if (!mounted) {
        setPosition(getInitialPos());
        setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
        if (window.innerWidth <= 768) setIsMaximized(true);
        setMounted(true);
      }

      const handleResize = () => {
        requestAnimationFrame(() => {
          const newWidth = window.innerWidth;
          const newHeight = window.innerHeight;
          setWindowDimensions({ width: newWidth, height: newHeight });

          // Auto-maximize on small screens
          if (newWidth <= 768 && !isMaximized) {
            setIsMaximized(true);
          }

          // Clamp position to new viewport
          setPosition((prev) => {
            if (!windowRef.current) return prev;
            const currentWidth = windowRef.current.offsetWidth || defaultSize.width;
            const currentHeight = windowRef.current.offsetHeight || defaultSize.height;

            return {
              x: Math.min(prev.x, Math.max(0, newWidth - currentWidth)),
              y: Math.min(prev.y, Math.max(0, newHeight - currentHeight)),
            };
          });
        });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [defaultPosition, defaultSize, mounted, isMaximized]);

  useEffect(() => {
    if (!windowRef.current) return;
    if (isMaximized) {
      windowRef.current.style.width = "100%";
      windowRef.current.style.height = "100%";
    } else {
      if (sizeRef.current) {
        windowRef.current.style.width = sizeRef.current.width;
        windowRef.current.style.height = sizeRef.current.height;
      } else {
        // Use min to prevent exceeding viewport
        windowRef.current.style.width = `min(${defaultSize.width}px, 100vw)`;
        windowRef.current.style.height = `min(${defaultSize.height}px, 100vh)`;
      }
    }
  }, [isMaximized, windowData.isOpen, mounted, defaultSize]);

  const toggleMaximize = () => {
    if (!isMaximized && windowRef.current) {
      sizeRef.current = {
        width: windowRef.current.style.width || `${defaultSize.width}px`,
        height: windowRef.current.style.height || `${defaultSize.height}px`,
      };
    }
    setIsMaximized(!isMaximized);
  };

  const startResize = (e: React.PointerEvent) => {
    if (isMaximized || !windowRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    // Bring window to front
    focusWindow(id);

    const startWidth = windowRef.current.offsetWidth;
    const startHeight = windowRef.current.offsetHeight;
    const startX = e.clientX;
    const startY = e.clientY;

    const onPointerMove = (moveEvent: PointerEvent) => {
      if (!windowRef.current) return;
      const newWidth = Math.max(300, startWidth + (moveEvent.clientX - startX));
      const newHeight = Math.max(
        200,
        startHeight + (moveEvent.clientY - startY),
      );
      windowRef.current.style.width = `${newWidth}px`;
      windowRef.current.style.height = `${newHeight}px`;
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      if (windowRef.current) {
        sizeRef.current = {
          width: windowRef.current.style.width,
          height: windowRef.current.style.height,
        };
      }
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  if (!windowData.isOpen || !mounted) return null;

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.95, x: 0, y: 0 }}
      animate={{
        opacity: windowData.isMinimized ? 0 : 1,
        scale: windowData.isMinimized ? 0.95 : 1,
        pointerEvents: windowData.isMinimized ? "none" : "auto",
        x: isMaximized ? 0 : undefined,
        y: isMaximized ? 0 : undefined,
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      drag={!isMaximized}
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      dragConstraints={{
        left: 0,
        top: 0,
        right: windowDimensions.width - (windowRef.current?.offsetWidth || defaultSize.width),
        bottom: windowDimensions.height - (windowRef.current?.offsetHeight || defaultSize.height),
      }}
      onPointerDown={() => focusWindow(id)}
      onDragEnd={(_, info) => {
        setPosition({
          x: position.x + info.offset.x,
          y: position.y + info.offset.y,
        });
      }}
      style={{
        position: "absolute",
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        maxWidth: "100vw",
        maxHeight: "100vh",
        zIndex: windowData.zIndex,
      }}
      className={clsx(
        "shadow-2xl flex flex-col bg-[#2c001e]/90 border border-[#E95420]/25 overflow-hidden",
        "backdrop-blur-xl min-w-[300px] min-h-[200px]",
        isMaximized ? "rounded-none" : "rounded-xl",
      )}
    >
      {/* Title Bar - Drag Handle */}
      <div
        className="relative h-10 w-full flex items-center justify-end px-3 cursor-grab active:cursor-grabbing select-none text-white shrink-0 border-b border-[#E95420]/20 bg-[#3a0f2c]/80"
        onPointerDown={(e) => {
          focusWindow(id);
          dragControls.start(e);
        }}
        onDoubleClick={() => toggleMaximize()}
      >
        <span className="text-sm font-medium tracking-wide text-gray-100 absolute left-1/2 -translate-x-1/2">
          {windowData.title}
        </span>

        <div className="flex items-center gap-3 z-10">
          <button
            onClick={(e) => {
              minimizeWindow(id);
            }}
            className="w-5 h-5 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-all"
            title="Minimize"
          >
            <FiMinus size={12} className="text-white" />
          </button>
          <button
            onClick={(e) => {
              toggleMaximize();
            }}
            className="w-5 h-5 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-all"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? (
              <svg
                width="10"
                height="10"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-white"
              >
                <path d="M4 4h8v8H4z"></path>
              </svg>
            ) : (
              <FiSquare size={10} className="text-white" />
            )}
          </button>
          <button
            onClick={(e) => {
              closeWindow(id);
            }}
            className="w-5 h-5 rounded-full bg-[#E95420] hover:bg-red-500 shadow-md flex items-center justify-center transition-all"
            title="Close"
          >
            <FiX size={12} className="text-white" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div
        className="flex-1 overflow-auto relative bg-[#2c001e]/70"
        onPointerDown={(e) => {
          focusWindow(id);
        }}
      >
        {children}
      </div>

      {/* Custom Resize Handle */}
      {!isMaximized && (
        <div
          onPointerDown={startResize}
          className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize flex items-end justify-end p-1 z-50"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="21" y1="12" x2="12" y2="21"></line>
            <line x1="21" y1="5" x2="5" y2="21"></line>
            <line x1="21" y1="19" x2="19" y2="21"></line>
          </svg>
        </div>
      )}
    </motion.div>
  );
}
