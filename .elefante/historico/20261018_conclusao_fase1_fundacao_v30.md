# Log de Desenvolvimento — Framework Elefante

- **Data:** 2026-10-18
- **Autor:** Antigravity / Pair Programming
- **Status:** Concluído
- **Tipo:** Arquitetura / Fundação v3.0

---

## 1. Contexto e Objetivo

Conclusão da **Fase 1 (Fundação v3.0)** do Framework Elefante, conforme estabelecido no `ROADMAP-3.0.md` e aprofundado a partir do estudo comparativo com a ferramenta `ai-memory` (Akita on Rails).

O objetivo principal desta fase foi desmantelar a replicação monolítica dos sub-mestres legados (`.mestre-*`), introduzindo uma arquitetura modular moderna e desacoplada (`core/` universal + `stacks/` especializadas) e um CLI oficial em Node.js (`cli/`) com zero dependências externas para governança determinística.

---

## 2. Decisões Arquiteturais Tomadas

| ID | Tipo | Decisão | Motivo / Trade-off |
|---|---|---|---|
| D006 | [ADR] | CLI Node.js Oficial Zero-Dependências (`cli/`) | Execução multiplataforma instantânea via `npx @feyth/elefante` sem etapas de compilação ou vulnerabilidades de supply-chain npm. |
| D007 | [ADR] | Fronteira de Confiança (Trust Boundary) no adaptador de IA | Regras de stack e Princípios universais são injetados como INSTRUÇÕES soberanas; histórico de sessões e catálogo de armadilhas são tratados estritamente como DADOS/contexto passivo, prevenindo regressões ou alucinações a partir de decisões passadas. |
| D008 | [ADR] | Desacoplamento de Stacks (`core/` vs `stacks/`) | Centralização de `00-PRINCIPIOS.md`, hooks e templates OKF v0.2 em `core/`, eliminando a necessidade de manter múltiplos subtemplates duplicados. |
| D009 | [ADR] | Comandos determinísticos offline (`doctor`, `status`, `log`, `init`) | Auditoria de integridade do SSOT, detecção de segredos e indexação de histórico executadas diretamente pelo CLI sem custo ou latência de tokens de LLM. |

---

## 3. O que foi feito

### 3.1 Camada Core Universal (`core/`)
- Criado `core/00-PRINCIPIOS.md` com princípios inegociáveis de engenharia de software e governança de contexto.
- Criado `core/AGENTS.md` com especificação formal do fluxo de trabalho e definição explícita da **Fronteira de Confiança**.
- Estabelecidos templates atômicos compatíveis com OKF v0.2 em `core/templates/`:
  - `decisao.md` (ADR padrão)
  - `armadilha.md` (Catálogo estruturado de armadilhas)
  - `handoff.md` (Passagem de bastão entre sessões)
  - `log_tarefa.md` (Histórico de sessão)
- Criados `core/hooks.yml`, `core/modo.yml`, `core/QUICK-REFERENCE.md` e `core/DASHBOARD-ARQUITETURA.html`.

### 3.2 Camada de Stacks Desacopladas (`stacks/`)
- Estruturadas 4 stacks com regras estritas e manifestos de auto-detecção `detect.json`:
  - `stacks/laravel/`
  - `stacks/django/`
  - `stacks/python/`
  - `stacks/nextjs/`

### 3.3 CLI Multiplataforma (`cli/`)
- `cli/package.json`: v3.0.0-alpha.1, ESM nativo, zero dependências.
- `cli/bin/elefante.js`: executável com shebang multiplataforma.
- `cli/src/index.js`: roteador de comandos com banner ASCII e help contextual.
- `cli/src/utils/colors.js`: formatação de terminal com suporte híbrido (funções e interpolação) e fallback para `NO_COLOR`.
- `cli/src/utils/detector.js`: detecção automática de stacks (Laravel, Django, Python, Next.js) e agentes instalados (Antigravity, Cursor, Claude Code, Gemini CLI, Kiro, Copilot, Windsurf).
- `cli/src/utils/adapters.js`: gerador dinâmico de pontes de governança para qualquer agente presente.
- `cli/src/commands/init.js`: inicialização com suporte a `--plan`, flags interativas e cópia segura.
- `cli/src/commands/status.js`: visualização sintética do estado do projeto, stack, progresso de módulos e adaptadores.
- `cli/src/commands/doctor.js`: unit tests determinísticos de documentação, placeholders e scanner de vazamento de segredos (chaves OpenAI, tokens GitHub, chaves AWS, senhas hardcoded).
- `cli/src/commands/log.js`: assistente para criação de logs de sessão com sanitização de slug e auto-indexação em `INDICE.md`.

---

## 4. Arquivos Modificados / Criados

- `core/*` — Núcleo universal de princípios e templates.
- `stacks/*` — Regras específicas por ecossistema.
- `cli/*` — Implementação completa do CLI Node.js.
- `.elefante/01-ESTADO_ATUAL.md` — SSOT atualizado com novos módulos e decisões D006-D008.
- `.elefante/INDICE.md` — Indexação do novo log de histórico.

---

## 5. Próximos Passos (Handoff)

- [ ] Iniciar a **Fase 2 do Roadmap v3.0**:
  - Implementar comando `elefante migrar` no CLI para migração automática e não-destrutiva de projetos legados v2.3 para o layout v3.0.
  - Implementar comando `elefante export` para exportar a memória curada para formatos consumíveis por agentes externos (ex: contexto consolidado para Claude Projects ou cursorrules).
