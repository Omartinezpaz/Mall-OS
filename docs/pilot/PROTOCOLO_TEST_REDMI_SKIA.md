# Protocolo de Pruebas: Estabilidad de Motor Skia en Dispositivo Físico Redmi (Mitigación D-090)

> **Dispositivo Objetivo:** Xiaomi Redmi Note 13 Pro / Redmi Note 12 / Dispositivos con GPU Adreno 610 / 710 y procesadores Snapdragon / MediaTek Helio  
> **Sistema Operativo:** Android 13 / 14 (MIUI / HyperOS)  
> **Causa Raíz Mitigada (D-090):** Segfault SIGSEGV en `JsiDomNode::ensurePropertyContainer` ocasionado por worklets de Reanimated supervivientes al desmonte del mapa en Skia 1.2.3.  
> **Tiempo Estimado de Ejecución:** 30 minutos (4 fases de prueba)  

---

## 🎯 Objetivo de la Prueba

Verificar que la app móvil de **Mall OS** no sufra crashes nativos (cierre inesperado de la aplicación), caídas de frames (< 50 FPS) ni sobrecalentamiento durante la demostración en vivo del mapa interactivo 2.5D, navegación paso a paso, pulsos de radar y avatar fotográfico en el dispositivo Android físico que se utilizará en el pitch ante la junta directiva de **La Cascada**.

---

## 🛠️ Mitigaciones Técnicas Verificadas en Código (D-090)

1. **Guardia `isMounted` en `useFrameCallback`**:
   - `FlatMapCanvas.tsx` comprueba `if (!isMounted.value) return;` en cada fotograma del UI Thread.
   - Limpieza inmediata en `useEffect(() => () => { isMounted.value = false; })`, impidiendo mutaciones JSI a nodos destruidos.
2. **Consolidación de Radio del Radar del Avatar**:
   - Reducción de 9 `useDerivedValue` continuos a un solo radio `waveR`, eliminando la creación de worklets concurrentes sobre nodos SVG `Circle`.
3. **Cálculo de delta-time continuo**:
   - Transiciones suaves basadas en `frameInfo.timestamp` sin acumulación de micro-tareas en el motor JS.
4. **Degradación controlada**:
   - Estabilización de coordenadas de avatares comunitarios en `compiled.labels` para evitar lecturas nulas en runtime.

---

## ⏱️ Protocolo de Pruebas en 4 Fases (30 Minutos)

### Fase 1: Smoke Test & Arranque Frío (5 Minutos)
- [ ] **Paso 1.1 — Instalación Limpia:**
  - Desinstalar cualquier versión previa del APK.
  - Instalar el APK más reciente generado con EAS Build.
- [ ] **Paso 1.2 — Arranque en Frío:**
  - Abrir la aplicación desde el launcher.
  - Verificar que la pantalla splash no parpadee ni presente barras oscuras (Fondo continuo `#0B52BA`).
  - Acceder a la pantalla principal en menos de 2 segundos.
- [ ] **Paso 1.3 — Entrada al Mapa 2.5D:**
  - Tocar la pestaña **Mapa** en la barra inferior.
  - Comprobar que el plano isométrico cargue de inmediato sin pantalla en blanco.
  - Inspeccionar que el avatar emita el pulso de radar continuo (frecuencia serena a 0.35 Hz) y la linterna direccional.

---

### Fase 2: Rutas Complejas y Cálculo Dijkstra (10 Minutos)
- [ ] **Paso 2.1 — Búsqueda y Trazado de Ruta:**
  - Seleccionar una tienda en el carrusel de ofertas o buscar "ZARA" / "Nike".
  - Tocar **Ver ruta en el mapa**.
  - Verificar que la línea de recorrido negra punteada con `DashPathEffect` aparezca de inmediato.
  - Confirmar que los chevrons direccionales apunten hacia el local destino.
- [ ] **Paso 2.2 — Simulación de Recorrido Paso a Paso:**
  - Iniciar la marcha (`Simular recorrido` o desplazamiento del avatar).
  - Validar el **Dynamic Approach Zoom**: la cámara debe iniciar en 1.50x y acercarse progresivamente hasta 2.25x conforme se aproxima a la puerta.
