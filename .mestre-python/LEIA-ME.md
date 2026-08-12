# Template Elefante — Stack Python

Este é o template do Framework Elefante específico para projetos **Python** (FastAPI, Flask, scripts, bibliotecas).

## 🐍 Stack Suportada

- **Python 3.9+** (recomendado 3.11+)
- **FastAPI** (API moderna com validação automática)
- **Flask** (micro-framework flexível)
- **Scripts Python** (CLI, automações, data science)
- **Bibliotecas Python** (pacotes reutilizáveis)

## 📂 O que vem configurado

```
.mestre-python/
├── .elefante/
│   ├── 01-ESTADO_ATUAL.md       # Template para Python
│   ├── 02-REGRAS_E_CULTURA.md   # Regras PEP8, type hints, pytest
│   ├── QUICK-REFERENCE.md
│   ├── INDICE.md
│   └── historico/
├── .agents/
│   └── AGENTS.md                # Fluxo atualizado
├── .kiro/
│   ├── hooks/                   # Proteção SSOT automática
│   └── steering/
├── INICIAR.md
├── README-ELEFANTE.md
└── LEIA-ME.md                   # Este arquivo
```

## 🚀 Como usar este template

### 1. Copiar para seu projeto

```powershell
# Na raiz do seu projeto Python
Copy-Item -Recurse "caminho/elefante/.mestre-python/*" .
```

### 2. Inicializar o Elefante

Abra o Kiro/cursor/IDE e digite:

```
#elefante iniciar_projeto
```

A IA vai:
- Fazer entrevista sobre o projeto
- Detectar `requirements.txt`, `pyproject.toml`, `setup.py`
- Preencher automaticamente o SSOT
- Configurar regras específicas para Python

### 3. Começar a usar

Todo prompt deve iniciar com `#elefante`:

```
#elefante crie a API de autenticação com FastAPI e JWT
```

## 📋 Regras específicas Python neste template

- **PEP8 obrigatório** (formatação via Black)
- **Type hints** em todas as funções públicas
- **Pytest** como framework de testes padrão
- **Validação de input** sempre via bibliotecas (Pydantic, marshmallow)
- **Gerenciamento de dependências** pinned em `requirements.txt`
- **Variáveis de ambiente** via `.env` + `python-dotenv`

## 🛡️ Proteção SSOT

Este template já vem com a proteção automática do SSOT configurada:
- ✅ Steering file (`.kiro/steering/ssot-enforcement.md`)
- ✅ Hooks (PostTaskExec + Stop)
- ✅ REGRA #0 destacada

## 🔗 Diferenças para outros templates

| Template | Foco | Arquivos específicos |
|---|---|---|
| `.mestre-python` | Python geral | `requirements.txt`, `.py`, `pyproject.toml` |
| `.mestre-django` | Django framework | `models.py`, `views.py`, `urls.py`, `settings.py` |
| `.mestre-laravel` | Laravel/PHP | `composer.json`, Controllers, Models, Migrations |
| `.mestre-nextjs` | Next.js/React | `app/`, `pages/`, `components/`, TypeScript |

## 📚 Mais informações

- Veja `README-ELEFANTE.md` para documentação completa do framework
- Veja `INICIAR.md` para o roteiro passo a passo de setup
- Veja `.elefante/02-REGRAS_E_CULTURA.md` para regras Python específicas

---

*Template criado em: 2026-08-12*  
*Framework Elefante v2.1 — Python Edition*  
*[Feyth Tecnologia](https://www.feyth.com.br)*
