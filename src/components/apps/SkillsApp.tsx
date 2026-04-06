"use client";

import React from "react";
import Window from "../desktop/Window";
import { FiCode, FiDatabase, FiLayers, FiCpu } from "react-icons/fi";

export default function SkillsApp() {
  return (
    <Window id="skills" defaultSize={{ width: 950, height: 700 }}>
      <div className="bg-[#f3f6fb] h-full w-full flex text-slate-800">
        <aside className="w-56 border-r border-[#d5ddeb] bg-[#eef2f9] p-4">
          <h2 className="text-sm uppercase tracking-wide text-slate-500 mb-3">
            Settings
          </h2>
          <div className="space-y-1 text-sm">
            <div className="px-3 py-2 rounded-lg bg-blue-500 text-white">
              Tech Stack
            </div>
            <div className="px-3 py-2 rounded-lg hover:bg-white cursor-pointer">
              Languages
            </div>
            <div className="px-3 py-2 rounded-lg hover:bg-white cursor-pointer">
              Frameworks
            </div>
            <div className="px-3 py-2 rounded-lg hover:bg-white cursor-pointer">
              Tools
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white border border-[#d7deea] rounded-xl p-5 shadow-sm mb-4">
            <h1 className="text-2xl font-semibold flex items-center">
              <FiCpu className="mr-2 text-blue-500" /> Tech Stack
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Core technologies used in projects and competitive engineering
              work.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-[#d7deea] rounded-xl p-5 shadow-sm">
              <h2 className="text-base font-semibold mb-3 flex items-center">
                <FiCode className="mr-2 text-blue-500" /> Languages
              </h2>
              <div className="flex flex-wrap gap-2">
                {["Java", "Python", "JavaScript", "TypeScript", "HTML/CSS"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-md bg-[#eef4ff] border border-[#d3e2ff] text-sm text-slate-700"
                    >
                      {tech}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="bg-white border border-[#d7deea] rounded-xl p-5 shadow-sm">
              <h2 className="text-base font-semibold mb-3 flex items-center">
                <FiLayers className="mr-2 text-blue-500" /> Frameworks
              </h2>
              <div className="flex flex-wrap gap-2">
                {["Node.js", "React", "Next.js", "TailwindCSS"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-md bg-[#eef4ff] border border-[#d3e2ff] text-sm text-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#d7deea] rounded-xl p-5 shadow-sm">
              <h2 className="text-base font-semibold mb-3 flex items-center">
                <FiDatabase className="mr-2 text-blue-500" /> Databases & Tools
              </h2>
              <div className="flex flex-wrap gap-2">
                {["MySQL", "Git", "Docker", "Linux"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-md bg-[#eef4ff] border border-[#d3e2ff] text-sm text-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </Window>
  );
}
