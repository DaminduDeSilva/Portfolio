import re

with open('src/components/apps/AboutApp.tsx', 'r') as f:
    content = f.read()

# 1. Remove the manual return null if not open
content = re.sub(
    r'  // If the about window is closed, do not render anything\s*if \(!windows\["about"\]\?\.isOpen\) return null;',
    '',
    content
)

# 2. Replace the bottom return statement to wrap inside <Window>
# We find the `return (` at the end of the function.
old_return = """  return (
    <div className="w-full h-full bg-[#f0f0f0] p-4 font-ubuntu select-none rounded-xl border-4 border-[#300a24]/20 shadow-2xl overflow-hidden">
      <div className="flex h-full bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-300">
        
        {renderSidebar()}
        
        <div className="w-2/3 flex flex-col pt-10 pb-6 px-10 bg-gradient-to-b from-white to-[#eaebec]">"""

new_return = """  return (
    <Window id="about" defaultSize={{ width: 900, height: 600 }} defaultMaximized={false}>
      <div className="flex w-full h-full bg-white overflow-hidden text-gray-800">
        {renderSidebar()}
        <div className="flex-1 flex flex-col pt-8 pb-5 px-8 bg-gradient-to-b from-white to-[#eaebec]">"""

content = content.replace(old_return, new_return)

# 3. Replace the closing divs
old_ending = """      </div>
    </div>
  );
}"""

new_ending = """      </div>
    </Window>
  );
}"""

content = content.replace(old_ending, new_ending)

with open('src/components/apps/AboutApp.tsx', 'w') as f:
    f.write(content)

print("Rewritten successful!")
