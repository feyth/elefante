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

## I. Integridade da Arquitetura

**MUST:** A arquitetura documentada em `01-ESTADO_ATUAL.md` é a lei.
Nunca criar módulos, rotas ou integrações que contradigam a arquitetura sem aprovação explícita.

**MUST:** Nunca desfazer uma decisão arquitetural documentada em `historico/` sem criar um novo log justificando a reversão.

**SHOULD:** Toda decisão arquitetural nova deve ser registrada em `01-ESTADO_ATUAL.md` imediatamente.

---

## II. Segurança Inviolável

**MUST:** Nunca remover, contornar ou enfraquecer mecanismos de autenticação e autorização existentes.

**MUST:** Nunca commitar credenciais, tokens, senhas ou chaves de API em código-fonte.

**MUST:** Validação de input em todas as entradas externas (formulários, APIs, uploads).

---

## III. Banco de Dados

**MUST:** Nunca alterar uma migration já executada em produção. Sempre criar nova migration.

**MUST:** Nunca executar queries com variáveis não sanitizadas (proteção contra SQL injection).

**SHOULD:** Toda tabela nova deve possuir timestamps de auditoria (`created_at` e `updated_at`).

---

## IV. Rastreabilidade e Governança

**MUST:** O SSOT (`01-ESTADO_ATUAL.md`) deve refletir o estado atual do sistema, atualizado logo após alterações estruturais.

**SHOULD:** Toda tarefa significativa (>1h de trabalho ou decisão arquitetural) deve ter log em `historico/`.

**SHOULD:** Armadilhas descobertas devem ser documentadas em `02-REGRAS_E_CULTURA.md` imediatamente para evitar reincidência.

---

## V. Princípios de Código

**MUST:** Sem lógica de negócio em controllers ou views. Lógica pertence a services, actions ou casos de uso.

**SHOULD:** Métodos objetivos com responsabilidade única (Single Responsibility Principle).

**SHOULD:** Nomes descritivos e semânticos que explicam a intenção do código.

---

## Governança

**Amendamento:** Princípios só podem ser alterados com:
1. Decisão explícita do desenvolvedor ("altere o princípio X porque...").
2. Log em `historico/` documentando a mudança e a justificativa técnica.
3. Atualização formal deste arquivo.
