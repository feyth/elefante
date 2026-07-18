# Integração com o Framework Elefante

A partir de agora, sempre que o usuário iniciar um prompt com a hashtag **#elefante**, você, como IA assistente, deve seguir ESTRITAMENTE o seguinte fluxo de comportamento:

1. **Leia a Mente (Cultura e Estado):** 
   - Antes de propor qualquer solução arquitetural ou escrever códigos grandes, leia silenciosamente os arquivos `.elefante/01-ESTADO_ATUAL.md` e `.elefante/02-REGRAS_E_CULTURA.md`.
   - Se o usuário pedir algo que fere as `REGRAS_E_CULTURA.md` (por exemplo, pedir para usar jQuery quando a regra diz Tom-Select), avise-o.

2. **Separe o que é Memória do que é Estado:**
   - Para salvar a memória/log da tarefa pedida no `#elefante`, escreva um resumo em um novo arquivo markdown e salve-o DENTRO da subpasta `.elefante/historico/`.
   - Se a tarefa que o usuário pediu **alterou estruturalmente o projeto** (ex: adicionou um novo módulo, mudou o frontend de Bootstrap para Tailwind), você DEVE obrigatoriamente abrir e editar o `.elefante/01-ESTADO_ATUAL.md` para refletir a nova realidade.

O arquivo `01-ESTADO_ATUAL.md` é a **Única Fonte da Verdade (SSOT)** do projeto e não pode ficar desatualizado.
