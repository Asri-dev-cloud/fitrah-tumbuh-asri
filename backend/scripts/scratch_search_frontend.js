/**
 * File: scripts/scratch_search_frontend.js
 * Deskripsi: Script penolong untuk mencari kata kunci (seperti video embed, youtube, dsb) di seluruh kode frontend.
 */

import fs from 'fs';
import path from 'path';

const searchDir = 'd:/fitrah tumbuh asri/frontend/src';
const keywords = ['youtube', 'youtu', 'iframe', 'video', 'embed', 'watch', 'v=', 'mv'];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk(searchDir);
files.forEach(file => {
  if (!file.endsWith('.jsx') && !file.endsWith('.js') && !file.endsWith('.html') && !file.endsWith('.css')) return;
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, index) => {
    const matched = keywords.filter(kw => line.toLowerCase().includes(kw));
    if (matched.length > 0) {
      // Exclude generic CSS or standard classes
      if (line.includes('className="') && !line.includes('video') && !line.includes('embed') && !line.includes('youtube')) {
        const cleanLine = line.replace(/className="[^"]*"/g, '');
        if (!keywords.some(kw => cleanLine.toLowerCase().includes(kw))) return;
      }
      console.log(`${path.basename(file)}:${index + 1}: ${line.trim()}`);
    }
  });
});
