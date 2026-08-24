import { useState, useEffect } from 'react'
import { trackFormSubmit, trackPurchaseClick } from '../../utils/analytics'

import { API_BASE_URL, WHATSAPP_ADMIN } from '../../utils/config'

const FALLBACK_PRODUCTS = [
  {
    id: 1,
    title: "Family Growth Toolkit",
    description: "Kumpulan aktivitas kreatif dan instrumen reflektif mingguan untuk membangun bonding dan kebiasaan baik dalam keluarga.",
    price: "Rp 35.000",
    image_url: "/8.JPG",
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
    image_url: "/8.JPG",
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
    image_url: "/8.JPG",
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
    image_url: "/8.JPG",
    type: "digital_product",
    target_audience: "Orangtua",
    whatsapp_text: "Halo Fitrah Tumbuh, saya ingin memesan Fitrah Family Activity Cards.",
    is_free: false
  },
  {
    id: 10,
    title: "Ebook: Menggali Akar - Tawhid Fitrah dan Identitas",
    description: "Buku panduan reflektif untuk mengeksplorasi konsep Tawhid, Fitrah, dan pembentukan identitas diri yang kokoh.",
    price: "GRATIS (Baca Online)",
    image_url: "/menggali-akar-cover.jpg",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Fitrah Tumbuh, saya ingin meminta file unduhan untuk Ebook Menggali Akar - Tawhid Fitrah dan Identitas.",
    is_free: true,
    embed_url: "https://docs.google.com/presentation/d/1DA3yQcwFl4E7AuSxGc99_f0yj7LbdNI8-CAgLH0nyLI/embed?start=false&loop=false&delayms=3000"
  },
  {
    id: 11,
    title: "Ebook Modul 1: Memetakan Anugerah Unik - Talent Digital",
    description: "Panduan Modul 1 untuk mengenali potensi fitrah dan memetakan anugerah unik bakat digital Anda.",
    price: "GRATIS (Baca Online)",
    image_url: "",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Admin Fitrah Tumbuh, saya ingin meminta berkas PDF untuk Ebook Modul 1: Memetakan Anugerah Unik - Talent Digital.",
    is_free: true,
    embed_url: "https://docs.google.com/presentation/d/1_X5BMNMvjuYHKW9ceYf_1hWnvPkI8h9v6Cq5k8AAQVU/embed?start=false&loop=false&delayms=3000"
  },
  {
    id: 12,
    title: "Ebook Modul 2: Akhlak dan Digital Hygiene",
    description: "Panduan Modul 2 untuk memahami akhlak berinternet dan membangun digital hygiene yang sehat.",
    price: "GRATIS (Baca Online)",
    image_url: "",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Admin Fitrah Tumbuh, saya ingin meminta berkas PDF untuk Ebook Modul 2: Akhlak dan Digital Hygiene.",
    is_free: true,
    embed_url: "https://docs.google.com/presentation/d/1OuYzhgROS0fF9WjqT-cjGTPn4N6f_Rvc7tWnZLsxSGA/embed?start=false&loop=false&delayms=3000"
  },
  {
    id: 13,
    title: "Ebook Modul 3: Merumuskan Peta Jalan",
    description: "Panduan Modul 3 untuk menyusun rancangan peta jalan hidup dan kontribusi terbaik Anda.",
    price: "GRATIS (Baca Online)",
    image_url: "",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Admin Fitrah Tumbuh, saya ingin meminta berkas PDF untuk Ebook Modul 3: Merumuskan Peta Jalan.",
    is_free: true,
    embed_url: "https://docs.google.com/presentation/d/13VaCC91LJN7MLg_6jmFZjg5Fwr69WG2sqziFHfzxFJg/embed?start=false&loop=false&delayms=3000"
  },
  {
    id: 14,
    title: "Ebook: Pendalaman Iman & Filter Noise",
    description: "Panduan spiritual untuk memperdalam keimanan serta memfilter pengaruh negatif di era digital.",
    price: "GRATIS (Baca Online)",
    image_url: "",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Admin Fitrah Tumbuh, saya ingin meminta berkas PDF untuk Ebook: Pendalaman Iman & Filter Noise.",
    is_free: true,
    embed_url: "https://docs.google.com/presentation/d/17Aeud7XevnL4dnVC_t8FbBv8YT-w8jXQ1jK9Ah3i_Tg/embed?start=false&loop=false&delayms=3000"
  },
  {
    id: 15,
    title: "Ebook: Mini-Challenge & Belajar dari Kegagalan",
    description: "Lembar tantangan seru untuk melatih ketangguhan mental dan belajar bangkit dari kegagalan.",
    price: "GRATIS (Baca Online)",
    image_url: "",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Admin Fitrah Tumbuh, saya ingin meminta berkas PDF untuk Ebook: Mini-Challenge & Belajar dari Kegagalan.",
    is_free: true,
    embed_url: "https://docs.google.com/presentation/d/1mKRptiZReG4V6fyWcOmCcIW8bBuTa1__XILPIQzxB0M/embed?start=false&loop=false&delayms=3000"
  },
  {
    id: 16,
    title: "Ebook: Manajemen Waktu Islami & Produktivitas",
    description: "Panduan praktis mengelola waktu secara Islami demi produktivitas hidup yang berkah.",
    price: "GRATIS (Baca Online)",
    image_url: "",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Admin Fitrah Tumbuh, saya ingin meminta berkas PDF untuk Ebook: Manajemen Waktu Islami & Produktivitas.",
    is_free: true,
    embed_url: "https://docs.google.com/presentation/d/1W_ewkMxHVQMd8wyJjAf4-KetwG7z0sPMBMcO_rJ-1fE/embed?start=false&loop=false&delayms=3000"
  },
  {
    id: 17,
    title: "Ebook: Validasi & Penyempurnaan RTP",
    description: "Panduan validasi langkah demi langkah untuk menyempurnaan Rencana Tumbuh Personal (RTP) Anda.",
    price: "GRATIS (Baca Online)",
    image_url: "",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Admin Fitrah Tumbuh, saya ingin meminta berkas PDF untuk Ebook: Validasi & Penyempurnaan RTP.",
    is_free: true,
    embed_url: "https://docs.google.com/presentation/d/1o_nILhXv9ZsmyxikqRUWmzUmPTJcqp6bc1JXoTfRk4A/embed?start=false&loop=false&delayms=3000"
  },
  {
    id: 18,
    title: "Ebook: Implementasi Istiqamah Ibadah",
    description: "Panduan tips praktis membangun kebiasaan baik dan melatih istiqamah dalam ibadah harian.",
    price: "GRATIS (Baca Online)",
    image_url: "",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Admin Fitrah Tumbuh, saya ingin meminta berkas PDF untuk Ebook: Implementasi Istiqamah Ibadah.",
    is_free: true,
    embed_url: "https://docs.google.com/presentation/d/1bwyZZYXOXQCyDH8hfeMBnbcOq8ICjdz6IWSZFr3uuHg/embed?start=false&loop=false&delayms=3000"
  },
  {
    id: 19,
    title: "Ebook: Eksplorasi Skill & Mencari Mentor",
    description: "Langkah-langkah strategis untuk mengeksplorasi keahlian baru dan menemukan mentor yang tepat.",
    price: "GRATIS (Baca Online)",
    image_url: "",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Admin Fitrah Tumbuh, saya ingin meminta berkas PDF untuk Ebook: Eksplorasi Skill & Mencari Mentor.",
    is_free: true,
    embed_url: "https://docs.google.com/presentation/d/1TvSQMvMclrURrEqoVlJOTL2dBZgzzd9OobI1Jz8wOsM/embed?start=false&loop=false&delayms=3000"
  },
  {
    id: 20,
    title: "Ebook: Merancang Proyek Kontribusi Sosial",
    description: "Panduan mendesain inisiatif sosial dan proyek pengabdian masyarakat yang berdampak nyata.",
    price: "GRATIS (Baca Online)",
    image_url: "",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Admin Fitrah Tumbuh, saya ingin meminta berkas PDF untuk Ebook: Merancang Proyek Kontribusi Sosial.",
    is_free: true,
    embed_url: "https://docs.google.com/presentation/d/1ajeICiQL2_JTArdtb5SwB_m99F43M9UnK10IIv-5s28/embed?start=false&loop=false&delayms=3000"
  },
  {
    id: 21,
    title: "Ebook: Penilaian Fase I & Peluncuran RTP",
    description: "Tahapan penilaian menyeluruh pada Fase I dan langkah-langkah peluncuran rencana pertumbuhan diri Anda.",
    price: "GRATIS (Baca Online)",
    image_url: "",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Admin Fitrah Tumbuh, saya ingin meminta berkas PDF untuk Ebook: Penilaian Fase I & Peluncuran RTP.",
    is_free: true,
    embed_url: "https://docs.google.com/presentation/d/1YtN-BxwhPkSSnoQLJDvZbStpPGg6ABaXrbb0XGxjFf0/embed?start=false&loop=false&delayms=3000"
  },
  {
    id: 22,
    title: "Ebook: Orientasi Proyek Masalah Umat",
    description: "Panduan orientasi proyek kemasyarakatan berfokus pada penyelesaian masalah nyata umat.",
    price: "GRATIS (Baca Online)",
    image_url: "",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Admin Fitrah Tumbuh, saya ingin meminta berkas PDF untuk Ebook: Orientasi Proyek Masalah Umat.",
    is_free: true,
    embed_url: "https://docs.google.com/presentation/d/1Zv5PTcljIY4c6QI0KTY7xsGusXM9Mxt0/embed?start=false&loop=false&delayms=3000"
  },
  {
    id: 23,
    title: "Ebook: Perumusan Tujuan Proyek",
    description: "Panduan praktis merumuskan visi, misi, dan tujuan konkret suatu proyek kontribusi sosial.",
    price: "GRATIS (Baca Online)",
    image_url: "",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Admin Fitrah Tumbuh, saya ingin meminta berkas PDF untuk Ebook: Perumusan Tujuan Proyek.",
    is_free: true,
    embed_url: "https://docs.google.com/presentation/d/1Bg3JoWhs21wwGbsK4VikAt04pdspHZCY/embed?start=false&loop=false&delayms=3000"
  },
  {
    id: 24,
    title: "Ebook: Kepemimpinan & Pengambilan Keputusan",
    description: "Modul pelatihan kepemimpinan taktis dan metodologi pengambilan keputusan yang bijak.",
    price: "GRATIS (Baca Online)",
    image_url: "",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Admin Fitrah Tumbuh, saya ingin meminta berkas PDF untuk Ebook: Kepemimpinan & Pengambilan Keputusan.",
    is_free: true,
    embed_url: "https://docs.google.com/presentation/d/1HyMJp796VF6b1ZPiHhPhBizAdDvYkdyk/embed?start=false&loop=false&delayms=3000"
  },
  {
    id: 25,
    title: "Ebook: Memperkuat Output dan Dampak Nyata",
    description: "Strategi praktis memperkuat luaran proyek agar memberikan dampak nyata dan berkelanjutan bagi masyarakat.",
    price: "GRATIS (Baca Online)",
    image_url: "",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Admin Fitrah Tumbuh, saya ingin meminta berkas PDF untuk Ebook: Memperkuat Output dan Dampak Nyata.",
    is_free: true,
    embed_url: "https://docs.google.com/presentation/d/10zP8goRKSu83dFNSEDkm7m2-0pxqKeY3/embed?start=false&loop=false&delayms=3000"
  },
  {
    id: 26,
    title: "Ebook: Festival Proyek Laporan Akhir",
    description: "Panduan penyusunan laporan akhir proyek dan pementasan festival karya kontribusi sosial.",
    price: "GRATIS (Baca Online)",
    image_url: "",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Admin Fitrah Tumbuh, saya ingin meminta berkas PDF untuk Ebook: Festival Proyek Laporan Akhir.",
    is_free: true,
    embed_url: "https://docs.google.com/presentation/d/1rxfXFvh69iw0iUvXgDDwt9GVSK6nJVlB/embed?start=false&loop=false&delayms=3000"
  },
  {
    id: 27,
    title: "Ebook: Dasar IT & Pembuatan Website",
    description: "Modul dasar pengenalan teknologi informasi dan pembuatan website sederhana untuk pemula.",
    price: "GRATIS (Baca Online)",
    image_url: "",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Admin Fitrah Tumbuh, saya ingin meminta berkas PDF untuk Ebook: Dasar IT & Pembuatan Website.",
    is_free: true,
    embed_url: "https://drive.google.com/file/d/1vEXqfXCbyoo78SJUpBuT6ADVwsWh_IPr/preview"
  },
  {
    id: 28,
    title: "Ebook: English Learning Module",
    description: "Modul pembelajaran bahasa Inggris praktis untuk meningkatkan rasa percaya diri berbicara dan menulis.",
    price: "GRATIS (Baca Online)",
    image_url: "",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Admin Fitrah Tumbuh, saya ingin meminta berkas PDF untuk Ebook: English Learning Module.",
    is_free: true,
    embed_url: "https://drive.google.com/file/d/1fb7r1eeszNA-kemAGGN-sqWaKa1OsFtH/preview"
  },
  {
    id: 29,
    title: "Ebook: Modul Content Creator",
    description: "Panduan dasar menjadi pembuat konten kreatif, mulai dari ideasi hingga teknik produksi media digital.",
    price: "GRATIS (Baca Online)",
    image_url: "",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Admin Fitrah Tumbuh, saya ingin meminta berkas PDF untuk Ebook: Modul Content Creator.",
    is_free: true,
    embed_url: "https://drive.google.com/file/d/1G32nFNAECqaMjyA_6LFF-0UJudo-fVpj/preview"
  },
  {
    id: 30,
    title: "Ebook: Modul Dasar Kewirausahaan",
    description: "Modul pengenalan konsep dasar kewirausahaan etis dan perancangan model bisnis sederhana.",
    price: "GRATIS (Baca Online)",
    image_url: "",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Admin Fitrah Tumbuh, saya ingin meminta berkas PDF untuk Ebook: Modul Dasar Kewirausahaan.",
    is_free: true,
    embed_url: "https://drive.google.com/file/d/1FJWX9n0ujmzrR8sDr3juaBSVT_QZVetZ/preview"
  },
  {
    id: 31,
    title: "Ebook: Modul Pembelajaran Kepenulisan",
    description: "Panduan mendalami dunia kepenulisan kreatif, penyusunan artikel, dan teknik merangkai kata.",
    price: "GRATIS (Baca Online)",
    image_url: "",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Admin Fitrah Tumbuh, saya ingin meminta berkas PDF untuk Ebook: Modul Pembelajaran Kepenulisan.",
    is_free: true,
    embed_url: "https://drive.google.com/file/d/1IxT-czK3yvI0Y3M8ti7_gRrYXb4-aKzD/preview"
  },
  {
    id: 32,
    title: "Ebook: Modul Pembelajaran Kesenian",
    description: "Eksplorasi nilai estetika, ekspresi kreatif diri, dan dasar-dasar kesenian bernilai fitrah.",
    price: "GRATIS (Baca Online)",
    image_url: "",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Admin Fitrah Tumbuh, saya ingin meminta berkas PDF untuk Ebook: Modul Pembelajaran Kesenian.",
    is_free: true,
    embed_url: "https://drive.google.com/file/d/1ucLpDq0NkK4BndTFXQa1gvppHDgkNm5S/preview"
  },
  {
    id: 33,
    title: "Ebook: Modul Pembelajaran Olahraga",
    description: "Panduan dasar menjaga kebugaran jasmani, disiplin diri, dan kebiasaan hidup sehat melalui olahraga harian.",
    price: "GRATIS (Baca Online)",
    image_url: "",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Admin Fitrah Tumbuh, saya ingin meminta berkas PDF untuk Ebook: Modul Pembelajaran Olahraga.",
    is_free: true,
    embed_url: "https://drive.google.com/file/d/11EpkQyEPwzDjZPu0eCrMtoXrKdOHQYkR/preview"
  },
  {
    id: 34,
    title: "Ebook: Modul Public Speaking",
    description: "Panduan praktis berbicara di depan umum secara percaya diri, runut, persuasif, dan komunikatif.",
    price: "GRATIS (Baca Online)",
    image_url: "",
    type: "digital_product",
    target_audience: "Pemuda",
    whatsapp_text: "Halo Admin Fitrah Tumbuh, saya ingin meminta berkas PDF untuk Ebook: Modul Public Speaking.",
    is_free: true,
    embed_url: "https://drive.google.com/file/d/1rpibCRBcTrjprokKTIulJ71avm9hWcW_/preview"
  }
]

