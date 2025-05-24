import express from "express";
import { 
    register, 
    login, 
    getCurrentUser, 
    forgotPassword, 
    resetPassword,
    updateProfile 
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post("/signup", register);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & get token
 * @access  Public
 */
router.post("/login", login);

/**
 * @route   GET /api/auth/current-user
 * @desc    Get current user data from token
 * @access  Public (with token)
 */
router.get("/current-user", getCurrentUser);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Request password reset email
 * @access  Public
 */
router.post("/forgot-password", forgotPassword);

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset password with token
 * @access  Public (with reset token)
 */
router.post("/reset-password", resetPassword);

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put("/profile", authMiddleware, updateProfile);

export default router;