import { WHATSAPP_ADMIN } from '../utils/config'
import AboutPage from './pages/AboutPage'
import ProgramPage from './pages/ProgramPage'
import PortfolioPage from './pages/PortfolioPage'
import CollaborationPage from './pages/CollaborationPage'
import TalentMappingPage from './pages/TalentMappingPage'
import ProdukPage from './pages/ProdukPage'
import KelasPage from './pages/KelasPage'
import ServicesPage from './pages/ServicesPage'
import FreePage from './pages/FreePage'
import InsightPage from './pages/InsightPage'

const photos = {
  about: '/8.JPG',
  program: '/8.JPG',
  nature: '/8.JPG',
  people: '/8.JPG'
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
  program: {
    kicker: 'Program Fitrah Tumbuh',
    title: 'Ruang belajar yang<br /><i>hidup dan bermakna.</i>',
    desc: 'Program untuk anak, pemuda, keluarga, dan ibu rumah tangga yang menghubungkan pembelajaran dengan pengalaman nyata.',
    image: photos.program,
    labels: ['Calistung & Literasi', 'Belajar Bersama Alam', 'Healing Farm', 'Hiking & Family Camp', 'Magang Pemuda', 'Inkubasi UMKM'],
    section: 'Pilih program sesuai tahap tumbuh dan kebutuhan komunitas Anda.'
  },
  'talent-mapping': {
    kicker: 'Talent Mapping',
    title: 'Ayo kenali diri dan potensi Anda',
    desc: 'Temukan kecenderungan kemampuan lewat serangkaian pernyataan singkat. Hasil membantu mengenali kekuatan utama Anda.',
    image: photos.people,
    section: 'Mulai kenali diri dengan menjawab pernyataan di halaman Talent Mapping.'
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
  produk: {
    kicker: 'Digital Product',
    title: 'Media Belajar &<br /><i>Panduan Tumbuh.</i>',
    desc: 'Temukan ebook reflektif, worksheet ramah anak, toolkit, dan materi edukatif praktis untuk menunjang tumbuh kembang keluarga dan karir.',
    image: photos.program,
    labels: [],
    section: 'Jelajahi Produk Digital Kami'
  },
  kelas: {
    kicker: 'Digital Learning',
    title: 'Ruang Belajar &<br /><i>Kelas Interaktif.</i>',
    desc: 'Ikuti webinar, mini class 60-90 menit, workshop pengembangan diri, dan program mentoring bersama para fasilitator ahli.',
    image: photos.program,
    labels: [],
    section: 'Temukan Kelas Terjadwal'
  },
  services: {
    kicker: 'Project & Consulting',
    title: 'Desain Program &<br /><i>Kemitraan Strategis.</i>',
    desc: 'Kami merancang kurikulum sekolah berbasis alam, menyusun proposal, mengelola inkubasi UMKM, dan memberikan bimbingan proyek sosial.',
    image: photos.people,
    labels: [],
    section: 'Layanan Jasa & Konsultasi Kami'
  },
  free: {
    kicker: 'Free Resources',
    title: 'Lead Magnet &<br /><i>Resource Gratis.</i>',
    desc: 'Unduh kuesioner evaluasi mandiri (family check), panduan merancang proyek, dan worksheet mingguan secara gratis untuk memetakan pertumbuhan Anda.',
    image: photos.nature,
    labels: [],
    section: 'Dapatkan Akses Download Gratis'
  },
  insight: {
    kicker: 'Blog & Insight',
    title: 'Kredibilitas &<br /><i>Nalar Tumbuh.</i>',
    desc: 'Temukan perspektif, tulisan reflektif, dan artikel pengasuhan, pemuda, dan karir yang membangun kredibilitas pemikiran.',
    image: photos.about,
    labels: [],
    section: 'Jelajahi Artikel Terbaru'
  }
}

export default function InteriorPage({ page, navigate }) {
  const p = staticData[page] || staticData.program

  const renderSection = () => {
    if (page === 'tentang-kami') return <AboutPage />
    if (page === 'program') return <ProgramPage />
    if (page === 'talent-mapping') return <TalentMappingPage />
    if (page === 'portofolio') return <PortfolioPage navigate={navigate} />
    if (page === 'kolaborasi') return <CollaborationPage />
    if (page === 'produk') return <ProdukPage navigate={navigate} />
    if (page === 'kelas') return <KelasPage navigate={navigate} />
    if (page === 'services') return <ServicesPage navigate={navigate} />
    if (page === 'free') return <FreePage navigate={navigate} />
    if (page === 'insight') return <InsightPage navigate={navigate} />

    return (
      <section className="content-section">
        <p className="eyebrow"><span></span> Jelajahi</p>
        <h2>{p.section}</h2>

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
      </section>
    )
  }

  return (
    <section className="inside-page animate-fadeIn">
      {/* Page Hero */}
      {page !== 'talent-mapping' && (
        <div className="inside-hero">
          <img className="inside-photo" src={p.image} alt="Kegiatan Fitrah Tumbuh" />
          <div className="inside-photo-overlay"></div>
          <div className="inside-copy">
            <p className="eyebrow"><span></span>{p.kicker}</p>
            <h1 dangerouslySetInnerHTML={{ __html: p.title }}></h1>
            <p>{p.desc}</p>
            <a
              className="button"
              href={`https://wa.me/${WHATSAPP_ADMIN}?text=Halo%20Fitrah%20Tumbuh%2C%20saya%20tertarik%20untuk%20mengetahui%20lebih%20lanjut%20mengenai%20program%20belajar%20dan%20kegiatan%20di%20Fitrah%20Tumbuh.`}
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

      {/* Page Footer Navigation removed per request */}
    </section>
  )
}
