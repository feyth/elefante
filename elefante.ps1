#!/usr/bin/env pwsh
# =============================================================================
# CLI do Framework Elefante 🐘
# Feyth Tecnologia — https://www.feyth.com.br
# =============================================================================
# Uso: .\elefante.ps1 <comando> [argumentos]
#
# Comandos disponíveis:
#   init              Copia o .mestre para o projeto atual (setup inicial)
#   log "descrição"   Cria um novo arquivo de log em .elefante/historico/
#   status            Mostra o estado dos arquivos do .elefante
#   help              Exibe esta ajuda
# =============================================================================

param(
    [Parameter(Position=0)]
    [string]$Comando = "help",

    [Parameter(Position=1, ValueFromRemainingArguments)]
    [string[]]$Argumentos
)

# --- Cores e helpers ---
function Write-Header {
    Write-Host ""
    Write-Host "🐘 Framework Elefante — CLI v1.0" -ForegroundColor Green
    Write-Host "   Feyth Tecnologia" -ForegroundColor DarkGray
    Write-Host ""
}

function Write-Ok   { param($msg) Write-Host "  ✅ $msg" -ForegroundColor Green }
function Write-Warn { param($msg) Write-Host "  ⚠️  $msg" -ForegroundColor Yellow }
function Write-Err  { param($msg) Write-Host "  ❌ $msg" -ForegroundColor Red }
function Write-Info { param($msg) Write-Host "  ℹ️  $msg" -ForegroundColor Cyan }

# --- Detecção de raiz do projeto ---
$ProjectRoot = (Get-Location).Path
$ElefanteDir = Join-Path $ProjectRoot ".elefante"
$MestreDir   = Join-Path $ProjectRoot ".mestre"
$AgentsDir   = Join-Path $ProjectRoot ".agents"
$HistoricoDir = Join-Path $ElefanteDir "historico"

# =============================================================================
# COMANDO: help
# =============================================================================
function Show-Help {
    Write-Header
    Write-Host "  Uso: .\elefante.ps1 <comando> [argumentos]" -ForegroundColor White
    Write-Host ""
    Write-Host "  Comandos:" -ForegroundColor White
    Write-Host "    init              Inicializa o Framework Elefante no projeto atual" -ForegroundColor Gray
    Write-Host "                      (copia .mestre para .elefante e .agents)" -ForegroundColor DarkGray
    Write-Host ""
    Write-Host "    log `"descrição`"   Cria log em .elefante/historico/" -ForegroundColor Gray
    Write-Host "                      Exemplo: .\elefante.ps1 log `"criar modulo auth`"" -ForegroundColor DarkGray
    Write-Host ""
    Write-Host "    status            Lista arquivos do .elefante com data de modificação" -ForegroundColor Gray
    Write-Host "                      e avisa se o SSOT está desatualizado (>7 dias)" -ForegroundColor DarkGray
    Write-Host ""
    Write-Host "    help              Exibe esta ajuda" -ForegroundColor Gray
    Write-Host ""
}

