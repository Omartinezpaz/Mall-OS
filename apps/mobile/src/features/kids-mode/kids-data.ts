export type AgeGroup = 'child' | 'teen' | 'young';

export interface KidsRiddleOption {
  id: string;
  label: string;
  emoji?: string;
  description?: string;
}

export interface KidsRiddle {
  id: string;
  number: number;
  storeId: string;
  storeName: string;
  floorName: string;
  category: string;
  ageGroup: AgeGroup;
  prompt: string;
  hint: string;
  explanation: string;
  options: KidsRiddleOption[];
  correctOptionId: string;
  badge: string;
  sponsorName: string;
}

export interface KidsPrize {
  id: string;
  ageGroup: AgeGroup;
  title: string;
  headline: string;
  description: string;
  sponsor: string;
  sponsorStoreId: string;
  badge: string;
  icon: string;
  codePrefix: string;
  validDays: number;
  perks: string[];
}

export const AGE_GROUP_CONFIG: Record<
  AgeGroup,
  {
    title: string;
    subtitle: string;
    badge: string;
    emoji: string;
    color: string;
    accentColor: string;
    gradient: [string, string];
    bgTint: string;
    difficulty: string;
  }
> = {
  child: {
    title: 'Pequeños Exploradores',
    subtitle: '4 a 8 años · Juego visual y divertido',
    badge: '4 - 8 AÑOS',
    emoji: '🧒',
    color: '#F59E0B',
    accentColor: '#D97706',
    gradient: ['#FEF3C7', '#FDE68A'],
    bgTint: '#FFFBEB',
    difficulty: 'Fácil & Visual',
  },
  teen: {
    title: 'Misión Secreta',
    subtitle: '9 a 14 años · Acertijos y pistas del mall',
    badge: '9 - 14 AÑOS',
    emoji: '🧑',
    color: '#8B5CF6',
    accentColor: '#7C3AED',
    gradient: ['#EDE9FE', '#DDD6FE'],
    bgTint: '#F5F3FF',
    difficulty: 'Ingenio & Lógica',
  },
  young: {
    title: 'Reto Urbano',
    subtitle: '15 a 25 años · Trivia y exploración urbana',
    badge: '15 - 25 AÑOS',
    emoji: '🧑‍🦱',
    color: '#0284C7',
    accentColor: '#0369A1',
    gradient: ['#E0F2FE', '#BAE6FD'],
    bgTint: '#F0F9FF',
    difficulty: 'Desafío & Trivia',
  },
};

