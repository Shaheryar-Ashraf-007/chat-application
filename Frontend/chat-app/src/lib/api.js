import axios from "axios";
import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};
export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const getAuthUser = async () => {
  const token = localStorage.getItem('authToken'); // Adjust according to your storage method
  try {
    const response = await axios.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
    
  } catch (error) {
    console.error('Error fetching authenticated user:', error);
    throw error; // Rethrow or handle it as needed
  }
};
