"use client";
import React from "react";
import Window from "../desktop/Window";
import { useWindowContext } from "@/contexts/WindowContext";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MarkdownViewerApp() {
  const { windows } = useWindowContext();
  const params = windows.markdownviewer?.params;
  const content = params?.content;
  const name = params?.name || "Document Preview";
  
  if (!windows.markdownviewer?.isOpen) return null;

  return (
    <Window id="markdownviewer" defaultSize={{ width: 800, height: 600 }}>
      <div className="h-full w-full bg-[#1e1e1e] flex flex-col text-gray-200">
        {/* Toolbar */}
        <div className="h-12 border-b border-gray-700 flex items-center justify-between px-4 bg-[#323639] z-10 shrink-0">
          <div className="text-sm font-medium text-gray-200 truncate">{name}</div>
        </div>
        
        {/* Document Container */}
        <div className="flex-1 w-full overflow-auto p-8 
          [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-6 [&>h1]:text-[#E95420]
          [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-white
          [&>h3]:text-xl [&>h3]:font-medium [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-white
          [&>p]:mb-4 [&>p]:leading-relaxed [&>p]:text-gray-300
          [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-2 [&>ul>li]:text-gray-300
          [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:mb-2 [&>ol>li]:text-gray-300
          [&>a]:text-blue-400 [&>a]:underline [&>a:hover]:text-blue-300
          [&>pre]:bg-black/50 [&>pre]:p-4 [&>pre]:rounded-md [&>pre]:overflow-x-auto [&>pre]:mb-6
          [&>code]:bg-black/50 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-green-300
          [&>blockquote]:border-l-4 [&>blockquote]:border-[#E95420] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-400
        ">
          {content ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          ) : (
            <div className="text-gray-500 text-center mt-10">No content provided.</div>
          )}
        </div>
      </div>
    </Window>
  );
}
