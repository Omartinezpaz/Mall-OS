import React from 'react';

export const metadata = {
  title: 'Mall OS — Portal de Administración',
  description: 'Panel de gestión para juntas de condominio y comercios',
};

export default function AdminRootLayout({
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
