import { useState } from 'react'

const mobileItems = [
  ['beranda', '', 'Home'],
  ['produk', '', 'Produk'],
  ['kelas', '', 'Kelas'],
  ['talent-mapping', '', 'Talent'],
  ['services', '', 'Services']
]

export default function Header({ page, navigate, menuOpen, setMenuOpen }) {
  const [localOpen, setLocalOpen] = useState(false)
  
  const isOpen = menuOpen !== undefined ? menuOpen : localOpen
  const setIsOpen = setMenuOpen !== undefined ? setMenuOpen : setLocalOpen

  const go = (event, id) => {
    event.preventDefault()
    setIsOpen(false)
    navigate(id)
  }

  return (
    <>
      <style>{`
        .nav-dropdown-container {
          position: relative;
          display: inline-block;
        }
        .dropdown-label {
          color: var(--color-brand-muted, #6e645e);
          font-weight: 700;
          cursor: pointer;
          padding: 10px 14px;
          font-size: 14px;
          transition: color 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .dropdown-label:hover {
          color: var(--color-brand-brown, #5c3810);
        }
        .dropdown-content {
          display: none;
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          background-color: #ffffff;
          min-width: 170px;
          box-shadow: 0 10px 30px rgba(92, 56, 16, 0.08);
          border: 1px solid rgba(92, 56, 16, 0.08);
          border-radius: 12px;
          z-index: 100;
          padding: 8px 0;
          overflow: hidden;
        }
        .dropdown-content a {
          color: var(--color-brand-muted, #6e645e) !important;
          padding: 10px 18px !important;
          font-size: 13.5px !important;
          text-decoration: none;
          display: block;
          font-weight: 600 !important;
          transition: all 0.2s;
          text-align: left;
        }
        .dropdown-content a:hover {
          background-color: rgba(92, 56, 16, 0.04);
          color: var(--color-brand-brown, #5c3810) !important;
        }
        .nav-dropdown-container:hover .dropdown-content {
          display: block;
        }
        @media (max-width: 900px) {
          .nav-dropdown-container {
            display: flex;
            flex-direction: column;
            width: 100%;
          }
          .dropdown-label {
            padding: 12px 20px;
            font-size: 15px;
            border-bottom: 1px solid rgba(92, 56, 16, 0.04);
          }
          .dropdown-content {
            position: static;
            display: block;
            box-shadow: none;
            border: none;
            background: rgba(92, 56, 16, 0.02);
            transform: none;
            width: 100%;
            padding: 0;
            border-radius: 0;
          }
          .dropdown-content a {
            padding: 12px 32px !important;
            font-size: 14.5px !important;
          }
        }
      `}</style>

      <header className="header">
        <div className="nav-wrap">
          <a 
            className="brand brand-image" 
            href="#beranda" 
            onClick={(e) => go(e, 'beranda')} 
            aria-label="Fitrah Tumbuh"
          >
            <img src="/ft.png" alt="Fitrah Tumbuh" />
          </a>
          
          <button 
            className="menu-toggle" 
            aria-label="Buka menu" 
            aria-expanded={isOpen} 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '✕' : '☰'}
          </button>
          
          <nav className={`nav-links ${isOpen ? 'open' : ''}`} aria-label="Navigasi utama">
            <a className={page === 'beranda' ? 'active' : ''} href="#beranda" onClick={(e) => go(e, 'beranda')}>Home</a>
            
            {/* Explore Dropdown */}
            <div className="nav-dropdown-container">
              <span className="dropdown-label">Explore ▾</span>
              <div className="dropdown-content">
                <a href="#tentang-kami" onClick={(e) => go(e, 'tentang-kami')}>Tentang Kami</a>
                <a href="#program" onClick={(e) => go(e, 'program')}>Program</a>
                <a href="#kolaborasi" onClick={(e) => go(e, 'kolaborasi')}>Kolaborasi</a>
                <a href="#talent-mapping" onClick={(e) => go(e, 'talent-mapping')}>Talent Mapping</a>
                <a href="#insight" onClick={(e) => go(e, 'insight')}>Insight</a>
              </div>
            </div>

            <a className={page === 'produk' ? 'active' : ''} href="#produk" onClick={(e) => go(e, 'produk')}>Produk</a>
            <a className={page === 'kelas' ? 'active' : ''} href="#kelas" onClick={(e) => go(e, 'kelas')}>Kelas</a>
            <a className={page === 'services' ? 'active' : ''} href="#services" onClick={(e) => go(e, 'services')}>Services</a>
            <a className={page === 'portofolio' ? 'active' : ''} href="#portofolio" onClick={(e) => go(e, 'portofolio')}>Portfolio</a>
            <a className={page === 'free' ? 'active' : ''} href="#free" onClick={(e) => go(e, 'free')}>Free Resource</a>
            
            <a 
              className="button button-small mobile-only-cta" 
              href="#services" 
              onClick={(e) => { e.preventDefault(); navigate('services'); }}
            >
              Konsultasi ↗
            </a>
          </nav>
          
          <div className="nav-actions">
            <a 
              className="button button-small" 
              href="#services" 
              onClick={(e) => { e.preventDefault(); navigate('services'); }}
            >
              Konsultasi <span>↗</span>
            </a>
          </div>
        </div>
      </header>
      
      {/* Floating Pill Mobile bottom navigation bar */}
      <nav className="mobile-bottom-nav" aria-label="Navigasi mobile">
        {mobileItems.map((item) => {
          const id = item[0]
          const label = item[2]
          return (
            <a 
              key={id} 
              className={page === id ? 'active' : ''} 
              href={`#${id}`} 
              onClick={(e) => go(e, id)}
            >
              <i>
                {id === 'beranda' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                )}
                {id === 'produk' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                )}
                {id === 'kelas' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
                )}
                {id === 'services' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                )}
                {id === 'talent-mapping' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                )}
              </i>
              <span>{label}</span>
            </a>
          )
        })}
      </nav>
    </>
  )
}
