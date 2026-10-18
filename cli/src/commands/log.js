import fs from 'node:fs';
import path from 'node:path';
import { c } from '../utils/colors.js';

export function runLog(title, targetDir = process.cwd(), options = {}) {
  const elefanteDir = path.join(targetDir, '.elefante');
  const historicoDir = path.join(elefanteDir, 'historico');

  if (!fs.existsSync(elefanteDir)) {
    console.log(`${c.red}❌ Diretório .elefante/ não encontrado em:${c.reset} ${targetDir}`);
    return;
  }

  if (!fs.existsSync(historicoDir)) {
    fs.mkdirSync(historicoDir, { recursive: true });
  }

  if (!title) {
    console.log(`${c.yellow}⚠️  Informe o título do log.${c.reset}`);
    console.log(`Exemplo: ${c.cyan}npx @feyth/elefante log "criacao do modulo de checkout"${c.reset}`);
    return;
  }

  // Obter data atual no formato YYYYMMDD
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}${mm}${dd}`;
  const humanDate = `${yyyy}-${mm}-${dd}`;

  // Sanitizar título para nome de arquivo
  const slug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

  const fileName = `${dateStr}_${slug}.md`;
  const targetPath = path.join(historicoDir, fileName);

  if (fs.existsSync(targetPath)) {
    console.log(`${c.yellow}⚠️  Arquivo já existe:${c.reset} ${fileName}`);
    return;
  }

  // Template do log
  const logContent = `# Log de Sessão: ${title}

- **Data:** ${humanDate}
- **Status:** Concluído
- **Tipo:** Feature / Refactor / Correção

---

## 1. Contexto e Objetivo

Descreva aqui o que motivou a sessão e qual o objetivo principal alcançado.

---

## 2. Decisões Arquiteturais Tomadas

| ID | Tipo | Decisão | Motivo / Trade-off |
|---|---|---|---|
| D001 | [ADR] | Exemplo: Adotado Redis para cache de sessão | Redução de latência no banco relacional |

---

## 3. O que foi feito

- [x] Item 1
- [x] Item 2
- [x] Item 3

---

## 4. Arquivos Modificados / Criados

- \`caminho/do/arquivo.ext\` — Descrição sucinta da alteração

---

## 5. Próximos Passos (Handoff)

- [ ] Próxima ação recomendada para a próxima sessão
- Execute \`#elefante verificar\` para certificar a convergência do SSOT.
`;

  fs.writeFileSync(targetPath, logContent, 'utf8');
  console.log(`\n${c.green}✅ Log criado com sucesso:${c.reset} ${c.bold}.elefante/historico/${fileName}${c.reset}`);

  // Atualizar INDICE.md automaticamente se existir
  const indicePath = path.join(elefanteDir, 'INDICE.md');
  if (fs.existsSync(indicePath)) {
    let indiceContent = fs.readFileSync(indicePath, 'utf8');
    const newEntry = `- [${humanDate} — ${title}](historico/${fileName})`;
    
    // Inserir antes ou no final da lista
    if (indiceContent.includes('## Histórico de Logs') || indiceContent.includes('## Logs')) {
      indiceContent = indiceContent.replace(/(## (?:Histórico de )?Logs[^\n]*\n)/i, `$1\n${newEntry}`);
    } else {
      indiceContent += `\n${newEntry}\n`;
    }
    fs.writeFileSync(indicePath, indiceContent, 'utf8');
    console.log(`${c.green}✅ INDICE.md atualizado automaticamente.${c.reset}\n`);
  } else {
    // Criar INDICE.md inicial
    const initialIndice = `# Índice de Logs e Decisões — Framework Elefante

## Logs de Sessão

- [${humanDate} — ${title}](historico/${fileName})
`;
    fs.writeFileSync(indicePath, initialIndice, 'utf8');
    console.log(`${c.green}✅ INDICE.md criado e indexado.${c.reset}\n`);
  }
}
