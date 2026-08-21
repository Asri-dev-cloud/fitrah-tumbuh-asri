const materials = [
  {
    title: 'Artikel & Refleksi',
    text: 'Tema-tema praktis tentang pendidikan, karakter, dan cara menumbuhkan potensi secara manusiawi.'
  },
  {
    title: 'E-book & Modul',
    text: 'Bahan belajar yang bisa dipergunakan keluarga, pendidik, maupun komunitas dalam proses tumbuh.'
  },
  {
    title: 'Video & Workshop',
    text: 'Konten yang memadukan praktik, visual, dan refleksi agar pesan mudah dipahami dan diterapkan.'
  }
]

export default function EducationPage() {
  return (
    <section className="page-content-shell">
      <div className="page-section-header">
        <p className="eyebrow"><span></span> Edukasi</p>
        <h2>Belajar bisa dimulai dari hal kecil yang dekat dengan kehidupan sehari-hari.</h2>
      </div>

      <div className="page-feature-grid three-col">
        {materials.map((item, index) => (
          <article className="page-feature-card" key={item.title}>
            <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

      <div className="page-highlight-card emphasis">
        <div>
          <p className="mini-kicker">Tujuan edukasi</p>
          <h3>Menguatkan kemampuan berpikir, merasakan, dan bergerak dengan sadar.</h3>
        </div>
        <p>
          Materi yang kami bagikan dibuat untuk mendorong perubahan yang realistis: belajar di rumah, di ruang komunitas,
          dan dalam keseharian yang lebih dekat dengan alam serta orang-orang sekitar.
        </p>
      </div>
    </section>
  )
}
