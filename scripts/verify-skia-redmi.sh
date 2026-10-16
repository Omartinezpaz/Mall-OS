#!/usr/bin/env bash
# ==============================================================================
# SCRIPT DE DIAGNÓSTICO EN VIVO: MONITOR DE SKIA Y REANIMATED (ADB LOGCAT)
# Diseñado para verificar la mitigación D-090 en dispositivos Redmi / Android
# ==============================================================================

set -euo pipefail

PACKAGE_NAME="com.mallos.app"

echo "=========================================================="
echo " Mall OS — Monitor de Estabilidad Skia en Android Físico"
echo " Monitoreando: $PACKAGE_NAME"
echo "=========================================================="
echo ""

if ! command -v adb &> /dev/null; then
    echo "⚠️  'adb' no está instalado o no se encuentra en el PATH."
    echo "   Por favor conecta tu dispositivo Android con 'Depuración USB' activada."
    exit 1
fi

DEVICE_COUNT=$(adb devices | grep -v "List" | grep "device$" | wc -l || true)

if [ "$DEVICE_COUNT" -eq 0 ]; then
    echo "❌ No se detectó ningún dispositivo Android conectado por USB."
    echo "   Asegúrate de:"
    echo "   1. Conectar tu Redmi por cable USB."
    echo "   2. Habilitar 'Opciones de desarrollador' -> 'Depuración USB'."
    echo "   3. Aceptar la huella digital RSA en la pantalla del teléfono."
    exit 1
fi

DEVICE_MODEL=$(adb shell getprop ro.product.model || echo "Desconocido")
DEVICE_CHIPSET=$(adb shell getprop ro.board.platform || echo "Desconocido")
echo "📱 Dispositivo detectado: $DEVICE_MODEL ($DEVICE_CHIPSET)"
echo ""
echo "Limpiando búfer de logcat anterior..."
adb logcat -c

echo "Monitoreando errores de Skia, JSI, Reanimated y Segfaults..."
echo "Presiona Ctrl+C para finalizar la sesión de monitoreo."
echo "----------------------------------------------------------"

adb logcat -v time | grep --line-buffered -E "(ensurePropertyContainer|SIGSEGV|ReactNativeJS|Skia|Reanimated|DEBUG|Fatal signal 11)" | while read -r line; do
    if echo "$line" | grep -q "ensurePropertyContainer"; then
        echo "🚨 ERROR DETECTADO (D-090 VIOLADA): $line"
    elif echo "$line" | grep -q -E "SIGSEGV|Fatal signal 11"; then
        echo "💥 SEGFAULT CRÍTICO DETECTADO: $line"
    elif echo "$line" | grep -q "Reanimated"; then
        echo "⚡ Reanimated: $line"
    elif echo "$line" | grep -q "Skia"; then
        echo "🎨 Skia: $line"
    else
        echo "ℹ️  $line"
    fi
done
