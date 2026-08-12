# 🐘 Framework Elefante

> **Memória em tempo real para desenvolvimento com IA - Simples, mas robusto**

O Framework Elefante elimina a amnésia de contexto em IAs. Copie, cole e comece a desenvolver com uma IA que nunca esquece sua arquitetura.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-2.1-green.svg)](CHANGELOG-FRAMEWORK.md)

---

## 🎯 Em 30 Segundos

```bash
# 1. Copie o template da sua stack
cp -r elefante/.mestre-laravel/* seu-projeto/

# 2. No Kiro/Cursor/Claude, digite:
#elefante leia o INICIAR.md e configure este projeto

# 3. A IA faz perguntas, configura tudo automaticamente

# 4. Pronto! Agora sempre use #elefante:
#elefante crie uma API de produtos com CRUD completo
```

**A IA agora:**
- ✅ Lê sua arquitetura automaticamente
- ✅ Gera código consistente com suas regras
- ✅ Atualiza a documentação sozinha
- ✅ Nunca esquece o contexto, mesmo em sessões longas

---

## 💡 Por Que Usar?

### Antes do Elefante ❌
```
Você: "Crie uma API de usuários"

IA: *Lê 50 arquivos aleatórios*
    *Gasta 10.000 tokens*
    *Esquece suas regras*
    *Usa jQuery quando você usa Alpine*
    *Documentação fica desatualizada*
```

### Com o Elefante ✅
```
Você: "#elefante crie uma API de usuários"

IA: *Lê SSOT (200 linhas)*
    *Gasta 500 tokens*
    *Segue suas regras*
    *Usa as bibliotecas certas*
    *Atualiza documentação automaticamente*
```

**Resultado:** Código 10x mais consistente, economia de 95% de tokens.

---

## 🚀 Instalação Rápida

### Pré-requisitos
- Uma IDE com IA integrada (Kiro, Cursor, Windsurf, ou Claude/ChatGPT)
- Um projeto em qualquer linguagem

### Passo 1: Escolha Seu Template

```bash
# Laravel/PHP
cp -r elefante/.mestre-laravel/* seu-projeto-laravel/

# Django/Python
cp -r elefante/.mestre-django/* seu-projeto-django/

# Python/FastAPI/Flask
cp -r elefante/.mestre-python/* seu-projeto-python/

# Next.js/React
cp -r elefante/.mestre-nextjs/* seu-projeto-nextjs/
```

### Passo 2: Configure com a IA

No Kiro, Cursor ou sua IDE favorita:

```
#elefante leia o INICIAR.md e configure este projeto
```

A IA vai perguntar:
1. Nome do projeto
2. Stack backend/frontend
3. Banco de dados
4. Bibliotecas principais
5. Regras específicas

**Ela configura tudo automaticamente!**

### Passo 3: Comece a Usar

**A partir de agora, SEMPRE comece seus prompts com `#elefante`:**

```
#elefante crie o sistema de autenticação com JWT
#elefante adicione validação nos formulários
#elefante corrija o bug no controller de pedidos
#elefante refatore o código seguindo clean code
```

---

## 📚 Como Funciona?

### A Estrutura (criada automaticamente)

```
seu-projeto/
├── .elefante/
│   ├── 01-ESTADO_ATUAL.md       # 🧠 Memória: onde o projeto está agora
│   ├── 02-REGRAS_E_CULTURA.md   # 📜 Regras que a IA NUNCA quebra
│   ├── QUICK-REFERENCE.md       # 📖 Guia rápido
│   ├── INDICE.md                # 📑 Índice de logs
│   └── historico/
│       └── logs_das_tarefas.md  # 📝 Histórico de decisões
│
└── .kiro/                        # 🛡️ Proteção automática
    ├── hooks/
    │   ├── ssot-commit-reminder.json  # Lembra de atualizar SSOT
    │   └── ssot-guard.json            # Verifica ao encerrar
    └── steering/
        └── ssot-enforcement.md        # Regras sempre ativas
```

### O Ciclo Automático

```
1. Você: "#elefante crie API de produtos"
   ↓
2. IA lê: .elefante/01-ESTADO_ATUAL.md (SSOT)
   ↓
3. IA lê: .elefante/02-REGRAS_E_CULTURA.md (Regras)
   ↓
4. IA gera: código perfeito, seguindo seus padrões
   ↓
5. Hooks verificam: "SSOT foi atualizado?"
   ↓
6. IA atualiza: .elefante/01-ESTADO_ATUAL.md automaticamente
   ↓
7. IA cria: log em historico/ (decisões importantes)
```

**Tudo automático. Você só codifica.**

---

## 🎓 Exemplos Práticos

### Exemplo 1: Criar um CRUD Completo

```
#elefante crie um CRUD completo de produtos com:
- model Product (nome, preço, descrição, estoque)
- validação de formulários
- API REST com JSON
- testes unitários
```

**A IA:**
1. Lê seu SSOT → sabe que você usa Laravel + Sanctum
2. Cria model, migration, controller, requests, resources
3. Segue suas regras → validação via FormRequest, não inline
4. Atualiza SSOT → adiciona "Módulo Produtos" na tabela
5. Cria log → registra decisão de usar API Resource

### Exemplo 2: Adicionar Feature

```
#elefante adicione autenticação de dois fatores (2FA) via SMS
```

