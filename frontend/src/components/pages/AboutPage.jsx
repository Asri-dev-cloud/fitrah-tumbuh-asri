const items = [
  {
    title: 'Sejarah Schole Fitrah',
    text: 'Awal mula Fitrah Tumbuh lahir dari keprihatinan atas pendidikan yang terlalu kaku dan jauh dari pengalaman nyata.'
  },
  {
    title: 'Visi & Misi',
    text: 'Membawa pendidikan yang menumbuhkan potensi manusia secara utuh: akal, hati, karakter, dan kebersamaan.'
  },
  {
    title: 'Wilayah Bandung–Sumedang',
    text: 'Kami membangun ruang belajar yang dekat dengan alam, keluarga, dan komunitas di wilayah Bandung dan Sumedang.'
  }
]

export default function AboutPage() {
  return (
    <section className="page-content-shell">
      <div className="page-section-header">
        <p className="eyebrow"><span></span> Tentang Kami</p>
        <h2>Fitrah Tumbuh menumbuhkan manusia dengan cara yang dekat, konkret, dan penuh makna.</h2>
      </div>

      <div className="page-feature-grid">
        {items.map((item, index) => (
          <article className="page-feature-card" key={item.title}>
            <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

      <div className="page-highlight-card">
        <div>
          <p className="mini-kicker">Nilai utama</p>
          <h3>Setiap manusia hadir dengan potensi yang layak ditemukan.</h3>
        </div>
        <p>
          Kami percaya pendidikan bukan sekadar transfer ilmu, tetapi proses menumbuhkan rasa percaya diri,
          tanggung jawab, dan kepedulian terhadap sesama serta lingkungan.
        </p>
      </div>
    </section>
  )
}
