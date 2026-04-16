"use client";
import React, { useState, useEffect } from "react";
import Window from "../desktop/Window";
import { useWindowContext } from "@/contexts/WindowContext";
import Image from "next/image";
import { FiRotateCw, FiZoomIn, FiZoomOut } from "react-icons/fi";

export default function ImageViewerApp() {
  const { windows } = useWindowContext();
  const params = windows.imageviewer?.params;
  const link = params?.link;
  const name = params?.name || "Image Viewer";
  
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);

  // Reset state when new image opens
  useEffect(() => {
    setRotation(0);
    setScale(1);
  }, [link]);

  if (!windows.imageviewer?.isOpen) return null;

  return (
    <Window id="imageviewer" defaultSize={{ width: 800, height: 600 }}>
      <div className="h-full w-full bg-[#1e1e1e] flex flex-col text-gray-200">
        {/* Toolbar */}
        <div className="h-12 border-b border-gray-700 flex items-center justify-between px-4 bg-[#323639] z-10 shrink-0">
          <div className="text-sm font-medium truncate">{name}</div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setScale(prev => Math.max(0.1, prev - 0.25))}
              className="p-1.5 hover:bg-gray-600 rounded mb-1"
              title="Zoom Out"
            >
              <FiZoomOut size={16} />
            </button>
            <span className="text-xs w-10 text-center">{Math.round(scale * 100)}%</span>
            <button 
              onClick={() => setScale(prev => prev + 0.25)}
              className="p-1.5 hover:bg-gray-600 rounded mb-1"
              title="Zoom In"
            >
              <FiZoomIn size={16} />
            </button>
            <div className="w-px h-6 bg-gray-600 mx-1"></div>
            <button 
              onClick={() => setRotation(prev => (prev + 90) % 360)}
              className="flex items-center space-x-1.5 bg-[#E95420] hover:bg-[#E95420]/80 text-white px-3 py-1 rounded text-xs transition-colors shadow"
              title="Rotate Image"
            >
              <FiRotateCw size={14} />
              <span>Rotate</span>
            </button>
            <a
              href={link}
              download={name}
              className="flex items-center space-x-1.5 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition-colors shadow"
            >
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="14" width="14" xmlns="http://www.w3.org/2000/svg"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>Download</span>
            </a>
          </div>
        </div>
        
        {/* Image Container */}
        <div className="flex-1 w-full overflow-auto flex items-center justify-center relative p-8">
          {link ? (
            <div 
              style={{
                transform: `rotate(${rotation}deg) scale(${scale})`,
                transition: "transform 0.2s ease-in-out",
                display: "inline-block",
                transformOrigin: "center center"
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={link} 
                alt={name} 
                className="max-h-full max-w-full object-contain pointer-events-none shadow-2xl"
                style={{ maxHeight: "75vh" }}
              />
            </div>
          ) : (
            <div className="text-gray-500">No image specified.</div>
          )}
        </div>
      </div>
    </Window>
  );
}
