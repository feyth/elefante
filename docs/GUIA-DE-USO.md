# 📖 Guia Completo de Uso - Framework Elefante

> **Aprenda a usar o Elefante do zero em 30 minutos**

Este guia vai te ensinar tudo que você precisa para usar o Framework Elefante de forma eficiente.

---

## 📑 Índice

1. [Instalação e Setup Inicial](#1-instalação-e-setup-inicial)
2. [Seu Primeiro Projeto com Elefante](#2-seu-primeiro-projeto-com-elefante)
3. [Comandos e Workflow Diário](#3-comandos-e-workflow-diário)
4. [Entendendo a Estrutura](#4-entendendo-a-estrutura)
5. [Boas Práticas](#5-boas-práticas)
6. [Resolução de Problemas](#6-resolução-de-problemas)
7. [Casos de Uso Avançados](#7-casos-de-uso-avançados)
8. [Perguntas Frequentes](#8-perguntas-frequentes)

---

## 1. Instalação e Setup Inicial

### 1.1. Pré-requisitos

Antes de começar, certifique-se de ter:

- ✅ Uma IDE com IA integrada:
  - [Kiro](https://kiro.dev) (recomendado - suporta hooks automáticos)
  - [Cursor](https://cursor.sh)
  - [Windsurf](https://codeium.com/windsurf)
  - Ou Claude/ChatGPT (sem hooks, mas funciona)

- ✅ Um projeto em qualquer linguagem/framework:
  - Laravel, Django, FastAPI, Flask, Next.js, React, Vue, etc.
  - Pode ser projeto novo ou existente

- ✅ Git (opcional, mas recomendado)

### 1.2. Download do Elefante

**Opção A: Clone o repositório**
```bash
git clone https://github.com/feyth/elefante.git
cd elefante
```

**Opção B: Download direto**
```bash
# Baixe e extraia o ZIP do GitHub
https://github.com/feyth/elefante/archive/refs/heads/main.zip
```

### 1.3. Escolha o Template da Sua Stack

O Elefante oferece duas formas de inicialização:

#### Via CLI Oficial (Node.js >= 18)
Dentro da pasta do seu projeto, execute:
```bash
npx @feyth/elefante init
```
O CLI detectará automaticamente se seu projeto é **Laravel**, **Django**, **Python** ou **Next.js**, e criará a estrutura `.elefante/` com o protocolo universal `AGENTS.md`.

#### Via Pasta Única (Sem Node.js)
Copie a pasta **`template/`** do Elefante para o seu projeto e renomeie-a para **`.elefante`**.
No chat com seu agente, envie:
```
#elefante leia setup_elefante.json e configure este projeto
```
```

### 1.5. Verifique a Estrutura Copiada

Seu projeto agora deve ter:

```
seu-projeto/
├── .elefante/              ✅ Memória do projeto
│   ├── 00-PRINCIPIOS.md    ✅ Princípios invioláveis (NOVO v2.3)
│   ├── 01-ESTADO_ATUAL.md
│   ├── 02-REGRAS_E_CULTURA.md
│   ├── hooks.yml           ✅ Hooks configuráveis (NOVO v2.3)
│   ├── modo.yml            ✅ Modo lean/completo/strict (NOVO v2.3)
│   ├── QUICK-REFERENCE.md
│   ├── INDICE.md
│   ├── DASHBOARD-ARQUITETURA.html
│   └── historico/
│       ├── .keep
│       └── _TEMPLATE_LOG.md
│
├── .agents/                ✅ Configuração da IA
│   └── AGENTS.md
│
├── .kiro/                  ✅ Proteção automática (opcional)
│   ├── hooks/
│   └── steering/
│
├── INICIAR.md              ✅ Roteiro de configuração
├── README-ELEFANTE.md      ✅ Documentação
└── LEIA-ME.md              ✅ Informações do template
```

---

## 2. Seu Primeiro Projeto com Elefante

### 2.1. Configuração Inicial (5 minutos)

Abra seu projeto no Kiro/Cursor/Windsurf e digite:

```
#elefante leia o INICIAR.md e configure este projeto
```

**A IA vai fazer uma entrevista:**

```
🤖 IA: Para configurar o Framework Elefante, preciso de algumas informações:

1. Qual é o nome do projeto?
2. Qual é a stack backend? (ex: Laravel 11, Django 4, FastAPI)
3. Qual é a stack frontend? (ex: Blade + Tailwind, React, Vue)
4. Qual banco de dados? (MySQL, PostgreSQL, SQLite)
5. Quais bibliotecas principais você usa? (ex: Sanctum, Celery, Prisma)
6. Qual é o objetivo principal do sistema em uma frase?
7. Alguma regra específica de código? (ex: "proibido jQuery", "sempre Tailwind")
```

**Exemplo de resposta:**

```
Você: 
1. Sistema de Gestão de Pedidos
2. Laravel 11
3. Blade + Tailwind CSS
4. MySQL
5. Sanctum (auth), Spatie Permission (roles), Laravel Excel
6. Gerenciar pedidos de clientes com controle de estoque
7. Sempre usar FormRequests para validação, proibido CSS inline, 
   seguir PSR-12, arquitetura Controller → Action → Service
```

### 2.2. O Que a IA Faz Automaticamente

Após sua resposta, a IA:

1. ✅ Preenche `.elefante/01-ESTADO_ATUAL.md` com as informações
2. ✅ Detecta arquivos do projeto (`composer.json`, `package.json`, etc.)
3. ✅ Configura `.elefante/02-REGRAS_E_CULTURA.md` com regras específicas da stack
4. ✅ Cria log de inicialização em `historico/`
5. ✅ Atualiza `INDICE.md`
6. ✅ Confirma que está pronto

**Mensagem final da IA:**

```
🐘 Framework Elefante configurado e pronto!

✅ 01-ESTADO_ATUAL.md — preenchido com os dados do projeto
✅ 02-REGRAS_E_CULTURA.md — regras da stack configuradas
✅ DASHBOARD-ARQUITETURA.html — abra no browser para visualizar
✅ Log de inicialização criado em historico/

Como usar a partir de agora:
Comece todo prompt com #elefante e eu já saberei tudo sobre o projeto.

Exemplo:
#elefante crie o módulo de autenticação na rota /login

Qual será a nossa primeira missão?
```

### 2.3. Primeira Tarefa

Agora vamos criar algo:

```
#elefante crie um CRUD completo de produtos com:
- Model Product (nome, preço, descrição, estoque)
- Migration
- Controller com métodos index, store, update, destroy
- FormRequest para validação
- Resource para API JSON
- Rotas RESTful em /api/products
```

**O que acontece:**

1. IA lê `01-ESTADO_ATUAL.md` → sabe sua stack e regras
2. IA lê `02-REGRAS_E_CULTURA.md` → sabe que você usa FormRequest
3. IA gera código perfeito seguindo seus padrões
4. IA atualiza `01-ESTADO_ATUAL.md` → adiciona "Módulo Produtos"
5. IA cria log em `historico/20260812_criar_crud_produtos.md`

**Resultado:** Código production-ready em segundos! 🚀

---

## 3. Comandos e Workflow Diário

### 3.1. Regra de Ouro

**SEMPRE comece seus prompts com `#elefante`**

❌ Errado:
```
"Crie uma API de usuários"
```

✅ Correto:
```
"#elefante crie uma API de usuários"
```

### 3.2. Comandos Comuns

#### Criar Funcionalidade
```
#elefante crie o sistema de autenticação com JWT e refresh tokens
#elefante adicione upload de imagens no módulo de produtos
#elefante implemente filtros e paginação na listagem de pedidos
```

#### Modificar Código
```
#elefante adicione campo "categoria" no model Product
#elefante refatore o AuthController seguindo clean code
#elefante mova a lógica de negócio do controller para um service
```

#### Corrigir Bugs
```
#elefante corrija o bug de validação no formulário de cadastro
#elefante resolva o N+1 query na listagem de pedidos
#elefante ajuste o middleware de autenticação que está falhando
```

#### Testar
```
#elefante crie testes unitários para o ProductService
#elefante adicione testes de feature para a API de produtos
#elefante crie factory e seeder para Product
```

#### Consultar
```
#elefante quais são as regras deste projeto?
#elefante o que já foi feito no módulo de autenticação?
#elefante mostre a estrutura atual do banco de dados
```

#### Documentar
```
#elefante atualize o SSOT com o estado atual do projeto
#elefante crie o log desta sessão em historico/
#elefante documente as decisões arquiteturais tomadas hoje
```

#### Encerrar Sessão
```
#elefante encerrar sessão
```
**Use após muitas tarefas (>30) para evitar loops**

#### Diagnóstico e Qualidade (NOVO v2.3)
```
# Verificar se o SSOT está atualizado em relação ao código
#elefante verificar

# Análise cruzada: detecta inconsistências entre os 3 arquivos core
#elefante analisar

# Sessão de clarificação antes de tarefa ambígua (máx. 3 perguntas)
#elefante clarificar
```

### 3.3. Workflow Típico de Um Dia

```
09:00 - Começar o dia
#elefante releia o estado atual e me dê um resumo do projeto

09:15 - Feature nova
#elefante crie o módulo de relatórios com exportação para Excel

10:30 - Bug encontrado
#elefante corrija o bug de permissão no dashboard de admin

11:00 - Refatoração
#elefante refatore o código de envio de email para usar jobs assíncronos

12:00 - Almoço

14:00 - Continuar
#elefante adicione validação de CPF no formulário de cadastro

15:30 - Testes
#elefante crie testes para o novo módulo de relatórios

17:00 - Fim do dia
#elefante encerrar sessão
```

---

## 4. Entendendo a Estrutura

### 4.1. `.elefante/00-PRINCIPIOS.md` (NOVO v2.3)

**Princípios invioláveis do projeto.** Diferente das regras operacionais, são leis que **nunca mudam** sem decisão explícita do dev:

```markdown
## I. Segurança Inviolável
**MUST:** Nunca remover autenticação existente.
**MUST:** Nunca commitar credenciais ou tokens.

## II. Banco de Dados
**MUST:** Nunca alterar migration já executada em produção.
```

A IA **bloqueia** qualquer tarefa que viole um princípio MUST e avisa o dev antes de continuar.

**Diferença entre `00-PRINCIPIOS.md` e `02-REGRAS_E_CULTURA.md`:**
- Princípios: leis absolutas (segurança, arquitetura central) — NUNCA mudam sem log
- Regras: operacionais e evolutivas (estilo de código, bibliotecas) — podem ser ajustadas

---

### 4.2. `.elefante/01-ESTADO_ATUAL.md` (SSOT)

**O cérebro do projeto.** Contém:

```markdown
## Informações do Projeto
- Projeto: Sistema de Gestão de Pedidos
- Stack: Laravel 11, Blade, Tailwind, MySQL
- Bibliotecas: Sanctum, Spatie Permission

## Módulos do Sistema
| Módulo | Rota Base | Status |
|---|---|---|
| Autenticação | /login | ✅ Completo |
| Produtos | /api/products | ✅ Completo |
| Pedidos | /api/orders | 🚧 Em desenvolvimento |

## Decisões Arquiteturais
| Data | Decisão | Justificativa |
|---|---|---|
| 2026-08-12 | Usar Jobs para emails | Não bloquear requisições HTTP |
```

**A IA lê isso antes de gerar qualquer código.**

### 4.2. `.elefante/02-REGRAS_E_CULTURA.md`

**As leis que a IA nunca quebra.** Contém:

```markdown
## REGRA #0 — ATUALIZAÇÃO OBRIGATÓRIA DO SSOT
[...]

## Backend — Laravel
- Arquitetura: Controller → Action → Service → Model
- Validação SEMPRE via FormRequests
- Nunca SQL raw com variáveis

## Frontend — Tailwind
- Proibido CSS inline estático
- Usar apenas classes do Tailwind
```

**A IA segue essas regras religiosamente.**

### 4.3. `.elefante/historico/`

**Memória de longo prazo.** Logs das tarefas:

```
historico/
├── 20260812_inicializacao_projeto.md
├── 20260812_criar_crud_produtos.md
├── 20260813_implementar_autenticacao.md
└── 20260813_adicionar_filtros_listagem.md
```

**Por que isso é importante:**
- IA não refaz o que já foi feito
- Consulta decisões passadas
- Evita repetir erros

### 4.5. `.elefante/hooks.yml` (NOVO v2.3)

Personaliza o comportamento do Elefante por projeto. Edite diretamente:

```yaml
hooks:
  before_task:
    - id: HK001
      name: Verificar princípios
      enabled: true       # ← desative se quiser pular
  after_task:
    - id: HK004
      name: Sugerir handoff
      enabled: false      # ← desative hooks que atrapalham seu fluxo
```

### 4.6. `.elefante/modo.yml` (NOVO v2.3)

Ajuste o overhead de documentação ao tamanho do projeto:

```yaml
modo: lean       # projetos pequenos — histórico opcional, sem clarificação
modo: completo   # padrão — fluxo completo
modo: strict     # crítico — bloqueia se SSOT não atualizado em 3 dias
```

### 4.7. `.kiro/` (Proteção Automática)

Se você usa Kiro, esses arquivos garantem que o SSOT nunca fica desatualizado:

- **`hooks/ssot-commit-reminder.json`**: Verifica após cada tarefa
- **`hooks/ssot-guard.json`**: Checklist ao encerrar sessão
- **`steering/ssot-enforcement.md`**: Regras sempre ativas

**Funciona sem Kiro?** Sim, mas sem proteção automática.

---

## 5. Boas Práticas

### 5.1. Use #elefante SEMPRE

❌ **Não faça:**
```
"Adicione validação no form"  // IA esqueceu o contexto
```

✅ **Faça:**
```
"#elefante adicione validação no formulário de cadastro"
```

### 5.2. Seja Específico

❌ **Ruim:**
```
"#elefante crie um sistema de login"
```

✅ **Bom:**
```
"#elefante crie autenticação com:
- Login via email/senha
- JWT com refresh tokens
- Rate limiting (5 tentativas/minuto)
- Envio de email de recuperação de senha
- Middleware de verificação de email"
```

### 5.3. Consulte Antes de Criar

```
// Antes de criar algo novo:
#elefante já existe algum módulo de autenticação?

// IA responde:
"Sim! O módulo de autenticação está em app/Http/Controllers/AuthController.php
com login, registro e recuperação de senha. Deseja estender ou modificar?"
```

### 5.4. Encerre Sessões Longas

Após muitas tarefas:

```
#elefante encerrar sessão
```

Isso:
- ✅ Faz checklist final
- ✅ Atualiza SSOT se necessário
- ✅ Cria logs pendentes
- ✅ Evita loops de verificação

### 5.5. Versione o .elefante/ (exceto o que é pessoal)

No `.gitignore`:

```gitignore
# Elefante - apenas notas pessoais ficam fora do Git
.elefante/local/
```

**Por quê?**
- Decisões, regras e armadilhas são conhecimento **do time**
- Se cada dev tiver seu próprio `.elefante/`, as memórias divergem
- Rascunhos e handoffs pessoais ficam em `.elefante/local/`

**No deploy:** exclua `.elefante/` e `.kiro/` do artefato (`.dockerignore`, `rsync --exclude`) — eles não vão para o servidor.

---

## 6. Resolução de Problemas

### 6.1. IA Não Lê o SSOT

**Sintoma:** IA gera código que não segue suas regras

**Causa:** Você esqueceu o `#elefante`

**Solução:**
```
❌ "Crie uma API"
✅ "#elefante crie uma API"
```

### 6.2. SSOT Ficou Desatualizado

**Sintoma:** SSOT não reflete o código atual

**Solução:**
```
#elefante atualize o 01-ESTADO_ATUAL.md com o estado real do código

// IA vai ler os arquivos e sincronizar
```

### 6.3. IA Entra em Loop

**Sintoma:** IA fica verificando SSOT várias vezes na mesma resposta

**Causa:** Sessão muito longa (>30 tarefas)

**Solução:**
```
#elefante encerrar sessão

// Depois inicie nova sessão
#elefante releia o estado atual e continue
```

### 6.4. Hooks Não Funcionam

**Sintoma:** IA não verifica SSOT automaticamente

**Causa:** Você não está usando Kiro (ou hooks não estão configurados)

**Solução:**
- Use Kiro para hooks automáticos, OU
- Lembre manualmente: `#elefante verificar se SSOT foi atualizado`

### 6.5. IA Ignora Regras

**Sintoma:** IA usa bibliotecas erradas ou quebra padrões

**Causa:** Regras não estão claras em `02-REGRAS_E_CULTURA.md`

**Solução:**
```
#elefante atualize 02-REGRAS_E_CULTURA.md com esta regra:
"NUNCA usar jQuery. Sempre usar Alpine.js para interatividade"

// IA adiciona e passa a seguir
```

---

## 7. Casos de Uso Avançados

### 7.1. Projeto Existente (Sem Elefante)

**Cenário:** Você tem um projeto Laravel pronto e quer adicionar Elefante

```bash
# 1. Copie o template
cp -r elefante/.mestre-laravel/. seu-projeto-existente/

# 2. Configure
#elefante leia o INICIAR.md e configure

# 3. Sincronize com código existente
#elefante leia todos os models, controllers e migrations existentes
e preencha o 01-ESTADO_ATUAL.md com o estado real do projeto

# 4. A IA vai escanear tudo e criar o SSOT completo
```

### 7.2. Múltiplos Projetos

```bash
projeto-1/.elefante/  → Contexto do projeto 1
projeto-2/.elefante/  → Contexto do projeto 2
projeto-3/.elefante/  → Contexto do projeto 3

# Cada projeto tem sua própria memória
# Não há confusão entre projetos
```

### 7.3. Trabalho em Equipe

**Setup do time:**

```bash
# .gitignore — só o pessoal fica de fora
.elefante/local/

# O resto do .elefante/ vai para o Git como qualquer código
# Conflitos são resolvidos no PR, como em qualquer arquivo
```

**Sincronizar conhecimento:**

```
Dev 1: #elefante documente a decisão de usar Redis para cache

// Commit + PR: o time revisa a decisão junto com o código

Dev 2: git pull
// A IA do Dev 2 já lê a decisão no próximo #elefante
```

### 7.4. Migrar Stack

**Cenário:** Você quer mudar de Laravel para FastAPI

```bash
# 1. Copie novo template
cp -r elefante/.mestre-python/. seu-projeto/

# 2. Migre informações
#elefante leia o antigo 01-ESTADO_ATUAL.md do Laravel
e crie um novo para FastAPI mantendo as mesmas regras de negócio

# 3. IA traduz contexto para nova stack
```

### 7.5. Auditoria de Código

```
#elefante analise todo o código e me diga:
1. Quais módulos não seguem as regras de 02-REGRAS_E_CULTURA.md?
2. Onde há código duplicado?
3. Quais decisões arquiteturais não estão documentadas?

// IA faz análise completa e sugere melhorias
```

---

## 8. Perguntas Frequentes

### P: Funciona com qualquer IA ou editor?
**R:** Sim! Funciona com Cursor, VS Code, Windsurf, Claude Code, Antigravity, JetBrains, ChatGPT Web ou qualquer assistente. Ele opera via padrão universal `AGENTS.md` e não requer nenhuma IDE proprietária.

### P: Preciso pagar algo?
**R:** Não! O Elefante é 100% grátis e open source (MIT License). Você só paga pelo modelo ou IA que decidir utilizar.

### P: E se eu usar outra linguagem (Go, Rust, .NET, Java)?
**R:** O template universal [`template/`](../template/) é totalmente agnóstico e opera puramente em Markdown + YAML.

### P: Posso usar em projetos comerciais?
**R:** Sim! A licença MIT permite uso comercial irrestrito.

### P: Como atualizo o Elefante?
**R:** Basta rodar `npx @feyth/elefante status` ou `npx @feyth/elefante doctor` no seu projeto para auditar conformidade.

### P: O prefixo #elefante é obrigatório?
**R:** Em editores modernos que indexam o `AGENTS.md` (Cursor, Windsurf, Claude Code, etc.), as instruções já são carregadas automaticamente pelo agente. O prefixo `#elefante` é recomendado em interfaces web de chat ou quando você quer forçar uma verificação explícita de SSOT.

---

## 🎓 Próximos Passos

1. ✅ **Experimente em um projeto real** (usando a pasta `template/` ou `npx @feyth/elefante init`)
2. ✅ **Ative o hook pré-commit** (`npx @feyth/elefante check --install-hook`)
3. ✅ **Compartilhe seu feedback** (GitHub Issues/Discussions)
4. ✅ **Ajude a melhorar** (contribua com PRs)

---

## 📚 Documentação Relacionada

- [README Principal](../README.md) - Visão geral e inicialização rápida
- [Roteiro de Inicialização](../INICIAR.md) - Roteiro guiado para o agente
- [Benchmark e Protocolo Eval](BENCHMARK.md) - Metodologia de medição e testes
- [Roadmap de Engenharia v3.0](ROADMAP.md) - Próximos passos e releases
- [Histórico de Mudanças (Changelog)](CHANGELOG.md) - Histórico completo de versões

---

## 🆘 Precisa de Ajuda?

- 🐛 [Reporte bugs](https://github.com/feyth/elefante/issues)
- 💬 [Discussões](https://github.com/feyth/elefante/discussions)
- 📧 Contato: [Feyth Tecnologia](https://www.feyth.com.br)

---

<p align="center">
  <strong>Feito com ❤️ por <a href="https://www.feyth.com.br">Feyth Tecnologia</a></strong><br>
  🐘 <em>Um elefante nunca esquece. Agora sua IA também não.</em> 🐘
</p>
