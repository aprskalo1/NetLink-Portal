import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
console.log('API_BASE_URL:', API_BASE_URL);

const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authorizeFirebaseClient = async (firebaseToken: string): Promise<string> => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/Auth/AuthorizeFirebaseClient`,
            null,
            {
                params: {firebaseToken},
                responseType: 'text',
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error authorizing Firebase client:', error);
        throw error;
    }
};