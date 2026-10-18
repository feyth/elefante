# 🗺️ Roadmap Framework Elefante v3.0

> Documento oficial de evolução arquitetural do **Framework Elefante 🐘**.  
> Baseado no estudo comparativo com ferramentas de memória de IA e aprovado pela engenharia.

---

## 🎯 Visão Estratégica

O **Elefante** é uma **camada de memória declarativa e curada** (princípios, regras por stack, decisões arquiteturais justificadas e catálogo de armadilhas).

Enquanto ferramentas de infraestrutura capturam histórico episódico bruto via hooks de processo e indexam em banco vetorial, o Elefante garante que a IA sempre **respeite as leis e padrões do projeto** desde o primeiro prompt, com **zero dependências e zero aprisionamento de ferramentas**.

---

## 🧭 Decisões Arquiteturais Consolidadas (v3.0)

1. **Linguagem do CLI Oficial:** **Node.js** (`npx @feyth/elefante`).  
   - Multiplataforma nativa (Windows, Linux, macOS), executável instantaneamente sem runtimes compilados adicionais.
2. **Padrão Universal Único:** **`AGENTS.md`**  
   - Desacoplamento total de editores proprietários. Adaptadores específicos só são gerados se a respectiva pasta já existir no repositório.
3. **Pasta Única para Onboarding Manual:** **`template/`**  
   - Uma pasta limpa e autocontida que pode ser copiada diretamente para qualquer projeto sem necessidade de ferramentas de linha de comando.
4. **Governança Determinística:** **Git Hook (`elefante check`)**  
   - Bloqueio pré-commit de alterações estruturais sem sincronização do SSOT.
5. **Compatibilidade e Transição:** **Migração Não-Destrutiva (`elefante migrar`)**  
   - Converte automaticamente projetos v2.x para a arquitetura v3.0 com backup prévio.

---

## 🚀 Fases de Implementação

### 🟢 Fase 0 — Correção e Estabilização (v2.4) [CONCLUÍDA]
- [x] Corrigir comandos de instalação que ignoravam arquivos ocultos.
- [x] Sincronizar templates dos 4 mestres (`_TEMPLATE_LOG.md` com IDs `D001 [TIPO]`).
- [x] Criar arquivo `LICENSE` (MIT) e remover links quebrados.
- [x] Remover números e depoimentos sem comprovação empírica.

---

### 🟢 Fase 1 — Fundação, CLI Multiplataforma & Desacoplamento (v3.0) [CONCLUÍDA]
- [x] CLI oficial em `cli/` com comandos `init`, `status`, `doctor`, `log`, `check`, `migrar`, `handoff`, `export`, `compactar`.
- [x] Detecção automática de ambiente e geração sob demanda de adaptadores.
- [x] Adoção do padrão aberto universal `AGENTS.md` na raiz e remoção de qualquer amarração a ferramentas específicas.
- [x] Reestruturação do repositório em `core/` (universais), `stacks/` (desacopladas por tecnologia) e `template/` (pasta única limpa).
- [x] Diagnóstico `elefante doctor`: auditoria de placeholders, defasagem de datas, princípios MUST e segredos expostos.

---

### 🟢 Fase 2 — Memória Modular & Transição de Contexto (v3.0) [CONCLUÍDA]
- [x] **Templates Atômicos (OKF v0.2):** Formato padronizado para decisões (`decisao.md`), armadilhas (`armadilha.md`) e procedimentos.
- [x] **Handoff Tipado (`.elefante/local/HANDOFF.md`):** Transição de contexto local para alternar entre diferentes IAs ou desenvolvedores.
- [x] **Comando `elefante migrar`:** Migrador automático com backup para converter projetos v2.x para v3.0.
- [x] **Exportador OKF (`elefante export okf`):** Exportação de manifesto de contexto padronizado.

---

### 🟢 Fase 3 — Garantias Determinísticas & Governança (v3.0) [CONCLUÍDA]
- [x] **Hook de Pre-Commit no Git (`elefante check`):** Bloqueio determinístico se código estrutural for modificado sem atualização do SSOT ou log.
- [x] **Instalador de Hook (`elefante check --install-hook`):** Configura `.git/hooks/pre-commit` com um único comando.
- [x] **Comando `elefante compactar`:** Arquivamento cronológico de histórico em `historico/arquivo/YYYY/` mantendo links do índice.
- [x] **Onboarding de 1 Prompt:** Assistente guiado `setup_elefante.json` e `INICIAR.md` em `template/` e no core.

---

### 🟡 Fase 4 — Benchmark e Avaliação Empírica (Eval) [EM ANDAMENTO]
- [x] Protocolo formal de avaliação documentado em [**`docs/BENCHMARK.md`**](BENCHMARK.md).
- [ ] Construção do dataset padronizado de 20 tarefas sequenciais para teste controlado.
- [ ] Execução de testes A/B (com Elefante vs. sem Elefante) em modelos líderes (Claude, GPT-4o).
- [ ] Publicação do relatório oficial com métricas de drift arquitetural, taxa de armadilhas evitadas e consumo real de tokens.

---

*Framework Elefante 🐘 — Feyth Tecnologia*
