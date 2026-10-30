'use client';
import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';

export default function ProducersPage() {
  const [tenantId, setTenantId] = useState('');
  const [producers, setProducers] = useState<any[]>([]);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  const load = () => {
    if (!tenantId) return;
    apiFetch('/producers', {}, tenantId).then(setProducers);
  };
  useEffect(() => { load(); }, [tenantId]);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiFetch('/producers', { method: 'POST', body: JSON.stringify({ code, name }) }, tenantId);
    setCode(''); setName('');
    load();
  };

  return (
    <div>
      <h2>Producers</h2>
      <div>
        <input placeholder="Tenant ID" value={tenantId} onChange={e => setTenantId(e.target.value)} />
        <button onClick={load}>Load</button>
      </div>
      {tenantId && (
        <form onSubmit={create}>
          <input placeholder="Code" value={code} onChange={e => setCode(e.target.value)} required />
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
          <button type="submit">Create</button>
        </form>
      )}
      <table>
        <thead><tr><th>Code</th><th>Name</th><th>Type</th></tr></thead>
        <tbody>
          {producers.map(p => (
            <tr key={p.id}><td>{p.code}</td><td>{p.name}</td><td>{p.type}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
