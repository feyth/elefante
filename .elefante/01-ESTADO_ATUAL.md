# Estado Atual do Sistema (Single Source of Truth)

> **Regra para a IA:** Se você precisar saber como o sistema está estruturado ou o que foi feito por último, a verdade absoluta está aqui. O que estiver no diretório `historico/` é passado.

## Informações do Projeto
- **Projeto:** Framework Elefante (Meta-framework de gestão de contexto para IA)
- **Stack:** Markdown + Node.js (CLI) + Git Hooks
- **Bibliotecas Chave:** Protocolo Universal AGENTS.md, Git, Node.js

## Arquitetura do Framework

### Estrutura de Diretórios

```
elefante/
├── cli/                          # CLI oficial multiplataforma (npx @feyth/elefante)
│   ├── bin/elefante.js
│   └── src/
├── core/                         # Núcleo universal de engenharia de contexto
│   ├── 00-PRINCIPIOS.md          # Princípios invioláveis (MUST/SHOULD)
│   ├── AGENTS.md                 # Protocolo com Fronteira de Confiança
│   ├── hooks.yml / modo.yml      # Automação de tarefas
│   └── templates/                # Templates atômicos (OKF v0.2)
├── stacks/                       # Regras desacopladas por ecossistema
│   ├── laravel/                  # detect.json + SSOT + Regras
│   ├── django/                   # detect.json + SSOT + Regras
│   ├── python/                   # detect.json + SSOT + Regras
│   └── nextjs/                   # detect.json + SSOT + Regras
├── docs/                         # Documentação detalhada centralizada
│   ├── GUIA-DE-USO.md
│   ├── ROADMAP.md
│   ├── CHANGELOG.md
│   └── INICIAR-LEGADO.md
├── .elefante/                    # Memória do próprio meta-framework
├── AGENTS.md                     # Protocolo Universal Aberto para qualquer IA/Editor
├── .gitignore
├── LICENSE
└── README.md                     # Apresentação oficial e guia rápido
```

## Módulos do Sistema

| Módulo | Propósito | Status |
|---|---|---|
| Core Universal (core/) | Princípios universais, hooks e templates OKF v0.2 | ✅ Implementado v3.0 |
| Stacks Desacopladas (stacks/) | Regras desacopladas (Laravel, Django, Python, Next.js) | ✅ Implementado v3.0 |
| CLI Node.js Oficial (cli/) | CLI zero-dependências (init, doctor, status, log, check, export) | ✅ Implementado v3.0 |
| Protocolo Universal (AGENTS.md) | Protocolo aberto e agnóstico de IA/Editor | ✅ Implementado v3.0 |
| Governança Determinística (Git Hook) | Validação pré-commit de integridade do SSOT (`elefante check`) | ✅ Implementado v3.0 |
| Princípios (00-PRINCIPIOS.md) | Leis invioláveis (MUST/SHOULD) | ✅ Criado no core e templates |
| Checklist de Saúde do SSOT | Testes de conformidade da documentação | ✅ Presente em 02-REGRAS |
| Hooks externos (hooks.yml) | Automação declarativa pré/pós tarefa | ✅ Criado no core e templates |
| Modo configurável (modo.yml) | lean / completo / strict | ✅ Criado no core e templates |
| Documentação & Roadmap | README, GUIA, ROADMAP.md centralizados | ✅ Atualizado v3.0 |

## Proteção Automática do SSOT (Arquitetura Universal v3.0)

A proteção do SSOT no Elefante v3.0 não depende de nenhum software, plugin ou IDE proprietária (Kiro, Claude, Cursor, etc.). Ela opera em duas camadas puristas:

### 1. Camada Comportamental (Prompt/Protocolo Universal)
- **`AGENTS.md`**: Definido na raiz do projeto segundo a convenção aberta da indústria. Instruções soberanas (Princípios e Regras) prevalecem sobre dados históricos (Trust Boundary).
- **Fronteira de Confiança**: A IA é orientada a ler `00-PRINCIPIOS.md`, `01-ESTADO_ATUAL.md` e `02-REGRAS_E_CULTURA.md` no início da tarefa, e executar o checklist de verificação obrigatória ao final antes de responder.

### 2. Camada Determinística (Git Hook Pré-Commit)
- **`elefante check`**: Script agnóstico executado no hook `.git/hooks/pre-commit`.
- **Bloqueio Real**: Se arquivos estruturais da stack (ex: `app/`, `database/`, `models.py`, `src/`) forem alterados sem modificação correspondente no SSOT (`.elefante/01-ESTADO_ATUAL.md`) ou adição de log de decisão em `historico/`, o commit é **rejeitado**.
- **Independência Total**: Funciona no terminal, no VS Code, no Cursor, no Git CLI ou em qualquer ferramenta de versionamento.

## Integrações Externas
> Framework é standalone, sem dependência de serviços externos.

| Ferramenta | Papel | Notas |
|---|---|---|
| Git | Versionamento e Governança | Hook pré-commit (`elefante check`) garante SSOT sempre atualizado |
| Qualquer Editor / IA | Pair Programming | Opera via protocolo universal aberto `AGENTS.md` |

## Decisões Arquiteturais

