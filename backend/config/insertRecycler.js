import mongoose from "mongoose";
import dotenv from "dotenv";
import Recycler from "../models/Recycler.js"; // Adjust the path if needed
import path from "path";
import { fileURLToPath } from "url";

// Ensure correct path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("🔍 MONGO_URI:", process.env.MONGO_URI || "❌ Not Found!");
const recyclers = [
  {
    userId: "65fe7c7d4b9c4a1234567890",
    companyName: "GreenTech Recyclers",
    city: "Mumbai",
    location: { type: "Point", coordinates: [72.8777, 19.076] },
    acceptedWasteTypes: ["Electronics", "Batteries"],
    availability: true,
  },
  {
    userId: "65fe7c7d4b9c4a0987654321",
    companyName: "Eco-Friendly Recycling",
    city: "Mumbai",
    location: { type: "Point", coordinates: [72.8584, 19.1225] },
    acceptedWasteTypes: ["Mobile Phones", "Laptops"],
    availability: true,
  },
  {
    userId: "65fe7c7d4b9c4a1111111111",
    companyName: "Sustainable Solutions",
    city: "Pune",
    location: { type: "Point", coordinates: [73.8567, 18.5204] },
    acceptedWasteTypes: ["Cables", "Plastics"],
    availability: true,
  },
  {
    userId: "65fe7c7d4b9c4a2222222222",
    companyName: "EarthCare Recyclers",
    city: "Delhi",
    location: { type: "Point", coordinates: [77.1025, 28.7041] },
    acceptedWasteTypes: ["Electronics", "Laptops"],
    availability: false,
  },
  {
    userId: "65fe7c7d4b9c4a2222222223",
    companyName: "Earth Recyclers",
    city: "Latur",
    location: { type: "Point", coordinates: [77.1025, 28.7041] },
    acceptedWasteTypes: ["Electronics", "Laptops"],
    availability: false,
  },
];

const insertData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Recycler.insertMany(recyclers);
    console.log("✅ Recyclers added successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error inserting recyclers:", error);
    mongoose.connection.close();
  }
};

insertData();
