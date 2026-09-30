¡Excelente decisión! Vamos a consolidar todo en un **documento maestro unificado** que puedas usar como tu "biblia del proyecto" — la base sobre la cual construirás el MVP, el pitch deck y la propuesta comercial.

---

# 📘 MALL OS — DOCUMENTO MAESTRO DE PRODUCTO
**Versión revisada:** 2.0.0  
**Fecha de revisión:** 12 de septiembre de 2026  
**Objetivo de esta revisión:** convertir la visión original en un plan ejecutable, vendible y escalable, separando claramente MVP, V1 y capacidades futuras.

## 🎯 VISIÓN DEL PRODUCTO

**Mall OS** no es una página web ni una app. Es un **Sistema Operativo para Centros Comerciales** que transforma el mall físico en una experiencia digital integrada, generando valor para los tres actores clave:

| Actor | Valor que recibe |
|-------|------------------|
| 🛍️ **Shopper** | Experiencia fluida, personalizada, útil y divertida |
| 🏪 **Tenant (Local)** | Herramienta de autogestión de marketing y ventas |
| 🏢 **Mall (Administración)** | Mina de oro de datos + nuevas fuentes de monetización |

### Principio estratégico de la versión 2.0

La visión completa se conserva, pero **no todo se construirá al mismo tiempo**. Mall OS se desarrollará como una plataforma modular:

- **MVP:** demostrar que el mall puede generar más interacción y conversiones mediante directorio, ofertas/cupones, mapa básico, Concierge IA, Tenant Portal y analítica.
- **V1:** añadir fidelización, campañas, notificaciones, puntos y retail media cuando exista uso real.
- **V2+:** integraciones profundas, indoor positioning, reservas, pagos, parking, Live Shopping, comunidad, AR y otras experiencias.
- **Regla de producto:** una funcionalidad entra en desarrollo solo si mejora adquisición, activación, engagement, conversión, ingresos o retención.

### Posicionamiento recomendado

> **Mall OS es la infraestructura digital que convierte un centro comercial en una plataforma medible, personalizada y monetizable.**

El producto no debe venderse como “otra app del mall”, sino como una capa tecnológica que conecta **Shopper + Tenant + Mall** y convierte las interacciones digitales en datos y oportunidades comerciales.

---

## 🎯 PRIORIZACIÓN DEL PRODUCTO

| Capacidad | MVP piloto | V1 | V2+ |
|---|---:|---:|---:|
| Home | ✅ | ✅ | ✅ |
| Explorar / directorio | ✅ | ✅ | ✅ |
| Mapa 2D / SVG | ✅ | ✅ | — |
| Indoor positioning / beacons | — | Opcional | ✅ |
| Ofertas + cupones QR | ✅ | ✅ | ✅ |
| Concierge IA | ✅ | Herramientas/acciones | Agente avanzado |
| Tenant Portal | ✅ básico | ✅ completo | ✅ |
| Dashboard Mall | ✅ básico | ✅ avanzado | Predictivo |
| Rewards / puntos | Base opcional | ✅ | Avanzado |
| Notificaciones segmentadas | Básicas | ✅ | Contextuales |
| Reservas | — | Integraciones puntuales | Carrito unificado |
| Pagos | — | Según caso | Checkout unificado |
| Parking / EV | — | Integración | Tiempo real |
| Live Shopping | — | — | ✅ |
| Comunidad social | — | Experimentos | ✅ |
| Modo Niño | Concepto | Básico | Completo |
| AR / búsqueda del tesoro | — | — | ✅ |
| Retail Media | Instrumentación | ✅ | Programático |

> **Criterio:** el MVP debe poder lanzarse en un mall piloto sin depender de hardware, POS, CRM, sistemas de parking o tiendas de aplicaciones.

---

# 🧭 ARQUITECTURA DE NAVEGACIÓN

### Barra inferior (Bottom Nav Bar) — 5 tabs principales

| Tab | Ícono | Nombre | Propósito |
|-----|-------|--------|-----------|
| 1 | 🏠 | **Home** | Dashboard personalizado + lo que pasa hoy |
| 2 | 🔍 | **Explorar** | Directorio, categorías, buscador interactivo |
| 3 | 🗺️ | **Mapa** | Wayfinding + geolocalización indoor |
| 4 | 🎁 | **Rewards** | Ofertas, puntos, gamificación |
| 5 | 👤 | **Perfil** | Cuenta, historial, configuración |

### Elementos flotantes (siempre accesibles)
- 🤖 **Concierge IA** — Botón flotante tipo WhatsApp
- 🔔 **Notificaciones** — Campana con badge
- 🔍 **Búsqueda rápida** — Barra superior
- 📷 **Escáner QR** — Acceso universal

---

## 🏠 SECCIÓN 1: HOME (Dashboard Personalizado)

**Prioridad:** MVP. Live Shopping, clima/afluencia avanzada y personalización profunda quedan para V1/V2.

> **Propósito:** Que el usuario abra la app y en 3 segundos sepa qué hay para él hoy.

### 1.1 — Onboarding (Solo primer uso)
| Pantalla | Contenido |
|----------|-----------|
| 1 | "Bienvenido a [Mall]" + animación del logo |
| 2 | "¿Qué tipo de visitante eres?" → Familia / Pareja / Solo / Amigos / Turista |
| 3 | "¿Qué te interesa?" → Tags: Moda, Gastronomía, Cine, Tecnología, Niños, Fitness, Belleza |
| 4 | Permiso de push + geolocalización |
| 5 | "¡Listo! Tu experiencia personalizada está lista" |

> 💡 Estos datos pueden alimentar personalización y segmentación **solo con consentimiento, minimización de datos y controles de privacidad**. La publicidad programática no forma parte del MVP.

### 1.2 — Header Dinámico (Siempre visible)
- **Saludo personalizado**: "Buenos días, María 👋"
- **Clima + recomendación**: "☔ Está lloviendo → Te recomendamos el Cine"
- **Estado del parking**: "🅿️ Nivel 2: 45 espacios libres"
- **Barra de búsqueda**: *"¿Qué quieres hacer hoy?"*

### 1.3 — Carrusel "Hoy en el Mall" (Hero)
Cards horizontales con las 3-5 actividades más relevantes del día:
- 🎸 Concierto acústico — 7:00 PM
- 🍔 Festival de Food Trucks — Todo el día
- 🎬 Estreno IMAX 3D
- 👶 Taller de manualidades — 4:00 PM

### 1.4 — Ofertas Flash Preview
- Countdown timer visible: "⏰ Expiran en 2h 15min"
- 3 ofertas más urgentes con botón "Activar cupón"
- Link a sección completa de Ofertas

### 1.5 — Recomendado para Ti (IA)
- Personalizado según onboarding + historial
- Ej: "Porque te gusta la gastronomía → Nuevo menú en Restaurante X"

### 1.6 — Estado del Mall en Tiempo Real
- 🟢 **Afluencia**: "Poca gente — Buen momento para visitar"
- 🅿️ **Parking por nivel**: Espacios libres
- 🌡️ **Clima interior**: Temperatura

### 1.7 — Live Shopping Preview
- Miniatura "🔴 EN VIVO" de transmisiones activas
- "Tienda X transmite descuentos exclusivos — ¡Únete!"

### 1.8 — Banner de Fidelización
- "🎰 Gira la ruleta y gana premios"
- "⭐ Tienes 350 puntos — ¡Canjéalos!"
- "📲 Invita a un amigo → Ambos ganan 100 puntos"

### 🧠 Comportamiento Inteligente
| Contexto | Qué muestra |
|----------|-------------|
| **Fuera del mall** | "Planifica tu visita", eventos del finde, cómo llegar |
| **Dentro del mall** | Ofertas cercanas, mapa activo, "Encuentra amigos" |
| **Noche / cerrado** | Eventos de mañana, reseñas, lives grabados |

---

## 🔍 SECCIÓN 2: EXPLORAR (Directorio Inteligente)

**Prioridad:** MVP. Reservas, menús dinámicos y catálogos externos se integran después.

> **Propósito:** Reemplazar el directorio aburrido por una experiencia de descubrimiento.

### 2.1 — Buscador Interactivo "¿Qué quieres hacer hoy?"
**No es un campo de texto vacío.** Muestra tarjetas de intención:
- 🍽️ Tengo hambre
- 👗 Quiero comprar ropa
- 🎬 Quiero entretenimiento
- 🎁 Busco un regalo
- 💇 Necesito un servicio
- ☕ Quiero un café

**Flujo de refinamiento:**
1. Toca "Tengo hambre" → Sub-opciones: Comida rápida / Restaurante / Cafetería / Postres
2. Luego: ¿Para cuántos? ¿Presupuesto? ¿Ahora o reservar?
3. Resultados ordenados por relevancia con foto, rating, distancia, oferta activa

### 2.2 — Categorías de Experiencias
| Categoría | Contenido |
|-----------|-----------|
| 🍽️ **Gastronomía** | Menú del día, fotos, rating, tiempo de espera, reservar |
| 🎬 **Entretenimiento** | Cartelera cine, juegos, bowling, escape rooms |
| 👗 **Moda** | Agrupadas por estilo (deportivo, formal, juvenil, lujo) |
| 🛒 **Supermercado/Servicios** | Horarios, ofertas del día, farmacias, cajeros |
| 💆 **Bienestar** | Spas, gimnasios, peluquerías — con agendamiento |
| 👶 **Familia/Niños** | Tiendas infantiles, lactarios, actividades |

### 2.3 — Mini-Perfil de cada Local
- Logo + foto de fachada + nombre + categoría
- Info: piso, local #, horario, teléfono, redes sociales
- Estado: "🟢 Abierto — Cierra a las 9:00 PM"
- ⭐ Rating + reseñas (4.5/5 con 128 reseñas)
- 🔥 Ofertas activas
- 🍽️ Menú del día (restaurantes)
- **Botones de acción**:
  - 📍 Cómo llegar (ruta en mapa)
  - 📞 Llamar
  - 🛒 Ver catálogo (si tiene e-commerce)
  - 📅 Reservar
  - ❤️ Guardar en favoritos
  - 📤 Compartir
  - 🔔 Seguir (recibir novedades)

### 2.4 — Sistema de Reseñas
- Rating 1-5 estrellas + categorías específicas (comida, servicio, ambiente)
- Reseñas con fotos
- Respuesta del local (desde Tenant Portal)
- Filtros: fecha, rating, con fotos, verificadas
- **Incentivo**: "Escribe reseña → gana 50 puntos"

---

## 🗺️ SECCIÓN 3: MAPA INTERACTIVO

**Prioridad:** MVP con SVG/Mapbox y posición manual/general. Beacons y navegación indoor precisa son V2.

> **Propósito:** Que el usuario nunca se pierda y encuentre todo rápido.

### Funcionalidades
| Elemento | Descripción |
|----------|-------------|
| **Mapa 2D/3D por niveles** | Slider lateral para cambiar de piso |
| **Geolocalización indoor** | Punto azul vía Bluetooth beacons o Wi-Fi |
| **Ruta guiada** | Flechas animadas: "Estás a 2 min → gira a la derecha" |
| **Filtros de servicios** | 🚻 Baños, 🍼 Lactarios, 🅿️ Ascensores, ♿ Rutas accesibles, 🔌 Cargadores EV, 🐕 Pet friendly |
| **Pines interactivos** | Al tocar → mini-card con nombre, rating, oferta, botón "Ir" |
| **"Encuentra a tus amigos"** | Avatares en mapa (con permiso) + "Enviar mi ubicación" |
| **Estado del parking** | Colores por nivel: 🟢 🟡 🔴 |
| **Rutas accesibles** | Modo especial con rampas y ascensores |

---

## 🎁 SECCIÓN 4: REWARDS (Ofertas + Puntos + Gamificación)

**Prioridad:** MVP = ofertas + cupones. Puntos/gamificación fuerte pasan a V1.

> **Propósito:** Fidelizar, generar data y distribuir tráfico dentro del mall.

### 4.1 — Marketplace de Ofertas Flash
- Feed tipo cards con: foto, logo, descuento, countdown, distancia, botón "Activar"
- Filtros: ⏰ Expiran pronto | 📍 Cerca de mí | 🏷️ Categoría | 💰 Mayor descuento | ⭐ Exclusivas
- **Push geolocalizadas**: "Estás cerca de Starbucks → 2x1 en frappuccinos por 30 min"
- **Cupón digital**: QR/código de barras para mostrar en caja
- **"Ofertas para ti"**: IA basada en historial

### 4.2 — Programa de Puntos
- **Saldo visible**: "Tienes 1,250 puntos 🪙"
- **Cómo ganar**: Escanear tickets, reseñas, misiones, check-in, referir amigos
- **Cómo canjear**:
  - 200 pts → Café gratis
  - 500 pts → 2h parking gratis
  - 1,000 pts → $10 descuento
  - 1,500 pts → Entrada al cine
  - 5,000 pts → $500 en tienda participante
