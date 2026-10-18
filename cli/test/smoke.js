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

  console.log('\n🎉 TODOS OS TESTES DE FUMAÇA PASSARAM COM SUCESSO!\n');
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

