const fs = require('node:fs/promises');
const path = require('node:path');

// Iconify SVG Logos / VS Code Icons / Simple Icons and official-site favicons.
const tools = [
  ['Figma', 'figma', 'logos/figma'],
  ['Adobe Photoshop', 'photoshop', 'logos/adobe-photoshop'],
  ['Adobe Illustrator', 'illustrator', 'logos/adobe-illustrator'],
  ['Adobe XD', 'xd', 'logos/adobe-xd'],
  ['Adobe Acrobat', 'acrobat', 'simple-icons/adobeacrobatreader', 'FF453A'],
  ['Adobe Premiere Pro', 'premiere', 'logos/adobe-premiere'],
  ['Adobe After Effects', 'after-effects', 'logos/adobe-after-effects'],
  ['Adobe Audition', 'audition', 'simple-icons/adobeaudition', '54DFCD'],
  ['Clipchamp', 'clipchamp', null, 'clipchamp.com'],
  ['VideoScribe', 'videoscribe', null, 'videoscribe.co'],
  ['Articulate Rise 360', 'rise', null, 'articulate.com'],
  ['Microsoft PowerPoint', 'powerpoint', 'vscode-icons/file-type-powerpoint'],
  ['Team Deck', 'teamdeck', null, 'teamdeck.io'],
  ['RD Station', 'rd-station', null, 'rdstation.com'],
  ['WordPress', 'wordpress', 'logos/wordpress-icon'],
  ['GitHub', 'github', 'logos/github-icon'],
  ['ChatGPT', 'chatgpt', 'logos/openai-icon'],
  ['Claude', 'claude', 'logos/claude-icon'],
  ['Grok', 'grok', 'logos/grok-icon'],
  ['Midjourney', 'midjourney', 'logos/midjourney'],
  ['Adobe Firefly', 'firefly', null, 'firefly.adobe.com'],
  ['Leonardo.ai', 'leonardo', null, 'leonardo.ai'],
  ['Google VEO', 'veo', null, 'labs.google'],
  ['Nano Banana', 'nano-banana', 'logos/google-gemini-icon'],
  ['Notion', 'notion', 'logos/notion-icon'],
  ['Monday', 'monday', 'logos/monday-icon'],
  ['ClickUp', 'clickup', 'logos/clickup-icon'],
  ['Trello', 'trello', 'logos/trello'],
  ['Microsoft Planner', 'planner', null, 'planner.cloud.microsoft'],
  ['Miro', 'miro', 'logos/miro-icon'],
  ['Whimsical', 'whimsical', null, 'whimsical.com'],
  ['Microsoft Teams', 'teams', 'logos/microsoft-teams'],
  ['Microsoft Excel', 'excel', 'vscode-icons/file-type-excel'],
  ['Word', 'word', 'vscode-icons/file-type-word'],
  ['Outlook', 'outlook', 'vscode-icons/file-type-outlook'],
  ['OneDrive', 'onedrive', 'logos/microsoft-onedrive'],
  ['Google Drive', 'google-drive', 'logos/google-drive'],
  ['Oracle', 'oracle', null, 'oracle.com'],
];

async function main() {
  const directory = path.join(__dirname, 'public/assets/tools');
  await fs.mkdir(directory, { recursive: true });
  const manifest = [];
  for (let offset = 0; offset < tools.length; offset += 6) {
    const batch = await Promise.all(tools.slice(offset, offset + 6).map(async ([name, id, icon, extra]) => {
      const source = icon
        ? `https://api.iconify.design/${icon}.svg${extra ? '?color=%23' + extra : ''}`
        : `https://www.google.com/s2/favicons?domain=${extra}&sz=64`;
      const response = await fetch(source, { signal: AbortSignal.timeout(20000) });
      if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      const extension = icon ? 'svg' : 'png';
      if (icon && !bytes.toString().includes('<svg')) throw new Error(`${name}: invalid SVG`);
      if (!icon && bytes.readUInt32BE(0) !== 0x89504e47) throw new Error(`${name}: invalid PNG`);
      const file = `${id}.${extension}`;
      await fs.writeFile(path.join(directory, file), bytes);
      console.log(`${name}: ${bytes.length} bytes`);
      return { name, id, file, source };
    }));
    manifest.push(...batch);
  }
  await fs.writeFile(path.join(directory, 'sources.json'), JSON.stringify(manifest, null, 2) + '\n');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
