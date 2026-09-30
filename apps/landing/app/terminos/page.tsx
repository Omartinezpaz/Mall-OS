import React from 'react';

export default function TerminosPage() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px', lineHeight: 1.6 }}>
      <a href="/" style={{ color: '#10b981', textDecoration: 'none', display: 'inline-block', marginBottom: 20 }}>← Volver al inicio</a>
      <h1 style={{ color: '#10b981' }}>Términos y Condiciones de Uso</h1>
      <p style={{ color: '#94a3b8' }}>Última actualización: 29 de Septiembre de 2026</p>

      <section style={{ marginTop: 30 }}>
        <h2>1. Naturaleza de la Plataforma</h2>
        <p>Mall OS es una plataforma tecnológica que facilita la interacción entre visitantes, comercios y administración de centros comerciales.</p>

        <h2>2. Cupones y Promociones</h2>
        <p>Los cupones son personales, intransferibles y sujetos a stock y validez temporal definida por el comercio.</p>
      </section>
    </main>
  );
}
