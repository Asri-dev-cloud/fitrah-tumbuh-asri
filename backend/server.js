import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    const result = await pool.query('SELECT NOW() AS now');
    res.json({ ok: true, dbTime: result.rows[0].now });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({ ok: false, message: 'Database unavailable' });
  }
});

app.get('/api/programs', async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT title, description, image_url FROM programs ORDER BY sort_order ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get programs error:', error);
    res.status(500).json({ message: 'Gagal mengambil data program.' });
  }
});

app.get('/api/portfolio', async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT title, description AS text, image_url AS image FROM portfolio_items ORDER BY sort_order ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({ message: 'Gagal mengambil data portofolio.' });
  }
});

// POST /api/registrations - Submit cooperation form
app.post('/api/registrations', async (req, res) => {
  const { name, email, whatsapp, institution, cooperation_type, message } = req.body;

  if (!name || !email || !whatsapp || !institution || !cooperation_type || !message) {
    return res.status(400).json({ message: 'Semua kolom harus diisi.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO registrations (name, email, whatsapp, institution, cooperation_type, message) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, email, whatsapp, institution, cooperation_type, message]
    );
    res.status(201).json({
      message: 'Pendaftaran kerjasama berhasil dikirim!',
      registration: result.rows[0]
    });
  } catch (error) {
    console.error('Registration insertion error:', error);
    res.status(500).json({ message: 'Gagal mengirim pendaftaran kerjasama.' });
  }
});

// POST /api/talent-mapping - record participant basic info (and optional answers)
app.post('/api/talent-mapping', async (req, res) => {
  const { name, age, institution, answers } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Nama wajib diisi.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO talent_participants (name, age, institution, answers) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, age || null, institution || null, answers || null]
    );

    res.status(201).json({ message: 'Participant saved', participant: result.rows[0] });
  } catch (error) {
    console.error('Talent mapping insertion error:', error);
    res.status(500).json({ message: 'Gagal menyimpan participant.' });
  }
});

// ==========================================================================
// API Storefront & Admin Panel
// ==========================================================================

const ADMIN_TOKEN = 'ft-admin-super-token-2026';
const getAdminPassword = () => process.env.ADMIN_PASSWORD || 'fitrahtumbuhadmin';

// Middleware to authenticate admin requests
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader === `Bearer ${ADMIN_TOKEN}`) {
    next();
  } else {
    res.status(401).json({ message: 'Akses ditolak. Token tidak valid.' });
  }
};

// POST /api/admin/login - Authenticate admin panel
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === getAdminPassword()) {
    res.json({ success: true, token: ADMIN_TOKEN });
  } else {
    res.status(401).json({ success: false, message: 'Kata sandi salah.' });
  }
});

// GET /api/store-items - Fetch all digital products, classes, services
app.get('/api/store-items', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM store_items');
    res.json(result.rows);
  } catch (error) {
    console.error('Get store items error:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk storefront.' });
  }
});

// POST /api/store-items - Admin: Add new product/class/service
app.post('/api/store-items', authenticateAdmin, async (req, res) => {
  const { title, description, price, image_url, type, target_audience, whatsapp_text, download_link, is_free, speaker, class_date, class_time, quota } = req.body;

  if (!title || !description || !price || !type || !target_audience) {
    return res.status(400).json({ message: 'Judul, deskripsi, harga, tipe, dan target audiens wajib diisi.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO store_items (title, description, price, image_url, type, target_audience, whatsapp_text, download_link, is_free, speaker, class_date, class_time, quota) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
      [title, description, price, image_url || '', type, target_audience, whatsapp_text || '', download_link || '', is_free || false, speaker || '', class_date || '', class_time || '', quota ? Number(quota) : 0]
    );
    res.status(201).json({ message: 'Produk berhasil ditambahkan!', item: result.rows[0] });
  } catch (error) {
    console.error('Add store item error:', error);
    res.status(500).json({ message: 'Gagal menambahkan produk ke database.' });
  }
});

// PUT /api/store-items/:id - Admin: Edit existing product/class/service
app.put('/api/store-items/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, description, price, image_url, type, target_audience, whatsapp_text, download_link, is_free, speaker, class_date, class_time, quota } = req.body;

  if (!title || !description || !price || !type || !target_audience) {
    return res.status(400).json({ message: 'Judul, deskripsi, harga, tipe, dan target audiens wajib diisi.' });
  }

  try {
    const result = await pool.query(
      'UPDATE store_items SET title=$1, description=$2, price=$3, image_url=$4, type=$5, target_audience=$6, whatsapp_text=$7, download_link=$8, is_free=$9, speaker=$10, class_date=$11, class_time=$12, quota=$13 WHERE id=$14 RETURNING *',
      [title, description, price, image_url || '', type, target_audience, whatsapp_text || '', download_link || '', is_free || false, speaker || '', class_date || '', class_time || '', quota ? Number(quota) : 0, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Produk tidak ditemukan.' });
    }
    res.json({ message: 'Produk berhasil diperbarui!', item: result.rows[0] });
  } catch (error) {
    console.error('Update store item error:', error);
    res.status(500).json({ message: 'Gagal memperbarui produk di database.' });
  }
});

// DELETE /api/store-items/:id - Admin: Delete product/class/service
app.delete('/api/store-items/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM store_items WHERE id=$1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Produk tidak ditemukan.' });
    }
    res.json({ message: 'Produk berhasil dihapus!' });
  } catch (error) {
    console.error('Delete store item error:', error);
    res.status(500).json({ message: 'Gagal menghapus produk.' });
  }
});

