# 🗺️ Roadmap Framework Elefante v3.0

> Documento oficial de evolução arquitetural do **Framework Elefante 🐘**.  
> Baseado no estudo comparativo com [ai-memory](https://github.com/akitaonrails/ai-memory) e aprovado pela engenharia.

---

## 🎯 Visão Estratégica

O **Elefante** é uma **camada de memória declarativa e curada** (princípios, regras por stack, decisões arquiteturais justificadas e armadilhas reais).

Enquanto ferramentas de infraestrutura (como o *ai-memory*) capturam histórico episódico bruto via hooks de processo e indexam em banco vetorial/SQLite, o Elefante garante que a IA sempre **respeite as leis e padrões do projeto** desde o primeiro prompt, com **zero dependências e zero aprisionamento**.

Os dois mundos se complementam: o Elefante 3.0 adota o formato padrão **OKF v0.2 (Open Knowledge Format)** para que qualquer ferramenta ou agente consiga ler sua base de conhecimento.

---

## 🧭 Decisões Arquiteturais Consolidadas (v3.0)

1. **Linguagem do CLI Oficial:** **Node.js** (`npx elefante init`, `npx elefante check`, `npx elefante brief`).  
   - *Por quê:* Multiplataforma nativa (Windows, Linux, macOS), sem necessidade de instalar binários compilados pesados, executável com um comando via NPX.

2. **Compatibilidade e Transição:** **Migração Automática** (`elefante migrar`).  
   - Converte automaticamente projetos na v2.3 (tabelas em arquivos monolíticos) para a estrutura atômica da v3.0, sem quebrar bases existentes.

3. **Posicionamento de Mercado:** **Camada Curada Complementar**.  
   - Foco em princípios inegociáveis, convenções de stack, árvore de decisões (ADRs) e catálogo de armadilhas. Exportável para OKF v0.2.

---

## 🚀 Fases de Implementação

### 🟢 Fase 0 — Correção e Estabilização (v2.4) [CONCLUÍDA]
- [x] Corrigir comandos de instalação (`cp -r .mestre-*/*` que ignorava pastas ocultas `.elefante`, `.agents`, `.kiro`).
- [x] Refatorar `elefante.ps1 init` para aceitar stacks (`laravel`, `django`, `python`, `nextjs`) e copiar `.kiro/`.
- [x] Sincronizar templates dos 4 mestres (`_TEMPLATE_LOG.md` com IDs `D001 [TIPO]` e Handoffs; criar `INDICE.md` no Laravel).
- [x] Criar arquivo `LICENSE` (MIT) e remover links quebrados.
- [x] Atualizar `setup_elefante.json` para v2.4.
- [x] Remover números e depoimentos sem comprovação empírica, substituindo por compromisso com benchmark auditável.

---

### 🟡 Fase 1 — Fundação & Novo CLI Multiplataforma (Node.js)
- [ ] Criar pacote `@feyth/elefante` (ou CLI standalone em `cli/` no monorepo).
- [ ] `elefante init [stack]`:
  - Detecção automática de IDEs/Agentes instalados (Claude Code, Cursor, Windsurf, Kiro, Antigravity, VS Code).
  - Geração automática de adaptadores: `AGENTS.md` (padrão agnóstico), `CLAUDE.md`, `.cursor/rules/elefante.mdc`, `GEMINI.md`, `.kiro/steering/`.
  - Flag `--plan` (simulação dry-run sem alterar disco) e execução idempotente.
- [ ] `elefante doctor`:
  - Verificação determinística de integridade: checa placeholders `[PREENCHER]`, links quebrados, SSOT desatualizado (>7 dias), divergência de regras e vazamento acidental de tokens/segredos.
- [ ] Reestruturação do repositório em `core/` (arquivos universais) + `stacks/` (apenas o que varia por stack), eliminando duplicação de templates.

---

### 🟠 Fase 2 — Memória Atômica & Orçamento de Contexto
- [ ] **Briefing Dinâmico com Orçamento (`BRIEF.md`):**
  - Gerador que condensa o contexto crítico em até 4.000 caracteres (princípios MUST, stack, módulos ativos, armadilhas fixadas e handoff aberto).
  - Redução drástica de consumo de contexto: de ~10.000 tokens para ~1.500 tokens por tarefa.
- [ ] **Páginas Atômicas com Frontmatter (OKF v0.2):**
  - Migrar tabelas embutidas para arquivos individuais:
    - `.elefante/decisoes/D001-nome.md` (status: ativa/substituida, tags, justificativa).
    - `.elefante/armadilhas/A001-nome.md` (como evitar, severidade).
    - `.elefante/procedimentos/deploy.md`.
- [ ] **Mecanismo de Supersede (Substituição Histórica):**
  - Decisões revertidas recebem `status: substituida` e `substituida_por: D00X`, garantindo rastreabilidade imutável no Git sem apagar o passado.
- [ ] **Handoff Tipado (`.elefante/local/HANDOFF.md`):**
  - Transição perfeita entre agentes diferentes (ex: pausar no Claude Code e retomar no Cursor/Antigravity): *Onde parei, o que falhou, o que está aberto, próximo comando*.
- [ ] **Comando `elefante migrar`:**
  - Utilitário de migração automática para bases v2.3.

---

### 🔵 Fase 3 — Garantias Determinísticas & Hooks Reais
- [ ] Hook de `pre-commit` no Git (`elefante check`):
  - Alerta bloqueante se arquivos estruturais (`app/`, `database/`, `routes/`, `models.py`) forem modificados sem atualização correspondente no SSOT ou log de tarefa.
- [ ] Integração com eventos de fim de sessão dos agentes (Claude Code `SessionEnd`, Kiro `Stop`):
  - Monta automaticamente o rascunho de handoff lendo `git diff --stat`.
- [ ] Comando `elefante compactar`:
  - Arquiva logs de sessões antigas para `arquivo/` preservando apenas os resumos no índice.

---

### 🟣 Fase 4 — Benchmark e Avaliação Empírica (Eval)
- [ ] Criação de projeto-exemplo de teste e bateria de 30 perguntas arquiteturais complexas.
- [ ] Benchmark comparativo auditável:
  - Taxa de acerto arquitetural com Elefante vs. sem Elefante.
  - Consumo real de tokens medido via proxy/SDK.
- [ ] Exportador OKF (`elefante export-okf`):
  - Empacota o conhecimento do Elefante para ingestão direta em qualquer ferramenta compatível com OKF v0.2 (como o *ai-memory*).

---

*Framework Elefante 🐘 — Feyth Tecnologia*
