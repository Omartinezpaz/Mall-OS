# Guía de Configuración de Variables de Entorno en Vercel (Producción)

> **Módulo:** Concierge IA + Portales Web B2B (Mall Executive OS & Store OS)  
> **Entorno de Despliegue:** Vercel (Next.js 14 App Router)  
> **Fecha:** 2026-10-13  

---

## 🎯 Objetivo
Configurar las 3 variables de entorno críticas necesarias en Vercel para que el **Concierge con Gemini 2.5 Flash** funcione al 100% en producción y esté listo para el pitch comercial ante la junta directiva.

---

## 📋 Variables Requeridas

| Variable | Tipo | Propósito | Ejemplo / Valor |
|---|---|---|---|
| `GEMINI_API_KEY` | **Secreto** | Autenticación con Google AI Studio para Gemini 2.5 Flash | `AIzaSy...` (desde Google AI Studio) |
| `CONCIERGE_API_KEY` | **Secreto** | Clave perimetral para cabecera `X-Mall-OS-Key` (seguridad anti-abuso) | `mallos-concierge-secret-2026` |
| `DEFAULT_MALL_ID` | Pública / Config | Mall predeterminado si no se envía cabecera `X-Mall-ID` | `sambil-chacao` o `la-cascada-carrizal` |
| `GEMINI_MODEL` | Opcional | Modelo de IA a utilizar (por defecto `gemini-2.5-flash`) | `gemini-2.5-flash` |
| `NEXT_PUBLIC_DEMO_MODE` | Pública | Habilita switcher de roles en portales de escritorio para el pitch | `true` |

---

## 🚀 Método 1: Configuración Rápida por Terminal (Vercel CLI)

Si tienes `vercel` instalado en tu máquina de desarrollo:

```bash
# 1. Iniciar sesión en Vercel
vercel login

# 2. Vincular el proyecto (si aún no está vinculado)
cd apps/admin
vercel link

# 3. Agregar las variables a los entornos Production y Preview
vercel env add GEMINI_API_KEY production
# Introduce tu clave de Google AI Studio cuando te la pida

vercel env add CONCIERGE_API_KEY production
# Introduce: mallos-concierge-secret-2026

vercel env add DEFAULT_MALL_ID production
# Introduce: sambil-chacao

vercel env add NEXT_PUBLIC_DEMO_MODE production
# Introduce: true

# 4. Redesplegar para aplicar las nuevas variables
vercel --prod
```

También puedes ejecutar el script interactivo incluido en el repositorio:
```bash
bash scripts/setup-vercel-env.sh
```

---

## 🖥️ Método 2: Configuración desde el Dashboard de Vercel

1. Entra a [https://vercel.com/dashboard](https://vercel.com/dashboard).
2. Selecciona tu proyecto web de **Mall OS** (`mall-os-admin` o `mall-os-portals`).
3. Ve a la pestaña **Settings** (Configuración) → **Environment Variables**.
4. Añade cada una de las variables:
   - **Key:** `GEMINI_API_KEY`
     - **Value:** `tu-api-key-de-google-ai-studio`
     - **Environments:** Marca `Production`, `Preview` y `Development`.
   - **Key:** `CONCIERGE_API_KEY`
     - **Value:** `mallos-concierge-secret-2026`
     - **Environments:** Marca `Production`, `Preview` y `Development`.
   - **Key:** `DEFAULT_MALL_ID`
     - **Value:** `sambil-chacao`
     - **Environments:** Marca `Production`, `Preview` y `Development`.
   - **Key:** `NEXT_PUBLIC_DEMO_MODE`
     - **Value:** `true`
     - **Environments:** Marca `Production`, `Preview` y `Development`.
5. Haz clic en **Save** para cada variable.
6. Ve a la pestaña **Deployments** y haz clic en **Redeploy** sobre el último commit para que las variables entren en vigor.

---

## 🔍 Verificación Post-Despliegue

Una vez redesplegado el proyecto en Vercel, ejecuta una petición GET a la ruta de salud:

```bash
curl -s https://tu-dominio-en-vercel.app/api/concierge/health
```

**Respuesta exitosa esperada (HTTP 200):**
```json
{
  "status": "healthy",
  "service": "Mall OS Concierge AI",
  "environment": {
    "geminiApiKeyConfigured": true,
    "conciergeAuthKeyConfigured": true,
    "supabaseConfigured": true,
    "defaultMallId": "sambil-chacao",
    "model": "gemini-2.5-flash"
  },
  "diagnostics": {
    "streamingSupported": true,
    "offlineFallbackAvailable": true,
    "maxDurationSeconds": 60
  }
}
```

Si `geminiApiKeyConfigured` es `false`, la respuesta devolverá HTTP 503 (`status: "degraded"`), alertando antes del pitch que falta la API key sin que la aplicación se rompa.
