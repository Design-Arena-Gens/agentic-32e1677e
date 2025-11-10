import './globals.css';

export const metadata = {
  title: 'Healthcare Products Feed',
  description: 'Instagram-style feed for healthcare products',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container header-inner">
            <a className="brand" href="/">HealthGram</a>
            <nav>
              <a className="nav-link" href="/">Feed</a>
              <a className="nav-link primary" href="/add">Add Product</a>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="footer">
          <div className="container">? {new Date().getFullYear()} HealthGram</div>
        </footer>
      </body>
    </html>
  );
}
