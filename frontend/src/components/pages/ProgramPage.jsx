
const programs = [
  {
    title: 'Calistung & Literasi',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
    text: 'Kegiatan belajar membaca, menulis, dan berhitung yang dikemas secara menyenangkan agar anak tumbuh percaya diri.'
  },
  {
    title: 'Belajar Bersama Alam',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80',
    text: 'Pembelajaran yang memanfaatkan lingkungan nyata, mulai dari pertanian, ekosistem, hingga observasi alam sehari-hari.'
  },
  {
    title: 'Healing Farm',
    image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80',
    text: 'Ruang pemulihan dan refleksi melalui kegiatan bertani, kebersamaan, dan keterhubungan yang harmonis dengan alam sekitar.'
  },
  {
    title: 'Hiking & Family Camp',
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80',
    text: 'Kegiatan luar ruangan untuk memperkuat ikatan keluarga, melatih fisik tangguh, dan membangun kebiasaan sehat bersama.'
  },
  {
    title: 'Magang Pemuda',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    text: 'Pelatihan berbasis pengalaman kerja nyata untuk menumbuhkan keterampilan profesional, kedisiplinan, dan jiwa mandiri pemuda.'
  },
  {
    title: 'Inkubasi UMKM',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80',
    text: 'Pendampingan usaha bagi pelaku usaha mikro lokal agar bertumbuh dengan strategi pemasaran yang relevan, sehat, dan berkelanjutan.'
  }
]

const highlights = [
  {
    id: '01',
    title: 'Pembelajaran Kontekstual',
    text: 'Menghubungkan teori pembelajaran dengan dunia nyata di sekitar anak, membuat proses belajar lebih hidup dan mudah dipahami.'
  },
  {
    id: '02',
    title: 'Pemberdayaan Warga',
    text: 'Menumbuhkan kemandirian ekonomi keluarga dan warga setempat melalui pelatihan wirausaha yang inklusif.'
  },
  {
    id: '03',
    title: 'Keterhubungan Alam',
    text: 'Memulihkan kedamaian jiwa serta membangun kepekaan dan tanggung jawab untuk merawat kelestarian bumi.'
  }
]

const materials = [
  {
    title: 'Artikel & Refleksi',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&q=80',
    text: 'Tema-tema praktis tentang pola asuh, pendidikan karakter, dan cara menumbuhkan potensi secara manusiawi.'
  },
  {
    title: 'E-book & Modul Belajar',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=400&q=80',
    text: 'Bahan ajar terstruktur yang bisa digunakan secara praktis oleh keluarga, pendidik, maupun komunitas belajar.'
  },
  {
    title: 'Video & Workshop Media',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80',
    text: 'Dokumentasi praktik, tutorial visual, dan rekaman workshop interaktif agar pesan mudah diserap dan diterapkan.'
  }
]

