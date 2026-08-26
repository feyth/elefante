# Log de Tarefa — [TÍTULO DA TAREFA]

> **Instruções para a IA:** Use este template ao criar logs em `historico/`.
> Nomeie o arquivo como `YYYYMMDD_titulo_curto.md` (ex: `20260810_criar_modulo_auth.md`).
> Apague este bloco de instruções ao salvar o log real.

---

## Metadados
- **Data:** [YYYY-MM-DD]
- **Duração estimada:** [ex: 2h]
- **Tipo:** [Feature / Bugfix / Refactor / Infra / Docs]
- **Responsável:** [Dev / IA / Dupla]

---

## O que foi feito
> Descreva de forma clara e objetiva o que foi implementado ou corrigido.

- [Item 1]
- [Item 2]
- [Item 3]

---

## Por que foi feito
> Contexto e motivação da tarefa. Isso evita que a IA (ou outro dev) desfaça a decisão no futuro.

[Explique o motivo, o problema que resolveu ou a melhoria que trouxe.]

---

## Arquivos alterados
> Liste os arquivos criados, modificados ou deletados.

| Ação | Arquivo |
|---|---|
| ✅ Criado | `app/Models/Exemplo.php` |
| ✏️ Modificado | `routes/web.php` |
| 🗑️ Deletado | `app/Http/Controllers/Antigo.php` |

---

## Decisões tomadas
> Registre decisões arquiteturais com ID rastreável. Formato: `D[NNN] [TIPO] Decisão → justificativa`
> Tipos: [ARCH] arquitetura, [STACK] tecnologia, [PATTERN] padrão de código, [INFRA] infraestrutura, [SECURITY] segurança

| ID | Tipo | Decisão | Justificativa |
|---|---|---|---|
| D001 | [ARCH] | [Descreva a decisão] | [Por que foi tomada] |

> **Como referenciar em futuras sessões:** "Ver D001 em `historico/YYYYMMDD_titulo.md`"

---

## Impacto na arquitetura
> O `01-ESTADO_ATUAL.md` foi atualizado? Se sim, o que mudou?

- [ ] `01-ESTADO_ATUAL.md` atualizado
- [ ] `00-PRINCIPIOS.md` impactado (princípio violado/amendado?)
- [ ] `DASHBOARD-ARQUITETURA.html` atualizado
- [ ] Nenhuma mudança estrutural

---

## Próximo passo
> Qual é a continuação natural desta tarefa?

[Descreva o próximo passo ou deixe "Nenhum — tarefa concluída".]

---

## Handoff sugerido
> Próximo comando natural após esta tarefa (inspirado no spec-kit):

- Se criou novo módulo: `#elefante verificar` — checar se SSOT reflete o módulo
- Se tomou decisão arquitetural: `#elefante analisar` — verificar consistência com regras
- Se tarefa concluída: revisar `00-PRINCIPIOS.md` para garantir nenhum princípio foi violado
