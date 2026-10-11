import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mall OS — El Sistema Operativo para Grandes Centros Comerciales',
  description: 'Plataforma empresarial de inteligencia retail y navegación asistida que conecta a visitantes, locatarios y juntas directivas de centros comerciales en tiempo real.',
  keywords: ['Mall OS', 'Centros Comerciales', 'Retail Tech', 'Sambil', 'La Cascada', 'Navegación 2.5D', 'Conserje IA'],
  openGraph: {
    title: 'Mall OS — El Sistema Operativo para Grandes Centros Comerciales',
    description: 'Transformamos la experiencia presencial en centros comerciales mediante navegación GPU 2.5D, catálogos en vivo y métricas de afluencia para locatarios.',
    url: 'https://mall-os.vercel.app',
    siteName: 'Mall OS',
    locale: 'es_VE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-brand-500 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
