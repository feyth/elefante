// Cores e utilitários de saída de terminal sem dependências externas
const isColorSupported = !process.env.NO_COLOR && (process.stdout.isTTY !== false || process.env.FORCE_COLOR === '1');

function makeColor(code, closeCode = 39) {
  const open = isColorSupported ? `\x1b[${code}m` : '';
  const close = isColorSupported ? `\x1b[${closeCode}m` : '';

  // Função que pode ser chamada diretamente: c.green("texto")
  const fn = (text) => `${open}${text}${close}`;

  // E também pode ser interpolada como string: `${c.green}texto${c.reset}`
  fn.toString = () => open;
  fn[Symbol.toPrimitive] = () => open;

  return fn;
}

export const c = {
  reset: isColorSupported ? '\x1b[0m' : '',
  bold: makeColor(1, 22),
  dim: makeColor(2, 22),
  red: makeColor(31),
  green: makeColor(32),
  yellow: makeColor(33),
  blue: makeColor(34),
  magenta: makeColor(35),
  cyan: makeColor(36),
  white: makeColor(37),
  gray: makeColor(90)
};

export function logHeader() {
  console.log("");
  console.log(c.bold(c.green("🐘 Framework Elefante — CLI v3.0")));
  console.log(c.gray("   Feyth Tecnologia — https://www.feyth.com.br"));
  console.log("");
}

export function logOk(msg) {
  console.log(`  ${c.green("✔")} ${msg}`);
}

export function logWarn(msg) {
  console.log(`  ${c.yellow("⚠")} ${msg}`);
}

export function logErr(msg) {
  console.log(`  ${c.red("✖")} ${msg}`);
}

export function logInfo(msg) {
  console.log(`  ${c.cyan("ℹ")} ${msg}`);
}
