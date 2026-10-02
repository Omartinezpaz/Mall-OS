'use client';

import React, { useState } from 'react';

export default function CanjePage() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [resultMessage, setResultMessage] = useState('');
  const [history, setHistory] = useState<Array<{ code: string; time: string; status: string }>>([
    { code: '9K2M4P7X', time: '14:32', status: 'Canjeado con éxito' },
    { code: '3H8R5V2W', time: '12:15', status: 'Canjeado con éxito' },
  ]);

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.trim().toUpperCase();

    if (cleanCode.length !== 8) {
      setStatus('error');
      setResultMessage('El código debe tener exactamente 8 caracteres alfanuméricos.');
      return;
    }

    setStatus('loading');

    // Simula ejecución atómica de RPC redeem_coupon
    setTimeout(() => {
      if (cleanCode.startsWith('ERR') || cleanCode === '00000000') {
        setStatus('error');
        setResultMessage('Cupón inválido, expirado o ya utilizado anteriormente.');
      } else {
        setStatus('success');
        setResultMessage(`¡Cupón ${cleanCode} validado exitosamente! Descuento aplicado.`);
        setHistory((prev) => [
          {
            code: cleanCode,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'Canjeado con éxito',
          },
          ...prev,
        ]);
        setCode('');
      }
    }, 800);
  };

  return (
    <div style={{ maxWidth: 540, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h1 style={{ color: '#10b981', fontSize: '1.75rem', fontWeight: 800, marginBottom: 6 }}>
          Punto de Canje en Caja
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>
          Ingrese el código de 8 caracteres mostrado por el cliente en la app de Mall OS para validar el beneficio.
        </p>
      </div>

      {/* Formulario de Canje */}
      <div
        style={{
          backgroundColor: '#1e293b',
          padding: 28,
          borderRadius: 16,
          border: '1px solid #334155',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
        }}
      >
        <form onSubmit={handleRedeem} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#cbd5e1',
                marginBottom: 8,
              }}
            >
              Código del Cupón (8 caracteres)
            </label>
            <input
              type="text"
              maxLength={8}
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                if (status !== 'idle') setStatus('idle');
              }}
              placeholder="EJ: 9K2M4P7X"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '14px',
                fontSize: '1.4rem',
                fontWeight: 800,
                letterSpacing: '4px',
                textAlign: 'center',
                textTransform: 'uppercase',
                borderRadius: 10,
                border: '2px solid #475569',
                backgroundColor: '#0f172a',
                color: '#f8fafc',
                outline: 'none',
              }}
              autoFocus
            />
          </div>

          {/* Feedback de Estado */}
          {status === 'error' && (
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid #ef4444',
                color: '#fca5a5',
                padding: '12px 16px',
                borderRadius: 8,
                fontSize: '0.85rem',
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              ⚠️ {resultMessage}
            </div>
          )}

          {status === 'success' && (
            <div
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid #10b981',
                color: '#6ee7b7',
                padding: '12px 16px',
                borderRadius: 8,
                fontSize: '0.85rem',
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              ✅ {resultMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading' || code.trim().length === 0}
            style={{
              padding: '14px',
              backgroundColor: status === 'loading' ? '#047857' : '#10b981',
              color: '#0f172a',
              fontSize: '1rem',
              fontWeight: 800,
              border: 'none',
              borderRadius: 10,
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            {status === 'loading' ? '⏳ Verificando en base de datos...' : '✓ Canjear y Validar Cupón'}
          </button>
        </form>
      </div>

      {/* Historial Reciente de Canjes del Turno */}
      <div style={{ marginTop: 32 }}>
        <h3 style={{ color: '#cbd5e1', fontSize: '1rem', fontWeight: 700, marginBottom: 12 }}>
          🕒 Canjes Realizados en este Turno
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {history.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#1e293b',
                padding: '12px 16px',
                borderRadius: 10,
                border: '1px solid #334155',
              }}
            >
              <div>
                <span
                  style={{
                    color: '#f8fafc',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    marginRight: 10,
                  }}
                >
                  {item.code}
                </span>
                <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 600 }}>
                  {item.status}
                </span>
              </div>
              <span style={{ color: '#64748B', fontSize: '0.8rem' }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
