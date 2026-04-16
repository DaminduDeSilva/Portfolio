import re

# Update FileExplorerApp.tsx VFS
with open("src/components/apps/FileExplorerApp.tsx", "r") as f:
    text = f.read()

text = text.replace(
    'name: "Cybershield_4.0_Finalist.png", path: "/Desktop/Achievements", content: "### Cybershield 4.0 Finalist\\n\\nOrganized by SLIIT\\nYear: 2025", link: "/certificates/cybershield.png"',
    'name: "Cybershield_4.0_Finalist.png", path: "/Desktop/Achievements", content: "### Cybershield 4.0 Finalist\\n\\nOrganized by IEEE Computer Society of SLIIT in collaboration with Hashx\\nYear: 2025", link: "/certificates/cybershield.png"'
)

text = text.replace(
    'name: "CryptX_Finalist.jpg", path: "/Desktop/Achievements", content: "### CryptX Finalist\\n\\nOrganized by University of Sri Jayawardhanapura\\nYear: 2025", link: "/certificates/cypher.jpg"',
    'name: "CryptX_Finalist.png", path: "/Desktop/Achievements", content: "### CryptX Finalist\\n\\nOrganized by Faculty of Technology, University of Sri Jayewardenepura\\nYear: 2025", link: "/certificates/cryptx.png", size: "701 KB"'
)

text = text.replace(
    '/certificates/cypher.jpg", size: "326 KB"',
    '/certificates/cryptx.png", size: "701 KB"' # Just in case it mismatches
)

text = text.replace(
    'name: "Devthon_3.0_Runner_Up.jpg", path: "/Desktop/Achievements", content: "### Devthon 3.0 2nd Runners Up\\n\\nOrganized by University of Moratuwa\\nYear: 2026", link: "/certificates/devthon.jpg"',
    'name: "Devthon_3.0_Runner_Up.jpg", path: "/Desktop/Achievements", content: "### DEV{thon} 3.0 2nd Runners Up\\n\\nOrganized by Rotaract Club of University of Moratuwa\\nYear: 2026", link: "/certificates/devthon.jpg"'
)

text = text.replace(
    'name: "Gencipher_Runner_Up.jpg", path: "/Desktop/Achievements", content: "### Gencipher 1st Runner Up\\n\\nOrganized by UCSC\\nYear: 2026", link: "/certificates/genzipher.jpg"',
    'name: "Gencipher_Runner_Up.jpg", path: "/Desktop/Achievements", content: "### GENZIPHER Hackathon 1st Runner Up\\n\\nOrganized by CSSL GENZ Chapter of UCSC\\nYear: 2026", link: "/certificates/genzipher.jpg"'
)

text = text.replace(
    'name: "CircraCTF_Runner_Up.jpg", path: "/Desktop/Achievements", content: "### CircraCTF 1st Runner Up\\n\\nOrganized by Cicra Campus\\nYear: 2025", link: "/certificates/cicra.jpg"',
    'name: "CicraCTF_Runner_Up.jpg", path: "/Desktop/Achievements", content: "### Capture The Flag (CTF) Competition 1st Runner Up\\n\\nOrganized by CICRA Holdings / Daily FT\\nYear: 2025", link: "/certificates/cicra.jpg"'
)

if 'name: "Cypher_3.0.jpg"' not in text:
    old_cryptx = '{ type: "file", name: "CryptX_Finalist.png", path: "/Desktop/Achievements", content: "### CryptX Finalist\\n\\nOrganized by Faculty of Technology, University of Sri Jayewardenepura\\nYear: 2025", link: "/certificates/cryptx.png", size: "701 KB", date: "2025" },'
    new_cypher = '{ type: "file", name: "Cypher_3.0.jpg", path: "/Desktop/Achievements", content: "### Cypher 3.0 - Inside a Hacker\'s Mind\\n\\nOrganized by IEEE Student Branch of KDU\\nYear: 2025", link: "/certificates/cypher.jpg", size: "326 KB", date: "2025" },'
    text = text.replace(old_cryptx, old_cryptx + '\n    ' + new_cypher)

with open("src/components/apps/FileExplorerApp.tsx", "w") as f:
    f.write(text)
