import { useState } from 'react'
import { trackFormSubmit } from '../../utils/analytics'

import { API_BASE_URL, WHATSAPP_ADMIN } from '../../utils/config'

const SERVICE_CATEGORIES = [
  {
    id: 'program_design',
    title: "1. Program Design",
    description: "Membantu sekolah, komunitas, atau organisasi merancang program belajar/pemberdayaan berbasis alam, kepemudaan, dan potensi fitrah secara komprehensif.",
    icon: ""
  },
  {
    id: 'project_dev',
    title: "2. Project Development",
    description: "Mengubah ide dan inisiatif awal menjadi rancangan proyek nyata yang matang, logis, terukur, dan siap diimplementasikan di lapangan.",
    icon: ""
  },
  {
    id: 'proposal_pitch',
    title: "3. Proposal & Pitch Deck",
    description: "Membantu menyusun dokumen proposal kemitraan terstruktur serta slide presentasi (pitch deck) yang memikat sponsor atau lembaga pendana.",
    icon: ""
  },
  {
    id: 'training_workshop',
    title: "4. Training & Workshop",
    description: "Penyelenggaraan pelatihan, seminar, dan lokakarya interaktif bagi pendidik, pengurus organisasi, komunitas, maupun pelaku UMKM.",
    icon: ""
  },
  {
    id: 'mentoring',
    title: "5. Mentoring & Pendampingan",
    description: "Pendampingan personal atau kelompok secara berkala bagi pemuda, inisiator sosial, dan organisasi dalam mengawal jalannya proyek/karir.",
    icon: ""
  }
]

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null) // null or category title
  const [formData, setFormData] = useState({
    name: '', institution: '', whatsapp: '', email: '', service_type: 'Program Design', notes: '', execution_time: 'Segera (Bulan Ini)'
  })
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [consultSuccess, setConsultSuccess] = useState(null)

  const handleOpenConsult = (service) => {
    setSelectedService(service ? service.title : 'Konsultasi Umum')
    setFormData({
      name: '', 
      institution: '', 
      whatsapp: '', 
      email: '', 
      service_type: service ? service.title.replace(/^\d\.\s/, '') : 'Program Design', 
      notes: '', 
      execution_time: 'Segera (Bulan Ini)'
    })
    setFormError('')
    setConsultSuccess(null)
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleConsultSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.institution.trim() || !formData.whatsapp.trim() || !formData.email.trim() || !formData.notes.trim()) {
      setFormError('Harap lengkapi semua kolom bertanda bintang (*).')
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
          product_title: `Konsultasi: ${formData.service_type}`,
          notes: formData.notes.trim(),
          category: formData.service_type,
          institution: formData.institution.trim(),
          execution_time: formData.execution_time
        })
      })

      if (!response.ok) throw new Error()

      const waMessage = `Saya ingin konsultasi project ${formData.service_type}.\n\nDetail Konsultasi:\n- Nama: ${formData.name.trim()}\n- Lembaga/Instansi: ${formData.institution.trim()}\n- Email: ${formData.email.trim()}\n- WhatsApp: ${formData.whatsapp.trim()}\n- Estimasi Waktu: ${formData.execution_time}\n- Kebutuhan: ${formData.notes.trim()}`
      const waUrl = `https://wa.me/${WHATSAPP_ADMIN}?text=${encodeURIComponent(waMessage)}`

      setConsultSuccess(waUrl)
      trackFormSubmit('Konsultasi Project', formData.service_type)
    } catch {
      setFormError('Gagal mengirim formulir konsultasi. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderServiceIcon = (id) => {
    if (id === 'program_design') {
      return <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-brown)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.35824 19.5 5.2583 20.5 4.35857 21C3.35857 21.5 6 22 12 22Z"/><circle cx="7.5" cy="10.5" r="1.5"/><circle cx="11.5" cy="7.5" r="1.5"/><circle cx="16.5" cy="9.5" r="1.5"/></svg>;
    }
    if (id === 'project_dev') {
      return <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22h20"/><path d="M12 22V12M12 12a5 5 0 0 1 5-5h3M12 12a5 5 0 0 0-5-5H4M20 7c0-2-2-4-5-4S12 5 12 7M4 7c0-2 2-4 5-4s3 2 3 4"/></svg>;
    }
    if (id === 'proposal_pitch') {
      return <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
    }
    if (id === 'training_workshop') {
      return <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-brown)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-3-3.87"/><path d="M9 21v-2a4 4 0 0 0-3-3.87"/><rect x="3" y="4" width="18" height="8" rx="2"/><path d="M12 12v9"/></svg>;
    }
    if (id === 'mentoring') {
      return <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-yellow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
    }
    return null;
  }

  return (
    <div className="storefront-wrapper">
      <style>{`
        .services-intro-section {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 40px auto;
        }
        .services-intro-section p {
          color: var(--color-brand-muted);
          font-size: 15px;
          line-height: 1.6;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 50px;
        }
        .service-card {
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid rgba(92, 56, 16, 0.06);
          padding: 30px;
          box-shadow: 0 10px 30px rgba(92, 56, 16, 0.02);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 40px rgba(92, 56, 16, 0.08);
          border-color: rgba(92, 56, 16, 0.15);
        }
        .service-icon {
          font-size: 40px;
          margin-bottom: 20px;
        }
        .service-card h3 {
          font-size: 18px;
          font-weight: 800;
          color: var(--color-brand-brown);
          margin-bottom: 12px;
        }
        .service-card p {
          color: var(--color-brand-muted);
          font-size: 13.5px;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .cta-banner-services {
          background: linear-gradient(135deg, var(--color-brand-brown) 0%, #3a2208 100%);
          border-radius: 32px;
          padding: 60px 40px;
          text-align: center;
          color: #ffffff !important;
          box-shadow: 0 20px 40px rgba(92, 56, 16, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .cta-banner-services h2 {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 12px;
          color: #ffffff !important;
        }
        .cta-banner-services p {
          color: rgba(255, 255, 255, 0.9) !important;
          font-size: 15px;
          max-width: 600px;
          margin: 0 auto 30px auto;
          line-height: 1.6;
        }
      `}</style>

      {/* Intro */}
      <div className="services-intro-section">
        <p>
          Kami mendampingi sekolah, komunitas, instansi, dan organisasi kemasyarakatan dalam merancang dan mengeksekusi program berbasis potensi fitrah, literasi alam, serta pengembangan kepemimpinan pemuda.
        </p>
      </div>

      {/* Service Grid */}
      <div className="services-grid">
        {SERVICE_CATEGORIES.map(service => (
          <article className="service-card" key={service.id}>
            <div>
              <div className="service-icon">{renderServiceIcon(service.id)}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
            <button 
              onClick={() => handleOpenConsult(service)} 
              className="button button-small" 
              style={{ width: '100%', justifySelf: 'flex-end' }}
            >
              Pilih Layanan &amp; Konsultasikan →
            </button>
          </article>
        ))}
      </div>

      {/* General Consultation Banner */}
      <div className="cta-banner-services">
        <h2>Punya Gagasan Proyek Lainnya?</h2>
        <p>
          Diskusikan rencana kolaborasi atau mintalah rancangan program yang disesuaikan dengan profil sasaran komunitas Anda bersama Tim Fasilitator Fitrah Tumbuh.
        </p>
        <button 
          onClick={() => handleOpenConsult(null)} 
          className="button"
          style={{ backgroundColor: 'var(--color-brand-yellow)', color: 'var(--color-brand-dark)', padding: '14px 36px', fontSize: '15px' }}
        >
          Konsultasikan Project Anda Sekarang
        </button>
      </div>

      {/* Consultation Modal Form */}
      {selectedService && (
        <div className="modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>Konsultasi Project &amp; Layanan</h2>
                <p style={{ fontSize: '13px', color: 'var(--color-brand-muted)' }}>Topik: {selectedService}</p>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedService(null)}>✕</button>
            </div>
            <div className="modal-body">
              {consultSuccess ? (
                <div className="modal-success-box">
                  <div className="success-circle" style={{ backgroundColor: 'var(--color-brand-brown)' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h3>Permintaan Konsultasi Terkirim!</h3>
                  <p style={{ fontSize: '14.5px', color: 'var(--color-brand-muted)', lineHeight: 1.5 }}>
                    Formulir konsultasi Anda telah tersimpan di database kami. Silakan klik tombol di bawah untuk langsung terhubung dengan admin kami via WhatsApp guna menjadwalkan sesi diskusi lanjutan.
                  </p>
                  <div className="success-actions-vertical">
                    <a href={consultSuccess} target="_blank" rel="noreferrer" className="button" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                      Mulai Diskusi WhatsApp ↗
                    </a>
                    <button onClick={() => setSelectedService(null)} className="secondary-button">Tutup</button>
                  </div>
                </div>
              ) : (
                <form className="modal-form" onSubmit={handleConsultSubmit}>
                  <div className="modal-field">
                    <label>Nama Lengkap Narahubung*</label>
                    <input name="name" type="text" className="modal-input" required placeholder="Nama Lengkap Anda" value={formData.name} onChange={handleFormChange} />
                  </div>
                  
                  <div className="modal-field">
                    <label>Nama Lembaga / Instansi / Komunitas*</label>
                    <input name="institution" type="text" className="modal-input" required placeholder="Nama Sekolah/Lembaga Anda" value={formData.institution} onChange={handleFormChange} />
                  </div>

                  <div className="form-grid-2" style={{ gap: '0 16px' }}>
                    <div className="modal-field">
                      <label>Nomor WhatsApp*</label>
                      <input name="whatsapp" type="tel" className="modal-input" required placeholder="Contoh: 08123456789" value={formData.whatsapp} onChange={handleFormChange} />
                    </div>
                    <div className="modal-field">
                      <label>Alamat Email*</label>
                      <input name="email" type="email" className="modal-input" required placeholder="nama@email.com" value={formData.email} onChange={handleFormChange} />
                    </div>
                  </div>

                  <div className="form-grid-2" style={{ gap: '0 16px' }}>
                    <div className="modal-field">
                      <label>Jenis Kebutuhan Layanan*</label>
                      <select name="service_type" className="modal-input" value={formData.service_type} onChange={handleFormChange}>
                        <option value="Program Design">Program Design</option>
                        <option value="Project Development">Project Development</option>
                        <option value="Proposal &amp; Pitch Deck">Proposal &amp; Pitch Deck</option>
                        <option value="Training &amp; Workshop">Training &amp; Workshop</option>
                        <option value="Mentoring &amp; Pendampingan">Mentoring &amp; Pendampingan</option>
                        <option value="Lain-lain / Kustom">Lain-lain / Kustom</option>
                      </select>
                    </div>

                    <div className="modal-field">
                      <label>Estimasi Waktu Pelaksanaan*</label>
                      <select name="execution_time" className="modal-input" value={formData.execution_time} onChange={handleFormChange}>
                        <option value="Segera (Bulan Ini)">Segera (Bulan Ini)</option>
                        <option value="1-3 Bulan Ke Depan">1-3 Bulan Ke Depan</option>
                        <option value="3-6 Bulan Ke Depan">3-6 Bulan Ke Depan</option>
                        <option value="Hanya Tanya-Tanya">Hanya Tanya-Tanya / Anggaran</option>
                      </select>
                    </div>
                  </div>

                  <div className="modal-field">
                    <label>Deskripsi Singkat Rencana Proyek / Masalah*</label>
                    <textarea name="notes" rows="4" className="modal-textarea" required placeholder="Tuliskan latar belakang masalah, sasaran peserta program, atau sasaran proyek yang ingin dibangun..." value={formData.notes} onChange={handleFormChange} />
                  </div>

                  {formError && <div className="modal-error">{formError}</div>}
                  
                  <div className="modal-actions">
                    <button type="button" className="secondary-button" onClick={() => setSelectedService(null)} disabled={isSubmitting}>Batal</button>
                    <button type="submit" className="button" disabled={isSubmitting}>
                      {isSubmitting ? 'Mengirim...' : 'Kirim Permintaan Konsultasi ↗'}
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
