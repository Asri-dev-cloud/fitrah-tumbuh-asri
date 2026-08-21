export default function Footer({ navigate }) {
  const go = (e, target) => {
    e.preventDefault();
    navigate?.(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="ft-footer">
      <style>{`
        .ft-footer {
          background-color: #231b18; /* Premium dark brown */
          color: #ffffff;
          padding: 80px 16px 40px 16px;
          font-family: inherit;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .footer-cols {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto 60px auto;
        }
        @media (max-width: 900px) {
          .footer-cols {
            grid-template-columns: 1fr 1fr;
            gap: 30px;
          }
        }
        @media (max-width: 600px) {
          .footer-cols {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }
        .footer-col h3 {
          color: var(--color-brand-yellow, #dca11d);
          font-size: 14px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 24px;
        }
        .footer-col p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 13.5px;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-links a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 600;
          transition: all 0.2s;
        }
        .footer-links a:hover {
          color: var(--color-brand-yellow, #dca11d);
          padding-left: 4px;
        }
        .footer-socials {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }
        .social-link {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
          display: grid;
          place-items: center;
          transition: all 0.2s;
          text-decoration: none;
        }
        .social-link:hover {
          background: var(--color-brand-yellow, #dca11d);
          color: #231b18;
          transform: translateY(-2px);
        }
        .footer-logo-box {
          margin-bottom: 20px;
        }
        .footer-logo-box img {
          height: 48px;
          filter: brightness(0) invert(1); /* Render brand logo white on dark background */
        }
        .footer-divider-ft {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          max-width: 1200px;
          margin: 0 auto 30px auto;
        }
        .footer-bottom-ft {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.5);
          flex-wrap: wrap;
          gap: 16px;
        }
        .admin-link-ft {
          color: rgba(255, 255, 255, 0.3) !important;
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
          transition: all 0.2s;
          cursor: pointer;
        }
        .admin-link-ft:hover {
          color: var(--color-brand-yellow, #dca11d) !important;
        }
      `}</style>

      <div className="footer-cols">
        <div className="footer-col">
          <div className="footer-logo-box">
            <img src="/ft.png" alt="Fitrah Tumbuh" />
          </div>
          <p style={{ maxWidth: '280px' }}>
            Platform pendidikan dan pemberdayaan berbasis potensi yang berfokus pada keluarga, pemuda, pekerja, dan komunitas.
          </p>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-link" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
            </a>
            <a href="mailto:info@fitrahtumbuh.id" className="social-link" aria-label="Email">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Explore</h3>
          <div className="footer-links">
            <a href="#beranda" onClick={(e) => go(e, 'beranda')}>Home</a>
            <a href="#tentang-kami" onClick={(e) => go(e, 'tentang-kami')}>Tentang Kami</a>
            <a href="#program" onClick={(e) => go(e, 'program')}>Program</a>
            <a href="#kolaborasi" onClick={(e) => go(e, 'kolaborasi')}>Kolaborasi</a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Layanan</h3>
          <div className="footer-links">
            <a href="#produk" onClick={(e) => go(e, 'produk')}>Produk Digital</a>
            <a href="#kelas" onClick={(e) => go(e, 'kelas')}>Kelas &amp; Webinar</a>
            <a href="#services" onClick={(e) => go(e, 'services')}>Jasa Konsultasi</a>
            <a href="#free" onClick={(e) => go(e, 'free')}>Resource Gratis</a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Wilayah &amp; Kontak</h3>
          <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
            Kabupaten Bandung · Kabupaten Sumedang, Jawa Barat.
          </p>
          <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.7)' }}>
            ✉ info@fitrahtumbuh.id
          </p>
        </div>
      </div>

      <div className="footer-divider-ft"></div>

      <div className="footer-bottom-ft">
        <span>© 2026 Fitrah Tumbuh. Bertumbuh dalam fitrah, bergerak untuk sesama.</span>
        <a href="#admin" onClick={(e) => go(e, 'admin')} className="admin-link-ft">
          🔑 Admin Panel
        </a>
      </div>
    </footer>
  )
}
