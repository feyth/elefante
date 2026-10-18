import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { c } from './utils/colors.js';
import { runInit } from './commands/init.js';
import { runStatus } from './commands/status.js';
import { runDoctor } from './commands/doctor.js';
import { runLog } from './commands/log.js';
import { runMigrate } from './commands/migrate.js';
import { runHandoff } from './commands/handoff.js';
import { runExport } from './commands/export.js';
import { runCheck, installPreCommitHook } from './commands/check.js';
import { runCompact } from './commands/compact.js';
import { runBrief } from './commands/brief.js';
import { runExpand } from './commands/expand.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ler versão do package.json
const pkgPath = path.resolve(__dirname, '../package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

export function printBanner() {
  console.log(`
${c.cyan}${c.bold}  ███████╗██╗     ███████╗███████╗ █████╗ ███╗   ██╗████████╗███████╗
  ██╔════╝██║     ██╔════╝██╔════╝██╔══██╗████╗  ██║╚══██╔══╝██╔════╝
  █████╗  ██║     █████╗  █████╗  ███████║██╔██╗ ██║   ██║   █████╗  
  ██╔══╝  ██║     ██╔══╝  ██╔══╝  ██╔══██║██║╚██╗██║   ██║   ██╔══╝  
  ███████╗███████╗███████╗██║     ██║  ██║██║ ╚████║   ██║   ███████╗
  ╚══════╝╚══════╝╚══════╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝${c.reset}
  ${c.dim}Framework Elefante v${pkg.version} — Memória e Governança Contínua para IAs${c.reset}
`);
}

export function printHelp() {
  printBanner();
  console.log(`${c.bold}USO:${c.reset}
  ${c.cyan}elefante${c.reset} <comando> [opções]
  ${c.cyan}npx @feyth/elefante${c.reset} <comando> [opções]

${c.bold}COMANDOS DISPONÍVEIS:${c.reset}
  ${c.green}init${c.reset} [stack]         Inicializa o framework no projeto atual.
                      Stacks: ${c.dim}laravel, django, python, nextjs (ou auto-detecção)${c.reset}
                      Opções: ${c.dim}--lite (apenas AGENTS.md), --plan, --force, --target=<dir>${c.reset}

  ${c.green}expand${c.reset}              Expande um projeto do Modo Lite (--lite) para a estrutura completa (.elefante/).
  ${c.green}brief${c.reset}               Gera resumo cirúrgico do contexto (~350 tokens) para colar na IA sem bloat.
                      Opções: ${c.dim}--save (grava em .elefante/BRIEF.md)${c.reset}

  ${c.green}status${c.reset}              Exibe resumo do SSOT, módulos e adaptadores de IA ativos.
  ${c.green}doctor${c.reset}              Audita placeholders, saúde do SSOT, orçamento de tokens e segredos.
  ${c.green}check${c.reset}               Verifica se código estrutural foi alterado sem atualizar SSOT.
                      Opções: ${c.dim}--staged (apenas staged), --install-hook (instala no Git)${c.reset}

  ${c.green}compactar${c.reset}           Arquiva sessões antigas em historico/ mantendo índice íntegro.
                      Opções: ${c.dim}--keep=N (padrão: 5), --plan${c.reset}

  ${c.green}log${c.reset} <título>        Cria um novo log em .elefante/historico/ e atualiza INDICE.md.
  ${c.green}migrar${c.reset}              Migra projetos v2.x para a arquitetura atômica v3.0 (suporta --plan).
  ${c.green}handoff${c.reset} [nota]       Gera resumo de transição em .elefante/local/HANDOFF.md para trocar de IA.
  ${c.green}export${c.reset} [formato]     Exporta contexto da memória: ${c.dim}markdown, claude, okf (OKF v0.2)${c.reset}
  ${c.green}help${c.reset}                Exibe esta mensagem de ajuda.
  ${c.green}version${c.reset}             Exibe a versão instalada do framework.

${c.bold}EXEMPLOS:${c.reset}
  ${c.dim}# Inicialização ultra-rápida (1 arquivo, zero burocracia):${c.reset}
  ${c.cyan}npx @feyth/elefante init --lite${c.reset}

  ${c.dim}# Gerar briefing cirúrgico para economizar contexto na IA:${c.reset}
  ${c.cyan}npx @feyth/elefante brief${c.reset}

  ${c.dim}# Instalar hook bloqueante de pre-commit no Git:${c.reset}
  ${c.cyan}npx @feyth/elefante check --install-hook${c.reset}

  ${c.dim}# Diagnóstico de integridade e orçamento de tokens:${c.reset}
  ${c.cyan}npx @feyth/elefante doctor${c.reset}
`);
}

export async function main(args = process.argv.slice(2)) {
  const command = args[0] || 'help';

  // Flags globais
  if (args.includes('--help') || args.includes('-h') || command === 'help') {
    printHelp();
    return;
  }

  if (args.includes('--version') || args.includes('-v') || command === 'version') {
    console.log(`v${pkg.version}`);
    return;
  }

  const parseOption = (prefix) => {
    const opt = args.find(a => a.startsWith(prefix));
    return opt ? opt.split('=')[1] : null;
  };

  const targetDir = parseOption('--target=') || process.cwd();
  const isPlan = args.includes('--plan');
  const isForce = args.includes('--force');
  const isLite = args.includes('--lite');

  switch (command) {
    case 'init': {
      printBanner();
      const stack = args[1] && !args[1].startsWith('-') ? args[1] : null;
      await runInit({
        stack,
        targetDir,
        plan: isPlan,
        force: isForce,
        lite: isLite
      });
      break;
    }

    case 'expand': {
      await runExpand(targetDir, { force: isForce });
      break;
    }

    case 'brief': {
      const isSave = args.includes('--save');
      runBrief(targetDir, { save: isSave });
      break;
    }

    case 'status': {
      runStatus(targetDir);
      break;
    }

    case 'doctor': {
      const ok = runDoctor(targetDir);
      if (!ok) process.exitCode = 1;
      break;
    }

    case 'check': {
      const isStaged = args.includes('--staged');
      const isInstall = args.includes('--install-hook') || args[1] === 'install-hook';
      const ok = runCheck(targetDir, { staged: isStaged, installHook: isInstall });
      if (!ok) process.exitCode = 1;
      break;
    }

    case 'compactar':
    case 'compact': {
      const keepVal = parseOption('--keep=') || args[1] || '5';
      runCompact(targetDir, { keep: keepVal, plan: isPlan });
      break;
    }

    case 'log': {
      const title = args.slice(1).filter(a => !a.startsWith('-')).join(' ');
      runLog(title, targetDir);
      break;
    }

    case 'migrar':
    case 'migrate': {
      runMigrate(targetDir, { plan: isPlan, force: isForce });
      break;
    }

    case 'handoff': {
      const note = args.slice(1).filter(a => !a.startsWith('-')).join(' ');
      runHandoff(note, targetDir);
      break;
    }

    case 'export':
    case 'export-okf': {
      const format = command === 'export-okf' ? 'okf' : (args[1] || 'markdown');
      runExport(format, targetDir);
      break;
    }

    default:
      console.log(`${c.red}Comando desconhecido: "${command}"${c.reset}`);
      console.log(`Use ${c.cyan}elefante help${c.reset} para ver todos os comandos disponíveis.`);
      process.exitCode = 1;
      break;
  }
}