- **Niveles**: Bronce → Plata → Oro → Diamante (cada uno con beneficios)
- **Alerta**: "⚠️ 300 puntos expiran en 15 días"

### 4.3 — Gamificación
| Elemento | Descripción |
|----------|-------------|
| **Ruleta de Premios** | 1 giro gratis al día + extras por misiones |
| **Búsqueda del Tesoro** | Misiones activas con mapa + QR scanner + barra de progreso |
| **Logros/Badges** | "🏅 Foodie", "🏅 Explorador del Piso 3", "🏅 Social" |
| **AR (Realidad Aumentada)** | Apuntar cámara → ver personajes 3D, regalos virtuales con cupones |
| **Ranking** | "Eres #12 de 345 participantes esta semana" |

### 4.4 — Notificaciones Push Inteligentes
| Tipo | Ejemplo |
|------|---------|
| **Al entrar al mall** | "¡Bienvenido! Hoy hay 12 ofertas activas" |
| **Comportamiento** | "Hace 2 semanas compraste en Nike → Hoy nueva colección" |
| **Urgencia** | "⏰ Tu cupón de 30% expira en 1 hora" |
| **Social** | "Tu amiga María está en el mall" |
| **Evento** | "🎵 En 30 min: Concierto en la plaza central" |

---

## 👤 SECCIÓN 5: MI PERFIL

**Prioridad:** MVP = cuenta, cupones y preferencias esenciales. Reservas, amigos y modo niño son posteriores.

> **Propósito:** Centro de control del usuario + acceso a funciones especiales.

| Elemento | Descripción |
|----------|-------------|
| **Foto y nombre** | Editables |
| **Nivel de membresía** | Bronce/Plata/Oro/Diamante + barra de progreso |
| **Saldo de puntos** | Con enlace al catálogo |
| **Mis cupones activos** | Con QR y fecha de expiración |
| **Mis reservas** | Mesas, cine, spa, eventos — con countdown |
| **Historial de compras** | Tickets escaneados, locales visitados |
| **Mis reseñas** | Con opción de editar/eliminar |
| **Tiendas seguidas** | Recibe sus novedades |
| **Amigos** | Para "Encuentra a tus amigos" |
| **Modo Niño** | Toggle con PIN |
| **Eventos privados** | Reservas de cumpleaños, salones |
| **Configuración** | Notificaciones, idioma, privacidad, accesibilidad, idioma |

---

## 🤖 SECCIÓN 6: CONCIERGE IA (Botón Flotante)

**Prioridad:** MVP. Debe responder con datos reales del mall y evitar inventar disponibilidad, precios o reservas.

> **Propósito:** Asistente personal 24/7 del mall.

### Capacidades
| Función | Ejemplo |
|---------|---------|
| **Preguntas frecuentes** | "¿Dónde hay un cajero?", "¿A qué hora cierra el cine?" |
| **Itinerarios personalizados** | "Tengo 3h con 2 niños" → Plan completo con mapa |
| **Recomendaciones contextuales** | Si llueve → sugiere cine; si es hora de almuerzo → restaurantes |
| **Reservas** | "Reserva mesa para 4 en el italiano a las 8 PM" |
| **Solución de problemas** | "¿Dónde está el lactario más cercano?" |
| **Respuestas con cards** | No solo texto → cards interactivas con botón "Ir" o "Reservar" |
| **Handoff a humano** | Si no puede resolver → chat con conserje VIP |
| **Voz** | Dictar por voz en lugar de escribir |
| **Multi-idioma** | Detecta idioma del usuario |

---

## 👶 SECCIÓN 7: MODO NIÑO

**Prioridad:** V2. No forma parte del alcance comercial inicial.

> **Propósito:** Entretener a los niños + herramienta útil para padres.

| Elemento | Descripción |
|----------|-------------|
| **Interfaz adaptada** | Colores brillantes, iconos grandes, tipografía divertida |
| **Mapa animado** | "Mundo" con personajes, tiendas como "casitas" con iconos (🍦 🧸) |
| **Mini-juegos** | "Encuentra estrellas escondidas", "Viste al personaje" |
| **Búsqueda del Tesoro Junior** | "Visita la juguetería y escanea el dinosaurio QR" |
| **Zona de padres** | Lactarios, cambiadores, zonas de juego, menú infantil |
| **Control parental** | Activar con PIN. Sin compras, sin push, sin redes sociales |

---

## 🔴 SECCIÓN 8: LIVE SHOPPING

**Prioridad:** V2. No construir antes de validar tráfico, ofertas y conversión.

> **Propósito:** Crear urgencia y ventas en tiempo real desde las tiendas.

| Elemento | Descripción |
|----------|-------------|
| **Feed de lives activos** | Thumbnail, tienda, viewers, producto destacado |
| **Player de video** | Stream con overlay de productos → precio + descuento + "Comprar" |
| **Chat en vivo** | Preguntas de viewers → vendedor responde en vivo |
| **Descuentos exclusivos** | Solo durante la transmisión + countdown |
| **Historial** | Grabaciones de lives pasados |
| **Calendario** | "Próximos lives" → activar recordatorio |

---

## 👥 SECCIÓN 9: COMUNIDAD SOCIAL

**Prioridad:** V2. Riesgo alto de moderación y baja densidad de contenido al inicio.

> **Propósito:** Crear sentido de pertenencia + contenido orgánico.

| Elemento | Descripción |
|----------|-------------|
| **Feed del Mall** | Publicaciones de usuarios + contenido oficial del mall |
| **Check-in Social** | "Estoy aquí" → post automático + hashtag → gana puntos |
| **Comunidades/Grupos** | "🍕 Foodies", "👩‍👧 Mamás", "🎮 Gamers", "🐕 Pet Lovers" |
| **Retos de Contenido** | "Sube un Reel mostrando tu outfit → gana 500 pts" |
| **"Encuentra a tus amigos"** | Mapa en tiempo real (con permiso mutuo) |

---

## 🛒 SECCIÓN 10: CARRITO DE EXPERIENCIAS (Reservas Unificadas)

**Prioridad:** V2. Requiere integraciones y pagos; no es requisito del piloto.

> **Propósito:** Planificar y reservar todo el día en el mall desde un solo lugar.

| Reserva | Flujo |
|---------|-------|
| 🍽️ **Mesa en restaurante** | Restaurante → fecha/hora → # personas → QR confirmación |
| 🎬 **Entradas de cine** | Película → función → asientos → pago → QR |
| 💆 **Cita en spa** | Servicio → profesional → horario → confirmar |
| 🎉 **Eventos privados** | Espacio → fecha → paquete → cotización → confirmar |
| 🅿️ **Parking anticipado** | Fecha/hora → pago → QR |

**Checkout unificado**: Un solo pago para todo. Confirmación con QRs descargables.

---

## 🚗 SECCIÓN 11: SERVICIOS Y UTILIDAD

**Prioridad:** MVP solo información estática/links. Integraciones de parking, EV, delivery y Wi-Fi son posteriores.

> **Propósito:** Resolver necesidades prácticas del visitante.

| Servicio | Funcionalidad |
|----------|---------------|
| **Smart Parking** | Estado en tiempo real, reservar, pagar desde app, historial |
| **Valet Parking** | Solicitar al llegar → notificación cuando auto esté listo |
| **Cargadores EV** | Mapa con estado libre/ocupado |
| **Cómo llegar** | Waze, Google Maps, Apple Maps, transporte público, Uber/Didi |
| **Servicios del mall** | Lactarios, baños, casilleros, info, sillas de ruedas, primeros auxilios, objetos perdidos |
| **Delivery interno** | Pedir de una tienda → que te lo lleven a otra o al parking |
| **Wi-Fi** | Conexión automática al abrir la app |
| **Horarios** | Mall, locales, festivos, Navidad |

---

## 🏢 SECCIÓN 12: TENANT PORTAL (App/Web para Locales)

**Prioridad:** MVP y pieza estratégica. El foco inicial es crear ofertas, ver resultados y mantener el perfil.

> **Propósito:** Que cada tienda gestione su presencia sin depender del mall.

| Módulo | Funcionalidad |
|--------|---------------|
| **Login por local** | Usuario y contraseña propio |
| **Dashboard** | Visitas al perfil, cupones activados, reseñas, clics en "cómo llegar" |
| **Gestión de perfil** | Logo, fotos, descripción, horario |
| **Publicar novedades** | Posts tipo Instagram que aparecen en su perfil |
| **Menú del día** | Para restaurantes: menú diario con fotos y precios |
| **Crear ofertas flash** | Descuento + duración + cantidad + imagen |
| **Oferta destacada** | Aparece en feed principal (costo adicional) |
| **Oferta geolocalizada** | Se activa cuando shopper pasa cerca |
| **Gestión de reservas** | Calendario, confirmar/rechazar/reagendar |
| **Responder reseñas** | Leer y contestar |
| **Iniciar Live Shopping** | Botón para transmitir desde el celular |
| **Mensajes del mall** | Comunicados internos (reuniones, normas, coordinación) |
| **Comprar publicidad** | Espacios en la app del mall con segmentación y presupuesto |

---

## 📊 SECCIÓN 13: DASHBOARD DEL MALL (Panel Administrativo)

**Prioridad:** MVP básico. Analítica predictiva, ESG avanzado e integraciones profundas son posteriores.

> **Propósito:** Control total + data accionable para la administración.

| Módulo | Contenido |
|--------|-----------|
| **Overview** | KPIs en tiempo real: usuarios activos, visitantes, cupones canjeados, ingresos por ads |
| **Analytics de Tránsito** | Afluencia por día/hora, zonas más visitadas, rutas comunes, tiempo de estancia |
| **Cruce de datos** | "40% de los que buscaron cine usaron cupón de comidas" |
| **Gestión de Ofertas** | Aprobar/rechazar ofertas de tenants, crear propias, ver performance |
| **Gestión de Publicidad** | Banners programáticos, impresiones/clics/CTR, facturación a locales |
| **Gestión de Eventos** | Crear, programar, ver RSVPs, gestionar aforo |
| **Gestión de Tenants** | Performance individual, cuáles están activos, cuáles no suben contenido |
| **Reportes automáticos** | PDF mensual: comportamiento, ROI, tendencias |
| **Gestión de Espacios** | Calendario de salones, pop-ups, eventos corporativos |
| **ESG / Sostenibilidad** | Huella de carbono ahorrada, reportes corporativos |

---

## 🔔 PANTALLAS TRANSVERSALES

| Pantalla | Función |
|----------|---------|
| **Centro de Notificaciones** | Feed cronológico por categorías (Ofertas, Eventos, Reservas, Puntos) |
| **Concierge IA** | Chat con IA + handoff a humano VIP |
| **Escáner QR Universal** | Para locales (tesoro), cupones, eventos, mesas de restaurante |
| **Carrito de Experiencias** | Resumen de reservas + checkout unificado + QRs |

---

## 🔗 MAPA DE CONEXIONES

```
HOME
 ├──→ Hoy en el Mall → Eventos → Reserva (Carrito)
 ├──→ Ofertas Flash → Rewards → Cupón → Canje → Data al Dashboard
 ├──→ Buscador → Explorar → Perfil Local → Reseña → Puntos
 ├──→ Feed Social → Comunidad → Check-in → Puntos
 ├──→ Live Shopping → Comprar/Reservar → Carrito
 └──→ Búsqueda del Tesoro → Mapa → Escanear QR → Puntos → Recompensa

CONCIERGE IA (flotante)
 ├──→ Responde → Dirige a Mapa / Explorar / Servicios
 ├──→ Genera itinerario → Integra: Restaurantes + Cine + Tiendas
 └──→ Handoff → Chat humano VIP

MAPA
 ├──→ Geolocalización → Push contextuales
 ├──→ "Encuentra amigos" → Social
 ├──→ Rutas accesibles → Servicios
 └──→ Parking → Smart Parking

REWARDS
 ├──→ Ofertas Flash → Data de canje → Dashboard
 ├──→ Puntos → Gamificación → Búsqueda del Tesoro
 └──→ Niveles → Beneficios → Fidelización

PERFIL
 ├──→ Modo Niño → Interfaz infantil
 ├──→ Mis Reservas → Carrito de Experiencias
 ├──→ Historial → Recomendaciones IA
 └──→ Configuración → Notificaciones, idioma, accesibilidad
```

---

## 🔄 FLUJO DE USUARIO TÍPICO (Ejemplo de un sábado)

