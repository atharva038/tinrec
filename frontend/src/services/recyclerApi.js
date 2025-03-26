import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Register as a recycler
export const registerRecycler = async (data, token) => {
  return await axios.post(`${API_URL}/recyclers`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Get all recyclers
export const getRecyclers = async () => {
  return await axios.get(`${API_URL}/recyclers`);
};

// Update recycler availability
export const updateAvailability = async (recyclerId, availability, token) => {
  return await axios.patch(
    `${API_URL}/recyclers/${recyclerId}/availability`,
    { availability },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// Get nearby recyclers
export const getNearbyRecyclers = async (lat, lng) => {
  return await axios.get(`${API_URL}/recyclers/nearby?lat=${lat}&lng=${lng}`);
};
