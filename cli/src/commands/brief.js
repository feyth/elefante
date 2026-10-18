import fs from 'node:fs';
import path from 'node:path';
import { c } from '../utils/colors.js';

export function runBrief(targetDir = process.cwd(), options = {}) {
  const elefanteDir = path.join(targetDir, '.elefante');

  if (!fs.existsSync(elefanteDir)) {
    console.log(`${c.red}❌ ERRO:${c.reset} Diretório .elefante/ não encontrado em: ${targetDir}`);
    return false;
  }

  // 1. Extrair nome e stack do SSOT
  let projectName = 'Projeto';
  let stack = 'Não especificada';
  let statusMoment = 'Desenvolvimento ativo';
  let modules = [];

  const ssotPath = path.join(elefanteDir, '01-ESTADO_ATUAL.md');
  if (fs.existsSync(ssotPath)) {
    const ssot = fs.readFileSync(ssotPath, 'utf8');
    const nameMatch = ssot.match(/[-*]\s*\*\*Projeto:\*\*\s*([^\r\n]+)/i);
    if (nameMatch) projectName = nameMatch[1].trim();

    const stackMatch = ssot.match(/[-*]\s*\*\*Stack:\*\*\s*([^\r\n]+)/i);
    if (stackMatch) stack = stackMatch[1].trim();

    const statusMatch = ssot.match(/## Status do Momento[\s\S]*?[-*]\s*([^\r\n]+)/i);
    if (statusMatch) statusMoment = statusMatch[1].trim();

    // Extrair módulos
    const moduleRows = ssot.match(/\|([^|\r\n]+)\|([^|\r\n]+)\|([^|\r\n]+)\|/g) || [];
    moduleRows.slice(2, 7).forEach(row => {
      const parts = row.split('|').map(s => s.trim()).filter(Boolean);
      if (parts.length >= 2 && !parts[0].includes('---') && !parts[0].toLowerCase().includes('módulo')) {
        modules.push(`${parts[0]} (${parts[parts.length - 1]})`);
      }
    });
  }

  // 2. Extrair princípios MUST (máx 3)
  const mustPrinciples = [];
  const princPath = path.join(elefanteDir, '00-PRINCIPIOS.md');
  if (fs.existsSync(princPath)) {
    const pContent = fs.readFileSync(princPath, 'utf8');
    const mustMatches = pContent.match(/[-*]\s*\*\*MUST:\*\*\s*([^\r\n]+)/g) || [];
    mustMatches.slice(0, 3).forEach(m => {
      mustPrinciples.push(m.replace(/[-*]\s*\*\*MUST:\*\*\s*/i, '').trim());
    });
  }

  // 3. Extrair armadilhas (máx 2)
  const topPitfalls = [];
  const rulesPath = path.join(elefanteDir, '02-REGRAS_E_CULTURA.md');
  if (fs.existsSync(rulesPath)) {
    const rContent = fs.readFileSync(rulesPath, 'utf8');
    const pitRows = rContent.match(/\|([^|\r\n]+)\|([^|\r\n]+)\|([^|\r\n]+)\|([^|\r\n]+)\|/g) || [];
    pitRows.slice(2, 4).forEach(row => {
      const parts = row.split('|').map(s => s.trim()).filter(Boolean);
      if (parts.length >= 4 && !parts[0].includes('---') && !parts[0].toLowerCase().includes('sintoma')) {
        topPitfalls.push(`${parts[1]}: ${parts[3]}`);
      }
    });
  }

  // 4. Montar Briefing Cirúrgico (< 400 tokens)
  const briefMarkdown = `<!-- ELEFANTE BRIEF: CONTEXTO ULTRA-COMPACTO (~350 TOKENS) -->
### 🐘 Briefing de Contexto — ${projectName}
- **Stack:** ${stack}
- **Status do Momento:** ${statusMoment}
- **Módulos Ativos:** ${modules.length > 0 ? modules.join(', ') : 'Em inicialização'}

#### ⚖️ Leis Invioláveis (MUST)
${mustPrinciples.length > 0 ? mustPrinciples.map(p => `- MUST: ${p}`).join('\n') : '- MUST: Manter separação de responsabilidades e atualizar SSOT'}

#### 🛑 Armadilhas Principais
${topPitfalls.length > 0 ? topPitfalls.map(p => `- ${p}`).join('\n') : '- A001: Manter SSOT atualizado a cada alteração estrutural'}
`;

  console.log(`\n${c.bold}📋 Framework Elefante — Briefing Condensado (Budget: ~350 tokens)${c.reset}\n`);
  console.log(c.cyan('──────────────────────────────────────────────────') + c.reset);
  console.log(briefMarkdown.trim());
  console.log(c.cyan('──────────────────────────────────────────────────') + c.reset);

  if (options.save) {
    const outPath = path.join(elefanteDir, 'BRIEF.md');
    fs.writeFileSync(outPath, briefMarkdown, 'utf8');
    console.log(`\n${c.green}✔ Salvo com sucesso em:${c.reset} ${c.bold}.elefante/BRIEF.md${c.reset}\n`);
  } else {
    console.log(`${c.dim}Dica: Para salvar no disco, execute 'npx @feyth/elefante brief --save'${c.reset}\n`);
  }

  return true;
}
