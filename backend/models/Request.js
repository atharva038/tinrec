import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recyclerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recycler",
      default: null,
    },
    wasteType: { type: String, required: true },
    quantity: { type: String, required: true },
    weight: {
      value: { type: Number },
      unit: { type: String, enum: ["kg", "g"], default: "kg" },
    },
    location: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending Assignment", "Assigned", "Accepted", "Completed"],
      default: "Pending Assignment",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Request", requestSchema);
