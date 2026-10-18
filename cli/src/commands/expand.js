import fs from 'node:fs';
import path from 'node:path';
import { c } from '../utils/colors.js';
import { runInit } from './init.js';

export async function runExpand(targetDir = process.cwd(), options = {}) {
  const agentsPath = path.join(targetDir, 'AGENTS.md');
  const elefanteDir = path.join(targetDir, '.elefante');

  if (fs.existsSync(elefanteDir) && !options.force) {
    console.log(`${c.yellow}⚠️ O projeto já possui a estrutura completa em .elefante/${c.reset}`);
    return true;
  }

  console.log(`\n${c.bold}🚀 Expandindo Elefante do Modo Lite para a Estrutura Modular Completa...${c.reset}\n`);

  // Detectar stack atual se estiver no AGENTS.md
  let stack = null;
  if (fs.existsSync(agentsPath)) {
    const content = fs.readFileSync(agentsPath, 'utf8');
    if (content.toLowerCase().includes('laravel')) stack = 'laravel';
    else if (content.toLowerCase().includes('django')) stack = 'django';
    else if (content.toLowerCase().includes('python')) stack = 'python';
    else if (content.toLowerCase().includes('next')) stack = 'nextjs';
  }

  // Executar init completo
  await runInit({ stack, targetDir, force: true });

  console.log(`${c.green}✔ Projeto expandido com sucesso!${c.reset}`);
  console.log(`${c.dim}A memória agora conta com governança completa (.elefante/01-ESTADO_ATUAL.md, 00-PRINCIPIOS.md, historico/).${c.reset}\n`);
  return true;
}
