import express from "express";
import EWaste from "../models/EWaste.js";
import authMiddleware from "../middleware/authMiddleware.js"; // Protect routes

const router = express.Router();

// Submit e-waste request
router.post("/submit", authMiddleware, async (req, res) => {
  try {
    const { itemName, category, description, image, pickupAddress } = req.body;
    const newEWaste = new EWaste({
      userId: req.user.id,
      itemName,
      category,
      description,
      image,
      pickupAddress,
    });
    await newEWaste.save();
    res
      .status(201)
      .json({
        message: "E-Waste request submitted successfully",
        data: newEWaste,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get user's e-waste requests
router.get("/my-requests", authMiddleware, async (req, res) => {
  try {
    const requests = await EWaste.find({ userId: req.user.id });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
