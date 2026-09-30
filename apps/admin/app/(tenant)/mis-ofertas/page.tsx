import React from 'react';

export default function MisOfertasPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h1 style={{ color: '#10b981', margin: 0 }}>Mis Ofertas y Promociones</h1>
          <p style={{ color: '#94a3b8', margin: '4px 0 0 0' }}>Crea promociones para que los visitantes las canjeen en tu local.</p>
        </div>
        <button style={{ padding: '10px 16px', backgroundColor: '#10b981', color: '#0f172a', fontWeight: 'bold', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
          + Nueva Oferta
        </button>
      </div>

      <div style={{ backgroundColor: '#1e293b', padding: 20, borderRadius: 8, border: '1px solid #334155' }}>
        <p style={{ color: '#94a3b8', textAlign: 'center', padding: '30px 0' }}>
          Tienes 1 oferta activa: <strong>Combo Café con Leche + Pastel</strong> (Stock: 50 cupones).
        </p>
      </div>
    </div>
  );
}
