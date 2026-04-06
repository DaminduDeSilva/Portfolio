"use client";

import React, { useState, useRef, useEffect } from "react";
import Window from "../desktop/Window";

interface OutputLine {
  id: number;
  text: React.ReactNode;
}

export default function TerminalApp() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<OutputLine[]>([
    { id: 1, text: "Ubuntu 24.04 LTS (GNU/Linux 6.8.0-31-generic x86_64)" },
    { id: 2, text: " * Documentation:  https://help.ubuntu.com" },
    { id: 3, text: " * Management:     https://landscape.canonical.com" },
    { id: 4, text: " * Support:        https://ubuntu.com/pro" },
    { id: 5, text: "" },
    { id: 6, text: "Type 'help' to see available commands." },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  const Prompt = () => (
    <span className="select-none font-bold">
      <span className="text-[#8ae234]">damindu@portfolio</span>
      <span className="text-white">:</span>
      <span className="text-[#729fcf]">~</span>
      <span className="text-white">$ </span>
    </span>
  );

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = input.trim().toLowerCase();

      // Echo command
      const newOutput: OutputLine[] = [
        ...output,
        {
          id: Date.now(),
          text: (
            <span>
              <Prompt />
              {input}
            </span>
          ),
        },
      ];

      // Parse command
      switch (command) {
        case "help":
          newOutput.push(
            { id: Date.now() + 1, text: "Available commands:" },
            { id: Date.now() + 2, text: "  about      Display short bio" },
            { id: Date.now() + 3, text: "  projects   List portfolio projects" },
            { id: Date.now() + 4, text: "  skills     List technical skills" },
            { id: Date.now() + 5, text: "  contact    Show contact information" },
            { id: Date.now() + 6, text: "  ls         List directory contents" },
            { id: Date.now() + 7, text: "  clear      Clear terminal output" },
          );
          break;
        case "about":
          newOutput.push(
            {
              id: Date.now() + 1,
              text: "Hi, I'm Damindu De Silva! A Computer Science & Engineering undergraduate at the University of Moratuwa.",
            },
            {
              id: Date.now() + 2,
              text: "I have a strong interest in cybersecurity and full-stack web development.",
            },
          );
          break;
        case "projects":
          newOutput.push(
            { id: Date.now() + 1, text: <span className="text-[#729fcf] font-bold">projects/</span> },
            { id: Date.now() + 2, text: "  ├── CTF Competitions (Cybershield 4.0, CryptX)" },
            { id: Date.now() + 3, text: "  ├── CSE 40 Cyber Rush Dev Team" },
            { id: Date.now() + 4, text: "  └── IESL Robogames 2024" },
          );
          break;
        case "skills":
          newOutput.push(
            { id: Date.now() + 1, text: "Languages   : Java, Python, JavaScript" },
            { id: Date.now() + 2, text: "Frameworks  : Node.js, React" },
            { id: Date.now() + 3, text: "Databases   : MySQL" },
          );
          break;
        case "contact":
          newOutput.push(
            { id: Date.now() + 1, text: "Email    : desilva.wdt@gmail.com" },
            { id: Date.now() + 2, text: "GitHub   : github.com/DaminduDeSilva" },
          );
          break;
        case "ls":
          newOutput.push({
            id: Date.now() + 1,
            text: (
              <div className="flex gap-4 font-bold">
                <span className="text-[#729fcf]">Projects</span>
                <span className="text-white">Resume.pdf</span>
                <span className="text-white">about.txt</span>
              </div>
            ),
          });
          break;
        case "clear":
          setOutput([]);
          setInput("");
          return;
        case "":
          break;
        default:
          if (command.startsWith("cat ")) {
            const file = command.split(" ")[1];
            if (file === "about.txt") {
              newOutput.push({
                id: Date.now() + 1,
                text: "Hi, I'm Damindu! A passionate developer...",
              });
            } else {
              newOutput.push({
                id: Date.now() + 1,
                text: `cat: ${file}: No such file or directory`,
              });
            }
          } else if (command.startsWith("cd ")) {
            const dir = command.split(" ")[1];
            if (dir === "projects") {
              newOutput.push({
                id: Date.now() + 1,
                text: "bash: cd: projects: Permission denied in demo mode",
              });
            } else {
              newOutput.push({
                id: Date.now() + 1,
                text: `bash: cd: ${dir}: No such file or directory`,
              });
            }
          } else {
            newOutput.push({
              id: Date.now() + 1,
              text: `${command}: command not found`,
            });
          }
      }

      setOutput(newOutput);
      setInput("");
    }
  };

  return (
    <Window id="terminal" defaultSize={{ width: 950, height: 650 }}>
      {/* Ubuntu Terminal Theme Options:
          Background: `#300a24`
          Text: `#eeeeee`
      */}
      <div className="w-full h-full bg-[#300a24] text-[#eeeeee] font-mono text-sm flex flex-col">
        {/* No fake tab bar needed because we redesigned the window border, but let's keep a subtle transparent dark bar to look like gnome-terminal tabs if wanted, or just nothing. Let's make it look like a clean single terminal window without tabs to match simple ubuntu */}

        <div
          className="flex-1 p-4 overflow-auto cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {output.map((line) => (
            <div
              key={line.id}
              className="whitespace-pre-wrap leading-relaxed tracking-wide mb-0.5"
            >
              {line.text}
            </div>
          ))}
          <div className="flex items-center mt-1">
            <Prompt />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent outline-none border-none text-[#eeeeee] selection:bg-white/30 selection:text-white"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </Window>
  );
}
