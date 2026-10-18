# Estado Atual do Sistema (Single Source of Truth)

> **Regra para a IA:** Se você precisar saber como o sistema está estruturado ou o que foi feito por último, a verdade absoluta está aqui.

## Informações do Projeto
- **Projeto:** [NOME DO SEU PROJETO AQUI]
- **Stack:** Next.js [VERSÃO], React [VERSÃO], TypeScript, [Tailwind / CSS Modules]
- **Banco de Dados:** [PostgreSQL / MySQL / SQLite] via [Prisma / Drizzle / Supabase]
- **Autenticação:** [NextAuth.js / Clerk / Auth.js]
- **Bibliotecas Chave:** [ex: Zod, React Query, Zustand, Radix UI]

## Arquitetura (App Router)
### Estrutura de pastas
- **app/:** Rotas e layouts (App Router — pastas = rotas)
- **app/api/:** API Routes e Route Handlers
- **components/:** Componentes React reutilizáveis (UI puro)
- **components/ui/:** Componentes base (shadcn/ui ou equivalente)
- **lib/:** Funções utilitárias e helpers
- **server/:** Server Actions e lógica server-side
- **types/:** Definições de tipos TypeScript

## Módulos / Rotas Principais
| Módulo | Rota | Tipo | Status |
|---|---|---|---|
| Home | `/` | Server Component | ❌ Pendente |
| Dashboard | `/dashboard` | Client Component | ❌ Pendente |
| API — Auth | `/api/auth/[...nextauth]` | Route Handler | ❌ Pendente |

## Banco de Dados
- ORM/Client: [Prisma / Drizzle]
- Schema em: `prisma/schema.prisma` ou `db/schema.ts`
- Migrations aplicadas: `Não`

## Integrações Externas
| Serviço | URL Base | Autenticação | Usado Em |
|---|---|---|---|
| — | — | — | — |

## Decisões Arquiteturais
| Data | Decisão | Justificativa |
|---|---|---|
| [DATA] | App Router (não Pages Router) | Melhor suporte a Server Components e layouts aninhados |

## Ambiente e Deploy
- **Plataforma:** [Vercel / Railway / AWS]
- **URL de Produção:** [https://seudominio.com.br]
- **Variáveis críticas:** DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL

## Status do Momento
- **Data Inicial:** [DATA AQUI]
- Projeto recém-inicializado com boilerplate Next.js do `#elefante`.
- Próximo passo: Configurar banco de dados e autenticação base.
