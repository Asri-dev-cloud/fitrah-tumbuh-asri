const principles = [
  {
    title: 'Fitrah Keimanan',
    text: 'Membentuk manusia yang sadar akan makna hidup, menghargai hubungan dengan Sang Pencipta, dan menjalani hidup dengan hati yang lembut.'
  },
  {
    title: 'Fitrah Belajar',
    text: 'Belajar adalah proses yang menyenangkan dan bertumbuh, bukan sekadar mengejar skor atau hasil yang seragam.'
  },
  {
    title: 'Fitrah Bakat',
    text: 'Setiap anak dan individu memiliki cara tumbuh yang unik. Kami hadir untuk menemani proses menemukan bakatnya secara natural.'
  }
]

export default function PhilosophyPage() {
  return (
    <section className="page-content-shell">
      <div className="page-section-header">
        <p className="eyebrow"><span></span> Filosofi Fitrah</p>
        <h2>Tidak ada satu pola tumbuh yang sama. Setiap individu perlu ruang untuk menemukan dirinya.</h2>
      </div>

      <div className="page-feature-grid three-col">
        {principles.map((item, index) => (
          <article className="page-feature-card" key={item.title}>
            <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

      <div className="page-highlight-card emphasis">
        <div>
          <p className="mini-kicker">Pendekatan kami</p>
          <h3>Belajar yang membumi, manusiawi, dan berdampak.</h3>
        </div>
        <p>
          Kami tidak menyeragamkan anak dalam satu cara belajar. Kami membangun ruang yang memberi mereka ruang bernapas,
          mencoba, gagal dengan baik, dan bangkit dengan kebiasaan yang sehat.
        </p>
      </div>
    </section>
  )
}
