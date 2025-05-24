import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Register as a recycler
export const registerRecycler = async (data, token) => {
  return await axios.post(`${API_URL}/recyclers/register`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Get all recyclers
export const getRecyclers = async () => {
  return await axios.get(`${API_URL}/recyclers`);
};

// Get recycler profile
export const getRecyclerProfile = async (token) => {
  return await axios.get(`${API_URL}/recyclers/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
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

// Update the getNearbyRecyclers function to accept coordinates
export const getNearbyRecyclers = async (city, coordinates = null) => {
  let url = `${API_URL}/recyclers?city=${city}`;

  // Add coordinates to query if available
  if (coordinates) {
    url += `&lat=${coordinates.lat}&lng=${coordinates.lng}`;
  }

  return await axios.get(url);
};

// Update recycler services
export const updateRecyclerServices = async (data, token) => {
  return await axios.put(`${API_URL}/recyclers/services`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};