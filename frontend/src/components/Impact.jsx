import { WHATSAPP_ADMIN } from '../utils/config'

const stats = [['10.000+', 'Peserta aktif'], ['5.000+', 'Pemuda terlatih'], ['100+', 'Sekolah mitra'], ['100+', 'UMKM binaan'], ['10+', 'Wilayah prioritas']]

export function ImpactRibbon() {
  const marqueeStats = [...stats, ...stats, ...stats]
  return (
    <div className="impact-ribbon">
      <div className="impact-ribbon-track">
        {marqueeStats.map(([n, l], index) => (
          <span key={`${l}-${index}`} className="impact-ribbon-wrapper">
            <span className="impact-ribbon-item">
              <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.65)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Target 2030</span>
              <strong>{n}</strong>
              <span>{l}</span>
            </span>
            <span className="impact-ribbon-separator">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Impact() {
  return (
    <section id="kontak" className="cta-section">
      <div>
        <h2>Mulai langkah baik<br />untuk masa depan.</h2>
      </div>
      <div>
        <p>Program, kemitraan, atau sekadar ingin berkenalan — tim kami siap menyambut Anda.</p>
        <a
          className="button"
          href={`https://wa.me/${WHATSAPP_ADMIN}?text=Halo%20Fitrah%20Tumbuh%2C%20saya%20tertarik%20untuk%20mengetahui%20lebih%20lanjut%20mengenai%20program%20belajar%20dan%20kegiatan%20di%20Fitrah%20Tumbuh.`}
          target="_blank"
          rel="noreferrer"
        >
          Hubungi via WhatsApp <span>↗</span>
        </a>
      </div>
    </section>
  )
}
