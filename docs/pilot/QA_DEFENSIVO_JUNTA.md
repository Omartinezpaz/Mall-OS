# Q&A Defensivo para la Presentación ante la Junta Directiva (La Cascada)

> **Documento Estratégico:** Respuestas técnicas, operativas y legales a preguntas difíciles de miembros de la Junta, Condominio y Comerciantes.

---

### P1: "¿Qué pasa si se cae el internet de Digitel o Movistar en los Altos Mirandinos durante la tarde?"

**Respuesta Técnica & Comercial:**
"Mall OS fue concebido desde el día uno bajo arquitectura **Offline-First**. El mapa del centro comercial, la búsqueda de los 120 locales, las rutas guiadas y el cálculo de distancias están empaquetados directamente dentro del celular del usuario. Si la señal celular desaparece por completo en los pasillos interiores, el mapa sigue funcionando a 60 cuadros por segundo sin interrupción.

En cuanto a nuestro Concierge IA, cuenta con un motor híbrido inteligente: si la red falla o la latencia supera los 1.5 segundos, conmuta de inmediato a una base de conocimiento estructurada interna en 5 milisegundos, respondiendo con datos precisos de tiendas, horarios y direcciones sin colgarse."

---

### P2: "¿Por qué los comerciantes querrían usar esto si muchos ya usan WhatsApp e Instagram?"

**Respuesta Técnica & Comercial:**
"Instagram y WhatsApp son excelentes canales para clientes que ya conocen la tienda, pero **no resuelven el tráfico de pasillo**. El 60% de los visitantes que caminan por La Cascada no entran a una tienda porque desconocen que tiene una promoción activa ese día o no saben exactamente en qué pasillo o nivel se encuentra.

Con Store OS, el comerciante no necesita contratar a un programador ni pasar horas diseñando posts: sube una oferta en 15 segundos y de inmediato se enciende un pin destacado en el mapa de todos los visitantes que están caminando por el mall en ese instante. Además, el Concierge IA recomienda su tienda activamente cuando un visitante pregunta, por ejemplo, '¿dónde compro calzado deportivo?'."

---

### P3: "¿Esto implica costos ocultos de electricidad, instalación de servidores o mantenimiento para el mall?"

**Respuesta Técnica & Comercial:**
"Cero costos ocultos. Mall OS corre completamente en la nube de alta disponibilidad y en los dispositivos móviles de los visitantes. No instalamos servidores en el sótano del mall, no requerimos cableado estructurado, ni consumimos electricidad del centro comercial. Lo único que instalamos físicamente son habladores acrílicos y calcomanías discretas de alta calidad con el código QR de acceso."

---

### P4: "¿Cómo protegen la privacidad de los niños con el Modo Niños y Mi Comunidad? ¿Cumple con la ley venezolana?"

**Respuesta Técnica & Comercial:**
"Cumplimiento riguroso de la LOPNNA (Art. 65 sobre privacidad e intimidad de niños y adolescentes). Hemos implementado tres salvaguardas técnicas inviolables:
1. **Consentimiento Explícito del Tutor:** No se activa ninguna función de seguimiento infantil sin la autorización explícita de un adulto responsable en el perfil.
2. **Expiración Automática en 15 minutos (TTL Estricto):** Ninguna coordenada de ubicación se almacena de forma indefinida; las señales caducan y se eliminan automáticamente de la base de datos tras 15 minutos de inactividad.
3. **Aislamiento Multi-Tenant (RLS):** Las señales de presencia familiar solo son visibles dentro del mismo centro comercial y exclusivamente entre usuarios que hayan aceptado mutuamente un código de invitación seguro de un solo uso."

---

### P5: "¿Qué celulares soportan la aplicación? En Venezuela la mayoría de la gente tiene teléfonos Android económicos (Redmi, Tecno, Infinix)."

**Respuesta Técnica & Comercial:**
"Esa es precisamente la mayor ventaja competitiva de nuestro motor de mapas. Mientras otras soluciones web pesadas colapsan o se vuelven lentas en teléfonos de gama media-baja, Mall OS corre sobre **Shopify Skia compilado a código nativo GPU**, optimizado con la mitigación D-090 que elimina fugas de memoria y saturación de hilos en procesadores MediaTek y Snapdragon. Hemos probado exhaustivamente el motor en dispositivos Xiaomi Redmi Note y Infinix, alcanzando 60 cuadros por segundo estables con un consumo de batería mínimo."

---

### P6: "¿Cuál es el costo después de los 30 días del piloto? ¿Nos van a amarrar a un contrato forzoso?"

**Respuesta Técnica & Comercial:**
"El piloto de 30 días es 100% gratuito y sin compromiso de permanencia. Al concluir el mes, entregaremos a la Junta un informe detallado con el volumen de tráfico peatonal, las tiendas más buscadas y el impacto medido en los locales participantes. 

Si la Junta decide continuar, el plan mensual de mantenimiento es una tarifa plana en bolívares calculada a tasa oficial BCV, altamente accesible y diseñada para autofinanciarse mediante el retorno comercial de los locatarios. Si deciden no continuar, el servicio se desactiva sin costo ni penalidad alguna, y el mall conserva la propiedad de todos los reportes estadísticos generados."
