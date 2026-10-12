@echo off
setlocal
cd /d "D:\OS-A MALL\apps\mobile"

set "MSG=%~1"
if "%MSG%"=="" (
    set /p MSG="Ingresa el mensaje de la actualizacion OTA: "
)
if "%MSG%"=="" (
    set "MSG=Actualizacion visual Mall OS"
)

echo.
echo ========================================================
echo   Publicando OTA en Expo EAS (Canal Preview)...
echo   Mensaje: %MSG%
echo ========================================================
echo.

set NODE_OPTIONS=--max-old-space-size=4096
call npx eas-cli update --branch preview --message "%MSG%"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   [OK] OTA publicado exitosamente!
    echo   Abre tu app en el celular, cierrala y vuelve a abrirla.
    echo ========================================================
) else (
    echo.
    echo [ERROR] Fallo al publicar el OTA.
)

pause
