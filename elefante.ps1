#!/usr/bin/env pwsh
# =============================================================================
# CLI do Framework Elefante
# Feyth Tecnologia - https://www.feyth.com.br
# =============================================================================
# Uso: .\elefante.ps1 <comando> [argumentos]
#
# Comandos disponiveis:
#   init [stack]      Inicializa o Elefante no projeto (laravel, django, python, nextjs)
#   log "descricao"   Cria um novo arquivo de log em .elefante/historico/
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
    Write-Host "=== Framework Elefante - CLI v2.4 ===" -ForegroundColor Green
    Write-Host "    Feyth Tecnologia" -ForegroundColor DarkGray
    Write-Host ""
}

function Write-Ok   { param($msg) Write-Host "  [OK] $msg" -ForegroundColor Green }
function Write-Warn { param($msg) Write-Host "  [AVISO] $msg" -ForegroundColor Yellow }
function Write-Err  { param($msg) Write-Host "  [ERRO] $msg" -ForegroundColor Red }
function Write-Info { param($msg) Write-Host "  [INFO] $msg" -ForegroundColor Cyan }

# --- Deteccao de diretorios ---
$ScriptRoot = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Definition }
if (-not $ScriptRoot) { $ScriptRoot = (Get-Location).Path }

$ProjectRoot = (Get-Location).Path
$ElefanteDir = Join-Path $ProjectRoot ".elefante"
$AgentsDir   = Join-Path $ProjectRoot ".agents"
$KiroDir     = Join-Path $ProjectRoot ".kiro"
$HistoricoDir = Join-Path $ElefanteDir "historico"

# =============================================================================
# COMANDO: help
# =============================================================================
function Show-Help {
    Write-Header
    Write-Host "  Uso: .\elefante.ps1 <comando> [argumentos]" -ForegroundColor White
    Write-Host ""
    Write-Host "  Comandos:" -ForegroundColor White
    Write-Host "    init [stack]      Inicializa o Framework Elefante no projeto atual" -ForegroundColor Gray
    Write-Host "                      Stacks: laravel | django | python | nextjs" -ForegroundColor DarkGray
    Write-Host "                      Exemplo: .\elefante.ps1 init laravel" -ForegroundColor DarkGray
    Write-Host ""
    Write-Host "    log `"descricao`"   Cria log em .elefante/historico/" -ForegroundColor Gray
    Write-Host "                      Exemplo: .\elefante.ps1 log `"criar modulo auth`"" -ForegroundColor DarkGray
    Write-Host ""
    Write-Host "    status            Lista arquivos do .elefante com data de modificacao" -ForegroundColor Gray
    Write-Host "                      e avisa se o SSOT esta desatualizado (>7 dias)" -ForegroundColor DarkGray
    Write-Host ""
    Write-Host "    help              Exibe esta ajuda" -ForegroundColor Gray
    Write-Host ""
}

