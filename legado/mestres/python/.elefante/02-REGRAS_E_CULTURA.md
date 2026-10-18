# Regras e Cultura de Engenharia — Stack Python

> **Regra para a IA:** Você deve respeitar as seguintes premissas técnicas ao gerar código.

---

## ⚠️ REGRA #0 — ATUALIZAÇÃO OBRIGATÓRIA DO SSOT

**Esta é a regra mais importante deste arquivo.**

Toda vez que você concluir uma tarefa que envolva:
- Criar/modificar/deletar um módulo Python, função, classe ou script
- Adicionar/modificar dependências no `requirements.txt` ou `pyproject.toml`
- Adicionar uma integração externa (API, serviço de terceiro, biblioteca)
- Descobrir e corrigir um bug arquitetural
- Criar um novo módulo ou pacote Python
- Modificar estrutura de diretórios do projeto

Você DEVE atualizar `01-ESTADO_ATUAL.md` IMEDIATAMENTE, **antes de passar para a próxima tarefa ou responder ao usuário**.

### Por que esta regra existe

Em sessões longas com muitas tarefas, a compressão de contexto faz você esquecer regras.
O SSOT (Single Source of Truth) reflete o estado **ATUAL**, não o estado de "quando você lembrar de atualizar".

### Checklist de verificação

Antes de responder ao usuário após qualquer tarefa de código:

- [ ] Modifiquei arquivos Python (`.py`), `requirements.txt`, `pyproject.toml`, `setup.py`?
- [ ] `01-ESTADO_ATUAL.md` reflete essas mudanças?
- [ ] Descobri uma armadilha/bug? Documentei na tabela de Armadilhas abaixo?
- [ ] Tarefa foi significativa (>1h)? Criei log em `historico/`?

**Não existe "atualizo no final da sessão". Faça agora.**

---

## 1. Padrões Gerais Python
- **PEP8:** Siga sempre. Use `black` para formatação automática.
- **Máximo 88 caracteres por linha** (padrão Black) ou 100 (se configurado)
- **Type hints:** Obrigatório em todas as funções públicas (PEP 484)
- **Docstrings:** Formato Google ou NumPy em classes e métodos públicos complexos
- **Clean Code:** Funções pequenas (máximo 20 linhas), nomes descritivos

## 2. Estrutura de Projeto Python
- Use estrutura modular com `src/` ou estrutura flat conforme tamanho
- `__init__.py` em todos os pacotes (mesmo vazios para Python 3.3+)
- Separação clara: `core/`, `utils/`, `tests/`, `config/`
- Gerenciamento de dependências: `requirements.txt` + `requirements-dev.txt` OU `pyproject.toml` (Poetry/Hatch)

## 3. Frameworks Comuns

### FastAPI
- **Arquitetura:** `Router → Service → Repository/Model`
- Validação via **Pydantic models** (nunca validação manual)
- Dependency Injection para database sessions
- Documentação automática sempre habilitada (`/docs`, `/redoc`)
- Proibido lógica de negócio dentro dos endpoints

### Flask
- **Blueprints** para modularização
- Flask-SQLAlchemy ou SQLAlchemy core para ORM
- Factory pattern (`create_app()`) para configuração
- Variáveis sensíveis via `python-dotenv`

### Django (se aplicável)
- Ver arquivo específico em `.mestre-django/`

## 4. Testes
- **pytest** como framework padrão
- Estrutura de testes espelha estrutura do código (`tests/unit/`, `tests/integration/`)
- Fixtures em `conftest.py`
- Coverage mínimo: 80% (configurado em `pytest.ini` ou `pyproject.toml`)
- Mock de APIs externas e I/O

## 5. Gerenciamento de Dependências
- **requirements.txt:** Pinned versions (`package==1.2.3`)
- **requirements-dev.txt:** Ferramentas de desenvolvimento (pytest, black, mypy, ruff)
- **pyproject.toml:** Se usar Poetry, Hatch ou setuptools moderno
- Nunca commitar `.venv/`, `__pycache__/`, `*.pyc`

## 6. Segurança
- Variáveis sensíveis SEMPRE via variáveis de ambiente (`.env` + `python-dotenv`)
- Nunca hardcode senhas, tokens, chaves API
- Validação de input em todas as entradas externas
- Use bibliotecas confiáveis (requests, httpx) - nunca urllib sem validação

## 7. Banco de Dados (se aplicável)
- **SQLAlchemy:** Migrations via Alembic
- **Django ORM:** Migrations nativas
- Nunca alterar migration já aplicada em produção
- Índices em colunas usadas em `WHERE`, `JOIN`, `ORDER BY`

## 8. Armadilhas — Erros que já aconteceram
| # | Armadilha | O que aconteceu | Como evitar |
|---|---|---|---|
| 1 | [Descreva o erro] | [O que causou] | [Como prevenir] |

## 9. Metodologia #elefante
- Ao receber `#elefante`, leia silenciosamente este diretório
- Se arquitetura mudar, atualize `01-ESTADO_ATUAL.md` imediatamente
- Ao finalizar task grande, crie log em `historico/` com o template


---

## 10. Checklist de Saúde do SSOT
> **Conceito:** Unit tests para a documentação — verifica se o SSOT está bem escrito, não se o código funciona.
> Use `#elefante analisar` para executar. Itens [Gap] indicam ausência documentada.

### Completude
- [ ] Cada módulo Python tem sua responsabilidade descrita no SSOT? [Completude]
- [ ] As integrações externas (APIs, bibliotecas críticas) têm propósito documentado? [Completude]
- [ ] As dependências principais do `requirements.txt` estão listadas no SSOT? [Completude, Gap se ausente]
- [ ] Decisões arquiteturais têm justificativa documentada? [Completude]

### Clareza
- [ ] A versão do Python e framework principal estão especificados no SSOT? [Clareza]
- [ ] Os módulos 🚧 têm descrição do que falta para ✅? [Clareza]
- [ ] A arquitetura (Router → Service → Repository ou equivalente) está documentada? [Clareza]

### Consistência
- [ ] Os módulos documentados existem como diretórios/arquivos no projeto? [Consistência]
- [ ] As regras em `02-REGRAS_E_CULTURA.md` não contradizem decisões em `historico/`? [Consistência]
- [ ] Os princípios em `00-PRINCIPIOS.md` estão alinhados com as regras operacionais? [Consistência]

### Rastreabilidade
- [ ] Há pelo menos 1 log em `historico/` para cada feature principal? [Rastreabilidade, Gap se ausente]
- [ ] A tabela de Armadilhas tem entradas reais (não apenas o placeholder)? [Rastreabilidade]
- [ ] Mudanças de dependências têm log correspondente? [Rastreabilidade]

### Atualidade
- [ ] A data em "Status do Momento" é dos últimos 14 dias? [Atualidade]
- [ ] Módulos ✅ realmente estão completos no código? [Atualidade]
