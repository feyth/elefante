# Estado Atual do Sistema (Single Source of Truth)

> **Regra para a IA:** Se você precisar saber como o sistema está estruturado ou o que foi feito por último, a verdade absoluta está aqui. O que estiver no diretório `historico/` é passado.

## Informações do Projeto
- **Projeto:** [NOME DO SEU PROJETO PYTHON AQUI]
- **Stack:** Python [VERSÃO], [FastAPI/Flask/Django/outro]
- **Bibliotecas Chave:** [INSERIR LIBS PRINCIPAIS, ex: SQLAlchemy, Pydantic, Celery, httpx]

## Arquitetura Inicial (Exemplo / Preencher)

### Estrutura de Diretórios
```
projeto/
├── src/
│   ├── __init__.py
│   ├── main.py              # Entry point
│   ├── config.py            # Configurações
│   ├── models/              # Modelos de dados
│   ├── services/            # Lógica de negócio
│   ├── routers/             # Endpoints (FastAPI) ou views (Flask)
│   └── utils/               # Utilitários
├── tests/
│   ├── unit/
│   └── integration/
├── requirements.txt
├── requirements-dev.txt
└── .env.example
```

### Backend
- **[Módulo ou Pacote]:** [Descrição do que faz]

## Módulos do Sistema
| Módulo | Endpoint/Rota | Status |
|---|---|---|
| Autenticação | `/auth/login` | 🚧 Em construção |
| API Principal | `/api/v1/` | ❌ Pendente |

## Dependências Python
- **Runtime:** [listar principais: fastapi, uvicorn, sqlalchemy, pydantic, etc.]
- **Desenvolvimento:** [pytest, black, mypy, ruff, etc.]
- **Arquivo:** `requirements.txt` / `pyproject.toml`

## Integrações Externas
> Liste aqui todas as APIs e serviços de terceiros utilizados no projeto.

| Serviço | URL Base | Biblioteca | Usado Em |
|---|---|---|---|
| [Nome da API] | `https://api.exemplo.com` | httpx | [Módulo X] |

## Decisões Arquiteturais
> **Regra para a IA:** Estas decisões foram tomadas conscientemente. NÃO reverta, substitua ou questione sem aprovação explícita do usuário.

| Data | Decisão | Justificativa |
|---|---|---|
| [DATA] | [Descrição da decisão, ex: "Usar FastAPI em vez de Flask"] | [Por que foi escolhido, ex: "Validação automática com Pydantic e docs interativos"] |

## Ambiente e Deploy
> Preencha com os dados do ambiente de produção e processo de deploy.

- **Ambiente de Produção:** [ex: Docker + Kubernetes / Heroku / Railway / AWS Lambda]
- **URL de Produção:** [https://seudominio.com.br]
- **Processo de Deploy:** [ex: git push → GitHub Actions → Docker build → deploy]
- **Variáveis de Ambiente críticas:** [Listar nomes (nunca valores): SECRET_KEY, DATABASE_URL, API_KEY, etc.]
- **Servidor ASGI/WSGI:** [ex: Uvicorn / Gunicorn]
- **Python version:** [ex: Python 3.11+]

## Status do Momento
- **Data Inicial:** [DATA AQUI]
- Projeto recém-inicializado utilizando o boilerplate do `#elefante` para Python.
- Próximo passo: Configurar ambiente virtual, instalar dependências e estrutura base.
