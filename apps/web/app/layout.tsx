import './globals.css';

export const metadata = {
  title: 'IAICT Core Platform',
  description: 'Production & Value Chain Management',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <header style={{ padding: '1rem', borderBottom: '1px solid #ddd', marginBottom: '1rem' }}>
          <h1 style={{ margin: 0 }}>IAICT Core Platform</h1>
          <nav>
            <a href="/" style={{ marginRight: '1rem' }}>Home</a>
            <a href="/tenants" style={{ marginRight: '1rem' }}>Tenants</a>
            <a href="/producers" style={{ marginRight: '1rem' }}>Producers</a>
            <a href="/subjects" style={{ marginRight: '1rem' }}>Subjects</a>
            <a href="/events">Events</a>
          </nav>
        </header>
        <main style={{ padding: '1rem' }}>{children}</main>
      </body>
    </html>
  );
}