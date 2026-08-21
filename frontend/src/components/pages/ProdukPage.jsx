import { useState, useEffect } from 'react'
import { trackFormSubmit, trackPurchaseClick } from '../../utils/analytics'

const API_BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:5000'
const WHATSAPP_ADMIN = '6285156916211'

const FALLBACK_PRODUCTS = [
  {
    id: 1,
    title: "Family Growth Toolkit",
    description: "Kumpulan aktivitas kreatif dan instrumen reflektif mingguan untuk membangun bonding dan kebiasaan baik dalam keluarga.",
    price: "Rp 35.000",
    image_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
    type: "digital_product",
    target_audience: "Orangtua",
    whatsapp_text: "Halo Fitrah Tumbuh, saya ingin memesan Family Growth Toolkit.",
    is_free: false
  },
  {
    id: 2,
    title: "Career Reset Workbook",
    description: "Modul refleksi mendalam bagi pekerja untuk menata ulang arah karir yang selaras dengan passion dan fitrah kepribadian.",
    price: "Rp 45.000",
    image_url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80",
    type: "digital_product",
    target_audience: "Pekerja",
    whatsapp_text: "Halo Fitrah Tumbuh, saya ingin memesan Career Reset Workbook.",
    is_free: false
  },
  {
    id: 3,
    title: "Youth Project Starter Kit",
    description: "Panduan taktis bagi pemuda untuk merancang, mengelola, dan meluncurkan proyek sosial atau bisnis mikro pertamanya.",
    price: "Rp 69.000",
    image_url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Fitrah Tumbuh, saya ingin memesan Youth Project Starter Kit.",
    is_free: false
  },
  {
    id: 4,
    title: "Fitrah Family Activity Cards",
    description: "Kartu permainan seru bertema alam dan reflektif untuk memeriahkan piknik atau akhir pekan keluarga.",
    price: "Rp 59.000",
    image_url: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80",
    type: "digital_product",
    target_audience: "Orangtua",
    whatsapp_text: "Halo Fitrah Tumbuh, saya ingin memesan Fitrah Family Activity Cards.",
    is_free: false
  }
]

