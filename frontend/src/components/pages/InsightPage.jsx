import { useState } from 'react'

const defaultArticles = [
  {
    id: 1,
    title: 'Menumbuhkan Kemandirian Anak Berbasis Fitrah',
    category: 'Parenting',
    author: 'Fasilitator Pengasuhan FT',
    date: '15 Aug 2026',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80',
    summary: 'Pengasuhan yang sesungguhnya bukan mendikte anak, melainkan mengamati dan memfasilitasi dorongan fitrah yang sudah Tuhan titipkan.',
    content: 'Setiap anak dilahirkan membawa cetak biru potensinya sendiri. Tugas orangtua bukanlah membentuk mereka dari nol seperti tanah liat, melainkan menjaga dan menumbuhkan fitrah belajarnya. Dalam tulisan ini, kita menjelajahi pentingnya membiarkan anak memecahkan masalah kecil mereka sendiri secara konkret tanpa intervensi berlebihan. Melalui pembiasaan sederhana di rumah, anak akan tumbuh dengan rasa percaya diri, tanggung jawab, dan nalar kritis yang sehat.',
    ctaType: 'product' // links to #produk
  },
  {
    id: 2,
    title: 'Menemukan Spark dan Arah Hidup Sebelum Usia 20',
    category: 'Pemuda',
    author: 'Coach Karir Pemuda',
    date: '10 Aug 2026',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
    summary: 'Banyak pemuda terjebak kegalauan karir karena terbiasa memilih jurusan berdasarkan tren. Kenali potensi utama Anda sedini mungkin.',
    content: 'Masa muda adalah masa eksplorasi emas. Namun, sistem pendidikan seringkali menuntut pemuda memilih jurusan dan karir sebelum mereka memahami diri mereka sendiri. Dengan mengenali dorongan alami (spark) dan memetakan kekuatan pribadi lewat instrumen sederhana, pemuda dapat menyusun peta jalan belajar dan mulai berkarya secara produktif tanpa diselimuti kecemasan berlebih.',
    ctaType: 'product' // links to #produk
  },
  {
    id: 3,
    title: 'Desain Karir Masa Depan yang Bermakna',
    category: 'Career',
    author: 'Konsultan Pengembangan Potensi',
    date: '02 Aug 2026',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80',
    summary: 'Karir bukan sekadar tangga kesuksesan finansial, melainkan sarana berkontribusi bagi masyarakat sesuai keunikan diri.',
    content: 'Merancang karir yang bermakna membutuhkan refleksi mendalam mengenai apa yang kita cintai, apa yang kita kuasai, dan apa yang dibutuhkan oleh sekeliling kita. Mengombinasikan model tujuan hidup (ikigai) dengan pemetaan potensi bakat dari Fitrah Tumbuh memberikan panduan strategis bagi para profesional untuk mengambil langkah transisi karir yang lebih berani dan selaras dengan panggilan jiwa.',
    ctaType: 'product' // links to #produk
  },
  {
    id: 4,
    title: 'Kurikulum Berbasis Projek di Sekolah Alam',
    category: 'Education',
    author: 'Desainer Program Schole',
    date: '28 Jul 2026',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    summary: 'Mengintegrasikan matematika, sains, dan bahasa ke dalam aktivitas berkebun dan petualangan fisik anak didik.',
    content: 'Belajar tidak harus dibatasi oleh dinding kelas. Kurikulum berbasis proyek di alam terbuka terbukti meningkatkan retensi belajar anak didik hingga tiga kali lipat. Melalui aktivitas menanam sayuran, mengukur luas petak tanah, dan menuliskan jurnal pertumbuhan berkala, siswa mempraktikkan teori sains, matematika, dan literasi sekaligus dalam pengalaman nyata.',
    ctaType: 'service' // links to #services
  },
  {
    id: 5,
    title: 'Membangun Dampak Melalui Inovasi Sosial Lokal',
    category: 'Community',
    author: 'Fasilitator Pemberdayaan Warga',
    date: '19 Jul 2026',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    summary: 'Bagaimana inisiatif kecil warga desa mampu merevitalisasi lahan tidur menjadi kebun belajar organik terpadu.',
    content: 'Pemberdayaan masyarakat yang berkelanjutan tidak dimulai dari bantuan materi luar, melainkan dari pemetaan aset lokal yang dimiliki warga (Asset-Based Community Development). Program inkubasi dan pendampingan desa wisata di Sumedang membuktikan bahwa sinergi pentahelix mampu menggerakkan ekonomi lokal secara mandiri dengan basis kearifan lokal yang kental.',
    ctaType: 'service' // links to #services
  },
  {
    id: 6,
    title: 'Mewujudkan Sekolah Nol Sampah (Zero Waste School)',
    category: 'Green Project',
    author: 'Inisiator Proyek Hijau FT',
    date: '05 Jul 2026',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=600&q=80',
    summary: 'Program pengelolaan sampah terintegrasi yang mendidik anak sadar lingkungan secara nyata sejak dini.',
    content: 'Mengajarkan kelestarian bumi harus didukung dengan pembiasaan konkret. Sekolah nol sampah dirancang dengan mengeliminasi wadah plastik sekali pakai di kantin, melatih anak didik memilah sampah organik untuk dijadikan pupuk cair kebun sekolah, serta memanfaatkan limbah anorganik untuk proyek kriya kreatif yang bernilai estetika.',
    ctaType: 'service' // links to #services
  }
]

