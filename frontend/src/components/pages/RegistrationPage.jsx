import { useState } from 'react'
import { trackFormSubmit } from '../../utils/analytics'

const API_BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

const roles = [
  {
    id: 'Mitra & Kolaborator',
    title: 'Mitra & Kolaborator',
    desc: 'Kolaborasi program, kerjasama pentahelix, sponsorship, media partner, atau CSR.'
  },
  {
    id: 'Relawan / Volunteer',
    title: 'Relawan / Volunteer',
    desc: 'Berkontribusi tenaga, keahlian, pendampingan belajar, atau mengajar di alam.'
  },
  {
    id: 'Peserta Magang Kerja',
    title: 'Peserta Magang Kerja',
    desc: 'Pengalaman magang profesional berbayar/sosial di bidang pendidikan & agroekologi.'
  },
  {
    id: 'Peserta Program Belajar',
    title: 'Peserta Program Belajar',
    desc: 'Mengikuti kelas Calistung, Eksplorasi Alam, Healing Farm, atau Hiking Keluarga.'
  },
  {
    id: 'Ibu/Pemuda Binaan UMKM',
    title: 'Ibu/Pemuda Binaan UMKM',
    desc: 'Pendampingan kewirausahaan mandiri di bidang kuliner, kerajinan, & pertanian.'
  }
]

const programs = [
  'Literasi Numerasi Menyenangkan',
  'Belajar Bersama Alam',
  'Berkebun & Beternak',
  'Hiking Pemuda & Keluarga'
]

const stepStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    margin: '0 auto 28px',
    width: '100%',
    flexWrap: 'nowrap',
    overflow: 'hidden'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    justifyContent: 'center',
    flex: '1 1 0',
    minWidth: 0,
    maxWidth: '180px'
  },
  node: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '1px solid rgba(92, 56, 16, 0.2)',
    background: 'rgba(255, 255, 255, 0.25)',
    color: 'rgba(92, 56, 16, 0.55)',
    fontSize: '0.78rem',
    fontWeight: 800,
    display: 'grid',
    placeItems: 'center',
    transition: 'all 0.25s ease',
    cursor: 'default',
    flexShrink: 0
  },
  label: {
    fontSize: '0.72rem',
    color: 'rgba(92, 56, 16, 0.6)',
    fontWeight: 600,
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}

