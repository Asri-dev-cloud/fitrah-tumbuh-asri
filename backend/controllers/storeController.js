import pool from '../config/database.js';

// GET all store items
export const getStoreItems = async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM store_items');
    res.json(result.rows);
  } catch (error) {
    console.error('Get store items error:', error);
    res.status(500).json({ message: 'Gagal mengambil data produk storefront.' });
  }
};

// POST add new store item
export const createStoreItem = async (req, res) => {
  const { title, description, price, image_url, type, target_audience, whatsapp_text, download_link, is_free, embed_url, speaker, class_date, class_time, quota } = req.body;

  if (!title || !description || !price || !type || !target_audience) {
    return res.status(400).json({ message: 'Judul, deskripsi, harga, tipe, dan target audiens wajib diisi.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO store_items (title, description, price, image_url, type, target_audience, whatsapp_text, download_link, is_free, embed_url, speaker, class_date, class_time, quota) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
      [title, description, price, image_url || '', type, target_audience, whatsapp_text || '', download_link || '', is_free || false, embed_url || '', speaker || '', class_date || '', class_time || '', quota ? Number(quota) : 0]
    );
    res.status(201).json({ message: 'Produk berhasil ditambahkan!', item: result.rows[0] });
  } catch (error) {
    console.error('Add store item error:', error);
    res.status(500).json({ message: 'Gagal menambahkan produk ke database.' });
  }
};

// PUT update existing store item
export const updateStoreItem = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, image_url, type, target_audience, whatsapp_text, download_link, is_free, embed_url, speaker, class_date, class_time, quota } = req.body;

  if (!title || !description || !price || !type || !target_audience) {
    return res.status(400).json({ message: 'Judul, deskripsi, harga, tipe, dan target audiens wajib diisi.' });
  }

  try {
    const result = await pool.query(
      'UPDATE store_items SET title=$1, description=$2, price=$3, image_url=$4, type=$5, target_audience=$6, whatsapp_text=$7, download_link=$8, is_free=$9, embed_url=$10, speaker=$11, class_date=$12, class_time=$13, quota=$14 WHERE id=$15 RETURNING *',
      [title, description, price, image_url || '', type, target_audience, whatsapp_text || '', download_link || '', is_free || false, embed_url || '', speaker || '', class_date || '', class_time || '', quota ? Number(quota) : 0, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Produk tidak ditemukan.' });
    }
    res.json({ message: 'Produk berhasil diperbarui!', item: result.rows[0] });
  } catch (error) {
    console.error('Update store item error:', error);
    res.status(500).json({ message: 'Gagal memperbarui produk di database.' });
  }
};

// DELETE store item
export const deleteStoreItem = async (req, res) => {
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
};
