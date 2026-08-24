const items = [
  {
    title: 'Sejarah Schole Fitrah',
    image: '/10.JPG',
    text: `Fitrah Tumbuh lahir dari perjalanan panjang Schole Fitrah, sebuah gerakan pendidikan berbasis komunitas yang percaya bahwa setiap anak, keluarga, dan pemuda memiliki fitrah serta potensi untuk tumbuh. 

Membawa semangat yang sama dengan cakupan yang lebih luas, Fitrah Tumbuh menjadi ruang untuk belajar, bertumbuh, dan bergerak bersama.

Fitrah Tumbuh menghubungkan pendidikan, keluarga, lingkungan, dan pemberdayaan komunitas untuk melahirkan generasi yang berdaya, bertumbuh sesuai fitrahnya, dan mampu memberi dampak positif bagi sekitarnya.`
  },
  {
    title: 'Visi & Misi',
    image: '/12.jpg',
    text: `VISI : Menjadi lembaga pendidikan yang membantu keluarga menumbuhkan fitrah anak secara utuh, berlandaskan nilai ilahiah dan kemanusiaan.

MISI:
1. Menumbuhkan potensi anak sesuai kodratnya.
2. Mendampingi orang tua sebagai pendidik utama anak.
3. Membangun komunitas pembelajar yang kolaboratif.`
  },
  {
    title: 'Wilayah Bandung–Sumedang',
    image: '/4.jpg',
    text: `Kami membangun ruang belajar yang dekat dengan alam, keluarga, dan komunitas di wilayah Bandung dan Sumedang. 

Melalui kolaborasi di wilayah ini, kami menghadirkan program yang memanfaatkan potensi lingkungan lokal untuk menumbuhkan kepedulian sosial dan lingkungan hidup secara nyata.`
  }
]

const principles = [
  {
    id: '01',
    title: 'Fitrah Keimanan',
    text: 'Membentuk manusia yang sadar akan makna hidup, menghargai hubungan dengan Sang Pendidik, dan menjalani hidup dengan hati yang lembut.'
  },
  {
    id: '02',
    title: 'Fitrah Belajar',
    text: 'Belajar adalah proses yang menyenangkan dan bertumbuh secara organik, bukan sekadar mengejar skor akademis yang seragam.'
  },
  {
    id: '03',
    title: 'Fitrah Bakat',
    text: 'Setiap anak dan individu memiliki cara tumbuh yang unik. Kami hadir untuk menemani proses menemukan kekuatan utamanya secara natural.'
  },
  {
    id: '04',
    title: 'Fitrah Sosial',
    text: 'Mendorong kolaborasi, empati, dan kontribusi nyata dalam masyarakat untuk membangun lingkungan sosial yang sehat dan peduli.'
  }
]

