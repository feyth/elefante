import fs from 'node:fs';
import path from 'node:path';
import { c } from '../utils/colors.js';

export function runCompact(targetDir = process.cwd(), options = {}) {
  const elefanteDir = path.join(targetDir, '.elefante');
  const historicoDir = path.join(elefanteDir, 'historico');
  const indicePath = path.join(elefanteDir, 'INDICE.md');

  const keepCount = parseInt(options.keep, 10) || 5;
  const isPlan = options.plan || false;

  console.log(`\n${c.bold}📦 Framework Elefante — Compactação de Histórico${c.reset}`);
  console.log(`${c.dim}Alvo:${c.reset} ${targetDir}`);
  console.log(`${c.dim}Manter ativas:${c.reset} ${keepCount} sessões mais recentes\n`);

  if (!fs.existsSync(historicoDir)) {
    console.log(`${c.red}❌ Diretório .elefante/historico/ não encontrado em:${c.reset} ${targetDir}`);
    return;
  }

  // Listar logs na raiz de historico/
  const files = fs.readdirSync(historicoDir, { withFileTypes: true })
    .filter(dirent => dirent.isFile() && dirent.name.endsWith('.md') && !dirent.name.startsWith('_'))
    .map(dirent => dirent.name)
    .sort();

  if (files.length <= keepCount) {
    console.log(`${c.green}✔ Histórico já está otimizado!${c.reset}`);
    console.log(`Existem ${files.length} log(s) ativos (limite configurado: ${keepCount}). Nenhuma ação necessária.\n`);
    return;
  }

  const toArchive = files.slice(0, files.length - keepCount);
  const toKeep = files.slice(files.length - keepCount);

  console.log(`${c.bold}Planejamento de compactação:${c.reset}`);
  console.log(`  - Total de logs encontrados: ${files.length}`);
  console.log(`  - Logs mantidos ativos (${toKeep.length}):`);
  toKeep.forEach(f => console.log(`    ${c.green}●${c.reset} ${f}`));
  console.log(`  - Logs a serem arquivados (${toArchive.length}):`);
  toArchive.forEach(f => console.log(`    ${c.yellow}○${c.reset} ${f}`));
  console.log('');

  if (isPlan) {
    console.log(`${c.magenta}${c.bold}Modo de simulação ativo (--plan). Nenhum arquivo foi movido.${c.reset}`);
    console.log(`Execute ${c.cyan}npx @feyth/elefante compactar${c.reset} para aplicar.\n`);
    return;
  }

  // --- EXECUÇÃO REAL ---
  const arquivoBaseDir = path.join(historicoDir, 'arquivo');
  fs.mkdirSync(arquivoBaseDir, { recursive: true });

  let indiceContent = fs.existsSync(indicePath) ? fs.readFileSync(indicePath, 'utf8') : null;

  for (const fileName of toArchive) {
    // Extrair ano do prefixo (ex: 20261018 -> 2026)
    const yearMatch = fileName.match(/^(\d{4})/);
    const year = yearMatch ? yearMatch[1] : 'antigos';

    const yearDir = path.join(arquivoBaseDir, year);
    fs.mkdirSync(yearDir, { recursive: true });

    const srcPath = path.join(historicoDir, fileName);
    const destPath = path.join(yearDir, fileName);

    fs.renameSync(srcPath, destPath);

    // Atualizar link em INDICE.md se o arquivo existir
    if (indiceContent) {
      const oldLink = `historico/${fileName}`;
      const newLink = `historico/arquivo/${year}/${fileName}`;
      indiceContent = indiceContent.replaceAll(oldLink, newLink);
    }
  }

  if (indiceContent) {
    fs.writeFileSync(indicePath, indiceContent, 'utf8');
  }

  console.log(`${c.green}✔ ${toArchive.length} log(s) arquivado(s) com sucesso em .elefante/historico/arquivo/!${c.reset}`);
  console.log(`${c.green}✔ INDICE.md atualizado preservando todos os links históricos.${c.reset}\n`);
}
