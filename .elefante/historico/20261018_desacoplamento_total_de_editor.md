# Log de Desenvolvimento — Framework Elefante

- **Data:** 2026-10-18
- **Autor:** Antigravity / Pair Programming
- **Status:** Concluído
- **Tipo:** Arquitetura / Desacoplamento Universal

---

## 1. Contexto e Objetivo

Desvinculação total do Framework Elefante em relação ao Kiro IDE (ou qualquer outro editor específico). 
O Elefante foi concebido como um meta-framework agnóstico, mas acumulava artefatos e menções ao Kiro como se fosse uma dependência obrigatória.

O objetivo foi garantir que o Elefante funcione de forma 100% genérica, limpa e nativa em **qualquer editor** (VS Code, Cursor, Windsurf, JetBrains, Neovim, Claude Code, Terminal ou qualquer IDE).

---

## 2. Decisões Arquiteturais Tomadas

| ID | Tipo | Decisão | Motivo / Trade-off |
|---|---|---|---|
| D018 | [ADR] | Padrão Universal `AGENTS.md` e Remoção de Dependência de Editor | O protocolo de IA é padronizado no arquivo aberto `AGENTS.md` (na raiz e em `.agents/`). A pasta `.kiro/` foi completamente removida da raiz do Elefante e não é mais gerada por padrão nos novos projetos. |
| D019 | [ADR] | Geração de Adaptadores de Editor Sob Demanda | Adaptadores de editores específicos (Cursor `.cursor/`, Windsurf `.windsurfrules`, Kiro `.kiro/`, Copilot `.github/`) são gerados exclusivamente se o respectivo ambiente for detectado no projeto. |

---

## 3. O que foi feito

1. **Remoção de `.kiro/` da Raiz:**
   - Pasta `.kiro/` excluída do repositório base. A governança do Elefante agora se apoia em `AGENTS.md`, `.elefante/` e no Git Hook (`elefante check`).
2. **Refatoração do Gerador de Adaptadores (`adapters.js`):**
   - O único protocolo gerado por padrão na raiz é **`AGENTS.md`** (padrão universal aberto adotado pela indústria).
   - `CLAUDE.md` e adaptadores proprietários (Cursor, Windsurf, Copilot, Kiro) NÃO são criados por padrão; são gerados estritamente sob demanda caso a respectiva ferramenta/pasta já exista no projeto alvo.
3. **Auditoria de Documentação:**
   - `README.md` atualizado com destaque ao suporte universal e agnóstico de editores.
   - Remoção de qualquer menção a adaptadores específicos como se fossem obrigatórios na raiz.
   - FAQ refatorado esclarecendo a independência total de IDEs.
4. **Validação:**
   - Teste de `init` em pasta isolada comprovou que novos projetos recebem apenas `AGENTS.md` e `.elefante/`, com zero arquivos de editores proprietários forçados.

---

## 4. Arquivos Modificados / Criados

- `cli/src/utils/adapters.js` — Lógica agnóstica de adaptadores (apenas AGENTS.md por padrão).
- `cli/src/commands/init.js` — Passagem de agentes detectados e mensagem neutra.
- `cli/src/commands/status.js` e `doctor.js` — Inspeção neutra focada no protocolo AGENTS.md.
- `AGENTS.md` — Adotado na raiz do repositório como o único padrão universal aberto.
- `CLAUDE.md` — Removido da raiz para garantir neutralidade absoluta de fornecedor.
- `README.md` — Removidas referências forçadas e destacada neutralidade.
- `.elefante/01-ESTADO_ATUAL.md` — Decisões registradas e arquitetura v3.0 sincronizada.
- `.elefante/INDICE.md` — Indexação deste log.
