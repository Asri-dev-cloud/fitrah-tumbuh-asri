import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('WARNING: DATABASE_URL environment variable is not defined. Please define it in your .env file.');
}

const pool = new Pool({
  connectionString,
  ssl: connectionString && (connectionString.includes('supabase') || connectionString.includes('neon') || connectionString.includes('render'))
    ? { rejectUnauthorized: false }
    : false
});

let usePostgres = false;

// Test connection on startup
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.warn('Database connection failed. Falling back to local JSON database. Error:', err.message);
    usePostgres = false;
  } else {
    console.log('Database connected successfully at:', res.rows[0].now);
    usePostgres = true;
  }
});

// JSON Fallback database implementation
const dbJsonPath = path.resolve('data/db.json');

function readJsonDb() {
  const initialDb = {
    programs: [
      { id: 1, title: 'Literasi Numerasi Menyenangkan', description: 'Pendekatan belajar membaca, menulis, dan berhitung yang menyenangkan and kontekstual.', image_url: '/calistung.png', sort_order: 1 },
      { id: 2, title: 'Belajar Bersama Alam', description: 'Pengalaman belajar langsung di alam yang menumbuhkan rasa ingin tahu dan kreativitas.', image_url: '/Eksplorasi.png', sort_order: 2 },
      { id: 3, title: 'Berkebun & Beternak', description: 'Program healing farm yang mengajarkan tanggung jawab, kesabaran, dan nilai kehidupan.', image_url: '/Healing Farm.png', sort_order: 3 },
      { id: 4, title: 'Hiking Pemuda & Keluarga', description: 'Ekspedisi alam yang membangun karakter, kepemimpinan, dan ikatan komunitas.', image_url: '/Hiking.png', sort_order: 4 },
      { id: 5, title: 'Program Magang', description: 'Pengalaman kerja nyata yang membekali pemuda dengan keterampilan profesional.', image_url: '/Magang.png', sort_order: 5 },
      { id: 6, title: 'Inkubasi UMKM', description: 'Pendampingan usaha bagi ibu rumah tangga dan pemuda untuk mandiri secara ekonomi.', image_url: '/UMKM.png', sort_order: 6 }
    ],
    portfolio_items: [
      { id: 1, title: 'Ruang Tumbuh Belajar', description: 'Area belajar bersama anak-anak untuk membangun kecakapan literasi, nalar kritis, dan pembentukan karakter dasar secara konkret.', image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80', sort_order: 1 },
      { id: 2, title: 'Kebun Belajar Organik', description: 'Pembelajaran budidaya sayuran organik terpadu yang melatih kesabaran, kedisiplinan, dan kedekatan langsung anak dengan tanah.', image_url: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80', sort_order: 2 },
      { id: 3, title: 'Healing Farm & Restorasi', description: 'Program pemulihan jiwa berbasis aktivitas pertanian untuk memulihkan kedamaian mental pemuda dan keluarga.', image_url: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80', sort_order: 3 },
      { id: 4, title: 'Hiking & Kemah Keluarga', description: 'Perjalanan alam terbuka untuk membangun ketahanan fisik, memupuk komunikasi, dan mempererat kehangatan hubungan keluarga.', image_url: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=900&q=80', sort_order: 4 },
      { id: 5, title: 'Program Magang Pemuda', description: 'Pendampingan berbasis proyek nyata untuk membekali generasi muda dengan nalar bisnis etis dan keterampilan kolaboratif.', image_url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80', sort_order: 5 },
      { id: 6, title: 'Inkubasi UMKM Lokal', description: 'Pendampingan wirausaha mikro lokal di Bandung-Sumedang agar mampu berdaya saing dengan kemasan nilai lokal yang kuat.', image_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80', sort_order: 6 }
    ],
    registrations: [],
    talent_participants: [],
    store_items: [
      {
        id: 1,
        title: "Family Growth Toolkit",
        description: "Kumpulan aktivitas kreatif dan instrumen reflektif mingguan untuk membangun bonding dan kebiasaan baik dalam keluarga.",
        price: "Rp 35.000",
        image_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
        type: "digital_product",
        target_audience: "Orangtua",
        whatsapp_text: "Halo Fitrah Tumbuh, saya ingin memesan Family Growth Toolkit.",
        download_link: "",
        is_free: false,
        speaker: "",
        class_date: "",
        class_time: "",
        quota: 0
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
        download_link: "",
        is_free: false,
        speaker: "",
        class_date: "",
        class_time: "",
        quota: 0
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
        download_link: "",
        is_free: false,
        speaker: "",
        class_date: "",
        class_time: "",
        quota: 0
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
        download_link: "",
        is_free: false,
        speaker: "",
        class_date: "",
        class_time: "",
        quota: 0
      },
      {
        id: 5,
        title: "Tumbuh Session - Career Alignment",
        description: "Mini class interaktif untuk menemukan keselarasan karir berbasis bakat fitrah.",
        price: "Rp 120.000",
        image_url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
        type: "digital_learning",
        target_audience: "Pekerja",
        whatsapp_text: "Halo Fitrah Tumbuh, saya ingin mendaftar Kelas Tumbuh Session - Career Alignment.",
        download_link: "",
        is_free: false,
        speaker: "Coach Arif",
        class_date: "28 Aug 2026",
        class_time: "19:30 WIB",
        quota: 25
      },
      {
        id: 6,
        title: "Webinar Talent Discovery & Career Direction",
        description: "Webinar eksplorasi diri untuk membidik arah karir masa depan bagi pemuda/mahasiswa.",
        price: "Rp 50.000",
        image_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
        type: "digital_learning",
        target_audience: "Pemuda",
        whatsapp_text: "Halo Fitrah Tumbuh, saya ingin mendaftar Webinar Talent Discovery.",
        download_link: "",
        is_free: false,
        speaker: "Coach Budi",
        class_date: "30 Aug 2026",
        class_time: "10:00 WIB",
        quota: 50
      },
      {
        id: 7,
        title: "Jasa Desain Program Sekolah / Komunitas",
        description: "Jasa merancang kurikulum belajar berbasis alam dan potensi fitrah murid untuk sekolah/komunitas.",
        price: "Hubungi Admin",
        image_url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
        type: "project_service",
        target_audience: "Sekolah & Komunitas",
        whatsapp_text: "Halo Fitrah Tumbuh, saya ingin berkonsultasi mengenai Jasa Desain Program Sekolah/Komunitas.",
        download_link: "",
        is_free: false,
        speaker: "",
        class_date: "",
        class_time: "",
        quota: 0
      },
      {
        id: 8,
        title: "Fitrah Family Check: Seberapa Bertumbuh Keluarga Kita?",
        description: "PDF & kuesioner asesmen mandiri singkat untuk memetakan tingkat kedekatan dan kematangan keluarga.",
        price: "Rp 0",
        image_url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=600&q=80",
        type: "digital_product",
        target_audience: "Orangtua",
        whatsapp_text: "Halo Fitrah Tumbuh, saya ingin mengunduh Fitrah Family Check secara gratis.",
        download_link: "https://fitrahtumbuh.id/downloads/family-check.pdf",
        is_free: true,
        speaker: "",
        class_date: "",
        class_time: "",
        quota: 0
      },
      {
        id: 9,
        title: "Youth Project Starter Checklist",
        description: "Checklist taktis berisi 15 langkah fundamental dalam meluncurkan proyek sosial bagi pemuda.",
        price: "Rp 0",
        image_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
        type: "digital_product",
        target_audience: "Pemuda",
        whatsapp_text: "Halo Fitrah Tumbuh, saya ingin mengunduh Youth Project Starter Checklist secara gratis.",
        download_link: "https://fitrahtumbuh.id/downloads/youth-checklist.pdf",
        is_free: true,
        speaker: "",
        class_date: "",
        class_time: "",
        quota: 0
      }
    ],
    orders: []
  };

  try {
    const dir = path.dirname(dbJsonPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(dbJsonPath)) {
      fs.writeFileSync(dbJsonPath, JSON.stringify(initialDb, null, 2));
    }
    return JSON.parse(fs.readFileSync(dbJsonPath, 'utf8'));
  } catch (err) {
    console.warn('JSON database read failed. Using in-memory fallback. Error:', err.message);
    return global._inMemoryDb || initialDb;
  }
}

function writeJsonDb(data) {
  try {
    fs.writeFileSync(dbJsonPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.warn('JSON database write failed. Using in-memory fallback. Error:', err.message);
    global._inMemoryDb = data;
  }
}

function queryJson(text, params) {
  const db = readJsonDb();
  const normalizedSql = text.replace(/\s+/g, ' ').trim().toLowerCase();

  // 0. SELECT NOW() (for health checks)
  if (normalizedSql.startsWith('select now()')) {
    return { rows: [{ now: new Date().toISOString() }] };
  }

  // 1. SELECT programs
  if (normalizedSql.startsWith('select title, description, image_url from programs')) {
    const rows = db.programs.map(p => ({
      title: p.title,
      description: p.description,
      image_url: p.image_url
    }));
    return { rows };
  }

  // 2. SELECT portfolio_items
  if (normalizedSql.startsWith('select title, description as text, image_url as image from portfolio_items')) {
    const rows = db.portfolio_items.map(p => ({
      title: p.title,
      text: p.description,
      image: p.image_url
    }));
    return { rows };
  }

  // 3. SELECT store_items
  if (normalizedSql.startsWith('select * from store_items') || normalizedSql.includes('from store_items')) {
    const rows = [...db.store_items].reverse();
    return { rows };
  }

  // 4. SELECT registrations
  if (normalizedSql.startsWith('select * from registrations') || normalizedSql.includes('from registrations')) {
    const rows = [...db.registrations].reverse();
    return { rows };
  }

  // 5. SELECT talent_participants
  if (normalizedSql.startsWith('select * from talent_participants') || normalizedSql.includes('from talent_participants')) {
    const rows = [...db.talent_participants].reverse();
    return { rows };
  }

  // 6. SELECT orders
  if (normalizedSql.startsWith('select * from orders') || normalizedSql.includes('from orders')) {
    const rows = [...db.orders].reverse();
    return { rows };
  }

  // 7. INSERT registrations
  if (normalizedSql.startsWith('insert into registrations')) {
    const newItem = {
      id: db.registrations.length > 0 ? Math.max(...db.registrations.map(r => r.id)) + 1 : 1,
      name: params[0],
      email: params[1],
      whatsapp: params[2],
      institution: params[3],
      cooperation_type: params[4],
      message: params[5],
      created_at: new Date().toISOString()
    };
    db.registrations.push(newItem);
    writeJsonDb(db);
    return { rows: [newItem] };
  }

  // 8. INSERT talent_participants
  if (normalizedSql.startsWith('insert into talent_participants')) {
    const newItem = {
      id: db.talent_participants.length > 0 ? Math.max(...db.talent_participants.map(t => t.id)) + 1 : 1,
      name: params[0],
      age: params[1],
      institution: params[2],
      answers: params[3],
      created_at: new Date().toISOString()
    };
    db.talent_participants.push(newItem);
    writeJsonDb(db);
    return { rows: [newItem] };
  }

  // 9. INSERT orders
  if (normalizedSql.startsWith('insert into orders')) {
    const newItem = {
      id: db.orders.length > 0 ? Math.max(...db.orders.map(o => o.id)) + 1 : 1,
      name: params[0],
      email: params[1] || '',
      whatsapp: params[2],
      product_id: params[3],
      product_title: params[4],
      notes: params[5],
      category: params[6] || null,
      source_info: params[7] || null,
      institution: params[8] || null,
      execution_time: params[9] || null,
      // New requested columns:
      segment: params[10] || params[6] || 'Umum',
      interest: params[11] || params[4] || null,
      source: params[12] || params[7] || 'Website',
      status: params[13] || 'Lead',
      created_at: new Date().toISOString()
    };
    db.orders.push(newItem);
    writeJsonDb(db);
    return { rows: [newItem] };
  }

  // 10. INSERT store_items
  if (normalizedSql.startsWith('insert into store_items')) {
    // (title, description, price, image_url, type, target_audience, whatsapp_text, download_link, is_free, speaker, class_date, class_time, quota)
    const newItem = {
      id: db.store_items.length > 0 ? Math.max(...db.store_items.map(s => s.id)) + 1 : 1,
      title: params[0],
      description: params[1],
      price: params[2],
      image_url: params[3],
      type: params[4],
      target_audience: params[5],
      whatsapp_text: params[6],
      download_link: params[7],
      is_free: params[8] === true || params[8] === 'true',
      speaker: params[9] || '',
      class_date: params[10] || '',
      class_time: params[11] || '',
      quota: params[12] ? Number(params[12]) : 0,
      created_at: new Date().toISOString()
    };
    db.store_items.push(newItem);
    writeJsonDb(db);
    return { rows: [newItem] };
  }

  // 11. UPDATE store_items
  if (normalizedSql.startsWith('update store_items')) {
    // SET title=$1, description=$2, price=$3, image_url=$4, type=$5, target_audience=$6, whatsapp_text=$7, download_link=$8, is_free=$9, speaker=$10, class_date=$11, class_time=$12, quota=$13 WHERE id=$14
    const id = params[13];
    const index = db.store_items.findIndex(s => s.id === Number(id));
    if (index !== -1) {
      db.store_items[index] = {
        ...db.store_items[index],
        title: params[0],
        description: params[1],
        price: params[2],
        image_url: params[3],
        type: params[4],
        target_audience: params[5],
        whatsapp_text: params[6],
        download_link: params[7],
        is_free: params[8] === true || params[8] === 'true',
        speaker: params[9] || '',
        class_date: params[10] || '',
        class_time: params[11] || '',
        quota: params[12] ? Number(params[12]) : 0
      };
      writeJsonDb(db);
      return { rows: [db.store_items[index]] };
    }
    return { rows: [] };
  }

  // 12. DELETE FROM store_items
  if (normalizedSql.startsWith('delete from store_items')) {
    const id = params[0];
    const originalCount = db.store_items.length;
    db.store_items = db.store_items.filter(s => s.id !== Number(id));
    writeJsonDb(db);
    return { rowCount: originalCount - db.store_items.length };
  }

  console.warn('Unhandled fallback query:', text);
  return { rows: [] };
}

const dbWrapper = {
  query: async (text, params) => {
    if (usePostgres) {
      try {
        return await pool.query(text, params);
      } catch (err) {
        console.warn('Postgres query failed, falling back to JSON db. Error:', err.message);
        return queryJson(text, params);
      }
    } else {
      return queryJson(text, params);
    }
  }
};

export default dbWrapper;
