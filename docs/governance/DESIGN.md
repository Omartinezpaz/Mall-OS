# Mall OS — DESIGN.md

> Documento maestro de diseño visual y experiencia de usuario de Mall OS.

## 1. Propósito

Mall OS debe sentirse como la **capa digital oficial del centro comercial**: moderna, premium, útil, clara y confiable.

El diseño debe:

- Facilitar que el visitante encuentre lo que busca.
- Convertir descubrimiento en visitas, compras y experiencias.
- Dar visibilidad a tiendas, restaurantes, servicios y promociones.
- Transmitir confianza.
- Permitir personalización por centro comercial.
- Mantener una base visual reutilizable.
- Separar claramente Shopper, Tenant y Mall Administration.

### Posicionamiento visual

> **Premium, no ostentoso.**  
> **Simple, no vacío.**  
> **Retail, no cuponera.**  
> **Tecnológico, pero humano.**

---

## 2. Principios de diseño

### 2.1 Premium, no ostentoso

Usar espacios amplios, tipografía limpia, fotografías de calidad, tarjetas estructuradas y microinteracciones discretas.

Evitar gradientes excesivos, sombras pesadas, animaciones constantes y decoración sin función.

### 2.2 Simple, no vacío

Cada pantalla debe responder rápidamente:

1. ¿Dónde estoy?
2. ¿Qué puedo hacer?
3. ¿Cuál es la acción principal?
4. ¿Qué información necesito?

### 2.3 Retail, no cuponera

La experiencia debe combinar tiendas, restaurantes, servicios, eventos, experiencias, mapas, promociones y navegación. Mall OS debe ayudar a **descubrir el mall**, no solamente buscar descuentos.

### 2.4 Mobile First

Prioridad:

1. Mobile
2. Tablet
3. Desktop

### 2.5 Marca adaptable

Cada mall puede personalizar logo, nombre, fotografías, colores y campañas sin romper legibilidad, contraste, accesibilidad ni jerarquía.

### 2.6 Confianza

La interfaz debe comunicar que la información procede de una plataforma oficial. Esto es especialmente importante para promociones, horarios, eventos, ubicación, navegación y AI Concierge.

### 2.7 Conversión medible

Las experiencias importantes deben tener una acción clara:

- Cómo llegar
- Ver oferta
- Guardar
- Activar cupón
- Reservar
- Visitar tienda
- Ver evento

### 2.8 Microinteracciones

Usar press states, hover, transiciones suaves, skeleton loading y feedback de éxito/error. Las animaciones nunca deben retrasar la tarea.

---

## 3. Identidad visual

### Dirección estética

Mall OS combina:

- SaaS premium
- Retail moderno
- Hospitality
- Tecnología
- Editorial digital

Debe sentirse sofisticado para la administración y sencillo para un visitante casual.

### 3.3 Regla Anti-Estética IA y Prohibición de Emojis (`ui-ux-pro-max`)

> Basado en `ui-ux-pro-max` (Pro-Rules § Icons & Visual Elements) y en la identidad Light Luxury de Mall OS.

1. **Prohibición Total de Emojis**:
   Queda estrictamente prohibido usar emojis en:
   - Navegación (tabs, headers, breadcrumbs)
   - Categorías y subcategorías
   - Nombres de productos o servicios
   - Botones, badges, chips
   - Mensajes del sistema y del Concierge
   **Todos los elementos gráficos deben usar `MallOsSpriteIcon` (SVG) o `AppIcon` (vectorial).**

2. **Unificación Light Luxury en Concierge**:
   El Concierge NO es un chatbot genérico ni una ventana oscura de soporte. Es el **servicio de hospitalidad digital del mall**.
   Comparte el 100% de la paleta oficial:
   - Fondo: `#F8FAFC`
   - Superficies: `#FFFFFF`
   - Bordes: `#E2E8F0`
   - Texto principal: `#0F172A`
   - Texto secundario: `#64748B`
   - Acentos: `#4F46E5` (índigo) / `#0EA5E9` (sky)

3. **Cards de Catálogo Retail**:
   Las tarjetas de productos y locales deben respetar proporciones de e-commerce de moda/retail premium:
   - Relación de aspecto limpia y jerarquía tipográfica estricta.
   - Insignias de marca oficiales o monogramas tipográficos refinados (evitar placeholders genéricos).
   - Espaciado generoso (padding mínimo 14–16px, radios redondeados 12–16px).

4. **Identidad Visual del Concierge**:
   - Isotipo: componente vectorial `MallOsLogo` / monograma editorial "Mall OS Concierge".
   - Cero avatares con emojis (`🤖`).
   - Tono: editorial, hospitalario, retail de alta gama.

