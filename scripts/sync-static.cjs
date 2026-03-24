const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");

const entriesToCopy = [
  "imagens",
  "nav/imagens",
  "nav/noticias/imagens",
  "nav/nav-img",
  "nav/link",
];

function copyEntry(relativeEntry) {
  const source = path.join(rootDir, relativeEntry);
  const destination = path.join(publicDir, relativeEntry);

  if (!fs.existsSync(source)) {
    return;
  }

  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.cpSync(source, destination, { recursive: true, force: true });
}

fs.mkdirSync(publicDir, { recursive: true });

for (const entry of entriesToCopy) {
  copyEntry(entry);
}

console.log("Static assets synchronized to public/ for Vite build.");
