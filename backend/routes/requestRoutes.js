import express from "express";
import {
  getPendingRequests,
  acceptRequest,
  createRequest,
  getUserRequests,
  getRecyclerRequests,
} from "../controllers/requestController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create a new request (User only)
router.post("/", authMiddleware,createRequest);

// ✅ Get all user requests (User only)
router.get("/user", authMiddleware, getUserRequests);

// ✅ Get all recycler-assigned requests (Recycler only)
router.get("/recycler", authMiddleware, getRecyclerRequests);

// ✅ Recycler accepts a request
router.put("/accept/:id", authMiddleware, acceptRequest);

// ✅ Get all pending e-waste requests (Recycler only)
router.get("/pending", authMiddleware, getPendingRequests);

export default router;
