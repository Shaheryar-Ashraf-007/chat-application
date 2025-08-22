import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  try {
    const response = await axiosInstance.post('/auth/signup', signupData);
    return response.data; // Return the actual data, not the entire response object
  } catch (error) {
    if (error.response) {
      console.error("Error details:", error.response.data);
      throw new Error(error.response.data.message || "Signup failed"); // Rethrow with a message
    } else {
      console.error("Error:", error.message);
      throw new Error("Network error during signup"); // Rethrow with a message
    }
  }
};

export const login = async (loginData) => {
  try {
    const response = await axiosInstance.post("/auth/login", loginData);
    console.log("Login Response:", response.data); // Check response structure

    const token = response.data.token; // Access the token from the response
    if (token) {
      localStorage.setItem('authToken', token); // Save the token
    } else {
      console.error("Token not found in the response");
    }

    return response.data; 
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // Rethrow the error
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data; // Return the actual data
  } catch (error) {
    console.error("Error during logout:", error);
    throw error; // Rethrow the error
  }
};

export const getAuthUser = async () => {
  const token = localStorage.getItem('authToken');
  console.log("Token:", token);
  
  if (!token) {
    console.log("No token found");
    return null; // User is not authenticated
  }

  try {
    const response = await axiosInstance.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Authenticated User Data:", response.data);
    return response.data; // Return the user data
  } catch (error) {
    console.error('Error fetching authenticated user:', error);
    throw error; // Rethrow or handle as needed
  }
};


export const completeOnboarding = async (userData) => {

  const response = await axiosInstance.post('/auth/onboarding', userData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  });

  return response.data; 

}