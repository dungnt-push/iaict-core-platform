'use client';
import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';

export default function SitesPage() {
  const [tenantId, setTenantId] = useState('');
  const [sites, setSites] = useState<any[]>([]);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('tenantId');
    if (saved) setTenantId(saved);
  }, []);

  const load = () => {
    if (!tenantId) return;
    localStorage.setItem('tenantId', tenantId);
    apiFetch('/sites', {}, tenantId).then(setSites);
  };

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiFetch('/sites', { method: 'POST', body: JSON.stringify({ code, name }) }, tenantId);
    setCode(''); setName('');
    load();
  };

  return (
    <div>
      <h2>Sites</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input placeholder="Tenant ID" value={tenantId} onChange={e => setTenantId(e.target.value)} />
        <button onClick={load}>Load</button>
      </div>
      {tenantId && (
        <form onSubmit={create}>
          <input placeholder="Code" value={code} onChange={e => setCode(e.target.value)} required />
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
          <button type="submit">Create Site</button>
        </form>
      )}
      <table>
        <thead><tr><th>Code</th><th>Name</th><th>Type</th><th>Producer</th></tr></thead>
        <tbody>
          {sites.map(s => (
            <tr key={s.id}>
              <td>{s.code}</td>
              <td>{s.name}</td>
              <td>{s.type}</td>
              <td>{s.producer?.name || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
