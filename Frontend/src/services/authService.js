import axios from "axios";

// const API_URL = "http://localhost:4646/api/auth"; // Your backend URL
const API_URL = "http://localhost:8000"; // Your backend URL

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user/signup/`, userData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Server Error";
  }
};

export const testApi = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/login/`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Server Error";
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/user/login/`, credentials, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Server Error";
  }
};

export const changePassword = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/user/change-password/`, credentials, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Server Error";
  }
};

// export const refreshToken = async () => {
//   try {
//     const response = await axios.post(`${API_URL}/refresh`);
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : "Server Error";
//   }
// };

// export const resetPassword = async (data) => {
//   try {
//     const response = await axios.post(`${API_URL}/resetPassword`, data);
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : "Server Error";
//   }
// };

// export const resendConfirmationEmail = async (email) => {
//   try {
//     const response = await axios.post(`${API_URL}/resendConfirmationEmail`, { email });
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : "Server Error";
//   }
// };

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to get current user' };
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/user/logout/`, {}, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Server Error";
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/user/forgot-password/`, { email }, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Server Error";
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/user/reset-password/`, { 
      token, 
      newPassword 
    }, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Server Error";
  }
};

export const verifyResetToken = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/user/verify-reset-token/`, { token }, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Server Error";
  }
};
