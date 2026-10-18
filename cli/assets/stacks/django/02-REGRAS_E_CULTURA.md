# Regras e Cultura de Engenharia — Stack Django

> **Regra para a IA:** Você deve respeitar as seguintes premissas técnicas ao gerar código.

---

## ⚠️ REGRA #0 — ATUALIZAÇÃO OBRIGATÓRIA DO SSOT

**Esta é a regra mais importante deste arquivo.**

Toda vez que você concluir uma tarefa que envolva:
- Criar/modificar/deletar um model, view, serializer, service ou command
- Criar/modificar uma migration ou estrutura de banco
- Adicionar uma integração externa (API, serviço de terceiro)
- Descobrir e corrigir um bug arquitetural
- Adicionar nova rota ou endpoint principal (`urls.py`)
- Criar um novo módulo ou app Django completa

Você DEVE atualizar `01-ESTADO_ATUAL.md` IMEDIATAMENTE, **antes de passar para a próxima tarefa ou responder ao usuário**.

### Por que esta regra existe

Em sessões longas com muitas tarefas, a compressão de contexto faz você esquecer regras.
O SSOT (Single Source of Truth) reflete o estado **ATUAL**, não o estado de "quando você lembrar de atualizar".

### Checklist de verificação

Antes de responder ao usuário após qualquer tarefa de código:

- [ ] Modifiquei arquivos em `models.py`, `views.py`, `urls.py`, `settings.py`, `services.py`?
- [ ] `01-ESTADO_ATUAL.md` reflete essas mudanças?
- [ ] Descobri uma armadilha/bug? Documentei na tabela de Armadilhas abaixo?
- [ ] Tarefa foi significativa (>1h)? Criei log em `historico/`?

**Não existe "atualizo no final da sessão". Faça agora.**

---

## 1. Padrões Gerais Python
- **PEP8:** Siga sempre. Máximo 100 caracteres por linha.
- **Type hints:** Obrigatório em todas as funções públicas (PEP 484).
- **Docstrings:** Em classes e métodos públicos complexos.
- Proibido lógica de negócio dentro de `views.py` — mova para `services.py`.

## 2. Backend — Django
- **Arquitetura:** `View (request/response) → Service (lógica) → Model (dados)`
- Class-Based Views preferidos sobre Function-Based Views
- Mixins para comportamentos reutilizáveis nas views
- `select_related` e `prefetch_related` obrigatórios para evitar N+1

## 3. Django REST Framework (se aplicável)
- ViewSets + Routers para APIs CRUD padrão
- Validação SEMPRE via Serializers (nunca manualmente na view)
- `SerializerMethodField` com moderação — prefira propriedades no model
- Paginação configurada globalmente no `settings.py`

## 4. Banco de Dados
- Nunca alterar migration já aplicada em produção — sempre nova migration
- `on_delete` sempre explícito nos ForeignKeys
- Índices em campos usados em `filter()`, `order_by()` frequentes
- Fixtures apenas para dados de teste — dados de produção via `data migrations`

## 5. Segurança
- `DEBUG = False` em produção — sem exceção
- Variáveis sensíveis SEMPRE via `env()` (python-decouple ou django-environ)
- CSRF ativo em todas as views que alteram estado
- Nunca expor stack trace em produção

## 6. Armadilhas — Erros que já aconteceram
| # | Armadilha | O que aconteceu | Como evitar |
|---|---|---|---|
| 1 | [Descreva o erro] | [O que causou] | [Como prevenir] |

## 7. Metodologia #elefante
- Ao receber `#elefante`, leia silenciosamente este diretório
- Se arquitetura mudar, atualize `01-ESTADO_ATUAL.md` imediatamente
- Ao finalizar task grande, crie log em `historico/` com o template


---

## 8. Checklist de Saúde do SSOT
> **Conceito:** Unit tests para a documentação — verifica se o SSOT está bem escrito, não se o código funciona.
> Use `#elefante analisar` para executar. Itens [Gap] indicam ausência documentada.

### Completude
- [ ] Cada app Django tem sua responsabilidade descrita no SSOT? [Completude]
- [ ] As integrações externas (APIs, serviços third-party) têm URL documentada? [Completude]
- [ ] As models principais estão listadas com seus campos-chave? [Completude, Gap se ausente]
- [ ] Decisões arquiteturais têm justificativa documentada? [Completude]

### Clareza
- [ ] A versão do Django e Python estão especificadas no SSOT? [Clareza]
- [ ] Os apps 🚧 têm descrição do que falta para ✅? [Clareza]
- [ ] A arquitetura `View → Service → Model` está documentada? [Clareza]

### Consistência
- [ ] As URLs em `urls.py` correspondem aos módulos documentados? [Consistência]
- [ ] As regras em `02-REGRAS_E_CULTURA.md` não contradizem decisões em `historico/`? [Consistência]
- [ ] Os princípios em `00-PRINCIPIOS.md` estão alinhados com as regras operacionais? [Consistência]

### Rastreabilidade
- [ ] Há pelo menos 1 log em `historico/` para cada feature principal? [Rastreabilidade, Gap se ausente]
- [ ] A tabela de Armadilhas tem entradas reais (não apenas o placeholder)? [Rastreabilidade]
- [ ] Decisões de models/migrations têm log correspondente? [Rastreabilidade]

### Atualidade
- [ ] A data em "Status do Momento" é dos últimos 14 dias? [Atualidade]
- [ ] Módulos ✅ realmente estão completos no código? [Atualidade]
