import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import apiRouter from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files statically from both potential upload locations
app.use('/uploads', express.static(path.resolve('uploads')));
app.use('/uploads', express.static(path.resolve('../frontend/public/uploads')));

// Mount Centralized API Routes
app.use('/api', apiRouter);

// Start server locally (if not deployed on Vercel serverless)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Clean registration server running on port ${PORT}`);
  });
}

export default app;