# =============================================================================
# COMANDO: init
# =============================================================================
function Invoke-Init {
    param([string]$Stack)

    Write-Header
    Write-Host "  Iniciando Framework Elefante no projeto atual..." -ForegroundColor White
    Write-Host ""

    $ValidStacks = @("laravel", "django", "python", "nextjs")

    if (-not $Stack -or ($ValidStacks -notcontains $Stack.ToLower())) {
        Write-Host "  Escolha a stack do seu projeto:" -ForegroundColor Yellow
        Write-Host "    1. laravel  (PHP / Laravel)" -ForegroundColor Gray
        Write-Host "    2. django   (Python / Django)" -ForegroundColor Gray
        Write-Host "    3. python   (Python / FastAPI / Flask)" -ForegroundColor Gray
        Write-Host "    4. nextjs   (Next.js / React)" -ForegroundColor Gray
        Write-Host ""
        $opcao = Read-Host "  Digite o nome ou numero da stack"

        switch ($opcao) {
            "1" { $Stack = "laravel" }
            "2" { $Stack = "django" }
            "3" { $Stack = "python" }
            "4" { $Stack = "nextjs" }
            default { $Stack = $opcao.ToLower().Trim() }
        }
    }

    $Stack = $Stack.ToLower()
    if ($ValidStacks -notcontains $Stack) {
        Write-Err ("Stack invalida: " + $Stack + ". Escolha entre: " + ($ValidStacks -join ", "))
        exit 1
    }

    # Localizar pasta .mestre-<stack>
    $MestreDir = Join-Path $ScriptRoot ".mestre-$Stack"
    if (-not (Test-Path $MestreDir)) {
        $MestreDir = Join-Path $ProjectRoot ".mestre-$Stack"
    }

    if (-not (Test-Path $MestreDir)) {
        Write-Err ("Pasta do template .mestre-" + $Stack + " nao encontrada em: " + $ScriptRoot)
        Write-Info "Certifique-se de apontar para a instalacao valida do Framework Elefante."
        exit 1
    }

    Write-Info ("Usando template: .mestre-" + $Stack)

    # Verificar se ja existe .elefante
    if (Test-Path $ElefanteDir) {
        Write-Warn ".elefante ja existe neste projeto."
        $confirm = Read-Host "  Deseja sobrescrever? (s/N)"
        if ($confirm -ne "s" -and $confirm -ne "S") {
            Write-Info "Operacao cancelada."
            exit 0
        }
    }

    # Copiar .elefante
    $srcElefante = Join-Path $MestreDir ".elefante"
    if (Test-Path $srcElefante) {
        Copy-Item -Recurse -Force $srcElefante $ElefanteDir
        Write-Ok "Pasta .elefante copiada"
    }

    # Copiar .agents
    $srcAgents = Join-Path $MestreDir ".agents"
    if (Test-Path $srcAgents) {
        Copy-Item -Recurse -Force $srcAgents $AgentsDir
        Write-Ok "Pasta .agents copiada"
    }

    # Copiar .kiro
    $srcKiro = Join-Path $MestreDir ".kiro"
    if (Test-Path $srcKiro) {
        Copy-Item -Recurse -Force $srcKiro $KiroDir
        Write-Ok "Pasta .kiro copiada (protecao SSOT)"
    }

    # Copiar README-ELEFANTE.md
    $readmeSrc = Join-Path $MestreDir "README-ELEFANTE.md"
    if (Test-Path $readmeSrc) {
        Copy-Item -Force $readmeSrc (Join-Path $ProjectRoot "README-ELEFANTE.md")
        Write-Ok "README-ELEFANTE.md copiado"
    }

    # Limpar historico mantendo .keep e _TEMPLATE_LOG.md
    if (Test-Path $HistoricoDir) {
        $historicoFiles = Get-ChildItem $HistoricoDir -File | Where-Object { $_.Name -ne ".keep" -and $_.Name -ne "_TEMPLATE_LOG.md" }
        if ($historicoFiles.Count -gt 0) {
            foreach ($f in $historicoFiles) { Remove-Item $f.FullName -Force }
            Write-Ok ("Historico antigo limpo (" + $historicoFiles.Count + " arquivo(s) removido(s))")
        }
    }

    Write-Host ""
    Write-Host "  ---------------------------------------------" -ForegroundColor DarkGray
    Write-Ok ("Framework Elefante (" + $Stack + ") inicializado com sucesso!")
    Write-Host ""
    Write-Info "Proximos passos:"
    Write-Host "    1. Edite .elefante/01-ESTADO_ATUAL.md com os dados do projeto" -ForegroundColor Gray
    Write-Host "    2. Edite .elefante/02-REGRAS_E_CULTURA.md com as regras da stack" -ForegroundColor Gray
    Write-Host "    3. Atualize .elefante/DASHBOARD-ARQUITETURA.html com o nome do projeto" -ForegroundColor Gray
    Write-Host "    4. Use '#elefante leia o INICIAR.md e configure este projeto' na sua IA" -ForegroundColor Gray
    Write-Host ""
}