# =============================================================================
# COMANDO: init
# =============================================================================
function Invoke-Init {
    Write-Header
    Write-Host "  Iniciando Framework Elefante no projeto atual..." -ForegroundColor White
    Write-Host ""

    # Verificar se .mestre existe
    if (-not (Test-Path $MestreDir)) {
        Write-Err "Pasta .mestre não encontrada em: $ProjectRoot"
        Write-Info "Certifique-se de rodar este comando a partir da raiz do repositório do Elefante,"
        Write-Info "ou copie manualmente a pasta .mestre para o seu projeto."
        exit 1
    }

    # Verificar se já existe .elefante (proteção contra sobrescrita acidental)
    if (Test-Path $ElefanteDir) {
        Write-Warn ".elefante já existe neste projeto."
        $confirm = Read-Host "  Deseja sobrescrever? (s/N)"
        if ($confirm -ne "s" -and $confirm -ne "S") {
            Write-Info "Operação cancelada."
            exit 0
        }
    }

    # Copiar .mestre/.elefante → .elefante
    Copy-Item -Recurse -Force (Join-Path $MestreDir ".elefante") $ElefanteDir
    Write-Ok "Pasta .elefante copiada"

    # Copiar .mestre/.agents → .agents
    Copy-Item -Recurse -Force (Join-Path $MestreDir ".agents") $AgentsDir
    Write-Ok "Pasta .agents copiada"

    # Copiar README-ELEFANTE.md
    $readmeSrc = Join-Path $MestreDir "README-ELEFANTE.md"
    if (Test-Path $readmeSrc) {
        Copy-Item -Force $readmeSrc (Join-Path $ProjectRoot "README-ELEFANTE.md")
        Write-Ok "README-ELEFANTE.md copiado"
    }

    # Limpar historico (manter só .keep)
    $historicoFiles = Get-ChildItem $HistoricoDir -File | Where-Object { $_.Name -ne ".keep" -and $_.Name -ne "_TEMPLATE_LOG.md" }
    if ($historicoFiles.Count -gt 0) {
        foreach ($f in $historicoFiles) { Remove-Item $f.FullName -Force }
        Write-Ok "Histórico antigo limpo ($($historicoFiles.Count) arquivo(s) removido(s))"
    }

    Write-Host ""
    Write-Host "  ─────────────────────────────────────────────" -ForegroundColor DarkGray
    Write-Ok "Framework Elefante inicializado com sucesso!"
    Write-Host ""
    Write-Info "Próximos passos:"
    Write-Host "    1. Edite .elefante/01-ESTADO_ATUAL.md com os dados do projeto" -ForegroundColor Gray
    Write-Host "    2. Edite .elefante/02-REGRAS_E_CULTURA.md com as regras da stack" -ForegroundColor Gray
    Write-Host "    3. Atualize .elefante/DASHBOARD-ARQUITETURA.html com o nome do projeto" -ForegroundColor Gray
    Write-Host "    4. Use '#elefante iniciar_projeto' no chat da IA para o setup guiado" -ForegroundColor Gray
    Write-Host ""
}

# =============================================================================
# COMANDO: log
# =============================================================================
function Invoke-Log {
    param([string]$Descricao)

    Write-Header

    if (-not $Descricao) {
        Write-Err "Informe uma descrição para o log."
        Write-Info "Exemplo: .\elefante.ps1 log `"criar modulo autenticacao`""
        exit 1
    }

    if (-not (Test-Path $HistoricoDir)) {
        Write-Err "Pasta .elefante/historico/ não encontrada. Rode 'init' primeiro."
        exit 1
    }

    # Gerar nome do arquivo
    $Date      = Get-Date -Format "yyyyMMdd"
    $Slug      = $Descricao.ToLower() -replace '[^a-z0-9\s]','' -replace '\s+','_'
    $Slug      = $Slug.Substring(0, [Math]::Min(40, $Slug.Length)).TrimEnd('_')
    $FileName  = "${Date}_${Slug}.md"
    $FilePath  = Join-Path $HistoricoDir $FileName
    $DateFmt   = Get-Date -Format "yyyy-MM-dd"

    # Ler template se existir
    $TemplatePath = Join-Path $HistoricoDir "_TEMPLATE_LOG.md"
    if (Test-Path $TemplatePath) {
        $Content = Get-Content $TemplatePath -Raw
        # Substituir placeholders do template
        $Content = $Content -replace '\[TÍTULO DA TAREFA\]', $Descricao
        $Content = $Content -replace '\[YYYY-MM-DD\]', $DateFmt
        # Remover bloco de instruções do template
        $Content = $Content -replace '(?s)> \*\*Instruções para a IA:.*?---\r?\n', "---`n"
    } else {
        # Fallback sem template
        $Content = @"
# Log de Tarefa — $Descricao

## Metadados
- **Data:** $DateFmt
- **Tipo:** [Feature / Bugfix / Refactor / Infra / Docs]

## O que foi feito
- [Descreva aqui]

## Por que foi feito
[Contexto e motivação]

## Arquivos alterados
| Ação | Arquivo |
|---|---|
| ✅ Criado | `` |

## Próximo passo
[Próximo passo ou "Nenhum — tarefa concluída"]
"@
    }

    Set-Content -Path $FilePath -Value $Content -Encoding UTF8
    Write-Ok "Log criado: .elefante/historico/$FileName"
    Write-Info "Abra o arquivo e preencha os detalhes da tarefa."
    Write-Host ""
}

