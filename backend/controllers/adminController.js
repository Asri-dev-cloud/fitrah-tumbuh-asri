/**
 * File: controllers/adminController.js
 * Deskripsi: Controller untuk menangani aksi admin seperti login, upload file, dan penghapusan file.
 */

import fs from 'fs';
import path from 'path';
import { ADMIN_TOKEN } from '../middleware/auth.js';

const getAdminPassword = () => process.env.ADMIN_PASSWORD || 'fitrahtumbuhadmin';

export const adminLogin = (req, res) => {
  const { password } = req.body;
  if (password === getAdminPassword()) {
    res.json({ success: true, token: ADMIN_TOKEN });
  } else {
    res.status(401).json({ success: false, message: 'Kata sandi salah.' });
  }
};

export const adminUploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Tidak ada berkas yang diunggah.' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ fileUrl });
};

export const adminDeleteFile = (req, res) => {
  const { filename } = req.params;
  
  // Clean filename to prevent path traversal
  const safeFilename = path.basename(filename);
  
  // Resolve potential locations
  const frontendPublicUploads = path.resolve('../frontend/public/uploads', safeFilename);
  const localUploads = path.resolve('uploads', safeFilename);
  
  try {
    if (fs.existsSync(frontendPublicUploads)) {
      fs.unlinkSync(frontendPublicUploads);
      return res.json({ message: 'Berkas berhasil dihapus dari frontend.' });
    } else if (fs.existsSync(localUploads)) {
      fs.unlinkSync(localUploads);
      return res.json({ message: 'Berkas berhasil dihapus dari backend.' });
    } else {
      return res.status(404).json({ message: 'Berkas tidak ditemukan.' });
    }
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({ message: 'Gagal menghapus berkas.' });
  }
};
