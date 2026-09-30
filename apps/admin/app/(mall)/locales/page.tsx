import React from 'react';

export default function LocalesPage() {
  return (
    <div>
      <h1 style={{ color: '#10b981', marginTop: 0 }}>Gestión de Locales (30 Locales)</h1>
      <p style={{ color: '#94a3b8' }}>Directorio maestro de comercios del CC Los Nuevos Teques.</p>

      <div style={{ marginTop: 24, backgroundColor: '#1e293b', padding: 20, borderRadius: 8, border: '1px solid #334155' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: '#cbd5e1' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <th style={{ padding: 12 }}>Local</th>
              <th style={{ padding: 12 }}>Piso / Unidad</th>
              <th style={{ padding: 12 }}>Categoría</th>
              <th style={{ padding: 12 }}>Ofertas Habilitadas</th>
              <th style={{ padding: 12 }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: 12, fontWeight: 600, color: '#fff' }}>Supermercado San Diego</td>
              <td style={{ padding: 12 }}>PB - 01</td>
              <td style={{ padding: 12 }}>Supermercados</td>
              <td style={{ padding: 12, color: '#ef4444' }}>No (Cadena)</td>
              <td style={{ padding: 12, color: '#10b981' }}>Activo</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: 12, fontWeight: 600, color: '#fff' }}>Panadería Los Cedros</td>
              <td style={{ padding: 12 }}>PB - 02</td>
              <td style={{ padding: 12 }}>Gastronomía</td>
              <td style={{ padding: 12, color: '#10b981' }}>Sí</td>
              <td style={{ padding: 12, color: '#10b981' }}>Activo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