| Hora | Acción |
|------|--------|
| **10:00 AM** | María abre la app. Ve festival de food trucks + oferta flash de su tienda favorita |
| **10:05 AM** | Activa cupón -30% en Zara (Tab Ofertas) |
| **10:10 AM** | Pregunta al Concierge IA: "¿Dónde desayunar con mis hijos?" → 3 opciones con menú infantil |
| **10:15 AM** | Reserva mesa en restaurante X para 1:00 PM (Eventos → Reservas) |
| **11:00 AM** | Llega al mall. Push: "📍 Estás cerca de Nike — 40% en tenis por 1 hora" |
| **11:30 AM** | Su hijo abre "Modo Niño" → Búsqueda del Tesoro |
| **1:00 PM** | Come. Escanea QR de mesa → ve menú → paga desde app |
| **2:00 PM** | Gira ruleta → gana 2h parking gratis |
| **3:00 PM** | Su amiga llega → usan "Encuentra a tus amigos" |
| **4:00 PM** | Califica restaurante con 5★ + check-in en Instagram (+50 pts) |
| **4:30 PM** | Sale. App envía: "Hoy ahorraste $850. Tienes 2,950 puntos. ¡Te vemos pronto! 👋" |

---

## 📋 RESUMEN EJECUTIVO: 13 SECCIONES

| # | Sección | Para quién | Valor clave |
|---|---------|-----------|-------------|
| 1 | 🏠 Home | Shopper | Dashboard personalizado |
| 2 | 🔍 Explorar | Shopper | Buscador inteligente + perfiles |
| 3 | 🗺️ Mapa | Shopper | Wayfinding + geolocalización |
| 4 | 🎁 Rewards | Shopper + Mall | Ofertas, puntos, gamificación |
| 5 | 👤 Perfil | Shopper | Control de cuenta + modo niño |
| 6 | 🤖 Concierge IA | Shopper | Asistente 24/7 |
| 7 | 👶 Modo Niño | Familias | Interfaz infantil + juegos |
| 8 | 🔴 Live Shopping | Shopper + Tenant | Transmisiones en vivo |
| 9 | 👥 Comunidad | Shopper | Feed social + grupos |
| 10 | 🛒 Carrito Experiencias | Shopper | Reservas unificadas |
| 11 | 🚗 Servicios | Shopper | Parking, Wi-Fi, lactarios |
| 12 | 🏢 Tenant Portal | Locales | Autogestión de marketing |
| 13 | 📊 Dashboard Mall | Administración | Data + monetización |

---

## 🚀 SIGUIENTES PASOS POSIBLES

Ahora que tienes el documento maestro completo, podemos avanzar en:

1. **🎨 Wireframes / Mockups** — Diseñar visualmente las pantallas principales (Home, Mapa, Rewards, Concierge IA).

2. **💰 Planes Comerciales** — Definir qué secciones van en cada plan (Básico / Pro / Enterprise) + pricing.

3. **📊 Pitch Deck** — Estructurar la presentación comercial para vender a directivos del mall.

4. **⚙️ Stack Tecnológico** — Definir tecnologías (Flutter vs React Native, backend, IA, beacons, etc.).

5. **🗓️ Roadmap de Desarrollo** — Fases MVP → V1 → V2 con prioridades.

6. **📝 Documento de Especificaciones Técnicas** — Para pasar a desarrollo (APIs, base de datos, integraciones).

---


# 🎨 MALL OS — GUÍA DE DISEÑO VISUAL

## 🎯 SISTEMA DE DISEÑO BASE

### Paleta de Colores Sugerida
| Uso | Color | Código |
|-----|-------|--------|
| **Primario (marca)** | Azul profundo | `#1E3A8A` |
| **Secundario (acción)** | Naranja vibrante | `#F97316` |
| **Acento (ofertas/urgencia)** | Rojo coral | `#EF4444` |
| **Éxito (puntos, logros)** | Verde menta | `#10B981` |
| **Fondo principal** | Blanco roto | `#FAFAFA` |
| **Fondo secundario** | Gris claro | `#F3F4F6` |
| **Texto principal** | Gris oscuro | `#111827` |
| **Texto secundario** | Gris medio | `#6B7280` |

> 💡 **Nota**: Estos colores son adaptables. Cada mall puede tener su paleta, pero esta es la base funcional.

### Tipografía
- **Titulares**: *Poppins* o *Inter* (Bold) — Moderna, amigable
- **Cuerpo**: *Inter* o *SF Pro* — Limpia, legible
- **Números/Datos**: *Tabular Nums* para alineación perfecta

### Componentes Base
- **Botones**: Bordes redondeados (12px), padding generoso
- **Cards**: Sombra suave (`0 2px 8px rgba(0,0,0,0.08)`), bordes redondeados (16px)
- **Iconografía**: Estilo *outline* (lineal), 24px en navegación, 48px en accesos rápidos
- **Animaciones**: Transiciones suaves (300ms), micro-interacciones en botones

---

# 📱 MOCKUP 1: PANTALLA HOME (La cara visible)

## 📐 Layout Mobile (375x812 — iPhone estándar)

```
┌─────────────────────────────────────┐
│ 🌤️ 22°C  │  🅿️ 45 libres  │ 🔔 3  │  ← Header compacto (48px)
├─────────────────────────────────────┤
│ Buenos días, María 👋               │  ← Saludo (24px, Bold)
│ ¿Qué quieres hacer hoy?             │  ← Subtítulo (14px, gris)
│ ┌─────────────────────────────────┐ │
│ │ 🔍 Buscar en el mall...         │ │  ← Barra de búsqueda
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│                                     │
│  ┌─────┐ ┌─────┐ ┌─────┐          │  ← Carrusel "Hoy en el Mall"
│  │ 🎸  │ │ 🍔  │ │ 🎬  │          │     Cards 280x160px
│  │Con- │ │Food │ │Est- │          │     Imagen + overlay
│  │cier-│ │Trucks│ │reno │          │     con gradiente
│  │to   │ │     │ │     │          │
│  │7PM  │ │Hoy  │ │IMAX │          │
│  └─────┘ └─────┘ └─────┘          │
│                                     │
├─────────────────────────────────────┤
│ ⏰ OFERTAS FLASH — Expiran en 2h   │  ← Sección ofertas preview
│ ┌─────────────────────────────────┐ │
│ │ [👟] Nike — 40% OFF             │ │  ← Card horizontal
│ │      ⏰ 1h 45min  📍 50m        │ │
│ │              [Activar cupón]    │ │  ← Botón naranja
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ [☕] Starbucks — 2x1 Frappé     │ │
│ │      ⏰ 45min     📍 120m       │ │
│ │              [Activar cupón]    │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ 🎯 RECOMENDADO PARA TI             │  ← Sección IA
│ ┌──────┐ ┌──────┐ ┌──────┐        │
│ │ 🍽️  │ │ 👗   │ │ 💆   │        │  ← Cards 140x180px
│ │Nuevo │ │Col.  │ │Spa   │        │
│ │menú  │ │Verano│ │20%   │        │
│ └──────┘ └──────┘ └──────┘        │
├─────────────────────────────────────┤
│ 📊 ESTADO DEL MALL                 │
│ ┌─────────────────────────────────┐ │
│ │ 🟢 Afluencia: Baja              │ │  ← 3 widgets en fila
│ │ 🅿️ Parking: 45 libres           │ │
│ │ 🌡️ 22°C confortable             │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ 🔴 EN VIVO: Zara presenta         │  ← Live Shopping preview
│    colección de verano            │
│    [Ver transmisión →]            │
├─────────────────────────────────────┤
│ 🎰 ¡Gira la ruleta!              │  ← Banner fidelización
│    Tienes 350 pts → [Canjear]     │
├─────────────────────────────────────┤
│                                     │
│  🏠    🔍    🗺️    🎁    👤       │  ← Bottom Nav Bar (56px)
│ Home  Explor  Mapa  Rew   Perfil   │     Fijo, con indicador
│                                     │     activo en naranja
└─────────────────────────────────────┘
         ↑
    🤖 [Botón flotante Concierge IA]
       Círculo naranja 56px
       Esquina inferior derecha
       Sobre el bottom nav
```

### 🎬 Micro-interacciones
- **Carrusel "Hoy"**: Autoplay cada 5s, swipe horizontal, snap a cards
- **Ofertas Flash**: Countdown con animación de números (flip)
- **Botón "Activar cupón"**: Al presionar → animación de confeti + cupón aparece en "Mis cupones"
- **Concierge IA**: Burbuja con pulso suave cada 10s para llamar la atención

### 📱 Estados de la pantalla
| Estado | Qué cambia |
|--------|-----------|
| **Usuario fuera del mall** | Oculta ofertas geolocalizadas, muestra "Planifica tu visita" + eventos del finde |
| **Usuario dentro del mall** | Activa ofertas cercanas, mapa en tiempo real, "Encuentra amigos" |
| **Mall cerrado (noche)** | Muestra eventos de mañana, lives grabados, reseñas destacadas |
| **Usuario nuevo (sin onboarding)** | Muestra contenido genérico + CTA "Completa tu perfil" |

---

# 🗺️ MOCKUP 2: MAPA INTERACTIVO

## 📐 Layout Mobile

```
┌─────────────────────────────────────┐
│ ← Mapa del Mall        🔍  📍     │  ← Header
├─────────────────────────────────────┤
│                                     │
│   ┌───────────────────────────┐    │
│   │                           │    │
│   │    🟢 🟢 🟢 🟢 🟢        │    │  ← Mapa 2D del piso
│   │    🟢 [TU] 🟢 🟢 🟢      │    │     con pines de colores
│   │    🟢 🟢 🔴 🟢 🟢        │    │     [TU] = punto azul
│   │    🟢 🟢 🟢 🟡 🟢        │    │     🟢 Moda  🔴 Comida
│   │                           │    │     🔵 Cine  🟡 Servicios
│   │                           │    │
│   └───────────────────────────┘    │
│                                     │
│  ┌──┐                              │  ← Selector de pisos
│  │S1│  (Sidebar vertical)          │     Botones apilados
│  ├──┤                              │     Piso actual = naranja
│  │PB│                              │
│  ├──┤                              │
│  │1 │                              │
│  ├──┤                              │
│  │2 │                              │
│  ├──┤                              │
│  │3 │                              │
│  └──┘                              │
│                                     │
│  Filtros rápidos (chips):          │
│  [🚻 Baños] [🍼 Lactario]         │  ← Chips scrolleables
│  [🅿️ Parking] [♿ Accesible]       │     horizontales
│  [🔌 EV] [🐕 Pet]                 │
│                                     │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │  ← Mini-card al tocar pin
│ │ [📷] Zara                       │ │     (aparece desde abajo)
│ │ ⭐ 4.5 (128)  📍 Piso 1, L-23   │ │
│ │ 🔥 -30% hoy                     │ │
│ │                                 │ │
│ │ [📍 Ir]  [❤️]  [📤]            │ │  ← Botones de acción
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│  🏠    🔍    🗺️    🎁    👤       │
└─────────────────────────────────────┘
```

