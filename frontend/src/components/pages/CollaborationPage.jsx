
import { WHATSAPP_ADMIN } from '../../utils/config'

const SchoolIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
)

const CommunityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
)

const BusinessIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
)

const GovernmentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
)

const pillars = [
  {
    class: 'box-1',
    icon: <SchoolIcon />,
    title: 'Sekolah & Akademisi',
    text: 'Kolaborasi rancangan kurikulum berbasis proyek, pendampingan belajar luar kelas, dan pelatihan kompetensi guru.'
  },
  {
    class: 'box-2',
    icon: <CommunityIcon />,
    title: 'Komunitas & Warga',
    text: 'Pemberdayaan sosial berbasis gotong royong warga, pelestarian kearifan lokal, dan pengembangan potensi lingkungan.'
  },
  {
    class: 'box-3',
    icon: <BusinessIcon />,
    title: 'Dunia Usaha & CSR',
    text: 'Sinergi program pendanaan berdampak sosial, dukungan beasiswa belajar, pendampingan bisnis etis, dan magang kerja.'
  },
  {
    class: 'box-4',
    icon: <GovernmentIcon />,
    title: 'Pemerintah & Media',
    text: 'Dukungan regulasi kebijakan ruang terbuka hijau, penyebaran narasi inspiratif pendidikan, dan kampanye aksi sosial.'
  }
]

const projects = [
  {
    bannerText: 'Tumbuh Bersama Warga',
    title: 'Pemberdayaan Kebun Belajar Desa',
    text: 'Gotong royong bersama warga setempat membangun kebun pertanian mandiri untuk mengedukasi anak-anak dan ketahanan pangan keluarga.'
  },
  {
    bannerText: 'Pemberdayaan Pemuda',
    title: 'Magang Bisnis Etis & UMKM',
    text: 'Pendampingan pemuda Bandung-Sumedang dalam mengelola potensi produk lokal agar berdaya saing dengan nalar bisnis yang berkelanjutan.'
  },
  {
    bannerText: 'Aksi Lestari Alam',
    title: 'Restorasi Hijau Kemitraan Sekolah',
    text: 'Menggerakkan ratusan siswa sekolah mitra untuk menanam pohon pelindung air di kawasan rawan bencana Sumedang.'
  }
]