export default function ProdukPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [audienceFilter, setAudienceFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Modal checkout
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', notes: '' })
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/store-items`)
        if (!response.ok) throw new Error()
        const data = await response.json()
        // Filter only digital products
        const filtered = data.filter(item => item.type === 'digital_product')
        setProducts(filtered.length > 0 ? filtered : FALLBACK_PRODUCTS)
      } catch (error) {
        console.warn('Fallback to static products:', error)
        setProducts(FALLBACK_PRODUCTS)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleOpenCheckout = (product) => {
    setSelectedProduct(product)
    setFormData({ name: '', email: '', whatsapp: '', notes: '' })
    setFormError('')
    setOrderSuccess(null)
    trackPurchaseClick(product.title, product.price)
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleOrderSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.whatsapp.trim()) {
      setFormError('Harap lengkapi nama, email, dan WhatsApp.')
      return
    }

    setIsSubmitting(true)
    setFormError('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          whatsapp: formData.whatsapp.trim(),
          product_id: selectedProduct.id,
          product_title: selectedProduct.title,
          notes: formData.notes.trim(),
          category: selectedProduct.target_audience
        })
      })

      if (!response.ok) throw new Error()
      const waMessage = `Saya tertarik dengan ${selectedProduct.title}.\n\nData Pembeli:\n- Nama: ${formData.name.trim()}\n- Email: ${formData.email.trim()}\n- WhatsApp: ${formData.whatsapp.trim()}\n- Catatan: ${formData.notes.trim() || '-'}`
      const waUrl = `https://wa.me/${WHATSAPP_ADMIN}?text=${encodeURIComponent(waMessage)}`

      setOrderSuccess({
        whatsappUrl: waUrl,
        downloadLink: selectedProduct.is_free ? selectedProduct.download_link : null
      })
      trackFormSubmit(selectedProduct.is_free ? 'Download Resource Gratis' : 'Pembelian Produk', selectedProduct.title)
    } catch {
      setFormError('Gagal menyimpan pesanan. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDirectWAQuery = (product) => {
    const waMessage = `Saya tertarik dengan ${product.title}.`
    window.open(`https://wa.me/${WHATSAPP_ADMIN}?text=${encodeURIComponent(waMessage)}`, '_blank')
  }

  // Filter & Search
  const filteredProducts = products.filter(p => {
    const matchesAudience = audienceFilter === 'all' || p.target_audience === audienceFilter
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesAudience && matchesSearch
  })

  return (
    <div className="storefront-wrapper">
      <style>{`
        /* Reuse storefront CSS variables and visual framework */
        .prod-grid-controls {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 36px;
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(8px);
          padding: 24px;
          border-radius: 20px;
          border: 1px solid rgba(92, 56, 16, 0.06);
        }
        .audience-labels {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
      `}</style>

      {/* Filter & Search Controls */}
      <div className="prod-grid-controls">
        <div className="search-box-wrap">
          <svg className="search-icon-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Cari Ebook, Worksheet, Toolkit, Template, Game..." 
            className="store-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-column">
          <span className="filter-label">Filter Berdasarkan Kebutuhan</span>
          <div className="audience-labels">
            <button onClick={() => setAudienceFilter('all')} className={`filter-btn ${audienceFilter === 'all' ? 'active' : ''}`}>Semua</button>
            <button onClick={() => setAudienceFilter('Orangtua')} className={`filter-btn ${audienceFilter === 'Orangtua' ? 'active' : ''}`}>Orangtua (Parenting/Worksheet)</button>
            <button onClick={() => setAudienceFilter('Pemuda')} className={`filter-btn ${audienceFilter === 'Pemuda' ? 'active' : ''}`}>Pemuda (Talent/Project)</button>
            <button onClick={() => setAudienceFilter('Pekerja')} className={`filter-btn ${audienceFilter === 'Pekerja' ? 'active' : ''}`}>Pekerja (Career Growth)</button>
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      {loading ? (
        <p style={{ textAlign: 'center', color: 'var(--color-brand-brown)' }}>Memuat produk digital...</p>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-state">
          <h3>Tidak ada produk digital</h3>
          <p>Ubah kata kunci pencarian atau pilih kategori lain.</p>
        </div>
      ) : (
        <div className="catalog-grid">
          {filteredProducts.map(p => (
            <article className="catalog-card" key={p.id}>
              <div className="catalog-img-box">
                <img src={p.image_url || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80'} alt={p.title} />
                <div className="catalog-badge-row">
                  <span className="catalog-badge type-badge">{p.is_free ? 'Free Resource' : 'Digital Product'}</span>
                  <span className="catalog-badge audience-badge">{p.target_audience}</span>
                </div>
              </div>
              <div className="catalog-info">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="catalog-footer-row">
                  <span className={`price-tag ${p.is_free ? 'free-price' : ''}`}>{p.is_free ? 'GRATIS' : p.price}</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleDirectWAQuery(p)} className="secondary-button button-small">
                      Tanya WA
                    </button>
                    <button onClick={() => handleOpenCheckout(p)} className="button button-small">
                      {p.is_free ? 'Download ↗' : 'Beli Sekarang ↗'}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Lead Capture Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>{selectedProduct.is_free ? 'Unduh File Gratis' : 'Formulir Pembelian'}</h2>
                <p style={{ fontSize: '13px', color: 'var(--color-brand-muted)' }}>{selectedProduct.title}</p>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedProduct(null)}>✕</button>
            </div>
            <div className="modal-body">
              {orderSuccess ? (
                <div className="modal-success-box">
                  <div className="success-circle">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                   <h3>Pemesanan Berhasil Dicatat!</h3>
                   {selectedProduct.is_free ? (
                     <p style={{ fontSize: '14.5px', color: 'var(--color-brand-muted)', lineHeight: 1.5 }}>
                       Terima kasih! File resource gratis dapat langsung diunduh melalui tombol di bawah.
                     </p>
                   ) : (
                     <div style={{ textAlign: 'left', background: 'var(--color-brand-cream, #fbf9f4)', border: '1px solid rgba(92, 56, 16, 0.1)', borderRadius: '12px', padding: '16px', margin: '12px 0', width: '100%' }}>
                       <h4 style={{ color: 'var(--color-brand-brown)', fontSize: '14px', fontWeight: 800, marginBottom: '8px' }}>💳 Instruksi Pembayaran (Transfer Bank)</h4>
                       <p style={{ fontSize: '13px', color: 'var(--color-brand-dark)', lineHeight: 1.5, marginBottom: '6px' }}>
                         Silakan transfer sebesar <strong>{selectedProduct.price}</strong> ke rekening resmi kami:
                       </p>
                       <p style={{ fontSize: '14px', color: 'var(--color-brand-dark)', fontWeight: 700, margin: '4px 0', fontFamily: 'monospace' }}>
                         Bank Mandiri: 130-00-1234-5678 <br/>
                         a.n. Fitrah Tumbuh Asri
                       </p>
                       <p style={{ fontSize: '12px', color: 'var(--color-brand-muted)', marginTop: '8px' }}>
                         Setelah transfer, klik tombol di bawah untuk mengirimkan bukti pembayaran via WhatsApp. Admin akan memverifikasi dan mengirimkan berkas produk digital Anda secara manual.
                       </p>
                     </div>
                   )}
                  <div className="success-actions-vertical">
                    {orderSuccess.downloadLink && (
                      <a href={orderSuccess.downloadLink} target="_blank" rel="noreferrer" className="button" style={{ backgroundColor: '#738a43' }}>
                        📂 Buka / Download PDF
                      </a>
                    )}
                    <a href={orderSuccess.whatsappUrl} target="_blank" rel="noreferrer" className="button">
                      💬 Hubungi WhatsApp Admin (Konfirmasi)
                    </a>
                    <button onClick={() => setSelectedProduct(null)} className="secondary-button">Tutup</button>
                  </div>
                </div>
              ) : (
                <form className="modal-form" onSubmit={handleOrderSubmit}>
                  <div className="modal-field">
                    <label>Nama Lengkap*</label>
                    <input name="name" type="text" className="modal-input" required placeholder="Nama Lengkap Anda" value={formData.name} onChange={handleFormChange} />
                  </div>
                  <div className="modal-field">
                    <label>Alamat Email*</label>
                    <input name="email" type="email" className="modal-input" required placeholder="nama@email.com" value={formData.email} onChange={handleFormChange} />
                  </div>
                  <div className="modal-field">
                    <label>Nomor WhatsApp*</label>
                    <input name="whatsapp" type="tel" className="modal-input" required placeholder="Contoh: 08123456789" value={formData.whatsapp} onChange={handleFormChange} />
                  </div>
                  <div className="modal-field">
                    <label>Catatan atau Pertanyaan (Opsional)</label>
                    <textarea name="notes" rows="3" className="modal-textarea" placeholder="Tulis instruksi khusus jika ada..." value={formData.notes} onChange={handleFormChange} />
                  </div>
                  {formError && <div className="modal-error">{formError}</div>}
                  <div className="modal-actions">
                    <button type="button" className="secondary-button" onClick={() => setSelectedProduct(null)} disabled={isSubmitting}>Batal</button>
                    <button type="submit" className="button" disabled={isSubmitting}>
                      {isSubmitting ? 'Memproses...' : selectedProduct.is_free ? 'Dapatkan File ↗' : 'Lanjutkan Pembelian ↗'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