# =============================================================================
# COMANDO: status
# =============================================================================
function Invoke-Status {
    Write-Header

    if (-not (Test-Path $ElefanteDir)) {
        Write-Err "Pasta .elefante não encontrada. Framework não inicializado neste projeto."
        Write-Info "Rode: .\elefante.ps1 init"
        exit 1
    }

    Write-Host "  📁 Arquivos do .elefante" -ForegroundColor White
    Write-Host ""

    $Files = @(
        "01-ESTADO_ATUAL.md",
        "02-REGRAS_E_CULTURA.md",
        "DASHBOARD-ARQUITETURA.html",
        "QUICK-REFERENCE.md",
        "INDICE.md"
    )

    $Now = Get-Date
    foreach ($f in $Files) {
        $path = Join-Path $ElefanteDir $f
        if (Test-Path $path) {
            $info     = Get-Item $path
            $modified = $info.LastWriteTime
            $days     = [int]($Now - $modified).TotalDays
            $age      = if ($days -eq 0) { "hoje" } elseif ($days -eq 1) { "ontem" } else { "há $days dias" }
            $color    = if ($days -gt 14) { "Yellow" } else { "Green" }
            $warn     = if ($days -gt 14 -and $f -eq "01-ESTADO_ATUAL.md") { " ⚠️  SSOT possivelmente desatualizado!" } else { "" }
            Write-Host ("  {0,-40} {1,-12} {2}" -f $f, $age, $warn) -ForegroundColor $color
        } else {
            Write-Host ("  {0,-40} {1}" -f $f, "não encontrado") -ForegroundColor DarkGray
        }
    }

    # Logs no historico
    Write-Host ""
    Write-Host "  📂 Histórico (.elefante/historico/)" -ForegroundColor White
    Write-Host ""
    $logs = Get-ChildItem $HistoricoDir -Filter "*.md" | Where-Object { $_.Name -ne "_TEMPLATE_LOG.md" } | Sort-Object LastWriteTime -Descending | Select-Object -First 5
    if ($logs.Count -eq 0) {
        Write-Info "Nenhum log encontrado ainda."
    } else {
        foreach ($log in $logs) {
            $days  = [int]($Now - $log.LastWriteTime).TotalDays
            $age   = if ($days -eq 0) { "hoje" } elseif ($days -eq 1) { "ontem" } else { "há $days dias" }
            Write-Host ("  {0,-45} {1}" -f $log.Name, $age) -ForegroundColor Gray
        }
        $total = (Get-ChildItem $HistoricoDir -Filter "*.md" | Where-Object { $_.Name -ne "_TEMPLATE_LOG.md" }).Count
        if ($total -gt 5) {
            Write-Info "... e mais $($total - 5) log(s). Total: $total logs."
        }
    }

    # .agents
    Write-Host ""
    if (Test-Path $AgentsDir) {
        Write-Ok ".agents/ encontrado (IA configurada)"
    } else {
        Write-Warn ".agents/ não encontrado — IA pode não reconhecer o Framework"
    }
    Write-Host ""
}

# =============================================================================
# ROTEADOR DE COMANDOS
# =============================================================================
switch ($Comando.ToLower()) {
    "init"   { Invoke-Init }
    "log"    { Invoke-Log -Descricao ($Argumentos -join " ") }
    "status" { Invoke-Status }
    "help"   { Show-Help }
    default  {
        Write-Header
        Write-Err "Comando desconhecido: '$Comando'"
        Write-Info "Use: .\elefante.ps1 help"
        exit 1
    }
}
