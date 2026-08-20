const pillars = [
  {
    title: 'Calistung Menyenangkan',
    text: 'Literasi dan numerasi yang tumbuh dari rasa ingin tahu alami anak.',
    image: '/calistung.png'
  },
  {
    title: 'Belajar Bersama Alam',
    text: 'Eksplorasi sains, keanekaragaman hayati, dan ekologi di luar ruang.',
    image: '/Eksplorasi.png'
  },
  {
    title: 'Healing Farm',
    text: 'Menumbuhkan empati dan kepedulian melalui berkebun dan beternak.',
    image: '/Healing Farm.png'
  },
  {
    title: 'Hiking & Adventure',
    text: 'Ekspedisi luar ruang untuk melatih fisik, keberanian, dan kepemimpinan.',
    image: '/Hiking.png'
  },
  {
    title: 'Program Magang',
    text: 'Pemberdayaan pemuda lewat pengalaman kerja profesional di bisnis sosial.',
    image: '/Magang.png'
  },
  {
    title: 'Inkubasi UMKM',
    text: 'Pendampingan kewirausahaan mandiri untuk ibu-ibu di komunitas.',
    image: '/UMKM.png'
  }
]

export default function Ecosystem() {
  return (
    <section id="program" className="ecosystem-section">
      <div className="section-intro">
        <div>
          <h2>Bergerak bersama,<br /><em>bertumbuh bermakna.</em></h2>
        </div>
        <p>Enam pilar yang saling menguatkan — dari anak, keluarga, hingga kemandirian komunitas.</p>
      </div>

      <div className="pillar-grid">
        {pillars.map((pillar, index) => (
          <article className="pillar-card" key={pillar.title}>
            <div className="pillar-info">
              <span className="pillar-number">0{index + 1}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
              <a href="#kontak">
                Pelajari <b>→</b>
              </a>
            </div>
            <img src={pillar.image} alt={pillar.title} className="pillar-illustration" />
          </article>
        ))}
      </div>

      <div className="flywheel">
        <div className="wheel-copy">
          <p className="eyebrow"><span></span> Dampak yang berputar</p>
          <h2>Satu langkah kecil,<br /><em>gema yang panjang.</em></h2>
          <p>Setiap program menumbuhkan dampak baru, yang kembali menguatkan ekosistem.</p>
          <a className="text-button" href="#tentang-kami">Cerita kami <b>→</b></a>
        </div>
        <div className="wheel">
          <div className="wheel-center-logo">
            <img src="/ft.png" alt="Fitrah Tumbuh Logo" />
          </div>
          {['Literasi Anak', 'Eksplorasi Alam', 'Karakter & Jiwa', 'Magang Pemuda', 'UMKM Mandiri'].map((x, i) => (
            <span key={x} className={`wheel-item w${i}`}>{x}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
