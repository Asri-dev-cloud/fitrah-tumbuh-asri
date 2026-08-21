import Hero from '../Hero'
import Ecosystem from '../Ecosystem'
import Impact from '../Impact'

export default function HomePage({ navigate }) {
  return (
    <>
      <Hero navigate={navigate} />

      {/* SECTION 2 — PILIH KEBUTUHAN ANDA */}
      <section className="needs-section">
        <style>{`
          .needs-section {
            padding: 80px 16px;
            background-color: var(--color-brand-cream, #fbf9f4);
            text-align: center;
          }
          .needs-section h2 {
            font-size: 30px;
            font-weight: 800;
            color: var(--color-brand-brown, #5c3810);
            margin-bottom: 8px;
            letter-spacing: -0.02em;
          }
          .needs-section p.subtitle {
            color: var(--color-brand-muted, #6e645e);
            font-size: 15px;
            margin-bottom: 40px;
          }
          .needs-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 24px;
            max-width: 1200px;
            margin: 0 auto;
          }
          .need-card {
            background: #ffffff;
            border: 1px solid rgba(92, 56, 16, 0.06);
            border-radius: 20px;
            padding: 36px 24px;
            box-shadow: 0 10px 30px rgba(92, 56, 16, 0.02);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .need-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(92, 56, 16, 0.08);
            border-color: rgba(92, 56, 16, 0.15);
          }
          .need-icon-svg {
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(92, 56, 16, 0.04);
            width: 72px;
            height: 72px;
            border-radius: 50%;
            color: var(--color-brand-brown, #5c3810);
            transition: all 0.3s ease;
          }
          .need-card:hover .need-icon-svg {
            background: var(--color-brand-brown, #5c3810);
            color: #ffffff;
            transform: scale(1.05);
          }
          .need-card h3 {
            font-size: 18px;
            font-weight: 800;
            color: var(--color-brand-brown, #5c3810);
            margin-bottom: 10px;
          }
          .need-card p {
            font-size: 13.5px;
            color: var(--color-brand-muted, #6e645e);
            line-height: 1.6;
            margin-bottom: 24px;
            flex-grow: 1;
          }
        `}</style>
        
        <h2>Pilih Kebutuhan Anda</h2>
        <p className="subtitle">Temukan ekosistem belajar dan instrumen yang tepat sesuai tahap bertumbuh Anda.</p>
        
        <div className="needs-grid">
          <div className="need-card">
            <div className="need-icon-svg">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="9" cy="13" r="1.5"/><circle cx="15" cy="13" r="1.5"/><path d="M9 17c.5.5 1.5 1 3 1s2.5-.5 3-1"/></svg>
            </div>
            <h3>Orangtua</h3>
            <p>Temani anak bertumbuh sesuai potensinya.</p>
            <button onClick={() => navigate('produk')} className="button button-small" style={{ width: '100%' }}>
              Explore
            </button>
          </div>

          <div className="need-card">
            <div className="need-icon-svg">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12M12 12a5 5 0 0 1 5-5h3M12 12a5 5 0 0 0-5-5H4M20 7c0-2-2-4-5-4S12 5 12 7M4 7c0-2 2-4 5-4s3 2 3 4"/></svg>
            </div>
            <h3>Pemuda</h3>
            <p>Temukan potensi, bangun skill, mulai berkarya.</p>
            <button onClick={() => navigate('talent-mapping')} className="button button-small" style={{ width: '100%' }}>
              Explore
            </button>
          </div>

          <div className="need-card">
            <div className="need-icon-svg">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            </div>
            <h3>Pekerja</h3>
            <p>Temukan arah, kembangkan kapasitas.</p>
            <button onClick={() => navigate('kelas')} className="button button-small" style={{ width: '100%' }}>
              Explore
            </button>
          </div>

          <div className="need-card">
            <div className="need-icon-svg">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3>Organisasi</h3>
            <p>Bangun program yang berdampak.</p>
            <button onClick={() => navigate('services')} className="button button-small" style={{ width: '100%' }}>
              Explore
            </button>
          </div>
        </div>
      </section>

      {/* SECTION APA YANG BISA ANDA DAPATKAN? */}
      <section className="offerings-section">
        <style>{`
          .offerings-section {
            padding: 80px 16px;
            background-color: #ffffff;
            text-align: center;
            border-top: 1px solid rgba(92, 56, 16, 0.05);
          }
          .offerings-section h2 {
            font-size: 30px;
            font-weight: 800;
            color: var(--color-brand-brown, #5c3810);
            margin-bottom: 8px;
            letter-spacing: -0.02em;
          }
          .offerings-section p.subtitle {
            color: var(--color-brand-muted, #6e645e);
            font-size: 15px;
            margin-bottom: 45px;
          }
          .offerings-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 24px;
            max-width: 1200px;
            margin: 0 auto;
          }
          .offering-card {
            background: var(--color-brand-cream, #fbf9f4);
            border: 1px solid rgba(92, 56, 16, 0.05);
            border-radius: 24px;
            padding: 40px 30px;
            text-align: left;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            flex-direction: column;
          }
          .offering-card:hover {
            background: #ffffff;
            border-color: rgba(92, 56, 16, 0.12);
            box-shadow: 0 15px 35px rgba(92, 56, 16, 0.06);
            transform: translateY(-4px);
          }
          .offering-badge {
            color: #ffffff;
            font-size: 10px;
            font-weight: 800;
            padding: 4px 10px;
            border-radius: 99px;
            align-self: flex-start;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 16px;
          }
          .offering-card.product .offering-badge { background: #738a43; }
          .offering-card.learning .offering-badge { background: var(--color-brand-yellow, #dca11d); color: var(--color-brand-dark, #231b18); }
          .offering-card.service .offering-badge { background: var(--color-brand-brown, #5c3810); }

          .offering-card h3 {
            font-size: 20px;
            font-weight: 800;
            color: var(--color-brand-dark, #231b18);
            margin-bottom: 12px;
          }
          .offering-card p {
            font-size: 14px;
            color: var(--color-brand-muted, #6e645e);
            line-height: 1.6;
            margin-bottom: 24px;
            flex-grow: 1;
          }
          .offering-link {
            color: var(--color-brand-brown, #5c3810);
            font-weight: 700;
            font-size: 14.5px;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: gap 0.2s;
            cursor: pointer;
            margin-top: auto;
          }
          .offering-link:hover {
            gap: 10px;
            color: var(--color-brand-yellow, #dca11d);
          }
        `}</style>
        
        <h2>Apa yang Bisa Anda Dapatkan?</h2>
        <p className="subtitle">Layanan terpadu kami untuk menunjang pertumbuhan pribadi, keluarga, dan lembaga Anda.</p>
        
        <div className="offerings-grid">
          <div className="offering-card product">
            <span className="offering-badge">Digital Product</span>
            <h3>Digital Product</h3>
            <p>Tools yang bisa langsung digunakan (Ebook, Worksheet, Kit Kegiatan).</p>
            <span onClick={() => navigate('produk')} className="offering-link">
              Explore Products <span>→</span>
            </span>
          </div>

          <div className="offering-card learning">
            <span className="offering-badge">Digital Learning</span>
            <h3>Digital Learning</h3>
            <p>Kelas dan mentoring praktis penemuan potensi diri, karir, dan pengasuhan anak.</p>
            <span onClick={() => navigate('kelas')} className="offering-link">
              Lihat Kelas <span>→</span>
            </span>
          </div>

          <div className="offering-card service">
            <span className="offering-badge">Project &amp; Consulting</span>
            <h3>Project &amp; Consulting</h3>
            <p>Pendampingan dan desain program terstruktur untuk sekolah, komunitas, dan organisasi.</p>
            <span onClick={() => navigate('services')} className="offering-link">
              Konsultasikan Project <span>→</span>
            </span>
          </div>
        </div>
      </section>

      <Ecosystem navigate={navigate} />
      <Impact />
    </>
  )
}
