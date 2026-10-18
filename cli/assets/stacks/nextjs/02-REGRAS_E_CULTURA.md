# Regras e Cultura de Engenharia — Stack Next.js

> **Regra para a IA:** Você deve respeitar as seguintes premissas técnicas ao gerar código.

---

## ⚠️ REGRA #0 — ATUALIZAÇÃO OBRIGATÓRIA DO SSOT

**Esta é a regra mais importante deste arquivo.**

Toda vez que você concluir uma tarefa que envolva:
- Criar/modificar/deletar um componente de página, layout ou API route
- Adicionar Server Actions ou Route Handlers
- Adicionar uma integração externa (API, serviço de terceiro)
- Descobrir e corrigir um bug arquitetural
- Adicionar nova rota (pasta em `app/`)
- Criar um novo módulo ou feature completa

Você DEVE atualizar `01-ESTADO_ATUAL.md` IMEDIATAMENTE, **antes de passar para a próxima tarefa ou responder ao usuário**.

### Por que esta regra existe

Em sessões longas com muitas tarefas, a compressão de contexto faz você esquecer regras.
O SSOT (Single Source of Truth) reflete o estado **ATUAL**, não o estado de "quando você lembrar de atualizar".

### Checklist de verificação

Antes de responder ao usuário após qualquer tarefa de código:

- [ ] Modifiquei arquivos em `app/`, `pages/`, `api/`, `components/`, `lib/`?
- [ ] `01-ESTADO_ATUAL.md` reflete essas mudanças?
- [ ] Descobri uma armadilha/bug? Documentei na tabela de Armadilhas abaixo?
- [ ] Tarefa foi significativa (>1h)? Criei log em `historico/`?

**Não existe "atualizo no final da sessão". Faça agora.**

---

## 1. TypeScript — Obrigatório
- `strict: true` no tsconfig. Sem exceções.
- Proibido usar `any`. Use `unknown` e faça narrowing.
- Interfaces para objetos de domínio, `type` para uniões e utilitários.
- Todos os props de componentes tipados explicitamente.

## 2. Componentes React
- **Server Components por padrão** — `'use client'` apenas quando necessário (interatividade, hooks de estado)
- Nunca use `useEffect` para buscar dados — use Server Components ou React Query
- Componentes pequenos e com responsabilidade única (máximo 150 linhas)
- Props desestruturadas sempre com tipagem explícita

## 3. Rotas e API (App Router)
- Layouts aninhados para estrutura compartilhada
- Loading e Error boundaries por rota (`loading.tsx`, `error.tsx`)
- Server Actions para mutations (não criar API Route para cada ação de formulário)
- Validação de input via **Zod** em todas as Server Actions e Route Handlers

## 4. Estilização — [PREENCHER: Tailwind / CSS Modules]
- **100% Fluido:** Sem larguras fixas em pixels para containers principais
- **Tailwind (se usado):** Apenas classes utilitárias. Proibido `@apply` sem justificativa.
- **CSS Modules (se usado):** Um arquivo `.module.css` por componente

## 5. Performance
- Imagens SEMPRE via `next/image`
- Links SEMPRE via `next/link`
- Fontes via `next/font`
- `dynamic()` para componentes pesados client-side

## 6. Armadilhas — Erros que já aconteceram
| # | Armadilha | O que aconteceu | Como evitar |
|---|---|---|---|
| 1 | [Descreva o erro] | [O que causou] | [Como prevenir] |

## 7. Metodologia #elefante
- Ao receber `#elefante`, leia silenciosamente este diretório
- Se arquitetura mudar, atualize `01-ESTADO_ATUAL.md` imediatamente
- Ao finalizar task grande, crie log em `historico/` com o template


---

## 8. Checklist de Saúde do SSOT
> **Conceito:** Unit tests para a documentação — verifica se o SSOT está bem escrito, não se o código funciona.
> Use `#elefante analisar` para executar. Itens [Gap] indicam ausência documentada.

### Completude
- [ ] Cada rota principal em `app/` tem sua responsabilidade descrita no SSOT? [Completude]
- [ ] As integrações externas (APIs, serviços) têm URL/propósito documentado? [Completude]
- [ ] Server Components vs Client Components está documentado por módulo? [Completude, Gap se ausente]
- [ ] Decisões arquiteturais têm justificativa documentada? [Completude]

### Clareza
- [ ] A versão do Next.js e Node estão especificadas no SSOT? [Clareza]
- [ ] Os módulos 🚧 têm descrição do que falta para ✅? [Clareza]
- [ ] A estratégia de estado (Zustand, Context, useState) está documentada? [Clareza]

### Consistência
- [ ] As rotas documentadas correspondem às pastas em `app/`? [Consistência]
- [ ] As regras em `02-REGRAS_E_CULTURA.md` não contradizem decisões em `historico/`? [Consistência]
- [ ] Os princípios em `00-PRINCIPIOS.md` estão alinhados com as regras operacionais? [Consistência]

### Rastreabilidade
- [ ] Há pelo menos 1 log em `historico/` para cada feature principal? [Rastreabilidade, Gap se ausente]
- [ ] A tabela de Armadilhas tem entradas reais (não apenas o placeholder)? [Rastreabilidade]
- [ ] Decisões de Server vs Client Components têm log correspondente? [Rastreabilidade]

### Atualidade
- [ ] A data em "Status do Momento" é dos últimos 14 dias? [Atualidade]
- [ ] Módulos ✅ realmente estão completos no código? [Atualidade]
