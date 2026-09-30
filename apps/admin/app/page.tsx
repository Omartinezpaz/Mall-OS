import React from 'react';

export default function AdminIndexPage() {
  return (
    <main style={{ maxWidth: 800, margin: '100px auto', padding: 20, textAlign: 'center' }}>
      <h1 style={{ color: '#10b981', fontSize: '2.5rem' }}>Portal de Administración Mall OS</h1>
      <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: 40 }}>
        Seleccione el portal correspondiente para iniciar sesión
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <a href="/login?role=mall" style={{ textDecoration: 'none', backgroundColor: '#1e293b', border: '1px solid #334155', padding: 30, borderRadius: 12, color: '#f8fafc' }}>
          <h2 style={{ color: '#34d399', margin: '0 0 10px 0' }}>🏢 Junta / Mall</h2>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>Gestión de locales, revisión de ofertas y métricas de afluencia.</p>
        </a>

        <a href="/login?role=tenant" style={{ textDecoration: 'none', backgroundColor: '#1e293b', border: '1px solid #334155', padding: 30, borderRadius: 12, color: '#f8fafc' }}>
          <h2 style={{ color: '#34d399', margin: '0 0 10px 0' }}>🏪 Comercio / Tenant</h2>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>Creación de promociones y escaneo de cupones en caja.</p>
        </a>
      </div>
    </main>
  );
}
