import fs from "node:fs";
import path from "node:path";
import { logOk } from "./colors.js";

export function generateAdapters(targetDir, agentsContent, options = { dryRun: false }) {
  const generated = [];

  // 1. .agents/AGENTS.md (padrão agnóstico)
  const agentsDir = path.join(targetDir, ".agents");
  const agentsFile = path.join(agentsDir, "AGENTS.md");
  if (!options.dryRun) {
    fs.mkdirSync(agentsDir, { recursive: true });
    fs.writeFileSync(agentsFile, agentsContent, "utf-8");
  }
  generated.push(".agents/AGENTS.md");

  // 2. CLAUDE.md (Claude Code)
  const claudeFile = path.join(targetDir, "CLAUDE.md");
  const claudeContent = `# Integração Elefante no Claude Code

Sempre que iniciar tarefas com **#elefante**, siga rigorosamente as instruções e regras definidas em \`.agents/AGENTS.md\`.

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

  // 3. .cursor/rules/elefante.mdc (Cursor IDE)
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

  // 4. GEMINI.md (Antigravity / Gemini CLI)
  const geminiFile = path.join(targetDir, "GEMINI.md");
  const geminiContent = `# Protocolo Elefante para Gemini / Antigravity

Consulte e siga rigorosamente as diretrizes em \`.agents/AGENTS.md\`.
O SSOT do sistema está em \`.elefante/01-ESTADO_ATUAL.md\`.
`;
  if (!options.dryRun) {
    fs.writeFileSync(geminiFile, geminiContent, "utf-8");
  }
  generated.push("GEMINI.md");

  // 5. .kiro/ (Kiro hooks e steering)
  const kiroHooksDir = path.join(targetDir, ".kiro", "hooks");
  const kiroSteeringDir = path.join(targetDir, ".kiro", "steering");
  if (!options.dryRun) {
    fs.mkdirSync(kiroHooksDir, { recursive: true });
    fs.mkdirSync(kiroSteeringDir, { recursive: true });

    fs.writeFileSync(
      path.join(kiroHooksDir, "ssot-commit-reminder.json"),
      JSON.stringify(
        {
          version: "v1",
          hooks: [
            {
              name: "SSOT Update Reminder on Task Complete",
              trigger: "PostTaskExec",
              description: "Verifica se o SSOT foi atualizado apos tarefas estruturais",
              action: {
                type: "agent",
                prompt: "Verifique se .elefante/01-ESTADO_ATUAL.md reflete as alteracoes feitas."
              }
            }
          ]
        },
        null,
        2
      ),
      "utf-8"
    );

    fs.writeFileSync(
      path.join(kiroHooksDir, "ssot-guard.json"),
      JSON.stringify(
        {
          version: "v1",
          hooks: [
            {
              name: "SSOT Guard - Session End",
              trigger: "Stop",
              description: "Checklist final ao encerrar sessao",
              action: {
                type: "agent",
                prompt: "Confirme se o SSOT e historico estao atualizados antes de finalizar."
              }
            }
          ]
        },
        null,
        2
      ),
      "utf-8"
    );

    fs.writeFileSync(
      path.join(kiroSteeringDir, "ssot-enforcement.md"),
      `---\ninclusion: always\n---\n# SSOT Obrigatorio\n\nSempre consulte e atualize .elefante/01-ESTADO_ATUAL.md ao modificar arquivos estruturais.\n`,
      "utf-8"
    );
  }
  generated.push(".kiro/ (hooks + steering)");

  return generated;
}
