import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import InteriorPage from './components/InteriorPage'
import RegistrationPage from './components/pages/RegistrationPage'
import HomePage from './components/pages/HomePage'
import AdminDashboard from './components/pages/AdminDashboard'
import { trackPageView } from './utils/analytics'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  
  // Read hash from URL or default to 'beranda'
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '')
    // Allowed pages
    const validPages = ['beranda', 'daftar', 'produk', 'kelas', 'services', 'portofolio', 'free', 'admin', 'tentang-kami', 'program', 'kolaborasi', 'talent-mapping', 'insight']
    if (validPages.includes(hash)) {
      return hash
    }
    return 'beranda'
  }

  const [page, setPage] = useState(getInitialPage)

  // Listen to browser forward/back buttons (hash changes)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash) {
        setPage(hash)
      } else {
        setPage('beranda')
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    // Synchronize initial hash if empty
    if (!window.location.hash) {
      window.location.hash = page
    }

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [page])

  // Track page views on state changes
  useEffect(() => {
    trackPageView(page)
  }, [page])

  const navigate = (next) => {
    window.location.hash = next
    setPage(next)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (page === 'admin') {
    return <AdminDashboard navigate={navigate} />
  }

  const home = page === 'beranda'
  return (
    <div className="site-shell">
      <Header 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        page={page} 
        navigate={navigate} 
      />
      <main>
        {page === 'daftar' ? (
          <RegistrationPage navigate={navigate} />
        ) : home ? (
          <HomePage navigate={navigate} />
        ) : (
          <InteriorPage page={page} navigate={navigate} />
        )}
      </main>
      <Footer navigate={navigate} />
    </div>
  )
}

export default App
