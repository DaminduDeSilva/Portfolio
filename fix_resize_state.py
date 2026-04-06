with open("src/components/desktop/Window.tsx", "r") as f:
    content = f.read()

# Add updating sizeRef in the onPointerUp function
old_pointer_up = """    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };"""

new_pointer_up = """    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      if (windowRef.current) {
        sizeRef.current = {
          width: windowRef.current.style.width,
          height: windowRef.current.style.height,
        };
      }
    };"""

content = content.replace(old_pointer_up, new_pointer_up)

with open("src/components/desktop/Window.tsx", "w") as f:
    f.write(content)
