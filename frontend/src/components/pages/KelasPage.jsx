import { useState, useEffect } from 'react'
import { trackFormSubmit, trackPurchaseClick } from '../../utils/analytics'

import { API_BASE_URL, WHATSAPP_ADMIN } from '../../utils/config'

const FALLBACK_CLASSES = [
  {
    id: 5,
    title: "Tumbuh Session - Career Alignment",
    description: "Mini class interaktif untuk menemukan keselarasan karir berdasarkan potensi fitrah bakat unik Anda.",
    price: "Rp 120.000",
    image_url: "/8.JPG",
    type: "digital_learning",
    target_audience: "Pekerja",
    whatsapp_text: "Halo Fitrah Tumbuh, saya ingin mendaftar Kelas Tumbuh Session - Career Alignment.",
    is_free: false,
    speaker: "Coach Arif",
    class_date: "28 Aug 2026",
    class_time: "19:30 WIB",
    quota: 25
  },
  {
    id: 6,
    title: "Webinar Talent Discovery & Career Direction",
    description: "Webinar eksplorasi potensi diri untuk membidik arah karir masa depan bagi pemuda/mahasiswa.",
    price: "Rp 50.000",
    image_url: "/10.JPG",
    type: "digital_learning",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Fitrah Tumbuh, saya ingin mendaftar Webinar Talent Discovery.",
    is_free: false,
    speaker: "Coach Budi",
    class_date: "30 Aug 2026",
    class_time: "10:00 WIB",
    quota: 50
  }
]