### 🎬 Ruta guiada (cuando el usuario toca "Ir")
```
┌─────────────────────────────────────┐
│  ← Ruta a Zara                      │
├─────────────────────────────────────┤
│                                     │
│   ┌───────────────────────────┐    │
│   │    🟢 🟢 🟢 🟢 🟢        │    │
│   │    🟢 [TU]→→→→ 🟢        │    │  ← Línea animada
│   │    🟢 🟢 🔴 🟢 🟢        │    │     naranja con flechas
│   │    🟢 🟢 🟢 🟡 🟢        │    │     que se mueven
│   │                           │    │
│   └───────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐   │  ← Card de instrucciones
│  │ 🚶 Estás a 2 min caminando  │   │     sticky en la parte
│  │ → Gira a la derecha en      │   │     inferior
│  │   el pasillo central        │   │
│  │   [Cancelar ruta]           │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### 🎬 Micro-interacciones
- **Pines**: Al hacer zoom, se expanden y muestran más detalle
- **Ruta**: Línea animada con partículas que fluyen hacia el destino
- **Cambio de piso**: Transición suave con fade + zoom
- **Tu ubicación**: Punto azul con pulso (onda expansiva) cada 2s

---

# 🎁 MOCKUP 3: REWARDS (Ofertas + Puntos + Gamificación)

## 📐 Layout Mobile

```
┌─────────────────────────────────────┐
│ 🎁 Rewards              🔔         │  ← Header
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │  ← Card de puntos (hero)
│  │  🏆 Tienes                  │   │     Gradiente azul→morado
│  │     2,450 puntos            │   │
│  │  ⭐ Oro — Te faltan 200     │   │
│  │     para Diamante           │   │
│  │  [━━━━━━━━━━░░░░] 80%       │   │
│  │                             │   │
│  │  [Canjear puntos →]         │   │  ← Botón blanco
│  └─────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│  🔥 OFERTAS FLASH                   │
│  [Expiran pronto] [Cerca] [Categoría]│  ← Filtros tipo chips
│                                     │
│  ┌─────────────────────────────┐   │
│  │ [📷]  Nike                  │   │  ← Card de oferta
│  │                              │   │     (estilo Instagram)
│  │  ⏰ Expira en 1h 45min       │   │     Imagen grande arriba
│  │                              │   │
│  │  Tenis Air Max               │   │
│  │  $2,499 → $1,499             │   │
│  │  -40% OFF                    │   │
│  │  📍 A 50m de ti              │   │
│  │                              │   │
│  │        [Activar cupón]       │   │  ← Botón naranja grande
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ [📷]  Starbucks             │   │
│  │  ⏰ 45min  📍 120m           │   │
│  │  2x1 Frappuccino             │   │
│  │        [Activar cupón]       │   │
│  └─────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│  🗺️ BÚSQUEDA DEL TESORO            │  ← Sección gamificación
│  ┌─────────────────────────────┐   │
│  │  Misión: Visita 5 tiendas   │   │
│  │  del piso 2                 │   │
│  │                             │   │
│  │  ✅ Zara  ✅ H&M  ✅ Bershka │   │
│  │  ⬜ Pull&Bear  ⬜ Stradivarius│   │
│  │                             │   │
│  │  [Ver mapa →]               │   │
│  └─────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│  🎰 GIRA LA RULETA                 │  ← Banner gamificación
│  ┌─────────────────────────────┐   │
│  │  1 giro gratis hoy          │   │
│  │  [Girar ahora →]            │   │
│  └─────────────────────────────┘   │
├─────────────────────────────────────┤
│  🏠    🔍    🗺️    🎁    👤       │
└─────────────────────────────────────┘
```

### 🎬 Ruleta de Premios (modal al tocar "Girar")
```
┌─────────────────────────────────────┐
│                              ✕     │
│                                     │
│         ┌───────────────┐          │
│         │    🎰 RULETA  │          │
│         │   ╱ ☕  │  🎁 ╲         │
│         │  ╱─────┼─────╲ │         │
│         │ │ 50pts│ 10%  ││         │
│         │ │──────┼──────││         │
│         │ │ 2x1  │ 🏆   ││         │
│         │  ╲─────┼─────╱ │         │
│         │   ╲ 🎟️ │  😢 ╱          │
│         │    └───────┘            │
│         │        ▲                │  ← Flecha indicadora
│         └───────────────┘          │
│                                     │
│        [🎲 GIRAR]                  │  ← Botón grande
│                                     │
│   "¡Gira y gana premios al instante!"│
└─────────────────────────────────────┘
```

**Al ganar:**
- Animación de confeti + sonido de celebración
- Modal: "🎉 ¡Ganaste 2 horas de parking gratis!"
- Botón: "Ver en Mis cupones"

---

# 🤖 MOCKUP 4: CONCIERGE IA

## 📐 Layout Mobile (modal que sube desde abajo)

```
┌─────────────────────────────────────┐
│  🤖 Concierge Mall OS        ✕    │  ← Header
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 🤖 ¡Hola María! Soy tu     │   │  ← Mensaje del bot
│  │    asistente del mall.      │   │     Burbuja azul clara
│  │    ¿En qué puedo ayudarte?  │   │     alineada a la izquierda
│  └─────────────────────────────┘   │
│                                     │
│  Sugerencias rápidas (chips):      │
│  ┌──────────┐ ┌──────────┐        │
│  │🍽️ Tengo  │ │🎬 Quiero │        │  ← Chips scrolleables
│  │  hambre  │ │entreten. │        │
│  └──────────┘ └──────────┘        │
│  ┌──────────┐ ┌──────────┐        │
│  │👶 Vengo  │ │🔧 Busco  │        │
│  │con niños │ │servicio  │        │
│  └──────────┘ └──────────┘        │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 👤 ¿Dónde hay un lactario?  │   │  ← Mensaje del usuario
│  └─────────────────────────────┘   │     Burbuja gris
│                                     │     alineada a la derecha
│  ┌─────────────────────────────┐   │
│  │ 🤖 Encontré 2 lactarios     │   │  ← Respuesta del bot
│  │    cerca de ti:             │   │
│  │                             │   │
│  │  ┌───────────────────────┐  │   │  ← Card interactiva
│  │  │ 🍼 Lactario Piso 1    │  │   │
│  │  │ 📍 Junto a Starbucks  │  │   │
│  │  │ 🚶 A 2 min caminando  │  │   │
│  │  │ [📍 Cómo llegar]      │  │   │
│  │  └───────────────────────┘  │   │
│  │                             │   │
│  │  ┌───────────────────────┐  │   │
│  │  │ 🍼 Lactario Piso 2    │  │   │
│  │  │ 📍 Cerca de Zara Kids │  │   │
│  │  │ 🚶 A 4 min caminando  │  │   │
│  │  │ [📍 Cómo llegar]      │  │   │
│  │  └───────────────────────┘  │   │
│  │                             │   │
│  │  ¿Necesitas algo más?      │   │
│  └─────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│ ┌─────────────────────────┐ [🎤]  │  ← Input de texto
│ │ Escribe tu pregunta...  │       │     + botón de voz
│ └─────────────────────────┘       │
│                                     │
│  [📞 Hablar con conserje humano]  │  ← Link de escalación
└─────────────────────────────────────┘
```

### 🎬 Ejemplo de itinerario generado por IA
```
┌─────────────────────────────────────┐
│  🤖 ¡Perfecto! Aquí está tu plan   │
│     para 3 horas con 2 niños:      │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 1️⃣ 11:00 AM — Almuerzo     │   │  ← Timeline vertical
│  │    🍽️ Restaurante "La       │   │     con cards conectadas
│  │    Familia" (Piso 2)        │   │
│  │    ✅ Menú infantil          │   │
│  │    ✅ Zona de juegos         │   │
│  │    [📍 Cómo llegar] [📅]    │   │
│  └─────────────────────────────┘   │
│              │                      │
│  ┌─────────────────────────────┐   │
│  │ 2️⃣ 12:30 PM — Cine         │   │
│  │    🎬 "Moana 2" (IMAX)      │   │
│  │    ⏰ Duración: 1h 45min    │   │
│  │    [🎟️ Comprar entradas]   │   │
│  └─────────────────────────────┘   │
│              │                      │
│  ┌─────────────────────────────┐   │
│  │ 3️⃣ 2:30 PM — Helado        │   │
│  │    🍦 "Freddo" (Piso 1)     │   │
│  │    🎁 2x1 con tu cupón      │   │
│  │    [📍 Cómo llegar]         │   │
│  └─────────────────────────────┘   │
│                                     │
│  [📅 Agendar todo]  [🔄 Modificar]│
└─────────────────────────────────────┘
```

### 🎬 Micro-interacciones
- **Typing indicator**: 3 puntos animados mientras el bot "piensa"
- **Cards interactivas**: Al tocar "Cómo llegar" → abre el mapa con ruta trazada
- **Voz**: Al presionar 🎤 → onda de audio animada mientras dicta
- **Transiciones**: Mensajes aparecen con fade + slide desde abajo

---

# 🏢 MOCKUP 5: TENANT PORTAL (Web Desktop)

## 📐 Layout Desktop (1440x900)

```
┌────────────────────────────────────────────────────────────┐
│  🏢 Tenant Portal    │  Nike Store  │  🔔 3  │  👤 Juan  │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌──────────┐  ┌──────────────────────────────────────┐   │
│  │ 📊 Dash  │  │                                      │   │
│  │ 🏪 Perfil│  │  Buenos días, Juan 👋                │   │
│  │ 🎁 Ofert │  │  Aquí está el resumen de tu tienda   │   │
│  │ 📅 Reser │  │                                      │   │
│  │ 💬 Reseñ │  │  ┌────────┐ ┌────────┐ ┌────────┐   │   │
│  │ 📺 Live  │  │  │ 👁️    │ │ 🎟️    │ │ ⭐     │   │   │
│  │ 📢 Ads   │  │  │ 1,245  │ │ 87     │ │ 4.6    │   │   │
│  │ ⚙️ Config│  │  │Visitas │ │Cupones │ │Rating  │   │   │
│  │          │  │  │+30% ↑  │ │+15% ↑  │ │+0.2 ↑  │   │   │
│  │          │  │  └────────┘ └────────┘ └────────┘   │   │
│  │          │  │                                      │   │
│  │          │  │  📈 TRÁFICO DE LA SEMANA             │   │
│  │          │  │  ┌────────────────────────────────┐ │   │
│  │          │  │  │  📊                            │ │   │
│  │          │  │  │  ▁▂▃▅▇▅▃                     │ │   │
│  │          │  │  │  Lun Mar Mié Jue Vie Sáb Dom  │ │   │
│  │          │  │  └────────────────────────────────┘ │   │
│  │          │  │                                      │   │
│  │          │  │  🔥 OFERTAS ACTIVAS                  │   │
│  │          │  │  ┌────────────────────────────────┐ │   │
│  │          │  │  │ [📷] 40% OFF Air Max           │ │   │
│  │          │  │  │      ⏰ 1h 45min  🎟️ 23 canj. │ │   │
│  │          │  │  │      [Editar] [Pausar]         │ │   │
│  │          │  │  └────────────────────────────────┘ │   │
│  │          │  │                                      │   │
│  │          │  │  [+ Crear nueva oferta]             │   │
│  │          │  │                                      │   │
│  └──────────┘  └──────────────────────────────────────┘   │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 🎬 Pantalla de "Crear Oferta" (modal)
```
┌────────────────────────────────────────────────────────────┐
│  ✕ Crear nueva oferta                                      │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  📷 Imagen de la oferta                                    │
│  ┌────────────────────┐                                   │
│  │                    │                                   │
│  │   [📷 Subir foto]  │                                   │
│  │                    │                                   │
│  └────────────────────┘                                   │
│                                                            │
│  Título de la oferta                                       │
│  ┌────────────────────────────────────────────────────┐   │
│  │ 40% OFF en tenis Air Max                           │   │
│  └────────────────────────────────────────────────────┘   │
│                                                            │
│  Descripción                                               │
│  ┌────────────────────────────────────────────────────┐   │
│  │ Descuento válido en toda la línea Air Max...       │   │
│  └────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌──────────────────────┐  ┌──────────────────────┐      │
│  │ Descuento: [40 % ▼]  │  │ Tipo: [Porcentaje ▼] │      │
│  └──────────────────────┘  └──────────────────────┘      │
│                                                            │
│  ┌──────────────────────┐  ┌──────────────────────┐      │
│  │ Inicio: [Fecha/Hora] │  │ Fin: [Fecha/Hora]    │      │
│  └──────────────────────┘  └──────────────────────┘      │
│                                                            │
│  Cantidad de cupones disponibles                           │
│  ┌────────────────────────────────────────────────────┐   │
│  │ 100                                                │   │
│  └────────────────────────────────────────────────────┘   │
│                                                            │
│  ☐ Destacar en feed principal (+$500 MXN)                 │
│  ☐ Activar geolocalización (radio 500m)                   │
│                                                            │
│  [Cancelar]                              [Publicar oferta] │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

# 📊 MOCKUP 6: DASHBOARD DEL MALL (Web Desktop — Vista ejecutiva)

## 📐 Layout Desktop (1440x900)

```
┌────────────────────────────────────────────────────────────┐
│  📊 Mall OS Admin    │  Plaza Central  │  🔔 │  👤 Admin  │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌──────────┐  ┌──────────────────────────────────────┐   │
│  │ 📊 Over  │  │                                      │   │
│  │ 📈 Analt │  │  📊 OVERVIEW — Domingo 13 Sep 2026   │   │
│  │ 🎁 Ofert │  │                                      │   │
│  │ 📢 Ads   │  │  ┌────────┐ ┌────────┐ ┌────────┐   │   │
│  │ 🎉 Even  │  │  │ 📱     │ │ 🚶     │ │ 💰     │   │   │
│  │ 🏪 Tenan │  │  │ 12,450 │ │ 8,320  │ │ $245K  │   │   │
│  │ 📅 Espac │  │  │Usuarios │ │Visit.  │ │Ingresos│   │   │
│  │ 🌱 ESG   │  │  │App act.│ │Hoy     │ │Ads mes │   │   │
│  │ 📄 Repor │  │  │+18% ↑  │ │+12% ↑  │ │+45% ↑  │   │   │
│  │          │  │  └────────┘ └────────┘ └────────┘   │   │
│  │          │  │                                      │   │
│  │          │  │  📈 AFLUENCIA POR HORA               │   │
│  │          │  │  ┌────────────────────────────────┐ │   │
│  │          │  │  │         ▇                      │ │   │
│  │          │  │  │      ▇ ▇ ▇ ▇                   │ │   │
│  │          │  │  │   ▅ ▇ ▇ ▇ ▇ ▇ ▅               │ │   │
│  │          │  │  │ ▃ ▅ ▇ ▇ ▇ ▇ ▇ ▇ ▅ ▃          │ │   │
│  │          │  │  │ 10 12 14 16 18 20 22           │ │   │
│  │          │  │  └────────────────────────────────┘ │   │
│  │          │  │                                      │   │
│  │          │  │  🔥 TOP OFERTAS DEL DÍA              │   │
│  │          │  │  ┌────────────────────────────────┐ │   │
│  │          │  │  │ 1. Nike — 40% OFF    234 canj. │ │   │
│  │          │  │  │ 2. Starbucks — 2x1   187 canj. │ │   │
│  │          │  │  │ 3. Zara — 30% OFF    156 canj. │ │   │
│  │          │  │  └────────────────────────────────┘ │   │
│  │          │  │                                      │   │
│  │          │  │  🏪 TENANTS MÁS ACTIVOS              │   │
│  │          │  │  ┌────────────────────────────────┐ │   │
│  │          │  │  │ Nike ⭐⭐⭐⭐⭐  87 cupones      │ │   │
│  │          │  │  │ Starbucks ⭐⭐⭐⭐  65 cupones   │ │   │
│  │          │  │  │ Zara ⭐⭐⭐⭐   45 cupones       │ │   │
│  │          │  │  └────────────────────────────────┘ │   │
│  │          │  │                                      │   │
│  └──────────┘  └──────────────────────────────────────┘   │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

