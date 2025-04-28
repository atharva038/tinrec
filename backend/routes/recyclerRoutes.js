import express from 'express';
import { getNearbyRecyclers, registerRecycler, getRecyclerProfile } from '../controllers/recyclerController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleCheck from '../middleware/roleCheck.js';

const router = express.Router();

// Public routes
router.get('/select-recycler', getNearbyRecyclers);

// Protected routes
router.post('/register', authMiddleware, roleCheck(['recycler']), registerRecycler);
router.get('/profile', authMiddleware, roleCheck(['recycler']), getRecyclerProfile);

export default router;