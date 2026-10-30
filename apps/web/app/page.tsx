'use client';
import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';

export default function Dashboard() {
  const [tenantId, setTenantId] = useState('');
  const [stats, setStats] = useState({ producers: 0, subjects: 0, events: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('tenantId');
    if (saved) setTenantId(saved);
  }, []);

  const loadStats = async () => {
    if (!tenantId) return;
    localStorage.setItem('tenantId', tenantId);
    try {
      const [producers, subjects, events] = await Promise.all([
        apiFetch('/producers', {}, tenantId),
        apiFetch('/subjects', {}, tenantId),
        apiFetch('/events', {}, tenantId),
      ]);
      setStats({
        producers: producers.length,
        subjects: subjects.length,
        events: events.length,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{ marginBottom: '1.5rem' }}>
        <label>Tenant ID: </label>
        <input
          value={tenantId}
          onChange={e => setTenantId(e.target.value)}
          placeholder="Paste tenant ID here"
          style={{ width: '320px' }}
        />
        <button onClick={loadStats}>Load</button>
      </div>

      {tenantId && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '2rem' }}>{stats.producers}</h3>
            <p>Producers</p>
            <a href="/producers">View →</a>
          </div>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '2rem' }}>{stats.subjects}</h3>
            <p>Subjects</p>
            <a href="/subjects">View →</a>
          </div>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '2rem' }}>{stats.events}</h3>
            <p>Events</p>
            <a href="/events">View →</a>
          </div>
        </div>
      )}

      <div style={{ background: 'white', padding: '1rem', borderRadius: '8px' }}>
        <h3>Quick Actions</h3>
        <p><a href="/tenants">Create / Manage Tenants</a></p>
        <p>After creating a tenant, copy its ID and paste above to view data.</p>
      </div>
    </div>
  );
}
