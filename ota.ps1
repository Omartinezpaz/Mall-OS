# ==============================================================================
# Script de Publicación OTA (Over-The-Air) para Mall OS Mobile
# ==============================================================================
param(
    [string]$Message = ""
)

if ([string]::IsNullOrWhiteSpace($Message)) {
    $Message = Read-Host "Ingresa el mensaje para esta actualizacion OTA (ej: cambio de foto fachada)"
    if ([string]::IsNullOrWhiteSpace($Message)) {
        $Message = "Actualización visual y de contenido Mall OS"
    }
}

Write-Host "`n🚀 Publicando actualización OTA en el canal preview..." -ForegroundColor Cyan
Write-Host "📦 Mensaje: $Message`n" -ForegroundColor Yellow

Set-Location "D:\OS-A MALL\apps\mobile"

npx eas-cli update --branch preview --message "$Message"

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ ¡OTA publicado exitosamente en los servidores de Expo!" -ForegroundColor Green
    Write-Host "📱 Abre tu app en el teléfono, ciérrala y vuelve a abrirla para ver los cambios.`n" -ForegroundColor White
} else {
    Write-Host "`n❌ Error al publicar el OTA. Revisa los mensajes anteriores." -ForegroundColor Red
}

Set-Location "D:\OS-A MALL"
