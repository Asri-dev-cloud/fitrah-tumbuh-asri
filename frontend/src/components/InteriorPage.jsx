import { useState, useEffect } from 'react'
import AboutPage from './pages/AboutPage'
import PhilosophyPage from './pages/PhilosophyPage'
import ProgramPage from './pages/ProgramPage'
import EducationPage from './pages/EducationPage'
import PortfolioPage from './pages/PortfolioPage'
import CollaborationPage from './pages/CollaborationPage'
const photos = {
  about: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1400&q=85',
  program: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=85',
  nature: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=1400&q=85',
  people: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=85'
}

const staticData = {
  'tentang-kami': {
    kicker: 'Tentang Kami',
    title: 'Dari ruang belajar,<br /><i>untuk kehidupan.</i>',
    desc: 'Fitrah Tumbuh adalah social enterprise yang menumbuhkan manusia melalui pendidikan berbasis potensi, kedekatan dengan alam, dan kolaborasi komunitas.',
    image: photos.about,
    labels: ['Sejarah Schole Fitrah', 'Visi & Misi', 'Wilayah Bandung–Sumedang'],
    section: 'Jejak kami dimulai dari keyakinan sederhana: setiap manusia hadir dengan potensi yang layak ditemukan.'
  },
  filosofi: {
    kicker: 'Filosofi Fitrah',
    title: 'Setiap anak tumbuh<br /><i>dengan caranya sendiri.</i>',
    desc: 'Kami memandang pendidikan sebagai proses menemani anak mengenali fitrahnya—akal, rasa, tubuh, dan kontribusinya bagi sesama.',
    image: photos.nature,
    labels: ['Fitrah Keimanan', 'Fitrah Belajar', 'Fitrah Bakat'],
    section: 'Pendidikan yang baik tidak menyeragamkan jalan, melainkan membantu tiap anak menemukan pijakannya.'
  },
  program: {
    kicker: 'Program Fitrah Tumbuh',
    title: 'Ruang belajar yang<br /><i>hidup dan bermakna.</i>',
    desc: 'Program untuk anak, pemuda, keluarga, dan ibu rumah tangga yang menghubungkan pembelajaran dengan pengalaman nyata.',
    image: photos.program,
    labels: ['Calistung & Literasi', 'Belajar Bersama Alam', 'Healing Farm', 'Hiking & Family Camp', 'Magang Pemuda', 'Inkubasi UMKM'],
    section: 'Pilih program sesuai tahap tumbuh dan kebutuhan komunitas Anda.'
  },
  edukasi: {
    kicker: 'Pusat Edukasi',
    title: 'Belajar bisa dimulai<br /><i>dari mana saja.</i>',
    desc: 'Koleksi sumber belajar untuk keluarga, pendidik, dan komunitas yang ingin bertumbuh secara sadar.',
    image: photos.program,
    section: 'Materi praktis yang bisa dibaca, ditonton, dan digunakan kembali di rumah maupun ruang belajar.'
  },
  portofolio: {
    kicker: 'Portofolio Program',
    title: 'Dampak yang tumbuh<br /><i>bersama komunitas.</i>',
    desc: 'Dokumentasi program yang memperlihatkan proses, capaian, dan suara orang-orang yang bergerak bersama Fitrah Tumbuh.',
    image: photos.nature,
    labels: ['Dokumentasi Foto', 'Video Kegiatan', 'Dampak Program', 'Testimoni', 'Statistik Program'],
    section: 'Bukan hanya angka—di balik setiap capaian ada keluarga, sekolah, dan komunitas yang bertumbuh.'
  },
  kolaborasi: {
    kicker: 'Mitra Pentahelix',
    title: 'Kebaikan tumbuh lebih jauh<br /><i>saat dikerjakan bersama.</i>',
    desc: 'Kami berkolaborasi dengan sekolah, pemerintah, komunitas, dunia usaha, dan media untuk membangun dampak yang berkelanjutan.',
    image: photos.people,
    labels: ['Logo Mitra', 'Bentuk Kerja Sama', 'Dokumentasi', 'Capaian Program', 'Impact Story'],
    section: 'Ruang kolaborasi terbuka bagi setiap pihak yang ingin menghadirkan pendidikan yang membumi.'
  },
  dampak: {
    kicker: 'Dashboard Dampak',
    title: 'Mengukur yang tumbuh,<br /><i>merayakan yang berarti.</i>',
    desc: 'Gambaran dampak Fitrah Tumbuh dari program, kolaborasi, dan gerakan yang kami jalankan bersama.',
    image: photos.about,
    section: 'Data dampak terkini Fitrah Tumbuh, diperbarui secara real-time melalui area admin.'
  },
  daftar: {
    kicker: 'Pendaftaran Kolaborasi',
    title: 'Langkah baik dimulai<br /><i>dari kolaborasi nyata.</i>',
    desc: 'Pilih peran Anda dan isi detail formulir untuk mulai tumbuh dan bergerak bersama kami.',
    image: photos.people,
    section: 'Formulir Kemitraan & Registrasi'
  }
}



