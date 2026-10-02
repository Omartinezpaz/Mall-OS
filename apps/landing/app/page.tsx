import React from 'react';

export default function LandingPage() {
  return (
    <main
      style={{
        maxWidth: 1000,
        margin: '0 auto',
        padding: '60px 20px',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Hero Section */}
      <header style={{ textAlign: 'center', marginBottom: 50 }}>
        <div
          style={{
            display: 'inline-block',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid #10b981',
            color: '#34d399',
            padding: '6px 14px',
            borderRadius: 20,
            fontSize: '0.8rem',
            fontWeight: 800,
            letterSpacing: '1px',
            marginBottom: 18,
          }}
        >
          🚀 PILOTO OFICIAL EN MARCHA
        </div>

        <h1
          style={{
            fontSize: '3.2rem',
            fontWeight: 900,
            letterSpacing: '-1px',
            marginBottom: 16,
            color: '#f8fafc',
            lineHeight: 1.15,
          }}
        >
          Mall OS <span style={{ color: '#10b981' }}>Los Nuevos Teques</span>
        </h1>

        <p
          style={{
            fontSize: '1.25rem',
            color: '#94a3b8',
            maxWidth: 680,
            margin: '0 auto 28px auto',
            lineHeight: 1.6,
          }}
        >
          La capa digital oficial de tu centro comercial: directorio completo, mapa offline, asistente virtual IA
          y promociones exclusivas sin fricción de descarga pesada.
        </p>

        {/* Botón de Descarga APK Directa */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
          <a
            href="https://expo.dev"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              backgroundColor: '#10b981',
              color: '#0f172a',
              padding: '16px 28px',
              borderRadius: 12,
              fontSize: '1.05rem',
              fontWeight: 800,
              textDecoration: 'none',
              boxShadow: '0 10px 20px -5px rgba(16, 185, 129, 0.4)',
            }}
          >
            📲 Descargar App Android (APK Directo)
          </a>
        </div>
      </header>

      {/* Pilares de la Plataforma */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
          margin: '60px 0',
        }}
      >
        <div
          style={{
            backgroundColor: '#1e293b',
            padding: 28,
            borderRadius: 16,
            border: '1px solid #334155',
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: 12 }}>🛍️</div>
          <h3 style={{ color: '#f8fafc', fontSize: '1.2rem', fontWeight: 800, marginTop: 0 }}>
            Para el Visitante
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Acceso instantáneo a los 30 comercios del centro comercial, planos por pisos que funcionan sin
            conexión a internet y cupones de un solo toque.
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#1e293b',
            padding: 28,
            borderRadius: 16,
            border: '1px solid #334155',
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: 12 }}>🏪</div>
          <h3 style={{ color: '#f8fafc', fontSize: '1.2rem', fontWeight: 800, marginTop: 0 }}>
            Para los Comercios
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Herramienta rápida y sin comisiones para promocionar productos, atraer clientes presenciales y validar
            códigos en caja en menos de 2 segundos.
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#1e293b',
            padding: 28,
            borderRadius: 16,
            border: '1px solid #334155',
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: 12 }}>📊</div>
          <h3 style={{ color: '#f8fafc', fontSize: '1.2rem', fontWeight: 800, marginTop: 0 }}>
            Para la Junta del Mall
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Visibilidad sobre la afluencia de compradores, flujo por niveles y aprobación centralizada de campañas
            con métricas de conversión verificadas.
          </p>
        </div>
      </section>

      {/* Footer y Enlaces Legales */}
      <footer
        style={{
          marginTop: 80,
          borderTop: '1px solid #334155',
          paddingTop: 30,
          textAlign: 'center',
          fontSize: '0.875rem',
          color: '#64748b',
        }}
      >
        <p style={{ margin: '0 0 10px 0' }}>© 2026 Mall OS · CC Los Nuevos Teques. Todos los derechos reservados.</p>
        <p style={{ margin: 0 }}>
          <a href="/privacidad" style={{ color: '#10b981', marginRight: 24, textDecoration: 'none' }}>
            Política de Privacidad
          </a>
          <a href="/terminos" style={{ color: '#10b981', textDecoration: 'none' }}>
            Términos y Condiciones
          </a>
        </p>
      </footer>
    </main>
  );
}
