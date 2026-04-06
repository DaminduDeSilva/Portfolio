"use client";
import React from "react";
import Window from "../desktop/Window";

export default function ResumeApp() {
  return (
    <Window id="resume" defaultSize={{ width: 850, height: 900 }}>
      {/* Resume Viewer Container */}
      <div className="h-full w-full bg-[#323639] flex flex-col text-gray-200">
        {/* PDF viewer header */}
        <div className="h-12 border-b border-gray-700 flex items-center justify-between px-4 sticky top-0 bg-[#323639] z-10 shrink-0">
          <div className="text-sm font-medium">Damindu_De_Silva_CV.pdf</div>
          <a
            href="/resume.pdf"
            download="Damindu_De_Silva_CV.pdf"
            className="flex items-center space-x-2 bg-[#E95420] hover:bg-[#E95420]/80 text-white px-4 py-1.5 rounded text-sm transition-colors shadow"
          >
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="15" width="15" xmlns="http://www.w3.org/2000/svg"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <span>Download</span>
          </a>
        </div>
        {/* PDF Frame */}
        <div className="flex-1 w-full relative overflow-hidden bg-[#525659]">
          <object
            data="/resume.pdf#view=FitH"
            type="application/pdf"
            className="absolute inset-0 w-full h-full"
          >
            <div className="flex flex-col items-center justify-center p-8 h-full bg-[#323639] text-center">
              <p className="mb-4">It appears your browser doesn\'t support embedded PDFs.</p>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E95420] hover:bg-[#E95420]/80 text-white px-6 py-2 rounded transition-colors shadow"
              >
                Click here to view it directly
              </a>
            </div>
          </object>
        </div>
      </div>
    </Window>
  );
}
