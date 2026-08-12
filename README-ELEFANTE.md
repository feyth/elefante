# Framework Elefante 🐘

**O "Cérebro Externo" definitivo para Engenharia de Software Orientada a IA.**

O **Framework Elefante** é uma metodologia e um micro-framework de gestão de contexto (*Agentic Memory Framework*) projetado para resolver o maior problema atual da programação com Inteligência Artificial: **a amnésia de contexto e a alucinação arquitetural.**

> **Licença e Atribuição:**  
> Este projeto é Open Source. No entanto, é **obrigatória a citação e atribuição de créditos** à criadora original da metodologia em qualquer cópia, fork ou uso comercial:  
> **Desenvolvido por: [Feyth Tecnologia](https://www.feyth.com.br)**

---

## 🛑 O Problema

Ao programar com IAs (Cursor, Claude, Gemini, ChatGPT), a IA entra no seu projeto "cega". Para entender o que está acontecendo, ela gasta milhares de tokens lendo dezenas de arquivos aleatórios. Quando a janela de contexto (*Context Window*) enche, a IA começa a esquecer regras antigas, perde o fio da meada da arquitetura e gera código que não segue o padrão do seu projeto (ex: usando jQuery quando a regra era Vanilla JS).

## 💡 A Solução (O Conceito Elefante)

O elefante tem uma memória impecável. O Framework Elefante atua como uma **Única Fonte da Verdade (SSOT - Single Source of Truth)**. Em vez de forçar a IA a adivinhar a arquitetura lendo código cru, você fornece um mapa mental em Markdown. 

A IA se torna uma bibliotecária do próprio código: ela é instruída a **ler** a memória antes de propor qualquer mudança, e **escrever** (atualizar) a memória assim que finalizar a tarefa.

### Os 3 Pilares do Elefante:
1. **O Estado Atual (SSOT):** Um mapa mental simplificado de como o sistema está estruturado hoje.
2. **A Cultura de Engenharia:** Um conjunto estrito de regras que a IA NUNCA pode quebrar.
3. **O Histórico (Memória de Longo Prazo):** Logs das decisões arquiteturais passadas para que a IA não repita erros ou refaça o que já está pronto.

---

## 📂 Estrutura de Diretórios

O framework vive dentro de uma pasta oculta chamada `.elefante` na raiz do seu projeto.

```text
meu-projeto/
├── .elefante/
│   ├── 01-ESTADO_ATUAL.md       # (Onde estamos) Mapa de dependências e rotas.
│   ├── 02-REGRAS_E_CULTURA.md   # (Como codamos) Regras como "100% fluido", "Clean Code", etc.
│   └── historico/
│       ├── .keep
│       └── 20260717_login.md    # Logs gerados PELA PRÓPRIA IA após cada tarefa.
└── .kiro/
    ├── hooks/
    │   ├── ssot-commit-reminder.json  # Verifica SSOT após cada tarefa
    │   └── ssot-guard.json            # Checklist ao encerrar sessão
    └── steering/
        └── ssot-enforcement.md        # Regras sempre incluídas (sobrevivem à compressão)
```

### Proteção Automática do SSOT

O Framework Elefante inclui proteção automática contra esquecimento de atualização:

- **Steering Files** (`.kiro/steering/`): Regras marcadas com `inclusion: always` que permanecem no contexto da IA mesmo após compressão de contexto em sessões longas
- **Hooks do Kiro** (`.kiro/hooks/`): Automações que disparam em eventos específicos:
  - `PostTaskExec`: Verifica se SSOT foi atualizado após cada tarefa
  - `Stop`: Checklist final ao encerrar sessão

Esta proteção resolve o problema documentado de sessões longas onde a IA esquece de atualizar a documentação.

---

## ⚙️ Instalação e Configuração

Para instalar o Elefante em um novo projeto, siga estes passos:

1. **Copie o Boilerplate**
   Copie a pasta oculta `.elefante` (disponível neste repositório) para a raiz do seu novo projeto.

2. **Configure o Gatilho da IA (AGENTS.md ou .cursorrules)**
   Para que a IA saiba que o Elefante existe, você precisa "ensinar" o gatilho a ela. Se você usa uma IDE com suporte a regras globais ou arquivos de agentes (como Cursor ou Antigravity), adicione a seguinte instrução:

   ```markdown
   A partir de agora, sempre que eu usar a hashtag #elefante, siga ESTRITAMENTE o fluxo:
   1. Leia a Mente: Leia silenciosamente `.elefante/01-ESTADO_ATUAL.md` e `.elefante/02-REGRAS_E_CULTURA.md` antes de gerar código.
   2. Separe Memória de Estado: Após codar, salve um resumo em `.elefante/historico/`. Se a estrutura do app mudou, ATUALIZE OBRIGATORIAMENTE o arquivo `01-ESTADO_ATUAL.md`.
   ```

3. **Iniciando do Zero**
   Se preferir, utilize o arquivo `setup_elefante.json`. Peça para a sua IA: *"Leia o setup_elefante.json e inicie o projeto"*. A IA fará uma entrevista rápida perguntando as tecnologias usadas e preencherá o mapa mental automaticamente.

---

## 🚀 Manual de Uso (O Workflow)

Usar o Elefante é extremamente simples, mas exige disciplina. Uma vez configurado, no seu dia a dia de programação, **É OBRIGATÓRIO incluir a palavra mágica `#elefante` logo no início do seu prompt em TODA e QUALQUER interação.** 

Sem essa hashtag, a IA voltará ao comportamento padrão (amnésia e alucinação) e não consultará a memória do projeto. Portanto, crie o hábito de começar toda frase com `#elefante`.
**Exemplo de Prompt Ruim (Sem Elefante):**
> *"Crie um sistema de login para mim."*
*(A IA vai inventar a roda, usar dependências que você não tem e quebrar sua arquitetura).*

**Exemplo de Prompt Supremo (Com Elefante):**
> *"#elefante crie o painel de login na rota `/admin/login`. Siga o nosso padrão visual."*
*(A IA vai ler o Estado Atual, ver quais bibliotecas front-end você usa, ler as Regras de Cultura para garantir que não vai gerar CSS sujo, escrever a funcionalidade perfeita e, ao fim, documentar no histórico).*

### Dicas de Ouro
- O arquivo `01-ESTADO_ATUAL.md` **NUNCA pode ficar desatualizado**. O sistema possui proteção automática via hooks e steering files, mas a disciplina de usar `#elefante` em todo prompt é essencial.
- A pasta `.kiro/` contém a proteção SSOT (hooks + steering) e deve ser configurada durante a inicialização do projeto.
- No momento de subir para produção (Deploy), você **não precisa e não deve** subir as pastas `.elefante/` e `.kiro/`. Elas são o cérebro local do desenvolvimento. Adicione ambas no seu `.gitignore`.
- Em sessões longas (>30 tarefas), considere encerrar explicitamente com `#elefante encerrar sessão` para evitar loops de verificação.

---
*Criado com orgulho e visão arquitetural sistêmica por Feyth Tecnologia.*
