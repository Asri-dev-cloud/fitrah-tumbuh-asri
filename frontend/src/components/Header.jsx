import { useState } from 'react'

const navItems = [
  ['beranda', 'Beranda'],
  ['tentang-kami', 'Tentang Kami'],
  ['filosofi', 'Filosofi Fitrah'],
  ['program', 'Program'],
  ['edukasi', 'Edukasi'],
  ['portofolio', 'Portofolio'],
  ['kolaborasi', 'Kolaborasi']
]

const mobileItems = [
  ['beranda', '⌂', 'Home'],
  ['program', '◒', 'Program'],
  ['edukasi', '▤', 'Edukasi'],
  ['dampak', '⌁', 'Dampak'],
  ['daftar', '✎', 'Daftar']
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
            {navItems.map(([id, item]) => (
              <a 
                className={page === id ? 'active' : ''} 
                key={id} 
                href={`#${id}`} 
                onClick={(e) => go(e, id)}
              >
                {item}
              </a>
            ))}
            <a 
              className="button button-small mobile-only-cta" 
              href="#daftar" 
              onClick={(e) => { e.preventDefault(); navigate('daftar'); }}
              style={{ marginTop: '8px' }}
            >
              Daftar ↗
            </a>
          </nav>
          
          <div className="nav-actions">
            <a 
              className="button button-small" 
              href="#daftar" 
              onClick={(e) => { e.preventDefault(); navigate('daftar'); }}
            >
              Daftar <span>↗</span>
            </a>
          </div>
        </div>
      </header>
      
      {/* Floating Pill Mobile bottom navigation bar (Moved outside header to viewport body) */}
      <nav className="mobile-bottom-nav" aria-label="Navigasi mobile">
        {mobileItems.map(([id, , label]) => (
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
              {id === 'program' && (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>
              )}
              {id === 'edukasi' && (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
              )}
              {id === 'dampak' && (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              )}
              {id === 'daftar' && (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
              )}
            </i>
            <span>{label}</span>
          </a>
        ))}
      </nav>
    </>
  )
}
