import Desktop from "@/components/desktop/Desktop";
import { WindowProvider } from "@/contexts/WindowContext";
import { SystemProvider } from "@/contexts/SystemContext";

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden text-white font-sans selection:bg-blue-500 selection:text-white">
      <SystemProvider>
        <WindowProvider>
          <Desktop />
        </WindowProvider>
      </SystemProvider>
    </main>
  );
}
