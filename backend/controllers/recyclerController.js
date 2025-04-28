import Recycler from '../models/Recycler.js';
import User from '../models/User.js';

// Get nearby recyclers
export const getNearbyRecyclers = async (req, res) => {
  try {
    const { city } = req.query;
    const query = city ? { city } : {};
    const recyclers = await Recycler.find(query)
      .populate('userId', 'username email')
      .select('-__v');

    res.status(200).json({
      success: true,
      data: recyclers
    });
  } catch (error) {
    console.error('Error in getNearbyRecyclers:', error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch recyclers",
      error: error.message
    });
  }
};

// Register recycler
export const registerRecycler = async (req, res) => {
  try {
    const { companyName, city, address, acceptedWasteTypes } = req.body;
    const userId = req.user.id;

    // Check if recycler already registered
    const existingRecycler = await Recycler.findOne({ userId });
    if (existingRecycler) {
      return res.status(400).json({
        success: false,
        message: "Recycler already registered"
      });
    }

    // Create new recycler
    const recycler = new Recycler({
      userId,
      companyName,
      city,
      address,
      acceptedWasteTypes
    });

    await recycler.save();

    // Update user role to recycler
    await User.findByIdAndUpdate(userId, { role: 'recycler' });

    res.status(201).json({
      success: true,
      message: "Recycler registered successfully",
      data: recycler
    });

  } catch (error) {
    console.error('Error in registerRecycler:', error);
    res.status(500).json({
      success: false,
      message: "Error registering recycler",
      error: error.message
    });
  }
};

// Get recycler profile
export const getRecyclerProfile = async (req, res) => {
  try {
    const recycler = await Recycler.findOne({ userId: req.user.id })
      .populate('userId', 'username email');

    if (!recycler) {
      return res.status(404).json({
        success: false,
        message: "Recycler profile not found"
      });
    }

    res.json({
      success: true,
      data: recycler
    });

  } catch (error) {
    console.error('Error in getRecyclerProfile:', error);
    res.status(500).json({
      success: false,
      message: "Error fetching recycler profile",
      error: error.message
    });
  }
};