# Estado Atual do Sistema (Single Source of Truth)

> **Regra para a IA:** Se você precisar saber como o sistema está estruturado ou o que foi feito por último, a verdade absoluta está aqui. O que estiver no diretório `historico/` é passado.

## Informações do Projeto
- **Projeto:** [NOME DO SEU PROJETO AQUI]
- **Stack:** Laravel [VERSÃO], PHP [VERSÃO], MySQL [VERSÃO]
- **Frontend:** [Blade + Tailwind / Blade + Bootstrap / Inertia + Vue / Inertia + React]
- **Bibliotecas Chave:** [ex: Spatie Permissions, Laravel Sanctum, Livewire]

## Arquitetura
### Backend (Laravel)
- **app/Http/Controllers/[Modulo]/:** Controllers finos — apenas recebem request e retornam response
- **app/Actions/[Modulo]/:** Orquestram operações (gerenciam transações DB)
- **app/Services/[Modulo]/:** Lógica de negócio complexa e integrações externas
- **app/Models/:** Eloquent models com relacionamentos e escopos
- **app/Http/Requests/[Modulo]/:** Validação centralizada via FormRequests

### Frontend
- **resources/views/[modulo]/:** Views Blade organizadas por módulo
- **resources/css/modulos/[modulo]/:** CSS específico por módulo
- **resources/js/modulos/[modulo]/:** JS específico por módulo

## Módulos do Sistema
| Módulo | Rota Base | Status |
|---|---|---|
| Autenticação | `/login` | 🚧 Em construção |
| Dashboard | `/dashboard` | ❌ Pendente |

## Banco de Dados
- **Banco:** MySQL [VERSÃO]
- Migrations iniciais aplicadas: `Não`
- Seeders configurados: `Não`
- Prefixo de tabelas: `[prefixo_]` (ou nenhum)

## Integrações Externas
| Serviço | URL Base | Autenticação | Usado Em |
|---|---|---|---|
| — | — | — | — |

## Decisões Arquiteturais
| Data | Decisão | Justificativa |
|---|---|---|
| [DATA] | Arquitetura Controller→Action→Service→Model | SOLID, separação de responsabilidades, facilita testes |

## Ambiente e Deploy
- **Ambiente de Produção:** [VPS / Forge / Envoyer / Docker]
- **URL de Produção:** [https://seudominio.com.br]
- **Processo de Deploy:** [ex: git push → Envoyer → zero-downtime]
- **Variáveis críticas:** APP_KEY, DB_PASSWORD, MAIL_PASSWORD
- **Servidor Web:** Nginx + PHP-FPM

## Status do Momento
- **Data Inicial:** [DATA AQUI]
- Projeto recém-inicializado com o boilerplate Laravel do `#elefante`.
- Próximo passo: Instalar dependências, configurar `.env` e rodar `php artisan migrate`.
