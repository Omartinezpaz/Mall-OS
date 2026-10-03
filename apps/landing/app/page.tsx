import React from 'react';

const CONTEXT_PILLARS = [
  {
    title: 'Explora el mall',
    desc: 'Encuentra tiendas, restaurantes, servicios y horarios en segundos sin fricción.',
    icon: '🧭',
    badge: 'Directorio Offline',
  },
  {
    title: 'Llega fácilmente',
    desc: 'Mapa interactivo 2.5D con rutas inteligentes paso a paso y selección de niveles.',
    icon: '📍',
    badge: 'Navegación 2.5D',
  },
  {
    title: 'Descubre ofertas',
    desc: 'Accede a cupones y promociones exclusivas con canje instantáneo vía código QR.',
    icon: '🏷️',
    badge: 'Cupones Dinámicos',
  },
  {
    title: 'AI Concierge',
    desc: 'Tu asistente personal inteligente disponible 24/7 para responder cualquier consulta.',
    icon: '✨',
    badge: 'Asistente IA',
  },
];

export default function LandingPage() {
  return (
    <main
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '60px 24px',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        color: '#F8FAFC',
      }}
    >
      {/* Navigation Header */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 60,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Logo SVG */}
          <svg width="40" height="40" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="lGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
              <linearGradient id="rGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
            <path d="M 24,96 C 18,80 18,48 30,34 C 42,20 54,34 54,54 C 54,74 38,98 24,96 Z" fill="url(#lGrad)" />
            <path d="M 36,44 C 48,28 60,40 60,60 C 60,84 48,96 42,94 C 36,92 32,80 36,44 Z" fill="#1E40AF" opacity="0.95" />
            <path d="M 60,60 C 60,40 72,28 84,44 C 88,80 84,92 78,94 C 72,96 60,84 60,60 Z" fill="url(#rGrad)" opacity="0.95" />
            <path d="M 96,96 C 82,98 66,74 66,54 C 66,34 78,20 90,34 C 102,48 102,80 96,96 Z" fill="url(#rGrad)" />
          </svg>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.5px' }}>Mall OS</div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>The Digital Layer of the Mall</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          <a
            href="https://bgncghyhyosugfnraoqm.supabase.co"
            target="_blank"
            rel="noreferrer"
            style={{
              color: '#94A3B8',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 600,
              padding: '8px 16px',
            }}
          >
            Portal Comercios
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={{ textAlign: 'center', marginBottom: 70 }}>
        <div
          style={{
            display: 'inline-block',
            backgroundColor: 'rgba(59, 130, 246, 0.15)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            color: '#60A5FA',
            padding: '6px 16px',
            borderRadius: 20,
            fontSize: '0.85rem',
            fontWeight: 800,
            letterSpacing: '0.5px',
            marginBottom: 20,
          }}
        >
          🚀 PILOTO OFICIAL · CC LOS NUEVOS TEQUES
        </div>

        <h1
          style={{
            fontSize: '3.6rem',
            fontWeight: 900,
            letterSpacing: '-1.5px',
            marginBottom: 20,
            color: '#FFFFFF',
            lineHeight: 1.12,
          }}
        >
          La capa digital de tu <br />
          <span style={{ color: '#3B82F6' }}>centro comercial favorito</span>
        </h1>

        <p
          style={{
            fontSize: '1.25rem',
            color: '#94A3B8',
            maxWidth: 680,
            margin: '0 auto 36px auto',
            lineHeight: 1.6,
          }}
        >
          Encuentra tiendas, navega con rutas 2.5D inteligentes, activa cupones con un toque
          y consulta al Concierge IA. Todo en la palma de tu mano.
        </p>

        {/* CTA Button */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          <a
            href="https://expo.dev"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              backgroundColor: '#3B82F6',
              color: '#FFFFFF',
              padding: '18px 36px',
              borderRadius: 16,
              fontSize: '1.1rem',
              fontWeight: 800,
              textDecoration: 'none',
              boxShadow: '0 12px 24px -6px rgba(59, 130, 246, 0.5)',
            }}
          >
            📲 Descargar App Android (APK Directo)
          </a>
        </div>
      </header>

      {/* 4 Context Cards (from Brand Board) */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 20,
          margin: '60px 0',
        }}
      >
        {CONTEXT_PILLARS.map((card, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              padding: 28,
              borderRadius: 20,
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div style={{ fontSize: '2.2rem' }}>{card.icon}</div>
            <div
              style={{
                alignSelf: 'flex-start',
                backgroundColor: 'rgba(59, 130, 246, 0.15)',
                color: '#60A5FA',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: 6,
              }}
            >
              {card.badge}
            </div>
            <h3 style={{ color: '#FFFFFF', fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
              {card.title}
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
              {card.desc}
            </p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer
        style={{
          marginTop: 90,
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: 36,
          textAlign: 'center',
          fontSize: '0.875rem',
          color: '#64748B',
        }}
      >
        <p style={{ margin: '0 0 12px 0' }}>
          © 2026 Mall OS · The Digital Layer of the Mall. Todos los derechos reservados.
        </p>
        <p style={{ margin: 0 }}>
          <a href="/privacidad" style={{ color: '#60A5FA', marginRight: 24, textDecoration: 'none' }}>
            Política de Privacidad
          </a>
          <a href="/terminos" style={{ color: '#60A5FA', textDecoration: 'none' }}>
            Términos y Condiciones
          </a>
        </p>
      </footer>
    </main>
  );
}
