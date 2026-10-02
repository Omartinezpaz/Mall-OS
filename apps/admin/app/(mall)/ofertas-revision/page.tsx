'use client';

import React, { useState } from 'react';

interface PendingOffer {
  id: string;
  storeName: string;
  storeUnit: string;
  title: string;
  benefitLabel: string;
  totalCoupons: number;
  submittedAt: string;
}

export default function OfertasRevisionPage() {
  const [pendingOffers, setPendingOffers] = useState<PendingOffer[]>([
    {
      id: 'po-1',
      storeName: 'Panadería y Pastelería Los Cedros',
      storeUnit: 'PB-02',
      title: 'Descuento 2x1 en Tartaletas de Fruta',
      benefitLabel: '2x1 en Dulces',
      totalCoupons: 25,
      submittedAt: 'Hace 2 horas',
    },
    {
      id: 'po-2',
      storeName: 'Charcutería La Estancia',
      storeUnit: 'PB-03',
      title: 'Combo Degustación Jamón Serrano + Queso Manchego',
      benefitLabel: 'Combo Gourmet 15% OFF',
      totalCoupons: 15,
      submittedAt: 'Ayer',
    },
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const handleApprove = (id: string, storeName: string) => {
    setPendingOffers((prev) => prev.filter((o) => o.id !== id));
    setNotification(`✅ Oferta de "${storeName}" aprobada y publicada en la app móvil.`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleReject = (id: string, storeName: string) => {
    setPendingOffers((prev) => prev.filter((o) => o.id !== id));
    setNotification(`❌ Oferta de "${storeName}" devuelta al comerciante para corrección.`);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: '#10b981', fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>
          Cola de Aprobación de Ofertas
        </h1>
        <p style={{ color: '#94a3b8', margin: '6px 0 0 0', fontSize: '0.9rem' }}>
          Control de calidad y autorización de promociones enviadas por los comerciantes (Regla D-017).
        </p>
      </div>

      {notification && (
        <div
          style={{
            backgroundColor: '#064e3b',
            color: '#34d399',
            padding: '12px 18px',
            borderRadius: 10,
            marginBottom: 20,
            fontWeight: 700,
            border: '1px solid #10b981',
          }}
        >
          {notification}
        </div>
      )}

      {pendingOffers.length === 0 ? (
        <div
          style={{
            backgroundColor: '#1e293b',
            borderRadius: 14,
            padding: 40,
            textAlign: 'center',
            border: '1px solid #334155',
          }}
        >
          <p style={{ color: '#f8fafc', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 6px 0' }}>
            🎉 No hay ofertas pendientes de revisión
          </p>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
            Todas las promociones del mall han sido procesadas.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {pendingOffers.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: '#1e293b',
                borderRadius: 14,
                padding: 22,
                border: '1px solid #334155',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 20,
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.85rem' }}>
                    {item.storeName} ({item.storeUnit})
                  </span>
                  <span style={{ color: '#64748b', fontSize: '0.8rem' }}>· {item.submittedAt}</span>
                </div>
                <h3 style={{ color: '#f8fafc', fontSize: '1.15rem', fontWeight: 800, margin: '0 0 8px 0' }}>
                  {item.title}
                </h3>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span
                    style={{
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      color: '#34d399',
                      padding: '3px 8px',
                      borderRadius: 6,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    {item.benefitLabel}
                  </span>
                  <span style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>
                    Stock solicitado: <strong>{item.totalCoupons} cupones</strong>
                  </span>
                </div>
              </div>

              {/* Botones de Decisión */}
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => handleReject(item.id, item.storeName)}
                  style={{
                    padding: '10px 16px',
                    backgroundColor: '#334155',
                    color: '#fca5a5',
                    border: '1px solid #475569',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                  }}
                >
                  ✕ Rechazar
                </button>
                <button
                  onClick={() => handleApprove(item.id, item.storeName)}
                  style={{
                    padding: '10px 18px',
                    backgroundColor: '#10b981',
                    color: '#0f172a',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                  }}
                >
                  ✓ Aprobar y Publicar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
