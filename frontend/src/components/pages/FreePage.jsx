import { useState, useEffect } from 'react'
import { trackFormSubmit } from '../../utils/analytics'

import { API_BASE_URL } from '../../utils/config'

const FALLBACK_FREE_RESOURCES = [
  {
    id: 9,
    title: "Youth Project Starter Checklist",
    description: "Lembar panduan perancangan proyek mikro sosial/bisnis bagi generasi muda. Memuat 15 checklist utama dari ideasi hingga peluncuran perdana.",
    price: "Rp 0",
    image_url: "/14.jpg",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Fitrah Tumbuh, saya ingin mengunduh Youth Project Starter Checklist secara gratis.",
    download_link: "https://fitrahtumbuh.id/downloads/youth-checklist.pdf",
    is_free: true
  }
]

const renderEbookCover = (p) => {
  let cleanTitle = p.title.replace(/^Ebook\s+Modul\s+/i, 'Modul ')
                          .replace(/^Ebook:\s+/i, '')
                          .replace(/^Ebook\s+/i, '')
                          .trim();
  
  let titleParts = cleanTitle.split(' - ');
  let titleText = titleParts[0];
  let subtitleText = titleParts[1] || "";

  const palettes = [
    { bg: 'linear-gradient(135deg, #1C523A 0%, #0E3523 100%)', text: '#FDFCF7', muted: '#CDE5DB', border: 'rgba(255, 255, 255, 0.22)' }, // Emerald Green
    { bg: 'linear-gradient(135deg, #A83A24 0%, #762312 100%)', text: '#FDFCF7', muted: '#F3D2CC', border: 'rgba(255, 255, 255, 0.22)' }, // Terracotta
    { bg: 'linear-gradient(135deg, #234582 0%, #112857 100%)', text: '#FDFCF7', muted: '#CCD7ED', border: 'rgba(255, 255, 255, 0.22)' }, // Indigo Blue
    { bg: 'linear-gradient(135deg, #C58A24 0%, #906110 100%)', text: '#FDFCF7', muted: '#F7E7CD', border: 'rgba(255, 255, 255, 0.22)' }, // Warm Ochre
    { bg: 'linear-gradient(135deg, #742551 0%, #4D1232 100%)', text: '#FDFCF7', muted: '#ECCFE0', border: 'rgba(255, 255, 255, 0.22)' }, // Plum
    { bg: 'linear-gradient(135deg, #2E5A36 0%, #19381E 100%)', text: '#FDFCF7', muted: '#CEE2D2', border: 'rgba(255, 255, 255, 0.22)' }, // Deep Forest
    { bg: 'linear-gradient(135deg, #6C7030 0%, #474B19 100%)', text: '#FDFCF7', muted: '#E7E9CD', border: 'rgba(255, 255, 255, 0.22)' }, // Olive
    { bg: 'linear-gradient(135deg, #206E6C 0%, #0E4948 100%)', text: '#FDFCF7', muted: '#CDE5E4', border: 'rgba(255, 255, 255, 0.22)' }, // Teal
    { bg: 'linear-gradient(135deg, #6C648B 0%, #473E63 100%)', text: '#FDFCF7', muted: '#E5E2ED', border: 'rgba(255, 255, 255, 0.22)' }, // Lavender
    { bg: 'linear-gradient(135deg, #B56B45 0%, #854826 100%)', text: '#FDFCF7', muted: '#F6E2D8', border: 'rgba(255, 255, 255, 0.22)' }, // Clay
    { bg: 'linear-gradient(135deg, #A86472 0%, #7B414C 100%)', text: '#FDFCF7', muted: '#F4E2E5', border: 'rgba(255, 255, 255, 0.22)' }, // Muted Rose
    { bg: 'linear-gradient(135deg, #353942 0%, #1D2026 100%)', text: '#FDFCF7', muted: '#D2D4D7', border: 'rgba(255, 255, 255, 0.22)' }, // Dark Charcoal
    { bg: 'linear-gradient(135deg, #9C7A4A 0%, #6F532B 100%)', text: '#FDFCF7', muted: '#F2E8DC', border: 'rgba(255, 255, 255, 0.22)' }, // Bronze
    { bg: 'linear-gradient(135deg, #5C3810 0%, #3B2104 100%)', text: '#FDFCF7', muted: '#EFE3D5', border: 'rgba(255, 255, 255, 0.22)' }, // Dark Wood
    { bg: 'linear-gradient(135deg, #B83A58 0%, #852136 100%)', text: '#FDFCF7', muted: '#F7D2DB', border: 'rgba(255, 255, 255, 0.22)' }, // Crimson
    { bg: 'linear-gradient(135deg, #4A7A96 0%, #2A5168 100%)', text: '#FDFCF7', muted: '#D8E5ED', border: 'rgba(255, 255, 255, 0.22)' }  // Ocean Blue
  ];
  const palette = palettes[p.id % palettes.length];

  const titleLower = cleanTitle.toLowerCase();
  
  // Choose icon based on topic keyword
  let iconElement;
  if (titleLower.includes('menggali akar')) {
    iconElement = (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={palette.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12M12 12a5 5 0 0 1 5-5h3M12 12a5 5 0 0 0-5-5H4M20 7c0-2-2-4-5-4S12 5 12 7M4 7c0-2 2-4 5-4s3 2 3 4" />
        <path d="M12 12c-1.5 2-3.5 3-6 3m6-3c1.5 2 3.5 3 6 3" />
      </svg>
    );
  } else if (titleLower.includes('akhlak') || titleLower.includes('iman') || titleLower.includes('hygiene') || titleLower.includes('ibadah') || titleLower.includes('istiqamah')) {
    iconElement = (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={palette.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  } else if (titleLower.includes('jalan') || titleLower.includes('waktu') || titleLower.includes('rtp') || titleLower.includes('fase') || titleLower.includes('peluncuran') || titleLower.includes('peta')) {
    iconElement = (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={palette.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    );
  } else if (titleLower.includes('skill') || titleLower.includes('talent') || titleLower.includes('anugerah') || titleLower.includes('digital')) {
    iconElement = (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={palette.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    );
  } else if (titleLower.includes('sosial') || titleLower.includes('proyek') || titleLower.includes('mentor') || titleLower.includes('kontribusi')) {
    iconElement = (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={palette.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    );
  } else {
    iconElement = (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={palette.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/>
      </svg>
    );
  }

  return (
    <div className="custom-ebook-cover-rendered" style={{ background: palette.bg }}>
      <div className="ebook-cover-spine"></div>
      <div className="ebook-cover-border" style={{ borderColor: palette.border }}></div>
      <div className="ebook-cover-content">
        <span className="ebook-cover-tag" style={{ color: palette.muted }}>EBOOK</span>
        <div className="ebook-cover-icon-box" style={{ borderColor: palette.border }}>
          {iconElement}
        </div>
        <h4 className="ebook-cover-title" style={{ color: palette.text }}>{titleText}</h4>
        {subtitleText && <p className="ebook-cover-subtitle" style={{ color: palette.muted }}>{subtitleText}</p>}
        <div className="ebook-cover-footer-brand" style={{ color: palette.muted }}>Fitrah Tumbuh</div>
      </div>
    </div>
  );
};

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

        /* 3D book cover styles for Free Resources */
        .catalog-img-box {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: radial-gradient(circle, #FCFAF6 0%, #EFEBE4 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          box-sizing: border-box;
        }
        .book-3d-wrapper {
          perspective: 1000px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 110px;
          height: 154px;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .catalog-card:hover .book-3d-wrapper {
          transform: scale(1.08) translateY(-6px) rotateY(-6deg) rotateX(2deg);
        }

        .custom-ebook-cover-rendered {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 12px 10px 12px 18px;
          box-sizing: border-box;
          text-align: center;
          align-items: center;
          justify-content: space-between;
          border-radius: 2px 4px 4px 2px;
          transform: rotateY(-16deg) rotateX(4deg) rotateZ(-1deg);
          transform-style: preserve-3d;
          box-shadow: 
            8px 12px 24px rgba(92, 56, 16, 0.22),
            2px 0 4px rgba(0, 0, 0, 0.08),
            inset 1px 1px 0px rgba(255, 255, 255, 0.15);
          border-bottom: 1px solid rgba(0,0,0,0.12);
        }
        .custom-ebook-cover-rendered::after {
          content: '';
          position: absolute;
          top: 3px;
          bottom: 3px;
          right: -4px;
          width: 4px;
          background: linear-gradient(to right, #E0E0E0 0%, #FFFFFF 50%, #DCDCDC 100%);
          border-radius: 0 2px 2px 0;
          box-shadow: 1px 1px 2px rgba(0,0,0,0.08);
          transform: rotateY(40deg);
          transform-origin: left center;
          z-index: 1;
          pointer-events: none;
        }
        .custom-ebook-cover-rendered::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 3px 3px;
          pointer-events: none;
          mix-blend-mode: overlay;
          z-index: 2;
        }
        .ebook-cover-spine {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 8px;
          background: linear-gradient(to right, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.03) 60%, rgba(255,255,255,0.08) 80%, rgba(0,0,0,0.06) 100%);
          border-right: 1px solid rgba(0,0,0,0.05);
          z-index: 3;
        }
        .ebook-cover-border {
          position: absolute;
          top: 6px;
          left: 12px;
          right: 6px;
          bottom: 6px;
          border: 1px solid;
          pointer-events: none;
          border-radius: 2px;
          z-index: 3;
          opacity: 0.85;
        }
        .ebook-cover-border::before {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          right: 2px;
          bottom: 2px;
          border: 1px solid;
          border-color: inherit;
          opacity: 0.3;
          border-radius: 1px;
          pointer-events: none;
        }
        .ebook-cover-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          width: 100%;
          z-index: 4;
        }
        .ebook-cover-tag {
          font-size: 7px;
          font-weight: 800;
          letter-spacing: 0.2em;
          opacity: 0.65;
          margin-bottom: 2px;
        }
        .ebook-cover-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid;
          margin-bottom: 4px;
        }
        .ebook-cover-title {
          font-family: 'Playfair Display', 'Georgia', serif;
          font-size: 11px;
          font-weight: 900;
          line-height: 1.2;
          margin: 0 0 2px 0;
          letter-spacing: -0.01em;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .ebook-cover-subtitle {
          font-size: 8px;
          line-height: 1.3;
          margin: 0;
          font-weight: 600;
          max-width: 95%;
          opacity: 0.75;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .ebook-cover-footer-brand {
          font-size: 6.5px;
          font-weight: 800;
          letter-spacing: 0.08em;
          opacity: 0.5;
          margin-top: 4px;
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
                <div className="book-3d-wrapper">
                  {renderEbookCover(r)}
                </div>
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
                    <a href={successLink} target="_blank" rel="noreferrer" className="button" style={{ backgroundColor: 'var(--color-brand-green)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      Unduh File PDF Sekarang ↗
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
