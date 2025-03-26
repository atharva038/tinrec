import Request from "../models/Request.js";

// ✅ Create a new request
export const createRequest = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("User Info:", req.user);

    const { wasteType, quantity, weight, unit,location, recyclerId } =
      req.body;

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
    const requests = await Request.find({ recyclerId: req.user.id });
    res.status(200).json(requests);
  } catch (error) {
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
    const requestId = req.params.id;
    const recyclerId = req.user.id; // Recycler's ID from auth middleware

    const request = await Request.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    // Update the request with the recycler's ID
    request.recyclerId = recyclerId;
    request.status = "Accepted";
    await request.save();

    res.json({ message: "Request accepted successfully", request });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error accepting request", error: error.message });
  }
};
