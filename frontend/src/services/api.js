import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Backend URL

// Signup API
export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Signup failed";
  }
};
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);

    console.log("API Response:", response.data); // ✅ Debugging log

    // Check if response contains token and user data
    if (!response.data.token || !response.data.user) {
      throw new Error("Invalid response format: Missing token or user");
    }

    // Store token correctly
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    console.error("Login API Error:", error.response?.data || error.message);
    throw error.response?.data?.message || "Login failed";
  }
};

// Get user details
export const getUserDetails = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch user";
  }
};

// Submit e-waste request
export const submitEWaste = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/ewaste/submit`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to submit e-waste request";
  }
};
export const getUserRequests = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/ewaste/my-requests`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching requests:", error);
    throw error;
  }
};
export const getNearbyRecyclers = async (city) => {
  try {
    const response = await axios.get(`${API_URL}/select-recycler`, {
      params: { city }, // Now city is correctly passed
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching recyclers:",
      error.response?.data?.message || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch recyclers."
    );
  }
};
