'use client';
import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';

export default function EventsPage() {
  const [tenantId, setTenantId] = useState('');
  const [events, setEvents] = useState<any[]>([]);
  const [eventType, setEventType] = useState('');
  const [subjectId, setSubjectId] = useState('');

  const load = () => {
    if (!tenantId) return;
    apiFetch('/events', {}, tenantId).then(setEvents);
  };
  useEffect(() => { load(); }, [tenantId]);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiFetch('/events', {
      method: 'POST',
      body: JSON.stringify({ eventType, subjectId: subjectId || undefined, payload: {} }),
    }, tenantId);
    setEventType(''); setSubjectId('');
    load();
  };

  return (
    <div>
      <h2>Event Ledger</h2>
      <div>
        <input placeholder="Tenant ID" value={tenantId} onChange={e => setTenantId(e.target.value)} />
        <button onClick={load}>Load</button>
      </div>
      {tenantId && (
        <form onSubmit={create}>
          <input placeholder="Event Type" value={eventType} onChange={e => setEventType(e.target.value)} required />
          <input placeholder="Subject ID (optional)" value={subjectId} onChange={e => setSubjectId(e.target.value)} />
          <button type="submit">Record Event</button>
        </form>
      )}
      <table>
        <thead><tr><th>Type</th><th>Subject</th><th>Occurred</th></tr></thead>
        <tbody>
          {events.map(ev => (
            <tr key={ev.id}>
              <td>{ev.eventType}</td>
              <td>{ev.subject?.code || ev.subjectId}</td>
              <td>{new Date(ev.occurredAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
