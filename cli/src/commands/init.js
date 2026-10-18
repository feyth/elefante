import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { c, logOk, logWarn, logErr, logInfo } from "../utils/colors.js";
import { detectStack, detectAgents } from "../utils/detector.js";
import { generateAdapters } from "../utils/adapters.js";

const VALID_STACKS = ["laravel", "django", "python", "nextjs"];

export async function commandInit(args, options = {}) {
  const targetDir = options.targetDir || process.cwd();
  const repoRoot = path.resolve(import.meta.dirname, "../../..");
  const isPlan = args.includes("--plan") || options.plan;
  const isForce = args.includes("--force") || options.force;

  let stack = args.find((a) => !a.startsWith("-"))?.toLowerCase();

  console.log(c.bold("Iniciando Framework Elefante..."));
  if (isPlan) {
    console.log(c.magenta("Modo de simulacao ativado (--plan). Nenhum arquivo sera alterado."));
  }
  console.log("");

  // 1. Deteccao automatica de stack
  if (!stack) {
    const detected = detectStack(targetDir);
    if (detected) {
      logInfo(`Stack detectada automaticamente pelos arquivos do projeto: ${c.bold(detected)}`);
      stack = detected;
    } else {
      console.log(c.yellow("Nao foi possivel detectar a stack automaticamente. Escolha uma opcao:"));
      console.log("  1. laravel  (PHP / Laravel)");
      console.log("  2. django   (Python / Django)");
      console.log("  3. python   (Python / FastAPI / Flask)");
      console.log("  4. nextjs   (Next.js / React)");
      console.log("");

      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      try {
        const answer = (await rl.question("Digite o nome ou numero da stack: ")).trim().toLowerCase();
        if (answer === "1") stack = "laravel";
        else if (answer === "2") stack = "django";
        else if (answer === "3") stack = "python";
        else if (answer === "4") stack = "nextjs";
        else stack = answer;
      } finally {
        rl.close();
      }
    }
  }

  if (!VALID_STACKS.includes(stack)) {
    logErr(`Stack invalida: '${stack}'. Escolha entre: ${VALID_STACKS.join(", ")}`);
    process.exit(1);
  }

  // 2. Deteccao de agentes instalados
  const agents = detectAgents(targetDir);
  if (agents.length > 0) {
    logOk(`Agentes/IDEs detectados no projeto: ${agents.map((a) => c.cyan(a.name)).join(", ")}`);
  } else {
    logInfo("Nenhuma configuracao previa de agente encontrada. Gerando adaptadores padrao.");
  }

  const elefanteDir = path.join(targetDir, ".elefante");

  if (fs.existsSync(elefanteDir) && !isForce && !isPlan) {
    console.log("");
    logWarn(`Diretorio .elefante/ ja existe em: ${targetDir}`);
    console.log(`  ${c.dim}Para forcar a sobrescrita, execute:${c.reset} ${c.cyan}npx @feyth/elefante init --force${c.reset}`);
    console.log(`  ${c.dim}Para auditar a integridade atual:${c.reset}   ${c.cyan}npx @feyth/elefante doctor${c.reset}`);
    console.log("");
    return;
  }

  // 1. Prioriza templates embutidos no proprio pacote npm (cli/assets/)
  let coreDir = path.resolve(import.meta.dirname, "../../assets/core");
  let stackDir = path.resolve(import.meta.dirname, `../../assets/stacks/${stack}`);

  // 2. Fallback para execucao direta no monorepo local
  if (!fs.existsSync(coreDir)) {
    coreDir = path.join(repoRoot, "core");
    stackDir = path.join(repoRoot, "stacks", stack);
  }

  // 3. Fallback relativo a pasta da CLI
  if (!fs.existsSync(coreDir)) {
    coreDir = path.resolve(import.meta.dirname, "../../core");
    stackDir = path.resolve(import.meta.dirname, "../../stacks", stack);
  }

  if (!fs.existsSync(coreDir) || !fs.existsSync(stackDir)) {
    logErr(`Diretorios core ou stack nao encontrados no framework (esperado: ${coreDir})`);
    process.exit(1);
  }

  if (isPlan) {
    console.log("");
    console.log(c.bold("Plano de execucao:"));
    console.log(`  1. Criar pasta .elefante/ e subdiretorios (decisoes, armadilhas, procedimentos, historico, local)`);
    console.log(`  2. Copiar arquivos universais de core/ (00-PRINCIPIOS.md, hooks.yml, modo.yml, templates)`);
    console.log(`  3. Copiar regras especializadas de stacks/${stack}/ (01-ESTADO_ATUAL.md, 02-REGRAS_E_CULTURA.md)`);
    console.log(`  4. Gerar protocolo universal aberto: AGENTS.md (e adaptadores específicos apenas se detectados)`);
    console.log(`  5. Adicionar .elefante/local/ ao .gitignore`);
    console.log("");
    logOk("Simulacao concluida com sucesso. Execute sem --plan para aplicar.");
    return;
  }

  // 3. Criar estrutura .elefante
  fs.mkdirSync(elefanteDir, { recursive: true });
  fs.mkdirSync(path.join(elefanteDir, "historico"), { recursive: true });
  fs.mkdirSync(path.join(elefanteDir, "decisoes"), { recursive: true });
  fs.mkdirSync(path.join(elefanteDir, "armadilhas"), { recursive: true });
  fs.mkdirSync(path.join(elefanteDir, "procedimentos"), { recursive: true });
  fs.mkdirSync(path.join(elefanteDir, "local"), { recursive: true });

  // 4. Copiar core
  const coreFiles = ["00-PRINCIPIOS.md", "hooks.yml", "modo.yml", "QUICK-REFERENCE.md", "DASHBOARD-ARQUITETURA.html", "setup_elefante.json", "INICIAR.md"];
  for (const file of coreFiles) {
    const src = path.join(coreDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(elefanteDir, file));
    }
  }

  // Copiar templates
  const templatesSrc = path.join(coreDir, "templates");
  const templatesDest = path.join(elefanteDir, "templates");
  if (fs.existsSync(templatesSrc)) {
    fs.cpSync(templatesSrc, templatesDest, { recursive: true });
    // Garantir _TEMPLATE_LOG.md em historico
    fs.copyFileSync(path.join(templatesSrc, "log_tarefa.md"), path.join(elefanteDir, "historico", "_TEMPLATE_LOG.md"));
  }

  // 5. Copiar stack
  fs.copyFileSync(path.join(stackDir, "01-ESTADO_ATUAL.md"), path.join(elefanteDir, "01-ESTADO_ATUAL.md"));
  fs.copyFileSync(path.join(stackDir, "02-REGRAS_E_CULTURA.md"), path.join(elefanteDir, "02-REGRAS_E_CULTURA.md"));

  // Criar INDICE.md padrao
  const dateStr = new Date().toISOString().split("T")[0];
  const indiceContent = `# Índice de Documentação — Framework Elefante 🐘

> **Regra para a IA:** Consulte este índice antes de varrer a pasta \`historico/\` inteira.
> Atualize este arquivo sempre que criar um novo log em \`historico/\`.

---

## Logs por Categoria

### Inicialização e Setup
| Data | Arquivo | Descrição |
|---|---|---|
| ${dateStr} | \`${dateStr.replace(/-/g, "")}_inicializacao_projeto.md\` | Inicialização do Framework Elefante (${stack}) |

---

*Última atualização: ${dateStr}*
*Framework Elefante 🐘 — Feyth Tecnologia*
`;
  fs.writeFileSync(path.join(elefanteDir, "INDICE.md"), indiceContent, "utf-8");

  // Criar log de inicializacao
  const initLogContent = `# Log de Tarefa — Inicialização do Projeto com Framework Elefante

## Metadados
- **Data:** ${dateStr}
- **Tipo:** Infra / Setup
- **Responsável:** Dev / IA

## O que foi feito
- Framework Elefante v3.0 inicializado com sucesso para a stack **${stack}**.
- Estrutura de memória declarativa (00-PRINCIPIOS, 01-ESTADO_ATUAL, 02-REGRAS_E_CULTURA) configurada.
- Adaptadores de IA gerados.

## Decisões tomadas
| ID | Tipo | Decisão | Justificativa |
|---|---|---|---|
| D001 | [STACK] | Adoção da stack ${stack} com Framework Elefante | Padronização e memória persistente para assistência de IA |

## Próximo passo
Configurar as dependências do projeto e definir o primeiro módulo.
`;
  fs.writeFileSync(
    path.join(elefanteDir, "historico", `${dateStr.replace(/-/g, "")}_inicializacao_projeto.md`),
    initLogContent,
    "utf-8"
  );

  // 6. Gerar adaptadores para agentes (100% agnóstico de editor)
  const agentsContent = fs.readFileSync(path.join(coreDir, "AGENTS.md"), "utf-8");
  const adapters = generateAdapters(targetDir, agentsContent, { dryRun: false, detectedAgents: agents });
  logOk(`Adaptadores gerados: ${adapters.join(", ")}`);

  // 7. Atualizar .gitignore (apenas .elefante/local/)
  const gitignorePath = path.join(targetDir, ".gitignore");
  let gitignoreContent = "";
  if (fs.existsSync(gitignorePath)) {
    gitignoreContent = fs.readFileSync(gitignorePath, "utf-8");
  }
  if (!gitignoreContent.includes(".elefante/local/")) {
    const toAppend = (gitignoreContent.length > 0 && !gitignoreContent.endsWith("\n") ? "\n" : "") +
      "\n# Elefante - notas e handoffs pessoais locais\n.elefante/local/\n";
    fs.writeFileSync(gitignorePath, gitignoreContent + toAppend, "utf-8");
    logOk("Adicionado .elefante/local/ ao .gitignore (memória do time permanece versionada).");
  }

  console.log("");
  logOk(`Framework Elefante (${c.bold(stack)}) inicializado com sucesso!`);
  console.log("");
  logInfo("Próximos passos:");
  console.log(`  1. Abra ${c.cyan(".elefante/01-ESTADO_ATUAL.md")} e preencha as informações do projeto`);
  console.log(`  2. Execute ${c.cyan("npx elefante doctor")} para validar a integridade do seu setup`);
  console.log(`  3. No chat da IA, inicie com: ${c.bold("#elefante leia o estado atual e vamos começar")}`);
  console.log("");
}

export async function runInit(options = {}) {
  const args = [];
  if (options.stack) args.push(options.stack);
  if (options.plan) args.push('--plan');
  if (options.force) args.push('--force');
  return commandInit(args, options);
}
