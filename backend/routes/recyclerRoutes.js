import express from 'express';
import { getNearbyRecyclers, registerRecycler, getRecyclerProfile,updateRecyclerServices } from '../controllers/recyclerController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleCheck from '../middleware/roleCheck.js';

const router = express.Router();

// Public routes
router.get('/', getNearbyRecyclers); // This should match the /recyclers endpoint in your API calls


// Protected routes
router.post('/register', authMiddleware, roleCheck(['recycler']), registerRecycler);
router.get('/profile', authMiddleware, roleCheck(['recycler']), getRecyclerProfile);

// Update recycler services route
router.put('/services', authMiddleware, roleCheck(['recycler']), updateRecyclerServices);
export default router;