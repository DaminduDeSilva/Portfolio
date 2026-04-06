import re

with open("src/components/desktop/Window.tsx", "r") as f:
    content = f.read()

# Remove native resize: both
content = content.replace('resize: isMaximized ? "none" : "both",', '')

# Insert custom resize handler logic before the return
insert_logic = """
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
      const newHeight = Math.max(200, startHeight + (moveEvent.clientY - startY));
      windowRef.current.style.width = `${newWidth}px`;
      windowRef.current.style.height = `${newHeight}px`;
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };
"""
content = content.replace("if (!windowData.isOpen || !mounted) return null;", insert_logic + "\n  if (!windowData.isOpen || !mounted) return null;")

# Insert the custom resize handle element right before the closing </motion.div>
resize_handle = """
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
"""
content = content.replace("    </motion.div>", resize_handle)

with open("src/components/desktop/Window.tsx", "w") as f:
    f.write(content)
