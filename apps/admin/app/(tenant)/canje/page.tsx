import React from 'react';

export default function CanjePage() {
  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <h1 style={{ color: '#10b981', textAlign: 'center' }}>Validación de Cupón en Caja</h1>
      <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: 30 }}>
        Escanee el código QR del cliente o ingrese manualmente el código de 8 caracteres.
      </p>

      <div style={{ backgroundColor: '#1e293b', padding: 30, borderRadius: 12, border: '1px solid #334155' }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: 6 }}>
              Código de Cupón (8 caracteres)
            </label>
            <input
              type="text"
              maxLength={8}
              placeholder="ABC23489"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '12px',
                fontSize: '1.25rem',
                letterSpacing: '2px',
                textAlign: 'center',
                textTransform: 'uppercase',
                borderRadius: 6,
                border: '1px solid #475569',
                backgroundColor: '#0f172a',
                color: '#fff',
              }}
            />
          </div>

          <button
            type="submit"
            style={{ padding: 14, backgroundColor: '#10b981', color: '#0f172a', fontSize: '1rem', fontWeight: 'bold', border: 'none', borderRadius: 6, cursor: 'pointer' }}
          >
            ✓ Canjear y Validar Cupón
          </button>
        </form>
      </div>
    </div>
  );
}
