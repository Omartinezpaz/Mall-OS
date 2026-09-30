import React from 'react';

export default function LoginPage() {
  return (
    <main style={{ maxWidth: 400, margin: '80px auto', padding: 30, backgroundColor: '#1e293b', borderRadius: 12, border: '1px solid #334155' }}>
      <h2 style={{ color: '#10b981', textAlign: 'center', marginTop: 0 }}>Iniciar Sesión</h2>
      <p style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', marginBottom: 24 }}>
        Ingrese sus credenciales para acceder a su panel de gestión
      </p>

      <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: 6 }}>Correo Electrónico</label>
          <input
            type="email"
            placeholder="usuario@comercio.local"
            style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: 6, border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: 6 }}>Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: 6, border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff' }}
          />
        </div>

        <button
          type="submit"
          style={{ marginTop: 10, padding: 12, backgroundColor: '#10b981', color: '#0f172a', fontWeight: 'bold', border: 'none', borderRadius: 6, cursor: 'pointer' }}
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