# =============================================================================
# COMANDO: log
# =============================================================================
function Invoke-Log {
    param([string]$Descricao)

    Write-Header

    if (-not $Descricao) {
        Write-Err "Informe uma descricao para o log."
        Write-Info 'Exemplo: .\elefante.ps1 log "criar modulo autenticacao"'
        exit 1
    }

    if (-not (Test-Path $HistoricoDir)) {
        Write-Err "Pasta .elefante/historico/ nao encontrada. Rode 'init' primeiro."
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
        $Content = $Content -replace '\[TÍTULO DA TAREFA\]', $Descricao
        $Content = $Content -replace '\[YYYY-MM-DD\]', $DateFmt
        $Content = $Content -replace '(?s)> \*\*Instruções para a IA:.*?---\r?\n', "---`n"
    } else {
        $Content = @(
            "# Log de Tarefa - $Descricao",
            "",
            "## Metadados",
            "- **Data:** $DateFmt",
            "- **Tipo:** [Feature / Bugfix / Refactor / Infra / Docs]",
            "",
            "## O que foi feito",
            "- [Descreva aqui]",
            "",
            "## Por que foi feito",
            "[Contexto e motivacao]",
            "",
            "## Arquivos alterados",
            "| Acao | Arquivo |",
            "|---|---|",
            "| [x] Criado |  |",
            "",
            "## Proximo passo",
            "[Nenhum - tarefa concluida]"
        ) -join "`r`n"
    }

    Set-Content -Path $FilePath -Value $Content -Encoding UTF8
    Write-Ok ("Log criado: .elefante/historico/" + $FileName)
    Write-Info "Abra o arquivo e preencha os detalhes da tarefa."
    Write-Host ""
}

# =============================================================================
# COMANDO: status
# =============================================================================
function Invoke-Status {
    Write-Header

    if (-not (Test-Path $ElefanteDir)) {
        Write-Err "Pasta .elefante nao encontrada. Framework nao inicializado neste projeto."
        Write-Info "Rode: .\elefante.ps1 init"
        exit 1
    }

    Write-Host "  [ARQUIVOS] Arquivos do .elefante" -ForegroundColor White
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
            $age      = if ($days -eq 0) { "hoje" } elseif ($days -eq 1) { "ontem" } else { "ha $days dias" }
            $color    = if ($days -gt 14) { "Yellow" } else { "Green" }
            $warn     = if ($days -gt 14 -and $f -eq "01-ESTADO_ATUAL.md") { " [AVISO: SSOT desatualizado!]" } else { "" }
            Write-Host ("  {0,-35} {1,-12} {2}" -f $f, $age, $warn) -ForegroundColor $color
        } else {
            Write-Host ("  {0,-35} {1}" -f $f, "nao encontrado") -ForegroundColor DarkGray
        }
    }

    # Logs no historico
    Write-Host ""
    Write-Host "  [HISTORICO] Historico (.elefante/historico/)" -ForegroundColor White
    Write-Host ""
    $logs = Get-ChildItem $HistoricoDir -Filter "*.md" | Where-Object { $_.Name -ne "_TEMPLATE_LOG.md" } | Sort-Object LastWriteTime -Descending | Select-Object -First 5
    if ($logs.Count -eq 0) {
        Write-Info "Nenhum log encontrado ainda."
    } else {
        foreach ($log in $logs) {
            $days  = [int]($Now - $log.LastWriteTime).TotalDays
            $age   = if ($days -eq 0) { "hoje" } elseif ($days -eq 1) { "ontem" } else { "ha $days dias" }
            Write-Host ("  {0,-45} {1}" -f $log.Name, $age) -ForegroundColor Gray
        }
        $total = (Get-ChildItem $HistoricoDir -Filter "*.md" | Where-Object { $_.Name -ne "_TEMPLATE_LOG.md" }).Count
        if ($total -gt 5) {
            Write-Info ("... e mais " + ($total - 5) + " log(s). Total: " + $total + " logs.")
        }
    }

    # .agents
    Write-Host ""
    if (Test-Path $AgentsDir) {
        Write-Ok ".agents/ encontrado (IA configurada)"
    } else {
        Write-Warn ".agents/ nao encontrado - IA pode nao reconhecer o Framework"
    }
    Write-Host ""
}

# =============================================================================
# ROTEADOR DE COMANDOS
# =============================================================================
$cmd = if ($Comando) { $Comando.ToLower() } else { "help" }
switch ($cmd) {
    "init"   { Invoke-Init -Stack $Argumentos[0] }
    "log"    { Invoke-Log -Descricao ($Argumentos -join " ") }
    "status" { Invoke-Status }
    "help"   { Show-Help }
    default  {
        Write-Header
        Write-Err ("Comando desconhecido: " + $Comando)
        Write-Info "Use: .\elefante.ps1 help"
        exit 1
    }
}
