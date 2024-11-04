import axios from "axios";
import {Sensor} from "../types/types.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

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

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('accessToken');
            window.location.href = "/login"; // Adjust the path as needed
        }
        return Promise.reject(error);
    }
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

export const fetchPaginatedEndUsers = async (page: number, pageSize: number, searchTerm = "") => {
    try {
        const response = await apiClient.get(`/api/EndUsers/ListPagedDevelopersEndUsers`, {
            params: {page, pageSize, searchTerm},
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching paginated end users:", error);
        throw error;
    }
};

export const deactivateEndUser = async (endUserId: string) => {
    return apiClient.patch(`/api/EndUsers/DeactivateEndUser`, null, {params: {endUserId}});
};

export const reactivateEndUser = async (endUserId: string) => {
    return apiClient.patch(`/api/EndUsers/ReactivateEndUser`, null, {params: {endUserId}});
};

export const deleteEndUser = async (endUserId: string) => {
    return apiClient.patch(`/api/EndUsers/SoftDeleteEndUser`, null, {params: {endUserId}});
};

export const restoreEndUser = async (endUserId: string) => {
    return apiClient.patch(`/api/EndUsers/RestoreEndUser`, null, {params: {endUserId}});
};

export const fetchPaginatedEndUserSensors = async (endUserId: string, page: number, pageSize: number, searchTerm = "") => {
    try {
        const response = await apiClient.get(`/api/EndUsers/ListPagedEndUserSensors`, {
            params: {endUserId, page, pageSize, searchTerm},
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching paginated end user sensors:", error);
        throw error;
    }
};

export const fetchSensorDetails = async (sensorId: string, endUserId: string): Promise<Sensor> => {
    try {
        const response = await apiClient.get(`/api/Sensors/GetSensorById`, {
            params: {sensorId, endUserId},
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching sensor details:", error);
        throw error;
    }
};

export const deleteSensor = async (sensorId: string, endUserId: string) => {
    try {
        await apiClient.delete(`/api/Sensors/DeleteSensor`, {params: {sensorId, endUserId}});
    } catch (error) {
        console.error("Error deleting sensor:", error);
        throw error;
    }
}

export const updateSensor = async (sensorId: string, endUserId: string, updatedSensorData: Partial<Sensor>) => {
    try {
        const response = await apiClient.put(`/api/Sensors/UpdateSensor`, updatedSensorData, {
            params: {sensorId, endUserId},
        });
        return response.data;
    } catch (error) {
        console.error("Error updating sensor:", error);
        throw error;
    }
};

export const addSensor = async (endUserId: string, newSensorData: Partial<Sensor>) => {
    try {
        const response = await apiClient.post(`/api/Sensors/AddSensor`, newSensorData, {
            params: {endUserId},
        });
        return response.data;
    } catch (error) {
        console.error("Error adding sensor:", error);
        throw error;
    }
};