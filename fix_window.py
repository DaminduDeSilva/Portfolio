import re

with open("src/components/desktop/Window.tsx", "r") as f:
    content = f.read()

# 1. Add sizeRef
content = content.replace(
    'const [initPos, setInitPos] = useState({ x: 100, y: 100 });',
    'const [initPos, setInitPos] = useState({ x: 100, y: 100 });\n  const sizeRef = useRef<{ width: string; height: string } | null>(null);'
)

# 2. Add the toggle logic before the if (!isOpen)
insert_str = """
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
        windowRef.current.style.width = `${defaultSize.width}px`;
        windowRef.current.style.height = `${defaultSize.height}px`;
      }
    }
  }, [isMaximized, defaultSize]);

  const toggleMaximize = () => {
    if (!isMaximized && windowRef.current) {
      sizeRef.current = {
        width: windowRef.current.style.width || `${defaultSize.width}px`,
        height: windowRef.current.style.height || `${defaultSize.height}px`,
      };
    }
    setIsMaximized(!isMaximized);
  };
"""
content = re.sub(r'(if \(!windowData\.isOpen \|\| !mounted\) return null;)', insert_str + r'\n  \1', content)

# 3. Remove inline width/height correctly to let browser free resize
content = re.sub(r'\n\s*width: isMaximized \? "100%" : defaultSize\.width,', '', content)
content = re.sub(r'\n\s*height: isMaximized \? "100%" : defaultSize\.height,', '', content)

# 4. Replace setIsMaximized calls
content = content.replace('setIsMaximized(!isMaximized)', 'toggleMaximize()')

with open("src/components/desktop/Window.tsx", "w") as f:
    f.write(content)