### 3.4 Estándar de Burbujas de Chat y Vitrina Glassmorphic en Concierge
1. **Burbujas Asimétricas Direccionales**:
   - **Burbuja de Usuario**: Esquina superior derecha recta (`borderTopRightRadius: 4`), radio general `16px`, fondo azul cobalto/índigo (`#2563EB` / `#4F46E5`), pie con hora y doble check vectorial blanco (`checkmark-done` ✓✓).
   - **Burbuja de Asistente**: Esquina superior izquierda recta (`borderTopLeftRadius: 4`), radio general `16px`, fondo blanco puro (`#FFFFFF`), borde sutil (`#E2E8F0`) y tipografía oscura (`#0F172A`).
2. **Vitrina de Productos con Acabado Glassmorphic**:
   - Fondo translúcido con gradiente radial y lineal multinivel.
   - Reflejo especular diagonal translúcido (`glassShineDiagonal` blanco al 15% opacidad).
   - Línea de bisel superior brillante (`glassTopShineLine`).
   - Contenedor de imagen frosted-glass con bordes biselados y sombra flotante suave.
3. **Scroll Anclado Inteligente**:
   - Al seleccionar una categoría o sugerencia rápida, el viewport se ancla suavemente en la cabecera de la opción elegida, evitando saltos bruscos al final del chat.

### 3.5 Regla de Oro de Conversión Visual (>75%): Galería por Variante de Color
Todo producto en el ecosistema Mall OS (tanto en el portal web Store OS como en la App Móvil del visitante) debe poseer una o varias imágenes fotográficas reales asociadas a cada variante de color disponible (`ProductColorVariant.images: string[]`).
- **Conmutación Instantánea**: Al pulsar o hacer click sobre un chip de color (ej. Beige vs. Negro), la fotografía principal conmuta inmediatamente a la imagen de dicho color.
- **Galería Multi-Foto**: Si un color dispone de múltiples tomas (frente, dorso, detalle del textil), se exhibe un selector de miniaturas subordinado a esa variante.
- **Cero Ambigüedad**: El usuario no debe imaginar cómo luce la prenda en su color preferido; la visualización fidedigna pre-visita es la clave que eleva la intención de compra por encima del 75% antes de llegar al local.

---

## 4. Design Tokens

### Colores

| Token | Valor | Uso |
| --- | --- | --- |
| `--color-primary` | `#4F46E5` | Acción principal |
| `--color-secondary` | `#7C3AED` | Acentos |
| `--color-navy` | `#0F172A` | Texto / superficies oscuras |
| `--color-background` | `#F8FAFC` | Fondo |
| `--color-slate` | `#64748B` | Texto secundario |
| `--color-border` | `#E2E8F0` | Bordes |
| `--color-white` | `#FFFFFF` | Superficies |
| `--color-success` | `#16A34A` | Éxito |
| `--color-warning` | `#D97706` | Advertencias |
| `--color-danger` | `#DC2626` | Errores |

Los colores específicos de cada mall deben implementarse como tokens derivados.

### Tipografía

| Token | Tamaño | Uso |
| --- | ---: | --- |
| `display` | 40–48 px | Hero |
| `h1` | 32–36 px | Título principal |
| `h2` | 24–28 px | Secciones |
| `h3` | 20–22 px | Tarjetas |
| `body-lg` | 18 px | Destacados |
| `body` | 16 px | Texto |
| `body-sm` | 14 px | Información secundaria |
| `caption` | 12 px | Metadatos |

### Espaciado

Usar múltiplos de 4:

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96`

### Radios

```text
sm   = 8px
md   = 12px
lg   = 16px
xl   = 24px
pill = 999px
```

### Sombras

```text
shadow-sm → controles pequeños
shadow-md → cards elevadas
shadow-lg → modales / overlays
```

Evitar sombras negras intensas.

---

## 5. Layout

### Mobile

- Padding lateral: 16–20 px.
- Una columna principal.
- Cards horizontales cuando faciliten exploración.

### Tablet

- 2–4 columnas según contenido.

### Desktop

- Contenedor máximo recomendado: 1200–1440 px.
- Grid de 12 columnas para experiencias complejas.

---

## 6. Componentes principales

### Top Bar

Debe contener identidad del mall, contexto cuando sea necesario, búsqueda y perfil.

### Bottom Navigation

Base móvil recomendada:

1. Home
2. Explore
3. Map
4. Offers
5. Profile

### Search

Debe encontrar tiendas, restaurantes, servicios, ofertas, eventos y categorías.

### Cards

Tipos principales:

- `StoreCard`
- `OfferCard`
- `EventCard`
- `ExperienceCard`

### Buttons

Jerarquía:

- Primary
- Secondary
- Ghost
- Destructive

Los textos deben describir la acción.

### Chips

Para categorías, filtros, estados y etiquetas. No utilizarlos como CTA principal.

### Modal / Bottom Sheet

En móvil, preferir bottom sheets para filtros, detalles rápidos, acciones contextuales y confirmaciones.

---

## 7. Arquitectura de información

```text
Home
 ├── Recomendaciones
 ├── Ofertas
 ├── Eventos
 ├── Categorías
 └── Accesos rápidos

