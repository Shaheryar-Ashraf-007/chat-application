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

export async function getUserFriends() {
  const response = await axiosInstance.get("/users/friends");
  console.log("Friends Response:", response.data);
  return response.data;
}

export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/users");
  console.log("Recommended Users Response:", response.data);
  return response.data;
}

export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
}

export async function sendFriendRequest(userId) {

  try{
  const response = await axiosInstance.post(`/users/friend-requests/${userId}`);
  console.log("Send Friend Request Response:", response.data);
  
  return response.data;
  } catch(error){
    if (error.response) {
      console.error("Error details:", error.response.data);
      throw new Error(error.response.data.message || "Sending Friend Request failed"); // Rethrow with a message
    } else {
      console.error("Error:", error.message);
      throw new Error("Network error during Sending Friend Request"); // Rethrow with a message
    }
  }
}

export async function getFriendRequests() {
  try {
    const response = await axiosInstance.get("/users/friend-requests");
    console.log("Get Friend Requests Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching friend requests:", error.message);
    throw error; // Re-throw the error for further handling if needed
  }
}


export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(`/users/friend-requests/${requestId}/accept`);
  return response.data;
}

export async function getStreamToken() {
  try {
  const response = await axiosInstance.get("/chat/token");
  console.log("Stream Token Response:", response.data);
  return response.data;
}
catch (error) {
  console.error("Error fetching stream token:", error.message);
  throw error; // Re-throw the error for further handling if needed
}
}