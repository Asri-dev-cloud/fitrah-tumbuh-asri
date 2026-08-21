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

app.listen(PORT, () => {
  console.log(`Clean registration server running on port ${PORT}`);
});
