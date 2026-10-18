# 🐘 Framework Elefante

> **Memória em tempo real e governança contínua para desenvolvimento com IA**

O Framework Elefante elimina a amnésia de contexto em IAs. Instale em segundos, codifique com qualquer agente e mantenha uma IA que nunca esquece sua arquitetura, regras e armadilhas.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-3.0.0-green.svg)](docs/CHANGELOG.md)
[![OKF](https://img.shields.io/badge/standard-OKF%20v0.2-orange.svg)](elefante-okf.json)

---

## 🎯 Em 30 Segundos (Novo CLI Oficial v3.0)

Em qualquer projeto novo ou existente, execute:

```bash
# 1. Inicialize o Elefante no seu projeto (auto-detecta stack e agentes de IA instalados):
npx @feyth/elefante init

# 2. Na sua IDE favorita (Cursor, Claude Code, Antigravity, Kiro, Windsurf), inicie com:
#elefante leia o estado atual e vamos começar

# 3. A IA lê a arquitetura, segue suas regras inegociáveis e atualiza a documentação sozinha!
```

**O que o Elefante garante:**
- ✅ **Fronteira de Confiança (Trust Boundary):** Princípios e Regras operam como instruções soberanas; histórico passado é tratado como dado contextual.
- ✅ **Hook Pré-Commit no Git:** Bloqueia commits de código estrutural sem atualização de documentação (`elefante check --install-hook`).
- ✅ **Handoff Privativo:** Alterne entre diferentes IAs sem perder o fio da meada (`elefante handoff`).
- ✅ **Interoperabilidade Aberta:** Compatível nativamente com o padrão aberto **OKF v0.2** (`elefante export okf`).

---

## 💡 Por Que Usar?

### Sem o Elefante ❌
```
Você: "Crie uma API de pagamentos"

IA: *Lê 50 arquivos aleatórios*
    *Gasta 25.000 tokens à toa*
    *Esquece suas regras de arquitetura*
    *Mistura lógica de negócio dentro de controllers*
    *A documentação fica desatualizada*
```

### Com o Elefante v3.0 ✅
```
Você: "#elefante crie uma API de pagamentos"

IA: *Lê os arquivos curados do .elefante/ (Princípios, SSOT, Regras)*
    *Respeita a arquitetura definida (Controller -> Action -> Service)*
    *Desvia das armadilhas conhecidas do projeto*
    *Atualiza o SSOT e gera log de sessão ao concluir*
```

---

## 🚀 Instalação e Comandos do CLI

O CLI oficial do Elefante roda com **Node.js (>= 18)** sem nenhuma dependência externa:

### Comandos Disponíveis

| Comando | Descrição |
|---|---|
| `npx @feyth/elefante init` | Inicializa o framework (detecta Laravel, Django, Python ou Next.js). |
| `npx @feyth/elefante status` | Exibe o status do SSOT, módulos concluídos e adaptadores ativos. |
| `npx @feyth/elefante doctor` | Unit tests da documentação, auditoria de integridade e scanner de segredos. |
| `npx @feyth/elefante check` | Valida se código estrutural foi alterado sem atualizar documentação. |
| `npx @feyth/elefante check --install-hook` | Instala hook de pre-commit no Git para bloqueio determinístico. |
| `npx @feyth/elefante log "título"` | Cria novo log em `historico/` e auto-indexa no `INDICE.md`. |
| `npx @feyth/elefante migrar` | Migra projetos legados v2.x para o formato modular v3.0 (suporta `--plan`). |
| `npx @feyth/elefante handoff "nota"` | Cria resumo de transição em `.elefante/local/HANDOFF.md`. |
| `npx @feyth/elefante export okf` | Exporta manifesto compatível com Open Knowledge Format (OKF v0.2). |
| `npx @feyth/elefante compactar` | Arquiva sessões antigas preservando todos os links do índice. |

---

### Instalação Manual Alternativa (Legado)

Se preferir não usar o Node.js, os templates standalone continuam disponíveis:

```bash
# Laravel/PHP
cp -r elefante/.mestre-laravel/. seu-projeto-laravel/

# Django/Python
cp -r elefante/.mestre-django/. seu-projeto-django/

# Python/FastAPI/Flask
cp -r elefante/.mestre-python/. seu-projeto-python/

# Next.js/React
cp -r elefante/.mestre-nextjs/. seu-projeto-nextjs/
```

> ⚠️ Em bash, use sempre `pasta/.` para não ignorar arquivos ocultos (`.elefante`, `.agents`, `.kiro`).

A IA vai perguntar:
1. Nome do projeto
2. Stack backend/frontend
3. Banco de dados
4. Bibliotecas principais
5. Regras específicas

**Ela configura tudo automaticamente!**

### Passo 3: Comece a Usar

**A partir de agora, SEMPRE comece seus prompts com `#elefante`:**

```
#elefante crie o sistema de autenticação com JWT
#elefante adicione validação nos formulários
#elefante corrija o bug no controller de pedidos
#elefante refatore o código seguindo clean code
```

---

## 📚 Como Funciona?

### A Estrutura (criada automaticamente)

```
seu-projeto/
├── .elefante/
│   ├── 00-PRINCIPIOS.md         # ⚖️ Princípios invioláveis (MUST/SHOULD)
│   ├── 01-ESTADO_ATUAL.md       # 🧠 Memória: onde o projeto está agora (SSOT)
│   ├── 02-REGRAS_E_CULTURA.md   # 📜 Regras operacionais e armadilhas
│   ├── hooks.yml                # 🔁 Hooks declarativos pré/pós tarefa
│   ├── modo.yml                 # ⚙️ Modo: lean / completo / strict
│   ├── QUICK-REFERENCE.md       # 📖 Guia rápido
│   ├── INDICE.md                # 📑 Índice de logs
│   └── historico/               # 📝 Histórico com decisões rastreáveis (D001)
│
├── AGENTS.md                    # 🌐 Padrão Universal lido por qualquer editor/IA
└── CLAUDE.md                    # 🤖 Adaptador Claude Code / Anthropic
```

### O Ciclo Automático

```
1. Você: "#elefante crie API de produtos"
   ↓
2. IA lê: .elefante/01-ESTADO_ATUAL.md (SSOT)
   ↓
3. IA lê: .elefante/02-REGRAS_E_CULTURA.md (Regras)
   ↓
4. IA gera: código perfeito, seguindo seus padrões
   ↓
5. Hooks verificam: "SSOT foi atualizado?"
   ↓
6. IA atualiza: .elefante/01-ESTADO_ATUAL.md automaticamente
   ↓
7. IA cria: log em historico/ (decisões importantes)
```

**Tudo automático. Você só codifica.**

---

## 🎓 Exemplos Práticos

### Exemplo 1: Criar um CRUD Completo

```
#elefante crie um CRUD completo de produtos com:
- model Product (nome, preço, descrição, estoque)
- validação de formulários
- API REST com JSON
- testes unitários
```

**A IA:**
1. Lê seu SSOT → sabe que você usa Laravel + Sanctum
2. Cria model, migration, controller, requests, resources
3. Segue suas regras → validação via FormRequest, não inline
4. Atualiza SSOT → adiciona "Módulo Produtos" na tabela
5. Cria log → registra decisão de usar API Resource

### Exemplo 2: Adicionar Feature

```
#elefante adicione autenticação de dois fatores (2FA) via SMS
```

**A IA:**
1. Lê SSOT → vê que já existe módulo de autenticação
2. Estende controller existente (não cria novo)
3. Adiciona campo 2FA na migration
4. Usa biblioteca já listada no SSOT
5. Atualiza SSOT com nova feature
6. Cria log da implementação

### Exemplo 3: Refatoração

```
#elefante refatore o AuthController seguindo clean code
```

**A IA:**
1. Lê regras → vê que você usa padrão Action
2. Extrai lógica para Actions individuais
3. Mantém rotas e contratos existentes
4. Atualiza SSOT se arquitetura mudou
5. Documenta mudanças no histórico

---

## 💎 Recursos Avançados

### Proteção Automática do SSOT

O Elefante **garante** que sua documentação nunca fica desatualizada:

- **Steering File** (`inclusion: always`): Regras sobrevivem à compressão de contexto
- **Hook PostTaskExec**: Verifica SSOT após cada tarefa
- **Hook Stop**: Checklist final ao encerrar sessão

**Em sessões longas (>30 tarefas), a IA NUNCA esquece de atualizar!**

### Princípios Invioláveis (`00-PRINCIPIOS.md`)

Separe o que **nunca pode mudar** das regras operacionais:

```markdown
## I. Segurança Inviolável
**MUST:** Nunca remover autenticação existente.
**MUST:** Nunca commitar credenciais ou tokens.

## II. Banco de Dados
**MUST:** Nunca alterar migration já executada em produção.
```

A IA **bloqueia** qualquer tarefa que viole um princípio MUST antes de executar.

### Comandos de Diagnóstico

```
# Verificar se SSOT está convergido com o código:
#elefante verificar

# Análise cruzada de consistência dos 3 arquivos core:
#elefante analisar

# Sessão de clarificação estruturada (máx. 3 perguntas):
#elefante clarificar
```

### Hooks Configuráveis (`hooks.yml`)

Personalize o comportamento do Elefante por projeto — sem modificar arquivos core:

```yaml
hooks:
  before_task:
    - id: HK001
      name: Verificar princípios
      enabled: true
  after_task:
    - id: HK003
      name: Checklist SSOT obrigatório
      enabled: true
```

### Modos de Operação (`modo.yml`)

Adapte o overhead ao tamanho do projeto:

```yaml
# Projetos pequenos / experimentais
modo: lean       # histórico opcional, checklist reduzido

# Projetos normais (padrão)
modo: completo   # fluxo completo

# Projetos críticos / equipe
modo: strict     # bloqueia se SSOT desatualizado há >3 dias
```

### Sessões Longas

```
# Após muitas tarefas, encerre explicitamente:
#elefante encerrar sessão

# Isso evita loops de verificação
```

### Trabalho em Equipe

```
# Versione .elefante/ no Git: decisões, regras e armadilhas são do time.
# Ignore apenas o que é pessoal:
echo ".elefante/local/" >> .gitignore

# No deploy, exclua .elefante/ e .kiro/ do artefato
# (ex: .dockerignore, rsync --exclude) — eles não vão para o servidor.
```

---

## 📖 Documentação Completa

- **[Guia de Uso Detalhado](GUIA-DE-USO.md)** ← Comece aqui!
- [Documentação Conceitual](README-ELEFANTE.md) (inclui a proteção SSOT via hooks/steering)
- [Roteiro de Inicialização](INICIAR.md)
- [Changelog](CHANGELOG-FRAMEWORK.md)
- [Roadmap v3.0](ROADMAP-3.0.md)

---

## 🛠️ Stacks Suportadas

| Stack | Template | Status |
|---|---|---|
| Laravel/PHP | `.mestre-laravel` | ✅ Completo |
| Django/Python | `.mestre-django` | ✅ Completo |
| Python/FastAPI/Flask | `.mestre-python` | ✅ Completo |
| Next.js/React | `.mestre-nextjs` | ✅ Completo |

**Quer outra stack?** [Abra uma issue](https://github.com/feyth/elefante/issues) ou adapte um template existente!

---

## ❓ FAQ

### Preciso de um editor ou IDE específica?
**Não! O Elefante é 100% agnóstico a qualquer editor.** Funciona perfeitamente com **VS Code, Cursor, Windsurf, JetBrains, Neovim, Claude Code, Terminal** ou qualquer IDE. Ele não depende de nenhum plugin ou software proprietário.

### Como a proteção do SSOT é garantida se eu não uso Kiro?
De duas formas determinísticas:
1. **Via Git Hook nativo:** Execute `npx @feyth/elefante check --install-hook` para que o Git bloqueie commits estruturais sem documentação atualizada em qualquer terminal ou editor.
2. **Via Instrução Universal (`AGENTS.md`):** O protocolo universal de agentes é seguido por qualquer IA moderna.

### E se eu usar outra linguagem?
Adapte um template existente ou crie o seu. A estrutura `.elefante/` é universal e puramente em Markdown + YAML.

### Quanto custa?
**Grátis e open source.** Licença MIT.

### Como contribuir?
Abra uma [issue](https://github.com/feyth/elefante/issues) ou um Pull Request. Veja o [Roadmap v3.0](docs/ROADMAP.md) para saber o que está planejado.

---

## 🎯 Próximos Passos

1. **[Leia o Guia de Uso Completo](docs/GUIA-DE-USO.md)**
2. **Experimente em um projeto teste** (15 minutos)
3. **Compartilhe seu feedback** (Issues/Discussions)

---

## 💪 Casos de Uso

- ✅ **Projetos pessoais:** Mantenha contexto entre sessões
- ✅ **Projetos de equipe:** Padronize código com regras claras
- ✅ **Aprendizado:** A IA ensina boas práticas do seu stack
- ✅ **Refatoração:** Mantenha consistência em código legado
- ✅ **Protótipos rápidos:** IA gera código production-ready

---

## 📊 Resultados

Ainda não publicamos números. Preferimos medir antes de afirmar: um **eval reproduzível**
(projeto-exemplo + perguntas, com e sem Elefante) está planejado no [Roadmap v3.0](ROADMAP-3.0.md).

---

## 🌟 Contribua

O Elefante é open source e feito pela comunidade.

- ⭐ Dê uma estrela no [GitHub](https://github.com/feyth/elefante)
- 🐛 Reporte bugs nas [Issues](https://github.com/feyth/elefante/issues)
- 💡 Sugira melhorias nas [Discussions](https://github.com/feyth/elefante/discussions)
- 📖 Melhore a documentação via Pull Request

---

## 📜 Licença

MIT License - use livremente, até comercialmente.

**Atribuição obrigatória:**  
Desenvolvido por [Feyth Tecnologia](https://www.feyth.com.br)

---

## 🔗 Links e Documentação

- [Central de Documentação](docs/README.md)
- [Guia Completo de Uso](docs/GUIA-DE-USO.md)
- [Roadmap Estratégico v3.0](docs/ROADMAP.md)
- [Histórico de Versões (Changelog)](docs/CHANGELOG.md)
- [Repositório GitHub](https://github.com/feyth/elefante)
- [Issues e Suporte](https://github.com/feyth/elefante/issues)

---

<p align="center">
  <strong>Feito com ❤️ e visão arquitetural por <a href="https://www.feyth.com.br">Feyth Tecnologia</a></strong>
</p>

<p align="center">
  🐘 <em>Um elefante nunca esquece. Seu código também não deveria.</em> 🐘
</p>
