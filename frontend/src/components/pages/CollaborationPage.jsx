const partners = [
  {
    title: 'Sekolah & Pendidikan',
    text: 'Kolaborasi program pembelajaran, penguatan karakter, dan kegiatan edukatif yang relevan dengan kebutuhan anak dan guru.'
  },
  {
    title: 'Komunitas & Pemerintah',
    text: 'Pendekatan bersama untuk membangun ruang tumbuh yang lebih luas, inklusif, dan berdampak pada lingkungan sekitar.'
  },
  {
    title: 'Dunia Usaha',
    text: 'Bentuk dukungan yang membantu program berkembang lewat kapasitas, relasi, serta peluang yang lebih terstruktur.'
  },
  {
    title: 'Media & Narasi',
    text: 'Menyebarkan cerita inspiratif tentang pendidikan yang menumbuhkan manusia dan menempatkan komunitas di pusatnya.'
  },
  {
    title: 'CSR & Donasi',
    text: 'Dukungan yang memperkuat akses pembelajaran, ruang pertumbuhan, dan kesejahteraan komunitas.'
  },
  {
    title: 'Program Bersama',
    text: 'Ruang kolaborasi untuk program spesifik, kegiatan bersama, serta pilot project yang menghasilkan dampak nyata.'
  }
]

export default function CollaborationPage() {
  return (
    <section className="page-content-shell">
      <div className="page-section-header">
        <p className="eyebrow"><span></span> Kolaborasi</p>
        <h2>Kebaikan tumbuh lebih jauh ketika dikerjakan bersama.</h2>
      </div>

      <div className="page-feature-grid three-col">
        {partners.map((item, index) => (
          <article className="page-feature-card" key={item.title}>
            <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

      <div className="page-highlight-card emphasis">
        <div>
          <p className="mini-kicker">Ruang kolaborasi</p>
          <h3>Siap berkerja sama untuk membangun pendidikan yang membumi dan berdampak.</h3>
        </div>
        <p>
          Kami membuka ruang kolaborasi dengan sekolah, komunitas, mitra, dan pihak yang ingin bergerak bersama dalam menciptakan
          pendidikan yang lebih manusiawi, relevan, dan berkelanjutan.
        </p>
      </div>
    </section>
  )
}
