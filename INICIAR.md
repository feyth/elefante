# 🐘 Framework Elefante — Inicialização do Projeto

> **Para a IA:** Você acabou de ler este arquivo. Siga o roteiro abaixo SEM DESVIOS.
> Execute cada passo em ordem. Não pule etapas. Ao final, informe que está pronto.

---

## ROTEIRO DE INICIALIZAÇÃO

### PASSO 1 — Entrevista (faça TODAS as perguntas de uma vez)

Pergunte ao usuário as seguintes informações em uma única mensagem:

1. **Nome do projeto** (ex: "Sistema de Gestão de Pedidos")
2. **Stack backend** (ex: Laravel 11, Django 4, Node.js + Express, NestJS)
3. **Stack frontend** (ex: Blade + Tailwind, React, Vue, Next.js)
4. **Banco de dados** (ex: MySQL, PostgreSQL, SQLite)
5. **Bibliotecas principais** que já sabe que vai usar (ex: Sanctum, Prisma, Celery)
6. **Objetivo principal** do sistema em uma frase
7. **Alguma regra específica de código?** (ex: "proibido jQuery", "sempre Tailwind", "nunca CSS inline")

Aguarde as respostas antes de continuar.

---

### PASSO 2 — Preencher `.elefante/01-ESTADO_ATUAL.md`

Com as respostas do Passo 1, abra e edite `.elefante/01-ESTADO_ATUAL.md`:
- Substitua `[NOME DO SEU PROJETO AQUI]` pelo nome informado
- Substitua `[INSERIR TECNOLOGIAS...]` pela stack completa
- Substitua `[INSERIR LIBS PRINCIPAIS]` pelas bibliotecas informadas
- Preencha a seção **Ambiente e Deploy** com o que o usuário informou (ou deixe como placeholder se não informado)
- Atualize **Data Inicial** com a data de hoje
- Reescreva **Status do Momento** com o objetivo do projeto

---

### PASSO 3 — Preencher `.elefante/02-REGRAS_E_CULTURA.md` (AUTOMÁTICO — não pergunte nada)

**Estude o projeto silenciosamente** antes de editar. Leia os seguintes arquivos (se existirem):

| Arquivo | O que detectar |
|---|---|
| `composer.json` | Versão do Laravel/PHP, pacotes instalados (Spatie, Sanctum, Livewire, etc.) |
| `package.json` | Framework JS (React, Vue, Next.js), Tailwind, Vite, dependências de UI |
| `requirements.txt` / `pyproject.toml` | Versão do Django/FastAPI, DRF, Celery, etc. |
| `artisan` | Confirma que é projeto Laravel |
| `manage.py` | Confirma que é projeto Django |
| `next.config.js` / `next.config.ts` | Confirma que é projeto Next.js |
| `tsconfig.json` | Confirma uso de TypeScript e configurações |
| `tailwind.config.js` | Confirma Tailwind e customizações |
| `vite.config.js` | Build tool e plugins ativos |
| `.env.example` / `.env` | Variáveis de ambiente (banco, serviços externos) |
| `database/migrations/` | Tabelas já existentes no banco |
| `app/Models/` | Models já criados |
| `app/Http/Controllers/` | Controllers existentes |
| `resources/views/` | Estrutura de views (Blade, etc.) |

Com base no que encontrar, edite `.elefante/02-REGRAS_E_CULTURA.md`:

- **Ative a seção da stack detectada** (Laravel, Node, Django) e remova ou comente as outras
- **Preencha o bloco de Frontend** com a tecnologia real encontrada (Tailwind, Bootstrap, etc.)
- **Se encontrar pacotes específicos**, adicione regras correspondentes:
  - Spatie/Permission → "Use Policies e Gates, nunca cheque role com string hardcoded"
  - Livewire → "Componentes Livewire para interatividade, não jQuery"
  - React Query → "Nunca use useEffect para fetch de dados"
  - Prisma → "Sempre use tipos gerados pelo Prisma, nunca `any` em queries"
- **Se o projeto estiver vazio** (sem arquivos de código ainda), mantenha as regras genéricas da stack informada no Passo 1 e adicione uma nota: `"Projeto vazio — regras baseadas na stack declarada pelo usuário"`
- **Não invente regras** que não fazem sentido para a stack detectada

---

### PASSO 4 — Preencher `.elefante/DASHBOARD-ARQUITETURA.html`

