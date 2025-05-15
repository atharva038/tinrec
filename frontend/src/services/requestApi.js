import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create a new waste pickup request
export const createRequest = async (data, token) => {
  return await axios.post(`${API_URL}/requests`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Get all user requests
export const getUserRequests = async (token) => {
  return await axios.get(`${API_URL}/requests/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Get requests for a recycler
export const getRecyclerRequests = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/requests/recycler`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("Error in getRecyclerRequests:", error);
    throw error;
  }
};

// Assign a request to a recycler
export const assignRequest = async (requestId, token) => {
  return await axios.patch(
    `${API_URL}/requests/${requestId}/assign`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// Mark request as completed
export const completeRequest = async (requestId, token) => {
  return await axios.patch(
    `${API_URL}/requests/${requestId}/complete`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// Accept request by recycler
export const acceptRequest = async (requestId, token) => {
  try {
    console.log(`Accepting request ${requestId}`);
    const response = await axios.patch(
      `${API_URL}/requests/${requestId}/accept`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Accept request response:", response);
    return response;
  } catch (error) {
    console.error("Error in acceptRequest:", error);
    throw error;
  }
};