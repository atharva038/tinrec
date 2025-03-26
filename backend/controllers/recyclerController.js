import Recycler from "../models/Recycler.js"; // Assuming you have a Recycler model

export const getNearbyRecyclers = async (req, res) => {
  try {
    const { city } = req.query; // Get city from request query

    const query = city ? { city } : {}; // Filter by city if provided
    const recyclers = await Recycler.find(query);

    res.status(200).json(recyclers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recyclers" });
  }
};