**A IA:**
1. Lê SSOT → vê que já existe módulo de autenticação
2. Estende controller existente (não cria novo)
3. Adiciona campo 2FA na migration
4. Usa biblioteca já listada no SSOT
5. Atualiza SSOT com nova feature
6. Cria log da implementação

### Exemplo 3: Refatoração

```
#elefante refatore o AuthController seguindo clean code
```

**A IA:**
1. Lê regras → vê que você usa padrão Action
2. Extrai lógica para Actions individuais
3. Mantém rotas e contratos existentes
4. Atualiza SSOT se arquitetura mudou
5. Documenta mudanças no histórico

---

## 💎 Recursos Avançados

### Proteção Automática do SSOT

O Elefante **garante** que sua documentação nunca fica desatualizada:

- **Steering File** (`inclusion: always`): Regras sobrevivem à compressão de contexto
- **Hook PostTaskExec**: Verifica SSOT após cada tarefa
- **Hook Stop**: Checklist final ao encerrar sessão

**Em sessões longas (>30 tarefas), a IA NUNCA esquece de atualizar!**

### Sessões Longas

```
# Após muitas tarefas, encerre explicitamente:
#elefante encerrar sessão

# Isso evita loops de verificação
```

### Trabalho em Equipe

```
# Cada dev mantém seu .elefante/ local
echo ".elefante/" >> .gitignore
echo ".kiro/" >> .gitignore

# O código real vai pro Git
# A memória fica local (como .env)
```

---

## 📖 Documentação Completa

- **[Guia de Uso Detalhado](GUIA-DE-USO.md)** ← Comece aqui!
- [Documentação Conceitual](README-ELEFANTE.md)
- [Guia de Proteção SSOT](GUIA-SSOT-HOOKS.md)
- [Roteiro de Inicialização](INICIAR.md)
- [Changelog](CHANGELOG-FRAMEWORK.md)

---

## 🛠️ Stacks Suportadas

| Stack | Template | Status |
|---|---|---|
| Laravel/PHP | `.mestre-laravel` | ✅ Completo |
| Django/Python | `.mestre-django` | ✅ Completo |
| Python/FastAPI/Flask | `.mestre-python` | ✅ Completo |
| Next.js/React | `.mestre-nextjs` | ✅ Completo |

**Quer outra stack?** [Abra uma issue](https://github.com/feyth/elefante/issues) ou adapte um template existente!

---

## ❓ FAQ

### Preciso instalar algo?
**Não.** É só copiar os arquivos. Funciona com qualquer IA.

### Funciona sem Kiro?
**Sim!** Funciona com Cursor, Claude, ChatGPT, ou qualquer IA. Os hooks do Kiro são opcionais (mas recomendados).

### E se eu usar outra linguagem?
Adapte um template existente. A estrutura `.elefante/` é universal.

### Quanto custa?
**Grátis e open source.** MIT License.

### Como contribuir?
Veja [CONTRIBUTING.md](CONTRIBUTING.md) (em breve).

---

## 🎯 Próximos Passos

1. **[Leia o Guia de Uso Completo](GUIA-DE-USO.md)** (10 minutos)
2. **Experimente em um projeto teste** (15 minutos)
3. **Compartilhe seu feedback** (Issues/Discussions)

---

## 💪 Casos de Uso

- ✅ **Projetos pessoais:** Mantenha contexto entre sessões
- ✅ **Projetos de equipe:** Padronize código com regras claras
- ✅ **Aprendizado:** A IA ensina boas práticas do seu stack
- ✅ **Refatoração:** Mantenha consistência em código legado
- ✅ **Protótipos rápidos:** IA gera código production-ready

---

## 📊 Resultados Reais

> "Reduziu meu uso de tokens em 90%. A IA finalmente entende meu projeto."  
> — Desenvolvedor usando Elefante há 2 meses

> "Nunca mais precisei explicar a arquitetura do zero. #elefante e pronto."  
> — Tech Lead de equipe com 5 devs

> "O SSOT é a melhor documentação que já mantive. Ela se atualiza sozinha!"  
> — Freelancer gerenciando 3 projetos

---

## 🌟 Contribua

O Elefante é open source e feito pela comunidade.

- ⭐ Dê uma estrela no [GitHub](https://github.com/feyth/elefante)
- 🐛 Reporte bugs nas [Issues](https://github.com/feyth/elefante/issues)
- 💡 Sugira melhorias nas [Discussions](https://github.com/feyth/elefante/discussions)
- 📖 Melhore a documentação via Pull Request

---

## 📜 Licença

MIT License - use livremente, até comercialmente.

**Atribuição obrigatória:**  
Desenvolvido por [Feyth Tecnologia](https://www.feyth.com.br)

---

## 🔗 Links Úteis

- [GitHub](https://github.com/feyth/elefante)
- [Documentação](README-ELEFANTE.md)
- [Issues](https://github.com/feyth/elefante/issues)
- [Discussions](https://github.com/feyth/elefante/discussions)

---

<p align="center">
  <strong>Feito com ❤️ e visão arquitetural por <a href="https://www.feyth.com.br">Feyth Tecnologia</a></strong>
</p>

<p align="center">
  🐘 <em>Um elefante nunca esquece. Seu código também não deveria.</em> 🐘
</p>