Explore
 ├── Stores
 ├── Dining
 ├── Services
 ├── Entertainment
 └── Events

Map
 ├── Directory
 ├── Store location
 ├── Navigation
 └── Parking

Offers
 ├── Available
 ├── Saved
 └── Redeemed

Profile
 ├── Saved
 ├── Rewards
 ├── Preferences
 └── Account
```

---

## 8. Pantallas principales

### 8.1 Splash

**Objetivo:** entrada rápida y memorable.

Elementos:

- Logo.
- Animación corta.
- Identidad visual.
- Carga de contexto.

CTA: `Comenzar`

La Splash no debe retrasar innecesariamente al usuario.

### 8.2 Home

**Objetivo:** convertirse en el punto de partida de la visita.

Contenido:

- Saludo/contexto.
- Search.
- Hero.
- Categorías.
- Ofertas.
- Eventos.
- Recomendaciones.
- Acceso al mapa.

Pregunta central:

> **¿Qué puedo hacer hoy en este mall?**

### 8.3 Explore

**Objetivo:** permitir descubrir el mall.

Contenido:

- Search.
- Categorías.
- Tiendas.
- Restaurantes.
- Servicios.
- Entretenimiento.
- Ofertas.
- Eventos.
- Mapa.

### 8.4 Store Detail

**Objetivo:** convertir interés en visita o acción.

Contenido:

- Imagen.
- Logo/nombre.
- Categoría.
- Ubicación.
- Horarios.
- Oferta.
- Descripción.
- Acciones.

CTA principal: `Cómo llegar`

Secundarios:

- Ver oferta
- Guardar
- Compartir
- Contactar

---

### 9.1 Formato Oficial Map__mobile (Brand Colors, Layout & Viewport Safe)
El mapa móvil consolida el formato visual interactivo de alta fidelidad:
1. **Fondo con Mesh Gradient Dinámico**: Difuminado suave en Skia con las 4 auras de marca:
   - Esquina superior izquierda: Carmesí / Rojo Vivo (`#E11D48` / Moda)
   - Esquina superior derecha: Verde Yummy / Esmeralda (`#10B981` / Comida & Salud)
   - Esquina inferior derecha: Oro / Ámbar Cálido (`#D97706` / Deporte & Calzado)
   - Centro / lateral: Azul Cobalto (`#2563EB` / Tecnología & Primario)
2. **Sustrato Arquitectónico**: Base de plano nítida con esquinas redondeadas (`r=32`), pasillos con relleno claro y locales comerciales con bordes precisos.
3. **Badges de Categoría con Glow Emisivo**: Insignias circulares emisoras de luz sobre locales destacados según su categoría oficial (`#E11D48` Moda, `#D97706` Deporte/Hogar, `#2563EB` Tech, `#10B981` Comida/Salud).
4. **Buscador Flotante Superior**: Barra tipo glassmorphic con acceso rápido y botón circular de búsqueda en carmesí neón con icono de lupa.
5. **Controles Cilíndricos Laterales**: Cápsulas flotantes a la derecha para cambio de piso (`P1 / P2`), Zoom (`+ / −`) y botón de GPS/Recentrado.
6. **Carrusel Inferior de Ofertas Flash en Vivo**: Tarjetas horizontales de cristal con insignia de descuento, icono de local iluminado y enlace `VER RUTA →`.
7. **Barra de Navegación Inferior (Tabs)**: Navegación de 4 pestañas con el botón central del Mapa elevado y resaltado.
8. **Encuadre Seguro de Recorrido (Viewport Safe & North-Up)**:
   - Durante la navegación, la cámara se calibra estrictamente en el espacio vertical visible entre el `NavigationHUD` superior y el `DestinationBar` inferior.
   - Orientación nivelada fija (**North-Up**) sin rotaciones no deseadas para evitar que el plano se desborde o se oculte bajo las etiquetas.
   - Locución de voz TTS activa en tiempo real al seleccionar cualquier local y en cada instrucción de ruta.
