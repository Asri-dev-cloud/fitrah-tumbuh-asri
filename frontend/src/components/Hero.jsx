const photos = [
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80', // Photo 1 (t1)
  'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=400&q=80', // Photo 2 (t2)
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80', // Photo 3 (t3 - Large)
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80', // Photo 4 (l1)
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80', // Photo 5 (l2)
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80', // Photo 6 (m1 - Large)
  'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&q=80', // Photo 7 (c1)
  'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=400&q=80', // Photo 8 (c2)
  'https://images.unsplash.com/photo-1560421683-6856ea585c78?auto=format&fit=crop&w=600&q=80', // Photo 9 (m2 - Large)
  'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&q=80', // Photo 10 (r1)
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80', // Photo 11 (r2)
  'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=400&q=80', // Photo 12 (b1)
  'https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&w=600&q=80', // Photo 13 (m3 - Large, fixed URL)
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80', // Photo 14 (b2)
  'https://images.unsplash.com/photo-1545601445-4d6a0a0565f0?auto=format&fit=crop&w=400&q=80'  // Photo 15 (b3)
]

export default function Hero() {
  return (
    <section className="hero-section-wrapper">
      <div id="beranda" className="hero-section">
        <div className="hero-copy">
          <h1>Bertumbuh dalam <em>fitrah,</em><br />bergerak untuk sesama.</h1>
          <p className="hero-text">
            Membangun ekosistem pendidikan dan pengembangan komunitas yang membantu setiap individu mengenali potensi sejatinya, bersahabat dengan alam, serta berkontribusi nyata bagi sekelilingnya.
          </p>
          <div className="hero-buttons">
            <a href="#program" className="button">
              Jelajahi Program <span>→</span>
            </a>
            <a href="#kontak" className="text-button">
              Hubungi Kami <b>→</b>
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