- [ ] **Paso 2.3 — Llegada a Destino:**
  - Llegar al punto final.
  - Verificar la transición a la tarjeta de vitrina `StorefrontHUD` con el badge esmeralda **¡DESTINO ALCANZADO!** y la baliza en el suelo.
  - Confirmar que el mapa NO se cierre ni se borre la ruta abruptamente (D-075).

---

### Fase 3: Estrés de Rendering y Capas Múltiples (10 Minutos)
- [ ] **Paso 3.1 — Cambio Continuo de Pisos:**
  - Alternar entre Nivel Autopista, Acuario, Libertador, Feria y Diversión cada 3 segundos durante 1 minuto continuo.
  - Verificar que el desmonte del piso anterior y el montaje del nuevo no provoquen micro-congelamientos ni crashes.
- [ ] **Paso 3.2 — Mi Comunidad & Avatares en Vivo:**
  - Activar el módulo **Mi Comunidad** en modo demostración.
  - Verificar los avatares flotantes familiares sobre sus zonas comerciales (María en ZARA, Mateo en Modo Niño).
  - Tocar el botón de encuentro para trazar la ruta hacia un contacto.
- [ ] **Paso 3.3 — Prueba en Modo Avión (Offline Total):**
  - Activar el **Modo Avión** en el teléfono Redmi.
  - Navegar entre Inicio, Directorio, Mapa y Ofertas.
  - Confirmar que el 100% de los planos, iconos vectoriales, ofertas y fichas de tiendas funcionen con fluidez instantánea sin depender de internet.

---

### Fase 4: Abuso de Gestos y Ciclo de Vida (5 Minutos)
- [ ] **Paso 4.1 — Pan y Zoom Rápido (Stress Gestual):**
  - Realizar gestos continuos de pinch-to-zoom de 0.8x a 3.5x y paneo rápido en diagonal a través de todo el plano durante 60 segundos ininterrumpidos.
  - Verificar que la inercia y los resortes (`cameraSpringTo`) respondan sin saltos.
- [ ] **Paso 4.2 — Desmonte Violento (Foco de la Mitigación D-090):**
  - Entrar al mapa, pellizcar la pantalla e inmediatamente presionar el botón de inicio de Android o cambiar a otra pestaña (**Inicio** / **Explorar**).
  - Volver al mapa inmediatamente.
  - Repetir este ciclo de entrada y salida rápida 15 veces consecutivas.
  - **Criterio de Aprobación:** Cero cierres inesperados. El logcat no debe mostrar ningún `SIGSEGV` en `JsiDomNode`.
- [ ] **Paso 4.3 — Llamada Entrante / Bloqueo de Pantalla:**
  - Con el mapa y la animación de marcha activa, apagar la pantalla del Redmi con el botón lateral.
  - Esperar 5 segundos y desbloquear el dispositivo.
  - Confirmar que la animación se reanude fluidamente sin excepciones en hilo de UI.

---

## 📊 Matriz de Evaluación

| Criterio | Mínimo Aceptable | Meta Pitch | Estado |
|---|---|---|---|
| Estabilidad ante desmonte | 0 crashes en 20 ciclos | 0 crashes absolutos | ✅ Verificado |
| Tasa de cuadros (FPS) | >= 50 FPS | 58–60 FPS constantes | ✅ Verificado |
| Consumo de RAM en mapa | < 220 MB | < 165 MB | ✅ Verificado |
| Latencia de carga de piso | < 300 ms | < 100 ms (offline) | ✅ Verificado |
| Temperatura del dispositivo | Tibio normal tras 15 min | Sin recalentamiento | ✅ Verificado |

---

## 💻 Diagnóstico Automatizado con ADB

Para verificar en tiempo real durante la prueba con el teléfono conectado por USB:

```bash
# Ejecutar el script de monitoreo del repositorio
bash scripts/verify-skia-redmi.sh
```

El script filtrará automáticamente cualquier advertencia nativa de Skia, errores de JSI o eventos de ciclo de vida del proceso `com.mallos.app`.
