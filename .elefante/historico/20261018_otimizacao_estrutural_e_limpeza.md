# Log de Desenvolvimento — Framework Elefante

- **Data:** 2026-10-18
- **Autor:** Antigravity / Pair Programming
- **Status:** Concluído
- **Tipo:** Refactor / Otimização Estrutural

---

## 1. Contexto e Objetivo

Auditoria de usabilidade e organização do repositório. A raiz acumulava 21 itens devido à coexistência de templates monolíticos legados da v2 (`.mestre-*`) com os novos módulos da v3 (`core/` e `stacks/`), além de múltiplos documentos markdown soltos.

O objetivo foi reduzir ao máximo o ruído visual, centralizar a documentação detalhada e auditar o funcionamento da instalação inicial.

---

## 2. Decisões Arquiteturais Tomadas

| ID | Tipo | Decisão | Motivo / Trade-off |
|---|---|---|---|
| D016 | [REFACTOR] | Centralização de Documentação em `docs/` e Arquivamento em `legado/` | Redução drástica da raiz do repositório para apenas 3 arquivos (`README.md`, `LICENSE`, `.gitignore`) e pastas modulares ativas (`cli/`, `core/`, `stacks/`, `docs/`, `legado/`). |
| D017 | [FIX] | Suporte Rígido a `--target` e Proteção Anti-Sobrescrita no CLI | O comando `elefante init` respeita o diretório alvo e bloqueia inicializações acidentais sobre projetos que já possuem `.elefante/` sem a flag `--force`. |

---

## 3. O que foi feito

1. **Centralização de Documentação em `docs/`:**
   - Movidos `GUIA-DE-USO.md`, `ROADMAP-3.0.md` (como `ROADMAP.md`), `CHANGELOG-FRAMEWORK.md` (como `CHANGELOG.md`) e `INICIAR.md` (como `INICIAR-LEGADO.md`).
   - Criado `docs/README.md` como índice geral da documentação técnica.
   - Eliminado `README-ELEFANTE.md` (duplicata redundante).
2. **Arquivamento de Legado em `legado/`:**
   - Movidos `.mestre-laravel`, `.mestre-django`, `.mestre-python` e `.mestre-nextjs` para `legado/mestres/`.
   - Movido script Windows antigo `elefante.ps1` para `legado/elefante.ps1`.
   - Criado `legado/README.md` esclarecendo o papel histórico desses arquivos.
3. **Mapeamento de Assets:**
   - `setup_elefante.json` movido para `core/setup_elefante.json`.
4. **Auditoria da Instalação Inicial:**
   - Testada inicialização em ambiente limpo: geração completa de adaptadores (`.agents/`, `CLAUDE.md`, `.cursor/`, `GEMINI.md`, `.kiro/`), SSOT, princípios e histórico inicial.
   - Validação com `elefante doctor` e `elefante status`.

---

## 4. Arquivos Modificados / Criados

- `docs/*` — Central de documentação organizada.
- `legado/*` — Arquivamento histórico de artefatos v2.
- `README.md` — Links atualizados para `docs/`.
- `cli/src/commands/init.js` — TargetDir corrigido e proteção de sobrescrita.
- `.elefante/01-ESTADO_ATUAL.md` — Árvore de diretórios e decisões D016-D017 registradas.
- `.elefante/INDICE.md` — Indexação deste log.
