import type { MallOsIconId } from '@mallos/design-tokens';

export type InfoIntentId =
  | 'bathrooms'
  | 'parking'
  | 'wifi'
  | 'atm'
  | 'hours'
  | 'security'
  | 'kids_mode'
  | 'accessibility'
  | 'meeting_points'
  | 'customer_service'
  | 'transport'
  | 'events';

export interface InfoIntentResponse {
  title: string;
  body: string;
  bullets?: string[];
  targetNodeId?: string;
  targetStoreId?: string;
  actionLabel?: string;
  actionType?: 'route' | 'call' | 'open_screen' | 'toggle';
  actionPayload?: string;
}

export interface InfoIntent {
  id: InfoIntentId;
  label: string;
  iconId: MallOsIconId;
  keywords: string[];
  synonyms?: string[];
  response: InfoIntentResponse;
  accessibleResponse?: InfoIntentResponse;
}

export const INFO_INTENTS: InfoIntent[] = [
  // 1. Baños (hombres/mujeres/accesibles/familiares)
  {
    id: 'bathrooms',
    label: 'Baños y Sanitarios',
    iconId: 'banos',
    keywords: ['bano', 'banos', 'sanitario', 'sanitarios', 'wc', 'orinar', 'lavamanos', 'tocador'],
    synonyms: ['toilette', 'servicios higienicos', 'cambiador'],
    response: {
      title: 'Baños y Sanitarios',
      body: 'Los sanitarios están ubicados junto a las escaleras mecánicas principales de cada nivel.',
      bullets: [
        'Nivel Autopista: Módulo central frente a Plaza Jardín',
        'Nivel Acuario y Feria: Sanitarios amplios con cambiador para bebés',
        'Cabinas adaptadas para personas con movilidad reducida en todos los pisos',
      ],
      targetNodeId: 'node-67',
      actionLabel: 'Trazar ruta al baño más cercano',
      actionType: 'route',
    },
    accessibleResponse: {
      title: 'Baños 100% Accesibles',
      body: 'Sanitarios con puertas amplias, barras de apoyo y acceso a nivel de piso sin escalones.',
      bullets: [
        'Nivel Autopista: Módulo adaptado junto a Plaza Jardín (acceso plano directo)',
        'Nivel Feria: Baño familiar accesible junto al ascensor principal',
      ],
      targetNodeId: 'node-67',
      actionLabel: 'Trazar ruta accesible al baño',
      actionType: 'route',
    },
  },

  // 2. Estacionamiento
  {
    id: 'parking',
    label: 'Estacionamiento',
    iconId: 'parking',
    keywords: ['estacionamiento', 'parqueo', 'parqueadero', 'carro', 'estacionar', 'ticket', 'pago estacionamiento'],
    synonyms: ['parking', 'aparcamiento', 'vehiculo', 'auto'],
    response: {
      title: 'Estacionamiento Sambil',
      body: 'Contamos con más de 4.000 puestos techados distribuidos en 4 niveles de estacionamiento.',
      bullets: [
        'Entradas por Av. Libertador y Autopista Francisco Fajardo',
        'Cajas de pago automático en todos los accesos peatonales y vía App',
        'Puestos de carga para vehículos eléctricos en Sótano 1',
      ],
      targetNodeId: 'node-plaza Central',
      actionLabel: 'Ver cajas de pago en mapa',
      actionType: 'route',
    },
  },

  // 3. Wi-Fi
  {
    id: 'wifi',
    label: 'Wi-Fi Gratuito',
    iconId: 'servicios',
    keywords: ['wifi', 'wi-fi', 'internet', 'red', 'clave wifi', 'conexion', 'datos'],
    synonyms: ['clave de internet', 'red libre', 'conectarse'],
    response: {
      title: 'Red Wi-Fi Gratuita',
      body: 'Conéctate libremente a la red oficial de alta velocidad en cualquier pasillo o plaza del mall.',
      bullets: [
        'Red SSID: "SAMBIL-GUEST-FREE"',
        'Contraseña: No requiere clave. Acepta los términos en el portal cautivo',
        'Cobertura total en Nivel Feria, Plaza Central y Plazas temáticas',
      ],
    },
  },

  // 4. Cajeros automáticos y Bancos
  {
    id: 'atm',
    label: 'Cajeros Automáticos y Bancos',
    iconId: 'cajero',
    keywords: ['cajero', 'cajeros', 'atm', 'banco', 'efectivo', 'dolares', 'bolivares', 'retirar'],
    synonyms: ['dinero', 'taquilla', 'banesco', 'mercantil', 'bbva', 'bnc'],
    response: {
      title: 'Cajeros y Sector Financiero',
      body: 'Zona de banca y cajeros multifunción ubicada principalmente en Nivel Autopista.',
      bullets: [
        'Banco del Tesoro: Local 18 (Nivel Autopista)',
        'BBVA Provincial: Local 77 (Nivel Autopista)',
        'Banco Nacional de Crédito (BNC): Local 110 (Nivel Autopista)',
        'Cajeros automáticos activos 24/7 en Plaza Central y Plaza Jardín',
      ],
      targetStoreId: 'local_18',
      targetNodeId: 'node-67',
      actionLabel: 'Trazar ruta a zona bancaria',
      actionType: 'route',
    },
  },

  // 5. Horarios de Atención
  {
    id: 'hours',
    label: 'Horarios del Mall',
    iconId: 'informacion',
    keywords: ['horario', 'horarios', 'abierto', 'cerrado', 'a que hora abre', 'a que hora cierra', 'domingo'],
    synonyms: ['apertura', 'cierre', 'dias feriados'],
    response: {
      title: 'Horarios de Operación',
      body: 'Sambil Chacao abre sus puertas los 365 días del año para compras, gastronomía y diversión.',
      bullets: [
        'Locales comerciales: Lunes a Sábado 10:00 AM – 9:00 PM | Domingos 12:00 PM – 8:00 PM',
        'Feria de Comida & Restaurantes: Lunes a Domingo hasta las 11:00 PM',
        'Cines Unidos: Funciones hasta las 10:30 PM según cartelera',
      ],
    },
  },

  // 6. Seguridad y Emergencias
  {
    id: 'security',
    label: 'Seguridad y Emergencias',
    iconId: 'seguridad',
    keywords: ['seguridad', 'emergencia', 'policia', 'ayuda', 'robo', 'perdi', 'botiquin', 'paramedico', 'evacuacion'],
    synonyms: ['guardia', 'urgencia', 'bomberos', 'ambulancia', 'socorro'],
    response: {
      title: 'Puesto de Seguridad & Paramédicos',
      body: 'Personal de seguridad y atención médica primaria activo las 24 horas dentro del mall.',
      bullets: [
        'Puesto Central de Control: Nivel Autopista, pasillo de servicio tras Plaza Central',
        'Paramédicos y primeros auxilios en Módulo de Atención al Cliente',
        'Línea directa interna de emergencia disponible en cualquier módulo',
      ],
      targetNodeId: 'node-plaza Central',
      actionLabel: 'Trazar ruta al Módulo de Seguridad',
      actionType: 'route',
    },
  },

  // 7. Modo Niño (Gamificación)
  {
    id: 'kids_mode',
    label: 'Modo Niño y Búsqueda del Tesoro',
    iconId: 'bebes',
    keywords: ['nino', 'ninos', 'modo nino', 'juego', 'aventura', 'tesoro', 'recompensa', 'avatar'],
    synonyms: ['kids', 'divertirse', 'personaje', 'buscar'],
    response: {
      title: 'Modo Niño: ¡Aventura Sambil!',
      body: 'Un recorrido guiado interactivo para que los pequeños resuelvan acertijos y encuentren personajes en el mall.',
      bullets: [
        'Misiones por piso con pistas temáticas adaptadas a su edad',
        'Escaneo de códigos QR en tiendas para coleccionar estrellas',
        'Recompensa dulce y sorpresas al completar el mapa del tesoro',
      ],
      actionLabel: 'Activar Modo Niño ahora',
      actionType: 'open_screen',
      actionPayload: '/kids-mode',
    },
  },

  // 8. Accesibilidad y Movilidad Reducida
  {
    id: 'accessibility',
    label: 'Accesibilidad y Sillas de Ruedas',
    iconId: 'accesible',
    keywords: ['accesibilidad', 'silla de ruedas', 'discapacidad', 'rampa', 'ascensor', 'movilidad reducida'],
    synonyms: ['accesible', 'sin escaleras', 'ancianos', 'coche de bebe', 'muletas'],
    response: {
      title: 'Rutas y Servicios Accesibles',
      body: 'Todo el centro comercial cuenta con infraestructura 100% libre de barreras arquitectónicas.',
      bullets: [
        'Ascensores panorámicos en las 5 plazas icónicas conectando todos los niveles',
        'Préstamo gratuito de sillas de ruedas en el Módulo de Atención (Nivel Autopista)',
        'Rutas de navegación sin escaleras disponibles en el mapa interactivo',
      ],
      targetNodeId: 'node-plaza Central',
      actionLabel: 'Activar Modo Accesible en mapa',
      actionType: 'toggle',
    },
    accessibleResponse: {
      title: 'Modo Accesible ACTIVO',
      body: 'Tu mapa está configurado para evitar todas las escaleras y priorizar ascensores panorámicos.',
      bullets: [
        'Rutas 100% libres de escalones y desniveles en todos los pisos',
        'Ascensores panorámicos activos en las 5 plazas principales',
        'Sanitarios adaptados indicados con prioridad en el mapa',
      ],
      targetNodeId: 'node-plaza Central',
      actionLabel: 'Ver mapa accesible',
      actionType: 'open_screen',
      actionPayload: '/mapa',
    },
  },

  // 9. Puntos de Encuentro
  {
    id: 'meeting_points',
    label: 'Puntos de Encuentro y Plazas',
    iconId: 'ubicacion',
    keywords: ['punto de encuentro', 'plaza', 'donde encontrarnos', 'reunirnos', 'plazas', 'fuente', 'jardin', 'musica'],
    synonyms: ['encuentro', 'esperar', 'lugar centrico'],
    response: {
      title: '5 Plazas Icónicas de Encuentro',
      body: 'Los puntos de encuentro oficiales y más reconocibles de Sambil Chacao:',
      bullets: [
        'Plaza Jardín: Extremo norte, acceso Tijerazo (Nivel Autopista)',
        'Plaza La Fuente: Zona oeste, acceso a ZARA y Starbucks',
        'Plaza Central: El corazón del centro comercial, bajo la cúpula principal',
        'Plaza El Arte: Zona este, acceso hacia tiendas de tecnología',
        'Plaza La Música: Extremo sur, junto a Cines Unidos y zona gourmet',
      ],
      targetNodeId: 'node-plaza Central',
      actionLabel: 'Trazar ruta a Plaza Central',
      actionType: 'route',
    },
  },

  // 10. Servicio al Cliente y Lost & Found
  {
    id: 'customer_service',
    label: 'Atención al Cliente y Objetos Perdidos',
    iconId: 'informacion',
    keywords: ['atencion al cliente', 'objetos perdidos', 'lost and found', 'reclamo', 'informacion', 'modulo'],
    synonyms: ['perdi algo', 'atencion', 'soporte'],
    response: {
      title: 'Módulo de Atención al Cliente',
      body: 'Asistencia personalizada, custodia de objetos extraviados e información general.',
      bullets: [
        'Módulo Central: Nivel Autopista, pasillo central frente a Plaza Central',
        'Registro y reclamo de objetos extraviados con identificación',
        'Teléfono de contacto directo del centro comercial disponible',
      ],
      targetNodeId: 'node-plaza Central',
      actionLabel: 'Trazar ruta al Módulo de Atención',
      actionType: 'route',
    },
  },

  // 11. Transporte y Cómo Llegar
  {
    id: 'transport',
    label: 'Transporte y Accesos',
    iconId: 'otros',
    keywords: ['transporte', 'metro', 'como llegar', 'autobus', 'taxi', 'parada', 'metrobús'],
    synonyms: ['llegar', 'metro chacao', 'direccion', 'ubicacion'],
    response: {
      title: 'Accesos y Transporte Público',
      body: 'Excelente conectividad con las principales arterias viales y red de transporte de Caracas.',
      bullets: [
        'Metro de Caracas: Estación Chacao (Línea 1) con pasarela peatonal techada directa',
        'Parada de taxis autorizados y controlados en la entrada de Av. Libertador',
        'Parada de transporte público superficial en Av. Francisco de Miranda y Autopista',
      ],
    },
  },

  // 12. Promociones y Eventos del Día
  {
    id: 'events',
    label: 'Eventos y Cartelera del Día',
    iconId: 'entretenimiento',
    keywords: ['evento', 'eventos', 'hoy', 'promocion', 'promociones', 'concierto', 'show', 'anfiteatro', 'cartelera'],
    synonyms: ['actividades', 'agenda', 'espectaculo'],
    response: {
      title: 'Agenda y Eventos del Día',
      body: 'Disfruta de actividades culturales, firmas de autógrafos y promociones especiales.',
      bullets: [
        'Actividades infantiles y shows musicales los fines de semana en Plaza Central',
        'Descuentos exclusivos del día disponibles en la sección "Ofertas" de la App',
        'Cartelera de estrenos en Cines Unidos Nivel Autopista',
      ],
      actionLabel: 'Ver todas las ofertas del día',
      actionType: 'open_screen',
      actionPayload: '/(tabs)/ofertas',
    },
  },
];

/**
 * Busca si el texto del usuario coincide con alguno de los 12 intents informativos.
 */
export function findMatchingInfoIntent(queryText: string): InfoIntent | null {
  const normalized = queryText
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  for (const intent of INFO_INTENTS) {
    const allKeywords = [...intent.keywords, ...(intent.synonyms || [])];
    const match = allKeywords.some((kw) => {
      const kwNorm = kw
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      return normalized.includes(kwNorm);
    });

    if (match) {
      return intent;
    }
  }

  return null;
}