export default function KelasPage() {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [audienceFilter, setAudienceFilter] = useState('all')

  // Modal registration
  const [selectedClass, setSelectedClass] = useState(null)
  const [formData, setFormData] = useState({
    name: '', email: '', whatsapp: '', age_category: 'Pemuda', source_info: 'Sosial Media'
  })
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [regSuccess, setRegSuccess] = useState(null)

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/store-items`)
        if (!response.ok) throw new Error()
        const data = await response.json()
        // Filter only digital learning
        const filtered = data.filter(item => item.type === 'digital_learning')
        setClasses(filtered.length > 0 ? filtered : FALLBACK_CLASSES)
      } catch (error) {
        console.warn('Fallback to static classes:', error)
        setClasses(FALLBACK_CLASSES)
      } finally {
        setLoading(false)
      }
    }
    fetchClasses()
  }, [])

  const handleOpenRegister = (cls) => {
    setSelectedClass(cls)
    setFormData({
      name: '', email: '', whatsapp: '', age_category: cls.target_audience || 'Pemuda', source_info: 'Sosial Media'
    })
    setFormError('')
    setRegSuccess(null)
    trackPurchaseClick(cls.title, cls.price)
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRegSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.whatsapp.trim()) {
      setFormError('Harap lengkapi nama, email, dan nomor WhatsApp.')
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
          product_id: selectedClass.id,
          product_title: selectedClass.title,
          category: formData.age_category,
          source_info: formData.source_info,
          notes: `Pendaftaran kelas. Narasumber: ${selectedClass.speaker || '-'}, Waktu: ${selectedClass.class_date || '-'} ${selectedClass.class_time || '-'}`
        })
      })

      if (!response.ok) throw new Error()

      const waMessage = `Saya ingin mendaftar ${selectedClass.title}.\n\nDetail Pendaftar:\n- Nama: ${formData.name.trim()}\n- Email: ${formData.email.trim()}\n- WhatsApp: ${formData.whatsapp.trim()}\n- Kategori: ${formData.age_category}\n- Info dari: ${formData.source_info}\n\nJadwal Kelas: ${selectedClass.class_date} pukul ${selectedClass.class_time} bersama ${selectedClass.speaker}`
      const waUrl = `https://wa.me/${WHATSAPP_ADMIN}?text=${encodeURIComponent(waMessage)}`

      setRegSuccess(waUrl)
      trackFormSubmit('Pendaftaran Kelas', selectedClass.title)
    } catch {
      setFormError('Gagal melakukan pendaftaran. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDirectWAQuery = (cls) => {
    const waMessage = `Saya ingin mendaftar ${cls.title}.`
    window.open(`https://wa.me/${WHATSAPP_ADMIN}?text=${encodeURIComponent(waMessage)}`, '_blank')
  }

  const filteredClasses = classes.filter(c => {
    return audienceFilter === 'all' || c.target_audience === audienceFilter
  })

  return (
    <div className="storefront-wrapper">
      <style>{`
        .class-meta-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin: 16px 0;
          font-size: 13px;
          color: var(--color-brand-muted);
          border-top: 1px solid rgba(92, 56, 16, 0.05);
          border-bottom: 1px solid rgba(92, 56, 16, 0.05);
          padding: 12px 0;
        }
        .class-meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .class-meta-label {
          font-weight: 700;
          color: var(--color-brand-brown);
          width: 90px;
        }
        .class-filter-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          background: #ffffff;
          padding: 16px 24px;
          border-radius: 16px;
          border: 1px solid rgba(92, 56, 16, 0.06);
        }
        @media (max-width: 768px) {
          .class-filter-controls {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }
        }
      `}</style>

      {/* Header controls */}
      <div className="class-filter-controls">
        <span style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--color-brand-brown)' }}>
          Program Pembelajaran Aktif ({filteredClasses.length} Terjadwal)
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
        <p style={{ textAlign: 'center', color: 'var(--color-brand-brown)' }}>Memuat agenda kelas...</p>
      ) : filteredClasses.length === 0 ? (
        <div className="empty-state">
          <h3>Belum ada kelas terjadwal</h3>
          <p>Silakan periksa kembali nanti atau hubungi kami untuk program kemitraan.</p>
        </div>
      ) : (
        <div className="catalog-grid">
          {filteredClasses.map(c => (
            <article className="catalog-card" key={c.id} style={{ position: 'relative', overflow: 'hidden' }}>
              {/* Blurred card content */}
              <div style={{ filter: 'blur(3.5px)', opacity: 0.6, pointerEvents: 'none', transition: 'all 0.3s ease' }}>
                <div className="catalog-img-box">
                  <img src={c.image_url || '/8.JPG'} alt={c.title} />
                  <div className="catalog-badge-row">
                    <span className="catalog-badge type-badge" style={{ backgroundColor: '#fdf6e2', color: '#cba819', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      Digital Learning
                    </span>
                    <span className="catalog-badge audience-badge">{c.target_audience}</span>
                  </div>
                </div>
                <div className="catalog-info" style={{ paddingBottom: '76px' }}>
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                  
                  <div className="class-meta-list">
                    <div className="class-meta-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-brand-green)' }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      <span className="class-meta-label">Mentor</span>
                      <span>{c.speaker || 'Tim Ahli'}</span>
                    </div>
                    <div className="class-meta-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-brand-green)' }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      <span className="class-meta-label">Jadwal</span>
                      <span>{c.class_date || '-'} ({c.class_time || 'TBA'})</span>
                    </div>
                    {c.quota > 0 && (
                      <div className="class-meta-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-brand-green)' }}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        <span className="class-meta-label">Kuota</span>
                        <span>Maksimal {c.quota} Peserta</span>
                      </div>
                    )}
                  </div>

                  <div className="catalog-footer-row">
                    <span className="price-tag">{c.price}</span>
                  </div>
                </div>
              </div>

              {/* Locked Professional Overlay in the Center */}
              <div style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                zIndex: 3,
                pointerEvents: 'none'
              }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-brand-brown)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 6px 20px rgba(92, 56, 16, 0.25)'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '900',
                  letterSpacing: '1px',
                  color: '#ffffff',
                  backgroundColor: 'var(--color-brand-brown)',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}>
                  SEGERA HADIR
                </span>
              </div>

              {/* Active clickable WhatsApp Button at the bottom */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                zIndex: 5
              }}>
                <button 
                  onClick={() => handleDirectWAQuery(c)} 
                  className="button button-small" 
                  style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: 'var(--color-brand-brown)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  Tanya Kelas via WA
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Class Registration Modal */}
      {selectedClass && (
        <div className="modal-overlay" onClick={() => setSelectedClass(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>Formulir Pendaftaran Kelas</h2>
                <p style={{ fontSize: '13px', color: 'var(--color-brand-muted)' }}>{selectedClass.title}</p>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedClass(null)}>✕</button>
            </div>
            <div className="modal-body">
              {regSuccess ? (
                <div className="modal-success-box">
                  <div className="success-circle" style={{ backgroundColor: 'var(--color-brand-yellow)' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h3>Pendaftaran Tersimpan!</h3>
                  <div style={{ textAlign: 'left', background: 'var(--color-brand-cream, #fbf9f4)', border: '1px solid rgba(92, 56, 16, 0.1)', borderRadius: '12px', padding: '16px', margin: '12px 0', width: '100%' }}>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-brand-brown)', fontSize: '14px', fontWeight: 800, marginBottom: '8px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                      Instruksi Pembayaran (Transfer Bank)
                    </h4>
                    <p style={{ fontSize: '13px', color: 'var(--color-brand-dark)', lineHeight: 1.5, marginBottom: '6px' }}>
                      Silakan lakukan transfer investasi belajar sebesar <strong>{selectedClass.price}</strong> ke rekening kami:
                    </p>
                    <p style={{ fontSize: '14px', color: 'var(--color-brand-dark)', fontWeight: 700, margin: '4px 0', fontFamily: 'monospace' }}>
                      Bank Mandiri: 130-00-1234-5678 <br/>
                      a.n. Fitrah Tumbuh Asri
                    </p>
                    <p style={{ fontSize: '12px', color: 'var(--color-brand-muted)', marginTop: '8px' }}>
                      Setelah transfer, klik tombol WhatsApp di bawah untuk mengirim bukti bayar dan konfirmasi. Admin akan memverifikasi pembayaran Anda dan mengirimkan tautan (link) kelas webinar / informasi masuk grup mentoring.
                    </p>
                  </div>
                  <div className="success-actions-vertical">
                    <a href={regSuccess} target="_blank" rel="noreferrer" className="button" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                      Konfirmasi via WhatsApp ↗
                    </a>
                    <button onClick={() => setSelectedClass(null)} className="secondary-button">Tutup</button>
                  </div>
                </div>
              ) : (
                <form className="modal-form" onSubmit={handleRegSubmit}>
                  <div className="modal-field">
                    <label>Nama Lengkap Peserta*</label>
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
                    <label>Kategori Peserta / Usia*</label>
                    <select name="age_category" className="modal-input" value={formData.age_category} onChange={handleFormChange}>
                      <option value="Orangtua">Orangtua (Parenting)</option>
                      <option value="Pemuda">Pemuda (Mahasiswa/Pelajar)</option>
                      <option value="Pekerja">Pekerja / Profesional</option>
                      <option value="Guru &amp; Pendidik">Guru &amp; Pendidik</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div className="modal-field">
                    <label>Sumber Informasi Pendaftaran*</label>
                    <select name="source_info" className="modal-input" value={formData.source_info} onChange={handleFormChange}>
                      <option value="Sosial Media">Instagram / Sosial Media</option>
                      <option value="WhatsApp Group">WhatsApp Group</option>
                      <option value="Teman / Keluarga">Teman / Rujukan Keluarga</option>
                      <option value="Website">Website Fitrah Tumbuh</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  {formError && <div className="modal-error">{formError}</div>}
                  
                  <div className="modal-actions">
                    <button type="button" className="secondary-button" onClick={() => setSelectedClass(null)} disabled={isSubmitting}>Batal</button>
                    <button type="submit" className="button" disabled={isSubmitting}>
                      {isSubmitting ? 'Mendaftarkan...' : 'Kirim Pendaftaran ↗'}
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
