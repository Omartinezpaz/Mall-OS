import React from 'react';

export const metadata = {
  title: 'Mall OS — Sistema Operativo Digital para Centros Comerciales',
  description: 'Conectando shoppers, locales y administración de centros comerciales.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#0f172a', color: '#f8fafc' }}>
        {children}
      </body>
    </html>
  );
}