export default function ProdukPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [audienceFilter, setAudienceFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeEmbedUrl, setActiveEmbedUrl] = useState(null)
  const [activeEbookTitle, setActiveEbookTitle] = useState('')

  // Modal checkout
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', notes: '' })
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(null)

  const renderEbookCover = (p) => {
    let cleanTitle = p.title.replace(/^Ebook\s+Modul\s+/i, 'Modul ')
                            .replace(/^Ebook:\s+/i, '')
                            .replace(/^Ebook\s+/i, '')
                            .trim();
    
    let titleParts = cleanTitle.split(' - ');
    let titleText = titleParts[0];
    let subtitleText = titleParts[1] || "";

    const palettes = [
      { bg: 'linear-gradient(135deg, #1C523A 0%, #0E3523 100%)', text: '#FDFCF7', muted: '#CDE5DB', border: 'rgba(255, 255, 255, 0.22)' }, // Emerald Green
      { bg: 'linear-gradient(135deg, #A83A24 0%, #762312 100%)', text: '#FDFCF7', muted: '#F3D2CC', border: 'rgba(255, 255, 255, 0.22)' }, // Terracotta
      { bg: 'linear-gradient(135deg, #234582 0%, #112857 100%)', text: '#FDFCF7', muted: '#CCD7ED', border: 'rgba(255, 255, 255, 0.22)' }, // Indigo Blue
      { bg: 'linear-gradient(135deg, #C58A24 0%, #906110 100%)', text: '#FDFCF7', muted: '#F7E7CD', border: 'rgba(255, 255, 255, 0.22)' }, // Warm Ochre
      { bg: 'linear-gradient(135deg, #742551 0%, #4D1232 100%)', text: '#FDFCF7', muted: '#ECCFE0', border: 'rgba(255, 255, 255, 0.22)' }, // Plum
      { bg: 'linear-gradient(135deg, #2E5A36 0%, #19381E 100%)', text: '#FDFCF7', muted: '#CEE2D2', border: 'rgba(255, 255, 255, 0.22)' }, // Deep Forest
      { bg: 'linear-gradient(135deg, #6C7030 0%, #474B19 100%)', text: '#FDFCF7', muted: '#E7E9CD', border: 'rgba(255, 255, 255, 0.22)' }, // Olive
      { bg: 'linear-gradient(135deg, #206E6C 0%, #0E4948 100%)', text: '#FDFCF7', muted: '#CDE5E4', border: 'rgba(255, 255, 255, 0.22)' }, // Teal
      { bg: 'linear-gradient(135deg, #6C648B 0%, #473E63 100%)', text: '#FDFCF7', muted: '#E5E2ED', border: 'rgba(255, 255, 255, 0.22)' }, // Lavender
      { bg: 'linear-gradient(135deg, #B56B45 0%, #854826 100%)', text: '#FDFCF7', muted: '#F6E2D8', border: 'rgba(255, 255, 255, 0.22)' }, // Clay
      { bg: 'linear-gradient(135deg, #A86472 0%, #7B414C 100%)', text: '#FDFCF7', muted: '#F4E2E5', border: 'rgba(255, 255, 255, 0.22)' }, // Muted Rose
      { bg: 'linear-gradient(135deg, #353942 0%, #1D2026 100%)', text: '#FDFCF7', muted: '#D2D4D7', border: 'rgba(255, 255, 255, 0.22)' }, // Dark Charcoal
      { bg: 'linear-gradient(135deg, #9C7A4A 0%, #6F532B 100%)', text: '#FDFCF7', muted: '#F2E8DC', border: 'rgba(255, 255, 255, 0.22)' }, // Bronze
      { bg: 'linear-gradient(135deg, #5C3810 0%, #3B2104 100%)', text: '#FDFCF7', muted: '#EFE3D5', border: 'rgba(255, 255, 255, 0.22)' }, // Dark Wood
      { bg: 'linear-gradient(135deg, #B83A58 0%, #852136 100%)', text: '#FDFCF7', muted: '#F7D2DB', border: 'rgba(255, 255, 255, 0.22)' }, // Crimson
      { bg: 'linear-gradient(135deg, #4A7A96 0%, #2A5168 100%)', text: '#FDFCF7', muted: '#D8E5ED', border: 'rgba(255, 255, 255, 0.22)' }  // Ocean Blue
    ];
    const palette = palettes[p.id % palettes.length];

    const titleLower = cleanTitle.toLowerCase();
    
    // Choose icon based on topic keyword
    let iconElement;
    if (titleLower.includes('menggali akar')) {
      iconElement = (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={palette.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22V12M12 12a5 5 0 0 1 5-5h3M12 12a5 5 0 0 0-5-5H4M20 7c0-2-2-4-5-4S12 5 12 7M4 7c0-2 2-4 5-4s3 2 3 4" />
          <path d="M12 12c-1.5 2-3.5 3-6 3m6-3c1.5 2 3.5 3 6 3" />
        </svg>
      );
    } else if (titleLower.includes('akhlak') || titleLower.includes('iman') || titleLower.includes('hygiene') || titleLower.includes('ibadah') || titleLower.includes('istiqamah')) {
      iconElement = (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={palette.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    } else if (titleLower.includes('jalan') || titleLower.includes('waktu') || titleLower.includes('rtp') || titleLower.includes('fase') || titleLower.includes('peluncuran') || titleLower.includes('peta')) {
      iconElement = (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={palette.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      );
    } else if (titleLower.includes('skill') || titleLower.includes('talent') || titleLower.includes('anugerah') || titleLower.includes('digital')) {
      iconElement = (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={palette.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
        </svg>
      );
    } else if (titleLower.includes('sosial') || titleLower.includes('proyek') || titleLower.includes('mentor') || titleLower.includes('kontribusi')) {
      iconElement = (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={palette.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      );
    } else {
      iconElement = (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={palette.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/>
        </svg>
      );
    }

    return (
      <div className="custom-ebook-cover-rendered" style={{ background: palette.bg }}>
        <div className="ebook-cover-spine"></div>
        <div className="ebook-cover-border" style={{ borderColor: palette.border }}></div>
        <div className="ebook-cover-content">
          <span className="ebook-cover-tag" style={{ color: palette.muted }}>EBOOK</span>
          <div className="ebook-cover-icon-box" style={{ borderColor: palette.border }}>
            {iconElement}
          </div>
          <h4 className="ebook-cover-title" style={{ color: palette.text }}>{titleText}</h4>
          {subtitleText && <p className="ebook-cover-subtitle" style={{ color: palette.muted }}>{subtitleText}</p>}
          <div className="ebook-cover-footer-brand" style={{ color: palette.muted }}>Fitrah Tumbuh</div>
        </div>
      </div>
    );
  };

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
    const waMessage = `Halo Admin Fitrah Tumbuh, saya tertarik untuk membeli/mengakses produk "${product.title}" (${product.price}). Bagaimana cara pembayarannya?`
    window.open(`https://wa.me/${WHATSAPP_ADMIN}?text=${encodeURIComponent(waMessage)}`, '_blank')
  }

  // Filter, Search, and Sort (Paid items at the bottom)
  const filteredProducts = products.filter(p => {
    const matchesAudience = audienceFilter === 'all' || p.target_audience === audienceFilter
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesAudience && matchesSearch
  }).sort((a, b) => {
    if (!a.is_free && b.is_free) return 1;
    if (a.is_free && !b.is_free) return -1;
    return 0;
  })

  return (
    <div className="storefront-wrapper">
      <style>{`
        /* Centered 3D book container override */
        .catalog-img-box {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: radial-gradient(circle, #FCFAF6 0%, #EFEBE4 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          box-sizing: border-box;
        }
        .catalog-img-box img {
          width: 100%;
          height: 100%;
          object-fit: contain !important;
          border-radius: 12px;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .book-3d-wrapper {
          perspective: 1000px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 110px;
          height: 154px;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .catalog-card:hover .book-3d-wrapper {
          transform: scale(1.08) translateY(-6px) rotateY(-6deg) rotateX(2deg);
        }

        /* Ebook cover rendering */
        .custom-ebook-cover-rendered {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 12px 10px 12px 18px;
          box-sizing: border-box;
          text-align: center;
          align-items: center;
          justify-content: space-between;
          border-radius: 2px 4px 4px 2px;
          transform: rotateY(-16deg) rotateX(4deg) rotateZ(-1deg);
          transform-style: preserve-3d;
          box-shadow: 
            8px 12px 24px rgba(92, 56, 16, 0.22),
            2px 0 4px rgba(0, 0, 0, 0.08),
            inset 1px 1px 0px rgba(255, 255, 255, 0.15);
          border-bottom: 1px solid rgba(0,0,0,0.12);
        }
        /* Dynamic 3D book page edges sticking out on the right */
        .custom-ebook-cover-rendered::after {
          content: '';
          position: absolute;
          top: 3px;
          bottom: 3px;
          right: -4px;
          width: 4px;
          background: linear-gradient(to right, #E0E0E0 0%, #FFFFFF 50%, #DCDCDC 100%);
          border-radius: 0 2px 2px 0;
          box-shadow: 1px 1px 2px rgba(0,0,0,0.08);
          transform: rotateY(40deg);
          transform-origin: left center;
          z-index: 1;
          pointer-events: none;
        }
        /* Simulated canvas texture overlay */
        .custom-ebook-cover-rendered::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 3px 3px;
          pointer-events: none;
          mix-blend-mode: overlay;
          z-index: 2;
        }
        .ebook-cover-spine {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 8px;
          background: linear-gradient(to right, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.03) 60%, rgba(255,255,255,0.08) 80%, rgba(0,0,0,0.06) 100%);
          border-right: 1px solid rgba(0,0,0,0.05);
          z-index: 3;
        }
        .ebook-cover-border {
          position: absolute;
          top: 6px;
          left: 12px;
          right: 6px;
          bottom: 6px;
          border: 1px solid;
          pointer-events: none;
          border-radius: 2px;
          z-index: 3;
          opacity: 0.85;
        }
        /* Classic inset line detail */
        .ebook-cover-border::before {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          right: 2px;
          bottom: 2px;
          border: 1px solid;
          border-color: inherit;
          opacity: 0.3;
          border-radius: 1px;
          pointer-events: none;
        }
        .ebook-cover-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          width: 100%;
          z-index: 4;
        }
        .ebook-cover-tag {
          font-size: 7px;
          font-weight: 800;
          letter-spacing: 0.2em;
          opacity: 0.65;
          margin-bottom: 2px;
        }
        .ebook-cover-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid;
          margin-bottom: 4px;
        }
        .ebook-cover-title {
          font-family: 'Playfair Display', 'Georgia', serif;
          font-size: 11px;
          font-weight: 900;
          line-height: 1.2;
          margin: 0 0 2px 0;
          letter-spacing: -0.01em;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .ebook-cover-subtitle {
          font-size: 8px;
          line-height: 1.3;
          margin: 0;
          font-weight: 600;
          max-width: 95%;
          opacity: 0.75;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .ebook-cover-footer-brand {
          font-size: 6.5px;
          font-weight: 800;
          letter-spacing: 0.08em;
          opacity: 0.5;
          margin-top: 4px;
          text-transform: uppercase;
        }

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
            <article 
              className={`catalog-card ${!p.is_free ? 'premium-card' : ''}`} 
              key={p.id}
              style={!p.is_free ? {
                border: '1.5px solid rgba(220, 161, 29, 0.25)',
                boxShadow: '0 10px 30px rgba(92, 56, 16, 0.06), 0 1px 3px rgba(220, 161, 29, 0.08)'
              } : {}}
            >
              <div className="catalog-img-box">
                <div className="book-3d-wrapper">
                  {renderEbookCover(p)}
                </div>
                <div className="catalog-badge-row">
                  <span className="catalog-badge type-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    {!p.is_free && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    )}
                    {p.is_free ? 'Free Resource' : 'Berbayar'}
                  </span>
                  <span className="catalog-badge audience-badge">{p.target_audience}</span>
                </div>
              </div>
              <div className="catalog-info">
                {!p.is_free && (
                  <div style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '4px', 
                    fontSize: '10px', 
                    fontWeight: '800', 
                    color: '#dca11d', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em',
                    marginBottom: '6px'
                  }}>
                    <span>★</span> Premium Edition
                  </div>
                )}
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="catalog-footer-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <span className={`price-tag ${p.is_free ? 'free-price' : ''}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {!p.is_free && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-brand-brown)' }}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    )}
                    {p.is_free ? 'GRATIS' : p.price}
                  </span>
                  <div style={{ display: 'flex', gap: '8px', flex: p.is_free ? '0 0 auto' : '1', justifyContent: 'flex-end', minWidth: 0 }}>
                    {p.is_free ? (
                      <>
                        <button onClick={() => handleDirectWAQuery(p)} className="secondary-button button-small">
                          Tanya WA
                        </button>
                        {p.embed_url ? (
                          <button 
                            onClick={() => {
                              setActiveEmbedUrl(p.embed_url);
                              setActiveEbookTitle(p.title);
                            }} 
                            className="button button-small" 
                            style={{ backgroundColor: 'var(--color-brand-green)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg>
                            Baca Online
                          </button>
                        ) : (
                          <button onClick={() => handleOpenCheckout(p)} className="button button-small">
                            Download ↗
                          </button>
                        )}
                      </>
                    ) : (
                      <button 
                        onClick={() => handleDirectWAQuery(p)} 
                        className="button button-small" 
                        style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: 'var(--color-brand-brown)', whiteSpace: 'nowrap' }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        Chat WA untuk Akses
                      </button>
                    )}
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
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-brand-brown)', fontSize: '14px', fontWeight: 800, marginBottom: '8px' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                          Instruksi Pembayaran (Transfer Bank)
                        </h4>
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
                      <a href={orderSuccess.downloadLink} target="_blank" rel="noreferrer" className="button" style={{ backgroundColor: 'var(--color-brand-green)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        Buka / Download PDF
                      </a>
                    )}
                    <a href={orderSuccess.whatsappUrl} target="_blank" rel="noreferrer" className="button" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                      Hubungi WhatsApp Admin (Konfirmasi)
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

      {/* Ebook Reader Modal */}
      {activeEmbedUrl && (
        <div className="modal-overlay" onClick={() => { setActiveEmbedUrl(null); setActiveEbookTitle(''); }}>
          <div className="modal-card" style={{ maxWidth: '960px', width: '90%', height: '80vh', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>Membaca Ebook</h2>
                <p style={{ fontSize: '13px', color: 'var(--color-brand-muted)' }}>{activeEbookTitle}</p>
              </div>
              <button className="modal-close-btn" onClick={() => { setActiveEmbedUrl(null); setActiveEbookTitle(''); }}>✕</button>
            </div>
            <div className="modal-body" style={{ flex: 1, padding: 0, overflow: 'hidden', position: 'relative' }}>
              <iframe 
                src={activeEmbedUrl} 
                frameBorder="0" 
                width="100%" 
                height="100%" 
                allowFullScreen={true} 
                mozallowfullscreen="true" 
                webkitallowfullscreen="true"
                style={{ border: 'none', width: '100%', height: '100%' }}
              ></iframe>
            </div>
            <div className="modal-footer" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(92, 56, 16, 0.08)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'var(--color-brand-muted)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/></svg>
                Ingin mengunduh berkas PDF? Hubungi Admin via WhatsApp.
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a 
                  href={`https://wa.me/${WHATSAPP_ADMIN}?text=${encodeURIComponent('Halo Fitrah Tumbuh, saya ingin meminta file unduhan untuk ' + activeEbookTitle + '.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="button button-small"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  Minta Unduh (WhatsApp)
                </a>
                <button onClick={() => { setActiveEmbedUrl(null); setActiveEbookTitle(''); }} className="secondary-button button-small">
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