9. **Avatar GPS con Efecto Radar y Haz de Linterna Direccional**:
   - **Efecto Radar / Sonar**: Aura circular con degradado radial de precisión (`#2563EB` al 22%), doble anillo concéntrico de ondas de sonar (`stroke` con opacidades 25% y 35%) y halo luminoso interior.
   - **Efecto Linterna / Headlight Beam**: Haz de luz cónico direccional que ilumina el suelo hacia el destino o rumbo de caminata. Se compone de un haz ambiental de 44° con degradado suave y un foco central concentrado de 18° de alta luminosidad que apunta directamente al local seleccionado o al siguiente punto de paso.
   - **Beacon de Precisión**: Núcleo azul brillante con borde blanco grueso y flecha direccional integrada.

---

### 10.1 Estándar de Modo Niño (Objetivos de Estación y Light Luxury)
1. **Tarjetas de Misión y Checklist de Objetivos**:
   - Cada tarjeta de estación en el Mapa del Tesoro (`KidsTreasureMap`) incluye un checklist de 3 pasos:
     1. Llegar a la tienda (`Piso / Local`)
     2. Escanear QR físico en vitrina (`Producto destacado`)
     3. Resolver acertijo temático (+1 ⭐)
   - Contador en el encabezado general: `🎯 X/5 Objetivos Alcanzados`.
2. **Tarjeta de Llegada Light Luxury (`KidsArrivalCard`)**:
   - Sustrato blanco puro con bordes redondeados `r=24`, badge superior esmeralda `¡LLEGASTE AL LOCAL!`, micro-oferta de producto y botón directo para abrir el escáner QR.

---

## 10. Ofertas y cupones

Cada oferta debe comunicar:

1. Qué beneficio ofrece.
2. Dónde se utiliza.
3. Cuándo expira.
4. Cómo activarla.

Flujo:

```text
Oferta
  ↓
Detalle
  ↓
Activar
  ↓
Código / QR
  ↓
Redención
  ↓
Confirmación
```

La confirmación debe proporcionar evidencia clara de éxito.

---

## 11. AI Concierge

Debe sentirse conversacional, limpio, integrado y confiable.

Evitar interfaces excesivamente futuristas.

Cuando sea posible, las respuestas deben incluir acciones:

```text
"Te recomiendo estas 3 tiendas."
[Ver tiendas]

"Hay una oferta disponible."
[Ver oferta]

"La tienda está en el segundo piso."
[Cómo llegar]
```

La IA debe conectar conversación con acciones reales del sistema.

---

## 12. Tenant Experience

Debe sentirse como un SaaS profesional.

Funciones:

- Dashboard.
- Ofertas.
- Eventos.
- Perfil de tienda.
- Métricas.
- Campañas.

Separar visualmente:

```text
Shopper Experience
Tenant Experience
Mall Administration
```

---

## 13. Mall Administration

Priorizar:

- KPIs.
- Actividad.
- Conversión.
- Ofertas.
- Tiendas.
- Eventos.
- Usuarios.
- Rendimiento.

Presentar primero resumen y después detalle:

```text
Overview
  ↓
Metric
  ↓
Trend
  ↓
Segment
  ↓
Detail
```

---

## 14. Responsive Design

Breakpoints de referencia:

```text
sm  ≥ 640px
md  ≥ 768px
lg  ≥ 1024px
xl  ≥ 1280px
2xl ≥ 1536px
```

El diseño debe adaptarse fluidamente y no depender de tamaños exactos.

---

## 15. Accesibilidad

Objetivo mínimo: buenas prácticas WCAG 2.2 AA.

Considerar:

- Contraste suficiente.
- Focus visible.
- Navegación por teclado.
- Labels claros.
- Targets táctiles adecuados.
- No depender únicamente del color.
- Mensajes de error comprensibles.
- Texto alternativo.
- Lectores de pantalla.
- `prefers-reduced-motion`.

---

## 16. Estados de interfaz

Todo componente interactivo debe considerar:

```text
Default
Hover
Focus
Pressed
Disabled
Loading
Success
Error
Empty
Offline
```

No diseñar únicamente el estado ideal.

---

## 17. Loading y Empty States

Preferir skeletons cuando la estructura final sea conocida.

Los estados vacíos deben explicar:

1. Qué ocurrió.
2. Qué puede hacer el usuario.
3. Qué acción puede tomar.

Ejemplo:

> No tienes ofertas guardadas todavía.
>
> Explora las promociones disponibles en el mall.

`Explorar ofertas`

Los errores deben ser accionables:

> No pudimos cargar las ofertas.
>
> Intenta nuevamente.

