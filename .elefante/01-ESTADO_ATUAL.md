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
├── .elefante/                    # Template base do framework
│   ├── 01-ESTADO_ATUAL.md       # SSOT template
│   ├── 02-REGRAS_E_CULTURA.md   # Regras com REGRA #0 destacada
│   ├── QUICK-REFERENCE.md       # Guia rápido + proteção loops
│   ├── INDICE.md                # Índice de logs
│   ├── DASHBOARD-ARQUITETURA.html
│   └── historico/               # Logs de desenvolvimento
│       ├── .keep
│       └── _TEMPLATE_LOG.md
├── .agents/
│   └── AGENTS.md                # Fluxo ANTES/DURANTE/DEPOIS + checklist
├── .kiro/                       # Proteção automática SSOT (NEW!)
│   ├── hooks/
│   │   ├── ssot-commit-reminder.json  # PostTaskExec - verifica após tarefas
│   │   └── ssot-guard.json            # Stop - checklist ao encerrar
│   └── steering/
│       └── ssot-enforcement.md        # inclusion:always - regras persistentes
├── .mestre-laravel/             # Template específico Laravel
│   ├── .elefante/              # Estrutura completa replicada
│   ├── .agents/                # AGENTS.md atualizado
│   └── .kiro/                  # Proteção SSOT (NEW!)
├── .mestre-django/              # Template específico Django
│   ├── .elefante/              # Estrutura completa replicada
│   ├── .agents/                # AGENTS.md atualizado
│   └── .kiro/                  # Proteção SSOT (NEW!)
├── .mestre-nextjs/              # Template específico Next.js
│   ├── .elefante/              # Estrutura completa replicada
│   ├── .agents/                # AGENTS.md atualizado
│   └── .kiro/                  # Proteção SSOT (NEW!)
├── .mestre-python/              # Template específico Python (NEW!)
│   ├── .elefante/              # Estrutura completa replicada
│   ├── .agents/                # AGENTS.md atualizado
│   └── .kiro/                  # Proteção SSOT (NEW!)
├── README-ELEFANTE.md          # Documentação principal
├── INICIAR.md                  # Roteiro de setup (com PASSO 7 - .kiro/)
├── GUIA-SSOT-HOOKS.md         # Guia de proteção SSOT
├── CHANGELOG-FRAMEWORK.md
├── setup_elefante.json
└── elefante.ps1
```

## Módulos do Sistema

| Módulo | Propósito | Status |
|---|---|---|
| Template Base (.elefante/) | SSOT e regras genéricas | ✅ Atualizado (REGRA #0) |
| Template Laravel (.mestre-laravel/) | Stack Laravel específica | ✅ Atualizado completo |
| Template Django (.mestre-django/) | Stack Django específica | ✅ Atualizado completo |
| Template Next.js (.mestre-nextjs/) | Stack Next.js específica | ✅ Atualizado completo |
| Template Python (.mestre-python/) | Stack Python/FastAPI/Flask | ✅ Criado completo |
| Proteção SSOT (.kiro/) | Hooks + Steering automático | ✅ Implementado |
| Documentação | README, INICIAR, GUIA | ✅ Atualizado |

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

### Melhorias Implementadas (Baseadas no GUIA-SSOT-HOOKS.md)

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

## Status do Momento
- **Data da Implementação:** 2026-08-12
- **Versão:** Framework Elefante v2.1 (com Proteção SSOT)
- Todas as melhorias do GUIA-SSOT-HOOKS.md foram implementadas
- Framework agora possui proteção tripla: Steering (sempre ativo) + Hook PostTaskExec (após tarefas) + Hook Stop (ao encerrar)
- **Adicionado:** Template Python/FastAPI/Flask completo (.mestre-python/)
- Templates disponíveis: 4 (Laravel, Django, Next.js, Python)
- Próximo passo: Testar em projeto real e documentar resultados
