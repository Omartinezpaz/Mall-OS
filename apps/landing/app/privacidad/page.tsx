import React from 'react';

export default function PrivacidadPage() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px', lineHeight: 1.6 }}>
      <a href="/" style={{ color: '#10b981', textDecoration: 'none', display: 'inline-block', marginBottom: 20 }}>← Volver al inicio</a>
      <h1 style={{ color: '#10b981' }}>Política de Privacidad</h1>
      <p style={{ color: '#94a3b8' }}>Última actualización: 29 de Septiembre de 2026</p>

      <section style={{ marginTop: 30 }}>
        <h2>1. Información que recopilamos</h2>
        <p>Los visitantes pueden consultar tiendas, mapas y eventos sin crear cuenta. Solo se solicita autenticación para activar cupones.</p>

        <h2>2. Uso de la Información</h2>
        <p>La información sirve para emitir cupones personales y generar estadísticas agregadas de flujo para el centro comercial.</p>

        <h2>3. Seguridad</h2>
        <p>Aislamiento estricto de datos con Row Level Security y cifrado HTTPS en todas las transferencias.</p>
      </section>
    </main>
  );
}