# 🎬 NOTAS DE INTERACCIÓN Y ANIMACIONES

## Animaciones Clave

| Elemento | Animación | Duración |
|----------|-----------|----------|
| **Carga inicial** | Logo se dibuja + fade in del contenido | 800ms |
| **Cards del carrusel** | Slide horizontal con snap | 300ms |
| **Botón "Activar cupón"** | Scale down → confeti → cupón aparece | 500ms |
| **Ruleta** | Giro con desaceleración física | 3s |
| **Punto de ubicación** | Pulso expansivo (onda) | 2s loop |
| **Ruta en mapa** | Línea se dibuja progresivamente | 1s |
| **Mensajes del bot** | Fade + slide desde abajo | 300ms |
| **Typing indicator** | 3 puntos con bounce secuencial | 1s loop |
| **Bottom nav** | Icono activo crece + cambia color | 200ms |
| **Notificación push** | Slide desde arriba + vibración | 400ms |

## Estados Vacíos (Empty States)

Cuando no hay contenido, mostrar mensajes amigables con ilustración:

| Pantalla | Mensaje vacío |
|----------|---------------|
| **Ofertas** | "🎯 No hay ofertas activas ahora. ¡Vuelve pronto!" |
| **Mis cupones** | "🎟️ Aún no tienes cupones. ¡Activa tu primero!" |
| **Reservas** | "📅 No tienes reservas. ¡Planifica tu visita!" |
| **Reseñas** | "⭐ Aún no has reseñado. ¡Comparte tu experiencia!" |
| **Búsqueda del tesoro** | "🗺️ No hay misiones activas. ¡Pronto habrá sorpresas!" |

---

# 📋 CHECKLIST PARA EL DISEÑADOR

## Entregables necesarios

1. **Design System completo** en Figma:
   - Paleta de colores (con variables)
   - Tipografía (estilos H1, H2, body, caption)
   - Componentes: botones, cards, inputs, chips, modals
   - Iconografía (set de 50+ iconos)

2. **Mockups de alta fidelidad** (mobile 375x812):
   - [ ] Home (3 estados: fuera/dentro/cerrado)
   - [ ] Mapa (con ruta activa)
   - [ ] Rewards (con ruleta abierta)
   - [ ] Concierge IA (con itinerario)
   - [ ] Perfil de local
   - [ ] Checkout de experiencias
   - [ ] Modo Niño
   - [ ] Live Shopping

3. **Mockups desktop** (1440x900):
   - [ ] Tenant Portal (dashboard + crear oferta)
   - [ ] Dashboard Mall (overview + analytics)

4. **Prototipo interactivo** en Figma:
   - Navegación entre pantallas
   - Animaciones de transición
   - Micro-interacciones clave

5. **Guía de marca adaptable**:
   - Cómo adaptar colores al branding de cada mall
   - Versiones light/dark mode

---

# 🚀 SIGUIENTE PASO

Ahora que tienes los mockups detallados, te propongo avanzar con:

1. **💰 Plan 2: Planes Comerciales** — Definir Básico / Pro / Enterprise con precios.
2. **📊 Plan 3: Pitch Deck** — Estructurar la presentación para vender.
3. **⚙️ Plan 4: Stack Tecnológico** — Definir tecnologías para desarrollar.
4. **🗓️ Plan 5: Roadmap MVP** — Fases de desarrollo priorizadas.

**¿Por cuál seguimos?** 

Mi recomendación: **Plan 2 (Planes Comerciales)**, porque con los mockups ya tienes el producto visualizado, y ahora necesitas definir CÓMO lo vas a vender y a qué precio. Esto te permite empezar a prospectar clientes incluso antes de programar una sola línea de código. 💼

¡Excelente elección! Definir los **Planes Comerciales** es el paso más crítico para transformar esta idea en un negocio real. 

Para venderle a un centro comercial, no puedes ofrecer un precio único. Un plaza de barrio con 20 locales no puede pagar lo mismo que un mega-mall con 150 tiendas. La clave está en la **escalabilidad** y en demostrar un **ROI (Retorno de Inversión) claro**.

Aquí tienes la estructura de precios y empaquetado comercial diseñada para maximizar tus ventas.

---

# 💰 MALL OS — MODELO DE NEGOCIO Y PLANES COMERCIALES

## 🧠 La Estrategia de Pricing: Modelo Híbrido (Recomendado)
Cobra por el valor de la plataforma y mantén el modelo simple durante el piloto. El modelo recomendado tiene 3 componentes:

1. **Fee de Implementación (Setup Inicial)**: Cubre la personalización de marca, carga inicial del directorio, configuración de servidores y lanzamiento. *(Demuestra compromiso y cubre tus costos iniciales).*
2. **Suscripción Mensual (SaaS)**: Licencia de uso, hosting, mantenimiento, actualizaciones y soporte. *(Tu ingreso recurrente y predecible).*
3. **Revenue Share (opcional):** porcentaje negociado sobre **ingresos de retail media efectivamente cobrados**. No debe ser obligatorio en el primer contrato si complica la venta.

---

## 📦 LOS 3 PLANES COMERCIALES

### 🥉 PLAN 1: MALL OS STARTER (Básico)
> **Para quién es:** Plazas comerciales de barrio, mercados gourmet, outlets pequeños o centros con 10 a 30 locales que necesitan digitalizarse sin complicaciones.
> **Promesa de valor:** "Tu centro comercial, visible y organizado en el bolsillo de tus clientes".

| Característica | Detalle |
| :--- | :--- |
| **Landing Page** | Diseño responsive, SEO básico, formulario de contacto. |
| **App del Shopper** | Directorio de locales, horarios, mapa estático (imagen), noticias/eventos básicos. |
| **Portal Tenant** | No incluido (el admin del mall sube todo). |
| **Analytics** | Reporte básico mensual de visitas a la web/app (PDF). |
| **Soporte** | Por email, horario de oficina. |
| **Marca** | "Powered by Mall OS" visible en la app. |
| **💵 Fee de Setup** | **$1,500 - $3,000 USD** (pago único; sujeto al alcance) |
| **💵 Mensualidad** | **$499 - $799 USD / mes** |

---

### 🥈 PLAN 2: MALL OS PRO (El "Sweet Spot" / Más Vendido) ⭐
> **Para quién es:** Centros comerciales regionales o de tamaño mediano (30 a 100 locales) que buscan aumentar el tráfico, fidelizar y dar herramientas a sus arrendatarios.
> **Promesa de valor:** "Convierte visitantes en clientes frecuentes y dale a tus locales una herramienta de ventas real".

| Característica | Detalle |
| :--- | :--- |
| **Todo lo del Plan Starter, MÁS:** | |
| **App Avanzada** | Mapa interactivo con geolocalización indoor, Buscador IA básico, Reseñas. |
| **Módulo Rewards** | Programa de puntos, cupones digitales con QR, ruleta de premios básica. |
| **Tenant Portal** | Acceso para que cada local suba sus propias ofertas, fotos y responda reseñas. |
| **Dashboard Admin** | Panel web en tiempo real: métricas de usuarios, cupones canjeados, mapas de calor básicos. |
| **Notificaciones Push** | Segmentadas por categoría o zona del mall. |
| **Soporte** | Prioritario por chat/email + 1 reunión mensual de revisión. |
| **Marca** | White-label total (100% la marca del mall, sin logos de terceros). |
| **💵 Fee de Setup** | **$3,000 - $7,500 USD** (pago único; piloto puede acreditarse) |
| **💵 Mensualidad** | **$1,499 - $2,499 USD / mes** |

---

### 🥇 PLAN 3: MALL OS ENTERPRISE (Premium / Scale)
> **Para quién es:** Cadenas de centros comerciales, mega-malls, destinos turísticos o centros de lujo (+100 locales) que requieren integración profunda, datos avanzados y experiencias de vanguardia.
> **Promesa de valor:** "El Sistema Operativo completo: monetiza tu audiencia, predice el comportamiento y domina la experiencia 'phygital'".

| Característica | Detalle |
| :--- | :--- |
| **Todo lo del Plan Pro, MÁS:** | |
| **Experiencias Avanzadas** | Live Shopping, Búsqueda del Tesoro con AR, Modo Niño completo, Carrito de Experiencias unificado. |
| **Monetización Directa** | Módulo de Publicidad Programática (el mall puede vender banners a sus locales desde el dashboard). |
| **Integraciones API** | Conexión con sistemas de parking (sensores), POS de tiendas, sistemas de cine o CRM existente del mall. |
| **Concierge IA Premium** | Modelo de lenguaje avanzado, itinerarios complejos, handoff a humano, multi-idioma. |
| **Analytics Predictivo** | Cruce de datos avanzado (ej. "Correlación entre clima y ventas de café"), reportes ESG automáticos. |
| **Soporte** | Gerente de cuenta dedicado, soporte 24/7, SLA garantizado, capacitación al personal del mall. |
| **💵 Fee de Setup** | **Desde $10,000 USD** (según integraciones y alcance) |
| **💵 Mensualidad** | **Desde $3,000 USD / mes** |
| **💵 Revenue Share** | **5% - 15%**, negociado sobre ingresos publicitarios efectivamente cobrados. |

---

## 📊 CÓMO JUSTIFICAR EL PRECIO (El Argumento de Venta)

El gerente financiero te va a preguntar: *"¿Por qué debo pagar $1,200 al mes por esto?"*. Aquí tienes el **guion de ROI** para el Plan Pro:

> *"Señor Gerente, el Plan Pro cuesta $1,200/mes. En su centro comercial hay 50 locales. Si usted le ofrece a solo **5 locales** un paquete de 'Publicidad Destacada' en la app por $300/mes, ya recuperó la inversión ($1,500). El resto es ganancia neta para el mall. Además, estamos aumentando la frecuencia de visita de sus clientes a través de la gamificación, lo que se traduce directamente en mayores ventas para sus arrendatarios, asegurando la renovación de sus contratos de arriendo. No es un gasto, es un centro de utilidad."*

---

## 🧩 MENÚ DE SERVICIOS ADICIONALES (Add-ons)

Permite que el cliente personalice su plan pagando por funcionalidades específicas que no están en su paquete base:

| Add-on | Descripción | Precio Sugerido |
| :--- | :--- | :--- |
| **Módulo de Parking Smart** | Integración con sensores o sistema de pago de caseta. | +$300/mes |
| **Módulo de Delivery Interno** | Sistema para que un mensero del mall lleve compras entre tiendas. | +$200/mes |
| **Desarrollo a Medida** | Funcionalidades únicas solicitadas por el mall (ej. integración con su app de banco). | Cotización por hora/proyecto |
| **Campaña de Lanzamiento** | Gestión de la primera campaña de descarga de la app (QRs físicos, activaciones). | Fee único de $1,500 |

---

## 📝 CONDICIONES COMERCIALES CLAVE (Para tu contrato)

1. **Permanencia mínima**: 12 meses (el valor de una app se acumula con el tiempo; no dejes que se vayan al mes 3).
2. **Propiedad de los datos**: El mall es dueño de sus datos de usuarios. Tú eres el procesador. (Crucial para cumplir con leyes de protección de datos como GDPR o leyes locales).
3. **Contenido**: El mall es responsable de que los locales suban información veraz (descarga tu responsabilidad legal sobre ofertas falsas).
4. **Tiempo de implementación**: 4 a 8 semanas desde la firma del contrato y entrega de assets (logos, fotos, directorio).

---


# 📊 MALL OS — PITCH DECK COMPLETO (Guion Diapositiva por Diapositiva)

Aquí tienes el guion completo de tu presentación comercial. Está diseñado para una reunión de **20-30 minutos** con directivos de centros comerciales. Cada diapositiva incluye: qué mostrar, qué decir, y cómo cerrar con impacto.

