# Regras e Cultura de Engenharia — Stack Laravel

> **Regra para a IA:** Você deve respeitar as seguintes premissas técnicas ao gerar código ou auditar este projeto.

---

## ⚠️ REGRA #0 — ATUALIZAÇÃO OBRIGATÓRIA DO SSOT

**Esta é a regra mais importante deste arquivo.**

Toda vez que você concluir uma tarefa que envolva:
- Criar/modificar/deletar um model, controller, job, enum, command ou mailable
- Criar/modificar uma migration ou estrutura de banco
- Adicionar uma integração externa (API, serviço de terceiro)
- Descobrir e corrigir um bug arquitetural
- Adicionar nova rota ou endpoint principal
- Criar um novo módulo ou feature completa

Você DEVE atualizar `01-ESTADO_ATUAL.md` IMEDIATAMENTE, **antes de passar para a próxima tarefa ou responder ao usuário**.

### Por que esta regra existe

Em sessões longas com muitas tarefas, a compressão de contexto faz você esquecer regras.
O SSOT (Single Source of Truth) reflete o estado **ATUAL**, não o estado de "quando você lembrar de atualizar".

### Checklist de verificação

Antes de responder ao usuário após qualquer tarefa de código:

- [ ] Modifiquei arquivos em `app/`, `database/`, `routes/`, `config/`?
- [ ] `01-ESTADO_ATUAL.md` reflete essas mudanças?
- [ ] Descobri uma armadilha/bug? Documentei na tabela de Armadilhas abaixo?
- [ ] Tarefa foi significativa (>1h)? Criei log em `historico/`?

**Não existe "atualizo no final da sessão". Faça agora.**

---

## 1. Padrões Gerais
- **Clean Code:** Métodos curtos, nomes descritivos. Máximo 20 linhas por método.
- **SOLID:** Controllers não contêm lógica de negócio. Services não acessam Request.
- **Segurança:** Nunca SQL raw com variáveis. Sempre Query Builder ou Eloquent.

## 2. Backend — Laravel
- **Arquitetura obrigatória:** `Controller → Action → Service → Model`
- Use tipagem forte (`string`, `int`, `?array`) em todos os métodos públicos
- **Enums** para status e categorias estáticas no banco
- Validação SEMPRE via `FormRequests` (nunca `$request->validate()` no controller)
- Prefixo de namespace por módulo: `App\Http\Controllers\[Modulo]\`
- Policies para controle de acesso (nunca `if ($user->role == 'admin')` hardcoded)
- Events + Listeners para side effects (emails, notificações, logs)

## 3. Frontend — [PREENCHER: Tailwind / Bootstrap / Vue / React]
- **100% Fluido:** Nenhuma view principal com `max-width` hardcoded
- **Sem CSS inline estático:** Sempre mover para classes
- Componentização via Blade Components (`<x-componente />`)
- [ADICIONAR regras específicas do frontend escolhido]

## 4. Banco de Dados
- Nomes de tabelas: plural, snake_case (`user_permissions`, `order_items`)
- Toda tabela tem `created_at`, `updated_at`
- Soft deletes (`deleted_at`) em tabelas de entidades principais
- Nunca alterar migration já executada em produção — sempre nova migration
- Índices em colunas usadas em `WHERE`, `JOIN`, `ORDER BY` frequentes

## 5. Testes
- Toda Action deve ter teste em `tests/Unit/Actions/`
- Factories para todos os Models
- `RefreshDatabase` em Feature tests
- Nomenclatura: `CriarModuloEntidadeActionTest.php`

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
- [ ] Cada módulo Laravel (Controller, Service, Model) tem responsabilidade descrita? [Completude]
- [ ] Todas as integrações externas (APIs, serviços) têm URL/credencial documentada? [Completude]
- [ ] As migrations principais estão listadas no SSOT? [Completude, Gap se ausente]
- [ ] Decisões arquiteturais têm justificativa documentada? [Completude]

### Clareza
- [ ] A versão do Laravel e PHP estão especificadas no SSOT? [Clareza]
- [ ] Os módulos 🚧 têm descrição do que falta para ✅? [Clareza]
- [ ] A arquitetura `Controller → Action → Service → Model` está descrita? [Clareza]

### Consistência
- [ ] As rotas em `routes/` correspondem aos módulos documentados? [Consistência]
- [ ] As regras em `02-REGRAS_E_CULTURA.md` não contradizem decisões em `historico/`? [Consistência]
- [ ] Os princípios em `00-PRINCIPIOS.md` estão alinhados com as regras operacionais? [Consistência]

### Rastreabilidade
- [ ] Há pelo menos 1 log em `historico/` para cada feature principal? [Rastreabilidade, Gap se ausente]
- [ ] A tabela de Armadilhas tem entradas reais (não apenas o placeholder)? [Rastreabilidade]
- [ ] Decisões de migrations têm log correspondente? [Rastreabilidade]

### Atualidade
- [ ] A data em "Status do Momento" é dos últimos 14 dias? [Atualidade]
- [ ] Módulos ✅ realmente estão completos no código? [Atualidade]
