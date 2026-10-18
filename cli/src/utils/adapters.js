import fs from "node:fs";
import path from "node:path";

/**
 * Gera adaptadores de IA 100% genéricos e agnósticos de editor.
 *
 * Padrão Universal da Indústria:
 * - AGENTS.md na raiz do projeto (lido por qualquer LLM, IDE, agente ou CLI).
 *
 * Adaptadores proprietários de ferramentas específicas (Claude, Cursor, Windsurf, Copilot, Kiro)
 * NUNCA são gerados por padrão. Eles só são criados se o projeto já tiver a pasta/configuração
 * da respectiva ferramenta instalada.
 */
export function generateAdapters(targetDir, agentsContent, options = { dryRun: false, detectedAgents: [] }) {
  const generated = [];
  const isAgentActive = (id) => {
    if (!options.detectedAgents || options.detectedAgents.length === 0) return false;
    return options.detectedAgents.some(a => (typeof a === 'string' ? a === id : a.id === id));
  };

  // 1. AGENTS.md na raiz (ÚNICO padrão universal e neutro)
  const rootAgentsFile = path.join(targetDir, "AGENTS.md");
  if (!options.dryRun) {
    fs.writeFileSync(rootAgentsFile, agentsContent, "utf-8");
  }
  generated.push("AGENTS.md (Universal)");

  // 2. .agents/AGENTS.md (apenas se a pasta .agents já existir no projeto)
  const agentsDir = path.join(targetDir, ".agents");
  if (fs.existsSync(agentsDir)) {
    const agentsFile = path.join(agentsDir, "AGENTS.md");
    if (!options.dryRun) {
      fs.writeFileSync(agentsFile, agentsContent, "utf-8");
    }
    generated.push(".agents/AGENTS.md");
  }

  // 3. Claude Code (APENAS se o projeto já tiver .claude/)
  const hasClaude = isAgentActive("claude") || fs.existsSync(path.join(targetDir, ".claude"));
  if (hasClaude) {
    const claudeFile = path.join(targetDir, "CLAUDE.md");
    const claudeContent = `# Integração Elefante — Claude Code\n\nConsulte e siga rigorosamente as diretrizes em \`AGENTS.md\` e o SSOT em \`.elefante/01-ESTADO_ATUAL.md\`.\n`;
    if (!options.dryRun) {
      fs.writeFileSync(claudeFile, claudeContent, "utf-8");
    }
    generated.push("CLAUDE.md (apenas sob demanda)");
  }

  // 4. Cursor IDE (APENAS se o projeto já tiver .cursor/ ou .cursorrules)
  const hasCursor = isAgentActive("cursor") || fs.existsSync(path.join(targetDir, ".cursor")) || fs.existsSync(path.join(targetDir, ".cursorrules"));
  if (hasCursor) {
    const cursorRulesDir = path.join(targetDir, ".cursor", "rules");
    const cursorFile = path.join(cursorRulesDir, "elefante.mdc");
    const cursorContent = `---
description: Memória e Governança com Framework Elefante
globs: *
alwaysApply: true
---

# Regras do Framework Elefante
Consulte AGENTS.md e .elefante/01-ESTADO_ATUAL.md antes de alterar o código.
`;
    if (!options.dryRun) {
      fs.mkdirSync(cursorRulesDir, { recursive: true });
      fs.writeFileSync(cursorFile, cursorContent, "utf-8");
    }
    generated.push(".cursor/rules/elefante.mdc (apenas sob demanda)");
  }

  // 5. Windsurf (APENAS se o projeto já tiver .windsurf/)
  const hasWindsurf = isAgentActive("windsurf") || fs.existsSync(path.join(targetDir, ".windsurf")) || fs.existsSync(path.join(targetDir, ".codeium"));
  if (hasWindsurf) {
    const windsurfFile = path.join(targetDir, ".windsurfrules");
    const windsurfContent = `# Regras do Framework Elefante\nConsulte AGENTS.md e .elefante/01-ESTADO_ATUAL.md.\n`;
    if (!options.dryRun) {
      fs.writeFileSync(windsurfFile, windsurfContent, "utf-8");
    }
    generated.push(".windsurfrules (apenas sob demanda)");
  }

  // 6. GitHub Copilot (APENAS se o projeto já tiver .github/)
  const hasCopilot = isAgentActive("copilot") || fs.existsSync(path.join(targetDir, ".github"));
  if (hasCopilot) {
    const githubDir = path.join(targetDir, ".github");
    const copilotFile = path.join(githubDir, "copilot-instructions.md");
    const copilotContent = `# Diretrizes de Arquitetura — Framework Elefante\nConsulte AGENTS.md e .elefante/01-ESTADO_ATUAL.md.\n`;
    if (!options.dryRun) {
      fs.mkdirSync(githubDir, { recursive: true });
      fs.writeFileSync(copilotFile, copilotContent, "utf-8");
    }
    generated.push(".github/copilot-instructions.md (apenas sob demanda)");
  }

  return generated;
}
