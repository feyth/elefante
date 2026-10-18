import fs from 'node:fs';
import path from 'node:path';
import { c } from '../utils/colors.js';

export function runDoctor(targetDir = process.cwd(), options = {}) {
  const elefanteDir = path.join(targetDir, '.elefante');

  console.log(`\n${c.bold}🩺 Framework Elefante — Diagnóstico de Saúde (Doctor)${c.reset}`);
  console.log(`${c.dim}Alvo:${c.reset} ${targetDir}\n`);

  if (!fs.existsSync(elefanteDir)) {
    console.log(`${c.red}❌ ERRO CRÍTICO:${c.reset} Diretório .elefante/ não existe.`);
    console.log(`Execute ${c.cyan}npx @feyth/elefante init${c.reset} para inicializar o framework.`);
    return false;
  }

  const issues = [];
  const warnings = [];
  const passes = [];

  // 1. Checar SSOT (01-ESTADO_ATUAL.md)
  const ssotPath = path.join(elefanteDir, '01-ESTADO_ATUAL.md');
  if (!fs.existsSync(ssotPath)) {
    issues.push({
      file: '.elefante/01-ESTADO_ATUAL.md',
      msg: 'Arquivo SSOT ausente. A IA não terá memória do estado atual do projeto.'
    });
  } else {
    const ssotContent = fs.readFileSync(ssotPath, 'utf8');

    // 1.1 Placeholders
    const placeholderRegex = /\[(PREENCHER|NOME\s+DO\s+PROJETO|SUA\s+URL|SUBSTITUA|INFORME|X\.X\.X)\]/gi;
    const placeholderMatches = ssotContent.match(placeholderRegex);
    if (placeholderMatches) {
      warnings.push({
        file: '.elefante/01-ESTADO_ATUAL.md',
        msg: `Contém ${placeholderMatches.length} placeholder(s) não preenchido(s): ${[...new Set(placeholderMatches)].join(', ')}`
      });
    } else {
      passes.push('SSOT sem placeholders genéricos pendentes');
    }

    // 1.2 Data de atualização
    const momentMatch = ssotContent.match(/[-*]\s*\*\*Data(?: da Implementação)?:\*\*\s*([^\n\r]+)/i) ||
                        ssotContent.match(/Última atualização[:\s]+([^\n\r]+)/i);
    let targetDateStr = momentMatch ? momentMatch[1].trim() : null;

    if (!targetDateStr) {
      const allDates = [...ssotContent.matchAll(/(\d{4}[-/]\d{2}[-/]\d{2})/g)].map(m => m[1]);
      if (allDates.length > 0) {
        // Pegar a maior data (mais recente)
        targetDateStr = allDates.sort().pop();
      }
    }

    if (targetDateStr) {
      const parsedDate = new Date(targetDateStr.replace(/(\d{2})[-/](\d{2})[-/](\d{4})/, '$3-$2-$1'));
      if (!isNaN(parsedDate.getTime())) {
        const diffDays = Math.round((Date.now() - parsedDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays > 14) {
          warnings.push({
            file: '.elefante/01-ESTADO_ATUAL.md',
            msg: `Última atualização registrada há ${diffDays} dias (${targetDateStr}). Considere atualizar o estado com '#elefante verificar'.`
          });
        } else {
          passes.push(`SSOT atualizado recentemente (${diffDays >= 0 ? `${diffDays}d atrás` : 'hoje'})`);
        }
      }
    } else {
      warnings.push({
        file: '.elefante/01-ESTADO_ATUAL.md',
        msg: 'Nenhuma data clara de atualização encontrada no cabeçalho do SSOT.'
      });
    }
  }

  // 2. Checar 00-PRINCIPIOS.md
  const principiosPath = path.join(elefanteDir, '00-PRINCIPIOS.md');
  if (!fs.existsSync(principiosPath)) {
    warnings.push({
      file: '.elefante/00-PRINCIPIOS.md',
      msg: 'Arquivo de Princípios Inegociáveis ausente. Recomendado para evitar desvios arquiteturais.'
    });
  } else {
    passes.push('00-PRINCIPIOS.md presente e configurado');
  }

  // 3. Checar 02-REGRAS_E_CULTURA.md
  const regrasPath = path.join(elefanteDir, '02-REGRAS_E_CULTURA.md');
  if (!fs.existsSync(regrasPath)) {
    issues.push({
      file: '.elefante/02-REGRAS_E_CULTURA.md',
      msg: 'Arquivo de Regras e Cultura ausente. Padrões de código e armadilhas não estão documentados.'
    });
  } else {
    passes.push('02-REGRAS_E_CULTURA.md ativo com catálogo de boas práticas e armadilhas');
  }

  // 4. Scanner de Segredos e Chaves de API expostas em .elefante/
  const secretPatterns = [
    { name: 'OpenAI API Key', regex: /sk-[a-zA-Z0-9T3BlbkFJ]{20,}/ },
    { name: 'GitHub Token', regex: /(ghp|gho|ghu|ghs|ghr)_[a-zA-Z0-9]{30,}/ },
    { name: 'AWS Access Key', regex: /(A3T[A-Z0-9]|AKIA|AGPA|AIDA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16}/ },
    { name: 'Private Key', regex: /-----BEGIN\s+(RSA|OPENSSH|EC|PGP)?\s*PRIVATE KEY-----/ },
    { name: 'Senha hardcoded', regex: /(senha|password|passwd|secret)\s*[:=]\s*["'][^"'\s]{6,}["']/i }
  ];

  function scanDirForSecrets(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDirForSecrets(fullPath);
      } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.yml') || entry.name.endsWith('.json'))) {
        const content = fs.readFileSync(fullPath, 'utf8');
        for (const pattern of secretPatterns) {
          if (pattern.regex.test(content)) {
            issues.push({
              file: path.relative(targetDir, fullPath),
              msg: `Possível vazamento de segredo detectado: ${pattern.name}!`
            });
          }
        }
      }
    }
  }

  scanDirForSecrets(elefanteDir);
  if (!issues.some(i => i.msg.includes('segredo'))) {
    passes.push('Nenhum segredo ou chave de API sensível exposta em .elefante/');
  }

  // 5. Checar adaptadores e referências (agnóstico de editor)
  const agentsToCheck = [
    { file: 'AGENTS.md', label: 'Universal (Padrão Aberto)' },
    { file: '.agents/AGENTS.md', label: 'Workspace Standard (Antigravity/Codex)' },
    { file: 'CLAUDE.md', label: 'Claude Code / Anthropic' },
    { file: '.cursor/rules/elefante.mdc', label: 'Cursor' },
    { file: '.windsurfrules', label: 'Windsurf' },
    { file: '.github/copilot-instructions.md', label: 'GitHub Copilot' }
  ];

  let adaptersFound = 0;
  for (const a of agentsToCheck) {
    const fullPath = path.join(targetDir, a.file);
    if (fs.existsSync(fullPath)) {
      adaptersFound++;
      const content = fs.readFileSync(fullPath, 'utf8');
      if (!content.includes('.elefante') && !content.includes('01-ESTADO_ATUAL.md')) {
        warnings.push({
          file: a.file,
          msg: `Adaptador existe mas não referencia '.elefante/01-ESTADO_ATUAL.md'`
        });
      }
    }
  }

  const hasUniversalAgents = fs.existsSync(path.join(targetDir, 'AGENTS.md')) || fs.existsSync(path.join(targetDir, '.agents', 'AGENTS.md'));
  if (hasUniversalAgents) {
    passes.push('Protocolo universal AGENTS.md presente e sincronizado com o SSOT');
  } else {
    warnings.push({
      file: 'AGENTS.md',
      msg: 'Arquivo de protocolo universal AGENTS.md ausente. Rode `elefante init --force` para gerá-lo.'
    });
  }

  // 6. Auditoria de Densidade de Contexto & Orçamento de Tokens (Anti-Burocracia)
  if (fs.existsSync(ssotPath)) {
    const ssotStats = fs.statSync(ssotPath);
    const ssotLines = fs.readFileSync(ssotPath, 'utf8').split('\n').length;
    const estTokens = Math.round(ssotStats.size / 3.8);

    if (ssotLines > 250 || ssotStats.size > 8192) {
      warnings.push({
        file: '.elefante/01-ESTADO_ATUAL.md',
        msg: `Alerta de Burocracia de Contexto: O SSOT possui ${ssotLines} linhas (~${estTokens} tokens). Mantenha o SSOT cirúrgico para evitar context bloat e desperdício de tokens.`
      });
    } else {
      passes.push(`Orçamento de contexto enxuto no SSOT: ${ssotLines} linhas (~${estTokens} tokens estimados)`);
    }
  }

  // 7. Checar diluição de princípios
  const princPath = path.join(elefanteDir, '00-PRINCIPIOS.md');
  if (fs.existsSync(princPath)) {
    const pContent = fs.readFileSync(princPath, 'utf8');
    const mustCount = (pContent.match(/\bMUST\b/g) || []).length;
    if (mustCount > 5) {
      warnings.push({
        file: '.elefante/00-PRINCIPIOS.md',
        msg: `Diluição de Atenção: ${mustCount} princípios MUST detectados. Mais de 5 regras inegociáveis diminuem a aderência do modelo. Deixe apenas as leis fundamentais.`
      });
    } else if (mustCount > 0) {
      passes.push(`Princípios MUST com foco cirúrgico (${mustCount} leis inegociáveis)`);
    }
  }

  // 8. Checar acúmulo de logs históricos não compactados
  const histDir = path.join(elefanteDir, 'historico');
  if (fs.existsSync(histDir)) {
    const rootLogs = fs.readdirSync(histDir).filter(f => f.endsWith('.md') && !f.startsWith('_'));
    if (rootLogs.length > 8) {
      warnings.push({
        file: '.elefante/historico/',
        msg: `Histórico acumulando ${rootLogs.length} logs na raiz. Execute 'npx @feyth/elefante compactar' para arquivar sessões antigas e economizar contexto.`
      });
    }
  }

  // Relatório Final
  passes.forEach(p => console.log(`  ${c.green}✅ [OK]${c.reset} ${p}`));

  if (warnings.length > 0) {
    console.log(`\n${c.bold}${c.yellow}Avisos a observar (${warnings.length}):${c.reset}`);
    warnings.forEach(w => console.log(`  ${c.yellow}⚠️  [AVISO]${c.reset} ${c.bold}${w.file}:${c.reset} ${w.msg}`));
  }

  if (issues.length > 0) {
    console.log(`\n${c.bold}${c.red}Erros críticos (${issues.length}):${c.reset}`);
    issues.forEach(i => console.log(`  ${c.red}❌ [ERRO]${c.reset} ${c.bold}${i.file}:${c.reset} ${i.msg}`));
  }

  console.log('\n' + '─'.repeat(50));
  if (issues.length === 0 && warnings.length === 0) {
    console.log(`${c.green}${c.bold}🎉 Saúde impecável! 100% em conformidade com o Framework Elefante v3.0.${c.reset}\n`);
    return true;
  } else if (issues.length === 0) {
    console.log(`${c.yellow}${c.bold}⚠️  Saudável com ressalvas. O framework funciona, mas recomenda-se resolver os avisos acima.${c.reset}\n`);
    return true;
  } else {
    console.log(`${c.red}${c.bold}❌ Correções necessárias antes de continuar com as tarefas de IA.${c.reset}\n`);
    return false;
  }
}
