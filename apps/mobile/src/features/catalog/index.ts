export interface CatalogProduct {
  id: string;
  storeId: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  image: string;
  description: string;
  sizes?: string[];
  inStock: boolean;
  storeLocationSnippet: string;
}

export const STORE_CATALOGS: Record<string, CatalogProduct[]> = {
  // ==========================================
  // ZARA & MODA INTERNACIONAL
  // ==========================================
  zara: [
    {
      id: 'zara-01',
      storeId: 'zara',
      title: 'Gabardina Minimalist',
      category: 'Abrigos',
      price: 129.90,
      originalPrice: 159.90,
      badge: 'NUEVA COLECCIÓN',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=700&auto=format&fit=crop&q=80',
      description: 'Gabardina cruzada confeccionada en tejido mezcla de algodón técnico. Cuello solapa amplio y manga larga con trabillas.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      inStock: true,
      storeLocationSnippet: 'Sección Woman · Pasillo Central',
    },
    {
      id: 'zara-02',
      storeId: 'zara',
      title: 'Botas Urban Leather',
      category: 'Calzado',
      price: 89.00,
      badge: 'BEST SELLER',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=700&auto=format&fit=crop&q=80',
      description: 'Bota alta en piel 100% vacuna con cierre frontal de cremallera metálica y suela track dentada ultra ligera.',
      sizes: ['36', '37', '38', '39', '40'],
      inStock: true,
      storeLocationSnippet: 'Zona Calzado Premium',
    },
    {
      id: 'zara-03',
      storeId: 'zara',
      title: 'Blazer Tailored Fit',
      category: 'Sastrería',
      price: 99.95,
      originalPrice: 120.00,
      badge: '-20% OFF',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=700&auto=format&fit=crop&q=80',
      description: 'Blazer entallado con cuello solapa de muesca y hombreras marcadas. Cierre frontal con botón forrado.',
      sizes: ['S', 'M', 'L'],
      inStock: true,
      storeLocationSnippet: 'Colección Man & Smart Casual',
    },
    {
      id: 'zara-04',
      storeId: 'zara',
      title: 'Bolso Tote Estructurado',
      category: 'Accesorios',
      price: 49.90,
      badge: 'TENDENCIA',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700&auto=format&fit=crop&q=80',
      description: 'Bolso formato tote con acabado granulado y doble asa de mano. Bandolera ajustable y extraíble.',
      sizes: ['Única'],
      inStock: true,
      storeLocationSnippet: 'Isla de Accesorios · Entrada',
    },
    {
      id: 'zara-05',
      storeId: 'zara',
      title: 'Vestido Midi Plisado',
      category: 'Vestidos',
      price: 79.90,
      badge: 'EXCLUSIVO',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&auto=format&fit=crop&q=80',
      description: 'Vestido de escote recto y tirantes finos. Detalle de tejido fluido plisado en bajo evasé.',
      sizes: ['XS', 'S', 'M', 'L'],
      inStock: true,
      storeLocationSnippet: 'Sección Woman Eventos',
    },
  ],

  // ==========================================
  // SKECHERS
  // ==========================================
  skechers: [
    {
      id: 'sk-01',
      storeId: 'skechers',
      title: 'Skechers D\'Lites Fresh Start',
      category: 'Sneakers',
      price: 85.00,
      originalPrice: 95.00,
      badge: 'TOP VENTAS',
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=700&auto=format&fit=crop&q=80',
      description: 'El clásico diseño icónico con plantilla Air-Cooled Memory Foam y entresuela ligera de absorción de impactos.',
      sizes: ['36', '37', '38', '39', '40', '41'],
      inStock: true,
      storeLocationSnippet: 'Muro Principal de Calzado Dama',
    },
    {
      id: 'sk-02',
      storeId: 'skechers',
      title: 'Go Walk Arch Fit Dynamic',
      category: 'Walking',
      price: 92.00,
      badge: 'CONFORT CERTIFICADO',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=700&auto=format&fit=crop&q=80',
      description: 'Soporte de arco plantar certificado por podólogos. Amortiguación ULTRA GO ligera y reactiva.',
      sizes: ['38', '39', '40', '41', '42', '43', '44'],
      inStock: true,
      storeLocationSnippet: 'Sección Walking & Sport',
    },
    {
      id: 'sk-03',
      storeId: 'skechers',
      title: 'Uno - Stand on Air',
      category: 'Sneakers Urban',
      price: 89.90,
      badge: 'MODA URBANA',
      image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=700&auto=format&fit=crop&q=80',
      description: 'Cámara de aire visible Skech-Air en el talón con parte superior sintética perforada lisa durabuck.',
      sizes: ['37', '38', '39', '40', '41', '42'],
      inStock: true,
      storeLocationSnippet: 'Línea Streetwear',
    },
    {
      id: 'sk-04',
      storeId: 'skechers',
      title: 'Skechers Slip-ins Hands Free',
      category: 'Innovación',
      price: 105.00,
      badge: 'NUEVA TECNOLOGÍA',
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=700&auto=format&fit=crop&q=80',
      description: 'Ponte tus zapatos sin agacharte ni usar las manos con la talonera moldeada Heel Pillow.',
      sizes: ['38', '39', '40', '41', '42', '43'],
      inStock: true,
      storeLocationSnippet: 'Módulo de Prueba Touchless',
    },
  ],

  // ==========================================
  // NIKE STORE SAMBIL
  // ==========================================
  nike_sambil: [
    {
      id: 'nike-01',
      storeId: 'nike_sambil',
      title: 'Nike Air Max Pulse Roam',
      category: 'Running & Street',
      price: 159.00,
      originalPrice: 179.00,
      badge: 'LANZAMIENTO',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&auto=format&fit=crop&q=80',
      description: 'Inspiradas en la escena musical underground, combinan durabilidad urbana y amortiguación Air Max envolvente.',
      sizes: ['39', '40', '41', '42', '43', '44', '45'],
      inStock: true,
      storeLocationSnippet: 'Podio Central Air Max',
    },
    {
      id: 'nike-02',
      storeId: 'nike_sambil',
      title: 'Tech Fleece Windrunner Hoodie',
      category: 'Indumentaria',
      price: 120.00,
      badge: 'BEST SELLER',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=700&auto=format&fit=crop&q=80',
      description: 'Tejido Fleece premium ligero por ambos lados que ofrece calidez sin añadir volumen.',
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: true,
      storeLocationSnippet: 'Muro Tech Fleece Apparel',
    },
  ],

  // ==========================================
  // SAMSUNG EXPERIENCE STORE
  // ==========================================
  samsung: [
    {
      id: 'sam-01',
      storeId: 'samsung',
      title: 'Galaxy S24 Ultra 512GB Titanium',
      category: 'Smartphones',
      price: 1299.00,
      badge: 'GALAXY AI',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700&auto=format&fit=crop&q=80',
      description: 'Carcasa de titanio, pantalla Dynamic AMOLED 2X de 6.8", cámara de 200MP y funciones de inteligencia artificial.',
      sizes: ['256GB', '512GB', '1TB'],
      inStock: true,
      storeLocationSnippet: 'Mesa de Experiencia Flagship',
    },
    {
      id: 'sam-02',
      storeId: 'samsung',
      title: 'Galaxy Watch6 Classic 47mm',
      category: 'Wearables',
      price: 349.00,
      badge: 'SALUD AVANZADA',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&auto=format&fit=crop&q=80',
      description: 'Bisel giratorio físico icónico, monitoreo de sueño guiado y sensor de composición corporal BIA.',
      sizes: ['43mm', '47mm'],
      inStock: true,
      storeLocationSnippet: 'Isla Wearables & Audio',
    },
  ],

  // ==========================================
  // FARMATODO
  // ==========================================
  farmatodo: [
    {
      id: 'ft-01',
      storeId: 'farmatodo',
      title: 'Serum Ácido Hialurónico Revitalift',
      category: 'Cuidado Facial',
      price: 22.50,
      originalPrice: 28.00,
      badge: '2X1 SELECCIÓN',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=700&auto=format&fit=crop&q=80',
      description: 'Tratamiento antiarrugas con 1.5% de ácido hialurónico puro que hidrata intensamente y rellena líneas de expresión.',
      sizes: ['30ml'],
      inStock: true,
      storeLocationSnippet: 'Pasillo 2 · Dermocosmética',
    },
    {
      id: 'ft-02',
      storeId: 'farmatodo',
      title: 'Anthelios UVMune 400 FPS 50+',
      category: 'Protección Solar',
      price: 28.00,
      badge: 'TOP VENTAS',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=700&auto=format&fit=crop&q=80',
      description: 'Fluido invisible de ultra alta protección contra rayos UV con acabado no graso y resistente al agua.',
      sizes: ['50ml'],
      inStock: true,
      storeLocationSnippet: 'Zona Bloqueadores y Cuidado Solar',
    },
    {
      id: 'ft-03',
      storeId: 'farmatodo',
      title: 'Crema Hidratante Cerave 454g',
      category: 'Dermatología',
      price: 24.90,
      badge: 'RECOMENDADO',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=700&auto=format&fit=crop&q=80',
      description: 'Fórmula enriquecida con 3 ceramidas esenciales y ácido hialurónico que restaura la barrera protectora de la piel.',
      sizes: ['454g'],
      inStock: true,
      storeLocationSnippet: 'Isla Cuidado Dermatológico',
    },
    {
      id: 'ft-04',
      storeId: 'farmatodo',
      title: 'Agua Micelar Bioderma Sensibio 500ml',
      category: 'Limpieza Facial',
      price: 19.00,
      badge: 'PIEL SENSIBLE',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=700&auto=format&fit=crop&q=80',
      description: 'Agua micelar dermatológica que desmaquilla, limpia y calma respetando el equilibrio fisiológico de la piel.',
      sizes: ['500ml'],
      inStock: true,
      storeLocationSnippet: 'Pasillo 1 · Limpieza Facial',
    },
  ],

  // ==========================================
  // CINES UNIDOS
  // ==========================================
  cines_unidos: [
    {
      id: 'cu-01',
      storeId: 'cines_unidos',
      title: 'Boleto Formato 2D Digital',
      category: 'Boletos',
      price: 5.00,
      badge: 'ESTRENO',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=700&auto=format&fit=crop&q=80',
      description: 'Acceso a salas digitales con sonido Dolby Atmos envolvente y butacas reclinables.',
      sizes: ['General', 'Niños / 3ra Edad'],
      inStock: true,
      storeLocationSnippet: 'Taquilla Principal · Nivel Diversión',
    },
    {
      id: 'cu-02',
      storeId: 'cines_unidos',
      title: 'Combo Maxi Cotufas & 2 Bebidas',
      category: 'Confitería',
      price: 12.50,
      originalPrice: 15.00,
      badge: 'COMBO FAVORITO',
      image: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=700&auto=format&fit=crop&q=80',
      description: 'Cotufas gigantes mantequilla o mixtas con 2 refrescos grandes de 32oz y dispensador libre.',
      sizes: ['Grande', 'Maxi'],
      inStock: true,
      storeLocationSnippet: 'Dulcería y Candy Bar',
    },
    {
      id: 'cu-03',
      storeId: 'cines_unidos',
      title: 'Nachos con Queso Cheddar & Jalapeños',
      category: 'Snacks Calientes',
      price: 7.50,
      badge: 'CRUJIENTE',
      image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=700&auto=format&fit=crop&q=80',
      description: 'Totopos de maíz horneados con abundante queso cheddar fundido y rodajas de jalapeño.',
      sizes: ['Porción Doble'],
      inStock: true,
      storeLocationSnippet: 'Barra Caliente de Confitería',
    },
  ],

  // ==========================================
  // TIENDAS TIJERAZO
  // ==========================================
  tijerazo: [
    {
      id: 'tij-01',
      storeId: 'tijerazo',
      title: 'Juego de Sábanas 400 Hilos Queen',
      category: 'Hogar & Dormitorio',
      price: 39.90,
      originalPrice: 52.00,
      badge: 'DESTACADO HOGAR',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=700&auto=format&fit=crop&q=80',
      description: 'Confeccionadas en suave microfibra satinada ultra transpirable que no se arruga ni destiñe.',
      sizes: ['Twin', 'Full', 'Queen', 'King'],
      inStock: true,
      storeLocationSnippet: 'Dpto. Hogar · Planta Baja',
    },
    {
      id: 'tij-02',
      storeId: 'tijerazo',
      title: 'Set de Toallas Algodón 4 Piezas',
      category: 'Baño',
      price: 25.00,
      badge: '100% ALGODÓN',
      image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=700&auto=format&fit=crop&q=80',
      description: 'Toallas de baño de alto gramaje con absorción superior y secado rápido.',
      sizes: ['Set Completo'],
      inStock: true,
      storeLocationSnippet: 'Pasillo Blancos y Baño',
    },
    {
      id: 'tij-03',
      storeId: 'tijerazo',
      title: 'Vajilla de Cerámica 16 Piezas',
      category: 'Cocina y Mesa',
      price: 55.00,
      badge: 'NUEVA LÍNEA',
      image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=700&auto=format&fit=crop&q=80',
      description: 'Servicio para 4 personas con platos llanos, hondos, de postre y tazas de cerámica esmaltada.',
      sizes: ['16 Piezas'],
      inStock: true,
      storeLocationSnippet: 'Sección Menaje y Cristalería',
    },
  ],

  // ==========================================
  // BANCO NACIONAL DE CRÉDITO (BNC)
  // ==========================================
  bnc: [
    {
      id: 'bnc-01',
      storeId: 'bnc',
      title: 'Terminal Smart POS BNC 4G',
      category: 'Puntos de Venta',
      price: 149.00,
      badge: 'NEGOCIOS',
      image: 'https://images.unsplash.com/photo-1556742049-0a67e5572248?w=700&auto=format&fit=crop&q=80',
      description: 'Punto de venta táctil con impresora térmica integrada, liquidación inmediata y conexión 4G dual SIM.',
      sizes: ['Inalámbrico'],
      inStock: true,
      storeLocationSnippet: 'Área de Atención a Comercios',
    },
    {
      id: 'bnc-02',
      storeId: 'bnc',
      title: 'Tarjeta Débito Contactless BNC',
      category: 'Tarjetas',
      price: 10.00,
      badge: 'CHIP & NFC',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=700&auto=format&fit=crop&q=80',
      description: 'Emisión y entrega inmediata de tarjeta de débito con tecnología sin contacto para compras nacionales e internacionales.',
      sizes: ['Estándar'],
      inStock: true,
      storeLocationSnippet: 'Mesa de Atención al Cliente',
    },
  ],

  // ==========================================
  // BATH & BODY WORKS
  // ==========================================
  bath_body: [
    {
      id: 'bbw-01',
      storeId: 'bath_body',
      title: 'Vela Aromática 3 Pabilos Japanese Cherry',
      category: 'Velas & Hogar',
      price: 26.50,
      badge: 'BEST SELLER',
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=700&auto=format&fit=crop&q=80',
      description: 'Mezcla de cera de soya con aceites esenciales naturales que llenan tu hogar de aroma hasta por 45 horas.',
      sizes: ['411g (3 Wicks)'],
      inStock: true,
      storeLocationSnippet: 'Mesa Central de Velas',
    },
    {
      id: 'bbw-02',
      storeId: 'bath_body',
      title: 'Crema Corporal Ultra Shea Warm Vanilla',
      category: 'Cuidado Corporal',
      price: 17.50,
      badge: 'HIDRATACIÓN 24H',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=700&auto=format&fit=crop&q=80',
      description: 'Enriquecida con manteca de karité y ácido hialurónico para nutrir la piel dejándola suave y perfumada.',
      sizes: ['226g'],
      inStock: true,
      storeLocationSnippet: 'Muro de Body Creams',
    },
    {
      id: 'bbw-03',
      storeId: 'bath_body',
      title: 'Fragrance Mist In The Stars',
      category: 'Fragancias',
      price: 18.00,
      badge: 'BRILLO ESTELAR',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=700&auto=format&fit=crop&q=80',
      description: 'Rocío corporal refrescante con notas de flor de estrella, almizcle de sándalo y ámbar dorado.',
      sizes: ['236ml'],
      inStock: true,
      storeLocationSnippet: 'Exhibidor de Fragancias',
    },
  ],

  // ==========================================
  // BANCO PROVINCIAL (BBVA)
  // ==========================================
  banco_provincial: [
    {
      id: 'bp-01',
      storeId: 'banco_provincial',
      title: 'Emisión Tarjeta Débito BBVA Digital',
      category: 'Tarjetas',
      price: 10.00,
      badge: 'ENTREGA EXPRESS',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=700&auto=format&fit=crop&q=80',
      description: 'Tarjeta de débito internacional vinculada a tu cuenta Provinet con acceso a cajeros y compras en línea.',
      sizes: ['Física + Virtual'],
      inStock: true,
      storeLocationSnippet: 'Agencia Nivel Autopista · Local 77',
    },
    {
      id: 'bp-02',
      storeId: 'banco_provincial',
      title: 'POS Inalámbrico Android 4G',
      category: 'Servicios Comerciales',
      price: 150.00,
      badge: 'COMERCIOS',
      image: 'https://images.unsplash.com/photo-1556742049-0a67e5572248?w=700&auto=format&fit=crop&q=80',
      description: 'Dispositivo inteligente para procesar pagos con tarjeta de débito, crédito y pago móvil al instante.',
      sizes: ['Portátil'],
      inStock: true,
      storeLocationSnippet: 'Atención Empresas y Negocios',
    },
  ],

  // ==========================================
  // BANCO DEL TESORO
  // ==========================================
  banco_del_tesoro: [
    {
      id: 'bt-01',
      storeId: 'banco_del_tesoro',
      title: 'Tarjeta Débito Tesoro Contactless',
      category: 'Tarjetas',
      price: 8.00,
      badge: 'HABILITADA',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=700&auto=format&fit=crop&q=80',
      description: 'Disfruta de pagos inmediatos en puntos de venta y retiros en cajeros de toda la red nacional.',
      sizes: ['Plástico'],
      inStock: true,
      storeLocationSnippet: 'Taquilla de Emisión · Local 18',
    },
  ],

  // ==========================================
  // PALACIO DEL BLUMER
  // ==========================================
  palacio_del_blumer: [
    {
      id: 'pb-01',
      storeId: 'palacio_del_blumer',
      title: 'Conjunto Bralette & Panty Encaje Royal',
      category: 'Lencería Fina',
      price: 24.00,
      badge: 'SEDUCCIÓN',
      image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=700&auto=format&fit=crop&q=80',
      description: 'Confeccionado en encaje suave con soporte ergonómico sin varillas y copa acolchada ligera.',
      sizes: ['32B', '34B', '36B', '38B'],
      inStock: true,
      storeLocationSnippet: 'Exhibidor Central de Lencería',
    },
    {
      id: 'pb-02',
      storeId: 'palacio_del_blumer',
      title: 'Pijama Satinada Silk Touch 2 Piezas',
      category: 'Ropa de Dormir',
      price: 32.00,
      badge: 'CONFORT TOTAL',
      image: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=700&auto=format&fit=crop&q=80',
      description: 'Camisa manga corta abotonada y pantalón corto en suave satén sedoso con ribetes a contraste.',
      sizes: ['S', 'M', 'L'],
      inStock: true,
      storeLocationSnippet: 'Sección Sleepwear y Descanso',
    },
  ],

  // ==========================================
  // LIAH SPA
  // ==========================================
  liah_spa: [
    {
      id: 'ls-01',
      storeId: 'liah_spa',
      title: 'Limpieza Facial Hidrodermoabrasión',
      category: 'Cuidado Facial',
      price: 45.00,
      badge: 'TRATAMIENTO ESTRELLA',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=700&auto=format&fit=crop&q=80',
      description: 'Extracción indolora con infusión de sueros hidratantes, mascarilla descongestiva y terapia LED.',
      sizes: ['Sesión 60 min'],
      inStock: true,
      storeLocationSnippet: 'Cabina Facial 1 · Local 1',
    },
    {
      id: 'ls-02',
      storeId: 'liah_spa',
      title: 'Masaje Relajante Piedras Calientes',
      category: 'Corporal & Masajes',
      price: 50.00,
      badge: 'RELAX TOTAL',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&auto=format&fit=crop&q=80',
      description: 'Alivio de tensiones y contracturas musculares con aceites aromáticos tibios y piedras volcánicas.',
      sizes: ['Sesión 60 min'],
      inStock: true,
      storeLocationSnippet: 'Cabina de Masajes Spa',
    },
  ],

  // ==========================================
  // SANSA
  // ==========================================
  sansa: [
    {
      id: 'san-01',
      storeId: 'sansa',
      title: 'Sandalias Plataforma Cuero Nude',
      category: 'Calzado Femenino',
      price: 48.00,
      badge: 'NUEVA TEMPORADA',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=700&auto=format&fit=crop&q=80',
      description: 'Sandalia con tacón de cuña ultraligero y correas de piel genuina con hebilla ajustable.',
      sizes: ['36', '37', '38', '39', '40'],
      inStock: true,
      storeLocationSnippet: 'Muro Principal Calzado Dama',
    },
    {
      id: 'san-02',
      storeId: 'sansa',
      title: 'Mocasines Confort Soft Leather',
      category: 'Casual Chic',
      price: 44.00,
      badge: 'CONFORT',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=700&auto=format&fit=crop&q=80',
      description: 'Mocasín clásico con suela flexible antiresbalante y plantilla acolchada para todo el día.',
      sizes: ['36', '37', '38', '39'],
      inStock: true,
      storeLocationSnippet: 'Estante Calzado Casual',
    },
  ],
};