export const KIDS_RIDDLES: Record<AgeGroup, KidsRiddle[]> = {
  child: [
    {
      id: 'riddle-child-1',
      number: 1,
      storeId: 'local_4',
      storeName: 'Tiendas Tijerazo',
      floorName: 'Nivel Autopista',
      category: 'Juguetes y Ropa',
      ageGroup: 'child',
      prompt: '¿Qué animal travieso dice ¡MIAU! y le encanta jugar con ovillos de lana?',
      hint: 'Pista: Tiene bigotes largos y orejas puntiagudas 🐱',
      explanation: '¡Exacto! El gatito duerme cerca de los peluches suaves.',
      options: [
        { id: 'opt_dog', label: 'Perrito', emoji: '🐶' },
        { id: 'opt_cat', label: 'Gatito', emoji: '🐱' },
        { id: 'opt_mouse', label: 'Ratoncito', emoji: '🐭' },
        { id: 'opt_frog', label: 'Ranita', emoji: '🐸' },
      ],
      correctOptionId: 'opt_cat',
      badge: 'Peluche Mágico',
      sponsorName: 'Tijerazo Kids',
    },
    {
      id: 'riddle-child-2',
      number: 2,
      storeId: 'local_40',
      storeName: 'Farmatodo',
      floorName: 'Nivel Autopista',
      category: 'Salud y Dulces',
      ageGroup: 'child',
      prompt: 'Cuando tenemos tos o un raspón, ¿cuál de estos nos ayuda a curarnos?',
      hint: 'Pista: Lo encuentras en la botica con frascos de jarabe 💊',
      explanation: '¡Muy bien! Las curitas y jarabes nos hacen sentir super fuertes.',
      options: [
        { id: 'opt_ball', label: 'Una Pelota', emoji: '⚽' },
        { id: 'opt_med', label: 'Medicina & Jarabe', emoji: '💊' },
        { id: 'opt_book', label: 'Un Cuaderno', emoji: '📚' },
        { id: 'opt_shoe', label: 'Un Zapato', emoji: '👟' },
      ],
      correctOptionId: 'opt_med',
      badge: 'Super Guardián',
      sponsorName: 'Farmatodo Baby',
    },
    {
      id: 'riddle-child-3',
      number: 3,
      storeId: 'local_1',
      storeName: 'McCafé & Postres',
      floorName: 'Nivel Autopista',
      category: 'Helados & Café',
      ageGroup: 'child',
      prompt: '¿Qué bebida o dulce cremoso y marrón se hace con cacao delicioso?',
      hint: 'Pista: ¡Es el rico chocolate o café caliente! 🍫',
      explanation: '¡Delicioso! El chocolate batido nos llena de sonrisas.',
      options: [
        { id: 'opt_water', label: 'Agua Azul', emoji: '💧' },
        { id: 'opt_choc', label: 'Chocolate Caliente', emoji: '☕' },
        { id: 'opt_grass', label: 'Lechuga', emoji: '🥬' },
        { id: 'opt_lemon', label: 'Limón Ácido', emoji: '🍋' },
      ],
      correctOptionId: 'opt_choc',
      badge: 'Chef Dulcero',
      sponsorName: 'McCafé',
    },
    {
      id: 'riddle-child-4',
      number: 4,
      storeId: 'local_12',
      storeName: 'Crocs Store',
      floorName: 'Nivel Autopista',
      category: 'Calzado & Pins',
      ageGroup: 'child',
      prompt: '¿Qué animal verde con dientes grandes es la simpática mascota de Crocs?',
      hint: 'Pista: Nada en el río y tiene piel rugosa 🐊',
      explanation: '¡Genial! El cocodrilo feliz nos acompaña a saltar y correr.',
      options: [
        { id: 'opt_croc', label: 'Cocodrilo Verde', emoji: '🐊' },
        { id: 'opt_bear', label: 'Osito Pardo', emoji: '🐻' },
        { id: 'opt_lion', label: 'Leoncito', emoji: '🦁' },
        { id: 'opt_bird', label: 'Pajarito', emoji: '🦜' },
      ],
      correctOptionId: 'opt_croc',
      badge: 'Amigo Cocodrilo',
      sponsorName: 'Crocs Kids',
    },
    {
      id: 'riddle-child-5',
      number: 5,
      storeId: 'local_116',
      storeName: 'Cines Unidos',
      floorName: 'Nivel Diversión',
      category: 'Cine & Pantalla Gigante',
      ageGroup: 'child',
      prompt: '¿Cuál es la famosa película animada del rey de la selva y su cachorro Simba?',
      hint: 'Pista: ¡Dice Hakuna Matata! 👑',
      explanation: '¡Completaste el Tesoro! El Rey León ruge en la pantalla grande.',
      options: [
        { id: 'opt_nemo', label: 'Buscando a Nemo', emoji: '🐠' },
        { id: 'opt_lionking', label: 'El Rey León', emoji: '🦁' },
        { id: 'opt_cars', label: 'Carros Rápidos', emoji: '🚗' },
        { id: 'opt_frozen', label: 'Reino de Hielo', emoji: '❄️' },
      ],
      correctOptionId: 'opt_lionking',
      badge: 'Estrella de Cine',
      sponsorName: 'Cines Unidos Kids',
    },
  ],
  teen: [
    {
      id: 'riddle-teen-1',
      number: 1,
      storeId: 'local_7',
      storeName: 'Skechers',
      floorName: 'Nivel Autopista',
      category: 'Calzado Urbano',
      ageGroup: 'teen',
      prompt: '¿Cuántas letras tiene el nombre de esta famosa marca de zapatillas que inicia y termina con la letra "S"?',
      hint: 'Pista: S - K - E - C - H - E - R - S (¡cuéntalas!) 👟',
      explanation: '¡Correcto! S-K-E-C-H-E-R-S tiene exactamente 8 letras.',
      options: [
        { id: 'opt_6', label: '6 letras', emoji: '6️⃣' },
        { id: 'opt_7', label: '7 letras', emoji: '7️⃣' },
        { id: 'opt_8', label: '8 letras', emoji: '8️⃣' },
        { id: 'opt_9', label: '9 letras', emoji: '9️⃣' },
      ],
      correctOptionId: 'opt_8',
      badge: 'Criptógrafo',
      sponsorName: 'Skechers Sambil',
    },
    {
      id: 'riddle-teen-2',
      number: 2,
      storeId: 'local_25',
      storeName: 'Bershka',
      floorName: 'Nivel Autopista',
      category: 'Moda Juvenil',
      ageGroup: 'teen',
      prompt: 'En Bershka destaca la moda urbana. ¿Qué prenda es conocida mundialmente como "Hoodie"?',
      hint: 'Pista: Te cubre la cabeza cuando hace frío o hay viento 🧥',
      explanation: '¡Excelente! Los hoodies son el ícono del estilo streetwear.',
      options: [
        { id: 'opt_hoodie', label: 'Sudadera con Capucha', emoji: '🧥' },
        { id: 'opt_socks', label: 'Medias Altas', emoji: '🧦' },
        { id: 'opt_cap', label: 'Gorra Clásica', emoji: '🧢' },
        { id: 'opt_belt', label: 'Cinturón de Cuero', emoji: '👔' },
      ],
      correctOptionId: 'opt_hoodie',
      badge: 'Estilo Urbano',
      sponsorName: 'Bershka Style',
    },
    {
      id: 'riddle-teen-3',
      number: 3,
      storeId: 'local_31',
      storeName: 'Pull&Bear',
      floorName: 'Nivel Autopista',
      category: 'Streetwear & Denim',
      ageGroup: 'teen',
      prompt: '¿De qué color y material clásico son los pantalones "Jeans" o vaqueros originales?',
      hint: 'Pista: Tela resistente inventada para mineros y trabajadores 👖',
      explanation: '¡Bien visto! El Denim azul índigo es la tela más icónica del mundo.',
      options: [
        { id: 'opt_denim', label: 'Denim Azul Índigo', emoji: '👖' },
        { id: 'opt_silk', label: 'Seda Blanca', emoji: '🧣' },
        { id: 'opt_wool', label: 'Lana Amarilla', emoji: '🧶' },
        { id: 'opt_plastic', label: 'Goma Sintética', emoji: '🦺' },
      ],
      correctOptionId: 'opt_denim',
      badge: 'Experto Denim',
      sponsorName: 'Pull&Bear',
    },
    {
      id: 'riddle-teen-4',
      number: 4,
      storeId: 'local_55',
      storeName: 'Bath & Body Works',
      floorName: 'Nivel Autopista',
      category: 'Aromas & Fragancias',
      ageGroup: 'teen',
      prompt: '¿Cuál de estos aromas dulces y relajantes es famoso en velas y lociones de invierno?',
      hint: 'Pista: Es la especia dulce más popular en postres y galletas 🍦',
      explanation: '¡Acertaste! La Vainilla y Canela crean las fragancias más populares.',
      options: [
        { id: 'opt_vanilla', label: 'Vainilla & Canela Dulce', emoji: '🍦' },
        { id: 'opt_onion', label: 'Cebolla Morada', emoji: '🧅' },
        { id: 'opt_fish', label: 'Pescado Fresco', emoji: '🐟' },
        { id: 'opt_gas', label: 'Gasolina', emoji: '⛽' },
      ],
      correctOptionId: 'opt_vanilla',
      badge: 'Alquimista de Aromas',
      sponsorName: 'Bath & Body Works',
    },
    {
      id: 'riddle-teen-5',
      number: 5,
      storeId: 'local_85',
      storeName: 'Juventus Store',
      floorName: 'Nivel Autopista',
      category: 'Fútbol & Deportes',
      ageGroup: 'teen',
      prompt: '¿De qué país europeo es originario el histórico club de fútbol de la "Vecchia Signora" (Juventus)?',
      hint: 'Pista: País con forma de bota, cuna de la pizza y Turín 🇮🇹',
      explanation: '¡Misión Cumplida! La Juventus juega en la Serie A de Italia.',
      options: [
        { id: 'opt_italy', label: 'Italia 🇮🇹', emoji: '🇮🇹' },
        { id: 'opt_germany', label: 'Alemania 🇩🇪', emoji: '🇩🇪' },
        { id: 'opt_japan', label: 'Japón 🇯🇵', emoji: '🇯🇵' },
        { id: 'opt_brazil', label: 'Brasil 🇧🇷', emoji: '🇧🇷' },
      ],
      correctOptionId: 'opt_italy',
      badge: 'Capitán Calcio',
      sponsorName: 'Juventus Official',
    },
  ],
  young: [
    {
      id: 'riddle-young-1',
      number: 1,
      storeId: 'local_60',
      storeName: 'Stradivarius',
      floorName: 'Nivel Autopista',
      category: 'Tendencias & Accesorios',
      ageGroup: 'young',
      prompt: 'El logotipo de Stradivarius incluye un símbolo musical legendario. ¿Cuál es?',
      hint: 'Pista: Es la clave con la que empieza la partitura de violines y pianos 🎼',
      explanation: '¡Brillante! La Clave de Sol rinde homenaje a los míticos violines Stradivarius.',
      options: [
        { id: 'opt_sol', label: 'Clave de Sol 𝄞', emoji: '🎼' },
        { id: 'opt_drum', label: 'Un Tambor de Rock', emoji: '🥁' },
        { id: 'opt_mic', label: 'Micrófono Vintage', emoji: '🎙️' },
        { id: 'opt_guitar', label: 'Guitarra Eléctrica', emoji: '🎸' },
      ],
      correctOptionId: 'opt_sol',
      badge: 'Oído Musical',
      sponsorName: 'Stradivarius VIP',
    },
    {
      id: 'riddle-young-2',
      number: 2,
      storeId: 'local_109',
      storeName: 'Sportland',
      floorName: 'Nivel Autopista',
      category: 'Calzado & Sneakers',
      ageGroup: 'young',
      prompt: 'En el mundo de los sneakers coleccionables, ¿cómo se le llama al lanzamiento exclusivo de una edición limitada?',
      hint: 'Pista: Palabra en inglés usada para "caída" o estreno sorpresa 💧',
      explanation: '¡Sneakerhead confirmado! Un "Drop" o "Hype Drop" es el evento de lanzamiento.',
      options: [
        { id: 'opt_drop', label: 'Sneaker Drop / Release', emoji: '👟' },
        { id: 'opt_pause', label: 'Time Out', emoji: '⏱️' },
        { id: 'opt_refund', label: 'Reembolso', emoji: '🧾' },
        { id: 'opt_archive', label: 'Archivado', emoji: '📦' },
      ],
      correctOptionId: 'opt_drop',
      badge: 'Sneakerhead',
      sponsorName: 'Sportland Pro',
    },
    {
      id: 'riddle-young-3',
      number: 3,
      storeId: 'local_110',
      storeName: 'Banco Nacional de Crédito (BNC)',
      floorName: 'Nivel Autopista',
      category: 'Fintech & Banca',
      ageGroup: 'young',
      prompt: '¿Qué tecnología de pago sin contacto permite pagar acercando tu tarjeta o smartwatch al punto?',
      hint: 'Pista: Tres letras mágicas: Near Field Communication 📶',
      explanation: '¡Exacto! NFC (Contactless) procesa transacciones seguras por proximidad.',
      options: [
        { id: 'opt_nfc', label: 'NFC Contactless', emoji: '📶' },
        { id: 'opt_fax', label: 'Máquina de Fax', emoji: '📠' },
        { id: 'opt_morse', label: 'Código Morse', emoji: '📻' },
        { id: 'opt_floppy', label: 'Disquete 3.5"', emoji: '💾' },
      ],
      correctOptionId: 'opt_nfc',
      badge: 'Fintech Master',
      sponsorName: 'BNC Digital',
    },
    {
      id: 'riddle-young-4',
      number: 4,
      storeId: 'local_40',
      storeName: 'Farmatodo Skincare',
      floorName: 'Nivel Autopista',
      category: 'Skincare & Salud',
      ageGroup: 'young',
      prompt: '¿Qué componente es el rey absoluto de la hidratación facial al retener 1000 veces su peso en agua?',
      hint: 'Pista: Ácido Hialu... presente en sueros y cremas dermatológicas 💧',
      explanation: '¡Dermatólogo en potencia! El Ácido Hialurónico mantiene la barrera elástica.',
      options: [
        { id: 'opt_hyal', label: 'Ácido Hialurónico', emoji: '💧' },
        { id: 'opt_oil', label: 'Aceite de Motor', emoji: '🛢️' },
        { id: 'opt_salt', label: 'Sal Marina Pura', emoji: '🧂' },
        { id: 'opt_sugar', label: 'Azúcar Refinada', emoji: '🍬' },
      ],
      correctOptionId: 'opt_hyal',
      badge: 'Skincare Guru',
      sponsorName: 'Farmatodo Derma',
    },
    {
      id: 'riddle-young-5',
      number: 5,
      storeId: 'local_116',
      storeName: 'Cines Unidos IMAX',
      floorName: 'Nivel Diversión',
      category: 'Cine & Entretenimiento',
      ageGroup: 'young',
      prompt: '¿Qué tecnología de proyección cinematográfica ofrece pantallas de hasta 6 pisos de altura con sonido envolvente láser?',
      hint: 'Pista: Cuatro letras legendarias: Image MAXimum 🎬',
      explanation: '¡Completaste el Reto Urbano! IMAX redefine la experiencia inmersiva.',
      options: [
        { id: 'opt_imax', label: 'IMAX 3D Laser', emoji: '🎬' },
        { id: 'opt_vhs', label: 'Cinta VHS', emoji: '📼' },
        { id: 'opt_crt', label: 'Televisor de Tubo', emoji: '📺' },
        { id: 'opt_overhead', label: 'Retroproyector de Acetatos', emoji: '📽️' },
      ],
      correctOptionId: 'opt_imax',
      badge: 'Cinéfilo Pro',
      sponsorName: 'Cines Unidos VIP',
    },
  ],
};

