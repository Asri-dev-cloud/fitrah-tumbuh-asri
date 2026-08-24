import { useState, useEffect } from 'react'
import { trackFormSubmit } from '../../utils/analytics'

const API_BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

const FALLBACK_FREE_RESOURCES = [
  {
    id: 8,
    title: "Fitrah Family Check: Seberapa Bertumbuh Keluarga Kita?",
    description: "Kuesioner evaluasi mandiri terpadu untuk mendeteksi tingkat pertumbuhan nalar belajar dan kehangatan ikatan antar anggota keluarga.",
    price: "Rp 0",
    image_url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=600&q=80",
    type: "digital_product",
    target_audience: "Orangtua",
    whatsapp_text: "Halo Fitrah Tumbuh, saya ingin mengunduh Fitrah Family Check secara gratis.",
    download_link: "https://fitrahtumbuh.id/downloads/family-check.pdf",
    is_free: true
  },
  {
    id: 9,
    title: "Youth Project Starter Checklist",
    description: "Lembar panduan perancangan proyek mikro sosial/bisnis bagi generasi muda. Memuat 15 checklist utama dari ideasi hingga peluncuran perdana.",
    price: "Rp 0",
    image_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Fitrah Tumbuh, saya ingin mengunduh Youth Project Starter Checklist secara gratis.",
    download_link: "https://fitrahtumbuh.id/downloads/youth-checklist.pdf",
    is_free: true
  }
]

