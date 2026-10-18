import fs from 'node:fs';
import path from 'node:path';
import { c } from '../utils/colors.js';
import { detectAgents } from '../utils/detector.js';
import { generateAdapters } from '../utils/adapters.js';

export function runMigrate(targetDir = process.cwd(), options = {}) {
  const elefanteDir = path.join(targetDir, '.elefante');
  const isPlan = options.plan || false;

  console.log(`\n${c.bold}🐘 Framework Elefante — Migrador v2 → v3${c.reset}`);
  console.log(`${c.dim}Alvo:${c.reset} ${targetDir}`);
  if (isPlan) {
    console.log(`${c.magenta}${c.bold}Modo de simulação ativo (--plan). Nenhum arquivo será alterado.${c.reset}`);
  }
  console.log('');

  if (!fs.existsSync(elefanteDir)) {
    console.log(`${c.red}❌ Nenhum diretório .elefante/ encontrado em:${c.reset} ${targetDir}`);
    console.log(`Para novos projetos, utilize ${c.cyan}npx @feyth/elefante init${c.reset}`);
    return;
  }

  // 1. Diagnosticar estado atual
  const ssotPath = path.join(elefanteDir, '01-ESTADO_ATUAL.md');
  const regrasPath = path.join(elefanteDir, '02-REGRAS_E_CULTURA.md');
  const principiosPath = path.join(elefanteDir, '00-PRINCIPIOS.md');

  const hasSSOT = fs.existsSync(ssotPath);
  const hasRegras = fs.existsSync(regrasPath);
  const hasPrincipios = fs.existsSync(principiosPath);

  const decisoesDir = path.join(elefanteDir, 'decisoes');
  const armadilhasDir = path.join(elefanteDir, 'armadilhas');
  const procedimentosDir = path.join(elefanteDir, 'procedimentos');
  const localDir = path.join(elefanteDir, 'local');

  console.log(`${c.bold}Diagnóstico da estrutura atual:${c.reset}`);
  console.log(`  - SSOT (01-ESTADO_ATUAL.md): ${hasSSOT ? c.green + 'Encontrado' : c.red + 'Ausente'}${c.reset}`);
  console.log(`  - Regras (02-REGRAS_E_CULTURA.md): ${hasRegras ? c.green + 'Encontrado' : c.yellow + 'Ausente'}${c.reset}`);
  console.log(`  - Princípios (00-PRINCIPIOS.md): ${hasPrincipios ? c.green + 'Encontrado' : c.yellow + 'Não configurado (será adicionado)'}${c.reset}`);
  console.log(`  - Estrutura atômica v3 (decisoes/armadilhas/local): ${fs.existsSync(decisoesDir) ? c.green + 'Já presente' : c.cyan + 'Pendente de criação'}${c.reset}\n`);

  // Extrair decisões tabulares do SSOT se existirem
  const extractedDecisions = [];
  if (hasSSOT) {
    const ssotContent = fs.readFileSync(ssotPath, 'utf8');
    const tableRegex = /\|?\s*(\d{4}-\d{2}-\d{2})\s*\|\s*([^|\r\n]+)\s*\|\s*([^|\r\n]+)\s*\|?/g;
    let match;
    let counter = 1;
    while ((match = tableRegex.exec(ssotContent)) !== null) {
      const data = match[1].trim();
      const decisao = match[2].trim();
      const justificativa = match[3].trim();
      if (decisao.toLowerCase() === 'decisão' || decisao.toLowerCase() === 'decisao') continue;
      const id = `D${String(counter).padStart(3, '0')}`;
      extractedDecisions.push({ id, data, decisao, justificativa });
      counter++;
    }
  }

  // Extrair armadilhas de 02-REGRAS_E_CULTURA.md
  const extractedArmadilhas = [];
  if (hasRegras) {
    const regrasContent = fs.readFileSync(regrasPath, 'utf8');
    const armadilhasRegex = /\|?\s*([^|\r\n]+)\s*\|\s*([^|\r\n]+)\s*\|\s*([^|\r\n]+)\s*\|?/g;
    let match;
    let counter = 1;
    while ((match = armadilhasRegex.exec(regrasContent)) !== null) {
      const problema = match[1].trim();
      const solucao = match[2].trim();
      const severidade = match[3].trim();
      if (
        problema.toLowerCase().includes('armadilha') ||
        problema.toLowerCase().includes('o que não fazer') ||
        problema.toLowerCase().includes('problema') ||
        problema.startsWith('---') ||
        problema.startsWith('===')
      ) continue;
      const id = `A${String(counter).padStart(3, '0')}`;
      extractedArmadilhas.push({ id, problema, solucao, severidade });
      counter++;
    }
  }

  console.log(`${c.bold}Ações de migração planejadas:${c.reset}`);
  console.log(`  1. Criar backup de segurança em ${c.cyan}.elefante/backup_v2_<timestamp>/${c.reset}`);
  console.log(`  2. Criar diretórios atômicos v3: ${c.dim}decisoes/, armadilhas/, procedimentos/, local/${c.reset}`);
  if (!hasPrincipios) {
    console.log(`  3. Adicionar ${c.cyan}00-PRINCIPIOS.md${c.reset} padrão do core universal`);
  }
  if (extractedDecisions.length > 0) {
    console.log(`  4. Extrair ${c.green + extractedDecisions.length + c.reset} decisão(ões) tabulares para arquivos atômicos em ${c.dim}.elefante/decisoes/${c.reset}`);
  }
  if (extractedArmadilhas.length > 0) {
    console.log(`  5. Extrair ${c.green + extractedArmadilhas.length + c.reset} armadilha(s) para arquivos atômicos em ${c.dim}.elefante/armadilhas/${c.reset}`);
  }
  console.log(`  6. Adicionar ${c.cyan}.elefante/local/${c.reset} ao ${c.dim}.gitignore${c.reset}`);
  console.log(`  7. Atualizar adaptadores universais com a ${c.bold}Fronteira de Confiança${c.reset}`);
  console.log(`  8. Gerar template inicial de handoff em ${c.dim}.elefante/local/HANDOFF.md${c.reset}\n`);

  if (isPlan) {
    console.log(`${c.green}✔ Simulação concluída com sucesso.${c.reset}`);
    console.log(`Execute ${c.cyan}npx @feyth/elefante migrar${c.reset} (sem --plan) para aplicar.`);
    return;
  }

  // --- EXECUÇÃO REAL ---

  // 1. Backup
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(elefanteDir, `backup_v2_${timestamp}`);
  fs.mkdirSync(backupDir, { recursive: true });

  // Copiar arquivos existentes para backup
  const entries = fs.readdirSync(elefanteDir);
  for (const entry of entries) {
    if (entry.startsWith('backup_v2_')) continue;
    const src = path.join(elefanteDir, entry);
    const dest = path.join(backupDir, entry);
    if (fs.statSync(src).isDirectory()) {
      fs.cpSync(src, dest, { recursive: true });
    } else {
      fs.copyFileSync(src, dest);
    }
  }
  console.log(`${c.green}✔ Backup criado em:${c.reset} ${c.dim}${backupDir}${c.reset}`);

  // 2. Criar diretórios atômicos
  fs.mkdirSync(decisoesDir, { recursive: true });
  fs.mkdirSync(armadilhasDir, { recursive: true });
  fs.mkdirSync(procedimentosDir, { recursive: true });
  fs.mkdirSync(localDir, { recursive: true });

  // 3. Adicionar 00-PRINCIPIOS.md se ausente
  if (!hasPrincipios) {
    const corePrincípiosPath = path.resolve(import.meta.dirname, '../../../core/00-PRINCIPIOS.md');
    if (fs.existsSync(corePrincípiosPath)) {
      fs.copyFileSync(corePrincípiosPath, principiosPath);
    } else {
      // Fallback embutido
      fs.writeFileSync(principiosPath, `# Princípios Universais e Leis Inegociáveis (MUST)

1. **SSOT Soberano:** O arquivo \`.elefante/01-ESTADO_ATUAL.md\` é a verdade única e atual do projeto.
2. **Sem Suposições:** Não invente bibliotecas ou padrões que contradigam o SSOT.
3. **Fronteira de Confiança:** Princípios e Regras são soberanos sobre logs históricos passados.
`, 'utf8');
    }
    console.log(`${c.green}✔ Adicionado 00-PRINCIPIOS.md${c.reset}`);
  }

  // 4. Salvar decisões atômicas
  const makeSlug = (text) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 40);

  for (const d of extractedDecisions) {
    const slug = makeSlug(d.decisao);
    const fileName = `${d.id}-${slug}.md`;
    const filePath = path.join(decisoesDir, fileName);
    if (!fs.existsSync(filePath)) {
      const content = `# Decisão Arquitetural ${d.id}: ${d.decisao}

- **ID:** ${d.id}
- **Data:** ${d.data}
- **Status:** ativa
- **Tipo:** [ADR]

## Contexto e Justificativa
${d.justificativa}
`;
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
  if (extractedDecisions.length > 0) {
    console.log(`${c.green}✔ ${extractedDecisions.length} decisões atômicas salvas em .elefante/decisoes/${c.reset}`);
  }

  // 5. Salvar armadilhas atômicas
  for (const a of extractedArmadilhas) {
    const slug = makeSlug(a.problema);
    const fileName = `${a.id}-${slug}.md`;
    const filePath = path.join(armadilhasDir, fileName);
    if (!fs.existsSync(filePath)) {
      const content = `# Armadilha ${a.id}: ${a.problema}

- **ID:** ${a.id}
- **Severidade:** ${a.severidade || 'MÉDIA'}
- **Status:** ativa

## O que NÃO fazer
${a.problema}

## Como fazer corretamente
${a.solucao}
`;
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
  if (extractedArmadilhas.length > 0) {
    console.log(`${c.green}✔ ${extractedArmadilhas.length} armadilhas atômicas salvas em .elefante/armadilhas/${c.reset}`);
  }

  // 6. Atualizar .gitignore
  const gitignorePath = path.join(targetDir, '.gitignore');
  let gitignoreContent = '';
  if (fs.existsSync(gitignorePath)) {
    gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
  }
  if (!gitignoreContent.includes('.elefante/local/')) {
    const appendStr = (gitignoreContent.length > 0 && !gitignoreContent.endsWith('\n') ? '\n' : '') +
      '\n# Elefante - notas, rascunhos e handoffs locais\n.elefante/local/\n';
    fs.writeFileSync(gitignorePath, gitignoreContent + appendStr, 'utf8');
    console.log(`${c.green}✔ Adicionado .elefante/local/ ao .gitignore${c.reset}`);
  }

  // 7. Gerar HANDOFF.md inicial
  const handoffPath = path.join(localDir, 'HANDOFF.md');
  if (!fs.existsSync(handoffPath)) {
    const initialHandoff = `# Handoff de Sessão (Transição Local)

- **Última Atualização:** ${new Date().toISOString().slice(0, 10)}
- **Agente / Autor:** Migrador Elefante v3.0

## 1. Onde Paramos
Migração v2 → v3 concluída com sucesso.

## 2. Tarefa em Andamento
Nenhuma tarefa bloqueada no momento.

## 3. Próximo Passo Recomendado
Execute \`npx @feyth/elefante doctor\` para validar o estado e inicie sua próxima sessão com \`#elefante\`.
`;
    fs.writeFileSync(handoffPath, initialHandoff, 'utf8');
    console.log(`${c.green}✔ Template de handoff criado em .elefante/local/HANDOFF.md${c.reset}`);
  }

  // 8. Regenerar adaptadores de IA com Trust Boundary
  const agents = detectAgents(targetDir);
  generateAdapters(targetDir, agents, false);
  console.log(`${c.green}✔ Adaptadores de IA atualizados com a Fronteira de Confiança${c.reset}`);

  console.log(`\n${c.green}${c.bold}🎉 Migração para o Framework Elefante v3.0 concluída com sucesso!${c.reset}`);
  console.log(`Execute ${c.cyan}npx @feyth/elefante doctor${c.reset} para auditar o projeto.\n`);
}