---

## 🎯 ESTRUCTURA GENERAL DEL PITCH

| # | Diapositiva | Tiempo | Objetivo |
|---|-------------|--------|----------|
| 1 | Portada | 30s | Impacto inicial |
| 2 | El Problema | 2 min | Conectar con el dolor |
| 3 | La Oportunidad | 1 min | Mostrar el mercado |
| 4 | La Solución: Mall OS | 2 min | Presentar el concepto |
| 5 | Demo del Producto | 5 min | Mostrar la magia |
| 6 | Valor para los 3 Actores | 3 min | Explicar el ecosistema |
| 7 | Caso de Uso: Un Sábado | 2 min | Hacerlo tangible |
| 8 | Modelo de Negocio | 2 min | Cómo ganan dinero |
| 9 | ROI y Justificación | 2 min | Vencer objeciones |
| 10 | Planes Comerciales | 2 min | Opciones de compra |
| 11 | Por Qué Nosotros | 1 min | Diferenciadores |
| 12 | Próximos Pasos | 1 min | Cierre con acción |

**Total: ~25 minutos** (dejando 5 min para preguntas)

---

## 📑 DIAPOSITIVA 1: PORTADA

### 🎨 Visual
- Fondo: Imagen hero de alta calidad de un centro comercial moderno con gente disfrutando (no vacío)
- Logo de Mall OS centrado
- Subtítulo: "El Sistema Operativo para Centros Comerciales"
- Nombre del mall al que presentas (personalizado): *"Presentado a [Nombre del Mall]"*
- Fecha y tu nombre

### 🗣️ Guion (30 segundos)
> *"Buenos días. Mi nombre es [Tu Nombre] y vengo a presentarles algo que va a transformar la forma en que [Nombre del Mall] compite en la era digital. No vengo a venderles una página web ni una app. Vengo a presentarles el Sistema Operativo de su centro comercial."*

### 💡 Tip
- Personaliza SIEMPRE la portada con el nombre del mall. Eso demuestra que hiciste tu tarea.
- Llega 10 minutos antes, prueba el proyector, y asegúrate de que la imagen se vea bien.

---

## 📑 DIAPOSITIVA 2: EL PROBLEMA

### 🎨 Visual
- 3 estadísticas grandes y llamativas en rojo/naranja:
  - **"73% de los shoppers investigan online antes de visitar un mall"**
  - **"Solo 12% de los malls tienen data real del comportamiento de sus visitantes"**
  - **"Los malls pierden hasta 30% de ventas potenciales por falta de engagement digital"**
- Imagen de fondo: Persona mirando su celular en un pasillo del mall (desconectada del entorno físico)

### 🗣️ Guion (2 minutos)
> *"Señores, el retail físico enfrenta una crisis silenciosa. Sus clientes llegan al mall, pero vienen con el celular en la mano, buscando en Google qué hay, comparando precios, leyendo reseñas. Y usted, como administrador, no tiene forma de saber qué buscaron, qué les gustó, o por qué se fueron sin comprar.*
>
> *Hoy, los centros comerciales compiten contra Amazon, contra Mercado Libre, contra el delivery de comida. Y la mayoría compite con las armas del siglo pasado: un directorio en PDF, un mapa de papel, y una página web que nadie visita.*
>
> *El problema no es que la gente deje de ir al mall. El problema es que el mall no sabe cómo capturar, retener y monetizar a esa audiencia que YA está ahí. Eso es exactamente lo que vamos a resolver."*

### 💡 Tip
- Haz pausas dramáticas después de cada estadística. Deja que el dolor se asiente.
- Si puedes, menciona un dato específico del mall al que presentas: *"Sé que [Mall] recibe 50,000 visitantes los sábados, pero ¿cuántos de ellos descargaron su app? ¿Cuántos dejaron una reseña? ¿Cuántos volvieron la semana siguiente?"*

---

## 📑 DIAPOSITIVA 3: LA OPORTUNIDAD

### 🎨 Visual
- Gráfico de barras mostrando el crecimiento del mercado de retail físico + digital
- Cifra grande: **"Oportunidad: digitalizar la relación con el visitante y monetizar la audiencia propia"**
- Frase clave: *"Validaremos el tamaño de mercado con fuentes independientes antes de usar cifras en una presentación comercial."*

### 🗣️ Guion (1 minuto)
> *"Pero aquí está la buena noticia: el mercado de soluciones digitales para centros comerciales está creciendo a un 23% anual. Los malls que se digitalicen van a capturar la mayoría del crecimiento del sector. Y los que no, van a perder relevancia.*
>
> *La pregunta no es si su centro comercial necesita digitalizarse. La pregunta es: ¿quiere hacerlo con una solución genérica, o con un sistema diseñado específicamente para malls?"*

---

## 📑 DIAPOSITIVA 4: LA SOLUCIÓN — MALL OS

### 🎨 Visual
- Mockup grande de un celular mostrando la app Mall OS (Home screen)
- Al lado, mockup de laptop mostrando el Dashboard del Mall
- Título grande: **"MALL OS: El Sistema Operativo de su Centro Comercial"**
- 3 pilares visuales debajo:
  - 🛍️ **Shopper** → Experiencia fluida
  - 🏪 **Tenant** → Autogestión
  - 🏢 **Mall** → Data + Monetización

### 🗣️ Guion (2 minutos)
> *"Mall OS no es una app. Es un ecosistema completo que conecta a los tres actores clave de su centro comercial: el shopper, el tenant y usted, la administración.*
>
> *Para el shopper, es una experiencia personalizada que le dice qué hacer, dónde ir, y le da incentivos para volver. Para el tenant, es una herramienta de marketing que ellos mismos gestionan. Y para usted, es una mina de oro de datos y nuevas fuentes de ingreso.*
>
> *Todo integrado en una sola plataforma. Todo medible. Todo monetizable."*

---

## 📑 DIAPOSITIVA 5: DEMO DEL PRODUCTO (LA MÁS IMPORTANTE)

### 🎨 Visual
- 4 mockups de pantallas clave en formato "carousel" o grid:
  1. **Home** con el carrusel "Hoy en el Mall"
  2. **Mapa interactivo** con ruta guiada
  3. **Rewards** con la ruleta de premios
  4. **Concierge IA** generando un itinerario
- Cada mockup con un label corto: *"Dashboard personalizado"*, *"Wayfinding inteligente"*, *"Gamificación"*, *"Asistente IA 24/7"*

### 🗣️ Guion (5 minutos — dedica tiempo aquí)
> *"Permítanme mostrarles cómo se ve esto en acción.*
>
> *[Muestra Home] Esto es lo que ve María cuando abre la app un sábado por la mañana. En 3 segundos sabe qué hay hoy, qué ofertas están activas, y cuánta gente hay en el mall. No es un directorio aburrido. Es un dashboard personalizado.*
>
> *[Muestra Mapa] María quiere ir a Zara. La app no solo le dice dónde está. Le traza la ruta más corta, le dice que está a 2 minutos caminando, y le muestra que hay un 30% de descuento hoy. Eso es wayfinding inteligente.*
>
> *[Muestra Rewards] María activa un cupón, gira la ruleta y gana parking gratis. Eso es gamificación que la hace volver.*
>
> *[Muestra Concierge IA] María le dice al bot: 'Tengo 3 horas con 2 niños'. Y el bot le genera un itinerario completo: almuerzo en un restaurante con menú infantil, cine con película apta para niños, y heladería con 2x1. Eso es un asistente personal 24/7.*
>
> *Y todo esto, señores, es solo la capa visible. Detrás hay un sistema de datos, un portal para sus locales, y un dashboard ejecutivo para usted."*

### 💡 Tip
- Si puedes, lleva un prototipo interactivo en Figma o en un celular real. Que puedan tocarlo. Eso vende más que 100 diapositivas.
- Si no tienes prototipo, usa los mockups en alta resolución y haz "zoom" en cada pantalla mientras hablas.

---

## 📑 DIAPOSITIVA 6: VALOR PARA LOS 3 ACTORES

### 🎨 Visual
- Tabla de 3 columnas con íconos grandes:
  
| 🛍️ **SHOPPER** | 🏪 **TENANT** | 🏢 **MALL** |
|----------------|---------------|-------------|
| Experiencia personalizada | Autogestión de marketing | Data de comportamiento |
| Ofertas geolocalizadas | Publicación de novedades | Monetización de audiencia |
| Gamificación y puntos | Estadísticas de performance | Nuevos ingresos (ads) |
| Wayfinding inteligente | Respuesta a reseñas | Control operativo total |
| Reservas unificadas | Live Shopping | Reportes ESG |

### 🗣️ Guion (3 minutos)
> *"La magia de Mall OS es que crea valor para todos. El shopper tiene una experiencia mejor, el tenant tiene herramientas para vender más, y usted tiene data y control.*
>
> *Pero lo más importante: estos tres actores se retroalimentan. Cuando el shopper tiene una mejor experiencia, vuelve más seguido. Cuando vuelve más seguido, el tenant vende más. Cuando el tenant vende más, está feliz y renueva su contrato. Y cuando todo esto pasa, usted tiene data para tomar mejores decisiones.*
>
> *Es un ecosistema virtuoso. Y Mall OS es el motor que lo hace funcionar."*

---

## 📑 DIAPOSITIVA 7: CASO DE USO — UN SÁBADO CON MARÍA

### 🎨 Visual
- Timeline horizontal con 6-8 puntos (iconos + hora + acción):
  - **10:00 AM** → María abre la app, ve festival de food trucks
  - **10:05 AM** → Activa cupón -30% en Zara
  - **10:10 AM** → Concierge IA le recomienda restaurante con menú infantil
  - **10:15 AM** → Reserva mesa para 1:00 PM
  - **11:00 AM** → Llega al mall, recibe push de oferta cerca
  - **1:00 PM** → Come, escanea QR de mesa, paga desde app
  - **2:00 PM** → Gira ruleta, gana parking gratis
  - **4:30 PM** → Sale, app le dice cuánto ahorró y le da puntos

### 🗣️ Guion (2 minutos)
> *"Déjenme contarles la historia de María, una clienta típica de su mall. Un sábado por la mañana, María abre la app y en 3 segundos sabe qué hay. Activa un cupón, le pregunta al bot dónde puede almorzar con sus hijos, reserva mesa, y cuando llega al mall, la app le muestra ofertas cerca de ella.*
>
> *Come, paga desde la app, gira la ruleta y gana parking gratis. Cuando se va, la app le dice: 'Hoy ahorraste $850 y ganaste 500 puntos. ¡Te vemos pronto!'.*
>
> *¿Saben qué acaba de pasar? María no solo vino al mall. Volvió. Gastó más. Dejó data. Y se fue feliz. Eso es Mall OS en acción."*

---

## 📑 DIAPOSITIVA 8: MODELO DE NEGOCIO

### 🎨 Visual
- Diagrama de flujo simple:
  ```
  Mall paga suscripción mensual → Mall OS provee plataforma
  Locales pagan por publicidad destacada → Mall recibe ingreso extra
  Mall OS recibe % de ingresos publicitarios → Alineación de incentivos
  ```
- 3 cajas con los componentes:
  - **Setup Inicial** → Personalización + lanzamiento
  - **Suscripción Mensual** → Licencia + soporte + actualizaciones
  - **Revenue Share** → % sobre ingresos publicitarios generados

### 🗣️ Guion (2 minutos)
> *"Nuestro modelo es simple y transparente. Usted paga un fee inicial de implementación y una suscripción mensual. Pero aquí está lo interesante: también podemos compartir ingresos. Si usted vende espacios publicitarios a sus locales dentro de la app, nosotros recibimos un pequeño porcentaje. Eso significa que si usted gana más, nosotros también. Nuestros incentivos están alineados."*

---

## 📑 DIAPOSITIVA 9: ROI Y JUSTIFICACIÓN FINANCIERA

### 🎨 Visual
- Cálculo de ROI en números grandes:
  ```
  Costo mensual Plan Pro: $1,200 USD
  
  Ingresos generados:
  - 5 locales compran publicidad destacada @ $300/mes = $1,500
  - Aumento de 15% en frecuencia de visita = +$50,000 en ventas de locales
  - Reducción de churn de tenants = +$100,000 en contratos renovados
  
  ROI: 12x en el primer año
  ```
- Gráfico de barras: "Inversión vs Retorno"

### 🗣️ Guion (2 minutos)
> *"Hablemos de números. El Plan Pro cuesta $1,200 al mes. Si usted le vende a solo 5 de sus 50 locales un paquete de publicidad destacada por $300 al mes, ya recuperó la inversión. El resto es ganancia.*
>
> *Pero el ROI real no es solo la publicidad. Es el aumento en la frecuencia de visita. Si logramos que sus clientes vengan un 15% más seguido, eso se traduce en decenas de miles de dólares en ventas adicionales para sus locales. Y cuando sus locales venden más, renuevan sus contratos. Eso es estabilidad para su negocio.*
>
> *No es un gasto. Es un centro de utilidad."*

