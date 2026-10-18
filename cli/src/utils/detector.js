import fs from "node:fs";
import path from "node:path";

export function detectStack(targetDir) {
  // 1. Laravel
  if (fs.existsSync(path.join(targetDir, "artisan"))) return "laravel";
  const composerPath = path.join(targetDir, "composer.json");
  if (fs.existsSync(composerPath)) {
    try {
      const composer = fs.readFileSync(composerPath, "utf-8");
      if (composer.includes("laravel/framework")) return "laravel";
    } catch {}
  }

  // 2. Django
  if (fs.existsSync(path.join(targetDir, "manage.py"))) return "django";

  // 3. Next.js
  const nextConfigs = ["next.config.js", "next.config.ts", "next.config.mjs"];
  if (nextConfigs.some((cfg) => fs.existsSync(path.join(targetDir, cfg)))) return "nextjs";
  const pkgPath = path.join(targetDir, "package.json");
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = fs.readFileSync(pkgPath, "utf-8");
      if (pkg.includes('"next"')) return "nextjs";
    } catch {}
  }

  // 4. Python genérico / FastAPI / Flask
  const pyFiles = ["pyproject.toml", "requirements.txt", "Pipfile"];
  if (pyFiles.some((f) => fs.existsSync(path.join(targetDir, f)))) return "python";

  return null;
}

export function detectAgents(targetDir) {
  const detected = [];

  // Cursor
  if (fs.existsSync(path.join(targetDir, ".cursor")) || fs.existsSync(path.join(targetDir, ".cursorrules"))) {
    detected.push({ id: "cursor", name: "Cursor IDE" });
  }

  // Claude Code
  if (fs.existsSync(path.join(targetDir, ".claude")) || fs.existsSync(path.join(targetDir, "CLAUDE.md"))) {
    detected.push({ id: "claude", name: "Claude Code" });
  }

  // Windsurf
  if (fs.existsSync(path.join(targetDir, ".windsurf")) || fs.existsSync(path.join(targetDir, ".codeium"))) {
    detected.push({ id: "windsurf", name: "Windsurf IDE" });
  }

  // Kiro
  if (fs.existsSync(path.join(targetDir, ".kiro"))) {
    detected.push({ id: "kiro", name: "Kiro IDE" });
  }

  // Antigravity / Gemini
  if (fs.existsSync(path.join(targetDir, ".agents")) || fs.existsSync(path.join(targetDir, "GEMINI.md"))) {
    detected.push({ id: "antigravity", name: "Antigravity / Gemini CLI" });
  }

  // VS Code Copilot
  if (fs.existsSync(path.join(targetDir, ".github", "copilot-instructions.md"))) {
    detected.push({ id: "copilot", name: "GitHub Copilot" });
  }

  return detected;
}

export function detectInstalledAgents(targetDir) {
  const agents = detectAgents(targetDir);
  const map = {
    cursor: false,
    claude: false,
    windsurf: false,
    kiro: false,
    antigravity: false,
    gemini: false,
    copilot: false
  };
  for (const a of agents) {
    map[a.id] = true;
    if (a.id === 'antigravity') map.gemini = true;
  }
  return map;
}
