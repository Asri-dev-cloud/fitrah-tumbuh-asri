-- ==========================================================================
-- Schema Database untuk Fitrah Tumbuh Asri
-- Semua komentar menggunakan Bahasa Indonesia
-- ==========================================================================

-- Hapus tabel lama jika sudah ada (untuk memulai ulang dari bersih)
DROP TABLE IF EXISTS registrations CASCADE;
DROP TABLE IF EXISTS programs CASCADE;
DROP TABLE IF EXISTS portfolio_items CASCADE;
DROP TABLE IF EXISTS talent_participants CASCADE;
DROP TABLE IF EXISTS store_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;

-- 1. Tabel Registrasi / Pendaftaran Kemitraan (Pentahelix, Relawan, Magang, dll.)
CREATE TABLE registrations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  whatsapp VARCHAR(100) NOT NULL,
  institution VARCHAR(255) NOT NULL,
  cooperation_type VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabel Program Utama (Ditampilkan di halaman Program & Ecosystem)
CREATE TABLE programs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabel Item Portofolio (Ditampilkan di halaman Portofolio)
CREATE TABLE portfolio_items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabel Peserta Talent Mapping (Menyimpan data peserta dan jawaban asesmen ST30)
CREATE TABLE talent_participants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INTEGER,
  institution VARCHAR(255),
  answers JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabel Item Storefront (Menyimpan Produk Digital, Kelas, Layanan Jasa)
CREATE TABLE store_items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price VARCHAR(100) NOT NULL,
  image_url VARCHAR(255),
  type VARCHAR(50) NOT NULL,
  target_audience VARCHAR(100) NOT NULL,
  whatsapp_text TEXT,
  download_link VARCHAR(255),
  is_free BOOLEAN DEFAULT FALSE,
  speaker VARCHAR(255),
  class_date VARCHAR(100),
  class_time VARCHAR(100),
  quota INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Tabel Pemesanan & Leads Pelanggan (Database Pelanggan)
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255), -- Opsional
  whatsapp VARCHAR(100) NOT NULL,
  product_id INTEGER REFERENCES store_items(id) ON DELETE SET NULL,
  product_title VARCHAR(255) NOT NULL,
  notes TEXT,
  category VARCHAR(100),
  source_info VARCHAR(255),
  institution VARCHAR(255),
  execution_time VARCHAR(100),
  segment VARCHAR(100), -- Orangtua/Pemuda/Pekerja/Organisasi
  interest VARCHAR(255), -- Produk/kelas yang diminati
  source VARCHAR(255), -- IG/Website/Referral
  status VARCHAR(50) DEFAULT 'Lead', -- Lead/Customer/Alumni
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================================================
-- Pengisian Data Awal (Seed Data)
-- Sangat disarankan dimasukkan ke database agar tampilan web tidak kosong
-- ==========================================================================

-- Data awal untuk Program
INSERT INTO programs (title, description, image_url, sort_order) VALUES
  ('Literasi Numerasi Menyenangkan', 'Pendekatan belajar membaca, menulis, dan berhitung yang menyenangkan dan kontekstual.', '/calistung.png', 1),
  ('Belajar Bersama Alam', 'Pengalaman belajar langsung di alam yang menumbuhkan rasa ingin tahu dan kreativitas.', '/Eksplorasi.png', 2),
  ('Berkebun & Beternak', 'Program healing farm yang mengajarkan tanggung jawab, kesabaran, dan nilai kehidupan.', '/Healing Farm.png', 3),
  ('Hiking Pemuda & Keluarga', 'Ekspedisi alam yang membangun karakter, kepemimpinan, dan ikatan komunitas.', '/Hiking.png', 4),
  ('Program Magang', 'Pengalaman kerja nyata yang membekali pemuda dengan keterampilan profesional.', '/Magang.png', 5),
  ('Inkubasi UMKM', 'Pendampingan usaha bagi ibu rumah tangga dan pemuda untuk mandiri secara ekonomi.', '/UMKM.png', 6);