### 💡 Tip
- Adapta los números al mall al que presentas. Si sabes cuántos locales tienen, usa ese número. Si sabes cuánto cobran de renta, menciónalo. Personalizar el ROI es clave.

---

## 📑 DIAPOSITIVA 10: PLANES COMERCIALES

### 🎨 Visual
- Tabla comparativa de 3 columnas (Starter / Pro / Enterprise)
- Resalta el Plan Pro como "Más Popular"
- Precios claros, features clave, y un CTA al final

### 🗣️ Guion (2 minutos)
> *"Tenemos tres planes diseñados para diferentes tamaños de centros comerciales. El Plan Starter es perfecto para plazas pequeñas que quieren digitalizarse. El Plan Pro es nuestro más vendido, ideal para malls medianos que buscan engagement y monetización. Y el Plan Enterprise es para cadenas y mega-malls que requieren integración profunda y experiencias de vanguardia.*
>
> *Todos incluyen implementación, soporte, y actualizaciones continuas. Y podemos personalizar según sus necesidades."*

---

## 📑 DIAPOSITIVA 11: POR QUÉ NOSOTROS

### 🎨 Visual
- 4 diferenciadores con íconos:
  - 🎯 **Especializados en malls** → No somos una agencia genérica
  - 🚀 **Implementación rápida** → 4 a 8 semanas, no 6 meses
  - 📊 **Data-driven** → Cada decisión basada en métricas
  - 🤝 **Partners, no proveedores** → Crecemos cuando usted crece

### 🗣️ Guion (1 minuto)
> *"¿Por qué Mall OS? Porque no somos una agencia que hace apps para todos. Somos especialistas en centros comerciales. Entendemos sus dolores, sus KPIs, y su negocio. Implementamos rápido, medimos todo, y crecemos con usted. No somos un proveedor. Somos un partner."*

---

## 📑 DIAPOSITIVA 12: PRÓXIMOS PASOS

### 🎨 Visual
- Timeline simple de 3 pasos:
  1. **Semana 1-2** → Demo personalizada con datos reales del mall
  2. **Semana 3-4** → Propuesta formal y negociación
  3. **Semana 5-8** → Implementación y lanzamiento
- CTA grande: *"¿Agendamos una demo personalizada para la próxima semana?"*
- Tu contacto: email, teléfono, LinkedIn, QR a tu calendario

### 🗣️ Guion (1 minuto)
> *"Estos son los próximos pasos. Primero, agendamos una demo personalizada donde les mostramos cómo se vería Mall OS con los datos reales de su centro comercial. Luego, les enviamos una propuesta formal. Y si decidimos avanzar, en 4 a 8 semanas estamos lanzando.*
>
> *¿Les parece si agendamos esa demo para la próxima semana?"*

### 💡 Tip
- NUNCA termines la presentación sin un CTA claro. Siempre pide el siguiente paso: una demo, una reunión de seguimiento, o una firma.
- Ten tu calendario abierto en el celular o laptop para agendar en ese momento.

---

## 🎯 ADAPTACIONES SEGÚN LA AUDIENCIA

### Si presentas al **Director Financiero (CFO)**
- Enfatiza: ROI, Revenue Share, reducción de costos operativos, nuevos ingresos
- Menos tiempo en demo, más tiempo en diapositivas 8 y 9
- Lleva un Excel con proyecciones financieras

### Si presentas al **Director de Marketing (CMO)**
- Enfatiza: Engagement, gamificación, contenido generado por usuarios, redes sociales
- Más tiempo en diapositivas 5, 6 y 7 (demo y caso de uso)
- Lleva ejemplos de campañas exitosas

### Si presentas al **Gerente de Leasing**
- Enfatiza: Tenant Portal, herramientas para locales, estadísticas, reducción de churn
- Muestra cómo los locales van a estar más felices y renovar contratos

### Si presentas al **CEO / Director General**
- Enfatiza: Visión estratégica, diferenciación competitiva, innovación, ESG
- Mantén el pitch alto nivel, enfócate en el "por qué" más que en el "cómo"

---

## 📋 CHECKLIST ANTES DE LA PRESENTACIÓN

- [ ] Portada personalizada con el nombre del mall
- [ ] Datos específicos del mall investigados (número de locales, visitantes, etc.)
- [ ] Prototipo interactivo o mockups en alta resolución listos
- [ ] Calculadora de ROI con números reales del mall
- [ ] Calendario abierto para agendar siguiente paso
- [ ] Tarjetas de presentación o QR de contacto
- [ ] Proyector probado 10 minutos antes
- [ ] Backup de la presentación en USB y en la nube
- [ ] Celular cargado (por si haces demo en vivo)
- [ ] Agua para ti (vas a hablar 25 minutos)

---


# ⚙️ MALL OS — STACK TECNOLÓGICO COMPLETO

## 🎯 OBJETIVO
Construir primero la plataforma que valida el negocio, no la infraestructura de una empresa que todavía no tiene clientes.

## 🏗️ ARQUITECTURA RECOMENDADA

```text
Shopper PWA ───────┐
Tenant Portal ─────┼──> Next.js App Router / Route Handlers
Admin Dashboard ───┘                 │
                                     ▼
                              Supabase PostgreSQL
                              + Auth + Storage
                                     │
                         ┌───────────┴───────────┐
                         ▼                       ▼
                    OpenAI API              Analytics
                  Concierge IA              product events
                         │
                         ▼
                 Mapbox / SVG map
```

### Decisiones de arquitectura

| Capa | MVP | Evolución |
|---|---|---|
| Shopper | **PWA Next.js** | App nativa solo si el uso lo justifica |
| Web | Next.js + React + Tailwind | Igual |
| Backend | Next.js Route Handlers | NestJS/servicios separados si escala |
| DB | PostgreSQL vía Supabase | PostgreSQL gestionado / AWS según necesidad |
| Auth | Supabase Auth | SSO/enterprise si se requiere |
| Storage | Supabase Storage | S3/R2 a escala |
| IA | OpenAI API, modelo económico | Agente con tools/RAG cuando haya suficiente contenido |
| Mapas | SVG o Mapbox | Indoor positioning / beacons |
| Analytics | Eventos propios + herramienta de product analytics | Data warehouse/BI |
| Push | Web Push/FCM cuando aplique | Segmentación avanzada |
| Pagos | No requeridos para MVP | Stripe/Mercado Pago según país |
| Cache | No requerido inicialmente | Redis cuando exista evidencia de necesidad |
| Hosting | Vercel + Supabase | AWS u otra arquitectura dedicada cuando el volumen/cliente lo exija |

## 📱 POR QUÉ PWA PRIMERO

- Reduce tiempo de lanzamiento.
- Evita dependencia inicial de App Store / Google Play.
- Permite compartir el producto por QR.
- Facilita el piloto con un mall.
- Permite validar activación, cupones y uso antes de invertir en apps nativas.

**Criterio para crear app nativa:** demostrar que la PWA tiene adopción suficiente y que una app nativa resuelve una limitación real —por ejemplo, notificaciones, integración de hardware o experiencia indoor.

## 🤖 IA — CONCIERGE

### MVP
- API directa.
- Contexto estructurado y limitado al mall.
- Respuestas basadas en datos actuales.
- Rate limiting y validación de entrada.
- No afirmar disponibilidad, precios o reservas que no estén en datos confiables.

### V1/V2
Evolucionar de chatbot a agente con herramientas:

```text
searchStores()
searchOffers()
getDirections()
getEvents()
getStoreHours()
createReservation()
activateCoupon()
buildItinerary()
```

RAG/vector DB solo cuando el volumen y la naturaleza de la información lo justifiquen.

## 🗺️ GEOLOCALIZACIÓN

### MVP
- SVG/Mapbox.
- Selección manual de piso.
- Ubicación general cuando el navegador la permita.
- Sin prometer precisión indoor.

### V1/V2
- Beacons, Wi-Fi o infraestructura del mall.
- Medición de precisión y ROI antes de desplegar hardware.

## 🔒 SEGURIDAD

- RLS obligatorio.
- Identidad del usuario derivada de la sesión; **nunca confiar en `usuarioId` enviado por el cliente**.
- Service role solo en servidor y nunca expuesto al navegador.
- Validación de inputs con Zod.
- Rate limiting en endpoints sensibles.
- Logs sin PII innecesaria.
- Backups y recuperación probados.
- Política de retención y eliminación de datos.
- Revisión legal de privacidad según el país del mall.

## 💰 COSTO DE INFRAESTRUCTURA

Los costos son hipótesis y dependen del tráfico, proveedores y plan contratado. Para el piloto, mantener una arquitectura pequeña y medible. No asumir un costo fijo universal por mall.

### Regla
**No migrar a AWS, Redis, Pinecone ni microservicios por anticipación.** Migrar cuando un requisito comercial o técnico lo justifique.

## 📋 RESUMEN

1. PWA + Next.js
2. Supabase/PostgreSQL
3. OpenAI API
4. SVG/Mapbox
5. Analytics por eventos
6. Vercel/Supabase para piloto
7. Arquitectura multi-tenant desde el inicio
8. Integraciones profundas solo después de validar el producto

---

# 🗓️ ROADMAP DE PRODUCTO Y DESARROLLO — MALL OS

## 🎯 OBJETIVO
Llegar al primer piloto pagado con el menor producto capaz de demostrar valor económico, y después expandirlo con evidencia.

## FASE 0 — VALIDACIÓN COMERCIAL (2 semanas)

### Objetivo
Responder: **¿un mall pagará por esto?**

### Entregables
- Landing / one-pager comercial.
- Demo navegable con un mall ficticio o datos autorizados.
- Home, directorio, oferta, cupón y Concierge.
- Tenant Portal mínimo.
- Dashboard con 5–8 KPIs.
- Lista de 10–20 prospectos.
- 5–10 entrevistas con decisores.

### Gate
No ampliar el producto si no existe interés comercial real.

## FASE 1 — PILOTO MVP (4–6 semanas)

### Shopper
1. Home.
2. Directorio.
3. Perfil de local.
4. Mapa SVG/Mapbox.
5. Ofertas.
6. Activación y validación de cupones.
7. Concierge IA.

### Tenant
1. Login.
2. Perfil.
3. Crear/editar oferta.
4. Ver activaciones y canjes.
5. Validar cupón.

### Mall
1. Dashboard.
2. Gestión de locales.
3. Gestión de ofertas.
4. KPIs.
5. Exportación básica.

### Calidad
- RLS.
- TypeScript strict.
- Validación de inputs.
- Tests de flujos críticos.
- Logs.
- Analytics de eventos.

## FASE 2 — MONETIZACIÓN (2–3 meses)

- Rewards / points ledger.
- Notificaciones segmentadas.
- Campañas.
- Retail Media.
- Analítica de conversión.
- Cohortes.
- Mejoras del Tenant Portal.
- Medición de ROI por campaña.

## FASE 3 — INTELIGENCIA

- Personalización.
- Recomendaciones.
- Concierge con tools.
- Itinerarios.
- Predicción.
- Experimentación A/B.

## FASE 4 — CAPA FÍSICA

Solo con demanda comercial:
- Beacons.
- Indoor positioning.
- Parking.
- POS.
- Wi-Fi.
- EV.
- CRM.

## FASE 5 — ECOSISTEMA

- Live Shopping.
- Comunidad.
- AR.
- Reservas.
- Checkout.
- Delivery interno.
- Experiencias avanzadas.

## 📊 GATES DE DECISIÓN

| Gate | Pregunta |
|---|---|
| Comercial | ¿El mall paga? |
| Adopción | ¿Los visitantes usan la PWA? |
| Conversión | ¿Los cupones generan acciones medibles? |
| Tenant | ¿Los locales publican y vuelven a usar el portal? |
| Retención | ¿Usuarios y tenants regresan? |
| Monetización | ¿El retail media genera ingresos? |
| Escala | ¿La arquitectura necesita evolucionar? |

## 🚀 PRÓXIMOS 3 PASOS

1. Construir demo comercial.
2. Conseguir un piloto con alcance cerrado.
3. Medir resultados antes de construir funciones adicionales.

---

# 📄 DOCUMENTO DE ESPECIFICACIONES TÉCNICAS (TSD) — MALL OS MVP

**Versión:** 2.0.0  
**Fecha:** 12 de septiembre de 2026  
**Stack:** Next.js App Router + TypeScript + Supabase/PostgreSQL + OpenAI API + Tailwind CSS

## 1. ARQUITECTURA Y ESTÁNDARES

