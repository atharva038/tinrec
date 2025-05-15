import Request from "../models/Request.js";
import Recycler from "../models/Recycler.js";

// ✅ Create a new request
export const createRequest = async (req, res) => {
  try {
    const { wasteType, quantity, weight, unit, location, recyclerId } = req.body;

    const newRequest = new Request({
      userId: req.user.id,
      recyclerId,
      wasteType,
      quantity: quantity || null,
      weight: weight ? { value: weight, unit } : null,
      location,
      status: "Pending Assignment",
    });

    await newRequest.save();
    res
      .status(201)
      .json({ message: "Request created successfully", request: newRequest });
  } catch (error) {
    console.error("Error in createRequest:", error);
    res
      .status(500)
      .json({ message: "Failed to create request", error: error.message });
  }
};

// ✅ Get all user requests
export const getUserRequests = async (req, res) => {
  try {
    const requests = await Request.find({ userId: req.user.id });
    res.status(200).json(requests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user requests", error: error.message });
  }
};

// ✅ Get all recycler-assigned requests
export const getRecyclerRequests = async (req, res) => {
  try {

    const recycler = await Recycler.findOne({ userId: req.user.id });
    if (!recycler) {
      return res.status(404).json({ message: "Recycler profile not found" });
    }
    const assignedRequests = await Request.find({
      recyclerId: recycler._id
    });

    const pendingRequests = await Request.find({
      status: "Pending Assignment",
      recyclerId: { $exists: false }
    });
    const assignedIds = assignedRequests.map(req => req._id.toString());

    // Filter out any pending requests that might have the same ID
    const filteredPendingRequests = pendingRequests.filter(
      req => !assignedIds.includes(req._id.toString())
    );

    // Combine both result sets
    const requests = [...assignedRequests, ...filteredPendingRequests];
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error in getRecyclerRequests:", error);
    res.status(500).json({
      message: "Error fetching recycler requests",
      error: error.message,
    });
  }
};

// ✅ Get all pending e-waste requests
export const getPendingRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      status: "Pending Assignment",
    }).populate("userId", "username email");
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching pending requests",
      error: error.message,
    });
  }
};

// ✅ Recycler accepts a request
export const acceptRequest = async (req, res) => {
  try {
    console.log("Accept request called for ID:", req.params.id);
    const requestId = req.params.id;

    // First find the recycler profile for this user
    const recycler = await Recycler.findOne({ userId: req.user.id });

    if (!recycler) {
      console.log("No recycler profile found for user ID:", req.user.id);
      return res.status(404).json({ message: "Recycler profile not found" });
    }

    console.log("Found recycler:", recycler._id);

    // Get the request
    const request = await Request.findById(requestId);
    if (!request) {
      console.log("No request found with ID:", requestId);
      return res.status(404).json({ message: "Request not found" });
    }

    console.log("Found request:", request._id, "with status:", request.status);

    // Update the request with the recycler's ID
    request.recyclerId = recycler._id;
    request.status = 'Accepted';
    await request.save();

    console.log("Request updated to Accepted status");

    res.status(200).json({
      message: "Request accepted successfully",
      request
    });
  } catch (error) {
    console.error("Error in acceptRequest controller:", error);
    res.status(500).json({
      message: "Error accepting request",
      error: error.message
    });
  }
};
