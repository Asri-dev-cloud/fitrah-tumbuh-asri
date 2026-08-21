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
      accent: "#dca11d",
      image: "/Literasi Karakter.png",
      y: 0,
      tilt: 0,
      scale: 1,
    },
    {
      label: "Penyelamatan Bumi",
      title: "Menghidupkan tanah & merawat kelestarian alam.",
      accent: "#738a43",
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
      accent: "#738a43",
      image: "/Jiwa Petualang.png",
      y: 5,
      tilt: -1,
      scale: 1,
    },
    {
      label: "Kemandirian Warga",
      title: "Usaha komunitas menopang ekonomi keluarga.",
      accent: "#dca11d",
      image: "/Kemandirian Warga.png",
      y: -5,
      tilt: 1,
      scale: 0.97,
    },
    {
      label: "Kader Pemuda",
      title: "Magang kerja melahirkan penggerak sosial baru.",
      accent: "#cba819",
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
      accent: "#738a43",
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
  color: #dca11d;
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
  color: #738a43;
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

      {/* Dampak yang Berputar: Neo-Brutalist 3D Carousel Section */}
      <section className="dampak-carousel-section relative z-0">
        {/* Wave Divider at the top of the section */}
        <div className="absolute -top-[2px] left-0 w-full overflow-hidden leading-none z-10 pointer-events-none rotate-180">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[80px]">
            <path d="M0,60 C150,100 350,20 500,60 C650,100 850,20 1000,60 C1150,100 1200,80 1200,80 L1200,120 L0,120 Z" fill="#faf1e1"></path>
          </svg>
        </div>
        <div className="pointer-events-none absolute left-1/2 top-[34%] h-[680px] w-[900px] -translate-x-1/2 rounded-full bg-[#738a43]/10 blur-[160px] z-0" />
        <div className="craftly-batik pointer-events-none absolute inset-y-0 right-0 w-[82%] opacity-[.06] z-0" />
        <div className="craftly-batik-fade pointer-events-none absolute inset-0 z-0" />
        <div className="relative z-10 grid grid-cols-1 gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:items-center px-6 sm:px-8 max-w-[1280px] mx-auto">
          <div className="relative z-10 order-2 max-w-3xl text-center lg:order-1 lg:text-left">
            <h1 className="mx-auto max-w-3xl text-[clamp(2.25rem,10vw,3.4rem)] font-black leading-[0.95] tracking-[-.055em] text-[#faf0d7] lg:mx-0 lg:text-[clamp(3.5rem,6vw,5.5rem)] lg:leading-[0.92] lg:tracking-[-.065em]">
              <span className="text-[#8fa360]">Dampak yang</span>
              <span className="block text-[#dca11d]">Berputar.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-base font-medium leading-relaxed text-white/80 sm:text-lg lg:mx-0 lg:mt-8 lg:text-xl text-justify">
              Seluruh inisiatif kami bergerak dalam siklus melingkar yang saling menghidupi. Pembelajaran melahirkan kepedulian lingkungan, petualangan membentuk ketangguhan jiwa, dan kemandirian ekonomi keluarga diputar kembali untuk menyokong pendidikan generasi berikutnya.
            </p>
          </div>

          <div
            id="product"
            className="relative z-10 order-1 mt-0 min-w-0 w-full lg:order-2"
          >

            <div
              className="craftly-carousel-stage relative h-[300px] cursor-grab touch-none select-none overflow-visible active:cursor-grabbing [perspective:700px] md:h-[520px] md:[perspective:1150px]"
              onPointerDown={startCarouselDrag}
              onPointerMove={moveCarousel}
              onPointerUp={stopCarouselDrag}
              onPointerCancel={stopCarouselDrag}
            >
              <div className="pointer-events-none absolute left-1/2 top-[46%] h-[74px] w-[228px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/[.07] md:h-[184px] md:w-[520px]" />
              <div
                ref={carouselRef}
                className="craftly-carousel-orbit absolute left-1/2 top-[46%] h-[160px] w-[120px] [transform-style:preserve-3d] md:h-[238px] md:w-[174px]"
                style={{ transform: `translate(-50%, -50%) rotateY(${rotationAngle}deg)` }}
              >
                {productFrames.map(
                  (
                    {
                      label,
                      title,
                      accent,
                      image,
                      y,
                      tilt,
                      scale,
                    },
                    index,
                  ) => (
                    <article
                      key={title}
                      className="absolute inset-0 overflow-hidden rounded-[.45rem] bg-transparent p-2 shadow-[0_22px_50px_rgba(0,0,0,.28)] [backface-visibility:visible] [transform-style:preserve-3d] md:rounded-[.8rem] md:p-4"
                      style={{
                        "--card-angle": `${index * 45}deg`,
                        "--card-y": `${y}px`,
                        "--card-y-mobile": `${y * 0.45}px`,
                        "--card-tilt": `${tilt}deg`,
                        "--card-scale": scale,
                        backgroundImage: image
                          ? `linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.12) 60%, rgba(0,0,0,0.55) 100%), url("${image}")`
                          : `linear-gradient(155deg, ${accent}38, rgba(35,27,24,.92) 72%)`,
                      }}
                    >
                      <div className="absolute bottom-2 left-2 right-2 flex flex-col items-start text-left md:bottom-4 md:left-4 md:right-4">
                        <span className="font-mono text-[6px] font-bold uppercase tracking-[.12em] text-[#faf0d7]/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] md:text-[8px]">
                          {label}
                        </span>
                        <span className="mt-0.5 text-[9px] font-extrabold leading-tight text-[#dca11d] drop-shadow-[0_2px_3px_rgba(0,0,0,0.95)] md:mt-1 md:text-[12px]">
                          {title}
                        </span>
                      </div>
                    </article>
                  ),
                )}
              </div>

              <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-center md:block">
                <p className="text-xs font-black text-[#faf0d7]">
                  Geser untuk menjelajahi pilar program.
                </p>
                <p className="mt-1 text-[10px] text-white/35">
                  Berputar otomatis · Diperbarui real-time
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
