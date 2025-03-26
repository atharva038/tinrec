import mongoose from "mongoose";

const eWasteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // Store image URL or file path
  pickupAddress: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Collected"],
    default: "Pending",
  },
  recycler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  }, // ✅ Add recycler field
  createdAt: { type: Date, default: Date.now },
});

const EWaste = mongoose.model("EWaste", eWasteSchema);
export default EWaste;
