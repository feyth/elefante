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

## I. Integridade da Arquitetura — Django

**MUST:** A arquitetura `View (request/response) → Service (lógica) → Model (dados)` é inviolável.
Nunca colocar lógica de negócio em `views.py`. Mover para `services.py`.

**MUST:** A arquitetura documentada em `01-ESTADO_ATUAL.md` é a lei.
Nunca criar apps, URLs ou integrações que contradigam sem aprovação explícita.

**MUST:** Nunca desfazer uma decisão arquitetural documentada em `historico/` sem novo log justificando a reversão.

---

## II. Segurança Inviolável

**MUST:** `DEBUG = False` em produção. Sem exceção.

**MUST:** Variáveis sensíveis SEMPRE via variáveis de ambiente. Nunca hardcoded.

**MUST:** CSRF ativo em todas as views que alteram estado.

**MUST:** Nunca expor stack trace em produção.

**MUST:** Nunca commitar `.env`, credenciais, tokens ou chaves de API.

---

## III. Banco de Dados

**MUST:** Nunca alterar migration já aplicada em produção. Sempre nova migration.

**MUST:** `on_delete` sempre explícito em ForeignKeys.

**SHOULD:** Índices em campos usados em `filter()`, `order_by()` frequentes.

**SHOULD:** `select_related` e `prefetch_related` para evitar N+1.

---

## IV. Rastreabilidade

**MUST:** O SSOT (`01-ESTADO_ATUAL.md`) reflete o estado atual. Não "quando lembrar de atualizar".

**SHOULD:** Toda tarefa significativa (>1h ou decisão arquitetural) tem log em `historico/`.

**SHOULD:** Armadilhas descobertas documentadas em `02-REGRAS_E_CULTURA.md` imediatamente.

---

## V. Código Python

**MUST:** Type hints obrigatórios em todas as funções públicas (PEP 484).

**MUST:** Validação SEMPRE via Serializers (DRF) ou Forms. Nunca manual na view.

**SHOULD:** PEP8. Máximo 100 caracteres por linha.

---

## Governança

Princípios só podem ser alterados com decisão explícita do dev + log em `historico/` + atualização deste arquivo.

**Versão:** 1.0 | **Criado:** [PREENCHER DATA] | **Último amendamento:** [PREENCHER DATA]
