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

**MUST:** Validação de input em todas as entradas externas (forms, APIs, uploads).

---

## III. Banco de Dados

**MUST:** Nunca alterar uma migration já executada em produção. Sempre criar nova migration.

**MUST:** Nunca executar queries com variáveis não sanitizadas (SQL injection).

**SHOULD:** Toda tabela nova deve ter `created_at` e `updated_at`.

---

## IV. Rastreabilidade

**MUST:** O SSOT (`01-ESTADO_ATUAL.md`) deve refletir o estado atual do sistema. Não o estado de "quando lembrar de atualizar".

**SHOULD:** Toda tarefa significativa (>1h ou decisão arquitetural) deve ter log em `historico/`.

**SHOULD:** Armadilhas descobertas devem ser documentadas em `02-REGRAS_E_CULTURA.md` imediatamente.

---

## V. Princípios de Código

**MUST:** Sem lógica de negócio em controllers/views. Mover para services/actions.

**SHOULD:** Métodos com máximo 20 linhas. Funções com responsabilidade única.

**SHOULD:** Nomes descritivos que explicam o "porquê", não o "o quê".

---

## Governança

**Amendamento:** Princípios só podem ser alterados com:
1. Decisão explícita do dev ("altere o princípio X porque...")
2. Log em `historico/` documentando a mudança e a justificativa
3. Atualização deste arquivo

**Versão:** 1.0 | **Criado:** [PREENCHER DATA] | **Último amendamento:** [PREENCHER DATA]

---

> *Inspirado no conceito de "Constitution" do Spec Kit (github/spec-kit).
> Separar princípios imutáveis de regras operacionais evita que o essencial
> seja relativizado em sessões longas.*