| Data | Decisão | Justificativa |
|---|---|---|
| 2026-08-12 | Adicionar proteção SSOT via .kiro/ | Resolver problema de esquecimento em sessões longas (compressão de contexto) |
| 2026-08-12 | Usar steering file com `inclusion: always` | Garantir regras persistem mesmo após compressão |
| 2026-08-12 | Hooks PostTaskExec + Stop | Automação de verificação sem depender de memória da IA |
| 2026-08-12 | REGRA #0 antes de todas as outras | Dar máxima prioridade visual à atualização do SSOT |
| 2026-08-12 | Verificação única por resposta | Prevenir loops infinitos em sessões com >30 tarefas |
| 2026-08-12 | Replicar melhorias em todos sub-frameworks | Garantir consistência entre Laravel/Django/Next.js |
| 2026-08-25 | Separar princípios invioláveis (00-PRINCIPIOS.md) | Princípios MUST distintos das regras operacionais — inspirado em "Constitution" do Spec Kit |
| 2026-08-25 | Checklist de Saúde do SSOT como "unit tests para docs" | Verificar qualidade da documentação, não do código — conceito do Spec Kit |
| 2026-08-25 | IDs rastreáveis em logs (D001 [TIPO]) | Rastreabilidade de decisões entre sessões |
| 2026-08-25 | Comandos #elefante verificar / analisar | Operações somente leitura para diagnóstico do SSOT — inspirado em converge/analyze do Spec Kit |
| 2026-08-25 | Sistema de hooks externos (hooks.yml) | Externalizar comportamento pré/pós tarefa para arquivo editável por projeto |
| 2026-08-25 | Modo configurável (modo.yml) | lean/completo/strict para adaptar overhead ao tamanho do projeto |
| 2026-10-17 | Corrigir cópia de pastas ocultas e refatorar CLI elefante.ps1 | Evitar que instalador ignore .elefante, .agents e .kiro; suporte a stacks no init |
| 2026-10-17 | Sincronizar templates dos 4 mestres | Garantir paridade com _TEMPLATE_LOG.md e INDICE.md em todos os subtemplates |
| 2026-10-17 | Adotar CLI oficial em Node.js para Elefante v3.0 | Portabilidade multiplataforma sem runtime pesado, executável direto com npx elefante |
| 2026-10-17 | Criar utilitário de migração automática (elefante migrar) | Garantir transição transparente de projetos v2.3 para v3.0 sem retrabalho manual |
| 2026-10-17 | Posicionamento como camada declarativa curada compatível com OKF v0.2 | Complementar ferramentas de infraestrutura (como ai-memory) com princípios, regras e ADRs |
| 2026-10-17 | Versionamento de .elefante/ no Git para equipes | Memória técnica é do time; apenas .elefante/local/ (handoffs e rascunhos) fica no .gitignore |
| 2026-10-18 | CLI Node.js Oficial Zero-Dependências (`cli/`) | Execução multiplataforma com npx @feyth/elefante contendo init, doctor, status e log |
| 2026-10-18 | Arquitetura Modular Desacoplada (`core/` + `stacks/`) | Eliminação da duplicação dos mestres antigos; 00-PRINCIPIOS e templates universais no core |
| 2026-10-18 | Fronteira de Confiança (Trust Boundary) nos adaptadores | Regras e Princípios são INSTRUÇÕES soberanas; histórico e armadilhas são tratados como DADOS |
| 2026-10-18 | Migrador Automático Não-Destrutivo (`elefante migrar`) | Backup automático e extração de decisões/armadilhas tabulares para arquivos atômicos |
| 2026-10-18 | Handoff Tipado Privativo (`elefante handoff`) | Transição de contexto local em `.elefante/local/HANDOFF.md` com status git e histórico |
| 2026-10-18 | Exportador de Memória e Padrão OKF v0.2 (`elefante export`) | Exportação para formatos Claude Projects e especificação aberta OKF v0.2 |
| 2026-10-18 | Hook Git Bloqueante Pré-Commit (`elefante check`) | Verificação determinística que bloqueia commits de código estrutural sem atualização de SSOT/log |
| 2026-10-18 | Compactador Ordenado de Histórico (`elefante compactar`) | Arquivamento cronológico para `historico/arquivo/YYYY/` mantendo índice de links sem quebra |
| 2026-10-18 | Otimização Estrutural da Raiz (`docs/` e `legado/`) | Redução drástica da raiz eliminando duplicações e agrupando documentação secundária em `docs/` |
| 2026-10-18 | Desacoplamento Total de IDE/Editor (`D018`) | O Elefante torna-se 100% agnóstico via `AGENTS.md` universal e Git Hooks; remoção da dependência forçada do Kiro |
| 2026-10-18 | Validação Semântica no Pre-Commit (`D019`) | `elefante check` inspeciona o git diff do SSOT impedindo burlas por espaços/vírgulas e bloqueia placeholders não preenchidos |
| 2026-10-18 | Modo Ultra-Leve e Expansão (`D020`) | `elefante init --lite` gera apenas 1 arquivo `AGENTS.md` sem pastas para mitigar sobrecarga inicial; `elefante expand` desmembra sob demanda |
| 2026-10-18 | Linter de Tokens e Briefing Cirúrgico (`D021`) | `elefante doctor` monitora orçamento de tokens (<250 linhas / <8KB) e diluição de MUST (>5); `elefante brief` condensa contexto em ~350 tokens |

## Status do Momento
- **Data da Implementação:** 2026-10-18
- **Versão:** Framework Elefante v3.0.0 (Release Oficial Estável - 100% Agnóstico de Editor & Anti-Burocracia)
- Ciclo de evolução do Roadmap v3.0 concluído e validado:
  - Framework 100% agnóstico a qualquer editor (VS Code, Cursor, Windsurf, JetBrains, Neovim, Claude Code, Terminal).
  - Padrão universal aberto `AGENTS.md` adotado como protocolo primário de IA.
  - Mitigação de sobrecarga inicial com Modo Ultra-Leve (`init --lite`) e expansão atômica (`expand`).
  - Proteção contra amnésia e burla com validação semântica profunda (`check`) e auditoria de orçamento de contexto (`doctor` + `brief`).
  - Governança determinística assegurada via Git Hook (`elefante check`).
- Próximo passo: Adoção em projetos produtivos e coleta de métricas de benchmark.

