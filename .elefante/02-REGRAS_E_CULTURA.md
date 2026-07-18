# Regras e Cultura de Engenharia

> **Regra para a IA:** Você deve respeitar as seguintes premissas técnicas ao gerar código ou auditar este projeto.

## 1. Padrões de Código e Arquitetura
- **Clean Code:** Mantenha métodos curtos, nomes descritivos em português (ou inglês, dependendo do padrão da equipe).
- **Responsabilidade Única (SOLID):** Controllers não devem conter regras de negócio complexas.
- **Segurança:** Nunca injete variáveis diretamente em SQL brute (Raw). Use sempre o Query Builder/ORM.

## 2. Backend (Exemplo PHP/Laravel, adaptar conforme a stack)
- Use tipagem forte (`string`, `int`, `?array`) nas entradas e retornos de métodos.
- Utilize **Enums** sempre que houver status ou categorias estáticas no banco.
- Validação sempre centralizada (ex: `FormRequests` no Laravel).

## 3. Frontend (Regras de UI/UX)
- **100% Fluido:** Nenhuma view principal deve ter `max-width` hardcoded.
- **Sem CSS Inline Estático:** Estilos fixos nunca devem usar `style=""`. Devem ser movidos para classes.
- Preferência por Componentização (Blade Components, React Components, Vue, etc).

## 4. Metodologia #elefante
- Ao receber o comando `#elefante`, **leia a mente** deste diretório silenciosamente.
- Se a arquitetura mudar, **atualize o 01-ESTADO_ATUAL.md imediatamente**.
- Ao finalizar uma task grande, crie um novo log em `historico/` resumindo o feito.