-- Data awal untuk Portofolio
INSERT INTO portfolio_items (title, description, image_url, sort_order) VALUES
  ('Ruang Tumbuh Belajar', 'Area belajar bersama anak-anak untuk membangun kecakapan literasi, nalar kritis, dan pembentukan karakter dasar secara konkret.', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80', 1),
  ('Kebun Belajar Organik', 'Pembelajaran budidaya sayuran organik terpadu yang melatih kesabaran, kedisiplinan, dan kedekatan langsung anak dengan tanah.', 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80', 2),
  ('Healing Farm & Restorasi', 'Program pemulihan jiwa berbasis aktivitas pertanian untuk memulihkan kedamaian mental pemuda dan keluarga.', 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80', 3),
  ('Hiking & Kemah Keluarga', 'Perjalanan alam terbuka untuk membangun ketahanan fisik, memupuk komunikasi, dan mempererat kehangatan hubungan keluarga.', 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=900&q=80', 4),
  ('Program Magang Pemuda', 'Pendampingan berbasis proyek nyata untuk membekali generasi muda dengan nalar bisnis etis dan keterampilan kolaboratif.', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80', 5),
  ('Inkubasi UMKM Lokal', 'Pendampingan wirausaha mikro lokal di Bandung-Sumedang agar mampu berdaya saing dengan kemasan nilai lokal yang kuat.', 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80', 6);

-- Data awal untuk Storefront (Produk, Kelas, Jasa, Free)
INSERT INTO store_items (title, description, price, image_url, type, target_audience, whatsapp_text, download_link, is_free, speaker, class_date, class_time, quota) VALUES
  ('Family Growth Toolkit', 'Kumpulan aktivitas kreatif dan instrumen reflektif mingguan untuk membangun bonding dan kebiasaan baik dalam keluarga.', 'Rp 35.000', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80', 'digital_product', 'Orangtua', 'Halo Fitrah Tumbuh, saya ingin memesan Family Growth Toolkit.', '', false, '', '', '', 0),
  ('Career Reset Workbook', 'Modul refleksi mendalam bagi pekerja untuk menata ulang arah karir yang selaras dengan passion dan fitrah kepribadian.', 'Rp 45.000', 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80', 'digital_product', 'Pekerja', 'Halo Fitrah Tumbuh, saya ingin memesan Career Reset Workbook.', '', false, '', '', '', 0),
  ('Youth Project Starter Kit', 'Panduan taktis bagi pemuda untuk merancang, mengelola, dan meluncurkan proyek sosial atau bisnis mikro pertamanya.', 'Rp 69.000', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80', 'digital_product', 'Pemuda', 'Halo Fitrah Tumbuh, saya ingin memesan Youth Project Starter Kit.', '', false, '', '', '', 0),
  ('Fitrah Family Activity Cards', 'Kartu permainan seru bertema alam dan reflektif untuk memeriahkan piknik atau akhir pekan keluarga.', 'Rp 59.000', 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80', 'digital_product', 'Orangtua', 'Halo Fitrah Tumbuh, saya ingin memesan Fitrah Family Activity Cards.', '', false, '', '', '', 0),
  ('Tumbuh Session - Career Alignment', 'Mini class interaktif untuk menemukan keselarasan karir berbasis bakat fitrah.', 'Rp 120.000', 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80', 'digital_learning', 'Pekerja', 'Halo Fitrah Tumbuh, saya ingin mendaftar Kelas Tumbuh Session - Career Alignment.', '', false, 'Coach Arif', '28 Aug 2026', '19:30 WIB', 25),
  ('Webinar Talent Discovery & Career Direction', 'Webinar eksplorasi diri untuk membidik arah karir masa depan bagi pemuda/mahasiswa.', 'Rp 50.000', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80', 'digital_learning', 'Pemuda', 'Halo Fitrah Tumbuh, saya ingin mendaftar Webinar Talent Discovery.', '', false, 'Coach Budi', '30 Aug 2026', '10:00 WIB', 50),
  ('Jasa Desain Program Sekolah / Komunitas', 'Jasa merancang kurikulum belajar berbasis alam dan potensi fitrah murid untuk sekolah/komunitas.', 'Hubungi Admin', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80', 'project_service', 'Sekolah & Komunitas', 'Halo Fitrah Tumbuh, saya ingin berkonsultasi mengenai Jasa Desain Program Sekolah/Komunitas.', '', false, '', '', '', 0),
  ('Fitrah Family Check: Seberapa Bertumbuh Keluarga Kita?', 'PDF & kuesioner asesmen mandiri singkat untuk memetakan tingkat kedekatan dan kematangan keluarga.', 'Rp 0', 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=600&q=80', 'digital_product', 'Orangtua', 'Halo Fitrah Tumbuh, saya ingin mengunduh Fitrah Family Check secara gratis.', 'https://fitrahtumbuh.id/downloads/family-check.pdf', true, '', '', '', 0),
  ('Youth Project Starter Checklist', 'Checklist taktis berisi 15 langkah fundamental dalam meluncurkan proyek sosial bagi pemuda.', 'Rp 0', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80', 'digital_product', 'Pemuda', 'Halo Fitrah Tumbuh, saya ingin mengunduh Youth Project Starter Checklist secara gratis.', 'https://fitrahtumbuh.id/downloads/youth-checklist.pdf', true, '', '', '', 0);
