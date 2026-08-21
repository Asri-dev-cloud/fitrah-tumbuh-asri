const portfolioItems = [
  {
    title: 'Dokumentasi Foto',
    text: 'Jejak kegiatan yang memperlihatkan proses belajar, kerja sama, dan interaksi manusiawi antar peserta.'
  },
  {
    title: 'Video Kegiatan',
    text: 'Rekaman pengalaman nyata yang menggambarkan dinamika dan semangat tumbuh di setiap program.'
  },
  {
    title: 'Dampak Program',
    text: 'Perubahan kecil yang terasa besar ketika dibangun dengan kesadaran, konsistensi, dan dukungan komunitas.'
  },
  {
    title: 'Testimoni',
    text: 'Suara peserta, keluarga, dan mitra yang menjadi bukti bahwa proses yang baik memang menghasilkan hasil yang nyata.'
  },
  {
    title: 'Statistik Program',
    text: 'Data dan perkembangan yang membantu melihat arah pertumbuhan program secara lebih objektif.'
  },
  {
    title: 'Cerita Komunitas',
    text: 'Narasi tentang perjalanan, tantangan, dan kebanggaan yang dibangun bersama dari satu aksi yang sederhana.'
  }
]

export default function PortfolioPage() {
  return (
    <section className="page-content-shell">
      <div className="page-section-header">
        <p className="eyebrow"><span></span> Portofolio</p>
        <h2>Dampak kami tumbuh melalui proses, bukan sekadar hasil akhir.</h2>
      </div>

      <div className="page-feature-grid three-col">
        {portfolioItems.map((item, index) => (
          <article className="page-feature-card" key={item.title}>
            <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