export default function FreePage() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [audienceFilter, setAudienceFilter] = useState('all')

  // Modal State
  const [selectedResource, setSelectedResource] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', category: 'Orangtua' })
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successLink, setSuccessLink] = useState(null)

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/store-items`)
        if (!response.ok) throw new Error()
        const data = await response.json()
        // Filter free items
        const filtered = data.filter(item => item.is_free === true)
        setResources(filtered.length > 0 ? filtered : FALLBACK_FREE_RESOURCES)
      } catch (error) {
        console.warn('Fallback to static free resources:', error)
        setResources(FALLBACK_FREE_RESOURCES)
      } finally {
        setLoading(false)
      }
    }
    fetchResources()
  }, [])

  const handleOpenDownload = (res) => {
    setSelectedResource(res)
    setFormData({ name: '', email: '', whatsapp: '', category: res.target_audience || 'Orangtua' })
    setFormError('')
    setSuccessLink(null)
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.whatsapp.trim()) {
      setFormError('Harap isi semua kolom bertanda bintang (*).')
      return
    }

    setIsSubmitting(true)
    setFormError('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          whatsapp: formData.whatsapp.trim(),
          product_id: selectedResource.id,
          product_title: `Lead Magnet: ${selectedResource.title}`,
          category: formData.category,
          notes: 'Pengunduh file resource gratis.'
        })
      })

      if (!response.ok) throw new Error()

      // Set download link on success
      setSuccessLink(selectedResource.download_link || 'https://fitrahtumbuh.id/downloads/default.pdf')
      trackFormSubmit('Unduh Resource Gratis', selectedResource.title)
    } catch {
      setFormError('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredResources = resources.filter(r => {
    return audienceFilter === 'all' || r.target_audience === audienceFilter
  })

  return (
    <div className="storefront-wrapper">
      <style>{`
        .free-hero-desc {
          text-align: center;
          max-width: 650px;
          margin: 0 auto 30px auto;
          color: var(--color-brand-muted);
          font-size: 14.5px;
          line-height: 1.6;
        }
        .free-badge-label {
          background-color: var(--color-brand-soft-green);
          color: var(--color-brand-green);
          font-weight: 800;
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 99px;
          text-transform: uppercase;
        }
      `}</style>

      <div className="free-hero-desc">
        <p>
          Mulai langkah awal pertumbuhan keluarga dan karir Anda menggunakan lembar kerja (worksheet), panduan taktis, dan kuesioner evaluasi mandiri dari kami secara gratis.
        </p>
      </div>

      {/* Filter controls */}
      <div className="class-filter-controls">
        <span style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--color-brand-brown)' }}>
          Resource Gratis Tersedia ({filteredResources.length})
        </span>
        <div className="audience-labels" style={{ margin: 0 }}>
          <button onClick={() => setAudienceFilter('all')} className={`filter-btn ${audienceFilter === 'all' ? 'active' : ''}`}>Semua</button>
          <button onClick={() => setAudienceFilter('Orangtua')} className={`filter-btn ${audienceFilter === 'Orangtua' ? 'active' : ''}`}>Orangtua</button>
          <button onClick={() => setAudienceFilter('Pemuda')} className={`filter-btn ${audienceFilter === 'Pemuda' ? 'active' : ''}`}>Pemuda</button>
          <button onClick={() => setAudienceFilter('Pekerja')} className={`filter-btn ${audienceFilter === 'Pekerja' ? 'active' : ''}`}>Pekerja</button>
        </div>
      </div>

      {/* Catalog Grid */}
      {loading ? (
        <p style={{ textAlign: 'center', color: 'var(--color-brand-brown)' }}>Memuat berkas gratis...</p>
      ) : filteredResources.length === 0 ? (
        <div className="empty-state">
          <h3>Tidak ada berkas</h3>
          <p>Silakan pilih kategori lainnya.</p>
        </div>
      ) : (
        <div className="catalog-grid">
          {filteredResources.map(r => (
            <article className="catalog-card" key={r.id}>
              <div className="catalog-img-box">
                <img src={r.image_url || 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80'} alt={r.title} />
                <div className="catalog-badge-row">
                  <span className="free-badge-label">FREE resource</span>
                  <span className="catalog-badge audience-badge">{r.target_audience}</span>
                </div>
              </div>
              <div className="catalog-info">
                <h3>{r.title}</h3>
                <p>{r.description}</p>
                
                <div className="catalog-footer-row" style={{ marginTop: 'auto', paddingTop: '15px' }}>
                  <span className="price-tag free-price">GRATIS</span>
                  <button onClick={() => handleOpenDownload(r)} className="button">
                    Dapatkan Resource ↗
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Download Signup Modal */}
      {selectedResource && (
        <div className="modal-overlay" onClick={() => setSelectedResource(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>{successLink ? 'Unduh File Anda' : 'Isi Form untuk Mengunduh'}</h2>
                <p style={{ fontSize: '13px', color: 'var(--color-brand-muted)' }}>{selectedResource.title}</p>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedResource(null)}>✕</button>
            </div>
            <div className="modal-body">
              {successLink ? (
                <div className="modal-success-box">
                  <div className="success-circle" style={{ backgroundColor: 'var(--color-brand-green)' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h3>Resource Siap Diunduh!</h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-brand-muted)', lineHeight: 1.5 }}>
                    Data Anda berhasil disimpan. Silakan klik tombol di bawah untuk langsung membuka / mengunduh file PDF panduan.
                  </p>
                  <div className="success-actions-vertical">
                    <a href={successLink} target="_blank" rel="noreferrer" className="button" style={{ backgroundColor: 'var(--color-brand-green)' }}>
                      📂 Unduh File PDF Sekarang ↗
                    </a>
                    <button onClick={() => setSelectedResource(null)} className="secondary-button">
                      Selesai &amp; Tutup
                    </button>
                  </div>
                </div>
              ) : (
                <form className="modal-form" onSubmit={handleFormSubmit}>
                  <div className="modal-field">
                    <label>Nama Lengkap*</label>
                    <input name="name" type="text" className="modal-input" required placeholder="Nama Lengkap Anda" value={formData.name} onChange={handleFormChange} />
                  </div>
                  
                  <div className="modal-field">
                    <label>Alamat Email Aktif*</label>
                    <input name="email" type="email" className="modal-input" required placeholder="nama@email.com" value={formData.email} onChange={handleFormChange} />
                  </div>

                  <div className="modal-field">
                    <label>Nomor WhatsApp*</label>
                    <input name="whatsapp" type="tel" className="modal-input" required placeholder="Contoh: 08123456789" value={formData.whatsapp} onChange={handleFormChange} />
                  </div>

                  <div className="modal-field">
                    <label>Kategori Utama Anda*</label>
                    <select name="category" className="modal-input" value={formData.category} onChange={handleFormChange}>
                      <option value="Orangtua">Orangtua (Parenting &amp; Keluarga)</option>
                      <option value="Pemuda">Pemuda (Mahasiswa/Pelajar)</option>
                      <option value="Pekerja">Pekerja / Profesional</option>
                    </select>
                  </div>

                  {formError && <div className="modal-error">{formError}</div>}
                  
                  <div className="modal-actions">
                    <button type="button" className="secondary-button" onClick={() => setSelectedResource(null)} disabled={isSubmitting}>Batal</button>
                    <button type="submit" className="button" disabled={isSubmitting}>
                      {isSubmitting ? 'Menyiapkan Link...' : 'Unduh Berkas ↗'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
