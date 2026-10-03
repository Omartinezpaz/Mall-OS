/**
 * @mallos/design-tokens - Brand Assets & Category Definitions
 * Definición completa de activos de marca, categorías oficiales, paleta de colores y metadatos visuales.
 */

export interface CategoryDefinition {
  slug: string;
  name: string;
  countLabel: string;
  iconName: string;
  color: string;
  bgColor: string;
  image: string;
}

export const OFFICIAL_CATEGORIES: CategoryDefinition[] = [
  {
    slug: 'moda',
    name: 'Moda',
    countLabel: '45 tiendas',
    iconName: 'hanger',
    color: '#6366F1', // Indigo
    bgColor: 'rgba(99, 102, 241, 0.15)',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'restaurantes',
    name: 'Restaurantes',
    countLabel: '28 restaurantes',
    iconName: 'utensils',
    color: '#F97316', // Orange
    bgColor: 'rgba(249, 115, 22, 0.15)',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'entretenimiento',
    name: 'Entretenimiento',
    countLabel: '8 opciones',
    iconName: 'ticket',
    color: '#EC4899', // Pink
    bgColor: 'rgba(236, 72, 153, 0.15)',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'belleza',
    name: 'Belleza',
    countLabel: '12 opciones',
    iconName: 'lotus',
    color: '#A855F7', // Purple
    bgColor: 'rgba(168, 85, 247, 0.15)',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'tecnologia',
    name: 'Tecnología',
    countLabel: '15 tiendas',
    iconName: 'smartphone',
    color: '#06B6D4', // Cyan
    bgColor: 'rgba(6, 182, 212, 0.15)',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'deportes',
    name: 'Deportes',
    countLabel: '10 tiendas',
    iconName: 'dumbbell',
    color: '#10B981', // Emerald
    bgColor: 'rgba(16, 185, 129, 0.15)',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'hogar',
    name: 'Hogar',
    countLabel: '9 tiendas',
    iconName: 'home',
    color: '#14B8A6', // Teal
    bgColor: 'rgba(20, 184, 166, 0.15)',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'salud',
    name: 'Salud',
    countLabel: '6 servicios',
    iconName: 'cross',
    color: '#EF4444', // Red
    bgColor: 'rgba(239, 68, 68, 0.15)',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'servicios',
    name: 'Servicios',
    countLabel: '14 opciones',
    iconName: 'settings',
    color: '#64748B', // Slate
    bgColor: 'rgba(100, 116, 139, 0.15)',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&auto=format&fit=crop&q=80',
  },
  {
    slug: 'finanzas',
    name: 'Finanzas',
    countLabel: '7 bancos/cajeros',
    iconName: 'credit-card',
    color: '#F59E0B', // Amber
    bgColor: 'rgba(245, 158, 11, 0.15)',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80',
  },
];

export const CONTEXT_CARDS = [
  {
    id: 'explore',
    title: 'Explora el mall',
    description: 'Encuentra tiendas, restaurantes y mucho más.',
    icon: '🧭',
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'navigate',
    title: 'Llega fácilmente',
    description: 'Sigue la mejor ruta hasta tu destino en 2.5D.',
    icon: '📍',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'offers',
    title: 'Descubre ofertas',
    description: 'Accede a promociones exclusivas en tiempo real.',
    icon: '🏷️',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'concierge',
    title: 'AI Concierge',
    description: 'Tu asistente personal inteligente en el mall.',
    icon: '✨',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
  },
];
