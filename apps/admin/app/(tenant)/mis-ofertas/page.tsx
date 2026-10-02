'use client';

import React, { useState } from 'react';

interface TenantOffer {
  id: string;
  title: string;
  benefitLabel: string;
  totalCoupons: number;
  remainingCoupons: number;
  status: 'draft' | 'pending' | 'active' | 'rejected';
  createdAt: string;
}

export default function MisOfertasPage() {
  const [showModal, setShowModal] = useState(false);
  const [offers, setOffers] = useState<TenantOffer[]>([
    {
      id: 'o-1',
      title: 'Combo Café con Leche Grande + Pastel',
      benefitLabel: 'Café + Pastel Gratis',
      totalCoupons: 50,
      remainingCoupons: 34,
      status: 'active',
      createdAt: '2026-09-29',
    },
    {
      id: 'o-2',
      title: 'Descuento 2x1 en Tartaletas de Fruta',
      benefitLabel: '2x1 en Dulces',
      totalCoupons: 25,
      remainingCoupons: 25,
      status: 'pending',
      createdAt: '2026-10-01',
    },
  ]);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    benefitLabel: '',
    description: '',
    terms: '',
    totalCoupons: 30,
  });

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.benefitLabel) return;

    const newOffer: TenantOffer = {
      id: `o-${Date.now()}`,
      title: formData.title,
      benefitLabel: formData.benefitLabel,
      totalCoupons: Number(formData.totalCoupons),
      remainingCoupons: Number(formData.totalCoupons),
      status: 'pending', // Regla D-017: todo lo creado por el tenant queda en 'pending' para revisión del mall_admin
      createdAt: new Date().toISOString().split('T')[0],
    };

    setOffers([newOffer, ...offers]);
    setShowModal(false);
    setFormData({
      title: '',
      benefitLabel: '',
      description: '',
      terms: '',
      totalCoupons: 30,
    });
  };

  const getStatusBadge = (status: TenantOffer['status']) => {
    switch (status) {
      case 'active':
        return (
          <span
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              color: '#34D399',
              padding: '4px 10px',
              borderRadius: 6,
              fontSize: '0.75rem',
              fontWeight: 700,
            }}
          >
            ACTIVA
          </span>
        );
      case 'pending':
        return (
          <span
            style={{
              backgroundColor: 'rgba(245, 158, 11, 0.2)',
              color: '#FBBF24',
              padding: '4px 10px',
              borderRadius: 6,
              fontSize: '0.75rem',
              fontWeight: 700,
            }}
          >
            EN REVISIÓN
          </span>
        );
      case 'draft':
        return (
          <span
            style={{
              backgroundColor: '#334155',
              color: '#94A3B8',
              padding: '4px 10px',
              borderRadius: 6,
              fontSize: '0.75rem',
              fontWeight: 700,
            }}
          >
            BORRADOR
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <div>
          <h1 style={{ color: '#10b981', fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>
            Mis Ofertas y Promociones
          </h1>
          <p style={{ color: '#94a3b8', margin: '6px 0 0 0', fontSize: '0.9rem' }}>
            Gestiona los beneficios y cupones que los visitantes canjean en tu local.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: '12px 20px',
            backgroundColor: '#10b981',
            color: '#0f172a',
            fontWeight: 800,
            border: 'none',
            borderRadius: 10,
            cursor: 'pointer',
          }}
        >
          + Crear Nueva Oferta
        </button>
      </div>

      {/* Tabla de Ofertas */}
      <div
        style={{
          backgroundColor: '#1e293b',
          borderRadius: 14,
          border: '1px solid #334155',
          overflow: 'hidden',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155' }}>
              <th style={{ padding: '14px 18px', color: '#cbd5e1', fontSize: '0.8rem', fontWeight: 700 }}>
                TÍTULO DE OFERTA
              </th>
              <th style={{ padding: '14px 18px', color: '#cbd5e1', fontSize: '0.8rem', fontWeight: 700 }}>
                BENEFICIO
              </th>
              <th style={{ padding: '14px 18px', color: '#cbd5e1', fontSize: '0.8rem', fontWeight: 700 }}>
                CUPONES RESTANTES
              </th>
              <th style={{ padding: '14px 18px', color: '#cbd5e1', fontSize: '0.8rem', fontWeight: 700 }}>
                ESTADO
              </th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id} style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '16px 18px', color: '#f8fafc', fontWeight: 600 }}>
                  {offer.title}
                </td>
                <td style={{ padding: '16px 18px', color: '#10b981', fontWeight: 700 }}>
                  {offer.benefitLabel}
                </td>
                <td style={{ padding: '16px 18px', color: '#cbd5e1', fontSize: '0.9rem' }}>
                  {offer.remainingCoupons} / {offer.totalCoupons}
                </td>
                <td style={{ padding: '16px 18px' }}>{getStatusBadge(offer.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para Crear Oferta */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            zIndex: 100,
          }}
        >
          <div
            style={{
              backgroundColor: '#1e293b',
              borderRadius: 16,
              padding: 28,
              maxWidth: 500,
              width: '100%',
              border: '1px solid #334155',
            }}
          >
            <h2 style={{ color: '#f8fafc', fontSize: '1.3rem', fontWeight: 800, marginTop: 0 }}>
              Nueva Promoción para tu Local
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: 20 }}>
              Por seguridad de la plataforma, la oferta se enviará a la administración del mall para su
              aprobación antes de publicarse (Regla D-017).
            </p>

            <form onSubmit={handleCreateOffer} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: 4 }}>
                  Título de la Oferta
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: 20% en Combo Familiar"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: 10,
                    borderRadius: 8,
                    border: '1px solid #475569',
                    backgroundColor: '#0f172a',
                    color: '#fff',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: 4 }}>
                  Etiqueta de Beneficio (Badge)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: 20% OFF, 2x1, Postre Gratis"
                  value={formData.benefitLabel}
                  onChange={(e) => setFormData({ ...formData, benefitLabel: e.target.value })}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: 10,
                    borderRadius: 8,
                    border: '1px solid #475569',
                    backgroundColor: '#0f172a',
                    color: '#fff',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: 4 }}>
                  Cantidad Total de Cupones
                </label>
                <input
                  type="number"
                  min={1}
                  max={500}
                  required
                  value={formData.totalCoupons}
                  onChange={(e) => setFormData({ ...formData, totalCoupons: Number(e.target.value) })}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: 10,
                    borderRadius: 8,
                    border: '1px solid #475569',
                    backgroundColor: '#0f172a',
                    color: '#fff',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    flex: 1,
                    padding: 12,
                    backgroundColor: '#334155',
                    color: '#f8fafc',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: 12,
                    backgroundColor: '#10b981',
                    color: '#0f172a',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 800,
                  }}
                >
                  Enviar a Revisión
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
