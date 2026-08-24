import { useState, useEffect } from 'react'
import { 
  Package, 
  Users, 
  Handshake, 
  Award, 
  LogOut, 
  ArrowLeft, 
  Plus, 
  Download, 
  ExternalLink, 
  Pencil, 
  Trash2, 
  X, 
  FileText, 
  Lock
} from 'lucide-react'

const API_BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

export default function AdminDashboard({ navigate }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!sessionStorage.getItem('adminToken'))
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [activeTab, setActiveTab] = useState('store')
  
  // Data States
  const [storeItems, setStoreItems] = useState([])
  const [orders, setOrders] = useState([])
  const [registrations, setRegistrations] = useState([])
  const [talentParticipants, setTalentParticipants] = useState([])
  
  // UI States
  const [loading, setLoading] = useState(false)
  const [editingItem, setEditingItem] = useState(null) // null = not editing/adding, 'new' = adding, {object} = editing
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', image_url: '',
    type: 'digital_product', target_audience: 'Orangtua',
    whatsapp_text: '', download_link: '', is_free: false,
    speaker: '', class_date: '', class_time: '', quota: 0
  })
  const [crudError, setCrudError] = useState('')

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken')
    setIsAuthenticated(false)
    setPassword('')
  }

  const getHeaders = () => {
    const token = sessionStorage.getItem('adminToken')
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const headers = getHeaders()
      
      const [resStore, resOrders, resRegs, resTalent] = await Promise.all([
        fetch(`${API_BASE_URL}/api/store-items`),
        fetch(`${API_BASE_URL}/api/orders`, { headers }).catch(() => ({ ok: false, json: () => [] })),
        fetch(`${API_BASE_URL}/api/registrations`, { headers }).catch(() => ({ ok: false, json: () => [] })),
        fetch(`${API_BASE_URL}/api/talent-participants`, { headers }).catch(() => ({ ok: false, json: () => [] }))
      ])

      if (resStore && resStore.ok) {
        const data = await resStore.json()
        setStoreItems(data)
      }
      if (resOrders && resOrders.ok) {
        const data = await resOrders.json()
        setOrders(data)
      }
      if (resRegs && resRegs.ok) {
        const data = await resRegs.json()
        setRegistrations(data)
      }
      if (resTalent && resTalent.ok) {
        const data = await resTalent.json()
        setTalentParticipants(data)
      }
    } catch (err) {
      console.error('Fetch admin data failed:', err)
      if (err && err.status === 401) {
        handleLogout()
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        fetchData()
      }, 0)
      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, activeTab])

  const exportToCSV = (data, filename = 'export.csv') => {
    if (!data || data.length === 0) return

    let headers = []
    let rows = []

    const firstItem = data[0]
    const isOrders = 'product_title' in firstItem && 'whatsapp' in firstItem
    const isRegistrations = 'cooperation_type' in firstItem && 'institution' in firstItem
    const isTalent = 'answers' in firstItem && 'age' in firstItem

    if (isOrders) {
      headers = [
        'ID', 'Tanggal', 'Nama Lengkap', 'Email', 'WhatsApp', 
        'Segmen/Kategori', 'Peminatan (Produk/Kelas)', 'Sumber', 
        'Lembaga/Instansi', 'Waktu Pelaksanaan', 'Catatan Kebutuhan', 'Status'
      ]
      rows = data.map(item => [
        item.id,
        formatDate(item.created_at),
        item.name,
        item.email || '-',
        item.whatsapp,
        item.segment || item.category || 'Umum',
        item.product_title || item.interest || '-',
        item.source || item.source_info || 'Website',
        item.institution || '-',
        item.execution_time || '-',
        item.notes || '-',
        item.status || 'Lead'
      ])
    } else if (isRegistrations) {
      headers = [
        'ID', 'Tanggal', 'Nama Lengkap', 'Email', 'WhatsApp', 
        'Lembaga/Instansi', 'Jenis Kemitraan', 'Catatan Pesan'
      ]
      rows = data.map(item => [
        item.id,
        formatDate(item.created_at),
        item.name,
        item.email || '-',
        item.whatsapp,
        item.institution || '-',
        item.cooperation_type || '-',
        item.message || '-'
      ])
    } else if (isTalent) {
      headers = [
        'ID', 'Tanggal', 'Nama Lengkap', 'Usia', 'Lembaga/Instansi', 
        'Status Asesmen', 'Jawaban Detail'
      ]
      rows = data.map(item => {
        let status = 'Baru Isi Form'
        let detail = '-'
        if (item.answers) {
          status = 'Asesmen Selesai'
          detail = typeof item.answers === 'object' ? JSON.stringify(item.answers) : item.answers
        }
        return [
          item.id,
          formatDate(item.created_at),
          item.name,
          item.age ? `${item.age} Tahun` : '-',
          item.institution || '-',
          status,
          detail
        ]
      })
    } else {
      headers = Object.keys(firstItem)
      rows = data.map(item => headers.map(key => {
        const val = item[key]
        if (val === null || val === undefined) return ''
        if (typeof val === 'object') return JSON.stringify(val)
        return val
      }))
    }

    const csvContent = [
      headers.join(';'),
      ...rows.map(row => row.map(val => {
        let str = String(val === null || val === undefined ? '' : val)
        str = str.replace(/"/g, '""')
        if (str.search(/("|\;|\n|\r)/g) >= 0) {
          str = `"${str}"`
        }
        return str
      }).join(';'))
    ].join('\r\n')

    const BOM = '\uFEFF'
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }


  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      const data = await res.json()
      if (data.success) {
        sessionStorage.setItem('adminToken', data.token)
        setIsAuthenticated(true)
      } else {
        setLoginError(data.message || 'Kata sandi salah.')
      }
    } catch {
      setLoginError('Terjadi kesalahan koneksi ke server backend.')
    }
  }



  // CRUD Operations
  const handleOpenAdd = () => {
    setEditingItem('new')
    setFormData({
      title: '', description: '', price: '', image_url: '',
      type: 'digital_product', target_audience: 'Orangtua',
      whatsapp_text: '', download_link: '', is_free: false,
      speaker: '', class_date: '', class_time: '', quota: 0
    })
    setCrudError('')
  }

  const handleOpenEdit = (item) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description,
      price: item.price,
      image_url: item.image_url,
      type: item.type,
      target_audience: item.target_audience,
      whatsapp_text: item.whatsapp_text || '',
      download_link: item.download_link || '',
      is_free: item.is_free,
      speaker: item.speaker || '',
      class_date: item.class_date || '',
      class_time: item.class_time || '',
      quota: item.quota || 0
    })
    setCrudError('')
  }

  const handleCrudSubmit = async (e) => {
    e.preventDefault()
    setCrudError('')
    const method = editingItem === 'new' ? 'POST' : 'PUT'
    const url = editingItem === 'new' 
      ? `${API_BASE_URL}/api/store-items`
      : `${API_BASE_URL}/api/store-items/${editingItem.id}`

    try {
      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(formData)
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Gagal menyimpan perubahan.')
      }

      setEditingItem(null)
      fetchData()
    } catch (err) {
      setCrudError(err.message || 'Terjadi kesalahan saat menghubungi server.')
    }
  }

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) return
    try {
      const res = await fetch(`${API_BASE_URL}/api/store-items/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      })
      if (!res.ok) throw new Error()
      fetchData()
    } catch {
      alert('Gagal menghapus produk.')
    }
  }

  const formatDate = (isoString) => {
    if (!isoString) return '-'
    const d = new Date(isoString)
    return d.toLocaleDateString('id-ID', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper animate-fadeIn">
        <style>{`
          .admin-login-wrapper {
            min-height: 100vh;
            display: grid;
            place-items: center;
            background: linear-gradient(135deg, #fbf9f4 0%, #faf1e1 100%);
            padding: 20px;
          }
          .login-card {
            background: #ffffff;
            border: 1px solid rgba(92, 56, 16, 0.08);
            box-shadow: 0 20px 40px rgba(92, 56, 16, 0.05);
            border-radius: 24px;
            padding: 40px;
            width: 100%;
            max-width: 420px;
            text-align: center;
          }
          .login-logo {
            width: 70px;
            margin-bottom: 24px;
          }
          .login-card h2 {
            font-size: 22px;
            color: var(--color-brand-brown, #5c3810);
            margin-bottom: 8px;
            font-weight: 800;
          }
          .login-card p {
            font-size: 13.5px;
            color: var(--color-brand-muted, #6e645e);
            margin-bottom: 30px;
          }
          .login-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
            text-align: left;
          }
          .login-field {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          .login-field label {
            font-size: 12.5px;
            font-weight: 700;
            color: var(--color-brand-dark, #231b18);
          }
          .login-input {
            height: 48px;
            padding: 12px 16px 12px 42px;
            border: 1px solid rgba(92, 56, 16, 0.15);
            border-radius: 10px;
            font-size: 14.5px;
            font-family: inherit;
            width: 100%;
          }
          .login-input:focus {
            outline: none;
            border-color: var(--color-brand-brown, #5c3810);
            box-shadow: 0 0 0 3px rgba(92, 56, 16, 0.08);
          }
          .login-error {
            color: #cc0000;
            font-size: 13px;
            font-weight: 600;
            text-align: center;
          }
          .login-submit {
            background-color: var(--color-brand-brown, #5c3810);
            color: #ffffff;
            border: none;
            border-radius: 99px;
            height: 48px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }
          .login-submit:hover {
            background-color: var(--color-brand-yellow, #dca11d);
            color: var(--color-brand-dark, #231b18);
            transform: translateY(-1px);
          }
          .back-btn {
            background: transparent;
            border: 1px solid rgba(92, 56, 16, 0.2);
            color: var(--color-brand-muted, #6e645e);
            border-radius: 99px;
            height: 44px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 16px;
            font-size: 13px;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            gap: 8px;
          }
          .back-btn:hover {
            background: rgba(92, 56, 16, 0.04);
            color: var(--color-brand-brown, #5c3810);
            border-color: var(--color-brand-brown, #5c3810);
          }
        `}</style>
        
        <div className="login-card">
          <img src="/ft.png" alt="Logo" className="login-logo mx-auto" />
          <h2>Fitrah Tumbuh</h2>
          <p>Masukkan kata sandi administrator untuk mengakses panel kendali data.</p>
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="login-field">
              <label htmlFor="pass">Kata Sandi*</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Lock size={16} style={{ position: 'absolute', left: '14px', color: 'var(--color-brand-muted, #6e645e)' }} />
                <input 
                  id="pass" 
                  type="password" 
                  className="login-input" 
                  placeholder="••••••••" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            {loginError && <div className="login-error">{loginError}</div>}
            
            <button type="submit" className="login-submit">
              <Lock size={16} /> MASUK PANEL ADMIN
            </button>
          </form>
          
          <button type="button" className="back-btn" onClick={() => navigate('beranda')}>
            <ArrowLeft size={16} /> Kembali ke Website
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-layout animate-fadeIn">
      <style>{`
        .admin-layout {
          min-height: 100vh;
          background: #fbf9f4;
          display: grid;
          grid-template-columns: 240px 1fr;
        }
        
        @media (max-width: 900px) {
          .admin-layout {
            grid-template-columns: 1fr;
          }
        }
        
        /* Sidebar Styles */
        .admin-sidebar {
          background: #ffffff;
          border-right: 1px solid rgba(92, 56, 16, 0.08);
          padding: 30px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        @media (max-width: 900px) {
          .admin-sidebar {
            border-right: none;
            border-bottom: 1px solid rgba(92, 56, 16, 0.08);
            padding: 20px;
          }
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 36px;
        }

        .sidebar-brand img {
          width: 32px;
        }

        .sidebar-brand h2 {
          font-size: 15px;
          font-weight: 800;
          color: var(--color-brand-brown, #5c3810);
        }

        .sidebar-menu {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .sidebar-btn {
          width: 100%;
          text-align: left;
          background: transparent;
          border: none;
          padding: 12px 16px;
          font-size: 13.5px;
          font-weight: 700;
          color: var(--color-brand-muted, #6e645e);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sidebar-btn:hover {
          background: rgba(92, 56, 16, 0.04);
          color: var(--color-brand-brown, #5c3810);
        }

        .sidebar-btn.active {
          background: var(--color-brand-brown, #5c3810);
          color: #ffffff;
        }

        .sidebar-footer {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .back-btn {
          background: transparent;
          border: 1px solid rgba(92, 56, 16, 0.2);
          color: var(--color-brand-muted, #6e645e);
          border-radius: 99px;
          height: 44px;
          font-weight: 600;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          gap: 8px;
        }
        
        .back-btn:hover {
          background: rgba(92, 56, 16, 0.04);
          color: var(--color-brand-brown, #5c3810);
          border-color: var(--color-brand-brown, #5c3810);
        }

        /* Main Content Panel */
        .admin-main {
          padding: 40px;
          overflow-x: hidden;
        }

        @media (max-width: 768px) {
          .admin-main {
            padding: 20px 16px;
          }
        }

        .admin-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .admin-header-row h1 {
          font-size: 24px;
          color: var(--color-brand-brown, #5c3810);
          font-weight: 800;
        }

        /* Tables & Lists */
        .admin-table-container {
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid rgba(92, 56, 16, 0.08);
          box-shadow: 0 10px 30px rgba(92, 56, 16, 0.02);
          overflow-x: auto;
          margin-top: 20px;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 13.5px;
          min-width: 700px;
        }

        .admin-table th {
          background: var(--color-brand-cream, #fbf9f4);
          color: var(--color-brand-brown, #5c3810);
          font-weight: 700;
          padding: 16px 20px;
          border-bottom: 1px solid rgba(92, 56, 16, 0.08);
        }

        .admin-table td {
          padding: 16px 20px;
          border-bottom: 1px solid rgba(92, 56, 16, 0.05);
          color: var(--color-brand-dark, #231b18);
          vertical-align: top;
        }

        .admin-table tr:last-child td {
          border-bottom: none;
        }

        .admin-table tr:hover td {
          background: rgba(92, 56, 16, 0.01);
        }

        /* Buttons & Badges */
        .badge-type {
          display: inline-block;
          font-size: 10px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 99px;
          text-transform: uppercase;
        }

        .badge-type.digital_product { background: #eef3e2; color: #738a43; }
        .badge-type.digital_learning { background: #fdf6e2; color: #cba819; }
        .badge-type.project_service { background: #fbf0e3; color: #5c3810; }

        .btn-table-action {
          background: transparent;
          border: none;
          color: var(--color-brand-muted, #6e645e);
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 12.5px;
          transition: background 0.2s;
        }

        .btn-table-action:hover {
          background: rgba(92, 56, 16, 0.06);
          color: var(--color-brand-brown, #5c3810);
        }

        .btn-table-action.delete:hover {
          background: rgba(204, 0, 0, 0.08);
          color: #cc0000;
        }

        /* Form Overlay Styles */
        .form-overlay {
          position: fixed;
          inset: 0;
          background: rgba(35, 27, 24, 0.35);
          backdrop-filter: blur(4px);
          z-index: 999;
          display: grid;
          place-items: center;
          padding: 20px;
          overflow-y: auto;
        }

        .form-card {
          background: #ffffff;
          width: 100%;
          max-width: 600px;
          border-radius: 24px;
          border: 1px solid rgba(92, 56, 16, 0.08);
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .form-header {
          background: #fbf9f4;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(92, 56, 16, 0.06);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .form-header h2 {
          font-size: 18px;
          color: var(--color-brand-brown, #5c3810);
        }

        .form-body {
          padding: 24px;
          max-height: 70vh;
          overflow-y: auto;
        }

        .crud-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 600px) {
          .form-grid-2 {
            grid-template-columns: 1fr;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-size: 13px;
          font-weight: 700;
          color: var(--color-brand-dark, #231b18);
        }

        .form-control {
          min-height: 44px;
          padding: 10px 14px;
          border: 1px solid rgba(92, 56, 16, 0.15);
          border-radius: 8px;
          font-family: inherit;
          font-size: 14px;
        }

        .form-control:focus {
          outline: none;
          border-color: var(--color-brand-brown, #5c3810);
        }

        .form-textarea {
          padding: 10px 14px;
          border: 1px solid rgba(92, 56, 16, 0.15);
          border-radius: 8px;
          font-family: inherit;
          font-size: 14px;
          resize: vertical;
        }

        .form-textarea:focus {
          outline: none;
          border-color: var(--color-brand-brown, #5c3810);
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
        }

        .checkbox-label input {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        /* Stats Overview Styles */
        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }
        
        @media (max-width: 1024px) {
          .admin-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 600px) {
          .admin-stats-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .stats-card {
          background: #ffffff;
          border: 1px solid rgba(92, 56, 16, 0.06);
          border-radius: 16px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 4px 20px rgba(92, 56, 16, 0.01);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        
        .stats-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(92, 56, 16, 0.04);
          border-color: rgba(92, 56, 16, 0.15);
        }
        
        .stats-card.active-card {
          border-color: var(--color-brand-brown, #5c3810);
          background: linear-gradient(135deg, #ffffff 0%, rgba(92, 56, 16, 0.02) 100%);
          box-shadow: 0 10px 20px rgba(92, 56, 16, 0.03);
        }
        
        .stats-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          transition: transform 0.2s ease;
        }
        
        .stats-card:hover .stats-icon-wrap {
          transform: scale(1.08);
        }
        
        .stats-icon-wrap.bg-brown {
          background-color: var(--color-brand-brown, #5c3810);
        }
        .stats-icon-wrap.bg-green {
          background-color: var(--color-brand-green, #738a43);
        }
        .stats-icon-wrap.bg-yellow {
          background-color: var(--color-brand-yellow, #dca11d);
        }
        .stats-icon-wrap.bg-gold {
          background-color: var(--color-brand-gold, #cba819);
        }
        
        .stats-content {
          display: flex;
          flex-direction: column;
        }

        .stats-content h3 {
          font-size: 22px;
          font-weight: 800;
          color: var(--color-brand-dark, #231b18);
          line-height: 1.2;
          margin: 0;
        }
        
        .stats-content p {
          font-size: 12px;
          font-weight: 600;
          color: var(--color-brand-muted, #6e645e);
          margin: 2px 0 0 0;
        }

        /* Modal Enhancement Styles */
        .modal-close-btn {
          background: transparent;
          border: none;
          color: var(--color-brand-muted, #6e645e);
          cursor: pointer;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .modal-close-btn:hover {
          background: rgba(92, 56, 16, 0.08);
          color: var(--color-brand-brown, #5c3810);
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
        }
        
        .secondary-button {
          background: transparent;
          border: 1px solid rgba(92, 56, 16, 0.2);
          color: var(--color-brand-muted, #6e645e);
          border-radius: 99px;
          padding: 10px 20px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .secondary-button:hover {
          background: rgba(92, 56, 16, 0.04);
          color: var(--color-brand-brown, #5c3810);
          border-color: var(--color-brand-brown, #5c3810);
        }
      `}</style>

      {/* Sidebar Section */}
      <aside className="admin-sidebar">
        <div>
          <div className="sidebar-brand">
            <img src="/ft.png" alt="Logo" />
            <h2>Fitrah Tumbuh Asri</h2>
          </div>
          
          <nav className="sidebar-menu">
            <button 
              onClick={() => setActiveTab('store')} 
              className={`sidebar-btn ${activeTab === 'store' ? 'active' : ''}`}
            >
              <Package size={18} />
              <span>Produk &amp; Layanan</span>
            </button>
            <button 
              onClick={() => setActiveTab('orders')} 
              className={`sidebar-btn ${activeTab === 'orders' ? 'active' : ''}`}
            >
              <Users size={18} />
              <span>Database Pelanggan</span>
            </button>
            <button 
              onClick={() => setActiveTab('registrations')} 
              className={`sidebar-btn ${activeTab === 'registrations' ? 'active' : ''}`}
            >
              <Handshake size={18} />
              <span>Pendaftar Kemitraan</span>
            </button>
            <button 
              onClick={() => setActiveTab('talent')} 
              className={`sidebar-btn ${activeTab === 'talent' ? 'active' : ''}`}
            >
              <Award size={18} />
              <span>Talent Mapping</span>
            </button>
          </nav>
        </div>

        <div className="sidebar-footer">
          <button onClick={() => navigate('beranda')} className="back-btn" style={{ margin: 0, gap: '8px' }}>
            <ArrowLeft size={16} /> Ke Website
          </button>
          <button onClick={handleLogout} className="back-btn" style={{ margin: 0, color: '#cc0000', borderColor: 'rgba(204,0,0,0.2)', gap: '8px' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        {/* Stats Overview */}
        <div className="admin-stats-grid">
          <div 
            onClick={() => setActiveTab('store')}
            className={`stats-card ${activeTab === 'store' ? 'active-card' : ''}`}
          >
            <div className="stats-icon-wrap bg-brown">
              <Package size={20} />
            </div>
            <div className="stats-content">
              <h3>{storeItems.length}</h3>
              <p>Total Produk</p>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('orders')}
            className={`stats-card ${activeTab === 'orders' ? 'active-card' : ''}`}
          >
            <div className="stats-icon-wrap bg-green">
              <Users size={20} />
            </div>
            <div className="stats-content">
              <h3>{orders.length}</h3>
              <p>Prospek (Leads)</p>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('registrations')}
            className={`stats-card ${activeTab === 'registrations' ? 'active-card' : ''}`}
          >
            <div className="stats-icon-wrap bg-yellow">
              <Handshake size={20} />
            </div>
            <div className="stats-content">
              <h3>{registrations.length}</h3>
              <p>Kemitraan</p>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('talent')}
            className={`stats-card ${activeTab === 'talent' ? 'active-card' : ''}`}
          >
            <div className="stats-icon-wrap bg-gold">
              <Award size={20} />
            </div>
            <div className="stats-content">
              <h3>{talentParticipants.length}</h3>
              <p>Talent Mapping</p>
            </div>
          </div>
        </div>

        {/* TAB 1: Storefront Items Manager */}
        {activeTab === 'store' && (
          <div>
            <div className="admin-header-row">
              <div>
                <h1>Katalog Produk &amp; Layanan</h1>
                <p style={{ color: 'var(--color-brand-muted)', fontSize: '13.5px', marginTop: '4px' }}>
                  Kelola Digital Product, Digital Learning, dan Project/Consulting Service.
                </p>
              </div>
              <button onClick={handleOpenAdd} className="button button-small" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Plus size={16} /> Tambah Produk
              </button>
            </div>

            {loading ? (
              <p>Memuat katalog...</p>
            ) : (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Tipe</th>
                      <th>Judul Produk</th>
                      <th>Target Audiens</th>
                      <th>Harga</th>
                      <th>Opsi Pembayaran</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {storeItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <span className={`badge-type ${item.type}`}>
                            {getTypeName(item.type)}
                          </span>
                        </td>
                        <td>
                          <strong>{item.title}</strong>
                          {item.type === 'digital_learning' && (
                            <p style={{ fontSize: '11px', color: '#cba819', marginTop: '2px', fontWeight: 600 }}>
                              Mentor: {item.speaker || '-'} | Jadwal: {item.class_date || '-'} ({item.class_time || '-'}) | Kuota: {item.quota || 0}
                            </p>
                          )}
                          <p style={{ fontSize: '12px', color: 'var(--color-brand-muted)', marginTop: '4px', maxWidth: '350px' }}>
                            {item.description.length > 90 ? `${item.description.substring(0, 90)}...` : item.description}
                          </p>
                        </td>
                        <td>{item.target_audience}</td>
                        <td>
                          <strong style={{ color: 'var(--color-brand-brown)' }}>
                            {item.is_free ? 'Rp 0' : item.price}
                          </strong>
                        </td>
                        <td>{item.is_free ? 'Gratis (Download)' : 'Berbayar (WA Redirect)'}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button onClick={() => handleOpenEdit(item)} className="btn-table-action" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <Pencil size={13} /> Ubah
                            </button>
                            <button onClick={() => handleDeleteItem(item.id)} className="btn-table-action delete" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <Trash2 size={13} /> Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {storeItems.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>
                          Tidak ada produk di database. Klik tombol "Tambah Produk" untuk mulai.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Customer Database / Leads */}
        {activeTab === 'orders' && (
          <div>
            <div className="admin-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
              <div>
                <h1>Database Prospek Pelanggan (Leads)</h1>
                <p style={{ color: 'var(--color-brand-muted)', fontSize: '13.5px', marginTop: '4px' }}>
                  Daftar calon pelanggan yang mengajukan order / unduh resource di storefront.
                </p>
              </div>
              <button 
                onClick={() => exportToCSV(orders, 'prospek_pelanggan.csv')} 
                className="button button-small"
                style={{ background: 'var(--color-brand-green, #738a43)', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Download size={16} /> Export Ke Google Sheets (CSV)
              </button>
            </div>

            {loading ? (
              <p>Memuat database pelanggan...</p>
            ) : (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Tanggal</th>
                      <th>Informasi Pelanggan</th>
                      <th>Segment</th>
                      <th>Peminatan (Produk/Kelas)</th>
                      <th>Sumber</th>
                      <th>Status</th>
                      <th>Catatan Kebutuhan</th>
                      <th>Kontak Tindak Lanjut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((ord) => (
                      <tr key={ord.id}>
                        <td>{formatDate(ord.created_at)}</td>
                        <td>
                          <strong>{ord.name}</strong>
                          <p style={{ fontSize: '11.5px', color: 'var(--color-brand-muted)' }}>{ord.email || '-'}</p>
                          <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-brand-brown)' }}>{ord.whatsapp}</p>
                        </td>
                        <td>
                          <span style={{ background: '#f0ede4', padding: '3px 8px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-brand-brown)' }}>
                            {ord.segment || ord.category || 'Umum'}
                          </span>
                          {ord.institution && (
                            <p style={{ fontSize: '11px', marginTop: '4px', color: 'var(--color-brand-muted)' }}>
                              Lembaga: {ord.institution}
                            </p>
                          )}
                        </td>
                        <td>
                          <strong style={{ fontSize: '13px' }}>{ord.interest || ord.product_title}</strong>
                          <p style={{ fontSize: '11px', color: 'var(--color-brand-muted)', marginTop: '2px' }}>ID: #{ord.product_id || '-'}</p>
                          {ord.execution_time && (
                            <p style={{ fontSize: '11px', color: '#738a43', marginTop: '2px' }}>
                              Waktu: {ord.execution_time}
                            </p>
                          )}
                        </td>
                        <td>
                          <span style={{ fontSize: '12px', fontWeight: 600 }}>{ord.source || ord.source_info || 'Website'}</span>
                        </td>
                        <td>
                          <span style={{ 
                            background: (ord.status || 'Lead') === 'Customer' ? '#eef3e2' : (ord.status || 'Lead') === 'Alumni' ? '#fdf6e2' : '#f4f2f0', 
                            color: (ord.status || 'Lead') === 'Customer' ? '#738a43' : (ord.status || 'Lead') === 'Alumni' ? '#cba819' : 'var(--color-brand-muted)',
                            padding: '4px 10px', 
                            borderRadius: '99px', 
                            fontSize: '11.5px', 
                            fontWeight: 800,
                            border: '1px solid rgba(0,0,0,0.02)'
                          }}>
                            {ord.status || 'Lead'}
                          </span>
                        </td>
                        <td style={{ maxWidth: '200px', fontSize: '12.5px', whiteSpace: 'pre-wrap' }}>{ord.notes || '-'}</td>
                        <td>
                          <a 
                            href={`https://wa.me/${ord.whatsapp.replace(/\D/g, '')}`} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="button button-small"
                            style={{ padding: '6px 14px', fontSize: '11.5px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            Hubungi via WA <ExternalLink size={12} />
                          </a>
                        </td>
                      </tr>
                    ))}
                    {orders.length === 0 && (
                      <tr>
                        <td colSpan="8" style={{ textAlign: 'center', padding: '40px' }}>
                          Belum ada data prospek pelanggan yang masuk.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Cooperation Registrations */}
        {activeTab === 'registrations' && (
          <div>
            <div className="admin-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
              <div>
                <h1>Pendaftar Kemitraan &amp; Kolaborasi</h1>
                <p style={{ color: 'var(--color-brand-muted)', fontSize: '13.5px', marginTop: '4px' }}>
                  Pendaftaran kolaborasi dari halaman kemitraan (Pentahelix, Relawan, Magang, dll.)
                </p>
              </div>
              <button 
                onClick={() => exportToCSV(registrations, 'pendaftar_kemitraan.csv')} 
                className="button button-small"
                style={{ background: 'var(--color-brand-green, #738a43)', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Download size={16} /> Export Ke Google Sheets (CSV)
              </button>
            </div>

            {loading ? (
              <p>Memuat data pendaftar...</p>
            ) : (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Tanggal</th>
                      <th>Informasi Pendaftar</th>
                      <th>Instansi / Lembaga</th>
                      <th>Peran / Perihal</th>
                      <th>Pesan Rencana Kolaborasi</th>
                      <th>Kontak</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((reg) => (
                      <tr key={reg.id}>
                        <td>{formatDate(reg.created_at)}</td>
                        <td>
                          <strong>{reg.name}</strong>
                          <p style={{ fontSize: '12px', color: 'var(--color-brand-muted)' }}>{reg.email}</p>
                          <p style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-brand-brown)' }}>{reg.whatsapp}</p>
                        </td>
                        <td>{reg.institution}</td>
                        <td>
                          <span style={{ fontWeight: 700, color: 'var(--color-brand-green)' }}>
                            {reg.cooperation_type}
                          </span>
                        </td>
                        <td style={{ maxWidth: '300px', whiteSpace: 'pre-wrap' }}>{reg.message}</td>
                        <td>
                          <a 
                            href={`https://wa.me/${reg.whatsapp.replace(/\D/g, '')}`} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="button button-small"
                            style={{ padding: '6px 14px', fontSize: '11.5px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            Tindak Lanjut <ExternalLink size={12} />
                          </a>
                        </td>
                      </tr>
                    ))}
                    {registrations.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>
                          Belum ada data pendaftar kemitraan yang masuk.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Talent Mapping Results */}
        {activeTab === 'talent' && (
          <div>
            <div className="admin-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
              <div>
                <h1>Daftar Peserta &amp; Hasil Asesmen Talent Mapping</h1>
                <p style={{ color: 'var(--color-brand-muted)', fontSize: '13.5px', marginTop: '4px' }}>
                  Data peserta yang sudah mengisi kuesioner Talent Mapping ST30.
                </p>
              </div>
              <button 
                onClick={() => exportToCSV(talentParticipants, 'peserta_talent_mapping.csv')} 
                className="button button-small"
                style={{ background: 'var(--color-brand-green, #738a43)', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Download size={16} /> Export Ke Google Sheets (CSV)
              </button>
            </div>

            {loading ? (
              <p>Memuat data peserta...</p>
            ) : (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Tanggal</th>
                      <th>Nama Lengkap</th>
                      <th>Usia</th>
                      <th>Lembaga / Instansi</th>
                      <th>Jawaban / Hasil</th>
                      <th>Detail Jawaban</th>
                    </tr>
                  </thead>
                  <tbody>
                    {talentParticipants.map((part) => (
                      <tr key={part.id}>
                        <td>{formatDate(part.created_at)}</td>
                        <td><strong>{part.name}</strong></td>
                        <td>{part.age || '-'} Tahun</td>
                        <td>{part.institution || '-'}</td>
                        <td>
                          {part.answers ? (
                            <span style={{ color: 'var(--color-brand-green)', fontWeight: 600 }}>Asesmen Selesai</span>
                          ) : (
                            <span style={{ color: 'var(--color-brand-muted)' }}>Baru Isi Form</span>
                          )}
                        </td>
                        <td>
                          {part.answers ? (
                            <button 
                              onClick={() => {
                                alert(`Data Asesmen untuk: ${part.name}\n\nJawaban Kuesioner:\n${JSON.stringify(part.answers, null, 2)}`)
                              }}
                              className="btn-table-action"
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                            >
                              <FileText size={13} /> Lihat Log Jawaban
                            </button>
                          ) : '-'}
                        </td>
                      </tr>
                    ))}
                    {talentParticipants.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>
                          Belum ada data peserta Talent Mapping yang masuk.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* CRUD Add / Edit Modal Overlay */}
      {editingItem && (
        <div className="form-overlay" onClick={() => setEditingItem(null)}>
          <div className="form-card" onClick={(e) => e.stopPropagation()}>
            <div className="form-header">
              <h2>{editingItem === 'new' ? 'Tambah Produk / Layanan Baru' : 'Ubah Detail Produk / Layanan'}</h2>
              <button className="modal-close-btn" onClick={() => setEditingItem(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="form-body">
              <form onSubmit={handleCrudSubmit} className="crud-form">
                
                <div className="form-group">
                  <label htmlFor="title">Judul Produk / Layanan*</label>
                  <input 
                    id="title" name="title" type="text" className="form-control" required
                    value={formData.title} onChange={handleInputChange} placeholder="Contoh: Modul Parenting Kreatif"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Deskripsi Singkat*</label>
                  <textarea 
                    id="description" name="description" rows="3" className="form-textarea" required
                    value={formData.description} onChange={handleInputChange} placeholder="Tulis rincian informasi produk..."
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="type">Tipe Layanan*</label>
                    <select id="type" name="type" className="form-control" value={formData.type} onChange={handleInputChange}>
                      <option value="digital_product">Digital Product (Ebook/Worksheet)</option>
                      <option value="digital_learning">Digital Learning (Kelas/Mentoring)</option>
                      <option value="project_service">Project &amp; Consulting (Konsultasi Instansi)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="target_audience">Target Audiens*</label>
                    <select id="target_audience" name="target_audience" className="form-control" value={formData.target_audience} onChange={handleInputChange}>
                      <option value="Orangtua">Orangtua</option>
                      <option value="Pemuda">Pemuda</option>
                      <option value="Pekerja">Pekerja</option>
                      <option value="Sekolah & Komunitas">Sekolah &amp; Komunitas</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="price">Harga Produk / Layanan*</label>
                    <input 
                      id="price" name="price" type="text" className="form-control" required
                      value={formData.price} onChange={handleInputChange} placeholder="Contoh: Rp 150.000 atau Hubungi Admin"
                    />
                  </div>

                  <div className="form-group" style={{ justifyContent: 'center' }}>
                    <label className="checkbox-label" style={{ marginTop: '22px' }}>
                      <input 
                        type="checkbox" name="is_free" 
                        checked={formData.is_free} onChange={handleInputChange}
                      />
                      <span>Ini adalah produk GRATIS</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="image_url">Link URL Gambar Ilustrasi</label>
                  <input 
                    id="image_url" name="image_url" type="text" className="form-control"
                    value={formData.image_url} onChange={handleInputChange} placeholder="https://images.unsplash.com/photo-..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="whatsapp_text">Teks Prefilled Pesan WhatsApp</label>
                  <textarea 
                    id="whatsapp_text" name="whatsapp_text" rows="2" className="form-textarea"
                    value={formData.whatsapp_text} onChange={handleInputChange} placeholder="Halo admin, saya tertarik memesan..."
                  />
                </div>

                {formData.type === 'digital_learning' && (
                  <div style={{ border: '1px solid rgba(92, 56, 16, 0.1)', padding: '16px', borderRadius: '12px', background: 'rgba(92, 56, 16, 0.02)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-brand-brown)', margin: 0 }}>Detail Tambahan Pembelajaran (Digital Learning)</h3>
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label htmlFor="speaker">Nama Narasumber / Mentor</label>
                        <input 
                          id="speaker" name="speaker" type="text" className="form-control"
                          value={formData.speaker} onChange={handleInputChange} placeholder="Contoh: Coach Arif"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="quota">Kuota Maksimal Peserta</label>
                        <input 
                          id="quota" name="quota" type="number" className="form-control"
                          value={formData.quota} onChange={handleInputChange} placeholder="Contoh: 25"
                        />
                      </div>
                    </div>
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label htmlFor="class_date">Tanggal Pelaksanaan</label>
                        <input 
                          id="class_date" name="class_date" type="text" className="form-control"
                          value={formData.class_date} onChange={handleInputChange} placeholder="Contoh: 28 Aug 2026"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="class_time">Waktu Pelaksanaan</label>
                        <input 
                          id="class_time" name="class_time" type="text" className="form-control"
                          value={formData.class_time} onChange={handleInputChange} placeholder="Contoh: 19:30 WIB"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.is_free && (
                  <div className="form-group">
                    <label htmlFor="download_link">Link Download File Resource (Untuk Produk Gratis)</label>
                    <input 
                      id="download_link" name="download_link" type="text" className="form-control"
                      value={formData.download_link} onChange={handleInputChange} placeholder="https://drive.google.com/file/d/..."
                    />
                  </div>
                )}

                {crudError && <div className="login-error" style={{ textAlign: 'left' }}>{crudError}</div>}

                <div className="modal-actions" style={{ marginTop: '10px' }}>
                  <button type="button" className="secondary-button" onClick={() => setEditingItem(null)}>
                    Batal
                  </button>
                  <button type="submit" className="button">
                    Simpan Perubahan
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function getTypeName(type) {
  switch (type) {
    case 'digital_product': return 'Digital Product';
    case 'digital_learning': return 'Digital Learning';
    case 'project_service': return 'Project & Consulting';
    default: return type;
  }
}
