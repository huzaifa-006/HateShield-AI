import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const submitContactForm = async (formData) => {
  try {
    console.log('Sending request to:', `${API_URL}/contact/`);
    console.log('Request data:', formData);

    const response = await axios.post(`${API_URL}/contact/`, formData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      withCredentials: false
    });

    console.log('Response received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Contact form submission error:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      request: error.request,
      config: error.config
    });
    
    if (error.response) {
      console.error('Error response:', error.response.data);
      throw new Error(error.response.data.error || 'Failed to send message');
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response from server. Please check if the server is running at ' + API_URL);
    } else {
      console.error('Error setting up request:', error.message);
      throw new Error('Failed to send message. Please try again.');
    }
  }
}; 