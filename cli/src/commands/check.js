import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { c } from '../utils/colors.js';

// Padrões de arquivos estruturais que exigem sincronização com o SSOT
const STRUCTURAL_PATTERNS = [
  /^app[\\/]/i,
  /^src[\\/]/i,
  /^database[\\/]/i,
  /^routes[\\/]/i,
  /^config[\\/]/i,
  /models?\.py$/i,
  /views?\.py$/i,
  /settings?\.py$/i,
  /urls?\.py$/i,
  /^api[\\/]/i,
  /^pages[\\/]/i
];

export function runCheck(targetDir = process.cwd(), options = {}) {
  const isStagedOnly = options.staged || false;
  const isInstallHook = options.installHook || false;

  // 1. Instalação do hook pre-commit se solicitado
  if (isInstallHook) {
    return installPreCommitHook(targetDir);
  }

  console.log(`\n${c.bold}🛡️  Framework Elefante — Verificação Pré-Commit (Check)${c.reset}`);
  console.log(`${c.dim}Alvo:${c.reset} ${targetDir}\n`);

  // Obter lista de arquivos alterados via git
  let changedFiles = [];
  try {
    const gitCmd = isStagedOnly
      ? 'git diff --cached --name-only'
      : 'git diff --name-only HEAD';
    const output = execSync(gitCmd, { cwd: targetDir, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
    if (output) {
      changedFiles = output.split(/[\r\n]+/).map(f => f.trim()).filter(Boolean);
    }
  } catch (err) {
    // Se não há commits anteriores ainda (HEAD inválido)
    try {
      const output = execSync('git status --porcelain', { cwd: targetDir, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
      if (output) {
        changedFiles = output.split(/[\r\n]+/).map(line => line.slice(3).trim()).filter(Boolean);
      }
    } catch {
      console.log(`${c.yellow}⚠️  Não foi possível executar comandos git. Verificação ignorada.${c.reset}`);
      return true;
    }
  }

  if (changedFiles.length === 0) {
    console.log(`${c.green}✔ Nenhuma alteração pendente para validar.${c.reset}\n`);
    return true;
  }

  // Filtrar arquivos estruturais modificados
  const structuralChanges = changedFiles.filter(file => {
    // Ignorar arquivos dentro do próprio .elefante
    if (file.startsWith('.elefante')) return false;
    return STRUCTURAL_PATTERNS.some(regex => regex.test(file));
  });

  const ssotChanged = changedFiles.some(f => f.includes('01-ESTADO_ATUAL.md') || f.includes('.elefante/historico/'));

  if (structuralChanges.length > 0 && !ssotChanged) {
    console.log(`${c.red}${c.bold}❌ BLOQUEIO DE INTEGRIDADE ARQUITETURAL${c.reset}`);
    console.log(`${c.yellow}Você modificou ${structuralChanges.length} arquivo(s) estruturais sem atualizar o SSOT do Elefante:${c.reset}`);
    structuralChanges.slice(0, 10).forEach(f => console.log(`  ${c.dim}↳ ${f}${c.reset}`));
    if (structuralChanges.length > 10) {
      console.log(`  ${c.dim}... e mais ${structuralChanges.length - 10} arquivo(s).${c.reset}`);
    }

    console.log(`\n${c.bold}Para manter a IA sincronizada com sua base de código:${c.reset}`);
    console.log(`  1. Atualize ${c.cyan}.elefante/01-ESTADO_ATUAL.md${c.reset} refletindo a mudança, ou`);
    console.log(`  2. Crie um log de sessão: ${c.cyan}npx @feyth/elefante log "descricao da alteracao"${c.reset}`);
    console.log(`  ${c.dim}(Para ignorar este bloqueio em emergências, use 'git commit --no-verify')${c.reset}\n`);

    return false;
  }

  console.log(`${c.green}✔ Governança e integridade preservadas:${c.reset}`);
  if (structuralChanges.length > 0 && ssotChanged) {
    console.log(`  - ${structuralChanges.length} arquivo(s) estrutural(is) alterado(s)`);
    console.log(`  - SSOT / Histórico devidamente atualizado no mesmo commit.`);
  } else {
    console.log(`  - Nenhuma alteração estrutural não-documentada detectada.`);
  }
  console.log('');
  return true;
}

export function installPreCommitHook(targetDir = process.cwd()) {
  const gitDir = path.join(targetDir, '.git');
  if (!fs.existsSync(gitDir)) {
    console.log(`${c.red}❌ Nenhum repositório Git (.git/) encontrado em:${c.reset} ${targetDir}`);
    return false;
  }

  const hooksDir = path.join(gitDir, 'hooks');
  if (!fs.existsSync(hooksDir)) {
    fs.mkdirSync(hooksDir, { recursive: true });
  }

  const preCommitPath = path.join(hooksDir, 'pre-commit');

  // Script shell compatível com Linux, macOS e Windows (Git Bash / WSL / MSYS)
  const hookScript = `#!/usr/bin/env sh
# Hook pre-commit gerado pelo Framework Elefante v3.0

if command -v node >/dev/null 2>&1; then
  # Se o CLI estiver instalado no projeto ou localmente
  if [ -f "cli/bin/elefante.js" ]; then
    node cli/bin/elefante.js check --staged
  else
    npx @feyth/elefante check --staged
  fi
  RESULT=$?
  if [ $RESULT -ne 0 ]; then
    exit 1
  fi
fi

exit 0
`;

  fs.writeFileSync(preCommitPath, hookScript, { mode: 0o755 });
  console.log(`\n${c.green}✔ Hook de pre-commit instalado com sucesso em:${c.reset} ${c.bold}.git/hooks/pre-commit${c.reset}`);
  console.log(`${c.dim}A partir de agora, o Git bloqueará commits de código estrutural sem atualização do SSOT.${c.reset}\n`);
  return true;
}