export const KIDS_PRIZES: Record<AgeGroup, KidsPrize> = {
  child: {
    id: 'prize-child',
    ageGroup: 'child',
    title: '¡Super Explorador del Mall!',
    headline: 'Helado Gratis + Pack de Stickers Coleccionables',
    description: '¡Felicidades! Has resuelto los 5 acertijos del plano y desbloqueaste tu premio dulce en McCafé.',
    sponsor: 'McCafé Sambil',
    sponsorStoreId: 'local_1',
    badge: '🏆 TROFEO ORO',
    icon: 'ice-cream',
    codePrefix: 'KID',
    validDays: 3,
    perks: [
      '1 Barquilla o Cono McCafé gratis',
      'Sticker oficial de Super Explorador',
      'Certificado digital en la app',
    ],
  },
  teen: {
    id: 'prize-teen',
    ageGroup: 'teen',
    title: '¡Agente Secreto del Mall!',
    headline: 'Combo Cine 2x1 (Entrada + Cotufas) + Pase Ninja Park',
    description: 'Demostraste máximo ingenio descifrando los códigos secretos en los 5 locales del recorrido.',
    sponsor: 'Cines Unidos & Ninja Park',
    sponsorStoreId: 'local_116',
    badge: '🎖️ MEDALLA PLATA',
    icon: 'film',
    codePrefix: 'TEN',
    validDays: 5,
    perks: [
      'Entrada 2x1 para cualquier función 2D',
      'Combo Cotufas Medianas + Refresco',
      '15 Minutos de cortesía en Ninja Park',
    ],
  },
  young: {
    id: 'prize-young',
    ageGroup: 'young',
    title: '¡Conquistador Urbano!',
    headline: 'Cupón 20% OFF en Stradivarius / Bershka + 150 Puntos Loyalty',
    description: 'Completaste el Reto Urbano contrarreloj con conocimiento perfecto de marcas y tecnología.',
    sponsor: 'Inditex & Mall OS Loyalty',
    sponsorStoreId: 'local_60',
    badge: '💎 VIP DIAMOND',
    icon: 'sparkles',
    codePrefix: 'YNG',
    validDays: 7,
    perks: [
      '20% de descuento en tu compra sobre $30',
      '150 Puntos dobles acreditados al monedero',
      'Insignia digital exclusiva en tu perfil',
    ],
  },
};
