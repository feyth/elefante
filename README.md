# 🐘 Framework Elefante

> **Memória declarativa, governança contínua e redução de amnésia de contexto para desenvolvimento com IA.**

O Framework Elefante organiza o contexto do projeto em uma estrutura minimalista e agnóstica. Ele estabelece princípios arquiteturais invioláveis, um Estado Atual único (SSOT) e um catálogo de armadilhas conhecidas, integrando-se nativamente a qualquer editor ou agente de IA através de padrões abertos.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-3.0.0-green.svg)](docs/CHANGELOG.md)
[![Status: Active](https://img.shields.io/badge/status-active-blue.svg)](docs/ROADMAP.md)

---

## 🎯 Inicialização Rápida

Você pode inicializar o Elefante no seu projeto de duas formas simples:

### Opção A: Via Pasta Única (`template/`) — Sem Node.js
Se preferir não usar o terminal:
1. Copie a pasta **[`template/`](template/)** para a raiz do seu projeto e renomeie-a para **`.elefante`** *(copie apenas essa pasta; nada mais é necessário)*.
2. Abra o chat com o seu assistente de IA (Cursor, VS Code, Windsurf, Claude Code, etc.) e envie:
   ```
   #elefante leia setup_elefante.json e configure este projeto
   ```
   *(ou: `leia .elefante/setup_elefante.json e configure este projeto`)*
3. A IA copia o protocolo **`AGENTS.md`** para a raiz automaticamente, analisa os arquivos do seu repositório (`composer.json`, `package.json`, etc.), faz 2 perguntas rápidas de alinhamento e calibra o SSOT.

---

### Opção B: Via CLI Oficial (Node.js >= 18)
Se preferir o terminal:
```bash
# 1. Inicialize o Elefante (detecta stack e gera o protocolo AGENTS.md):
npx @feyth/elefante init

# 2. Ative a verificação determinística pré-commit no Git:
npx @feyth/elefante check --install-hook

# 3. Inicie uma tarefa no seu editor:
#elefante crie o fluxo de autenticação com JWT
```
*(Nota: O CLI também pode ser executado localmente via `node cli/bin/elefante.js <comando>`)*.

---

## 💡 Por Que Usar?

### Sem o Elefante ❌
```
Você: "Crie uma API de pagamentos"

IA: *Lê dezenas de arquivos dispersos*
    *Consome 20.000+ tokens de contexto sem foco*
    *Ignora padrões arquiteturais estabelecidos*
    *Mistura regras de negócio em controllers/views*
    *Não documenta alterações nem atualiza dependências*
```

### Com o Elefante v3.0 ✅
```
Você: "#elefante crie uma API de pagamentos"

IA: *Lê os arquivos curados em .elefante/ (Princípios, SSOT, Regras)*
    *Respeita a arquitetura definida (ex: Controller -> Action -> Service)*
    *Evita armadilhas já mapeadas no catálogo histórico*
    *Atualiza o SSOT (01-ESTADO_ATUAL.md) ao modificar arquivos estruturais*
    *Registra decisões com IDs rastreáveis (D001 [TIPO])*
```

---

## 🛠️ Comandos do CLI Oficial

O CLI oficial do Elefante não possui dependências externas pesadas e disponibiliza ferramentas para auditoria, governança e transição:

| Comando | Descrição |
|---|---|
| `npx @feyth/elefante init [stack]` | Inicializa o framework (suporta `laravel`, `django`, `python`, `nextjs` ou auto-detecção; flags `--lite`, `--plan`, `--force`). |
| `npx @feyth/elefante init --lite` | **Modo Ultra-Leve:** gera apenas 1 arquivo `AGENTS.md` na raiz, com zero pastas e zero burocracia para protótipos ou scripts. |
| `npx @feyth/elefante expand` | Converte um projeto em modo lite para a estrutura completa e modular `.elefante/` sob demanda. |
| `npx @feyth/elefante brief` | Gera briefing cirúrgico de contexto (~350 tokens) para colar na IA evitando estouro de janela (suporta `--save`). |
| `npx @feyth/elefante status` | Exibe o resumo do SSOT, percentual de módulos concluídos e protocolo de IA ativo. |
| `npx @feyth/elefante doctor` | Diagnóstico profundo: placeholders pendentes, linter de orçamento de tokens, diluição de princípios MUST e scanner de segredos. |
| `npx @feyth/elefante check` | Verificação semântica: bloqueia alterações em código estrutural se o SSOT não for substancialmente atualizado ou mantiver placeholders. |
| `npx @feyth/elefante check --install-hook` | Instala hook de pre-commit no `.git/hooks/` para validação determinística semântica antes de cada commit. |
| `npx @feyth/elefante log "título"` | Gera um novo arquivo de log em `historico/` e auto-indexa no `INDICE.md`. |
| `npx @feyth/elefante compactar` | Arquiva logs antigos em `historico/arquivo/YYYY/` mantendo links do índice e reduzindo overhead. |
| `npx @feyth/elefante handoff "nota"` | Cria resumo de transição local em `.elefante/local/HANDOFF.md` para alternar entre diferentes IAs ou devs. |
| `npx @feyth/elefante migrar` | Converte bases legadas v2.x para a arquitetura modular v3.0 com backup prévio automático. |
| `npx @feyth/elefante export [formato]` | Exporta o contexto da memória: `okf` (Open Knowledge Format v0.2), `claude` (Claude Projects) ou `markdown`. |


---

## 📚 Como Funciona a Estrutura

```
seu-projeto/
├── .elefante/
│   ├── 00-PRINCIPIOS.md         # ⚖️ Princípios invioláveis (MUST/SHOULD)
│   ├── 01-ESTADO_ATUAL.md       # 🧠 SSOT: onde o projeto está agora (Módulos, Stack, Arquitetura)
│   ├── 02-REGRAS_E_CULTURA.md   # 📜 Padrões de código e armadilhas mapeadas
│   ├── setup_elefante.json      # 🤖 Assistente de onboarding guiado
│   ├── INICIAR.md               # 📖 Guia de inicialização em markdown
│   ├── hooks.yml                # 🔁 Hooks declarativos pré/pós tarefa
│   ├── modo.yml                 # ⚙️ Modo de overhead: lean / completo / strict
│   ├── QUICK-REFERENCE.md       # 📋 Consulta rápida de comandos
│   ├── INDICE.md                # 📑 Índice cronológico de decisões técnicas
│   └── historico/               # 📝 Logs de tarefas e decisões rastreáveis (D001 [TIPO])
│
└── AGENTS.md                    # 🌐 Protocolo universal aberto lido por qualquer editor/IA
```

### O Ciclo Operacional

```
1. Você inicia uma solicitação com o agente
   ↓
2. IA lê silenciosamente: 00-PRINCIPIOS.md e 01-ESTADO_ATUAL.md
   ↓
3. IA consulta: 02-REGRAS_E_CULTURA.md (evita armadilhas conhecidas)
   ↓
4. IA implementa o código seguindo as convenções da stack
   ↓
5. Ao tocar em arquivos estruturais, a IA atualiza o SSOT (01-ESTADO_ATUAL.md)
   ↓
6. O hook pré-commit (elefante check) valida a integridade antes do commit
```

---

## 🛡️ Governança e Validação do SSOT

Em sessões longas com IA, a perda de contexto (*context drift*) e a burocracia excessiva são riscos reais. O Elefante resolve isso em níveis proporcionais à escala do projeto:

### 1. Modo Lite vs. Modo Completo (Governança Proporcional)
- **Modo Lite (`init --lite`):** Gera apenas o arquivo `AGENTS.md` na raiz (zero pastas). A governança aqui é **comportamental** — a IA lê as instruções e respeita os princípios, ideal para scripts rápidos, MVPs e protótipos de 1 dia. Não há hooks pré-commit bloqueantes nem pastas adicionais.
- **Modo Completo (`init` ou `expand`):** Ativa a memória modular atômica (`.elefante/`) e a **governança determinística**, com validação semântica pré-commit, auditoria de integridade (`doctor`) e histórico cronológico rastreável.

### 2. Heurística da Validação Semântica (`elefante check`)
O hook pré-commit do Git (`elefante check --staged`) não é uma checagem superficial de arquivo tocado. Ele opera sob uma **heurística semântica determinística e transparente**:
1. **Detecção de Código Estrutural:** Identifica alterações em diretórios centrais de arquitetura (`app/`, `src/`, `database/`, `routes/`, `config/`, `api/`, `pages/`, `models.py`, etc.).
2. **Bloqueio de Burla Cosmética:** Inspeciona o `git diff` do SSOT (`01-ESTADO_ATUAL.md`). Commits contendo apenas espaços em branco, quebras de linha ou caracteres triviais (<8 caracteres alfanuméricos úteis adicionados) são **sumariamente rejeitados**.
3. **Bloqueio de Placeholders Pendentes:** Bloqueia commits se o SSOT contiver termos genéricos de template não preenchidos (`[PREENCHER]`, `[NOME DO SEU PROJETO]`, etc.).
4. **Resolução Válida:** O commit é liberado quando o SSOT reflete a documentação substantiva do módulo ou quando um novo log rastreável for registrado em `historico/`.

---

## 📊 Evidência Empírica e Resultados Preliminares

O Framework Elefante adota uma postura de engenharia transparente: *"preferimos medir antes de afirmar"*. Nos testes controlados do estudo piloto (5 tarefas sequenciais de arquitetura backend comparando Zero Context, Regras Estáticas Manuais e Elefante v3.0):

- **Redução de Desvio Arquitetural (ADR Drift):** **-40% de desvios** em relação a arquivos manuais estáticos (`AGENTS.md` básico).
- **Resiliência a Armadilhas:** **100% de prevenção** de erros já catalogados (contra 50% em regras estáticas e 0% sem contexto).
- **Economia de Contexto de Entrada:** **~360 tokens** consumidos via `elefante brief` (redução de 57% frente a prompts de exploração cega de repositório).
- **Sincronia do SSOT pós-tarefas:** **100% auditado e atualizado**, garantido deterministicamente pelo hook de pre-commit.

> O protocolo experimental detalhado, taxonomia de métricas e cronograma do benchmark público completo de 20 tarefas com traces abertos estão documentados em [docs/BENCHMARK.md](docs/BENCHMARK.md).


---

## 🛠️ Stacks Suportadas

| Stack | Recursos Iniciais | Modo de Uso |
|---|---|---|
| **Laravel / PHP** | Actions, FormRequests, Migrations, Policies | `npx @feyth/elefante init laravel` ou [`stacks/laravel`](stacks/laravel/) |
| **Django / Python** | Services, Models, URLs, CBVs | `npx @feyth/elefante init django` ou [`stacks/django`](stacks/django/) |
| **Python / FastAPI / Flask** | Routers, Pydantic schemas, Dependency Injection | `npx @feyth/elefante init python` ou [`stacks/python`](stacks/python/) |
| **Next.js / React** | App Router, Server Actions, Componentes | `npx @feyth/elefante init nextjs` ou [`stacks/nextjs`](stacks/nextjs/) |
| **Universal / Outra Stack** | Template agnóstico pronto para qualquer ecossistema | Copiar pasta [`template/`](template/) |

---

## ❓ Perguntas Frequentes (FAQ)

### O prefixo `#elefante` é obrigatório em todo prompt?
**Não é obrigatório em editores modernos que indexam o `AGENTS.md`** (como Cursor, Windsurf, Claude Code e Antigravity). Esses ambientes carregam as instruções automaticamente no contexto do agente.
O prefixo `#elefante` é recomendado em:
1. Interfaces web de chat (ChatGPT Web, Claude Web, Gemini Web) para sinalizar o protocolo;
2. Comandos operacionais especiais (`#elefante verificar`, `#elefante analisar`, `#elefante configurar`).

### Preciso de uma IDE ou ferramenta proprietária específica?
**Não.** O Elefante é 100% agnóstico. Não depende de plugins de editores específicos nem de serviços proprietários. Opera inteiramente com Markdown, YAML, Git e Node.js opcional.

### O que é o padrão OKF v0.2?
O *Open Knowledge Format (OKF)* é uma proposta de especificação aberta para representação e intercâmbio de conhecimento técnico entre ferramentas de IA. O comando `elefante export okf` empacota a memória do projeto em um manifesto padronizado para fácil consumo por sistemas de RAG e agentes externos.

### O pacote `@feyth/elefante` está no npm?
O código da CLI reside no diretório [`cli/`](cli/) deste repositório e pode ser executado diretamente com `node cli/bin/elefante.js`. Para consumo via `npx @feyth/elefante`, a publicação é realizada no escopo `@feyth` no registro oficial do npm.

### Onde estão as evidências empíricas de ganho de produtividade?
Preferimos medir com transparência antes de fazer alegações definitivas. O protocolo formal de avaliação e testes controlados está documentado em **[`docs/BENCHMARK.md`](docs/BENCHMARK.md)**.

---

## 📖 Documentação Central

- [Central de Documentação](docs/README.md)
- [Guia Completo de Uso](docs/GUIA-DE-USO.md)
- [Protocolo de Avaliação e Benchmark](docs/BENCHMARK.md)
- [Roadmap de Engenharia v3.0](docs/ROADMAP.md)
- [Histórico de Mudanças (Changelog)](docs/CHANGELOG.md)

---

## 📜 Licença

Distribuído sob a licença MIT. Consulte [LICENSE](LICENSE) para mais detalhes.

Desenvolvido por [Feyth Tecnologia](https://www.feyth.com.br).
