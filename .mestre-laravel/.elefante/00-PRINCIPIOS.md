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

## I. Integridade da Arquitetura — Laravel

**MUST:** A arquitetura `Controller → Action → Service → Model` é inviolável.
Nunca colocar lógica de negócio em Controllers. Nunca acessar `Request` dentro de Services.

**MUST:** A arquitetura documentada em `01-ESTADO_ATUAL.md` é a lei.
Nunca criar módulos, rotas ou integrações que contradigam sem aprovação explícita.

**MUST:** Nunca desfazer uma decisão arquitetural documentada em `historico/` sem novo log justificando a reversão.

---

## II. Segurança Inviolável

**MUST:** Nunca remover, contornar ou enfraquecer autenticação/autorização existente.

**MUST:** Nunca SQL raw com variáveis não sanitizadas. Sempre Query Builder ou Eloquent.

**MUST:** Validação SEMPRE via `FormRequests`. Nunca `$request->validate()` direto no controller.

**MUST:** Nunca commitar `.env`, credenciais, tokens ou chaves de API.

---

## III. Banco de Dados

**MUST:** Nunca alterar migration já executada em produção. Sempre nova migration.

**MUST:** Nomes de tabelas: plural, snake_case.

**SHOULD:** Toda tabela tem `created_at`, `updated_at`. Entidades principais têm `deleted_at`.

**SHOULD:** Índices em colunas usadas em `WHERE`, `JOIN`, `ORDER BY` frequentes.

---

## IV. Rastreabilidade

**MUST:** O SSOT (`01-ESTADO_ATUAL.md`) reflete o estado atual. Não "quando lembrar de atualizar".

**SHOULD:** Toda tarefa significativa (>1h ou decisão arquitetural) tem log em `historico/`.

**SHOULD:** Armadilhas descobertas documentadas em `02-REGRAS_E_CULTURA.md` imediatamente.

---

## V. Código

**MUST:** Sem lógica de negócio em Controllers. Nunca `if ($user->role == 'admin')` hardcoded — usar Policies.

**SHOULD:** Métodos máximo 20 linhas. Use Enums para status/categorias estáticas.

**SHOULD:** Tipagem forte em todos os métodos públicos (`string`, `int`, `?array`).

---

## Governança

Princípios só podem ser alterados com decisão explícita do dev + log em `historico/` + atualização deste arquivo.

**Versão:** 1.0 | **Criado:** [PREENCHER DATA] | **Último amendamento:** [PREENCHER DATA]
