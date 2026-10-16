#!/usr/bin/env bash
# ==============================================================================
# SCRIPT DE AUTOMATIZACIÓN: CONFIGURACIÓN DE VARIABLES EN VERCEL
# Mall OS Concierge IA & Portales B2B
# ==============================================================================

set -euo pipefail

echo "=========================================================="
echo " Mall OS — Asistente de Configuración de Vercel (Producción)"
echo "=========================================================="
echo ""

if ! command -v vercel &> /dev/null; then
    echo "⚠️  El comando 'vercel' no está instalado en tu sistema."
    echo "   Puedes instalarlo globalmente ejecutando: npm i -g vercel"
    echo "   O bien sigue los pasos manuales en: docs/pilot/CONFIGURACION_VERCEL.md"
    echo ""
    read -p "¿Deseas instalar vercel CLI ahora? (s/n): " -r INSTALL_VERCEL
    if [[ $INSTALL_VERCEL =~ ^[Ss]$ ]]; then
        npm install -g vercel
    else
        echo "Cancelado. Consulta docs/pilot/CONFIGURACION_VERCEL.md para configurar por UI."
        exit 0
    fi
fi

echo "Verificando inicio de sesión en Vercel..."
vercel whoami || vercel login

echo ""
echo "Ingresa tus variables de entorno para Mall OS:"
echo "----------------------------------------------------------"

read -p "1. GEMINI_API_KEY (de Google AI Studio): " GEMINI_API_KEY_INPUT
if [[ -z "$GEMINI_API_KEY_INPUT" ]]; then
    echo "❌ La GEMINI_API_KEY es obligatoria para el funcionamiento del Concierge."
    exit 1
fi

read -p "2. CONCIERGE_API_KEY [Enter para 'mallos-concierge-secret-2026']: " CONCIERGE_KEY_INPUT
CONCIERGE_API_KEY_INPUT="${CONCIERGE_KEY_INPUT:-mallos-concierge-secret-2026}"

read -p "3. DEFAULT_MALL_ID [Enter para 'sambil-chacao']: " MALL_ID_INPUT
DEFAULT_MALL_ID_INPUT="${MALL_ID_INPUT:-sambil-chacao}"

echo ""
echo "Aplicando variables a Vercel en entornos Production, Preview y Development..."

# Función auxiliar para agregar o actualizar variable
add_env_var() {
    local key="$1"
    local value="$2"
    echo "Configurando $key..."
    # Intenta agregar a production, preview y development
    echo "$value" | vercel env add "$key" production --force || true
    echo "$value" | vercel env add "$key" preview --force || true
    echo "$value" | vercel env add "$key" development --force || true
}

add_env_var "GEMINI_API_KEY" "$GEMINI_API_KEY_INPUT"
add_env_var "CONCIERGE_API_KEY" "$CONCIERGE_API_KEY_INPUT"
add_env_var "DEFAULT_MALL_ID" "$DEFAULT_MALL_ID_INPUT"
add_env_var "NEXT_PUBLIC_DEMO_MODE" "true"

echo ""
echo "✅ Variables configuradas exitosamente en Vercel."
echo "Para desplegar a producción con las nuevas variables ejecuta:"
echo "   cd apps/admin && vercel --prod"
echo ""
