# 📊 Protocolo de Avaliação Empírica e Benchmark (Eval)

> **Documento de Engenharia:** Metodologia de medição e validação experimental do Framework Elefante contra o desenvolvimento assistido por IA sem controle de contexto.

---

## 1. Objetivo do Benchmark

O objetivo deste protocolo é substituir alegações vagas de marketing por **evidências auditáveis e reproduzíveis** de que o Framework Elefante:
1. **Reduz o *Context Drift*:** A IA mantém a consistência com as decisões arquiteturais e convenções de código ao longo de múltiplas tarefas consecutivas.
2. **Evita Regressão de Regras:** A IA não repete erros já catalogados como armadilhas (`02-REGRAS_E_CULTURA.md`).
3. **Otimiza o Orçamento de Tokens:** Reduz o número de tokens desnecessários consumidos por prompts de exploração cega de repositório.

---

## 2. Metodologia de Teste Controlado

### 2.1 Projeto de Teste Padronizado
- **Aplicação Alvo:** API de E-commerce simplificada (Catálogo, Checkout, Autenticação, Relatórios).
- **Stack:** Laravel 11 / PHP 8.3 (ou Python / FastAPI equivalente).
- **Regras Arquiteturais Pré-Definidas:**
  - Padrão Controller Fino -> Action / Service -> Model.
  - FormRequests obrigatórios para validação.
  - Nenhuma regra de negócio dentro de controllers ou rotas.
  - Proibição de bibliotecas externas não homologadas.

### 2.2 Bateria de Tarefas Sequenciais (20 Tarefas)
O teste submete o mesmo modelo (ex: Claude 3.5 Sonnet / GPT-4o) a uma sequência cronológica de 20 tarefas simulando 3 semanas de desenvolvimento:
- Tarefas 1 a 5: Criação inicial de models, migrations e rotas.
- Tarefas 6 a 10: Refatorações, implementação de regras de negócio complexas e regras de exceção.
- Tarefas 11 a 15: Manutenção de endpoints antigos e testes de regressão de convenção.
- Tarefas 16 a 20: Tarefas com armadilhas deliberadas (perguntas indutoras que violam princípios).

---

## 3. Métricas de Avaliação

| Métrica | Definição | Como é calculada |
|---|---|---|
| **Taxa de Deriva Arquitetural (ADR Drift)** | % de tarefas em que a IA violou um padrão estabelecido em tarefas anteriores. | `(violações / 20) * 100` |
| **Taxa de Armadilhas Evitadas (Pitfall Avoidance)** | % de tarefas indutoras em que a IA rejeitou ou corrigiu o caminho incorreto por causa do catálogo. | `(armadilhas evitadas / armadilhas testadas) * 100` |
| **Integridade de Documentação (SSOT Sync)** | % de commits em que o estado atual do sistema refletiu fidedignamente o código produzido. | `(commits com SSOT sincronizado / total de commits)` |
| **Consumo Médio de Tokens de Entrada** | Tokens de contexto consumidos pelo agente para entender a tarefa antes de gerar a resposta. | Medição via SDK / Proxy de API |

---

## 4. Estrutura do Test Harness (Harness Automatizado)

Para garantir reprodutibilidade por terceiros, o harness opera em script independente:

```
tests/eval/
├── dataset/                     # Bateria de 20 prompts e gabarito de validação
├── fixtures/                    # Repositório de código no estado inicial
├── runners/
│   ├── run_with_elefante.js     # Executa bateria com .elefante e AGENTS.md
│   └── run_baseline.js          # Executa bateria sem arquivos de contexto
└── reports/                     # Saída JSON e visualização de divergência
```

---

## 5. Status Atual e Cronograma

- [x] Definição de métricas e taxonomia de erros (v3.0)
- [x] Criação da infraestrutura de governança (`elefante check` e `doctor`)
- [ ] Construção do dataset padronizado de 20 tarefas (Fase 4 do Roadmap)
- [ ] Publicação dos primeiros resultados de benchmark comparativo com traces abertos no GitHub.