export default function RegistrationPage() {
  const whatsappAdminNumber = '6285156916211'
  const [step, setStep] = useState(1)
  const [selectedRole, setSelectedRole] = useState('Mitra & Kolaborator')
  const [formData, setFormData] = useState({
    program: 'Literasi Numerasi Menyenangkan',
    name: '',
    email: '',
    phone: '',
    institution: '',
    message: '',
    agreement: false
  })
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleNext = () => {
    if (step === 1) {
      setStep(2)
      return
    }

    if (step === 2) {
      if (!formData.name || !formData.email || !formData.phone || !formData.institution) {
        setError('Harap lengkapi semua data kontak dan instansi sebelum melanjutkan.')
        return
      }

      setError('')
      setStep(3)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.message.trim()) {
      setError('Silakan tulis sedikit deskripsi atau motivasi Anda.')
      return
    }

    if (!formData.agreement) {
      setError('Anda perlu menyetujui pernyataan sebelum mengirim formulir.')
      return
    }

    setError('')
    try {
      const response = await fetch(`${API_BASE_URL}/api/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          whatsapp: formData.phone.trim(),
          institution: formData.institution.trim(),
          cooperation_type: selectedRole,
          message: formData.message.trim()
        })
      })
      if (!response.ok) throw new Error()
      setIsSubmitted(true)
      trackFormSubmit('Kemitraan Kolaborasi', selectedRole)
    } catch {
      setError('Gagal mengirim pendaftaran. Silakan coba lagi atau langsung konfirmasi via WhatsApp.')
    }
  }

  const resetForm = () => {
    setStep(1)
    setSelectedRole('Mitra & Kolaborator')
    setFormData({
      program: 'Literasi Numerasi Menyenangkan',
      name: '',
      email: '',
      phone: '',
      institution: '',
      message: '',
      agreement: false
    })
    setError('')
    setIsSubmitted(false)
  }

  return (
    <section className="registration-page">
      <div className="registration-shell">
        <div className="registration-header">
          <span className="registration-kicker">
            <span className="kicker-line" />
            KEMITRAAN &amp; REGISTRASI
          </span>
        </div>

        {!isSubmitted && <h1 className="registration-title">Formulir Kemitraan &amp; Registrasi</h1>}

        {!isSubmitted && (
          <div className="registration-steps" aria-label="progress step" style={stepStyles.container}>
            {[1, 2, 3].map((item) => {
              const isActive = step === item
              const isDone = step > item
              const labelText = item === 1 ? 'Pilih Peran' : item === 2 ? 'Kontak' : 'Konfirmasi'

              return (
                <div key={item} className="step-item" style={stepStyles.item}>
                  <button
                    type="button"
                    className={`step-node ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                    onClick={() => step > item && setStep(item)}
                    disabled={step < item}
                    style={{
                      ...stepStyles.node,
                      background: isActive || isDone ? '#5c3810' : 'rgba(255, 255, 255, 0.25)',
                      color: isActive || isDone ? '#fff' : 'rgba(92, 56, 16, 0.55)',
                      borderColor: isActive || isDone ? '#5c3810' : 'rgba(92, 56, 16, 0.2)',
                      boxShadow: isActive ? '0 0 0 4px rgba(92, 56, 16, 0.08)' : 'none',
                      cursor: step > item ? 'pointer' : step === item ? 'default' : 'not-allowed',
                      opacity: step < item ? 0.7 : 1
                    }}
                  >
                    {item}
                  </button>
                  <span
                    className={`step-label ${isActive ? 'active' : ''}`}
                    style={{
                      ...stepStyles.label,
                      color: isActive ? '#5c3810' : 'rgba(92, 56, 16, 0.6)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {labelText}
                  </span>
                </div>
              )
            })}
          </div>
        )}

        {isSubmitted ? (
          <div className="success-state">
            <div className="success-icon" aria-label="Sukses">
              <svg viewBox="0 0 24 24" width="36" height="36" aria-hidden="true" focusable="false">
                <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2>Pendaftaran berhasil dikirim</h2>
            <p>
              Terima kasih, admin WhatsApp kami sudah menerima pendaftaran Anda. Mohon ditunggu, nanti kami akan menghubungi Anda kembali.
            </p>

            <div className="success-actions">
              <button type="button" className="secondary-button success-secondary" onClick={resetForm}>
                Kirim Formulir Lainnya
              </button>

              <a
                href={`https://wa.me/${whatsappAdminNumber}?text=${encodeURIComponent('Halo admin Fitrah Tumbuh, saya sudah mengirim formulir pendaftaran. Mohon dikonfirmasi.')}`}
                target="_blank"
                rel="noreferrer"
                className="primary-button success-primary"
              >
                Konfirmasi ke WhatsApp Admin
              </a>
            </div>
          </div>
        ) : (
          <form className="registration-form" onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="form-panel">
                <div className="panel-heading">
                  <h2>Pilih Peran Kolaborasi</h2>
                  <p>Pilih jenis pendaftaran yang paling sesuai dengan kebutuhan atau kontribusi Anda.</p>
                </div>

                <div className="role-list">
                  {roles.map((role) => {
                    const isSelected = selectedRole === role.id

                    return (
                      <button
                        key={role.id}
                        type="button"
                        className={`role-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedRole(role.id)}
                      >
                        <span className="role-radio">
                          {isSelected && <span className="radio-dot" />}
                        </span>

                        <span className="role-copy">
                          <strong>{role.title}</strong>
                          <small>{role.desc}</small>
                        </span>
                      </button>
                    )
                  })}
                </div>

                {selectedRole === 'Peserta Program Belajar' && (
                  <div className="program-select-box">
                    <label htmlFor="program">Pilih Program Belajar</label>
                    <div className="select-wrap">
                      <select id="program" name="program" value={formData.program} onChange={handleInputChange}>
                        {programs.map((program) => (
                          <option key={program} value={program}>{program}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <button type="button" className="primary-button" onClick={handleNext}>
                  Lanjutkan ke Kontak &amp; Instansi
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="form-panel">
                <div className="panel-heading">
                  <h2>Detail Kontak &amp; Instansi</h2>
                  <p>Masukkan informasi diri Anda agar kami dapat menghubungi Anda kembali.</p>
                </div>

                <div className="field-group">
                  <label htmlFor="name">Nama Lengkap</label>
                  <input
                    id="name"
                    name="name"
                    placeholder="Nama Lengkap Anda"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="field-row two-col">
                  <div className="field-group">
                    <label htmlFor="email">Alamat Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="phone">Nomor WhatsApp</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="Contoh: 08123456789"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label htmlFor="institution">Institusi / Komunitas / Sekolah</label>
                  <input
                    id="institution"
                    name="institution"
                    placeholder="Nama Instansi, Sekolah, Organisasi atau Komunitas Warga"
                    value={formData.institution}
                    onChange={handleInputChange}
                  />
                </div>

                {error && <div className="form-error">{error}</div>}

                <div className="action-row split">
                  <button type="button" className="secondary-button" onClick={() => setStep(1)}>
                    Kembali
                  </button>

                  <button type="button" className="primary-button" onClick={handleNext}>
                    Lanjutkan
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="form-panel">
                <div className="panel-heading">
                  <h2>Rencana Kolaborasi &amp; Verifikasi</h2>
                  <p>Berikan deskripsi singkat rencana kerjasama Anda dan verifikasi kembali data Anda.</p>
                </div>

                <div className="field-group">
                  <label htmlFor="message">Rencana Kerjasama / Pesan / Motivasi</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Tulis detail rencana kolaborasi, program yang ingin diikuti, atau alasan Anda ingin bergabung..."
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="summary-card">
                  <h3>Ringkasan Pendaftaran</h3>
                  <div className="summary-grid">
                    <span>Peran</span>
                    <strong>
                      {selectedRole}
                      {selectedRole === 'Peserta Program Belajar' ? ` (${formData.program})` : ''}
                    </strong>

                    <span>Nama</span>
                    <strong>{formData.name || '-'}</strong>

                    <span>Kontak</span>
                    <strong>{formData.email || '-'} / {formData.phone || '-'}</strong>

                    <span>Instansi</span>
                    <strong>{formData.institution || '-'}</strong>
                  </div>
                </div>

                <label className="agreement-row">
                  <input type="checkbox" name="agreement" checked={formData.agreement} onChange={handleInputChange} />
                  <span>
                    Saya menyatakan bahwa semua data yang saya masukkan adalah benar, dan saya bersedia dihubungi oleh tim Fitrah Tumbuh.
                  </span>
                </label>

                {error && <div className="form-error">{error}</div>}

                <div className="action-row split">
                  <button type="button" className="secondary-button" onClick={() => setStep(2)}>
                    Kembali
                  </button>

                  <button type="submit" className="primary-button">
                    Kirim Pendaftaran
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
