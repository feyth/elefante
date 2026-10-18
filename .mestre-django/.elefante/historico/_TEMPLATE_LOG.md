# Log de Tarefa â€” [TÃTULO DA TAREFA]

> **InstruÃ§Ãµes para a IA:** Use este template ao criar logs em `historico/`.
> Nomeie o arquivo como `YYYYMMDD_titulo_curto.md` (ex: `20260810_criar_modulo_auth.md`).
> Apague este bloco de instruÃ§Ãµes ao salvar o log real.

---

## Metadados
- **Data:** [YYYY-MM-DD]
- **DuraÃ§Ã£o estimada:** [ex: 2h]
- **Tipo:** [Feature / Bugfix / Refactor / Infra / Docs]
- **ResponsÃ¡vel:** [Dev / IA / Dupla]

---

## O que foi feito
> Descreva de forma clara e objetiva o que foi implementado ou corrigido.

- [Item 1]
- [Item 2]
- [Item 3]

---

## Por que foi feito
> Contexto e motivaÃ§Ã£o da tarefa. Isso evita que a IA (ou outro dev) desfaÃ§a a decisÃ£o no futuro.

[Explique o motivo, o problema que resolveu ou a melhoria que trouxe.]

---

## Arquivos alterados
> Liste os arquivos criados, modificados ou deletados.

| AÃ§Ã£o | Arquivo |
|---|---|
| âœ… Criado | `app/Models/Exemplo.php` |
| âœï¸ Modificado | `routes/web.php` |
| ðŸ—‘ï¸ Deletado | `app/Http/Controllers/Antigo.php` |

---

## DecisÃµes tomadas
> Registre decisÃµes arquiteturais com ID rastreÃ¡vel. Formato: `D[NNN] [TIPO] DecisÃ£o â†’ justificativa`
> Tipos: [ARCH] arquitetura, [STACK] tecnologia, [PATTERN] padrÃ£o de cÃ³digo, [INFRA] infraestrutura, [SECURITY] seguranÃ§a

| ID | Tipo | DecisÃ£o | Justificativa |
|---|---|---|---|
| D001 | [ARCH] | [Descreva a decisÃ£o] | [Por que foi tomada] |

> **Como referenciar em futuras sessÃµes:** "Ver D001 em `historico/YYYYMMDD_titulo.md`"

---

## Impacto na arquitetura
> O `01-ESTADO_ATUAL.md` foi atualizado? Se sim, o que mudou?

- [ ] `01-ESTADO_ATUAL.md` atualizado
- [ ] `00-PRINCIPIOS.md` impactado (princÃ­pio violado/amendado?)
- [ ] `DASHBOARD-ARQUITETURA.html` atualizado
- [ ] Nenhuma mudanÃ§a estrutural

---

## PrÃ³ximo passo
> Qual Ã© a continuaÃ§Ã£o natural desta tarefa?

[Descreva o prÃ³ximo passo ou deixe "Nenhum â€” tarefa concluÃ­da".]

---

## Handoff sugerido
> PrÃ³ximo comando natural apÃ³s esta tarefa (inspirado no spec-kit):

- Se criou novo mÃ³dulo: `#elefante verificar` â€” checar se SSOT reflete o mÃ³dulo
- Se tomou decisÃ£o arquitetural: `#elefante analisar` â€” verificar consistÃªncia com regras
- Se tarefa concluÃ­da: revisar `00-PRINCIPIOS.md` para garantir nenhum princÃ­pio foi violado

