import React from 'react';

export default function MallLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0A0F1D' }}>
      <aside style={{ width: 260, backgroundColor: '#111B2E', borderRight: '1px solid rgba(255, 255, 255, 0.08)', padding: '24px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, paddingLeft: 6 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', display: 'grid', placeItems: 'center', color: '#FFF', fontWeight: 900, fontSize: 16 }}>
              M
            </div>
            <div>
              <h3 style={{ color: '#F8FAFC', margin: 0, fontSize: '1.05rem', fontWeight: 800 }}>Mall OS</h3>
              <span style={{ color: '#818CF8', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Administration</span>
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <a href="/locales" style={{ color: '#CBD5E1', textDecoration: 'none', padding: '10px 14px', borderRadius: 10, fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10, backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
              🏢 Locales
            </a>
            <a href="/ofertas-revision" style={{ color: '#CBD5E1', textDecoration: 'none', padding: '10px 14px', borderRadius: 10, fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10, backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
              ⏳ Revisión de Ofertas
            </a>
            <a href="/metricas" style={{ color: '#FFFFFF', textDecoration: 'none', padding: '10px 14px', borderRadius: 10, fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10, backgroundColor: 'rgba(79, 70, 229, 0.2)', border: '1px solid #4F46E5' }}>
              📈 Métricas del Funnel
            </a>
          </nav>
        </div>

        <div style={{ padding: '14px', borderRadius: 12, backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <p style={{ color: '#94A3B8', fontSize: '0.75rem', margin: '0 0 4px 0', fontWeight: 600 }}>Centro Comercial</p>
          <p style={{ color: '#F8FAFC', fontSize: '0.85rem', margin: 0, fontWeight: 700 }}>Los Nuevos Teques</p>
        </div>
      </aside>

      <main style={{ flex: 1, padding: '36px 40px', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
