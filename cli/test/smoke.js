import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { runInit } from '../src/commands/init.js';
import { runDoctor } from '../src/commands/doctor.js';
import { runCheck } from '../src/commands/check.js';

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

  // 2. Testar doctor
  console.log('2. Executando doctor...');
  const doctorOk = runDoctor(tempDir);
  if (!doctorOk) throw new Error('Falha: runDoctor falhou no projeto recém-inicializado!');
  console.log('✔ Doctor validou o projeto inicializado com sucesso.');

  // 3. Testar check
  console.log('3. Executando check...');
  const checkOk = runCheck(tempDir);
  if (!checkOk) throw new Error('Falha: runCheck falhou!');
  console.log('✔ Check aprovado com sucesso.');

  console.log('\n🎉 TODOS OS TESTES DE FUMAÇA PASSARAM COM SUCESSO!\n');
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
