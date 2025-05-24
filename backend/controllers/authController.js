import User from "../models/User.js";
import Recycler from "../models/Recycler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user
export const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Input validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Password strength validation (at least 6 characters)
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || "user"
        });
        await newUser.save();

        // Generate token
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" } // Extending token validity to 7 days for better UX
        );

        // Return successful response with token and user info
        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT Token with role included in payload
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" } // Extending token validity to 7 days
        );

        // Check if recycler is registered (only for recycler role)
        let isRecyclerRegistered = false;
        if (user.role === 'recycler') {
            const recyclerProfile = await Recycler.findOne({ userId: user._id });
            isRecyclerRegistered = !!recyclerProfile;
        }

        // Return response with token, user info, and registration status
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            isRecyclerRegistered
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get current user from token
export const getCurrentUser = async (req, res) => {
    try {
        // Get token from header
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from database
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check recycler registration status
        let isRecyclerRegistered = false;
        if (user.role === 'recycler') {
            const recyclerProfile = await Recycler.findOne({ userId: user._id });
            isRecyclerRegistered = !!recyclerProfile;
        }

        // Return user data and registration status
        res.json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            isRecyclerRegistered
        });
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

// Request password reset
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            // For security, don't reveal that the email doesn't exist
            return res.status(200).json({ message: "If this email exists, a reset link has been sent" });
        }

        // Generate reset token (expires in 1 hour)
        const resetToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET + user.password, // Add password hash to make token invalidate when password changes
            { expiresIn: "1h" }
        );

        // Store token and expiration in database
        user.resetToken = resetToken;
        user.resetTokenExpires = Date.now() + 3600000; // 1 hour from now
        await user.save();

        // TODO: Send email with reset link
        // For now, just return success message
        res.status(200).json({
            message: "If this email exists, a reset link has been sent",
            // In development, return the token for testing
            resetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined
        });
    } catch (err) {
        console.error("Password reset request error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Reset password with token
export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ message: "Token and new password are required" });
        }

        // Find user with this reset token and make sure it's not expired
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Verify the token
        try {
            jwt.verify(token, process.env.JWT_SECRET + user.password);
        } catch (err) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Password strength validation
        if (newPassword.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password and clear reset token fields
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpires = undefined;
        await user.save();

        res.json({ message: "Password has been reset successfully" });
    } catch (err) {
        console.error("Password reset error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Update user profile
export const updateProfile = async (req, res) => {
    try {
        const { username, email, currentPassword, newPassword } = req.body;

        // Get user ID from authenticated request
        const userId = req.user.id;

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update username if provided
        if (username) {
            user.username = username;
        }

        // Update email if provided (and different from current)
        if (email && email !== user.email) {
            // Check if email is already taken by another user
            const existingUser = await User.findOne({ email, _id: { $ne: userId } });
            if (existingUser) {
                return res.status(400).json({ message: "Email is already in use" });
            }
            user.email = email;
        }

        // Update password if both current and new passwords are provided
        if (currentPassword && newPassword) {
            // Verify current password
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Current password is incorrect" });
            }

            // Validate new password
            if (newPassword.length < 6) {
                return res.status(400).json({ message: "New password must be at least 6 characters long" });
            }

            // Hash and set new password
            user.password = await bcrypt.hash(newPassword, 10);
        }

        // Save updates
        await user.save();

        res.json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error("Update profile error:", err);
        res.status(500).json({ message: "Server error" });
    }
};