import { Router } from 'express';
import { authenticateAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import { adminLogin, adminUploadFile, adminDeleteFile } from '../controllers/adminController.js';
import { 
  getStoreItems, 
  createStoreItem, 
  updateStoreItem, 
  deleteStoreItem 
} from '../controllers/storeController.js';
import {
  checkHealth,
  getPrograms,
  getPortfolio,
  createOrder,
  getOrders,
  createRegistration,
  getRegistrations,
  createTalentParticipant,
  getTalentParticipants
} from '../controllers/leadController.js';

const router = Router();

// Health Check
router.get('/health', checkHealth);

// Static data routes
router.get('/programs', getPrograms);
router.get('/portfolio', getPortfolio);

// Store items (storefront)
router.get('/store-items', getStoreItems);
router.post('/store-items', authenticateAdmin, createStoreItem);
router.put('/store-items/:id', authenticateAdmin, updateStoreItem);
router.delete('/store-items/:id', authenticateAdmin, deleteStoreItem);

// Leads & Submissions
router.post('/orders', createOrder);
router.get('/orders', authenticateAdmin, getOrders);

router.post('/registrations', createRegistration);
router.get('/registrations', authenticateAdmin, getRegistrations);

router.post('/talent-mapping', createTalentParticipant);
router.get('/talent-participants', authenticateAdmin, getTalentParticipants);

// Admin Authentication & Uploads
router.post('/admin/login', adminLogin);
router.post('/upload', authenticateAdmin, upload.single('file'), adminUploadFile);
router.delete('/upload/:filename', authenticateAdmin, adminDeleteFile);

export default router;
