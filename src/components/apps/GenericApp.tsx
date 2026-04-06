"use client";
import React from "react";
import Window from "../desktop/Window";
import { AppId } from "@/contexts/WindowContext";

interface GenericAppProps {
  id: AppId;
  content: string;
}

export default function GenericApp({ id, content }: GenericAppProps) {
  return (
    <Window id={id} defaultSize={{ width: 800, height: 600 }}>
      <div className="p-8 text-white h-full flex flex-col items-center justify-center text-center">
        <div>
          <h2 className="text-4xl font-bold mb-6 capitalize text-blue-500 drop-shadow-md">{id}</h2>
          <p className="text-xl text-gray-200 p-4 bg-black/20 rounded-xl backdrop-blur-sm shadow-inner">{content}</p>
        </div>
      </div>
    </Window>
  );
}
