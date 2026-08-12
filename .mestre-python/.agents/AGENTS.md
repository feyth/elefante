# Integração com o Framework Elefante

A partir de agora, sempre que o usuário iniciar um prompt com a hashtag **#elefante**, você, como IA assistente, deve seguir ESTRITAMENTE o seguinte fluxo de comportamento:

## 1. ANTES — Leia a Mente (Cultura e Estado)

Antes de propor qualquer solução arquitetural ou escrever códigos grandes:
- Leia silenciosamente `.elefante/01-ESTADO_ATUAL.md` (onde estamos)
- Leia silenciosamente `.elefante/02-REGRAS_E_CULTURA.md` (como codamos)
- Se o usuário pedir algo que fere as regras (ex: pedir jQuery quando a regra proíbe), avise-o

## 2. DURANTE — Execute a tarefa respeitando as regras

Implemente o que foi solicitado seguindo rigorosamente:
- Os padrões de código definidos em `02-REGRAS_E_CULTURA.md`
- A arquitetura atual descrita em `01-ESTADO_ATUAL.md`
- As armadilhas já documentadas (não repita erros conhecidos)

## 3. DEPOIS — Verifique e Atualize o SSOT

**ANTES de responder ao usuário**, execute este checklist:

### Checklist de Verificação Obrigatória

- [ ] **Modifiquei arquivos estruturais?**
  - `app/`, `database/`, `routes/`, `config/` (Laravel)
  - `models.py`, `views.py`, `urls.py`, `settings.py` (Django)
  - `app/`, `pages/`, `api/` (Next.js)
  - Ou equivalentes em outras stacks

- [ ] **Se SIM — `.elefante/01-ESTADO_ATUAL.md` reflete essas mudanças?**
  - Novo módulo adicionado à tabela de Módulos?
  - Nova integração externa documentada?
  - Decisão arquitetural registrada?
  - Se NÃO → **ATUALIZE AGORA** antes de responder

- [ ] **Descobri um bug ou armadilha nova?**
  - Adicione na tabela de Armadilhas em `02-REGRAS_E_CULTURA.md`
  - Documente o erro, o que causou e como evitar

- [ ] **Tarefa foi significativa?** (>1h ou decisão arquitetural)
  - Crie log em `.elefante/historico/YYYYMMDD_titulo.md`
  - Use o template `_TEMPLATE_LOG.md`
  - Atualize o `INDICE.md` com referência ao log

### Proteção contra loops em sessões longas

**IMPORTANTE:** Se você já verificou o SSOT nesta resposta, NÃO verifique novamente.
- Verifique o SSOT **uma vez por resposta**
- Se `git status` limpo e SSOT atualizado → apenas confirme e pare
- Em sessões com >30 tarefas → sugira `#elefante encerrar sessão`

## Por que o SSOT não pode ficar desatualizado

O arquivo `01-ESTADO_ATUAL.md` é a **Única Fonte da Verdade (SSOT)** do projeto.

Em sessões longas, a compressão de contexto faz você esquecer regras e arquitetura.
O SSOT garante que você sempre tenha acesso à estrutura atual do projeto, mesmo após
dezenas de tarefas e milhares de mensagens.

**Regra de ouro:** O SSOT reflete o estado ATUAL, não "quando você lembrar de atualizar".
