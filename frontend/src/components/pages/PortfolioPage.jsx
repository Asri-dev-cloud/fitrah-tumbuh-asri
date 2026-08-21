import { useEffect, useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

const defaultPortfolioItems = [
  {
    title: 'Literasi Anak Marginal (Calistung Ceria)',
    image: '/calistung.png',
    masalah: 'Rendahnya minat baca dan kemampuan dasar membaca, menulis, berhitung (calistung) pada anak-anak prasejahtera di bantaran sungai Kabupaten Sumedang.',
    solusi: 'Penerapan metode belajar sambil bermain peran, penggunaan flashcards interaktif, dan sesi mendongeng kreatif berbasis alam terbuka.',
    target: '45 Anak marginal usia prasekolah dan kelas awal sekolah dasar.',
    aktivitas: 'Kelas literasi outdoor mingguan, kelompok membaca nyaring (read aloud), dan permainan menyusun kata dari ranting dan batu alam.',
    impact: 'Peningkatan kemampuan calistung sebesar 85% dalam 3 bulan, peningkatan kepercayaan diri anak saat berbicara di depan publik.',
    partner: 'Komunitas Jendela Sumedang'
  },
  {
    title: 'Restorasi Mental Pemuda (Healing Farm)',
    image: '/Healing Farm.png',
    masalah: 'Meningkatnya tingkat stres, kecemasan, dan hilangnya orientasi hidup pada pemuda pengangguran akibat disrupsi karir pasca-pandemi.',
    solusi: 'Mengintegrasikan hortikultura (berkebun sayur organik) sebagai sarana terapi psikologis, meditasi alam bebas, dan konseling kelompok sebaya.',
    target: '30 Pemuda usia produktif (18-25 tahun) di wilayah urban-rural.',
    aktivitas: 'Bercocok tanam sayuran organik secara berkelompok, menulis jurnal refleksi pagi, konseling karir, dan lokakarya perintisan usaha mikro.',
    impact: '90% peserta menyatakan kecemasan berkurang drastis, 8 orang pemuda berhasil meluncurkan usaha tani mandiri skala lokal.',
    partner: 'Himpunan Tani Indonesia Sumedang'
  },
  {
    title: 'Ekspedisi Karakter (Hiking Keluarga)',
    image: '/Hiking.png',
    masalah: 'Renggangnya komunikasi interpersonal di dalam keluarga dan tingginya kecenderungan kecanduan gawai (gadget addiction) pada anak-anak perkotaan.',
    solusi: 'Menyelenggarakan perjalanan lintas alam terstruktur tanpa membawa gawai untuk melatih kekompakan, kerja sama tim, dan kepemimpinan keluarga.',
    target: '20 Keluarga urban dengan anak usia sekolah dasar (7-12 tahun).',
    aktivitas: 'Navigasi rute hutan menggunakan kompas fisik, mendirikan tenda dome bersama, mengumpulkan kayu bakar untuk memasak, dan sesi refleksi malam.',
    impact: 'Terbangunnya kesepakatan bebas gawai (screen-free time) di rumah masing-masing, peningkatan kelekatan (bonding) emosi anak-orangtua.',
    partner: 'Ranger Gunung Manglayang'
  },
  {
    title: 'Outing Kebun Belajar Terpadu',
    image: '/Eksplorasi.png',
    masalah: 'Kurangnya pemahaman anak-anak sekolah perkotaan tentang asal usul makanan yang dikonsumsi dan pentingnya pelestarian ekosistem hayati.',
    solusi: 'Kunjungan lapangan interaktif (outing) sehari di kebun belajar terintegrasi pertanian dan peternakan ramah lingkungan.',
    target: '150 Siswa SD IT Tumbuh.',
    aktivitas: 'Membuat pupuk kompos organik dari dedaunan kering, memberi pakan hewan ternak kambing/kelinci, menanam benih padi, dan membuat herbarium.',
    impact: 'Siswa dapat menghargai kerja petani, pemahaman daur pangan meningkat, dan berkurangnya sisa makanan di sekolah sebesar 60%.',
    partner: 'Sekolah Alam Cerdas Bandung'
  },
  {
    title: 'Inkubasi Bisnis Mikro (UMKM Berdaya)',
    image: '/UMKM.png',
    masalah: 'Kendala pelaku usaha kecil pedesaan dalam menembus pasar ritel modern perkotaan karena buruknya desain kemasan dan keterbatasan pemasaran digital.',
    solusi: 'Lokakarya komparatif desain kemasan, perbaikan kualitas produk, pembekalan branding, dan fasilitasi pendaftaran Google Bisnisku.',
    target: '15 Pengrajin keripik rumahan dan anyaman bambu di pedesaan Sumedang.',
    aktivitas: 'Sesi kurasi produk, praktik foto katalog produk dengan smartphone, pembuatan kemasan ramah lingkungan, dan pemasangan kode pembayaran QRIS.',
    impact: 'Kenaikan omzet bulanan mitra rata-rata mencapai 35%, produk keripik berhasil masuk ke 3 gerai toko oleh-oleh utama.',
    partner: 'Dinas Koperasi & UMKM Jawa Barat'
  },
  {
    title: 'Program Magang Karya Pemuda',
    image: '/Magang.png',
    masalah: 'Kesenjangan keterampilan manajerial yang dialami lulusan SMK baru dalam menghadapi persaingan dunia kerja profesional.',
    solusi: 'Menyelenggarakan program magang terstruktur berbasis proyek riil sosial (project-based learning) dengan memanage agenda kepemudaan.',
    target: '12 Pemuda lulusan SMK/Diploma pencari kerja pertama.',
    aktivitas: 'Merancang proposal program sosial kemasyarakatan, menyusun anggaran operasional kegiatan, dan negosiasi penawaran sponsorship dengan dunia usaha.',
    impact: '100% peserta magang berhasil terserap bekerja di industri kreatif dan yayasan sosial mitra dalam waktu kurang dari 3 bulan.',
    partner: 'Yayasan Bakti Pemuda Bandung'
  }
]

const steps = [
  {
    num: '1',
    title: 'Observasi Potensi',
    desc: 'Kami memetakan potensi lokal, kebutuhan anak, dan aspirasi keluarga terlebih dahulu.'
  },
  {
    num: '2',
    title: 'Desain Program',
    desc: 'Merancang modul belajar dan aktivitas konkret yang sesuai dengan usia tumbuh kembang.'
  },
  {
    num: '3',
    title: 'Aksi Bersama',
    desc: 'Melaksanakan program di alam terbuka dengan pendekatan yang menyenangkan dan adaptif.'
  },
  {
    num: '4',
    title: 'Kolaborasi',
    desc: 'Menghubungkan orang tua, warga setempat, dan mitra ahli untuk bergotong-royong.'
  },
  {
    num: '5',
    title: 'Refleksi & Tumbuh',
    desc: 'Mengevaluasi hasil secara berkala untuk terus melahirkan dampak yang berkelanjutan.'
  }
]

export default function PortfolioPage({ navigate }) {
  const [portfolioItems, setPortfolioItems] = useState(defaultPortfolioItems)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/portfolio`)
      .then((response) => {
        if (!response.ok) throw new Error('Portfolio API failed')
        return response.json()
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Merge API data titles to default items or append
          const mapped = data.map((item) => {
            const match = defaultPortfolioItems.find(def => def.title.toLowerCase().includes(item.title.toLowerCase()))
            return {
              title: item.title,
              image: item.image || item.image_url || '/Eksplorasi.png',
              masalah: match?.masalah || 'Masalah tidak terdokumentasi secara tertulis.',
              solusi: match?.solusi || item.text || item.description || 'Solusi dilakukan melalui pendampingan komprehensif.',
              target: match?.target || 'Komunitas anak dan keluarga.',
              aktivitas: match?.aktivitas || 'Aktivitas belajar berbasis alam.',
              impact: match?.impact || 'Peningkatan kapasitas penerima manfaat.',
              partner: match?.partner || 'Mitra lokal pentahelix.'
            }
          })
          setPortfolioItems(mapped)
        }
      })
      .catch(() => {
        setPortfolioItems(defaultPortfolioItems)
      })
  }, [])

  return (
    <div className="portfolio-page-wrapper">
      <style>{`
.portfolio-page-wrapper {
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding-bottom: 80px;
}

/* 1. Hero Section */
.portfolio-hero {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 48px;
  min-height: 480px;
}

@media (max-width: 900px) {
  .portfolio-hero {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }
}

.portfolio-hero-copy h1 {
  font-size: clamp(38px, 5vw, 62px);
  line-height: 1.05;
  letter-spacing: -2px;
  color: var(--color-brand-brown, #5c3810);
  margin-bottom: 20px;
  font-weight: 900;
}

.portfolio-hero-copy h1 span.highlight {
  color: var(--color-brand-green, #738a43);
  position: relative;
  display: inline-block;
}

.portfolio-hero-copy h1 span.highlight::after {
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

.portfolio-hero-copy p {
  font-size: 16px;
  line-height: 1.65;
  color: var(--color-brand-muted, #6e645e);
  margin-bottom: 32px;
  max-width: 500px;
}

@media (max-width: 900px) {
  .portfolio-hero-copy p {
    margin: 0 auto 32px;
  }
}

.portfolio-hero-graphic {
  position: relative;
  width: 100%;
  max-width: 440px;
  aspect-ratio: 1 / 1.05;
  margin: 0 auto;
}

.portfolio-hero-image-wrapper {
  width: 90%;
  height: 90%;
  border-radius: 40px;
  overflow: hidden;
  border: 5px solid #ffffff;
  box-shadow: 0 24px 50px rgba(92, 56, 16, 0.15);
  position: relative;
  z-index: 2;
  background: var(--color-brand-green, #738a43);
}

.portfolio-hero-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.portfolio-hero-badge {
  position: absolute;
  top: 10%;
  right: -5%;
  background: var(--color-brand-yellow, #dca11d);
  color: #ffffff;
  padding: 12px 20px;
  border-radius: 24px;
  font-weight: 800;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 10px 25px rgba(220, 161, 29, 0.3);
  z-index: 3;
  transform: rotate(6deg);
}

/* 2. Profile Stats section */
.portfolio-stats-section {
  display: grid;
  grid-template-columns: 1fr 1fr 0.8fr;
  gap: 28px;
  align-items: stretch;
}

@media (max-width: 900px) {
  .portfolio-stats-section {
    grid-template-columns: 1fr;
  }
}

.portfolio-stats-intro {
  background: #ffffff;
  border: 1px solid rgba(92, 56, 16, 0.08);
  border-radius: 28px;
  padding: 28px;
  display: flex;
  gap: 20px;
  align-items: center;
}

.portfolio-stats-intro img {
  width: 90px;
  height: 90px;
  border-radius: 20px;
  object-fit: cover;
  border: 2px solid var(--color-brand-green, #738a43);
}

.portfolio-stats-intro h3 {
  font-size: 18px;
  color: var(--color-brand-brown, #5c3810);
  margin-bottom: 4px;
}

.portfolio-stats-intro p {
  font-size: 13px;
  color: var(--color-brand-muted, #6e645e);
  line-height: 1.4;
}

.portfolio-stats-numbers {
  background: #ffffff;
  border: 1px solid rgba(92, 56, 16, 0.08);
  border-radius: 28px;
  padding: 28px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  text-align: center;
  align-items: center;
}

.stat-box h4 {
  font-size: 26px;
  font-weight: 900;
  color: var(--color-brand-green, #738a43);
  margin-bottom: 4px;
}

.stat-box p {
  font-size: 11px;
  font-weight: 800;
  color: var(--color-brand-muted, #6e645e);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.portfolio-stats-quote {
  background: var(--color-brand-soft-yellow, #fdf6e2);
  border: 2px dashed rgba(92, 56, 16, 0.15);
  border-radius: 28px;
  padding: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.portfolio-stats-quote p {
  font-size: 14px;
  font-weight: 700;
  font-style: italic;
  color: var(--color-brand-brown, #5c3810);
  line-height: 1.5;
}

/* 3. Selected Works Card Grid */
.portfolio-works-section {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.portfolio-works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
  gap: 32px;
}

.work-card {
  background: #ffffff;
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid rgba(92, 56, 16, 0.08);
  box-shadow: 0 16px 35px rgba(92, 56, 16, 0.03);
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  flex-direction: column;
  position: relative;
}

.work-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 24px 50px rgba(92, 56, 16, 0.08);
  border-color: var(--color-brand-green, #738a43);
}

.work-card-image {
  height: 230px;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: var(--color-brand-soft-green, #eef3e2);
}

.work-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.work-card:hover .work-card-image img {
  transform: scale(1.04);
}

.work-card-info {
  padding: 28px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.work-card-info h3 {
  font-size: 19px;
  font-weight: 800;
  color: var(--color-brand-brown, #5c3810);
  margin-bottom: 8px;
  line-height: 1.4;
}

.work-card-info p {
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--color-brand-muted, #6e645e);
  margin-bottom: 20px;
  flex-grow: 1;
}

.work-card-arrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-brand-green, #738a43);
  text-decoration: none;
}

.work-card:hover .work-card-arrow {
  color: var(--color-brand-yellow, #dca11d);
}

/* 4. Process Section (How We Work) */
.portfolio-process-section {
  display: flex;
  flex-direction: column;
  gap: 48px;
  align-items: center;
}

.process-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
  width: 100%;
}

@media (max-width: 950px) {
  .process-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

.process-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}

.process-badge {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--color-brand-green, #738a43);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 18px;
  margin-bottom: 16px;
  border: 4px solid #ffffff;
  box-shadow: 0 6px 15px rgba(115, 138, 67, 0.2);
  z-index: 2;
}

.process-step:nth-child(2) .process-badge { background-color: var(--color-brand-yellow, #dca11d); }
.process-step:nth-child(3) .process-badge { background-color: var(--color-brand-gold, #cba819); }
.process-step:nth-child(4) .process-badge { background-color: var(--color-brand-brown, #5c3810); }
.process-step:nth-child(5) .process-badge { background-color: var(--color-brand-green, #738a43); }

@media (min-width: 951px) {
  .process-step::after {
    content: '→';
    position: absolute;
    top: 15px;
    right: -25px;
    font-size: 20px;
    font-weight: 800;
    color: rgba(92, 56, 16, 0.2);
    z-index: 1;
  }
  
  .process-step:last-child::after {
    display: none;
  }
}

.process-step h3 {
  font-size: 16px;
  color: var(--color-brand-brown, #5c3810);
  margin-bottom: 8px;
  font-weight: 800;
}

.process-step p {
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--color-brand-muted, #6e645e);
  max-width: 180px;
}

/* 5. Playful CTA Banner */
.portfolio-cta-banner {
  background: #231b18; /* Dark brown style, aligned with footer */
  color: #ffffff;
  border-radius: 32px;
  padding: 48px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  box-shadow: 0 20px 40px rgba(35, 27, 24, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

@media (max-width: 768px) {
  .portfolio-cta-banner {
    flex-direction: column;
    text-align: center;
    padding: 40px 24px;
  }
}

.portfolio-cta-copy h2 {
  font-size: clamp(24px, 3.5vw, 36px);
  font-weight: 900;
  margin-bottom: 8px;
  color: #ffffff;
}

.portfolio-cta-copy p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
}

.portfolio-cta-banner .button {
  background-color: var(--color-brand-yellow, #dca11d);
  color: #231b18;
  border: none;
  font-weight: 800;
  padding: 16px 36px;
  border-radius: 16px;
}

.portfolio-cta-banner .button:hover {
  background-color: #ffffff;
  transform: translateY(-2px);
}
      `}</style>

      {/* 1. Playful Hero Section */}
      <section className="portfolio-hero">
        <div className="portfolio-hero-copy">
          <span className="eyebrow" style={{ color: 'var(--color-brand-brown)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, marginBottom: '12px', display: 'inline-block' }}>
            Portofolio Kami
          </span>
          <h1>Karya nyata yang <span className="highlight">bertumbuh</span> di komunitas.</h1>
          <p>
            Dampak tidak melulu diukur dari hasil akhir, melainkan dari proses kedekatan dengan alam, 
            keluarga yang harmonis, dan pemuda yang berdaya.
          </p>
        </div>
        <div className="portfolio-hero-graphic">
          <div className="portfolio-hero-image-wrapper">
            <img src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=85" alt="Anak-anak belajar bersama alam" />
          </div>
          <div className="portfolio-hero-badge">Dampak Konkret</div>
        </div>
      </section>

      {/* 2. Intro Stats Grid */}
      <section className="portfolio-stats-section">
        <div className="portfolio-stats-intro">
          <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=300&q=80" alt="Sekolah Alam" />
          <div>
            <h3>Ruang Belajar Mandiri</h3>
            <p>Membantu menemukan fitrah sejati anak di ruang belajar yang membumi.</p>
          </div>
        </div>

        <div className="portfolio-stats-numbers">
          <div className="stat-box">
            <h4>10K+</h4>
            <p>Peserta</p>
          </div>
          <div className="stat-box">
            <h4>100+</h4>
            <p>Mitra</p>
          </div>
          <div className="stat-box">
            <h4>10+</h4>
            <p>Wilayah</p>
          </div>
        </div>

        <div className="portfolio-stats-quote">
          <p>"Alam adalah ruang kelas terbaik, dan setiap anak adalah pembelajar sejati."</p>
        </div>
      </section>

      {/* 3. Selected Works Section */}
      <section id="karya-pilihan" className="portfolio-works-section">
        <div className="page-section-header" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span className="eyebrow" style={{ color: 'var(--color-brand-brown)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, marginBottom: '8px', display: 'inline-block' }}>
            Karya Terpilih
          </span>
          <h2>Inisiatif yang Menggerakkan &amp; Memberdayakan</h2>
        </div>
        <div className="portfolio-works-grid">
          {portfolioItems.map((item) => (
            <article 
              className="work-card" 
              key={item.title} 
              onClick={() => setSelectedProject(item)} 
              style={{ cursor: 'pointer' }}
            >
              <div className="work-card-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="work-card-info">
                <h3>{item.title}</h3>
                <p>{item.masalah ? item.masalah.substring(0, 100) + '...' : item.text}</p>
                <span className="work-card-arrow">Lihat Detail Proyek ↗</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Process Workflow (How We Work Together) */}
      <section className="portfolio-process-section">
        <div className="page-section-header" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span className="eyebrow" style={{ color: 'var(--color-brand-brown)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, marginBottom: '8px', display: 'inline-block' }}>
            Alur Gerakan
          </span>
          <h2>Bagaimana Kami Bekerja Bersama Warga</h2>
        </div>
        <div className="process-grid">
          {steps.map((step) => (
            <div className="process-step" key={step.title}>
              <div className="process-badge">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Playful CTA Banner */}
      <section className="portfolio-cta-banner">
        <div className="portfolio-cta-copy">
          <h2>Mari buat dampak bersama kami!</h2>
          <p>Dukung gerakan belajar membumi melalui kemitraan program, donasi, atau kolaborasi kreatif.</p>
        </div>
        <button className="button" onClick={() => navigate('services')}>
          Mulai Kolaborasi ↗
        </button>
      </section>

      {/* 6. Modal Detail Proyek (8 Fields) */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-card" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detail Proyek</h2>
              <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>✕</button>
            </div>
            <div className="modal-body" style={{ maxHeight: '78vh', overflowY: 'auto' }}>
              <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '20px', aspectRatio: '16/9', backgroundColor: '#f5eedc' }}>
                <img src={selectedProject.image} alt={selectedProject.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              
              <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-brand-brown)', marginBottom: '20px', lineHeight: 1.3 }}>
                {selectedProject.title}
              </h1>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {selectedProject.masalah && (
                  <div>
                    <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-brand-brown)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                      ❌ Masalah
                    </h4>
                    <p style={{ fontSize: '13.5px', color: 'var(--color-brand-dark)', lineHeight: 1.55 }}>
                      {selectedProject.masalah}
                    </p>
                  </div>
                )}

                {selectedProject.solusi && (
                  <div>
                    <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-brand-brown)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                      ✅ Solusi
                    </h4>
                    <p style={{ fontSize: '13.5px', color: 'var(--color-brand-dark)', lineHeight: 1.55 }}>
                      {selectedProject.solusi}
                    </p>
                  </div>
                )}

                {selectedProject.target && (
                  <div>
                    <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-brand-brown)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                      🎯 Target Penerima Manfaat
                    </h4>
                    <p style={{ fontSize: '13.5px', color: 'var(--color-brand-dark)', lineHeight: 1.55 }}>
                      {selectedProject.target}
                    </p>
                  </div>
                )}

                {selectedProject.aktivitas && (
                  <div>
                    <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-brand-brown)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                      🏃 Aktivitas Proyek
                    </h4>
                    <p style={{ fontSize: '13.5px', color: 'var(--color-brand-dark)', lineHeight: 1.55 }}>
                      {selectedProject.aktivitas}
                    </p>
                  </div>
                )}

                {selectedProject.impact && (
                  <div>
                    <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-brand-brown)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                      📈 Dampak (Impact)
                    </h4>
                    <p style={{ fontSize: '13.5px', color: 'var(--color-brand-dark)', lineHeight: 1.55 }}>
                      {selectedProject.impact}
                    </p>
                  </div>
                )}

                {selectedProject.partner && (
                  <div>
                    <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-brand-brown)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                      🤝 Partner Kolaborasi
                    </h4>
                    <p style={{ fontSize: '13.5px', color: 'var(--color-brand-dark)', lineHeight: 1.55 }}>
                      {selectedProject.partner}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