const categories = ['All', 'Parenting', 'Pemuda', 'Career', 'Education', 'Community', 'Green Project']

export default function InsightPage({ navigate }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeArticle, setActiveArticle] = useState(null)

  const filteredArticles = defaultArticles.filter(art => {
    const matchCat = selectedCategory === 'All' || art.category === selectedCategory
    const matchQuery = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       art.summary.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchQuery
  })

  const handleCtaClick = (type) => {
    setActiveArticle(null)
    if (type === 'product') {
      navigate('produk')
    } else {
      navigate('services')
    }
  }

  return (
    <div className="storefront-wrapper" style={{ paddingTop: '20px' }}>
      {/* Category selector & search header */}
      <div className="catalog-header" style={{ marginBottom: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', alignItems: 'flex-end' }}>
          <div className="filter-column">
            <span className="filter-label">Kategori Artikel</span>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="search-box-wrap">
            <input
              type="text"
              placeholder="Cari artikel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="store-search-input"
            />
            <span className="search-icon-svg">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
            </span>
          </div>
        </div>
      </div>

      {/* Grid of articles */}
      {filteredArticles.length === 0 ? (
        <div className="empty-state">
          <h3>Artikel Tidak Ditemukan</h3>
          <p>Coba gunakan kata kunci pencarian yang lain atau pilih kategori yang berbeda.</p>
        </div>
      ) : (
        <div className="catalog-grid">
          {filteredArticles.map(art => (
            <article className="catalog-card" key={art.id}>
              <div className="catalog-img-box">
                <img src={art.image} alt={art.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="catalog-badge-row">
                  <span className="catalog-badge type-badge">{art.category}</span>
                </div>
              </div>
              <div className="catalog-info">
                <span style={{ fontSize: '12px', color: 'var(--color-brand-muted)', fontWeight: 700, marginBottom: '6px', display: 'block' }}>
                  Oleh: {art.author} · {art.date}
                </span>
                <h3>{art.title}</h3>
                <p>{art.summary}</p>
                <div className="catalog-footer-row" style={{ marginTop: 'auto' }}>
                  <button 
                    onClick={() => setActiveArticle(art)}
                    className="button button-small"
                  >
                    Baca Selengkapnya ↗
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Modal Baca Artikel */}
      {activeArticle && (
        <div className="modal-overlay" onClick={() => setActiveArticle(null)}>
          <div className="modal-card" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{activeArticle.category} Insight</h2>
              <button className="modal-close-btn" onClick={() => setActiveArticle(null)}>✕</button>
            </div>
            <div className="modal-body" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
              <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '20px', aspectRatio: '16/9', backgroundColor: '#f5eedc' }}>
                <img src={activeArticle.image} alt={activeArticle.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontSize: '13px', color: 'var(--color-brand-muted)', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                Oleh {activeArticle.author} · {activeArticle.date}
              </span>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-brand-brown)', marginBottom: '16px', lineHeight: 1.3 }}>
                {activeArticle.title}
              </h1>
              <p style={{ fontSize: '14.5px', color: 'var(--color-brand-dark)', lineHeight: 1.7, marginBottom: '30px', textAlign: 'justify', whiteSpace: 'pre-line' }}>
                {activeArticle.content}
              </p>

              {/* CONTEXT-SENSITIVE CALL TO ACTION (CTA) */}
              <div style={{
                background: 'var(--color-brand-cream, #fbf9f4)',
                border: '2px dashed rgba(92, 56, 16, 0.15)',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center'
              }}>
                {activeArticle.ctaType === 'product' ? (
                  <>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-brand-brown)', marginBottom: '6px' }}>
                      Butuh tools yang lebih praktis?
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-brand-muted)', marginBottom: '16px' }}>
                      Kami menyediakan ebook reflektif, worksheet ramah anak, dan toolkit siap pakai.
                    </p>
                    <button 
                      onClick={() => handleCtaClick('product')}
                      className="button button-small"
                      style={{ padding: '10px 24px' }}
                    >
                      Lihat Produk Kami 📦
                    </button>
                  </>
                ) : (
                  <>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-brand-brown)', marginBottom: '6px' }}>
                      Ingin mengembangkan project seperti ini?
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-brand-muted)', marginBottom: '16px' }}>
                      Konsultasikan kebutuhan desain kurikulum, proposal program, atau bimbingan proyek Anda bersama kami.
                    </p>
                    <button 
                      onClick={() => handleCtaClick('service')}
                      className="button button-small"
                      style={{ padding: '10px 24px' }}
                    >
                      Konsultasikan dengan Fitrah Tumbuh 💼
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
