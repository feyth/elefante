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

## I. Integridade da Arquitetura — Python

**MUST:** A arquitetura documentada em `01-ESTADO_ATUAL.md` é a lei.
Nunca criar módulos, routers ou integrações que contradigam sem aprovação explícita.

**MUST:** Nunca desfazer uma decisão arquitetural documentada em `historico/` sem novo log justificando a reversão.

**MUST:** Proibido lógica de negócio dentro de endpoints/views. Mover para services.

---

## II. Segurança Inviolável

**MUST:** Variáveis sensíveis SEMPRE via variáveis de ambiente. Nunca hardcoded.

**MUST:** Validação de input em todas as entradas externas (Pydantic, Forms, etc).

**MUST:** Nunca commitar `.env`, credenciais, tokens ou chaves de API.

**MUST:** Nunca usar `eval()` ou `exec()` com dados externos.

---

## III. Qualidade de Código

**MUST:** Type hints obrigatórios em todas as funções públicas (PEP 484).

**MUST:** Dependências com versões fixadas (`package==1.2.3` no requirements.txt).

**SHOULD:** PEP8. Máximo 88-100 caracteres por linha.

**SHOULD:** Docstrings em classes e métodos públicos complexos.

---

## IV. Banco de Dados (se aplicável)

**MUST:** Nunca alterar migration já aplicada em produção. Sempre nova migration.

**MUST:** Índices em colunas usadas em queries frequentes.

---

## V. Rastreabilidade

**MUST:** O SSOT (`01-ESTADO_ATUAL.md`) reflete o estado atual. Não "quando lembrar de atualizar".

**SHOULD:** Toda tarefa significativa (>1h ou decisão arquitetural) tem log em `historico/`.

**SHOULD:** Armadilhas descobertas documentadas em `02-REGRAS_E_CULTURA.md` imediatamente.

---

## Governança

Princípios só podem ser alterados com decisão explícita do dev + log em `historico/` + atualização deste arquivo.

**Versão:** 1.0 | **Criado:** [PREENCHER DATA] | **Último amendamento:** [PREENCHER DATA]
