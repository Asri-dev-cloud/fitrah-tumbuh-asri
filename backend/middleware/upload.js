import path from 'path';
import fs from 'fs';
import multer from 'multer';

// Determine upload folder dynamically (local frontend public uploads or fallback)
const getUploadDir = () => {
  const frontendPublic = path.resolve('../frontend/public');
  const frontendPublicUploads = path.resolve('../frontend/public/uploads');
  
  if (fs.existsSync(frontendPublic)) {
    if (!fs.existsSync(frontendPublicUploads)) {
      fs.mkdirSync(frontendPublicUploads, { recursive: true });
    }
    return frontendPublicUploads;
  }
  
  const localUploads = path.resolve('uploads');
  if (!fs.existsSync(localUploads)) {
    fs.mkdirSync(localUploads, { recursive: true });
  }
  return localUploads;
};

// Multer storage config
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, getUploadDir());
  },
  filename: (_req, file, cb) => {
    const originalName = file.originalname;
    const cleanExt = path.extname(originalName);
    const cleanBase = path.basename(originalName, cleanExt)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');
    cb(null, `${cleanBase}-${Date.now()}${cleanExt}`);
  }
});

export const upload = multer({ storage });
