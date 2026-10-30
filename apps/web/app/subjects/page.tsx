'use client';
import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';

export default function SubjectsPage() {
  const [tenantId, setTenantId] = useState('');
  const [subjects, setSubjects] = useState<any[]>([]);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  const load = () => {
    if (!tenantId) return;
    apiFetch('/subjects', {}, tenantId).then(setSubjects);
  };
  useEffect(() => { load(); }, [tenantId]);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiFetch('/subjects', { method: 'POST', body: JSON.stringify({ code, name }) }, tenantId);
    setCode(''); setName('');
    load();
  };

  return (
    <div>
      <h2>Subjects</h2>
      <div>
        <input placeholder="Tenant ID" value={tenantId} onChange={e => setTenantId(e.target.value)} />
        <button onClick={load}>Load</button>
      </div>
      {tenantId && (
        <form onSubmit={create}>
          <input placeholder="Code" value={code} onChange={e => setCode(e.target.value)} required />
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <button type="submit">Create</button>
        </form>
      )}
      <table>
        <thead><tr><th>Code</th><th>Name</th><th>Type</th><th>Status</th></tr></thead>
        <tbody>
          {subjects.map(s => (
            <tr key={s.id}><td>{s.code}</td><td>{s.name}</td><td>{s.subjectType}</td><td>{s.status}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
