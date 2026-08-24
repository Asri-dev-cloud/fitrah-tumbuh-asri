import { useState, useEffect, useRef } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

const defaultPillars = [
  {
    title: 'Literasi Numerasi Menyenangkan',
    text: 'Pendekatan belajar membaca, menulis, dan berhitung yang menyenangkan dan kontekstual.',
    image: '/calistung.png'
  },
  {
    title: 'Belajar Bersama Alam',
    text: 'Pengalaman belajar langsung di alam yang menumbuhkan rasa ingin tahu dan kreativitas.',
    image: '/Eksplorasi.png'
  },
  {
    title: 'Berkebun & Beternak',
    text: 'Program healing farm yang mengajarkan tanggung jawab, kesabaran, dan nilai kehidupan.',
    image: '/Healing Farm.png'
  },
  {
    title: 'Hiking Pemuda & Keluarga',
    text: 'Ekspedisi alam yang membangun karakter, kepemimpinan, dan ikatan komunitas.',
    image: '/Hiking.png'
  },
  {
    title: 'Program Magang',
    text: 'Pengalaman kerja nyata yang membekali pemuda dengan keterampilan profesional.',
    image: '/Magang.png'
  },
  {
    title: 'Inkubasi UMKM',
    text: 'Pendampingan usaha bagi ibu rumah tangga dan pemuda untuk mandiri secara ekonomi.',
    image: '/UMKM.png'
  }
]

export default function Ecosystem() {
  const [pillars, setPillars] = useState(defaultPillars)

  // Carousel dragging states & logic
  const carouselRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const startRotation = useRef(0)
  const [rotationAngle, setRotationAngle] = useState(0)

  // Auto rotation
  useEffect(() => {
    let animationFrameId;
    const rotate = () => {
      if (!isDragging.current) {
        setRotationAngle(prev => (prev - 0.05) % 360)
      }
      animationFrameId = requestAnimationFrame(rotate)
    }
    animationFrameId = requestAnimationFrame(rotate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  const startCarouselDrag = (e) => {
    isDragging.current = true
    startX.current = e.clientX
    startRotation.current = rotationAngle
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const moveCarousel = (e) => {
    if (!isDragging.current) return
    const deltaX = e.clientX - startX.current
    const sensitivity = 0.4
    setRotationAngle(startRotation.current + deltaX * sensitivity)
  }

  const stopCarouselDrag = (e) => {
    if (!isDragging.current) return
    isDragging.current = false
    e.currentTarget.releasePointerCapture(e.pointerId)
  }

  const productFrames = [
    {
      label: "Literasi Karakter",
      title: "Anak bertumbuh merdeka & penuh rasa ingin tahu.",
      accent: "var(--color-brand-yellow)",
      image: "/Literasi Karakter.png",
      y: 0,
      tilt: 0,
      scale: 1,
    },
    {
      label: "Penyelamatan Bumi",
      title: "Menghidupkan tanah & merawat kelestarian alam.",
      accent: "var(--color-brand-green)",
      image: "/Penyelamatan Bumi.png",
      y: 10,
      tilt: -2,
      scale: 0.95,
    },
    {
      label: "Kedamaian Batin",
      title: "Hijau terapi alam memulihkan ketenangan jiwa.",
      accent: "#c27a29",
      image: "/Kedamaian Batin.png",
      y: -10,
      tilt: 2,
      scale: 0.98,
    },
    {
      label: "Jiwa Petualang",
      title: "Menempa fisik tangguh & kepemimpinan kokoh.",
      accent: "var(--color-brand-green)",
      image: "/Jiwa Petualang.png",
      y: 5,
      tilt: -1,
      scale: 1,
    },
    {
      label: "Kemandirian Warga",
      title: "Usaha komunitas menopang ekonomi keluarga.",
      accent: "var(--color-brand-yellow)",
      image: "/Kemandirian Warga.png",
      y: -5,
      tilt: 1,
      scale: 0.97,
    },
    {
      label: "Kader Pemuda",
      title: "Magang kerja melahirkan penggerak sosial baru.",
      accent: "var(--color-brand-gold)",
      image: "/Kader Pemuda.png",
      y: 15,
      tilt: -3,
      scale: 0.93,
    },
    {
      label: "Rantai Kebaikan",
      title: "Hasil wirausaha diputar untuk dana belajar anak.",
      accent: "#c27a29",
      image: "/Rantai Kebaikan.png",
      y: -15,
      tilt: 3,
      scale: 0.96,
    },
    {
      label: "Guyub Komunitas",
      title: "Gotong royong warga membangun desa berdaulat.",
      accent: "var(--color-brand-green)",
      image: "/Gotong royong warga.png",
      y: 0,
      tilt: 0,
      scale: 1,
    }
  ]

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/programs`)
      .then(res => {
        if (!res.ok) throw new Error('API failed')
        return res.json()
      })
      .then(data => {
        if (data && data.length > 0) {
          const mapped = data.map(p => ({
            title: p.title,
            text: p.description,
            image: p.image_url
          }))
          setPillars(mapped)
        }
      })
      .catch(err => console.log('Using default static program pillars:', err.message))
  }, [])

  return (
    <>
      <style>{`
.craftly-batik {
  background-image:
    radial-gradient(ellipse at center, transparent 0 23%, currentColor 24% 26%, transparent 27% 44%, currentColor 45% 47%, transparent 48%),
    radial-gradient(ellipse at center, transparent 0 23%, currentColor 24% 26%, transparent 27% 44%, currentColor 45% 47%, transparent 48%);
  background-position: 0 0, 42px 42px;
  background-size: 84px 84px;
  color: var(--color-brand-yellow);
  transform: rotate(-7deg) scale(1.12);
}
.craftly-batik-fade {
  background: linear-gradient(90deg, #5c3810 12%, rgba(92, 56, 16, 0.7) 42%, rgba(92, 56, 16, 0.08) 100%);
}
.craftly-batik-light {
  background-image:
    radial-gradient(ellipse at center, transparent 0 23%, currentColor 24% 25%, transparent 26% 44%, currentColor 45% 46%, transparent 47%),
    radial-gradient(ellipse at center, transparent 0 23%, currentColor 24% 25%, transparent 26% 44%, currentColor 45% 46%, transparent 47%);
  background-position: 0 0, 54px 54px;
  background-size: 108px 108px;
  color: var(--color-brand-green);
}
.craftly-carousel-orbit {
  will-change: transform;
}
.craftly-carousel-orbit article {
  transform: rotateY(var(--card-angle)) translateZ(255px) translateY(var(--card-y)) rotateZ(var(--card-tilt)) scale(var(--card-scale));
  background-size: cover;
  background-position: center;
}
.craftly-carousel-orbit article > * {
  backface-visibility: hidden;
}
.craftly-carousel-orbit article::after {
  content: "FITRAH TUMBUH";
  position: absolute;
  inset: 0;
  z-index: 10;
  display: grid;
  place-items: center;
  background: linear-gradient(145deg, #1c1512, #2d221d);
  color: rgba(250,240,215,.28);
  font-family: monospace;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: .22em;
  transform: rotateY(180deg) translateZ(1px);
  backface-visibility: hidden;
}
@media (max-width: 767px) {
  .craftly-carousel-orbit article {
    transform: rotateY(var(--card-angle)) translateZ(160px) translateY(var(--card-y-mobile)) rotateZ(var(--card-tilt)) scale(var(--card-scale));
  }
}
      `}</style>
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

              </div>
              <img src={pillar.image} alt={pillar.title} className="pillar-illustration" />
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
