import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { runInit } from '../src/commands/init.js';
import { runDoctor } from '../src/commands/doctor.js';
import { runCheck } from '../src/commands/check.js';
import { runBrief } from '../src/commands/brief.js';
import { runExpand } from '../src/commands/expand.js';

console.log('🧪 Iniciando teste de fumaça (smoke test) do Framework Elefante...');

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'elefante-smoke-'));

try {
  console.log(`📁 Diretório temporário: ${tempDir}`);

  // 1. Testar init com stack laravel
  console.log('1. Executando init laravel...');
  await runInit({ stack: 'laravel', targetDir: tempDir });

  // Validar se arquivos essenciais foram criados
  const ssotPath = path.join(tempDir, '.elefante', '01-ESTADO_ATUAL.md');
  const agentsPath = path.join(tempDir, 'AGENTS.md');
  const setupPath = path.join(tempDir, '.elefante', 'setup_elefante.json');

  if (!fs.existsSync(ssotPath)) throw new Error('Falha: .elefante/01-ESTADO_ATUAL.md não foi criado!');
  if (!fs.existsSync(agentsPath)) throw new Error('Falha: AGENTS.md não foi criado na raiz!');
  if (!fs.existsSync(setupPath)) throw new Error('Falha: setup_elefante.json não foi criado em .elefante!');
  console.log('✔ Init gerou os arquivos com sucesso a partir dos assets.');

  // 2. Testar brief
  console.log('2. Executando brief com salvamento...');
  const briefOk = runBrief(tempDir, { save: true });
  if (!briefOk) throw new Error('Falha: runBrief falhou!');
  if (!fs.existsSync(path.join(tempDir, '.elefante', 'BRIEF.md'))) throw new Error('Falha: .elefante/BRIEF.md não foi gerado!');
  console.log('✔ Brief gerado e salvo com sucesso.');

  // 3. Testar doctor
  console.log('3. Executando doctor...');
  const doctorOk = runDoctor(tempDir);
  if (!doctorOk) throw new Error('Falha: runDoctor falhou no projeto recém-inicializado!');
  console.log('✔ Doctor validou o projeto inicializado com sucesso.');

  // 4. Testar check
  console.log('4. Executando check...');
  const checkOk = runCheck(tempDir);
  if (!checkOk) throw new Error('Falha: runCheck falhou!');
  console.log('✔ Check aprovado com sucesso.');

  // 5. Testar init --lite e expand em outro diretório
  const liteDir = fs.mkdtempSync(path.join(os.tmpdir(), 'elefante-lite-'));
  try {
    console.log('5. Executando init --lite...');
    await runInit({ stack: 'python', targetDir: liteDir, lite: true });
    if (!fs.existsSync(path.join(liteDir, 'AGENTS.md'))) throw new Error('Falha: AGENTS.md não foi gerado no modo lite!');
    if (fs.existsSync(path.join(liteDir, '.elefante'))) throw new Error('Falha: Diretório .elefante não deveria existir no modo lite!');
    console.log('✔ Modo Lite gerou apenas 1 arquivo com zero pastas.');

    console.log('6. Executando expand a partir do modo lite...');
    await runExpand(liteDir);
    if (!fs.existsSync(path.join(liteDir, '.elefante', '01-ESTADO_ATUAL.md'))) throw new Error('Falha: expand não gerou a estrutura completa!');
    console.log('✔ Expand desmembrou com sucesso a memória atômica completa.');
  } finally {
    fs.rmSync(liteDir, { recursive: true, force: true });
  }

  // 7. Teste de Validação Semântica do Check (Simulação Git Real)
  const gitTestDir = fs.mkdtempSync(path.join(os.tmpdir(), 'elefante-git-'));
  try {
    const { execSync } = await import('node:child_process');
    console.log('7. Executando teste controlado de validação semântica com Git...');

    execSync('git init', { cwd: gitTestDir, stdio: 'ignore' });
    execSync('git config user.email "test@elefante.dev"', { cwd: gitTestDir, stdio: 'ignore' });
    execSync('git config user.name "Elefante Test"', { cwd: gitTestDir, stdio: 'ignore' });

    // Inicializa projeto no repo git
    await runInit({ stack: 'laravel', targetDir: gitTestDir });

    // Limpa placeholders iniciais para criar baseline limpa
    const ssotFile = path.join(gitTestDir, '.elefante', '01-ESTADO_ATUAL.md');
    let ssotContent = fs.readFileSync(ssotFile, 'utf8')
      .replace(/\[NOME DO SEU PROJETO AQUI\]/g, 'E-commerce Test')
      .replace(/\[VERSÃO\]/g, '11.0')
      .replace(/\[DATA AQUI\]/g, '2026-10-18');
    fs.writeFileSync(ssotFile, ssotContent, 'utf8');

    // Cria arquivo estrutural inicial
    fs.mkdirSync(path.join(gitTestDir, 'app', 'Models'), { recursive: true });
    fs.writeFileSync(path.join(gitTestDir, 'app', 'Models', 'User.php'), '<?php class User {}', 'utf8');

    execSync('git add -A', { cwd: gitTestDir, stdio: 'ignore' });
    execSync('git commit -m "chore: initial commit"', { cwd: gitTestDir, stdio: 'ignore' });

    // 7.1 Modifica arquivo estrutural SEM tocar no SSOT -> DEVE FALHAR
    fs.writeFileSync(path.join(gitTestDir, 'app', 'Models', 'User.php'), '<?php class User { public $id; }', 'utf8');
    const failNoSSOT = runCheck(gitTestDir);
    if (failNoSSOT !== false) throw new Error('Falha: runCheck deveria ter bloqueado modificação estrutural sem SSOT!');
    console.log('  ✔ Bloqueou alteração estrutural sem alteração no SSOT.');

    // 7.2 Toca o SSOT com alteração cosmética (espaços/ponto) -> DEVE FALHAR
    fs.appendFileSync(ssotFile, '\n   .\n', 'utf8');
    const failCosmetic = runCheck(gitTestDir);
    if (failCosmetic !== false) throw new Error('Falha: runCheck deveria ter bloqueado alteração cosmética no SSOT!');
    console.log('  ✔ Bloqueou burla cosmética (espaços/pontos no SSOT).');

    // 7.3 Toca o SSOT com placeholders genéricos -> DEVE FALHAR
    fs.appendFileSync(ssotFile, '\n- [PREENCHER] Nova feature pendente\n', 'utf8');
    const failPlaceholder = runCheck(gitTestDir);
    if (failPlaceholder !== false) throw new Error('Falha: runCheck deveria ter bloqueado SSOT com [PREENCHER]!');
    console.log('  ✔ Bloqueou SSOT com placeholders genéricos não resolvidos.');

    // 7.4 Toca o SSOT com documentação substantiva real -> DEVE PASSAR
    // Remove o placeholder e adiciona entrada real
    const cleanSSOT = fs.readFileSync(ssotFile, 'utf8').replace(/\[PREENCHER\] Nova feature pendente/g, '');
    fs.writeFileSync(ssotFile, cleanSSOT + '\n| Módulo Usuários | Campo ID implementado no User Model | ✅ Concluído |\n', 'utf8');
    const passReal = runCheck(gitTestDir);
    if (passReal !== true) throw new Error('Falha: runCheck deveria ter aprovado SSOT com documentação substantiva!');
    console.log('  ✔ Aprovou com sucesso após documentação técnica substantiva.');

  } finally {
    fs.rmSync(gitTestDir, { recursive: true, force: true });
  }

  console.log('\n🎉 TODOS OS TESTES DE FUMAÇA E GOVERNANÇA PASSARAM COM SUCESSO!\n');
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}


