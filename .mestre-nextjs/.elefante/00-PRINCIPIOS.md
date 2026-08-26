# Princípios Fundamentais do Projeto

> **Regra para a IA:** Este arquivo contém os princípios **não-negociáveis** do projeto.
> São diferentes das regras operacionais em `02-REGRAS_E_CULTURA.md`.
> Qualquer violação de um princípio MUST é **BLOQUEANTE** — avise o dev antes de prosseguir.
> Princípios só mudam com decisão explícita do dev, documentada em `historico/`.

---

## Como usar este arquivo

- **MUST** = Nunca violar. Bloquear execução e avisar o dev se uma tarefa violar.
- **SHOULD** = Preferência forte. Desvio requer justificativa documentada.
- **MAY** = Opcional, use quando aplicável.

---

## I. Integridade da Arquitetura — Next.js

**MUST:** A arquitetura documentada em `01-ESTADO_ATUAL.md` é a lei.
Nunca criar rotas, components ou integrações que contradigam sem aprovação explícita.

**MUST:** Nunca desfazer uma decisão arquitetural documentada em `historico/` sem novo log justificando a reversão.

**MUST:** Server Components por padrão. `'use client'` apenas quando estritamente necessário (interatividade, hooks de estado).

---

## II. TypeScript — Inviolável

**MUST:** `strict: true` no tsconfig. Sem exceções.

**MUST:** Proibido `any`. Use `unknown` com narrowing explícito.

**MUST:** Todos os props de componentes tipados explicitamente.

---

## III. Segurança

**MUST:** Nunca remover, contornar ou enfraquecer autenticação/autorização existente.

**MUST:** Validação via Zod em todas as Server Actions e Route Handlers.

**MUST:** Nunca commitar `.env`, credenciais, tokens ou chaves de API.

**MUST:** Nunca expor dados sensíveis em componentes client-side desnecessariamente.

---

## IV. Performance

**MUST:** Imagens SEMPRE via `next/image`. Nunca `<img>` direto.

**MUST:** Links SEMPRE via `next/link`. Nunca `<a>` para rotas internas.

**SHOULD:** Fontes via `next/font`. Sem imports externos de fontes.

---

## V. Rastreabilidade

**MUST:** O SSOT (`01-ESTADO_ATUAL.md`) reflete o estado atual. Não "quando lembrar de atualizar".

**SHOULD:** Toda tarefa significativa (>1h ou decisão arquitetural) tem log em `historico/`.

**SHOULD:** Armadilhas descobertas documentadas em `02-REGRAS_E_CULTURA.md` imediatamente.

---

## Governança

Princípios só podem ser alterados com decisão explícita do dev + log em `historico/` + atualização deste arquivo.

**Versão:** 1.0 | **Criado:** [PREENCHER DATA] | **Último amendamento:** [PREENCHER DATA]
