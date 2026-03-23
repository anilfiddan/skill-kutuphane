import { cpSync, mkdirSync, existsSync, readdirSync } from "fs";
import { join } from "path";

const PUBLIC_DIR = join(process.cwd(), "public", "skills");

// Clean & create
if (existsSync(PUBLIC_DIR)) {
  import("fs").then((fs) => fs.rmSync(PUBLIC_DIR, { recursive: true }));
}
mkdirSync(PUBLIC_DIR, { recursive: true });

// Kalfa skills
const kalfaBase = "C:/Users/anill/Desktop/anilfidan/kalfa-main/.claude/skills";
const kalfaCategories = readdirSync(kalfaBase, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

let count = 0;
for (const cat of kalfaCategories) {
  const catDir = join(kalfaBase, cat);
  const skillDirs = readdirSync(catDir, { withFileTypes: true }).filter((d) =>
    d.isDirectory()
  );
  for (const sd of skillDirs) {
    const src = join(catDir, sd.name, "SKILL.md");
    if (existsSync(src)) {
      const destDir = join(PUBLIC_DIR, cat, sd.name);
      mkdirSync(destDir, { recursive: true });
      cpSync(src, join(destDir, "SKILL.md"));
      count++;
    }
  }
}
console.log(`Kalfa: ${count} skills copied`);

// Tezgah skills
const tezgahBase = "C:/Users/anill/Desktop/anilfidan/tezgah-main/skills";
if (existsSync(tezgahBase)) {
  const tezgahDirs = readdirSync(tezgahBase, { withFileTypes: true }).filter(
    (d) => d.isDirectory()
  );
  let tCount = 0;
  for (const sd of tezgahDirs) {
    const src = join(tezgahBase, sd.name, "SKILL.md");
    if (existsSync(src)) {
      const destDir = join(PUBLIC_DIR, "saas", sd.name);
      mkdirSync(destDir, { recursive: true });
      cpSync(src, join(destDir, "SKILL.md"));
      tCount++;
    }
  }
  console.log(`Tezgah: ${tCount} skills copied`);
}

// SaaS launcher skills (desktop)
const saasBase = "C:/Users/anill/Desktop";
const saasFolders = [
  "saas-api-security",
  "saas-auth",
  "saas-deployment",
  "saas-email",
  "saas-landing-seo",
  "saas-launcher",
  "saas-payments",
];
let sCount = 0;
for (const folder of saasFolders) {
  const src = join(saasBase, folder, "SKILL.md");
  if (existsSync(src)) {
    const destDir = join(PUBLIC_DIR, "saas", folder);
    mkdirSync(destDir, { recursive: true });
    // Don't overwrite if tezgah already copied
    const dest = join(destDir, "SKILL.md");
    if (!existsSync(dest)) {
      cpSync(src, dest);
      sCount++;
    }
  }
}
console.log(`SaaS Launcher: ${sCount} skills copied`);
console.log(`Total: ${count + sCount} skills in public/skills/`);
