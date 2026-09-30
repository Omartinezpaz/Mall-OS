import React from 'react';

export default function MetricasPage() {
  return (
    <div>
      <h1 style={{ color: '#10b981', marginTop: 0 }}>Funnel de Conversión (Los Nuevos Teques)</h1>
      <p style={{ color: '#94a3b8' }}>Métricas en tiempo real basadas en la bitácora inmutable de eventos.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginTop: 24 }}>
        <div style={{ backgroundColor: '#1e293b', padding: 20, borderRadius: 8, border: '1px solid #334155' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Aperturas de App</span>
          <h2 style={{ fontSize: '2rem', margin: '10px 0 0 0', color: '#f8fafc' }}>0</h2>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: 20, borderRadius: 8, border: '1px solid #334155' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Usuarios Registrados</span>
          <h2 style={{ fontSize: '2rem', margin: '10px 0 0 0', color: '#38bdf8' }}>0</h2>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: 20, borderRadius: 8, border: '1px solid #334155' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Cupones Activados</span>
          <h2 style={{ fontSize: '2rem', margin: '10px 0 0 0', color: '#f59e0b' }}>0</h2>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: 20, borderRadius: 8, border: '1px solid #334155' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Cupones Canjeados</span>
          <h2 style={{ fontSize: '2rem', margin: '10px 0 0 0', color: '#10b981' }}>0</h2>
        </div>
      </div>
    </div>
  );
}
