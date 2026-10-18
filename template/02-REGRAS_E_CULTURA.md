# Regras Operacionais e Armadilhas Conhecidas

> **Regra para a IA:** Consulte este arquivo antes de escrever qualquer linha de código. NUNCA repita um erro já listado na tabela de armadilhas.

---

## 🛑 REGRA #0 — A Regra Mais Importante

```
SE VOCÊ MODIFICOU ARQUIVOS ESTRUTURAIS DO SISTEMA,
VOCÊ É OBRIGADA A ATUALIZAR O SSOT (01-ESTADO_ATUAL.md)
ANTES DE RESPONDER AO USUÁRIO.
```

---

## 📜 Padrões de Código

1. **Separação de Responsabilidades:** Camadas de apresentação, negócio e persistência devem ser bem delineadas.
2. **Nomenclatura:** Nomes descritivos e claros em inglês (ou no idioma acordado para o projeto).
3. **Tratamento de Exceções:** Tratar falhas explicitamente sem silenciar erros com blocos try/catch vazios.
4. **Segurança:** Nunca comitar senhas, chaves de API ou tokens de acesso.

---

## 🪤 Armadilhas Mapeadas (Catálogo de Erros Evitados)

| ID | Sintoma / Erro | Causa Raiz | Solução Correta |
|---|---|---|---|
| A001 | Esquecimento de regras em sessões longas | Compressão de contexto pela LLM | Manter o SSOT (01-ESTADO_ATUAL.md) enxuto e consultá-lo em todo prompt |
