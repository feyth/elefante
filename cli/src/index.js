import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { c } from './utils/colors.js';
import { runInit } from './commands/init.js';
import { runStatus } from './commands/status.js';
import { runDoctor } from './commands/doctor.js';
import { runLog } from './commands/log.js';

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
                      Opções: ${c.dim}--plan (apenas visualiza), --force, --target=<dir>${c.reset}

  ${c.green}status${c.reset}              Exibe resumo do SSOT, módulos e adaptadores de IA ativos.
  ${c.green}doctor${c.reset}              Audita placeholders, saúde do SSOT e segredos expostos.
  ${c.green}log${c.reset} <título>        Cria um novo log em .elefante/historico/ e atualiza INDICE.md.
  ${c.green}help${c.reset}                Exibe esta mensagem de ajuda.
  ${c.green}version${c.reset}             Exibe a versão instalada do framework.

${c.bold}EXEMPLOS:${c.reset}
  ${c.dim}# Inicialização interativa com detecção automática de stack:${c.reset}
  ${c.cyan}npx @feyth/elefante init${c.reset}

  ${c.dim}# Simular inicialização sem alterar nenhum arquivo:${c.reset}
  ${c.cyan}npx @feyth/elefante init laravel --plan${c.reset}

  ${c.dim}# Diagnóstico de integridade do projeto:${c.reset}
  ${c.cyan}npx @feyth/elefante doctor${c.reset}

  ${c.dim}# Criar log de sessão concluída:${c.reset}
  ${c.cyan}npx @feyth/elefante log "refatoracao da camada de servico"${c.reset}
`);
}

export function main(args = process.argv.slice(2)) {
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

  switch (command) {
    case 'init': {
      printBanner();
      const stack = args[1] && !args[1].startsWith('-') ? args[1] : null;
      runInit({
        stack,
        targetDir,
        plan: isPlan,
        force: isForce
      });
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

    case 'log': {
      const title = args.slice(1).filter(a => !a.startsWith('-')).join(' ');
      runLog(title, targetDir);
      break;
    }

    default:
      console.log(`${c.red}Comando desconhecido: "${command}"${c.reset}`);
      console.log(`Use ${c.cyan}elefante help${c.reset} para ver todos os comandos disponíveis.`);
      process.exitCode = 1;
      break;
  }
}