Abra o arquivo e substitua os placeholders:
- `[NOME DO PROJETO]` → nome do projeto (aparece 2x: no `<title>` e no `<h1>`)
- `[DATA]` → data de hoje no formato `DD/MM/YYYY`
- `[X]` nas estatísticas → substitua por `0` (projeto novo)
- `[BACKEND]` → stack backend informada
- `[FRONTEND]` → stack frontend informada
- `[DATABASE]` → banco de dados informado
- `[BUILD_TOOL]` → ferramenta de build (ex: Vite, Webpack, Mix) ou `N/A`

---

### PASSO 5 — Criar log de inicialização

Crie o arquivo `.elefante/historico/YYYYMMDD_inicializacao_projeto.md` (use a data de hoje).

Use o template `.elefante/historico/_TEMPLATE_LOG.md` como base e preencha:
- **Título:** Inicialização do projeto [NOME]
- **Tipo:** Infra
- **O que foi feito:** Framework Elefante configurado. Stack definida. SSOT preenchido. Dashboard gerado.
- **Por que foi feito:** Setup inicial do projeto com o Framework Elefante.
- **Arquivos alterados:** liste os 3 arquivos que você acabou de editar
- **Próximo passo:** Configurar banco de dados e iniciar o primeiro módulo

---

### PASSO 6 — Atualizar `INDICE.md`

Abra `.elefante/INDICE.md` e adicione o log de inicialização na categoria **Inicialização e Setup**:

```
| YYYY-MM-DD | `YYYYMMDD_inicializacao_projeto.md` | Setup inicial — [NOME DO PROJETO] |
```

---

### PASSO 7 — Configurar Proteção SSOT (Kiro)

**Este passo configura a proteção automática contra esquecimento do SSOT.**

Crie a estrutura `.kiro/` na raiz do projeto com hooks e steering files:

```
.kiro/
├── hooks/
│   ├── ssot-commit-reminder.json
│   └── ssot-guard.json
└── steering/
    └── ssot-enforcement.md
```

**Opção A — Copiar do Framework Elefante:**
Se este projeto foi criado a partir do Framework Elefante, copie a pasta `.kiro/` já configurada.

**Opção B — Criar manualmente (se não existir):**
1. Crie os diretórios: `New-Item -ItemType Directory -Path ".kiro/hooks", ".kiro/steering" -Force`
2. Copie os arquivos de `.kiro/hooks/` e `.kiro/steering/` de um projeto Elefante existente

**O que fazem estes arquivos:**
- **ssot-enforcement.md** (steering): Regras sempre incluídas no contexto da IA, sobrevivem à compressão
- **ssot-commit-reminder.json** (hook): Verifica SSOT após cada tarefa concluída (PostTaskExec)
- **ssot-guard.json** (hook): Checklist final ao encerrar sessão (Stop)

**Estes arquivos previnem:**
- ✅ Esquecimento de atualizar SSOT em sessões longas
- ✅ Loops de verificação infinita
- ✅ Documentação desatualizada

---

### PASSO 8 — Apresentação final

Ao concluir todos os passos anteriores, responda ao usuário com esta mensagem (adaptada):

---

**🐘 Framework Elefante configurado e pronto!**

✅ `01-ESTADO_ATUAL.md` — preenchido com os dados do projeto  
✅ `02-REGRAS_E_CULTURA.md` — regras da stack configuradas  
✅ `DASHBOARD-ARQUITETURA.html` — abra no browser para visualizar a arquitetura  
✅ Log de inicialização criado em `historico/`  
✅ `.kiro/` — Proteção SSOT configurada (hooks + steering)

**Como usar a partir de agora:**  
Comece todo prompt com `#elefante` e eu já saberei tudo sobre o projeto.

**Exemplo:**
```
#elefante crie o módulo de autenticação na rota /login
```

**Proteção SSOT ativa:**
- Steering file `ssot-enforcement.md` garante atualização mesmo em sessões longas
- Hooks verificam automaticamente após cada tarefa e ao encerrar sessão
- Proteção contra loops em sessões com >30 tarefas

**Qual será a nossa primeira missão?**

---

> **Lembrete para a IA:** A partir deste momento, sempre que o usuário usar `#elefante`,
> siga o fluxo do `.agents/AGENTS.md`: ler memória → executar → atualizar memória.
