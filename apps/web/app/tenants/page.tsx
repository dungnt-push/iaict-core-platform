'use client';
import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';

export default function TenantsPage() {
  const [tenants, setTenants] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  const load = () => apiFetch('/tenants').then(setTenants);
  useEffect(() => { load(); }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiFetch('/tenants', { method: 'POST', body: JSON.stringify({ name, slug }) });
    setName(''); setSlug('');
    load();
  };

  return (
    <div>
      <h2>Tenants</h2>
      <form onSubmit={create}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Slug" value={slug} onChange={e => setSlug(e.target.value)} required />
        <button type="submit">Create</button>
      </form>
      <table>
        <thead><tr><th>Name</th><th>Slug</th><th>Status</th><th>Created</th></tr></thead>
        <tbody>
          {tenants.map(t => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.slug}</td>
              <td>{t.status}</td>
              <td>{new Date(t.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
