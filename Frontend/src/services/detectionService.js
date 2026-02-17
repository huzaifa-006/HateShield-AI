import axios from 'axios';

const BASE_URL = 'http://localhost:8000/';

export const detectHateSpeech = async (text, file = null) => {
    try {
        const formData = new FormData();
        if (text) formData.append('text', text);
        if (file) formData.append('file', file);

        const response = await axios.post(`${BASE_URL}detection/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        console.log('API Response:', response.data);
        
        // Return the complete response including detection_id and results
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response?.data || error);
        throw new Error(error.response?.data?.error || 'Error detecting hate speech');
    }
};

export const submitFeedback = async (detectionId, rating, comment = '') => {
    try {
        const response = await axios.post(`${BASE_URL}feedback/`, {
            detection_id: detectionId,
            rating: rating,
            comment: comment
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log('Feedback Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Feedback API Error:', error.response?.data || error);
        throw new Error(error.response?.data?.error || 'Error submitting feedback');
    }
};
