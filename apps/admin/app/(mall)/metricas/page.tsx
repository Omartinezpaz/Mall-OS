'use client';

import React from 'react';

export default function MetricasPage() {
  const funnelSteps = [
    { label: 'Aperturas de App', count: 1420, rate: '100%', color: '#f8fafc' },
    { label: 'Consultas en Directorio', count: 980, rate: '69.0%', color: '#38bdf8' },
    { label: 'Visualizaciones de Ficha', count: 640, rate: '45.1%', color: '#818cf8' },
    { label: 'Cupones Activados', count: 184, rate: '13.0%', color: '#f59e0b' },
    { label: 'Canjes Físicos en Caja', count: 128, rate: '9.0%', color: '#10b981' },
  ];

  const storePerformance = [
    { store: 'Panadería Los Cedros', activations: 82, redemptions: 64, rate: '78.0%' },
    { store: 'Fitness Club Los Teques', activations: 54, redemptions: 36, rate: '66.7%' },
    { store: 'Charcutería La Estancia', activations: 48, redemptions: 28, rate: '58.3%' },
  ];

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: '#10b981', fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>
          Métricas de Impacto y Conversión
        </h1>
        <p style={{ color: '#94a3b8', margin: '6px 0 0 0', fontSize: '0.9rem' }}>
          CC Los Nuevos Teques · Datos en tiempo real calculados sobre la bitácora inmutable de eventos.
        </p>
      </div>

      {/* Tarjetas KPI Superiores */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
          marginBottom: 32,
        }}
      >
        <div style={{ backgroundColor: '#1e293b', padding: 20, borderRadius: 14, border: '1px solid #334155' }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
            Visitas Digitales (MAU)
          </span>
          <h2 style={{ fontSize: '2.2rem', margin: '8px 0 4px 0', color: '#f8fafc', fontWeight: 900 }}>
            1,420
          </h2>
          <span style={{ color: '#34d399', fontSize: '0.8rem', fontWeight: 600 }}>↑ +24% esta semana</span>
        </div>

        <div style={{ backgroundColor: '#1e293b', padding: 20, borderRadius: 14, border: '1px solid #334155' }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
            Tasa de Activación
          </span>
          <h2 style={{ fontSize: '2.2rem', margin: '8px 0 4px 0', color: '#f59e0b', fontWeight: 900 }}>
            13.0%
          </h2>
          <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>184 cupones emitidos</span>
        </div>

        <div style={{ backgroundColor: '#1e293b', padding: 20, borderRadius: 14, border: '1px solid #334155' }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
            Canjes Efectivos en Caja
          </span>
          <h2 style={{ fontSize: '2.2rem', margin: '8px 0 4px 0', color: '#10b981', fontWeight: 900 }}>
            128
          </h2>
          <span style={{ color: '#34d399', fontSize: '0.8rem', fontWeight: 600 }}>69.5% de efectividad</span>
        </div>
      </div>

      {/* Funnel de Conversión Visual */}
      <div
        style={{
          backgroundColor: '#1e293b',
          padding: 24,
          borderRadius: 16,
          border: '1px solid #334155',
          marginBottom: 32,
        }}
      >
        <h3 style={{ color: '#f8fafc', fontSize: '1.15rem', fontWeight: 800, marginTop: 0, marginBottom: 18 }}>
          Embudo de Conversión Shopper
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {funnelSteps.map((step, idx) => {
            const widthPct = Math.max(15, (step.count / 1420) * 100);
            return (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 600 }}>
                    {step.label}
                  </span>
                  <span style={{ color: step.color, fontSize: '0.85rem', fontWeight: 800 }}>
                    {step.count.toLocaleString()} ({step.rate})
                  </span>
                </div>
                <div
                  style={{
                    backgroundColor: '#0f172a',
                    borderRadius: 8,
                    height: 12,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${widthPct}%`,
                      height: '100%',
                      backgroundColor: step.color,
                      borderRadius: 8,
                      transition: 'width 0.5s ease',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabla de Rendimiento por Comercio */}
      <div
        style={{
          backgroundColor: '#1e293b',
          borderRadius: 16,
          border: '1px solid #334155',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '18px 22px', borderBottom: '1px solid #334155' }}>
          <h3 style={{ color: '#f8fafc', fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
            Rendimiento por Comercio del Piloto
          </h3>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#0f172a' }}>
              <th style={{ padding: '12px 20px', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700 }}>
                COMERCIO
              </th>
              <th style={{ padding: '12px 20px', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700 }}>
                ACTIVACIONES
              </th>
              <th style={{ padding: '12px 20px', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700 }}>
                CANJES EN CAJA
              </th>
              <th style={{ padding: '12px 20px', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700 }}>
                TASA DE CONVERSIÓN
              </th>
            </tr>
          </thead>
          <tbody>
            {storePerformance.map((item, idx) => (
              <tr key={idx} style={{ borderTop: '1px solid #334155' }}>
                <td style={{ padding: '14px 20px', color: '#f8fafc', fontWeight: 600 }}>
                  {item.store}
                </td>
                <td style={{ padding: '14px 20px', color: '#cbd5e1' }}>{item.activations}</td>
                <td style={{ padding: '14px 20px', color: '#10b981', fontWeight: 700 }}>
                  {item.redemptions}
                </td>
                <td style={{ padding: '14px 20px', color: '#38bdf8', fontWeight: 800 }}>
                  {item.rate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
