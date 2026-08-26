/**
 * File: controllers/leadController.js
 * Deskripsi: Controller untuk menangani data leads, pendaftaran kemitraan, asesmen mandiri talent mapping, serta data halaman statis.
 */

import pool from '../config/database.js';

// GET health check
export const checkHealth = async (_req, res) => {
  try {
    const result = await pool.query('SELECT NOW() AS now');
    res.json({ ok: true, dbTime: result.rows[0].now });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({ ok: false, message: 'Database unavailable' });
  }
};

// GET programs
export const getPrograms = async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT title, description, image_url FROM programs ORDER BY sort_order ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get programs error:', error);
    res.status(500).json({ message: 'Gagal mengambil data program.' });
  }
};

// GET portfolio
export const getPortfolio = async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT title, description AS text, image_url AS image FROM portfolio_items ORDER BY sort_order ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({ message: 'Gagal mengambil data portofolio.' });
  }
};

// POST Submit order (lead)
export const createOrder = async (req, res) => {
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
};

// GET all orders (Admin)
export const getOrders = async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders');
    res.json(result.rows);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Gagal mengambil data pesanan pelanggan.' });
  }
};

// POST cooperation registration (lead)
export const createRegistration = async (req, res) => {
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
};

// GET all registrations (Admin)
export const getRegistrations = async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM registrations');
    res.json(result.rows);
  } catch (error) {
    console.error('Get registrations error:', error);
    res.status(500).json({ message: 'Gagal mengambil data pendaftaran.' });
  }
};

// POST talent mapping participant (lead)
export const createTalentParticipant = async (req, res) => {
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
};

// GET all talent mapping participants (Admin)
export const getTalentParticipants = async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM talent_participants');
    res.json(result.rows);
  } catch (error) {
    console.error('Get talent participants error:', error);
    res.status(500).json({ message: 'Gagal mengambil data asesmen talent mapping.' });
  }
};