// GET /api/orders - Admin: Retrieve customer database (leads)
app.get('/api/orders', authenticateAdmin, async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders');
    res.json(result.rows);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Gagal mengambil data pesanan pelanggan.' });
  }
});

// POST /api/orders - Submit customer purchase/download order (lead collection)
app.post('/api/orders', async (req, res) => {
  const { name, email, whatsapp, product_id, product_title, notes, category, source_info, institution, execution_time } = req.body;

  if (!name || !whatsapp || !product_title) {
    return res.status(400).json({ message: 'Nama, whatsapp, dan judul produk wajib diisi.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO orders (name, email, whatsapp, product_id, product_title, notes, category, source_info, institution, execution_time, segment, interest, source, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
      [
        name, 
        email || '', 
        whatsapp, 
        product_id || null, 
        product_title, 
        notes || '', 
        category || null, 
        source_info || null, 
        institution || null, 
        execution_time || null,
        category || 'Umum',
        product_title,
        source_info || 'Website',
        'Lead'
      ]
    );
    res.status(201).json({
      message: 'Pemesanan berhasil disimpan!',
      order: result.rows[0]
    });
  } catch (error) {
    console.error('Save order error:', error);
    res.status(500).json({ message: 'Gagal menyimpan pesanan pelanggan.' });
  }
});

// POST /api/registrations - Submit cooperation registration (lead capture)
app.post('/api/registrations', async (req, res) => {
  const { name, email, whatsapp, institution, cooperation_type, message } = req.body;

  if (!name || !whatsapp || !institution || !cooperation_type || !message) {
    return res.status(400).json({ message: 'Nama, whatsapp, instansi, jenis kemitraan, dan deskripsi pesan wajib diisi.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO registrations (name, email, whatsapp, institution, cooperation_type, message) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, email || '', whatsapp, institution, cooperation_type, message]
    );
    res.status(201).json({
      message: 'Pendaftaran kemitraan berhasil disimpan!',
      registration: result.rows[0]
    });
  } catch (error) {
    console.error('Save registration error:', error);
    res.status(500).json({ message: 'Gagal menyimpan pendaftaran kemitraan.' });
  }
});

// POST /api/talent-mapping - Save talent mapping participant (lead capture)
app.post('/api/talent-mapping', async (req, res) => {
  const { name, age, institution, answers } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Nama wajib diisi untuk memulai asesmen.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO talent_participants (name, age, institution, answers) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, age ? Number(age) : null, institution || '', answers ? JSON.stringify(answers) : null]
    );
    res.status(201).json({
      message: 'Data peserta berhasil disimpan!',
      participant: result.rows[0]
    });
  } catch (error) {
    console.error('Save talent participant error:', error);
    res.status(500).json({ message: 'Gagal menyimpan data peserta talent mapping.' });
  }
});

// GET /api/registrations - Admin: Retrieve registrations list
app.get('/api/registrations', authenticateAdmin, async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM registrations');
    res.json(result.rows);
  } catch (error) {
    console.error('Get registrations error:', error);
    res.status(500).json({ message: 'Gagal mengambil data pendaftaran.' });
  }
});

// GET /api/talent-participants - Admin: Retrieve talent mapping assessment results
app.get('/api/talent-participants', authenticateAdmin, async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM talent_participants');
    res.json(result.rows);
  } catch (error) {
    console.error('Get talent participants error:', error);
    res.status(500).json({ message: 'Gagal mengambil data asesmen talent mapping.' });
  }
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Clean registration server running on port ${PORT}`);
  });
}

export default app;
