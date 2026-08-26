# Integração com o Framework Elefante

A partir de agora, sempre que o usuário iniciar um prompt com a hashtag **#elefante**, você, como IA assistente, deve seguir ESTRITAMENTE o seguinte fluxo de comportamento:

---

## 1. ANTES — Leia a Mente (Cultura e Estado)

Antes de propor qualquer solução arquitetural ou escrever códigos grandes:

1. Leia silenciosamente `.elefante/00-PRINCIPIOS.md` (se existir) — verifique se a tarefa viola algum princípio **MUST**. Se violar, **BLOQUEIE** e avise o dev antes de prosseguir.
2. Leia silenciosamente `.elefante/01-ESTADO_ATUAL.md` — onde estamos, arquitetura atual, módulos existentes.
3. Leia silenciosamente `.elefante/02-REGRAS_E_CULTURA.md` — como codamos, armadilhas conhecidas.
4. Verifique `.elefante/hooks.yml` (se existir) — execute hooks `before_task` ativos antes de prosseguir.

Se o usuário pedir algo que fere as regras (ex: jQuery quando a regra proíbe), avise antes de executar.

### Clarificação estruturada (máx. 3 perguntas)

Se a tarefa tiver ambiguidades que mudam materialmente a implementação, faça **no máximo 3 perguntas**, uma por vez, antes de executar:

- Apresente sua recomendação antes das opções: `**Recomendado:** Opção X — [motivo em 1 frase]`
- Integre a resposta diretamente no SSOT após aceita
- Se o usuário disser "vai", "pode fazer", "sem perguntas" — execute sem clarificar
- Nunca faça mais de 3 perguntas por sessão de tarefa

---

## 2. DURANTE — Execute respeitando as regras

Implemente o que foi solicitado seguindo rigorosamente:
- Os padrões de código definidos em `02-REGRAS_E_CULTURA.md`
- A arquitetura atual descrita em `01-ESTADO_ATUAL.md`
- Os princípios invioláveis em `00-PRINCIPIOS.md`
- As armadilhas já documentadas (não repita erros conhecidos)
- Consulte `historico/` antes de criar algo — pode já ter sido feito

---

## 3. DEPOIS — Verifique e Atualize o SSOT

**ANTES de responder ao usuário**, execute este checklist (verifique **uma vez por resposta**):

### Checklist de Verificação Obrigatória

- [ ] **Modifiquei arquivos estruturais?**
  - `app/`, `database/`, `routes/`, `config/` (Laravel)
  - `models.py`, `views.py`, `urls.py`, `settings.py` (Django)
  - `app/`, `pages/`, `api/` (Next.js)
  - `.py`, `requirements.txt`, `pyproject.toml` (Python)
  - Ou equivalentes em outras stacks

- [ ] **Se SIM — `.elefante/01-ESTADO_ATUAL.md` reflete essas mudanças?**
  - Novo módulo adicionado à tabela de Módulos?
  - Nova integração externa documentada?
  - Decisão arquitetural registrada?
  - Se NÃO → **ATUALIZE AGORA** antes de responder

- [ ] **Descobri um bug ou armadilha nova?**
  - Adicione na tabela de Armadilhas em `02-REGRAS_E_CULTURA.md`

- [ ] **Tarefa foi significativa?** (>1h ou decisão arquitetural)
  - Crie log em `.elefante/historico/YYYYMMDD_titulo.md`
  - Use o template `_TEMPLATE_LOG.md` (inclui tabela de Decisões com IDs)
  - Atualize o `INDICE.md`

### Proteção contra loops em sessões longas

**IMPORTANTE:** Verifique o SSOT **uma vez por resposta**. Se já verificou, não verifique novamente.
- Se `git status` limpo e SSOT atualizado → apenas confirme e pare
- Em sessões com >30 tarefas → sugira `#elefante encerrar sessão`

### Handoff — próximo passo sugerido

Ao final de cada resposta significativa, sugira o próximo comando natural:

| Situação | Próximo passo sugerido |
|---|---|
| Criou módulo novo | `#elefante verificar` — confirmar SSOT convergido |
| Tomou decisão arquitetural | `#elefante analisar` — checar consistência com regras |
| Encontrou bug/armadilha | Documentar em `02-REGRAS_E_CULTURA.md` antes de continuar |
| Sessão longa (>5 tarefas) | `#elefante encerrar sessão` — salvar estado antes de parar |
| Feature concluída | Revisar `00-PRINCIPIOS.md` — nenhum princípio foi violado? |

---

## Comandos especiais #elefante

### `#elefante verificar`

**Propósito:** Comparar o estado atual do código com o SSOT e identificar divergências.
Operação **somente leitura** — nunca modifica código, apenas reporta.

**Execução:**
1. Carregue `01-ESTADO_ATUAL.md` como referência de verdade
2. Verifique hooks `before_verificar` em `hooks.yml` (se existir)
3. Para cada módulo listado no SSOT, verifique se existe no código
4. Para cada decisão arquitetural documentada, verifique se está implementada
5. Produza relatório estruturado:

