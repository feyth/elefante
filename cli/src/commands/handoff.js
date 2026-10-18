import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { c } from '../utils/colors.js';

export function runHandoff(note = '', targetDir = process.cwd(), options = {}) {
  const elefanteDir = path.join(targetDir, '.elefante');
  const localDir = path.join(elefanteDir, 'local');

  if (!fs.existsSync(elefanteDir)) {
    console.log(`${c.red}❌ Diretório .elefante/ não encontrado em:${c.reset} ${targetDir}`);
    return;
  }

  if (!fs.existsSync(localDir)) {
    fs.mkdirSync(localDir, { recursive: true });
  }

  // 1. Obter informações de contexto do Git (se disponível)
  let gitStatusOutput = '';
  let gitLastCommit = '';
  try {
    gitStatusOutput = execSync('git status -s', { cwd: targetDir, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
  } catch {}

  try {
    gitLastCommit = execSync('git log -n 1 --oneline', { cwd: targetDir, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
  } catch {}

  // 2. Obter último log em historico/
  const historicoDir = path.join(elefanteDir, 'historico');
  let lastLogName = 'Nenhum log registrado ainda';
  if (fs.existsSync(historicoDir)) {
    const logs = fs.readdirSync(historicoDir).filter(f => f.endsWith('.md') && !f.startsWith('_')).sort();
    if (logs.length > 0) {
      lastLogName = logs[logs.length - 1];
    }
  }

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const timeStr = now.toLocaleTimeString();

  const handoffContent = `# Handoff de Sessão (Transição de Contexto)

- **Data/Hora:** ${dateStr} às ${timeStr}
- **Último Commit:** ${gitLastCommit || 'Nenhum commit recente detectado'}
- **Último Log de Sessão:** \`.elefante/historico/${lastLogName}\`

---

## 1. Onde Paramos
${note ? note : 'Descreva onde a tarefa foi pausada ou o que está aguardando resolução.'}

---

## 2. Arquivos Modificados Não Commitados (Git Status)
\`\`\`text
${gitStatusOutput || 'Nenhuma alteração pendente (working tree clean)'}
\`\`\`

---

## 3. Próxima Ação Recomendada
1. Retomar a partir do ponto descrito na Seção 1.
2. Executar \`#elefante verificar\` antes de iniciar novas alterações estruturais.
`;

  const handoffPath = path.join(localDir, 'HANDOFF.md');
  fs.writeFileSync(handoffPath, handoffContent, 'utf8');

  console.log(`\n${c.green}✅ Handoff atualizado em:${c.reset} ${c.bold}.elefante/local/HANDOFF.md${c.reset}`);
  console.log(`${c.dim}(Este arquivo é ignorado pelo Git para ser privativo da sua máquina)${c.reset}\n`);

  console.log(`${c.cyan}${c.bold}=== Resumo do Handoff ===${c.reset}`);
  console.log(`Data: ${dateStr} ${timeStr}`);
  if (note) console.log(`Nota: ${c.yellow(note)}${c.reset}`);
  console.log(`Último Log: ${c.dim}${lastLogName}${c.reset}`);
  console.log(`Alterações pendentes: ${gitStatusOutput ? gitStatusOutput.split('\n').length : 0} arquivo(s)`);
  console.log(`\n${c.dim}Cole o conteúdo de ${c.reset}.elefante/local/HANDOFF.md${c.dim} em qualquer outra IA para continuidade perfeita.${c.reset}\n`);
}
