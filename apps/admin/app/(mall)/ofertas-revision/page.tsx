import React from 'react';

export default function OfertasRevisionPage() {
  return (
    <div>
      <h1 style={{ color: '#10b981', marginTop: 0 }}>Cola de Revisión de Ofertas</h1>
      <p style={{ color: '#94a3b8' }}>Aprobación y control de calidad de promociones enviadas por comerciantes.</p>

      <div style={{ marginTop: 24, backgroundColor: '#1e293b', padding: 20, borderRadius: 8, border: '1px solid #334155' }}>
        <p style={{ color: '#94a3b8', textAlign: 'center', padding: '40px 0' }}>
          No hay ofertas pendientes de revisión en este momento.
        </p>
      </div>
    </div>
  );
}
