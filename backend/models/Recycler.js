import mongoose from "mongoose";

const recyclerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: { type: String, required: true },
    city: { type: String, required: true, trim: true }, // ✅ Added city field
    location: {
      type: { type: String, default: "Point" },
      coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
    acceptedWasteTypes: [{ type: String }], // Example: ['Plastic', 'Electronics']
    availability: { type: Boolean, default: true },
  },
  { timestamps: true }
);

recyclerSchema.index({ location: "2dsphere" }); // Enables geospatial queries

export default mongoose.model("Recycler", recyclerSchema);