/**
 * Obtiene los productos del catálogo de una tienda con generación automática si no está predefinida.
 */
export function getStoreCatalog(storeId: string, storeName?: string, categorySlug?: string): CatalogProduct[] {
  const normalizedId = storeId.toLowerCase().replace(/-/g, '_');

  const aliasMap: Record<string, string> = {
    local_farmatodo: 'farmatodo',
    farmatodo: 'farmatodo',
    st_pb_01: 'zara',
    zara: 'zara',
    st_pb_02: 'nike_sambil',
    nike: 'nike_sambil',
    nike_sambil: 'nike_sambil',
    local_cines_unidos: 'cines_unidos',
    cines_unidos: 'cines_unidos',
    local_4: 'tijerazo',
    tijerazo: 'tijerazo',
    local_bnc: 'bnc',
    local_110: 'bnc',
    bnc: 'bnc',
    local_9: 'bath_body',
    bath_body: 'bath_body',
    bath_body_works: 'bath_body',
    local_77: 'banco_provincial',
    banco_provincial: 'banco_provincial',
    provincial: 'banco_provincial',
    local_18: 'banco_del_tesoro',
    banco_del_tesoro: 'banco_del_tesoro',
    tesoro: 'banco_del_tesoro',
    local_8: 'palacio_del_blumer',
    palacio_del_blumer: 'palacio_del_blumer',
    local_1: 'liah_spa',
    liah_spa: 'liah_spa',
    local_10: 'sansa',
    sansa: 'sansa',
  };

  const targetKey = aliasMap[normalizedId] || normalizedId;
  if (STORE_CATALOGS[targetKey]) {
    return STORE_CATALOGS[targetKey];
  }

  // Comprobar si hay catálogo por alias (ej. skechers_feria -> skechers)
  for (const key of Object.keys(STORE_CATALOGS)) {
    if (normalizedId.includes(key)) {
      return STORE_CATALOGS[key];
    }
  }

  const name = storeName || 'Tienda Oficial';
  const isFood = categorySlug === 'food';
  const isTech = categorySlug === 'technology';

  if (isFood) {
    return [
      {
        id: `${storeId}-f1`,
        storeId,
        title: `Especialidad ${name}`,
        category: 'Platos Fuertes',
        price: 14.50,
        badge: 'RECOMENDADO',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&auto=format&fit=crop&q=80',
        description: 'Preparado al momento con ingredientes frescos de primera calidad y receta de autor.',
        inStock: true,
        storeLocationSnippet: 'Barra y Sala Principal',
      },
      {
        id: `${storeId}-f2`,
        storeId,
        title: 'Bebida Refrescante Signature',
        category: 'Bebidas',
        price: 4.50,
        badge: 'FAVORITO',
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=700&auto=format&fit=crop&q=80',
        description: 'Combinación artesanal de frutas y toques cítricos, perfecta para acompañar tu orden.',
        inStock: true,
        storeLocationSnippet: 'Barra de Bebidas',
      },
    ];
  }

  if (isTech) {
    return [
      {
        id: `${storeId}-t1`,
        storeId,
        title: `Accesorio Pro Max ${name}`,
        category: 'Gadgets',
        price: 49.99,
        badge: 'GARANTÍA OFICIAL',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80',
        description: 'Máximo rendimiento, conectividad inalámbrica de ultra baja latencia y acabados ergonómicos.',
        inStock: true,
        storeLocationSnippet: 'Vitrina de Novedades Tecnológicas',
      },
    ];
  }

  // Generación estándar para moda y retail general
  return [
    {
      id: `${storeId}-gen-01`,
      storeId,
      title: `Colección Signature ${name}`,
      category: 'Temporada',
      price: 59.90,
      originalPrice: 75.00,
      badge: 'DESTACADO',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=700&auto=format&fit=crop&q=80',
      description: 'Prenda exclusiva diseñada con los más altos estándares de calidad y estilo contemporáneo.',
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: true,
      storeLocationSnippet: 'Exhibidor Central de Tienda',
    },
    {
      id: `${storeId}-gen-02`,
      storeId,
      title: 'Accesorio Essential Premium',
      category: 'Complementos',
      price: 34.00,
      badge: 'TOP VENTAS',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&auto=format&fit=crop&q=80',
      description: 'El complemento perfecto para tu día a día, funcional, duradero y de diseño refinado.',
      sizes: ['Único'],
      inStock: true,
      storeLocationSnippet: 'Mostrador y Zona de Accesorios',
    },
  ];
}
