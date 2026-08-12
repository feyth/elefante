# Regras e Cultura de Engenharia

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

- [ ] Modifiquei arquivos em `app/`, `database/`, `routes/`, `config/` (ou equivalentes)?
- [ ] `01-ESTADO_ATUAL.md` reflete essas mudanças?
- [ ] Descobri uma armadilha/bug? Documentei na tabela de Armadilhas abaixo?
- [ ] Tarefa foi significativa (>1h)? Criei log em `historico/`?

**Não existe "atualizo no final da sessão". Faça agora.**

---

## 1. Padrões de Código e Arquitetura
- **Clean Code:** Mantenha métodos curtos, nomes descritivos em português (ou inglês, dependendo do padrão da equipe).
- **Responsabilidade Única (SOLID):** Controllers não devem conter regras de negócio complexas.
- **Segurança:** Nunca injete variáveis diretamente em SQL brute (Raw). Use sempre o Query Builder/ORM.

## 2. Backend
> Adapte esta seção conforme a stack do projeto. Remova as seções que não se aplicam.

### PHP / Laravel
- Use tipagem forte (`string`, `int`, `?array`) nas entradas e retornos de métodos.
- Utilize **Enums** sempre que houver status ou categorias estáticas no banco.
- Validação sempre centralizada (ex: `FormRequests`).
- Arquitetura: `Controller → Action → Service → Model`. Controllers não contêm lógica de negócio.

### Node.js / Express / NestJS
- Use TypeScript com tipagem estrita (`strict: true` no tsconfig).
- Separe rotas, controllers e services em camadas distintas.
- Validação centralizada com Zod, Joi ou class-validator.
- Nunca use `any` sem justificativa documentada.

### Python / Django / FastAPI
- Siga PEP8. Use type hints em todas as funções públicas.
- Separe views, serializers e services.
- Validação via serializers (DRF) ou Pydantic (FastAPI).
- Nunca coloque lógica de negócio diretamente nas views.

## 3. Frontend
> Adapte esta seção conforme a stack do projeto.

### Geral (aplica a todas as stacks)
- **100% Fluido:** Nenhuma view principal deve ter `max-width` hardcoded.
- **Sem CSS Inline Estático:** Estilos fixos nunca devem usar `style=""`. Devem ser movidos para classes.
- Preferência por Componentização (Blade Components, React Components, Vue Components, etc).

### Tailwind CSS
- Use classes utilitárias do Tailwind. Proibido criar CSS customizado para o que o Tailwind já resolve.
- Breakpoints padrão: `sm`, `md`, `lg`, `xl`. Não criar breakpoints customizados sem aprovação.

### Bootstrap
- Use apenas as classes nativas do Bootstrap. Evite sobrescrever estilos do framework.
- Componentes JS do Bootstrap são preferidos sobre bibliotecas externas equivalentes.

### Vanilla JS / Alpine.js
- Nenhuma biblioteca externa de UI sem aprovação explícita (ex: proibido jQuery).
- Prefira Alpine.js para interatividade leve antes de adicionar React/Vue.

## 4. Banco de Dados
- Nunca altere uma migration já executada em produção. Crie uma nova migration.
- Nomes de tabelas no plural, em snake_case (ex: `user_permissions`).
- Toda tabela deve ter `created_at` e `updated_at`.
- Índices obrigatórios em colunas usadas em `WHERE`, `JOIN` e `ORDER BY` frequentes.

## 5. Armadilhas — Erros que já aconteceram neste projeto
> **Regra para a IA:** Estes são erros reais já cometidos. Nunca repita.
> Ao identificar uma nova armadilha durante o desenvolvimento, adicione aqui.

| # | Armadilha | O que aconteceu | Como evitar |
|---|---|---|---|
| 1 | [Descreva o erro] | [O que causou, ex: "N+1 query em loop de pedidos"] | [Como prevenir, ex: "Sempre usar eager loading com `with()`"] |

> *Este bloco será preenchido pela IA conforme erros forem identificados ao longo do projeto.*

## 6. Metodologia #elefante
- Ao receber o comando `#elefante`, **leia a mente** deste diretório silenciosamente.
- Se a arquitetura mudar, **atualize o 01-ESTADO_ATUAL.md imediatamente**.
- Ao finalizar uma task grande, crie um novo log em `historico/` usando o template `_TEMPLATE_LOG.md`.
- Consulte `historico/` antes de refazer algo — pode já ter sido feito e documentado.
