import './globals.css';

export const metadata = {
  title: 'IAICT Core Platform',
  description: 'Production & Value Chain Management',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <header style={{ padding: '1rem 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ margin: 0, fontSize: '1.4rem' }}>IAICT Core Platform</h1>
            <nav>
              <a href="/" style={{ marginRight: '1.2rem' }}>Dashboard</a>
              <a href="/tenants" style={{ marginRight: '1.2rem' }}>Tenants</a>
              <a href="/producers" style={{ marginRight: '1.2rem' }}>Producers</a>
              <a href="/sites" style={{ marginRight: '1.2rem' }}>Sites</a>
              <a href="/subjects" style={{ marginRight: '1.2rem' }}>Subjects</a>
              <a href="/events">Events</a>
            </nav>
          </div>
        </header>
        <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>{children}</main>
      </body>
    </html>
  );
}