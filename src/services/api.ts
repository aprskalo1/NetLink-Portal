import axios, {AxiosError} from "axios";
import {toast} from "react-toastify";
import {Group, RecordedValue, Sensor} from "../types/types.ts";

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
    (error: unknown) => {
        if (error instanceof AxiosError) {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('accessToken');
                window.location.href = "/login";
            }
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
    } catch (error: unknown) {
        const errorMessage = error instanceof AxiosError && error.response?.data?.message
            ? error.response.data.message
            : "Oops! Something went wrong. Please try again later.";
        toast.error(errorMessage);
        throw error;
    }
};

export const fetchPaginatedEndUsers = async (page: number, pageSize: number, searchTerm = "") => {
    const response = await apiClient.get(`/api/EndUsers/ListPagedDevelopersEndUsers`, {
        params: {page, pageSize, searchTerm},
    });
    return response.data;
};

export const deactivateEndUser = async (endUserId: string) => {
    return await apiClient.patch(`/api/EndUsers/DeactivateEndUser`, null, {params: {endUserId}});
};

export const reactivateEndUser = async (endUserId: string) => {
    return await apiClient.patch(`/api/EndUsers/ReactivateEndUser`, null, {params: {endUserId}});
};

export const deleteEndUser = async (endUserId: string) => {
    return await apiClient.patch(`/api/EndUsers/SoftDeleteEndUser`, null, {params: {endUserId}});
};

export const restoreEndUser = async (endUserId: string) => {
    return await apiClient.patch(`/api/EndUsers/RestoreEndUser`, null, {params: {endUserId}});
};

export const fetchPaginatedEndUserSensors = async (endUserId: string, page: number, pageSize: number, searchTerm = "") => {
    const response = await apiClient.get(`/api/EndUsers/ListPagedEndUserSensors`, {
        params: {endUserId, page, pageSize, searchTerm},
    });
    return response.data;
};

export const fetchSensorDetails = async (sensorId: string, endUserId: string): Promise<Sensor> => {
    const response = await apiClient.get(`/api/Sensors/GetSensorById`, {
        params: {sensorId, endUserId},
    });
    return response.data;
};

export const deleteSensor = async (sensorId: string, endUserId: string) => {
    await apiClient.delete(`/api/Sensors/DeleteSensor`, {params: {sensorId, endUserId}});
};

export const updateSensor = async (sensorId: string, endUserId: string, updatedSensorData: Partial<Sensor>) => {
    const response = await apiClient.put(`/api/Sensors/UpdateSensor`, updatedSensorData, {
        params: {sensorId, endUserId},
    });
    return response.data;
};

export const addSensor = async (endUserId: string, newSensorData: Partial<Sensor>) => {
    const response = await apiClient.post(`/api/Sensors/AddSensor`, newSensorData, {
        params: {endUserId},
    });
    return response.data;
};

export const fetchRecordedValues = async (
    sensorId: string,
    endUserId: string,
    quantity?: number,
    isAscending: boolean = true,
    startDate?: string,
    endDate?: string
): Promise<RecordedValue[]> => {
    const response = await apiClient.get(`/api/RecordedValues/GetRecordedValues`, {
        params: {sensorId, endUserId, quantity, isAscending, startDate, endDate},
    });
    return response.data;
};

export const deleteDeveloper = async (developerId: string) => {
    await apiClient.delete(`/api/Developers/DeleteDeveloper`, {params: {developerId}});
};

export const fetchEndUserGroups = async (endUserId: string) => {
    const response = await apiClient.get(`/api/Grouping/GetEndUserGroups`, {
        params: {endUserId},
    });
    return response.data;
};

export const fetchSensorsFromGroup = async (groupId: string, endUserId: string): Promise<Sensor[]> => {
    const response = await apiClient.get(`/api/Sensors/GetSensorsFromGroup`, {
        params: {groupId, endUserId},
    });
    return response.data;
};

export const updateGroup = async (groupId: string, endUserId: string, groupName: string): Promise<Group> => {
    const response = await apiClient.put(`/api/Grouping/UpdateGroup`, {groupName}, {
        params: {groupId, endUserId},
    });
    return response.data;
};

export const deleteGroup = async (groupId: string, endUserId: string): Promise<void> => {
    await apiClient.delete(`/api/Grouping/DeleteGroup`, {params: {groupId, endUserId}});
};

export const addSensorsToGroup = async (groupId: string, sensorIds: string[], endUserId: string) => {
    const response = await apiClient.post(`/api/Grouping/AddSensorsToGroup`, sensorIds, {
        params: {groupId, endUserId}
    });
    return response.data;
};

export const removeSensorFromGroup = async (groupId: string, sensorId: string, endUserId: string) => {
    await apiClient.post(`/api/Grouping/RemoveSensorFromGroup`, null, {
        params: {groupId, sensorId, endUserId},
    });
};

export const createGroup = async (endUserId: string, groupName: string) => {
    const response = await apiClient.post(`/api/Grouping/CreateGroup`, {groupName}, {
        params: {endUserId},
    });
    return response.data;
};