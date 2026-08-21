import { groupColors, groupDescriptions } from './data'
import PieChart from './PieChart'

export function CompletionMessage({ onShowAnalysis, onReset }) {
  return (
    <section className="talent-completion-message">
      <h2>Selamat — Anda telah menyelesaikan Talent Mapping!</h2>
      <p>Terima kasih sudah meluangkan waktu. Sekarang kami akan menampilkan ringkasan hasil Anda.</p>
      <div>
        <button className="primary-button" onClick={onShowAnalysis}>Lihat Analisis</button>
        <button className="secondary-button" onClick={onReset}>Ulangi</button>
      </div>
    </section>
  )
}

export default function Results({ analysis }) {
  return (
    <section className="talent-results">
      <div className="page-section-header">
        <p className="eyebrow"><span /> Hasil Analisis</p>
        <h2>Profil singkat berdasarkan jawaban Anda</h2>
      </div>
      <div className="talent-results-overview">
        <div className="talent-chart-card"><h3>Komposisi Potensi</h3><PieChart data={analysis.ranked} /></div>
        <div className="talent-result-list">
          {analysis.ranked.map(([group, score]) => (
            <article key={group}>
              <i style={{ backgroundColor: groupColors[group] }} />
              <div><h3>{group}</h3><p>{groupDescriptions[group]}</p><strong>Skor rata-rata: {score.toFixed(2)}</strong></div>
            </article>
          ))}
        </div>
      </div>
      <div className="talent-result-notes">
        <p>Inilah yang menandai dirimu:</p>
        <ul>
          <li>Fokus pada dua profil teratas untuk pengembangan diri.</li>
          <li>Gunakan hasil ini sebagai petunjuk awal, bukan diagnosis final.</li>
          <li>Untuk hasil lebih detail, pertimbangkan asesmen profesional.</li>
        </ul>
      </div>
    </section>
  )
}
