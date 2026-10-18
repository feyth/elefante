import fs from 'node:fs';
import path from 'node:path';
import { c } from '../utils/colors.js';
import { detectInstalledAgents } from '../utils/detector.js';

export function runStatus(targetDir = process.cwd(), options = {}) {
  const elefanteDir = path.join(targetDir, '.elefante');

  if (!fs.existsSync(elefanteDir)) {
    console.log(`\n${c.yellow}⚠️  Nenhum diretório .elefante/ encontrado em:${c.reset} ${targetDir}`);
    console.log(`${c.dim}Para inicializar este projeto com o Framework Elefante:${c.reset}`);
    console.log(`  ${c.cyan}npx @feyth/elefante init${c.reset}\n`);
    return;
  }

  console.log(`\n${c.bold}🐘 Framework Elefante — Status do Projeto${c.reset}`);
  console.log(`${c.dim}Localização:${c.reset} ${targetDir}\n`);

  // 1. Princípios
  const principiosPath = path.join(elefanteDir, '00-PRINCIPIOS.md');
  const hasPrincipios = fs.existsSync(principiosPath);
  console.log(`${c.bold}Princípios:${c.reset} ${hasPrincipios ? `${c.green}✅ Presente (00-PRINCIPIOS.md)${c.reset}` : `${c.yellow}⚠️  Não configurado${c.reset}`}`);

  // 2. SSOT (01-ESTADO_ATUAL.md)
  const ssotPath = path.join(elefanteDir, '01-ESTADO_ATUAL.md');
  let ssotInfo = {
    projeto: 'Não identificado',
    stack: 'Não identificada',
    data: 'Desconhecida',
    modulosTotal: 0,
    modulosConcluidos: 0
  };

  if (fs.existsSync(ssotPath)) {
    const ssotContent = fs.readFileSync(ssotPath, 'utf8');

    // Tentar extrair nome do projeto
    const projMatch = ssotContent.match(/[-*]\s*\*\*Projeto:\*\*\s*([^\n\r]+)/i) ||
                      ssotContent.match(/#\s+SSOT\s*[-—:]\s*(.+)/i) ||
                      ssotContent.match(/#\s+Estado Atual do Sistema[^\n\r]*\(([^\)]+)\)/i);
    if (projMatch) ssotInfo.projeto = projMatch[1].trim();

    // Tentar extrair stack
    const stackMatch = ssotContent.match(/[-*]\s*\*\*Stack:\*\*\s*([^\n\r]+)/i) ||
                       ssotContent.match(/Stack[:\s]+([^\n\r]+)/i);
    if (stackMatch) ssotInfo.stack = stackMatch[1].trim();

    // Tentar extrair data
    const dataMatch = ssotContent.match(/[-*]\s*\*\*Data(?: da Implementação)?:\*\*\s*([^\n\r]+)/i) ||
                      ssotContent.match(/Última atualização[:\s]+([^\n\r]+)/i) ||
                      ssotContent.match(/Data[:\s]+([0-9]{4}-[0-9]{2}-[0-9]{2})/i);
    if (dataMatch) ssotInfo.data = dataMatch[1].trim();

    // Contar módulos
    const checked = (ssotContent.match(/\[x\]|✅/gi) || []).length;
    const unchecked = (ssotContent.match(/\[ \]|⏳|⚠️/gi) || []).length;
    ssotInfo.modulosConcluidos = checked;
    ssotInfo.modulosTotal = checked + unchecked;

    console.log(`${c.bold}Projeto:${c.reset}    ${ssotInfo.projeto}`);
    console.log(`${c.bold}Stack:${c.reset}      ${ssotInfo.stack}`);
    console.log(`${c.bold}Atualizado:${c.reset} ${ssotInfo.data}`);
    if (ssotInfo.modulosTotal > 0) {
      const pct = Math.round((ssotInfo.modulosConcluidos / ssotInfo.modulosTotal) * 100);
      console.log(`${c.bold}Módulos:${c.reset}    ${ssotInfo.modulosConcluidos}/${ssotInfo.modulosTotal} concluídos (${pct}%)`);
    }
  } else {
    console.log(`${c.red}❌ SSOT ausente (01-ESTADO_ATUAL.md não encontrado)${c.reset}`);
  }

  // 3. Regras e Armadilhas (02-REGRAS_E_CULTURA.md)
  const regrasPath = path.join(elefanteDir, '02-REGRAS_E_CULTURA.md');
  if (fs.existsSync(regrasPath)) {
    const regrasContent = fs.readFileSync(regrasPath, 'utf8');
    const armadilhasMatches = regrasContent.match(/\|[^|\r\n]+\|[^|\r\n]+\|[^|\r\n]+\|/g);
    // Remove cabeçalhos da contagem aproximada
    const count = armadilhasMatches ? Math.max(0, armadilhasMatches.length - 2) : 0;
    console.log(`${c.bold}Cultura:${c.reset}    ${c.green}✅ 02-REGRAS_E_CULTURA.md ativo${c.reset} (~${count} armadilhas catalogadas)`);
  } else {
    console.log(`${c.bold}Cultura:${c.reset}    ${c.yellow}⚠️  02-REGRAS_E_CULTURA.md não encontrado${c.reset}`);
  }

  // 4. Histórico de Sessões
  const histDir = path.join(elefanteDir, 'historico');
  if (fs.existsSync(histDir)) {
    const logs = fs.readdirSync(histDir).filter(f => f.endsWith('.md') && !f.startsWith('_'));
    console.log(`${c.bold}Histórico:${c.reset}  ${logs.length} logs de sessão registrados em ${c.dim}.elefante/historico/${c.reset}`);
    if (logs.length > 0) {
      const recent = logs.sort().slice(-3).reverse();
      recent.forEach(log => console.log(`  ${c.dim}↳ ${log}${c.reset}`));
    }
  } else {
    console.log(`${c.bold}Histórico:${c.reset}  ${c.dim}Nenhum log encontrado${c.reset}`);
  }

  // 5. Adaptadores de IA (100% agnóstico de editor)
  console.log(`\n${c.bold}Adaptadores de IA integrados:${c.reset}`);
  const hasRootAgents = fs.existsSync(path.join(targetDir, 'AGENTS.md'));
  const hasAgentsDir = fs.existsSync(path.join(targetDir, '.agents', 'AGENTS.md'));
  const hasClaude = fs.existsSync(path.join(targetDir, 'CLAUDE.md'));
  const hasCursor = fs.existsSync(path.join(targetDir, '.cursor')) || fs.existsSync(path.join(targetDir, '.cursorrules'));
  const hasWindsurf = fs.existsSync(path.join(targetDir, '.windsurfrules')) || fs.existsSync(path.join(targetDir, '.windsurf'));
  const hasCopilot = fs.existsSync(path.join(targetDir, '.github', 'copilot-instructions.md'));

  console.log(`  ${(hasRootAgents || hasAgentsDir) ? c.green + '●' : c.dim + '○'} Padrão Universal (AGENTS.md) ${(hasRootAgents || hasAgentsDir) ? `${c.green}[ativo]${c.reset}` : `${c.dim}[não detectado]${c.reset}`}`);
  console.log(`  ${hasClaude ? c.green + '●' : c.dim + '○'} Claude Code (CLAUDE.md) ${hasClaude ? `${c.green}[ativo]${c.reset}` : `${c.dim}[não detectado]${c.reset}`}`);
  if (hasCursor) console.log(`  ${c.green}●${c.reset} Cursor (.cursor/rules/elefante.mdc) ${c.green}[ativo]${c.reset}`);
  if (hasWindsurf) console.log(`  ${c.green}●${c.reset} Windsurf (.windsurfrules) ${c.green}[ativo]${c.reset}`);
  if (hasCopilot) console.log(`  ${c.green}●${c.reset} GitHub Copilot (.github/) ${c.green}[ativo]${c.reset}`);

  console.log(`\n${c.dim}Execute ${c.cyan}npx @feyth/elefante doctor${c.reset}${c.dim} para auditar integridade e placeholders.${c.reset}\n`);
}
