export default function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <a
          className="brand brand-image footer-brand"
          href="#beranda"
          onClick={(e) => {
            e.preventDefault()
            navigate?.('beranda')
          }}
        >
          <img src="/ft.png" alt="Fitrah Tumbuh" />
        </a>
        <p>
          Bertumbuh dalam fitrah,<br />
          <em>bergerak untuk sesama.</em>
        </p>
        <div className="socials">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
          </a>
          <a href="mailto:info@fitrahtumbuh.id" aria-label="Email">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Fitrah Tumbuh.</span>
        <span>Kabupaten Bandung · Kabupaten Sumedang</span>
      </div>
    </footer>
  )
}
