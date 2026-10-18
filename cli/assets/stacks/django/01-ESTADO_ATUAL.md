# Estado Atual do Sistema (Single Source of Truth)

> **Regra para a IA:** Se você precisar saber como o sistema está estruturado ou o que foi feito por último, a verdade absoluta está aqui.

## Informações do Projeto
- **Projeto:** [NOME DO SEU PROJETO AQUI]
- **Stack:** Python [VERSÃO], Django [VERSÃO] (ou FastAPI [VERSÃO])
- **Banco de Dados:** [PostgreSQL / MySQL / SQLite]
- **Frontend:** [Django Templates / DRF + React / HTMX]
- **Bibliotecas Chave:** [ex: DRF, Celery, Redis, Pillow]

## Arquitetura Django
### Estrutura de Apps
- **[app_name]/models.py:** Definição das entidades do banco
- **[app_name]/views.py:** Lógica de request/response (fina)
- **[app_name]/services.py:** Lógica de negócio
- **[app_name]/serializers.py:** Validação e serialização (DRF)
- **[app_name]/urls.py:** Rotas do módulo

### Apps do Projeto
| App | Descrição | Status |
|---|---|---|
| [app_name] | [Descrição] | ❌ Pendente |

## Módulos / Endpoints
| Endpoint | Método | View | Status |
|---|---|---|---|
| `/api/[recurso]/` | GET, POST | [ViewSet] | ❌ Pendente |

## Banco de Dados
- **Engine:** [django.db.backends.postgresql / mysql / sqlite3]
- Migrations aplicadas: `Não`
- Fixtures configuradas: `Não`

## Integrações Externas
| Serviço | URL Base | Autenticação | Usado Em |
|---|---|---|---|
| — | — | — | — |

## Decisões Arquiteturais
| Data | Decisão | Justificativa |
|---|---|---|
| [DATA] | Separar lógica em services.py | Manter views finas e facilitar testes unitários |

## Ambiente e Deploy
- **Ambiente de Produção:** [Heroku / VPS / Railway / AWS]
- **URL de Produção:** [https://seudominio.com.br]
- **WSGI/ASGI:** [Gunicorn / Uvicorn]
- **Variáveis críticas:** SECRET_KEY, DATABASE_URL, ALLOWED_HOSTS

## Status do Momento
- **Data Inicial:** [DATA AQUI]
- Projeto recém-inicializado com boilerplate Django do `#elefante`.
- Próximo passo: Configurar settings, banco de dados e rodar `python manage.py migrate`.