export default function InteriorPage({ page, navigate }) {
  const p = staticData[page] || staticData.program

  const [stats, setStats] = useState([])
  const [education, setEducation] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (page === 'dampak') {
      setLoading(true)
      fetch('http://localhost:5000/api/stats')
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(err => console.log('Error loading stats:', err))
        .finally(() => setLoading(false))
    } else if (page === 'edukasi') {
      setLoading(true)
      fetch('http://localhost:5000/api/education')
        .then(res => res.json())
        .then(data => setEducation(data))
        .catch(err => console.log('Error loading education:', err))
        .finally(() => setLoading(false))
    }
  }, [page])

  // Helper for backend media URLs
  const renderSection = () => {
    if (page === 'tentang-kami') return <AboutPage />
    if (page === 'filosofi') return <PhilosophyPage />
    if (page === 'program') return <ProgramPage />
    if (page === 'edukasi') return <EducationPage />
    if (page === 'portofolio') return <PortfolioPage />
    if (page === 'kolaborasi') return <CollaborationPage />

    return (
      <section className={page === 'dampak' ? 'content-section impact-dashboard' : 'content-section'}>
        <p className="eyebrow"><span></span> Jelajahi</p>
        <h2>{p.section}</h2>

        {loading && (
          <div className="flex justify-center p-12 text-[#738a43]">
            <p className="animate-pulse font-medium">Memuat data terbaru...</p>
          </div>
        )}

        {!loading && page === 'dampak' && (
          <div className="content-grid">
            {stats.length > 0 ? (
              stats.map((s, index) => (
                <article key={s.id}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{s.value}</h3>
                  <p>{s.label}</p>
                </article>
              ))
            ) : (
              ['1.240 Peserta', '48 Sekolah Mitra', '12 Program Berjalan', '7 Kota/Kabupaten', '116 Relawan', '186 Total Kegiatan'].map((item, index) => (
                <article key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.split(' ')[0]}</h3>
                  <p>{item.split(' ').slice(1).join(' ')}</p>
                </article>
              ))
            )}
          </div>
        )}

        {!loading && page !== 'dampak' && page !== 'daftar' && (
          <div className="content-grid">
            {p.labels?.map((label, index) => (
              <article key={label}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{label}</h3>
                <p>Temukan cerita dan informasi selengkapnya.</p>
                <b>→</b>
              </article>
            ))}
          </div>
        )}
      </section>
    )
  }

  return (
    <section className={`inside-page animate-fadeIn ${page === 'daftar' ? 'daftar-page' : ''}`}>
      {/* Page Hero */}
      {page !== 'daftar' && (
        <div className="inside-hero">
          <img className="inside-photo" src={p.image} alt="Kegiatan Fitrah Tumbuh" />
          <div className="inside-photo-overlay"></div>
          <div className="inside-copy">
            <p className="eyebrow"><span></span>{p.kicker}</p>
            <h1 dangerouslySetInnerHTML={{ __html: p.title }}></h1>
            <p>{p.desc}</p>
            <a
              className="button"
              href="https://wa.me/6285156916211?text=Halo%20Fitrah%20Tumbuh%2C%20saya%20tertarik%20untuk%20mengetahui%20lebih%20lanjut%20mengenai%20program%20belajar%20dan%20kegiatan%20di%20Fitrah%20Tumbuh."
              target="_blank"
              rel="noreferrer"
            >
              Hubungi kami <span>↗</span>
            </a>
          </div>
        </div>
      )}

      {/* Dynamic / Static Content Section */}
      {renderSection()}

      {/* Page Footer Navigation */}
      <section className="inside-bottom">
        <p className="eyebrow"><span></span> Fitrah Tumbuh</p>
        <h2>Hal baik selalu dimulai<br />dari langkah yang dekat.</h2>
        <button className="text-button" onClick={() => navigate('beranda')}>← Kembali ke beranda</button>
      </section>
    </section>
  )
}
