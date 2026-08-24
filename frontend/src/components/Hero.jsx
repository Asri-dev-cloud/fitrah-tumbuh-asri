const photos = [
  '/1.jpg',
  '/2.jpg',
  '/3.jpg',
  '/4.jpg',
  '/8.JPG',
  '/10.JPG',
  '/11.jpg',
  '/12.jpg',
  '/13.jpg',
  '/14.jpg',
  '/16.jpg',
  '/17.jpg',
  '/18.jpg',
  '/19.jpg',
  '/20.jpg'
]

export default function Hero({ navigate }) {
  return (
    <section className="hero-section-wrapper">
      <div id="beranda" className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow" style={{ color: 'var(--color-brand-brown)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, marginBottom: '12px', display: 'inline-block' }}>
            Apa itu Fitrah Tumbuh?
          </span>
          <h1>
            <span className="highlight-fitrah">Bertumbuh dalam Fitrah,</span><br />
            <span className="highlight-sesama">Bergerak untuk Sesama.</span>
          </h1>
          <p className="hero-text">
            Platform pendidikan dan pengembangan potensi untuk keluarga, pemuda, pekerja, dan komunitas.
          </p>
          <div className="hero-buttons">
            <a href="#program" className="button" onClick={(e) => { e.preventDefault(); navigate('program'); }}>
              Explore Program <span>→</span>
            </a>
            <a href="#services" className="text-button" onClick={(e) => { e.preventDefault(); navigate('services'); }}>
              Konsultasi <b>→</b>
            </a>
          </div>
        </div>

        <div className="editorial-collage heart" aria-label="Kolase kegiatan belajar anak dan komunitas">
          {photos.map((photo, index) => (
            <img
              className={`photo-${index + 1}`}
              key={photo}
              src={photo}
              alt="Kegiatan belajar Fitrah Tumbuh"
            />
          ))}
        </div>
      </div>

      <div className="wave-divider">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C150,100 350,20 500,60 C650,100 850,20 1000,60 C1150,100 1200,80 1200,80 L1200,120 L0,120 Z" className="shape-fill"></path>
        </svg>
      </div>
    </section>
  )
}
