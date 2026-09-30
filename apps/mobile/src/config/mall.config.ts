export interface MallConfig {
  slug: string;
  name: string;
  primaryColor: string;
  accentColor: string;
  currency: string;
  locale: string;
}

export const defaultMallConfig: MallConfig = {
  slug: 'los-nuevos-teques',
  name: 'Mall OS Los Nuevos Teques',
  primaryColor: '#0F172A',
  accentColor: '#10B981',
  currency: 'USD',
  locale: 'es-VE',
};
