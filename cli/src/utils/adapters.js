import fs from "node:fs";
import path from "node:path";
import { logOk } from "./colors.js";

/**
 * Gera adaptadores de IA agnósticos de editor.
 * Por padrão, o Elefante é 100% universal e funciona com qualquer editor ou IDE.
 * Arquivos universais gerados:
 *  - AGENTS.md (padrão universal aberto na raiz)
 *  - .agents/AGENTS.md (para Antigravity, Codex e agentes de workspace)
 *  - CLAUDE.md (para Claude Code / Claude Desktop)
 * Adaptadores específicos (Cursor, Windsurf, Copilot, Kiro) são gerados
 * apenas se o respectivo editor for detectado no projeto.
 */
export function generateAdapters(targetDir, agentsContent, options = { dryRun: false, detectedAgents: [] }) {
  const generated = [];
  const isAgentActive = (id) => {
    if (!options.detectedAgents || options.detectedAgents.length === 0) return false;
    return options.detectedAgents.some(a => (typeof a === 'string' ? a === id : a.id === id));
  };

  // 1. AGENTS.md na raiz (Padrão Universal e Agnóstico da Indústria)
  const rootAgentsFile = path.join(targetDir, "AGENTS.md");
  if (!options.dryRun) {
    fs.writeFileSync(rootAgentsFile, agentsContent, "utf-8");
  }
  generated.push("AGENTS.md (Universal)");

  // 2. .agents/AGENTS.md (Antigravity / Codex workspace standard)
  const agentsDir = path.join(targetDir, ".agents");
  const agentsFile = path.join(agentsDir, "AGENTS.md");
  if (!options.dryRun) {
    fs.mkdirSync(agentsDir, { recursive: true });
    fs.writeFileSync(agentsFile, agentsContent, "utf-8");
  }
  generated.push(".agents/AGENTS.md");

  // 3. CLAUDE.md (Claude Code)
  const claudeFile = path.join(targetDir, "CLAUDE.md");
  const claudeContent = `# Integração Elefante — Claude Code

Sempre que iniciar tarefas com **#elefante**, siga rigorosamente as instruções definidas em \`AGENTS.md\`.

Antes de qualquer implementação:
1. Leia silenciosamente \`.elefante/00-PRINCIPIOS.md\`
2. Leia silenciosamente \`.elefante/01-ESTADO_ATUAL.md\`
3. Leia silenciosamente \`.elefante/02-REGRAS_E_CULTURA.md\`

Após cada tarefa de alteração estrutural, atualize \`.elefante/01-ESTADO_ATUAL.md\`.
`;
  if (!options.dryRun) {
    fs.writeFileSync(claudeFile, claudeContent, "utf-8");
  }
  generated.push("CLAUDE.md");

  // 4. Cursor IDE (se detectado ou presente)
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

Sempre que o prompt contiver a tag #elefante:
- Consulte .elefante/00-PRINCIPIOS.md e .elefante/01-ESTADO_ATUAL.md antes de alterar o código.
- Respeite as regras de .elefante/02-REGRAS_E_CULTURA.md.
- Atualize .elefante/01-ESTADO_ATUAL.md sempre que modificar models, controllers, migrations ou rotas.
`;
    if (!options.dryRun) {
      fs.mkdirSync(cursorRulesDir, { recursive: true });
      fs.writeFileSync(cursorFile, cursorContent, "utf-8");
    }
    generated.push(".cursor/rules/elefante.mdc");
  }

  // 5. Windsurf / Codeium (se detectado)
  const hasWindsurf = isAgentActive("windsurf") || fs.existsSync(path.join(targetDir, ".windsurf")) || fs.existsSync(path.join(targetDir, ".codeium"));
  if (hasWindsurf) {
    const windsurfFile = path.join(targetDir, ".windsurfrules");
    const windsurfContent = `# Regras do Framework Elefante
Consulte AGENTS.md e .elefante/01-ESTADO_ATUAL.md antes de implementar qualquer tarefa.
Atualize o SSOT ao concluir tarefas estruturais.
`;
    if (!options.dryRun) {
      fs.writeFileSync(windsurfFile, windsurfContent, "utf-8");
    }
    generated.push(".windsurfrules");
  }

  // 6. GitHub Copilot (se detectado)
  const hasCopilot = isAgentActive("copilot") || fs.existsSync(path.join(targetDir, ".github"));
  if (hasCopilot) {
    const githubDir = path.join(targetDir, ".github");
    const copilotFile = path.join(githubDir, "copilot-instructions.md");
    const copilotContent = `# Diretrizes de Arquitetura — Framework Elefante
Consulte as regras em AGENTS.md e o estado atual em .elefante/01-ESTADO_ATUAL.md.
`;
    if (!options.dryRun) {
      fs.mkdirSync(githubDir, { recursive: true });
      fs.writeFileSync(copilotFile, copilotContent, "utf-8");
    }
    generated.push(".github/copilot-instructions.md");
  }

  // 7. Kiro IDE (APENAS se o usuário estiver usando Kiro)
  const hasKiro = isAgentActive("kiro") || fs.existsSync(path.join(targetDir, ".kiro"));
  if (hasKiro) {
    const kiroSteeringDir = path.join(targetDir, ".kiro", "steering");
    if (!options.dryRun) {
      fs.mkdirSync(kiroSteeringDir, { recursive: true });
      fs.writeFileSync(
        path.join(kiroSteeringDir, "ssot-enforcement.md"),
        `---\ninclusion: always\n---\n# SSOT Obrigatorio\n\nConsulte AGENTS.md e atualize .elefante/01-ESTADO_ATUAL.md ao modificar arquivos estruturais.\n`,
        "utf-8"
      );
    }
    generated.push(".kiro/steering/ (apenas para Kiro IDE)");
  }

  return generated;
}
