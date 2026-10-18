# 🐘 Framework Elefante — Inicialização Automática da Memória

> **Instrução para a IA:** Você acabou de receber este arquivo para configurar a memória do projeto.
> Siga o roteiro abaixo passo a passo, em ordem, e ao final informe que o projeto está pronto para codar.

---

## ROTEIRO DE INICIALIZAÇÃO

### PASSO 1 — Análise Silenciosa do Projeto
Antes de fazer qualquer pergunta, inspecione a raiz do projeto procurando arquivos como:
- `composer.json` (PHP/Laravel)
- `package.json` (Node.js/Next.js/React/Vue)
- `requirements.txt` ou `pyproject.toml` (Python/Django/FastAPI)
- `Gemfile`, `pom.xml`, `go.mod`, etc.

Deduzir automaticamente: Stack backend, framework frontend, banco de dados e bibliotecas já declaradas.

---

### PASSO 2 — Entrevista Rápida (Apenas o que faltar)
Faça uma **única mensagem** com apenas o que você não conseguiu deduzir dos arquivos:
1. **Nome do projeto**
2. **Objetivo principal do sistema** (em uma frase)
3. **Alguma regra ou proibição de código inegociável?** (ex: "proibido jQuery", "sempre Tailwind", "nunca CSS inline", "usar repository pattern")

Aguarde a resposta do usuário antes de continuar.

---

### PASSO 3 — Preencher `.elefante/01-ESTADO_ATUAL.md` (SSOT)
Abra e atualize o arquivo `.elefante/01-ESTADO_ATUAL.md`:
- Preencha o **Nome do Projeto**, **Stack**, **Bibliotecas Chave** e **Ambiente**.
- Preencha os **Módulos Iniciais** identificados.
- Preencha o **Status do Momento** com o objetivo principal informado.

---

### PASSO 4 — Calibrar `.elefante/00-PRINCIPIOS.md` e `.elefante/02-REGRAS_E_CULTURA.md`
- No `00-PRINCIPIOS.md`: assegure que as regras inegociáveis do desenvolvedor estejam registradas como princípios MUST.
- No `02-REGRAS_E_CULTURA.md`: registre os padrões de código e proibições acordadas.

---

### PASSO 5 — Garantir o Protocolo Universal `AGENTS.md`
Verifique se existe `AGENTS.md` na raiz do projeto. 
Se não existir, copie `core/AGENTS.md` ou crie-o apontando para a pasta `.elefante/`.

---

### PASSO 6 — Criar Log Inicial de Sessão
Crie o arquivo `.elefante/historico/YYYYMMDD_inicializacao.md` registrando a data, stack e decisões iniciais tomadas, e adicione a linha de índice em `.elefante/INDICE.md`.

---

### PASSO 7 — Finalização
Responda ao desenvolvedor:
> "🐘 **Memória do Elefante configurada com sucesso!** O SSOT e as regras do projeto estão sincronizados. Qual será a nossa primeira missão no código?"
