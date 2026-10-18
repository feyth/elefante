# Estado Atual do Sistema (Single Source of Truth)

> **Regra para a IA:** Se você precisar saber como o sistema está estruturado ou o que foi feito por último, a verdade absoluta está aqui. O que estiver no diretório `historico/` é passado.

## Informações do Projeto
- **Projeto:** Framework Elefante (Meta-framework de gestão de contexto para IA)
- **Stack:** Markdown + PowerShell + JSON (Kiro Hooks)
- **Bibliotecas Chave:** Kiro IDE (hooks v2, steering files), Git

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
├── legado/                       # Artefatos legados v2 arquivados
│   ├── mestres/                  # Antigos .mestre-*
│   └── elefante.ps1
├── .elefante/                    # Memória do próprio meta-framework
├── .agents/                      # Adaptador para Antigravity / Gemini
├── .kiro/                        # Hooks e steering
├── .gitignore
├── LICENSE
└── README.md                     # Apresentação oficial e guia rápido
```

## Módulos do Sistema

| Módulo | Propósito | Status |
|---|---|---|
| Template Base (.elefante/) | SSOT e regras genéricas | ✅ Atualizado (REGRA #0 + melhorias v2.3) |
| Template Laravel (.mestre-laravel/) | Stack Laravel específica | ✅ Atualizado completo |
| Template Django (.mestre-django/) | Stack Django específica | ✅ Atualizado completo |
| Template Next.js (.mestre-nextjs/) | Stack Next.js específica | ✅ Atualizado completo |
| Template Python (.mestre-python/) | Stack Python/FastAPI/Flask | ✅ Atualizado completo |
| Core Universal (core/) | Princípios universais, hooks e templates OKF v0.2 | ✅ Implementado v3.0 |
| Stacks Desacopladas (stacks/) | Regras desacopladas (Laravel, Django, Python, Next.js) | ✅ Implementado v3.0 |
| CLI Node.js Oficial (cli/) | CLI zero-dependências (init, doctor, status, log) | ✅ Implementado v3.0 |
| Proteção SSOT (.kiro/) | Hooks + Steering automático | ✅ Implementado |
| Princípios (00-PRINCIPIOS.md) | Leis invioláveis por stack | ✅ Criado em todos os templates |
| Checklist de Saúde do SSOT | Unit tests para documentação | ✅ Adicionado em todos os 02-REGRAS |
| Hooks externos (hooks.yml) | Automação de pré/pós tarefas | ✅ Criado em todos os templates |
| Modo configurável (modo.yml) | lean / completo / strict | ✅ Criado em todos os templates |
| Documentação & Roadmap | README, GUIA, ROADMAP-3.0.md | ✅ Atualizado v3.0 |

## Proteção Automática do SSOT (Nova Arquitetura)

### Componentes

1. **Steering File** (`.kiro/steering/ssot-enforcement.md`)
   - `inclusion: always` → sobrevive à compressão de contexto
   - Define quando atualizar e quando não atualizar SSOT
   - Proteção contra loops (verificação única por resposta)
   - Status: ✅ Implementado em todos os templates

2. **Hook PostTaskExec** (`ssot-commit-reminder.json`)
   - Dispara após cada tarefa concluída
   - Verifica se SSOT foi atualizado
   - Checklist de 4 itens obrigatórios
   - Status: ✅ Implementado em todos os templates

3. **Hook Stop** (`ssot-guard.json`)
   - Dispara ao encerrar sessão
   - Checklist final antes de parar
   - Previne sessões encerrarem com documentação desatualizada
   - Status: ✅ Implementado em todos os templates

### Melhorias v2.1 (Proteção SSOT)

| Melhoria | Arquivo | Status |
|---|---|---|
| REGRA #0 destacada | 02-REGRAS_E_CULTURA.md (todos) | ✅ |
| Checklist estrutural | AGENTS.md (todos) | ✅ |
| Seção sessões longas | QUICK-REFERENCE.md (todos) | ✅ |
| Passo 7 configuração .kiro/ | INICIAR.md (todos) | ✅ |
| Documentação hooks/steering | README-ELEFANTE.md | ✅ |
| Steering file SSOT | .kiro/steering/ssot-enforcement.md | ✅ |
| Hook PostTaskExec | .kiro/hooks/ssot-commit-reminder.json | ✅ |
| Hook Stop | .kiro/hooks/ssot-guard.json | ✅ |

### Melhorias v2.3 (Inspiradas no Spec Kit — 2026-08-25)

| Melhoria | Arquivo | Status |
|---|---|---|
| Princípios invioláveis (MUST/SHOULD) | 00-PRINCIPIOS.md (todos os templates) | ✅ |
| Checklist de Saúde do SSOT | 02-REGRAS_E_CULTURA.md (todos) | ✅ |
| IDs de rastreabilidade em logs | historico/_TEMPLATE_LOG.md | ✅ |
| Handoffs explícitos pós-tarefa | AGENTS.md (todos) | ✅ |
| Comando #elefante verificar | AGENTS.md (todos) | ✅ |
| Comando #elefante analisar | AGENTS.md (todos) | ✅ |
| Comando #elefante clarificar | AGENTS.md (todos) | ✅ |
| Sistema de hooks externos | hooks.yml (todos os templates) | ✅ |
| Preset lean / strict / completo | modo.yml (todos os templates) | ✅ |

## Integrações Externas
> Framework é standalone, sem integrações externas.

| Serviço | Usado Em | Notas |
|---|---|---|
| Kiro IDE | Hooks v2 + Steering | Requer Kiro para ativar proteção automática |
| Git | Versionamento | Recomendado adicionar .elefante/ e .kiro/ ao .gitignore |

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
| 2026-10-18 | Lançamento Oficial v3.0.0 Estável | Documentação atualizada, suite CLI completa e interoperabilidade OKF v0.2 |
| 2026-10-18 | Otimização Estrutural da Raiz (`docs/` e `legado/`) | Redução drástica da raiz eliminando duplicações e agrupando documentação secundária em `docs/` |

## Status do Momento
- **Data da Implementação:** 2026-10-18
- **Versão:** Framework Elefante v3.0.0 (Release Oficial Estável - Estrutura Enxuta)
- Ciclo de evolução do Roadmap v3.0 concluído e validado:
  - Raiz despoluída de 21 itens para 3 arquivos e pastas modulares (`core/`, `stacks/`, `cli/`, `docs/`, `legado/`).
  - Documentação centralizada em `docs/` (`GUIA-DE-USO.md`, `ROADMAP.md`, `CHANGELOG.md`, `INICIAR-LEGADO.md`).
  - Templates monolíticos antigos arquivados em `legado/mestres/`.
  - Instalação inicial via CLI (`init.js`) auditada e com proteção contra sobrescrita acidental.
- Próximo passo: Adoção em projetos produtivos e coleta de métricas de benchmark.