```
## Relatório de Verificação

| Item | Status | Observação |
|---|---|---|
| Módulo X | ✅ Convergido | Corresponde ao SSOT |
| Módulo Y | ⚠️ Divergente | SSOT diz Service, código tem Controller |
| Integração Z | ❌ Ausente | Documentada no SSOT mas não encontrada no código |

**Resumo:** X convergidos, Y divergentes, Z ausentes
```

6. Se tudo convergido: "✅ SSOT convergido — nenhuma atualização necessária"
7. Se há divergências: liste cada uma com sugestão de correção (append-only — nunca reescreva o SSOT automaticamente sem confirmação)
8. Execute hooks `after_verificar` (se existir)

**Regra APPEND-ONLY:** O comando verificar NUNCA reescreve o SSOT automaticamente.
Apresenta os gaps, aguarda confirmação do dev para atualizar.

---

### `#elefante analisar`

**Propósito:** Análise cruzada de consistência entre os 3 arquivos core do `.elefante/`.
Operação **estritamente somente leitura** — não modifica nada, apenas reporta.

**Execução:**
1. Carregue os 3 artefatos: `01-ESTADO_ATUAL.md`, `02-REGRAS_E_CULTURA.md`, `00-PRINCIPIOS.md` (se existir)
2. Execute hooks `before_analisar` em `hooks.yml` (se existir)
3. Rode as 5 análises abaixo e produza relatório:

**Análise A — Módulos sem log histórico**
- Módulos marcados ✅ em `01-ESTADO_ATUAL.md` sem arquivo correspondente em `historico/`

**Análise B — Regras que contradizem histórico**
- Regras em `02-REGRAS_E_CULTURA.md` que contradizem decisões registradas em `historico/`

**Análise C — Princípios vs Regras**
- Princípios em `00-PRINCIPIOS.md` que conflitam com regras operacionais em `02-REGRAS_E_CULTURA.md`

**Análise D — SSOT desatualizado**
- Módulos documentados que não existem no código (baseado em `historico/` e estrutura listada)
- Data de "Status do Momento" anterior a 14 dias

**Análise E — Armadilhas sem rastreabilidade**
- Armadilhas na tabela que não têm log correspondente em `historico/`

**Formato do relatório:**

```
## Relatório de Análise

| ID | Categoria | Severidade | Local | Problema | Recomendação |
|---|---|---|---|---|---|
| A1 | Módulo sem log | MÉDIO | 01-ESTADO_ATUAL.md | Módulo Auth ✅ sem log | Criar historico/YYYYMMDD_auth.md |
| B1 | Contradição | ALTO | 02-REGRAS vs historico/ | Regra proíbe X, decisão D003 adotou X | Atualizar regra ou reverter decisão |

**Métricas:**
- Módulos verificados: X
- Inconsistências encontradas: Y (Z críticas, W médias)
- Cobertura de logs: X% dos módulos têm histórico

**Status geral:** [✅ Saudável / ⚠️ Atenção necessária / ❌ Inconsistências críticas]
```

4. Ofereça remediação: "Deseja que eu sugira correções para os itens acima?" (não aplica automaticamente)

---

### `#elefante clarificar`

**Propósito:** Sessão estruturada de clarificação antes de tarefa ambígua.
Máximo 3 perguntas. Respostas integradas ao SSOT imediatamente.

**Execução:**
1. Leia o contexto atual do SSOT
2. Identifique as 3 maiores ambiguidades que mudariam a implementação
3. Para cada pergunta (uma por vez):
   - Apresente sua recomendação primeiro: `**Recomendado:** [opção] — [motivo]`
   - Ofereça opções como tabela (máx. 4 opções)
   - Aguarde resposta antes de avançar
   - Integre a resposta no SSOT imediatamente após aceita
4. Ao final: informe quantas perguntas foram feitas e quais seções do SSOT foram atualizadas

**Regras:**
- Nunca mais de 3 perguntas por invocação
- Se usuário disser "vai" ou "sem perguntas" — encerre imediatamente
- Não pergunte sobre tecnologias se já estão definidas no SSOT

---

### `#elefante encerrar sessão`

Checklist final de encerramento:
- [ ] `01-ESTADO_ATUAL.md` reflete tudo que foi feito nesta sessão?
- [ ] Novas armadilhas documentadas em `02-REGRAS_E_CULTURA.md`?
- [ ] Log criado em `historico/` para tarefas significativas?
- [ ] `INDICE.md` atualizado com novos logs?

Execute `git status` para confirmar que nada estrutural ficou sem documentar.
Se tudo ok: "✅ Sessão encerrada com SSOT atualizado."

---

## Por que o SSOT não pode ficar desatualizado

O arquivo `01-ESTADO_ATUAL.md` é a **Única Fonte da Verdade (SSOT)** do projeto.

Em sessões longas, a compressão de contexto faz você esquecer regras e arquitetura.
O SSOT garante que você sempre tenha acesso à estrutura atual do projeto, mesmo após
dezenas de tarefas e milhares de mensagens.

**Regra de ouro:** O SSOT reflete o estado ATUAL, não "quando você lembrar de atualizar".
