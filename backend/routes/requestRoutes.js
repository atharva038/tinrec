import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import {
  createRequest,
  getUserRequests,
  getPendingRequests,
  getRecyclerRequests,
  // assignRequest,
  // completeRequest,
  acceptRequest // Make sure this controller is imported
} from '../controllers/requestController.js';

const router = express.Router();

// Create a new request
router.post('/', verifyToken, createRequest);

// Get all user requests
router.get('/user', verifyToken, getUserRequests);

// Get all pending requests (for admin)
router.get('/pending', verifyToken, getPendingRequests);

// Get requests for recycler
router.get('/recycler', verifyToken, getRecyclerRequests);

// Assign a request to a recycler
// router.patch('/:id/assign', verifyToken, assignRequest);

// Accept a request by recycler
router.patch('/:id/accept', verifyToken, acceptRequest); // Add this route if missing

// Mark request as completed
// router.patch('/:id/complete', verifyToken, completeRequest);

export default router;