export default function AboutPage() {
  return (
    <div className="about-page-wrapper">
      <style>{`
/* AboutPage Premium Stylesheet */

.about-page-wrapper {
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding-bottom: 80px;
}

/* Hero Section */
.about-hero {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 48px;
  min-height: 480px;
}

@media (max-width: 900px) {
  .about-hero {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
}

.about-hero-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

@media (max-width: 900px) {
  .about-hero-copy {
    align-items: center;
  }
}

.about-hero-copy h1 {
  font-size: clamp(36px, 4vw, 54px);
  line-height: 1.1;
  letter-spacing: -2px;
  margin-bottom: 24px;
}

.about-hero-copy h1 em {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color: var(--color-brand-green, #738a43);
}

.about-hero-copy p {
  font-size: 16px;
  line-height: 1.7;
  color: var(--color-brand-muted, #6e645e);
  margin-bottom: 32px;
  max-width: 520px;
}

@media (max-width: 900px) {
  .about-hero-copy p {
    text-align: center;
  }
}

/* Collage / Image Container with blobs & tags */
.about-hero-graphic {
  position: relative;
  width: 100%;
  max-width: 440px;
  aspect-ratio: 1 / 1.1;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.about-hero-image-wrapper {
  position: relative;
  z-index: 2;
  width: 85%;
  height: 90%;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(92, 56, 16, 0.15);
  border: 4px solid #ffffff;
}

.about-hero-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Background Blobs */
.about-hero-graphic::before {
  content: '';
  position: absolute;
  top: 10%;
  left: -5%;
  width: 60px;
  height: 60px;
  background-color: var(--color-brand-yellow, #dca11d);
  border-radius: 50%;
  z-index: 1;
}

.about-hero-graphic::after {
  content: '';
  position: absolute;
  bottom: 5%;
  right: -5%;
  width: 80px;
  height: 80px;
  background-color: var(--color-brand-green, #738a43);
  border-radius: 30px 10px 40px 10px;
  opacity: 0.85;
  z-index: 1;
}

/* Floating Tags */
.floating-tag {
  position: absolute;
  z-index: 3;
  background: #ffffff;
  padding: 8px 16px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-brand-brown, #5c3810);
  box-shadow: 0 8px 24px rgba(92, 56, 16, 0.12);
  border: 1px solid rgba(92, 56, 16, 0.06);
  animation: floatTag 6s ease-in-out infinite;
}

.tag-1 {
  top: 20%;
  left: -10%;
  animation-delay: 0s;
}

.tag-2 {
  top: 45%;
  right: -10%;
  animation-delay: 1.5s;
}

.tag-3 {
  bottom: 25%;
  left: -5%;
  animation-delay: 3s;
}

@keyframes floatTag {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

/* Our Services / History Grid */
.about-services-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.about-services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: 28px;
  width: 100%;
}

.about-service-card {
  background: #ffffff;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(92, 56, 16, 0.08);
  box-shadow: 0 16px 30px rgba(92, 56, 16, 0.03);
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  flex-direction: column;
  position: relative;
}

.about-service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 24px 45px rgba(92, 56, 16, 0.08);
}

.about-service-image {
  height: 220px;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: var(--color-brand-soft-yellow, #fdf6e2);
}

.about-service-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.about-service-card:hover .about-service-image img {
  transform: scale(1.05);
}

/* Colorful Corner Accents */
.card-accent-dot {
  position: absolute;
  bottom: -15px;
  right: 20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  z-index: 2;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  border: 3px solid #ffffff;
}

.about-service-card:nth-child(1) .card-accent-dot { background-color: var(--color-brand-green, #738a43); }
.about-service-card:nth-child(2) .card-accent-dot { background-color: var(--color-brand-yellow, #dca11d); }
.about-service-card:nth-child(3) .card-accent-dot { background-color: var(--color-brand-gold, #cba819); }

.about-service-info {
  padding: 32px 28px 28px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.about-service-info h3 {
  font-size: 20px;
  color: var(--color-brand-brown, #5c3810);
  margin-bottom: 12px;
}

.about-service-info p {
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-brand-muted, #6e645e);
  text-align: justify;
}

/* Green Callout/Philosophies Banner */
.about-callout-banner {
  background-color: var(--color-brand-green, #738a43);
  border-radius: 32px;
  padding: 60px 50px;
  color: #ffffff;
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 48px;
  align-items: center;
  box-shadow: 0 20px 40px rgba(115, 138, 67, 0.15);
  position: relative;
  overflow: hidden;
}

@media (max-width: 900px) {
  .about-callout-banner {
    grid-template-columns: 1fr;
    padding: 40px 30px;
    gap: 36px;
  }
}

.about-callout-intro h2 {
  font-size: clamp(28px, 3.5vw, 42px);
  line-height: 1.15;
  color: #ffffff;
  letter-spacing: -1px;
}

.about-callout-intro h2 i {
  color: var(--color-brand-ivory, #faf0d7);
}

.about-callout-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}

@media (max-width: 600px) {
  .about-callout-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

.about-callout-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.about-callout-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--color-brand-ivory, #faf0d7);
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.about-callout-text h3 {
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 6px;
}

.about-callout-text p {
  font-size: 13px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.8);
}

/* Partners Section */
.partners-section {
  text-align: center;
  border-top: 1px solid rgba(92, 56, 16, 0.08);
  padding-top: 60px;
}

.partners-section h3 {
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--color-brand-muted, #6e645e);
  margin-bottom: 32px;
}

.partners-logos-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 40px;
  opacity: 0.85;
}

.partner-logo-badge {
  background: #ffffff;
  border: 1px solid rgba(92, 56, 16, 0.08);
  border-radius: 12px;
  padding: 14px 28px;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-brand-brown, #5c3810);
  box-shadow: 0 4px 10px rgba(92, 56, 16, 0.02);
}

@media (max-width: 768px) {
  .floating-tag {
    font-size: 9px;
    padding: 6px 12px;
  }
  .tag-1 {
    left: -2%;
  }
  .tag-2 {
    right: -2%;
  }
  .tag-3 {
    left: 2%;
  }
}

@media (max-width: 480px) {
  .about-hero-graphic {
    max-width: 290px !important;
    aspect-ratio: 1 / 1 !important;
  }
  .floating-tag {
    display: none !important;
  }
}
      `}</style>
      {/* 1. Hero Section */}
      <section className="about-hero">
        <div className="about-hero-copy">
          <p className="eyebrow"><span></span> Tentang Kami</p>
          <h1>Dari ruang belajar,<br /><em>untuk kehidupan.</em></h1>
          <p>
            Fitrah Tumbuh adalah social enterprise yang menumbuhkan manusia melalui pendidikan berbasis potensi, 
            kedekatan dengan alam, dan kolaborasi komunitas. Kami percaya pendidikan harus membumi dan bermakna.
          </p>
        </div>
        <div className="about-hero-graphic">
          <div className="about-hero-image-wrapper">
            <img 
              src="/11.jpg" 
              alt="Kegiatan Belajar Fitrah Tumbuh" 
            />
          </div>
          <span className="floating-tag tag-1">Fitrah</span>
          <span className="floating-tag tag-2">Alam</span>
          <span className="floating-tag tag-3">Komunitas</span>
        </div>
      </section>

      {/* 2. Our History & Vision Grid */}
      <section className="about-services-section">
        <div className="page-section-header">
          <p className="eyebrow"><span></span> Perjalanan Kami</p>
          <h2>Menumbuhkan manusia dengan cara yang dekat, konkret, dan penuh makna.</h2>
        </div>
        <div className="about-services-grid">
          {items.map((item, index) => (
            <article className="about-service-card" key={item.title}>
              <div 
                className="about-service-image" 
                style={{
                  background: index === 0 ? 'linear-gradient(135deg, #738a43 0%, #a4b97a 100%)' :
                              index === 1 ? 'linear-gradient(135deg, #dca11d 0%, #fbd578 100%)' :
                                            'linear-gradient(135deg, #5c3810 0%, #a0784d 100%)',
                  height: '160px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Elegant background text/watermark */}
                <div style={{
                  position: 'absolute',
                  fontSize: '56px',
                  fontWeight: '900',
                  color: 'rgba(255, 255, 255, 0.12)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  whiteSpace: 'nowrap'
                }}>
                  {index === 0 ? 'SEJARAH' : index === 1 ? 'VISI MISI' : 'WILAYAH'}
                </div>
                
                <div className="card-accent-dot"></div>
              </div>
              <div className="about-service-info">
                <h3>{item.title}</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Green Callout / Philosophies Banner */}
      <section className="about-callout-banner">
        <div className="about-callout-intro">
          <h2>Filosofi utama kami: <i>menemani cara tumbuh</i> tiap individu.</h2>
        </div>
        <div className="about-callout-grid">
          {principles.map((item) => (
            <div className="about-callout-item" key={item.title}>
              <div className="about-callout-icon">{item.id}</div>
              <div className="about-callout-text">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