- Next.js App Router.
- TypeScript estricto.
- Tailwind CSS.
- Route Handlers para APIs del MVP.
- PostgreSQL vía Supabase.
- RLS obligatorio.
- Migraciones versionadas en `supabase/migrations/`.
- Validación de inputs con Zod.
- JSDoc para funciones complejas y tipos públicos.
- Secretos solo mediante variables de entorno.
- Service role exclusivamente en servidor.
- Arquitectura **multi-tenant desde el día 1**.

## 2. MODELO MULTI-TENANT

Toda entidad operativa debe pertenecer a un `mall_id`.

### Entidades principales

```text
malls
 ├── memberships
 ├── stores
 │    ├── store_users
 │    └── offers
 ├── events
 ├── coupons
 ├── coupon_redemptions
 ├── reviews
 ├── notifications
 └── analytics_events

users
 └── points_ledger
```

## 3. ESQUEMA DE DATOS RECOMENDADO

### 3.1 `malls`
```sql
CREATE TABLE public.malls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'UTC',
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active','inactive','trial')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 3.2 `users`
```sql
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 3.3 `memberships`
Relaciona usuarios con malls y define permisos.

```sql
CREATE TABLE public.memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  mall_id UUID NOT NULL REFERENCES public.malls(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('shopper','tenant','mall_admin','platform_admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, mall_id)
);
```

### 3.4 `stores`
```sql
CREATE TABLE public.stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mall_id UUID NOT NULL REFERENCES public.malls(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  unit_code TEXT,
  floor INTEGER NOT NULL,
  description TEXT,
  logo_url TEXT,
  map_coordinates JSONB,
  opening_time TIME,
  closing_time TIME,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active','inactive','temporary')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_stores_mall ON public.stores(mall_id);
CREATE INDEX idx_stores_category ON public.stores(mall_id, category);
```

### 3.5 `store_users`
```sql
CREATE TABLE public.store_users (
  user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 3.6 `offers`
```sql
CREATE TABLE public.offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mall_id UUID NOT NULL REFERENCES public.malls(id) ON DELETE CASCADE,
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  discount_label TEXT NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  total_coupons INTEGER,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft','pending','active','paused','expired')),
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (ends_at > starts_at)
);

CREATE INDEX idx_offers_mall_dates
  ON public.offers(mall_id, starts_at, ends_at);
```

### 3.7 `coupons`
Un cupón activado por un shopper. No usar `cupones_canjeados` como única fuente de verdad.

```sql
CREATE TABLE public.coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  offer_id UUID NOT NULL REFERENCES public.offers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  code_hash TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active','redeemed','expired','cancelled')),
  activated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL
);
```

### 3.8 `coupon_redemptions`
```sql
CREATE TABLE public.coupon_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id UUID UNIQUE NOT NULL REFERENCES public.coupons(id) ON DELETE CASCADE,
  store_id UUID NOT NULL REFERENCES public.stores(id),
  redeemed_by UUID REFERENCES public.users(id),
  redeemed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 3.9 `points_ledger`
Los puntos deben ser auditables.

```sql
CREATE TABLE public.points_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mall_id UUID NOT NULL REFERENCES public.malls(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  points_delta INTEGER NOT NULL,
  reason TEXT NOT NULL,
  reference_type TEXT,
  reference_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

El saldo puede calcularse desde el ledger o materializarse de forma controlada; no depender únicamente de un contador mutable sin historial.

### 3.10 `analytics_events`
```sql
CREATE TABLE public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mall_id UUID NOT NULL REFERENCES public.malls(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id),
  event_name TEXT NOT NULL,
  properties JSONB,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## 4. RLS Y AUTORIZACIÓN

Reglas mínimas:

- Shopper: solo sus datos privados.
- Tenant: solo su/s `store_id` autorizados.
- Mall admin: solo datos de su `mall_id`.
- Platform admin: acceso global controlado.
- Datos públicos: únicamente información explícitamente publicada.
- Todas las tablas sensibles deben tener RLS activado.

**Regla crítica:** el backend obtiene `user_id` y permisos desde la sesión autenticada. Nunca acepta `usuarioId` como autoridad enviada por el cliente.

## 5. API

### `POST /api/concierge`
Entrada:
```json
{
  "message": "¿Dónde puedo comer rápido?",
  "mallId": "uuid"
}
```

El servidor:
1. valida sesión cuando corresponda;
2. valida `mallId`;
3. consulta datos permitidos del mall;
4. genera contexto mínimo;
5. llama al proveedor de IA;
6. registra métricas sin almacenar PII innecesaria;
7. devuelve respuesta estructurada.

### `POST /api/coupons/activate`
Entrada:
```json
{
  "offerId": "uuid"
}
```

El servidor:
1. obtiene el usuario de la sesión;
2. verifica que la oferta pertenece al mall correcto;
3. verifica vigencia y límites;
4. ejecuta una operación atómica/RPC;
5. genera un código seguro;
6. crea el cupón;
7. devuelve el cupón.

### `POST /api/coupons/redeem`
Entrada:
```json
{
  "code": "..."
}
```

El servidor:
1. autentica al empleado;
2. verifica que el empleado pertenece al `store_id`;
3. verifica vigencia y estado;
4. registra el canje de forma atómica;
5. marca el cupón como `redeemed`.

## 6. CONCURRENCY Y ANTI-FRAUDE

No implementar:

```text
SELECT contador → INSERT → UPDATE contador
```

como tres operaciones independientes.

Usar una transacción o función RPC atómica para evitar que dos usuarios consuman el mismo cupón disponible.

Controles posteriores:
- un cupón por usuario/oferta según reglas;
- expiración;
- detección de duplicados;
- límites por día;
- auditoría de canjes;
- hash de códigos;
- registro de empleado/local que realizó el canje.

## 7. VARIABLES DE ENTORNO

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
NEXT_PUBLIC_APP_URL=
```

Nunca hacer commit de secretos. `SUPABASE_SERVICE_ROLE_KEY` y `OPENAI_API_KEY` son variables **server-only**.

## 8. CALIDAD

Antes de merge/deploy:

- [ ] typecheck
- [ ] lint
- [ ] tests unitarios
- [ ] tests de API
- [ ] pruebas de RLS
- [ ] pruebas de autorización tenant/admin
- [ ] pruebas de race conditions en cupones
- [ ] migraciones reproducibles
- [ ] `.env` fuera de Git
- [ ] logs sin secretos/PII innecesaria
- [ ] staging validado
- [ ] smoke test en móvil

## 9. ANALYTICS DEL MVP

Eventos mínimos:

```text
page_view
search
store_view
offer_view
coupon_activate
coupon_redeem
concierge_message
map_open
directions_click
tenant_offer_create
tenant_offer_edit
admin_login
```

KPIs:

```text
Activation Rate
Weekly Active Shoppers
Offer Activation Rate
Coupon Redemption Rate
Tenant Adoption
Repeat Usage
Revenue per Mall
Retail Media Revenue
```

## 10. DEFINITION OF DONE DEL MVP

El MVP se considera listo cuando:

1. un shopper puede entrar sin instalar una app;
2. puede descubrir un local;
3. puede ver una oferta;
4. puede activar un cupón;
5. un empleado autorizado puede validarlo;
6. el mall puede ver el resultado;
7. el tenant puede publicar una oferta;
8. Concierge responde usando datos reales;
9. RLS impide acceso cruzado entre malls;
10. todos los flujos críticos tienen analytics.

---

# 💼 PLAN 7: ESTRATEGIA DE VENTAS Y GO-TO-MARKET (MALL OS)

## 🎯 FASE 1: ICP

Prioridad inicial:

- 30–80 locales.
- Marketing activo pero tecnología fragmentada.
- Necesidad visible de aumentar engagement o tráfico.
- Capacidad de decidir un piloto sin comité corporativo excesivamente largo.
- Un responsable de negocio dispuesto a participar durante 90 días.

### Decisor y usuarios internos

1. Gerente de Marketing — champion principal.
2. Gerente General — sponsor económico.
3. Leasing — beneficiario del desempeño de tenants.
4. TI / Seguridad — validador técnico, incorporarlo temprano después de interés comercial.

**Corrección importante:** TI no debe tratarse como un obstáculo que haya que evitar. En una venta B2B seria debe incorporarse una vez existe interés, con seguridad y privacidad documentadas.

## 🎁 FASE 2: OFERTA DE PILOTO

### Piloto comercial de 90 días

Alcance recomendado:

- PWA branded.
- Directorio de 10–30 locales.
- Mapa básico.
- 5–15 ofertas.
- Cupones QR.
- Concierge IA.
- Tenant Portal básico.
- Dashboard de KPIs.
- Onboarding y soporte.

### Precio orientativo

**$2,500–$7,500 USD** según personalización y alcance.

Puede existir un crédito parcial del piloto contra el contrato anual si el cliente continúa.

### No prometer

- aumento garantizado de ventas;
- ROI fijo;
- número de usuarios;
- incremento de tráfico sin medición;
- precisión indoor que no exista.

## 📊 MÉTRICAS DEL PILOTO

Elegir 4–6 métricas antes de iniciar:

| Métrica | Qué demuestra |
|---|---|
| Usuarios activados | Adopción |
| Usuarios activos semanales | Uso recurrente |
| Ofertas activadas | Engagement comercial |
| Cupones canjeados | Conversión |
| Tenants activos | Adopción B2B |
| Ingresos de retail media | Monetización |

Definir baseline antes del lanzamiento cuando sea posible.

## 📩 FASE 3: PROSPECCIÓN

Objetivo del primer mensaje: conseguir una reunión, no cerrar.

### LinkedIn

> Hola [Nombre], vi que [Mall] está impulsando [dato real]. Estoy desarrollando Mall OS, una plataforma que conecta la experiencia digital del visitante con las promociones y resultados de los locales.  
>
> Estamos preparando pilotos de 90 días con un alcance muy concreto: directorio, ofertas/cupones, mapa básico, Concierge IA y un dashboard para medir resultados.  
>
> Me gustaría mostrarte una demo de 15–20 minutos y entender si alguno de estos problemas existe hoy en [Mall]. ¿Te funciona [día/hora]?

### Email

**Asunto:** Piloto digital de 90 días para [Mall]

> Hola [Nombre],
>
> He estado revisando la experiencia digital de [Mall] y veo una oportunidad para conectar mejor visitantes, locales y campañas.
>
> Mall OS permite que el visitante descubra locales y ofertas desde su celular, mientras la administración obtiene datos sobre interacción y conversión.
>
> Propongo un piloto de 90 días con alcance cerrado y métricas definidas antes de comenzar.
>
> ¿Tienes 20 minutos esta semana para enseñarte el prototipo y escuchar cómo gestionan hoy estas necesidades?
>
> Saludos,  
> Oscar M.

## 🤝 FASE 4: REUNIÓN

### Minutos 0–5 — Descubrimiento
Preguntas:

1. ¿Cómo descubren hoy los visitantes las promociones?
2. ¿Qué datos pueden ver sobre interacción digital?
3. ¿Cómo miden el resultado de las campañas de tenants?
4. ¿Qué parte de la experiencia actual genera más fricción?
5. ¿Qué KPI justificaría un piloto?

### Minutos 5–15 — Demo

Mostrar únicamente:

1. Home.
2. Directorio.
3. Oferta.
4. Cupón.
5. Concierge.
6. Tenant Portal.
7. Dashboard.

### Minutos 15–20 — Piloto

Definir:
- alcance;
- duración;
- responsables;
- métricas;
- datos necesarios;
- seguridad;
- precio.

### Minutos 20–30 — Cierre

> “Si estos objetivos son razonables, preparo una propuesta de piloto de una página con alcance, métricas y calendario. Así podemos evaluar el proyecto con datos, no con promesas.”

## 📝 FASE 5: ACUERDO DE PILOTO

Debe incluir:

1. Partes.
2. Alcance.
3. Duración de 90 días.
4. Precio y forma de pago.
5. Responsabilidades.
6. Datos y privacidad.
7. Propiedad intelectual.
8. Métricas de éxito.
9. Soporte.
10. Condiciones de salida.
11. Condiciones de conversión a contrato anual, **sin renovación automática**.

## 🚀 PLAN DE 30 DÍAS

### Semana 1
- Demo.
- Landing.
- One-pager.
- Lista de 20 prospectos.

### Semana 2
- 10 contactos personalizados.
- 5 reuniones objetivo.
- Ajustar pitch según objeciones.

### Semana 3
- 2–3 demos.
- 1 propuesta de piloto.
- Validación técnica con TI.

### Semana 4
- Negociación.
- Firma.
- Carga de datos.
- Kickoff.

## 🎯 OBJETIVO DEL PRIMER CLIENTE

No es maximizar ingresos.

Es conseguir:
- un caso de éxito;
- datos reales;
- testimonios;
- métricas;
- referencias;
- aprendizaje sobre implementación.

Ese primer piloto debe convertirse en el activo comercial que permita vender los siguientes cinco malls.