export default function CollaborationPage({ navigate }) {
  return (
    <div className="collab-page-wrapper">
      <style>{`
/* CollaborationPage Playful & Creative Stylesheet */

.collab-page-wrapper {
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding-bottom: 80px;
}

/* 1. Hero Section */
.collab-hero {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 48px;
  min-height: 480px;
}

@media (max-width: 900px) {
  .collab-hero {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }
}

.collab-hero-copy h1 {
  font-size: clamp(38px, 5vw, 62px);
  line-height: 1.05;
  letter-spacing: -2px;
  color: var(--color-brand-brown, #5c3810);
  margin-bottom: 20px;
  font-weight: 900;
}

.collab-hero-copy h1 span.highlight {
  color: var(--color-brand-green, #738a43);
  position: relative;
  display: inline-block;
}

.collab-hero-copy h1 span.highlight::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0;
  width: 100%;
  height: 6px;
  background-color: var(--color-brand-yellow, #dca11d);
  z-index: -1;
  border-radius: 4px;
}

.collab-hero-copy p {
  font-size: 16px;
  line-height: 1.65;
  color: var(--color-brand-muted, #6e645e);
  margin-bottom: 32px;
  max-width: 500px;
}

@media (max-width: 900px) {
  .collab-hero-copy p {
    margin: 0 auto 32px;
  }
}

.collab-hero-graphic {
  position: relative;
  width: 100%;
  max-width: 440px;
  aspect-ratio: 1 / 1.05;
  margin: 0 auto;
}

.collab-hero-image-wrapper {
  width: 90%;
  height: 90%;
  border-radius: 40px;
  overflow: hidden;
  border: 5px solid #ffffff;
  box-shadow: 0 24px 50px rgba(92, 56, 16, 0.15);
  position: relative;
  z-index: 2;
  background: var(--color-brand-yellow, #dca11d);
}

.collab-hero-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Floating Highlights Badge */
.collab-hero-badge {
  position: absolute;
  top: 12%;
  right: -8%;
  background: var(--color-brand-green, #738a43);
  color: #ffffff;
  padding: 12px 20px;
  border-radius: 24px;
  font-weight: 800;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 10px 25px rgba(115, 138, 67, 0.3);
  z-index: 3;
  transform: rotate(-5deg);
}

/* 2. Pillars Grid / What We Do (Vibrant boxes) */
.collab-pillars-section {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.collab-pillars-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

@media (max-width: 1000px) {
  .collab-pillars-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .collab-pillars-grid {
    grid-template-columns: 1fr;
  }
}

.collab-box {
  border-radius: 28px;
  padding: 36px 28px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 280px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.03);
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.collab-box:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.collab-box-icon {
  font-size: 32px;
  margin-bottom: 24px;
}

.collab-box-text h3 {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 10px;
  color: #ffffff;
}

.collab-box-text p {
  font-size: 13.5px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9);
}

/* Colors for the 4 boxes */
.box-1 { background-color: #3b5998; } /* Cool blue */
.box-2 { background-color: var(--color-brand-yellow, #dca11d); } /* Warm yellow */
.box-3 { background-color: #f7553b; } /* Vibrant red */
.box-4 { background-color: var(--color-brand-green, #738a43); } /* Leaf green */

/* 3. Selected Collab Projects Grid (Insights) */
.collab-projects-section {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.collab-projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

@media (max-width: 900px) {
  .collab-projects-grid {
    grid-template-columns: 1fr;
  }
}

.collab-project-card {
  background: #ffffff;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(92, 56, 16, 0.08);
  box-shadow: 0 16px 30px rgba(92, 56, 16, 0.03);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.collab-project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(92, 56, 16, 0.06);
  border-color: var(--color-brand-yellow, #dca11d);
}

.collab-project-banner {
  height: 140px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-align: center;
  font-weight: 800;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.collab-project-card:nth-child(1) .collab-project-banner { background-color: #f7553b; }
.collab-project-card:nth-child(2) .collab-project-banner { background-color: var(--color-brand-green, #738a43); }
.collab-project-card:nth-child(3) .collab-project-banner { background-color: var(--color-brand-yellow, #dca11d); }

.collab-project-info {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.collab-project-info h3 {
  font-size: 16px;
  color: var(--color-brand-brown, #5c3810);
  margin-bottom: 8px;
}

.collab-project-info p {
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--color-brand-muted, #6e645e);
  margin-bottom: 16px;
  flex-grow: 1;
}

.collab-project-link {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-brand-green, #738a43);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.collab-project-card:hover .collab-project-link {
  color: var(--color-brand-yellow, #dca11d);
}

/* 4. Kind Words / Testimonials (Vibrant Blue banner) */
.collab-kind-words {
  background: #3b5998; /* Playful Blue */
  color: #ffffff;
  border-radius: 32px;
  padding: 60px 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 36px;
  box-shadow: 0 20px 40px rgba(59, 89, 152, 0.15);
}

@media (max-width: 900px) {
  .collab-kind-words {
    grid-template-columns: 1fr;
    padding: 40px 30px;
    gap: 28px;
  }
}

.testimonial-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.testimonial-text {
  font-size: 14.5px;
  line-height: 1.6;
  color: #ffffff;
  font-style: italic;
  margin-bottom: 20px;
}

.testimonial-author {
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-brand-ivory, #faf0d7);
}

/* 5. Playful CTA Banner */
.collab-cta-banner {
  background: #f7553b; /* Playful Vibrant Red */
  color: #ffffff;
  border-radius: 32px;
  padding: 48px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  box-shadow: 0 20px 40px rgba(247, 85, 59, 0.2);
}

@media (max-width: 768px) {
  .collab-cta-banner {
    flex-direction: column;
    text-align: center;
    padding: 40px 24px;
  }
}

.collab-cta-copy h2 {
  font-size: clamp(24px, 3.5vw, 36px);
  font-weight: 900;
  margin-bottom: 8px;
  color: #ffffff;
}

.collab-cta-copy p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
}

.collab-cta-banner .button {
  background-color: #ffffff;
  color: #f7553b;
  border: none;
  font-weight: 800;
  padding: 16px 36px;
  border-radius: 16px;
}

.collab-cta-banner .button:hover {
  background-color: var(--color-brand-ivory, #faf0d7);
  transform: translateY(-2px);
}

@media (max-width: 480px) {
  .collab-hero-graphic {
    max-width: 290px !important;
    aspect-ratio: 1 / 1 !important;
  }
  .collab-hero-badge {
    display: none !important;
  }
}
      `}</style>
      {/* 1. Playful Hero Section */}
      <section className="collab-hero">
        <div className="collab-hero-copy">
          <p className="eyebrow"><span></span> Kemitraan</p>
          <h1>Kebaikan tumbuh jauh <span className="highlight">saat dikerjakan</span> bersama.</h1>
          <p>
            Pendidikan bukan tanggung jawab sekolah saja. Kami membuka ruang kemitraan pentahelix bagi 
            setiap pihak yang ingin bergerak melahirkan dampak sosial yang berkelanjutan.
          </p>
        </div>
        <div className="collab-hero-graphic">
          <div className="collab-hero-image-wrapper">
            <img src="/8.JPG" alt="Kolaborasi Komunitas" />
          </div>
          <div className="collab-hero-badge">Pentahelix</div>
        </div>
      </section>

      {/* 2. Pillars Grid Section */}
      <section id="pilar-kolaborasi" className="collab-pillars-section">
        <div className="page-section-header" style={{ textAlign: 'center' }}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}><span></span> Pilar Kolaborasi</p>
          <h2>Bentuk Kerja Sama Yang Terbuka</h2>
        </div>
        <div className="collab-pillars-grid">
          {pillars.map((pillar) => (
            <div className={`collab-box ${pillar.class}`} key={pillar.title}>
              <div className="collab-box-icon" style={{ color: '#ffffff' }}>{pillar.icon}</div>
              <div className="collab-box-text">
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Collab Projects Case Highlights */}
      <section className="collab-projects-section">
        <div className="page-section-header" style={{ textAlign: 'center' }}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}><span></span> Rekam Dampak</p>
          <h2>Aksi Nyata Hasil Kolaborasi</h2>
        </div>
        <div className="collab-projects-grid">
          {projects.map((project) => (
            <article className="collab-project-card" key={project.title}>
              <div className="collab-project-banner">
                {project.bannerText}
              </div>
              <div className="collab-project-info">
                <h3>{project.title}</h3>
                <p>{project.text}</p>
                <a 
                  href={`https://wa.me/${WHATSAPP_ADMIN}?text=Halo%20Fitrah%20Tumbuh%2C%20saya%20tertarik%20mengenai%20inisiatif%20${encodeURIComponent(project.title)}`}
                  className="collab-project-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Tanya Kemitraan ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Playful CTA Banner */}
      <section className="collab-cta-banner">
        <div className="collab-cta-copy">
          <h2>Siap berkolaborasi membangun dampak?</h2>
          <p>Tulis gagasan kerja sama Anda melalui formulir pendaftaran kemitraan kami.</p>
        </div>
        <button className="button" onClick={() => navigate('daftar')}>
          Hubungi Kami ↗
        </button>
      </section>
    </div>
  )
}
