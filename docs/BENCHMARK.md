# 📊 Protocolo de Avaliação Empírica e Benchmark (Eval)

> **Documento de Engenharia:** Metodologia de medição e validação experimental do Framework Elefante contra o desenvolvimento assistido por IA sem controle de contexto ou com arquivos estáticos simples.

---

## 1. Objetivo do Benchmark

O objetivo deste protocolo é substituir alegações vagas de marketing por **evidências auditáveis e reproduzíveis** de que o Framework Elefante:
1. **Reduz o *Context Drift*:** A IA mantém a consistência com as decisões arquiteturais e convenções de código ao longo de múltiplas tarefas consecutivas.
2. **Evita Regressão de Regras:** A IA não repete erros já catalogados como armadilhas (`02-REGRAS_E_CULTURA.md`).
3. **Agrega Valor Real frente a Regras Estáticas:** Demonstra empiricamente o diferencial de um SSOT dinâmico + Princípios MUST frente a um simples arquivo manual estático (`AGENTS.md` ou `CLAUDE.md` básico).
4. **Otimiza o Orçamento de Tokens:** Reduz o número de tokens desnecessários consumidos por prompts de exploração cega de repositório.

---

## 2. Metodologia de Teste Controlado

### 2.1 Modelos Avaliados
O benchmark é executado contra os principais modelos de fronteira utilizados em pair programming:
- **Anthropic Claude 3.5 Sonnet / Claude 3.7**
- **OpenAI GPT-4o**
- **Google Gemini 1.5 Pro**

### 2.2 Cenários Comparativos (3 Baselines)
Para responder com rigor "o que o Elefante acrescenta além de um arquivo de regras simples?", cada tarefa é executada em 3 condições idênticas:

1. **Condição A (Zero Context):** O modelo opera sem nenhum arquivo de regras ou contexto persistente, dependendo apenas do prompt do usuário e da exploração cega dos arquivos.
2. **Condição B (Regras Estáticas):** O modelo recebe um arquivo estático padrão (`AGENTS.md` ou `CLAUDE.md` manual) contendo apenas uma lista de convenções de código e proibições genéricas, sem SSOT dinâmico nem catálogo estruturado de armadilhas.
3. **Condição C (Framework Elefante v3.0):** O modelo opera com o ecossistema completo do Elefante: `00-PRINCIPIOS.md` (leis MUST invioláveis), `01-ESTADO_ATUAL.md` (SSOT mantido a cada commit) e `02-REGRAS_E_CULTURA.md` (catálogo de armadilhas mapeadas).

---

## 3. Bateria de Tarefas Sequenciais (20 Tarefas)

Uma bateria de 20 tarefas sequenciais simulando 3 semanas de evolução de uma API de E-commerce:
- **Tarefas 1 a 5 (Fundação):** Criação de models, migrations, schemas e rotas base.
- **Tarefas 6 a 10 (Regras de Negócio):** Refatorações, implementação de taxas, checkout e políticas de autorização.
- **Tarefas 11 a 15 (Evolução e Manutenção):** Extensão de endpoints existentes (testa se o modelo cria rotas duplicadas ou se reutiliza a arquitetura já consolidada).
- **Tarefas 16 a 20 (Testes de Armadilha e Invasão):** Tarefas com prompts deliberadamente indutores (ex: pedir para usar bibliotecas descontinuadas ou alterar migrations já rodadas), testando se os princípios MUST bloqueiam a violação.

---

## 4. Métricas de Avaliação

| Métrica | Definição | Como é calculada |
|---|---|---|
| **Taxa de Deriva Arquitetural (ADR Drift)** | % de tarefas em que o modelo violou um padrão estabelecido em tarefas anteriores. | `(violações / 20) * 100` |
| **Taxa de Armadilhas Evitadas (Pitfall Avoidance)** | % de tarefas indutoras em que o modelo rejeitou ou corrigiu o caminho incorreto por causa do catálogo. | `(armadilhas evitadas / armadilhas testadas) * 100` |
| **Integridade de Documentação (SSOT Sync)** | % de tarefas em que o estado atual do sistema refletiu fidedignamente o código produzido. | `(tarefas com SSOT sincronizado / total de tarefas)` |
| **Consumo Médio de Tokens de Entrada** | Tokens de contexto consumidos pelo agente para entender a tarefa antes de gerar a resposta. | Medição via SDK / Proxy de API |

---

## 5. Estrutura do Test Harness (Harness Automatizado)

Para garantir reprodutibilidade por terceiros, o harness opera em script independente:

```
tests/eval/
├── dataset/                     # Bateria de 20 prompts e gabarito de validação
├── fixtures/                    # Repositório de código no estado inicial
├── runners/
│   ├── run_zero_context.js      # Condição A
│   ├── run_static_rules.js      # Condição B
│   └── run_with_elefante.js     # Condição C
└── reports/                     # Saída JSON e visualização de divergência
```

---

## 6. Status Atual e Cronograma

- [x] Definição de métricas, taxonomia de erros e 3 baselines comparativos (v3.0)
- [x] Criação da infraestrutura de governança (`elefante check` e `doctor`)
- [ ] Construção do dataset padronizado de 20 tarefas (Fase 4 do Roadmap)
- [ ] Publicação dos primeiros resultados de benchmark comparativo com traces abertos no GitHub.
