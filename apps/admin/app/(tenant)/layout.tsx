import React from 'react';

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: 250, backgroundColor: '#1e293b', borderRight: '1px solid #334155', padding: 20 }}>
        <h3 style={{ color: '#10b981', margin: '0 0 30px 0' }}>Portal Tenant</h3>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <a href="/mis-ofertas" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '8px 12px', borderRadius: 6 }}>🎟️ Mis Ofertas</a>
          <a href="/canje" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '8px 12px', borderRadius: 6 }}>📷 Canjear Cupón (Caja)</a>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: 30 }}>
        {children}
      </main>
    </div>
  );
}
