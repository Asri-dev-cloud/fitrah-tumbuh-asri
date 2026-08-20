import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Ecosystem from './components/Ecosystem'
import Impact from './components/Impact'
import Footer from './components/Footer'
import InteriorPage from './components/InteriorPage'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [page, setPage] = useState('beranda')
  const navigate = (next) => { setPage(next); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const home = page === 'beranda'
  return <div className="site-shell"><Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} page={page} navigate={navigate} /><main>{home ? <><Hero /><Ecosystem /><Impact /></> : <InteriorPage page={page} navigate={navigate} />}</main><Footer navigate={navigate} /></div>
}
export default App
