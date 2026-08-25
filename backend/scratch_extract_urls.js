import fs from 'fs';

const data = JSON.parse(fs.readFileSync('db_dump.json', 'utf8'));

console.log("Extracting all URLs and external links from database dump...");

function scan(obj, path = "") {
  if (typeof obj === 'string') {
    if (obj.includes('http://') || obj.includes('https://') || obj.includes('www.')) {
      console.log(`[${path}]: ${obj}`);
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item, index) => scan(item, `${path}[${index}]`));
  } else if (obj && typeof obj === 'object') {
    Object.keys(obj).forEach(key => scan(obj[key], `${path}.${key}`));
  }
}

scan(data);
