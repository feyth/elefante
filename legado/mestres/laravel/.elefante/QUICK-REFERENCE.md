# Quick Reference — Framework Elefante 🐘

> Referência rápida para o dia a dia. Consulte antes de perguntar.

---

## Ativar o Framework

Todo prompt deve começar com `#elefante`:

```
#elefante [sua tarefa aqui]
```

Sem `#elefante` → IA em modo amnésia (não lê a memória do projeto).

---

## Fluxo que a IA segue ao receber #elefante

```
1. Ler silenciosamente:
   → .elefante/01-ESTADO_ATUAL.md   (onde estamos)
   → .elefante/02-REGRAS_E_CULTURA.md  (como codamos)

2. Executar a tarefa respeitando as regras

3. Após concluir:
   → Criar log em .elefante/historico/YYYYMMDD_titulo.md
   → Se arquitetura mudou: atualizar 01-ESTADO_ATUAL.md
   → Se módulo novo: atualizar DASHBOARD-ARQUITETURA.html
```

---

## Comandos do dia a dia

| O que fazer | Como pedir |
|---|---|
| Iniciar projeto novo | `#elefante iniciar_projeto` (leia o setup_elefante.json) |
| Criar uma feature | `#elefante crie [feature] na rota [/rota]` |
| Corrigir um bug | `#elefante corrija o bug em [arquivo/módulo]` |
| Atualizar a memória | `#elefante atualize o 01-ESTADO_ATUAL.md com o estado atual` |
| Gerar log de sessão | `#elefante crie o log desta sessão em historico/` |
| Consultar o que foi feito | `#elefante o que já foi feito no módulo X?` |
| Revisar regras | `#elefante quais são as regras deste projeto?` |
| Atualizar dashboard | `#elefante atualize o DASHBOARD-ARQUITETURA.html` |

---

## Quando atualizar o 01-ESTADO_ATUAL.md?

Atualize **obrigatoriamente** quando:
- ✅ Adicionar um novo módulo ou rota principal
- ✅ Mudar a stack (ex: trocar Bootstrap por Tailwind)
- ✅ Adicionar uma integração externa nova
- ✅ Aplicar migrations que mudam a estrutura do banco
- ✅ Mudar o processo de deploy

**Não precisa** atualizar para:
- ❌ Bugfixes pontuais
- ❌ Ajustes de CSS/layout menores
- ❌ Refatoração interna sem mudança de interface

---

## Quando criar um log em historico/?

Crie um log quando:
- ✅ Tarefa levou mais de 1h de trabalho
- ✅ Decisão arquitetural foi tomada
- ✅ Módulo novo foi criado do zero
- ✅ Integração externa foi implementada
- ✅ Bug crítico foi corrigido

Use o template: `.elefante/historico/_TEMPLATE_LOG.md`  
Nome do arquivo: `YYYYMMDD_titulo_curto.md`

---

## Estrutura do projeto (.elefante)

```
.elefante/
├── 01-ESTADO_ATUAL.md         → SSOT: onde o projeto está agora
├── 02-REGRAS_E_CULTURA.md     → Regras que a IA nunca pode quebrar
├── DASHBOARD-ARQUITETURA.html → Visualização da arquitetura (abrir no browser)
├── QUICK-REFERENCE.md         → Este arquivo
├── INDICE.md                  → Índice navegável do histórico
└── historico/
    ├── _TEMPLATE_LOG.md       → Template para novos logs
    └── YYYYMMDD_*.md          → Logs gerados pela IA
```

---

## Arquivos fora do .elefante

```
.agents/AGENTS.md              → Gatilho de comportamento da IA
.mestre/                       → Template master imutável (não editar!)
README-ELEFANTE.md             → Documentação completa do framework
setup_elefante.json            → Assistente de inicialização (v2.0)
CHANGELOG-FRAMEWORK.md        → Histórico de versões do framework
```

---

## Regras de ouro (nunca esquecer)

1. **Sempre** use `#elefante` no início do prompt
2. **Nunca** edite a pasta `.mestre/` por causa de um projeto específico
3. **Sempre** atualize `01-ESTADO_ATUAL.md` após mudanças estruturais
4. **Sempre** use o template `_TEMPLATE_LOG.md` ao criar logs
5. **Nunca** suba `.elefante/` para produção (descomente no `.gitignore`)

---

## ⚠️ Sessões Longas e Proteção contra Loops

### Quando encerrar uma sessão

Se você estiver em uma sessão com **mais de 30 tarefas concluídas**, considere encerrar explicitamente:

```
#elefante encerrar sessão
```

**Por quê?**
- Em sessões muito longas, o contexto é comprimido múltiplas vezes
- A IA pode entrar em loop de verificações que se auto-alimentam
- Cada nova resposta gera verificação → que gera edição → que gera nova verificação

### Sintomas de que você entrou em loop

- ⚠️ A IA faz commits no Elefante mesmo sem tarefa nova
- ⚠️ Mensagens repetitivas: "Verificando SSOT...", "Atualizando documentação..."
- ⚠️ Várias respostas seguidas sem executar a tarefa solicitada
- ⚠️ `git log` mostra vários commits seguidos de "docs: SSOT atualizado"

### Como sair do loop

1. **Pare a sessão atual** com `/stop` ou `#elefante encerrar sessão`
2. **Inicie nova sessão** com contexto limpo
3. **Use o comando direto** sem pedir para "continuar" ou "releia o chat"

### Regra de verificação única

A IA deve verificar o SSOT **uma vez por resposta**:
- ✅ Verifica após concluir a tarefa
- ❌ NÃO verifica novamente na mesma resposta
- ✅ Se já está atualizado, apenas confirma e para

---

*Framework Elefante 🐘 — [Feyth Tecnologia](https://www.feyth.com.br)*
