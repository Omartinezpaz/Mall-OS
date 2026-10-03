'use client';

import React from 'react';

export default function MetricasPage() {
  const kpis = [
    { label: 'Visitantes Activos (Shoppers)', value: '1,420', change: '+24% esta semana', color: '#60A5FA', sub: 'Usuarios activos en la app' },
    { label: 'Activaciones de Ofertas', value: '184', change: '13.0% del total', color: '#F97316', sub: 'Cupones generados' },
    { label: 'Canjes Efectivos en Caja', value: '128', change: '69.5% de efectividad', color: '#10B981', sub: 'Ventas asistidas validadas' },
    { label: 'Participación de Locales', value: '86.7%', change: '26 de 30 comercios', color: '#818CF8', sub: 'Locales con ofertas activas' },
  ];

  const funnelSteps = [
    { label: '1. Aperturas de App (Discover)', count: 1420, rate: '100%', color: '#F8FAFC' },
    { label: '2. Consultas en Directorio & Mapa (Navigate)', count: 980, rate: '69.0%', color: '#38BDF8' },
    { label: '3. Visualizaciones de Ficha de Local (Engage)', count: 640, rate: '45.1%', color: '#818CF8' },
    { label: '4. Cupones y Promociones Activados', count: 184, rate: '13.0%', color: '#F97316' },
    { label: '5. Canjes Físicos en Caja (Convert)', count: 128, rate: '9.0%', color: '#10B981' },
  ];

  const storePerformance = [
    { store: 'Panadería Los Cedros (PB-02)', category: 'Gastronomía', activations: 82, redemptions: 64, rate: '78.0%' },
    { store: 'Nike Store (N1-102)', category: 'Moda / Deportes', activations: 54, redemptions: 36, rate: '66.7%' },
    { store: 'Charcutería La Estancia (PB-03)', category: 'Alimentos', activations: 48, redemptions: 28, rate: '58.3%' },
  ];

  return (
    <div style={{ maxWidth: 1040, margin: '0 auto', fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'inline-block', backgroundColor: 'rgba(79, 70, 229, 0.15)', color: '#A5B4FC', fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: 999, marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Mall Administration · Executive Dashboard
        </div>
        <h1 style={{ color: '#F8FAFC', fontSize: '1.85rem', fontWeight: 800, margin: 0, letterSpacing: '-0.03em' }}>
          Métricas de Impacto y Conversión Digital
        </h1>
        <p style={{ color: '#94A3B8', margin: '6px 0 0 0', fontSize: '0.92rem' }}>
          CC Los Nuevos Teques · Datos consolidados en tiempo real del embudo Discover → Navigate → Engage → Convert.
        </p>
      </div>

      {/* Tarjetas KPI Superiores (Los 4 Pilares de Mall OS) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          marginBottom: 32,
        }}
      >
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#111B2E',
              padding: '22px 20px',
              borderRadius: 16,
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                {kpi.label}
              </span>
              <h2 style={{ fontSize: '2.2rem', margin: '10px 0 4px 0', color: kpi.color, fontWeight: 900, letterSpacing: '-0.03em' }}>
                {kpi.value}
              </h2>
            </div>
            <div style={{ marginTop: 8 }}>
              <span style={{ color: '#CBD5E1', fontSize: '0.8rem', fontWeight: 600 }}>{kpi.change}</span>
              <p style={{ color: '#64748B', fontSize: '0.75rem', margin: '2px 0 0 0' }}>{kpi.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Funnel de Conversión Visual */}
      <div
        style={{
          backgroundColor: '#111B2E',
          padding: 26,
          borderRadius: 20,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: 32,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h3 style={{ color: '#F8FAFC', fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
              Embudo de Conversión Shopper
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
              De apertura inicial a venta validada en caja física
            </p>
          </div>
          <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34D399', fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: 8 }}>
            9.0% ROI Final
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {funnelSteps.map((step, idx) => {
            const widthPct = Math.max(12, (step.count / 1420) * 100);
            return (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ color: '#CBD5E1', fontSize: '0.88rem', fontWeight: 600 }}>
                    {step.label}
                  </span>
                  <span style={{ color: step.color, fontSize: '0.88rem', fontWeight: 800 }}>
                    {step.count.toLocaleString()} ({step.rate})
                  </span>
                </div>
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 8,
                    height: 14,
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
          backgroundColor: '#111B2E',
          borderRadius: 20,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <h3 style={{ color: '#F8FAFC', fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
            Rendimiento de Conversión por Comercio
          </h3>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
              <th style={{ padding: '14px 24px', color: '#94A3B8', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                COMERCIO
              </th>
              <th style={{ padding: '14px 24px', color: '#94A3B8', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                CATEGORÍA
              </th>
              <th style={{ padding: '14px 24px', color: '#94A3B8', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                ACTIVACIONES
              </th>
              <th style={{ padding: '14px 24px', color: '#94A3B8', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                CANJES EN CAJA
              </th>
              <th style={{ padding: '14px 24px', color: '#94A3B8', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                CONVERSIÓN
              </th>
            </tr>
          </thead>
          <tbody>
            {storePerformance.map((item, idx) => (
              <tr key={idx} style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <td style={{ padding: '16px 24px', color: '#F8FAFC', fontWeight: 700 }}>
                  {item.store}
                </td>
                <td style={{ padding: '16px 24px', color: '#94A3B8', fontSize: '0.88rem' }}>
                  {item.category}
                </td>
                <td style={{ padding: '16px 24px', color: '#F97316', fontWeight: 700 }}>
                  {item.activations}
                </td>
                <td style={{ padding: '16px 24px', color: '#10B981', fontWeight: 800 }}>
                  {item.redemptions}
                </td>
                <td style={{ padding: '16px 24px', color: '#60A5FA', fontWeight: 800 }}>
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
