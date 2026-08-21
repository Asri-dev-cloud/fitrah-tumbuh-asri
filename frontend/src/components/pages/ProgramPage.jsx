const programs = [
  {
    title: 'Calistung & Literasi',
    text: 'Kegiatan belajar membaca, menulis, dan berhitung yang dikemas secara menyenangkan agar anak tumbuh percaya diri.'
  },
  {
    title: 'Belajar Bersama Alam',
    text: 'Pembelajaran yang memanfaatkan lingkungan nyata, mulai dari pertanian, ekosistem, hingga observasi alam sehari-hari.'
  },
  {
    title: 'Healing Farm',
    text: 'Ruang pemulihan dan refleksi melalui kegiatan bertani, kebersamaan, dan keterhubungan dengan alam.'
  },
  {
    title: 'Hiking & Family Camp',
    text: 'Kegiatan outdoor untuk memperkuat ikatan keluarga dan membangun kebiasaan sehat bersama.'
  },
  {
    title: 'Magang Pemuda',
    text: 'Pelatihan berbasis pengalaman untuk menumbuhkan kemampuan, disiplin, dan kemandirian pemuda.'
  },
  {
    title: 'Inkubasi UMKM',
    text: 'Pendampingan usaha lokal agar tumbuh dengan strategi yang relevan, sehat, dan berkelanjutan.'
  }
]

export default function ProgramPage() {
  return (
    <section className="page-content-shell">
      <div className="page-section-header">
        <p className="eyebrow"><span></span> Program</p>
        <h2>Program kami dirancang sesuai tahap tumbuh dan kebutuhan komunitas.</h2>
      </div>

      <div className="page-feature-grid three-col">
        {programs.map((item, index) => (
          <article className="page-feature-card" key={item.title}>
            <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

      <div className="page-highlight-card">
        <div>
          <p className="mini-kicker">Prinsip program</p>
          <h3>Konsep belajar yang menghubungkan potensi, pengalaman, dan kontribusi nyata.</h3>
        </div>
        <p>
          Setiap program kami didesain agar peserta tidak hanya mendapat ilmu, tetapi juga kemampuan untuk menerapkan,
          membangun kebiasaan baru, dan hidup lebih selaras dengan lingkungan serta sesama.
        </p>
      </div>
    </section>
  )
}
