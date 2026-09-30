import React from 'react';

export default function LandingPage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
      <header style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: 16, color: '#10b981' }}>
          Mall OS
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: 650, margin: '0 auto' }}>
          La plataforma digital que transforma centros comerciales en ecosistemas conectados, ágiles y orientados a resultados.
        </p>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, margin: '60px 0', textAlign: 'left' }}>
        <div style={{ backgroundColor: '#1e293b', padding: 24, borderRadius: 12, border: '1px solid #334155' }}>
          <h3 style={{ color: '#34d399', marginTop: 0 }}>🛍️ Para el Shopper</h3>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
            Directorio completo, mapa interactivo offline por pisos, asistente virtual IA y cupones exclusivos de un solo toque.
          </p>
        </div>

        <div style={{ backgroundColor: '#1e293b', padding: 24, borderRadius: 12, border: '1px solid #334155' }}>
          <h3 style={{ color: '#34d399', marginTop: 0 }}>🏪 Para el Comercio</h3>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
            Portal ultra-simple para publicar promociones y validar cupones en caja mediante escaneo QR con la cámara.
          </p>
        </div>

        <div style={{ backgroundColor: '#1e293b', padding: 24, borderRadius: 12, border: '1px solid #334155' }}>
          <h3 style={{ color: '#34d399', marginTop: 0 }}>📊 Para el Mall</h3>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
            Métricas de afluencia, flujo de visitantes, búsquedas populares y aprobación centralizada de campañas.
          </p>
        </div>
      </section>

      <footer style={{ marginTop: 80, borderTop: '1px solid #334155', paddingTop: 20, fontSize: '0.875rem', color: '#64748b' }}>
        <p>© 2026 Mall OS. Todos los derechos reservados.</p>
        <p>
          <a href="/privacidad" style={{ color: '#10b981', marginRight: 20 }}>Política de Privacidad</a>
          <a href="/terminos" style={{ color: '#10b981' }}>Términos y Condiciones</a>
        </p>
      </footer>
    </main>
  );
}
