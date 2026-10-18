---
inclusion: always
---

# REGRA CRÍTICA — SSOT Obrigatório

**Esta regra tem prioridade sobre todas as outras.**

Sempre que você modificar qualquer arquivo em:
- `app/` (models, controllers, jobs, mail, commands, enums, settings)
- `database/migrations/` ou `database/settings/`
- `routes/`
- `config/`
- Ou equivalentes em outras stacks (Django: `models.py`, `views.py`, `urls.py`; Next.js: `app/`, `pages/`, `api/`)

Você DEVE, antes de responder ao usuário:

1. Abrir `.elefante/01-ESTADO_ATUAL.md`
2. Verificar se as mudanças estão refletidas
3. Atualizar se necessário
4. Se descobriu um bug/armadilha nova: adicionar em `.elefante/02-REGRAS_E_CULTURA.md`
5. Se a tarefa foi significativa: criar log em `.elefante/historico/`

**Não é opcional. Não pode ser postergado para "depois". Faça agora.**

## O que exige atualização do SSOT?

### SEMPRE atualizar quando:
- ✅ Criar/modificar/deletar um model, entity ou tabela
- ✅ Adicionar nova rota ou endpoint principal
- ✅ Criar um novo módulo ou feature completa
- ✅ Adicionar integração externa (API, serviço de terceiro)
- ✅ Mudar stack ou biblioteca principal (ex: trocar Bootstrap por Tailwind)
- ✅ Alterar processo de deploy ou ambiente
- ✅ Descobrir e corrigir um bug arquitetural

### NÃO precisa atualizar quando:
- ❌ Ajuste de CSS/layout pontual
- ❌ Correção de typo em texto
- ❌ Refatoração interna sem mudança de interface
- ❌ Adicionar comentários no código

## Proteção contra loops em sessões longas

**IMPORTANTE:** Em sessões com muitas tarefas (>30), você pode entrar em loop de verificações.

**Regra de verificação única:**
- Verifique o SSOT **uma vez por resposta**
- Se já verificou nesta resposta, NÃO verifique novamente
- Se o `git status` estiver limpo e o SSOT atualizado, apenas confirme e pare

**Quando encerrar sessão longa:**
Se a sessão tiver mais de 30 tarefas concluídas, sugira ao usuário:
```
#elefante encerrar sessão
```
Isso evita acúmulo de contexto que causa loops.

## Por que esta regra existe

Contexto: em sessões longas, a compressão de contexto faz você esquecer regras.
Este arquivo existe para reforçar mesmo após compressão, pois está marcado com
`inclusion: always`, garantindo que estará sempre no seu contexto de trabalho.

---

*Framework Elefante 🐘 — Proteção SSOT v1.0*