`Reintentar`

---

## 18. Fotografía e iconografía

La fotografía debe priorizar:

- Productos.
- Personas.
- Espacios del mall.
- Restaurantes.
- Experiencias.
- Arquitectura.
- Eventos.

Preferir fotografía real del mall frente a imágenes genéricas.

La iconografía debe ser simple, consistente y reconocible. No mezclar familias de iconos en una misma experiencia.

---

## 19. Motion Design

Duraciones orientativas:

```text
Micro interaction: 100–180ms
Standard:           180–300ms
Complex transition: 300–450ms
```

La animación debe confirmar acciones, orientar y crear continuidad; nunca convertirse en espectáculo.

---

## 20. Personalización por mall

Modelo conceptual:

```ts
interface MallTheme {
  logo: string
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  typography?: string
}
```

Arquitectura:

```text
Design System
      +
Mall Theme
      =
Mall Experience
```

El tema no debe modificar componentes funcionalmente.

---

## 21. Arquitectura de componentes

```text
components/
├── ui/
│   ├── Button
│   ├── Input
│   ├── Card
│   ├── Badge
│   ├── Modal
│   └── Skeleton
│
├── mall/
│   ├── StoreCard
│   ├── OfferCard
│   ├── EventCard
│   ├── Map
│   └── MallHeader
│
├── concierge/
│   ├── Chat
│   ├── Message
│   └── RecommendationCard
│
└── dashboard/
    ├── MetricCard
    ├── Chart
    └── DataTable
```

---

## 22. Reglas de UX

### Regla 1 — Una acción principal

Cada pantalla debe tener una acción primaria claramente identificable.

### Regla 2 — Menos decisiones

Reducir decisiones simultáneas.

### Regla 3 — Contexto visible

El usuario debe saber en qué mall y sección se encuentra.

### Regla 4 — Información antes que decoración

La estética nunca debe competir con la utilidad.

### Regla 5 — Acción antes que explicación

Mostrar directamente la acción relevante cuando sea posible.

### Regla 6 — Navegación clara

El usuario debe poder volver fácilmente.

### Regla 7 — Feedback inmediato

Toda acción importante debe producir una respuesta visual.

---

## 23. MVP Design Scope

Diseño inicial:

- Splash.
- Home.
- Explore.
- Store Detail.
- Map básico.
- Offers.
- Coupon activation.
- AI Concierge.
- Tenant basic dashboard.
- Mall basic dashboard.
- Analytics básico.
- Notifications.

Fuera del alcance inicial:

- AR.
- Social.
- Live shopping.
- Delivery.
- Valet avanzado.
- Experiencias físicas conectadas.

---

## 24. Design Quality Gate

### Visual

- [ ] Usa design tokens.
- [ ] Mantiene jerarquía visual.
- [ ] No está saturada.
- [ ] Tiene suficiente espacio.
- [ ] Usa imágenes apropiadas.

### UX

- [ ] La acción principal es evidente.
- [ ] La navegación es clara.
- [ ] Los estados están contemplados.
- [ ] El usuario entiende qué hacer.
- [ ] No existen pasos innecesarios.

### Responsive

- [ ] Mobile.
- [ ] Tablet.
- [ ] Desktop.

### Accessibility

- [ ] Contraste.
- [ ] Focus.
- [ ] Targets.
- [ ] Labels.
- [ ] Keyboard navigation.
- [ ] Reduced motion.

### Product

- [ ] La pantalla tiene un objetivo.
- [ ] La acción puede medirse.
- [ ] Respeta el contexto del mall.
- [ ] No agrega complejidad sin valor.

---

## 25. Design Philosophy

Mall OS no debe intentar parecer una aplicación de moda.

Debe parecer una **infraestructura digital confiable para el centro comercial**.

La experiencia ideal combina:

```text
Technology
    +
Retail
    +
Hospitality
    +
Navigation
    +
Personalization
    +
Measurement
```

El resultado esperado:

> **El visitante encuentra más fácilmente lo que busca.**  
> **Las tiendas reciben más oportunidades de interacción.**  
> **La administración puede medir el impacto digital del mall.**

---

## 26. Regla maestra

> **Diseñar primero para la utilidad.**  
> **Después para la conversión.**  
> **Después para la belleza.**  
> **Nunca sacrificar claridad por apariencia.**

---

## Estado del documento

**Documento:** `DESIGN.md`  
**Producto:** Mall OS  
**Tipo:** Design System / UX Guidelines  
**Estado:** Base inicial del sistema de diseño  
**Alcance:** Shopper + Tenant + Mall Administration  
**Plataformas:** Mobile / PWA / Web