export default function ProgramPage() {
  return (
    <div className="program-page-wrapper">
      <style>{`
/* ProgramPage Premium Stylesheet */

.program-page-wrapper {
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding-bottom: 80px;
}

/* Hero Section */
.program-hero {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: 48px;
  min-height: 480px;
}

@media (max-width: 900px) {
  .program-hero {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
}

.program-hero-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

@media (max-width: 900px) {
  .program-hero-copy {
    align-items: center;
  }
}

.program-hero-copy h1 {
  font-size: clamp(36px, 4vw, 54px);
  line-height: 1.1;
  letter-spacing: -2px;
  margin-bottom: 24px;
}

.program-hero-copy h1 em {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color: var(--color-brand-green, #738a43);
}

.program-hero-copy p {
  font-size: 16px;
  line-height: 1.7;
  color: var(--color-brand-muted, #6e645e);
  margin-bottom: 32px;
  max-width: 520px;
}

@media (max-width: 900px) {
  .program-hero-copy p {
    text-align: center;
  }
}

/* Collage / Image Container with blobs & tags */
.program-hero-graphic {
  position: relative;
  width: 100%;
  max-width: 440px;
  aspect-ratio: 1 / 1.1;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.program-hero-image-wrapper {
  position: relative;
  z-index: 2;
  width: 85%;
  height: 90%;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(92, 56, 16, 0.15);
  border: 4px solid #ffffff;
}

.program-hero-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Background Blobs */
.program-hero-graphic::before {
  content: '';
  position: absolute;
  top: 15%;
  right: -5%;
  width: 70px;
  height: 70px;
  background-color: var(--color-brand-yellow, #dca11d);
  border-radius: 50%;
  z-index: 1;
}

.program-hero-graphic::after {
  content: '';
  position: absolute;
  bottom: 8%;
  left: -8%;
  width: 90px;
  height: 90px;
  background-color: var(--color-brand-green, #738a43);
  border-radius: 40px 10px 30px 10px;
  opacity: 0.85;
  z-index: 1;
}

/* Floating Tags */
.program-floating-tag {
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
  animation: floatProgramTag 6s ease-in-out infinite;
}

.prog-tag-1 {
  top: 25%;
  left: -8%;
  animation-delay: 0s;
}

.prog-tag-2 {
  top: 50%;
  right: -8%;
  animation-delay: 2s;
}

.prog-tag-3 {
  bottom: 18%;
  left: -2%;
  animation-delay: 4s;
}

@keyframes floatProgramTag {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

/* Program Cards Grid (Our Services) */
.programs-grid-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.programs-grid-title {
  text-align: center;
}

.programs-grid-title h2 {
  font-size: 32px;
  color: var(--color-brand-brown, #5c3810);
  margin-top: 8px;
}

.programs-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 28px;
  width: 100%;
}

.program-card {
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

.program-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 24px 45px rgba(92, 56, 16, 0.08);
}

.program-card-image {
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.program-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.program-card:hover .program-card-image img {
  transform: scale(1.05);
}

/* Color Corner Accent Dot */
.program-card-accent {
  position: absolute;
  bottom: -15px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  z-index: 2;
  border: 3px solid #ffffff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.program-card:nth-child(1) .program-card-accent { background-color: var(--color-brand-green, #738a43); }
.program-card:nth-child(2) .program-card-accent { background-color: var(--color-brand-yellow, #dca11d); }
.program-card:nth-child(3) .program-card-accent { background-color: var(--color-brand-gold, #cba819); }
.program-card:nth-child(4) .program-card-accent { background-color: var(--color-brand-brown, #5c3810); }
.program-card:nth-child(5) .program-card-accent { background-color: var(--color-brand-green, #738a43); }
.program-card:nth-child(6) .program-card-accent { background-color: var(--color-brand-yellow, #dca11d); }

.program-card-info {
  padding: 30px 24px 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.program-card-info h3 {
  font-size: 18px;
  color: var(--color-brand-brown, #5c3810);
  margin-bottom: 10px;
}

.program-card-info p {
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--color-brand-muted, #6e645e);
  margin-bottom: 20px;
  flex-grow: 1;
}

/* Middle Green Callout Section */
.program-callout-banner {
  background-color: var(--color-brand-green, #738a43);
  border-radius: 32px;
  padding: 60px 50px;
  color: #ffffff;
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 48px;
  align-items: center;
  box-shadow: 0 20px 40px rgba(115, 138, 67, 0.15);
}

@media (max-width: 900px) {
  .program-callout-banner {
    grid-template-columns: 1fr;
    padding: 40px 30px;
    gap: 36px;
  }
}

.program-callout-intro h2 {
  font-size: clamp(28px, 3.5vw, 42px);
  line-height: 1.15;
  color: #ffffff;
  letter-spacing: -1px;
}

.program-callout-intro h2 i {
  color: var(--color-brand-ivory, #faf0d7);
}

.program-callout-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.program-callout-item {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.program-callout-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 20px;
  font-weight: 700;
  color: var(--color-brand-ivory, #faf0d7);
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.program-callout-text h3 {
  font-size: 17px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 6px;
}

.program-callout-text p {
  font-size: 14px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.85);
}

/* Horizontal Stories / Materials Section */
.stories-section {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.stories-section-title {
  text-align: center;
}

.stories-section-title h2 {
  font-size: 32px;
  color: var(--color-brand-brown, #5c3810);
  margin-top: 8px;
}

.stories-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}

@media (max-width: 900px) {
  .stories-grid {
    grid-template-columns: 1fr;
  }
}

.story-card {
  display: flex;
  gap: 20px;
  background: #ffffff;
  border-radius: 20px;
  padding: 20px;
  border: 1px solid rgba(92, 56, 16, 0.08);
  box-shadow: 0 12px 24px rgba(92, 56, 16, 0.02);
  transition: all 0.3s ease;
}

@media (max-width: 500px) {
  .story-card {
    flex-direction: column;
    gap: 16px;
  }
}

.story-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-brand-yellow, #dca11d);
  box-shadow: 0 16px 32px rgba(92, 56, 16, 0.05);
}

.story-image {
  width: 140px;
  height: 110px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}

@media (max-width: 500px) {
  .story-image {
    width: 100%;
    height: 180px;
  }
}

.story-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.story-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}

.story-info h3 {
  font-size: 16px;
  color: var(--color-brand-brown, #5c3810);
  margin-bottom: 6px;
}

.story-info p {
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-brand-muted, #6e645e);
  margin-bottom: 12px;
}

.story-link {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--color-brand-green, #738a43);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s ease;
}

.story-card:hover .story-link {
  color: var(--color-brand-yellow, #dca11d);
}

@media (max-width: 768px) {
  .program-floating-tag {
    font-size: 9px;
    padding: 6px 12px;
  }
  .prog-tag-1 {
    left: -2%;
  }
  .prog-tag-2 {
    right: -2%;
  }
  .prog-tag-3 {
    left: 2%;
  }
}
      `}</style>
      {/* 1. Hero Section */}
      <section className="program-hero">
        <div className="program-hero-copy">
          <p className="eyebrow"><span></span> Program Kami</p>
          <h1>Ruang belajar yang<br /><em>hidup dan bermakna.</em></h1>
          <p>
            Kami menghubungkan pembelajaran dengan pengalaman nyata. Dirancang khusus untuk menumbuhkan 
            potensi anak, pemuda, keluarga, hingga kemandirian ekonomi pelaku usaha lokal.
          </p>
        </div>
        <div className="program-hero-graphic">
          <div className="program-hero-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=85" 
              alt="Program Belajar Bermakna" 
            />
          </div>
          <span className="program-floating-tag prog-tag-1">Literasi</span>
          <span className="program-floating-tag prog-tag-2">Alam</span>
          <span className="program-floating-tag prog-tag-3">UMKM</span>
        </div>
      </section>

      {/* 2. Programs Cards Grid */}
      <section className="programs-grid-section">
        <div className="programs-grid-title">
          <p className="eyebrow"><span></span> Layanan Program</p>
          <h2>Program Unggulan Fitrah Tumbuh</h2>
        </div>
        <div className="programs-cards-grid">
          {programs.map((prog) => (
            <article className="program-card" key={prog.title}>
              <div className="program-card-image">
                <img src={prog.image} alt={prog.title} />
                <div className="program-card-accent"></div>
              </div>
              <div className="program-card-info">
                <h3>{prog.title}</h3>
                <p>{prog.text}</p>
                <a 
                  className="button button-small"
                  href="https://wa.me/6285156916211?text=Halo%20Fitrah%20Tumbuh%2C%20saya%20tertarik%20untuk%20mendaftar%20atau%20tanya%20lebih%20lanjut%20tentang%20program%20"
                  target="_blank" 
                  rel="noreferrer"
                >
                  Tanya Program
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Green Callout Banner */}
      <section className="program-callout-banner">
        <div className="program-callout-intro">
          <h2>Prinsip dasar: <i>menghubungkan potensi</i> dengan kontribusi nyata.</h2>
        </div>
        <div className="program-callout-list">
          {highlights.map((item) => (
            <div className="program-callout-item" key={item.title}>
              <div className="program-callout-icon">{item.id}</div>
              <div className="program-callout-text">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Stories / Materials Section */}
      <section className="stories-section">
        <div className="stories-section-title">
          <p className="eyebrow"><span></span> Edukasi & Sumber</p>
          <h2>Materi Praktis Untuk Tumbuh Bersama</h2>
        </div>
        <div className="stories-grid">
          {materials.map((mat) => (
            <article className="story-card" key={mat.title}>
              <div className="story-image">
                <img src={mat.image} alt={mat.title} />
              </div>
              <div className="story-info">
                <div>
                  <h3>{mat.title}</h3>
                  <p>{mat.text}</p>
                </div>
                <a 
                  className="story-link" 
                  href="https://wa.me/6285156916211?text=Halo%20Fitrah%20Tumbuh%2C%20saya%20tertarik%20mendapatkan%20materi%20"
                  target="_blank" 
                  rel="noreferrer"
                >
                  Dapatkan Akses ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
