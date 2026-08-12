# CHANGELOG — Framework Elefante 🐘

Histórico de versões e evolução do framework.  
Mantido pela equipe **Feyth Tecnologia**.

---

## [v2.0] — 2026-08-10

### O que mudou (v1.0 → v2.0)

#### Adicionado
- **`DASHBOARD-ARQUITETURA.html`** dentro de `.elefante/`
  - Dashboard visual HTML com design escuro, zero dependências externas
  - Seções: Estatísticas (Controllers, Models, Services, Views, Migrations), Tech Stack, Arquitetura em 4 camadas, Workflow de Requisição (8 etapas), Data Flow, Lifecycle de Feature P-DEV (10 etapas), Módulos do Sistema
  - Deve ser atualizado pela IA sempre que a arquitetura mudar
- **Pasta `.mestre/`** — template master imutável na raiz do repositório
  - Contém cópia zerada e pronta de toda a estrutura (`.elefante/`, `.agents/`, `README-ELEFANTE.md`)
  - Nunca deve ser editada por causa de um projeto específico — só ao evoluir o framework
  - Resolve o problema de "como levo o Elefante para um novo projeto sem contaminar o original"
  - Inclui `LEIA-ME.md` com instruções de uso

#### Modificado
- **`README.md` → `README-ELEFANTE.md`**
  - Renomeado para evitar conflito com o `README.md` do projeto destino ao copiar o boilerplate
- **`setup_elefante.json` v1.0 → v2.0**
  - Passos: de 5 para 10 passos
  - Passo 1: Copiar estrutura base do `.mestre`
  - Passo 2: Copiar `.agents/` para raiz do novo projeto
  - Passo 5 (novo): Atualizar `DASHBOARD-ARQUITETURA.html` com dados do projeto
  - Passo 8 (novo): Limpar histórico antigo (opcional, pergunta ao usuário)
  - Passo 9 (novo): Verificar estrutura criada
  - Adicionados campos: `estrutura_esperada`, `notas_importantes`, `arquivos_chave`, `regras_dashboard`

#### Corrigido
- `.gitignore` atualizado para ignorar `.1estudo/`

---

## [v1.0] — 2026-07-17 (versão inicial)

### Lançamento do Framework Elefante

#### Estrutura inicial
- **`.elefante/01-ESTADO_ATUAL.md`** — SSOT (Single Source of Truth) do projeto
- **`.elefante/02-REGRAS_E_CULTURA.md`** — regras de engenharia que a IA nunca pode quebrar
- **`.elefante/historico/`** — logs gerados pela IA após cada tarefa
- **`.agents/AGENTS.md`** — gatilho de comportamento: define o fluxo ao receber `#elefante`
- **`setup_elefante.json` v1.0** — assistente de inicialização com 5 passos
- **`README.md`** — documentação completa do framework
- **`DIVULGACAO.md`** — textos prontos para marketing em redes sociais

#### Conceito central
- Palavra-chave `#elefante` ativa o protocolo: ler memória → executar → atualizar memória
- Economia de até 75% de tokens por sessão de desenvolvimento
- Resolve amnésia de contexto e alucinação arquitetural das IAs

---

## Melhorias Planejadas

### Alta Prioridade

- [ ] **Seção "Decisões Arquiteturais"** no `01-ESTADO_ATUAL.md`
  - Registrar decisões importantes com justificativa (ex: "usamos Redis porque X")
  - Evita que a IA reverta decisões já tomadas conscientemente

- [ ] **`_TEMPLATE_LOG.md`** padronizado em `historico/`
  - Template com seções fixas: O que foi feito, Por que foi feito, Arquivos alterados, Próximo passo
  - Logs consistentes são mais úteis para consulta futura pela IA

- [ ] **Seção "Armadilhas"** no `02-REGRAS_E_CULTURA.md`
  - Bloco com erros reais que já aconteceram no projeto
  - Exemplo: "Nunca use eager loading em loops — já gerou N+1 em produção"

- [ ] **`.gitignore` comentado** com sugestão de excluir `.elefante/` em produção
  - A linha `# .elefante/` comentada com nota explicativa de quando ativar

### Média Prioridade

- [ ] **`QUICK-REFERENCE.md`** dentro de `.elefante/`
  - Comandos do dia a dia: como iniciar sessão, forçar update do SSOT, criar log

- [ ] **Seção "Integrações Externas"** no `01-ESTADO_ATUAL.md`
  - Mapear APIs de terceiros: nome, URL base, autenticação, quem usa

- [ ] **`02-REGRAS_E_CULTURA.md` multi-stack**
  - Seções genéricas adaptáveis para Laravel, Node.js, Django, etc.

- [ ] **Status por cor no `DASHBOARD-ARQUITETURA.html`**
  - Verde (completo), Amarelo (em construção), Vermelho (pendente) nos módulos

- [ ] **Seção "Ambiente e Deploy"** no `01-ESTADO_ATUAL.md`
  - Onde roda em produção, variáveis de ambiente, processo de deploy

### Baixa Prioridade (Longo Prazo)

- [ ] **CLI `elefante.ps1` / `elefante.sh`**
  - `elefante init` — copia `.mestre` para o projeto atual
  - `elefante log "descrição"` — cria arquivo de histórico com data
  - `elefante status` — lista arquivos do `.elefante` e data da última modificação

- [ ] **Hook de git pré-commit**
  - Avisa quando arquivos de arquitetura mudam sem atualizar `01-ESTADO_ATUAL.md`

- [ ] **Versões do `.mestre` por stack**
  - `.mestre-laravel/`, `.mestre-nextjs/`, `.mestre-django/`
  - Dashboard e regras pré-configuradas para cada stack

- [ ] **`INDICE.md`** navegável em `.elefante/`
  - Para projetos com 50+ logs, índice por data e tema para a IA consultar antes de vasculhar tudo

---

*Framework Elefante 🐘 — Desenvolvido por [Feyth Tecnologia](https://www.feyth.com.br)*
