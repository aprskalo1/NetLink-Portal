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
            : "Login failed.";
        toast.error(errorMessage);
        throw error;
    }
};

export const fetchPaginatedEndUsers = async (page: number, pageSize: number, searchTerm = "") => {
    try {
        const response = await apiClient.get(`/api/EndUsers/ListPagedDevelopersEndUsers`, {
            params: {page, pageSize, searchTerm},
        });
        return response.data;
    } catch (error: unknown) {
        const errorMessage = error instanceof AxiosError && error.response?.data?.message
            ? error.response.data.message
            : "Failed to get end users.";
        toast.error(errorMessage);
        throw error;
    }
};

export const deactivateEndUser = async (endUserId: string) => {
    try {
        await apiClient.patch(`/api/EndUsers/DeactivateEndUser`, null, {params: {endUserId}});
        toast.success("End user deactivated successfully.");
    } catch (error: unknown) {
        const errorMessage = error instanceof AxiosError && error.response?.data?.message
            ? error.response.data.message
            : "Failed to deactivate end user.";
        toast.error(errorMessage);
        throw error;
    }
};

export const reactivateEndUser = async (endUserId: string) => {
    try {
        await apiClient.patch(`/api/EndUsers/ReactivateEndUser`, null, {params: {endUserId}});
        toast.success("End user reactivated successfully.");
    } catch (error: unknown) {
        const errorMessage = error instanceof AxiosError && error.response?.data?.message
            ? error.response.data.message
            : "Failed to reactivate end user.";
        toast.error(errorMessage);
        throw error;
    }
};

export const deleteEndUser = async (endUserId: string) => {
    try {
        await apiClient.patch(`/api/EndUsers/SoftDeleteEndUser`, null, {params: {endUserId}});
        toast.success("End user deleted successfully.");
    } catch (error: unknown) {
        const errorMessage = error instanceof AxiosError && error.response?.data?.message
            ? error.response.data.message
            : "Failed to delete end user.";
        toast.error(errorMessage);
        throw error;
    }
};

export const restoreEndUser = async (endUserId: string) => {
    try {
        await apiClient.patch(`/api/EndUsers/RestoreEndUser`, null, {params: {endUserId}});
        toast.success("End user restored successfully.");
    } catch (error: unknown) {
        const errorMessage = error instanceof AxiosError && error.response?.data?.message
            ? error.response.data.message
            : "Failed to restore end user.";
        toast.error(errorMessage);
        throw error;
    }
};

export const fetchPaginatedEndUserSensors = async (endUserId: string, page: number, pageSize: number, searchTerm = "") => {
    try {
        const response = await apiClient.get(`/api/EndUsers/ListPagedEndUserSensors`, {
            params: {endUserId, page, pageSize, searchTerm},
        });
        return response.data;
    } catch (error: unknown) {
        const errorMessage = error instanceof AxiosError && error.response?.data?.message
            ? error.response.data.message
            : "Failed to fetch sensors.";
        toast.error(errorMessage);
        throw error;
    }
};

export const fetchSensorDetails = async (sensorId: string, endUserId: string): Promise<Sensor> => {
    try {
        const response = await apiClient.get(`/api/Sensors/GetSensorById`, {
            params: {sensorId, endUserId},
        });
        return response.data;
    } catch (error: unknown) {
        const errorMessage = error instanceof AxiosError && error.response?.data?.message
            ? error.response.data.message
            : "Failed to fetch sensor details.";
        toast.error(errorMessage);
        throw error;
    }
};

export const deleteSensor = async (sensorId: string, endUserId: string) => {
    try {
        await apiClient.delete(`/api/Sensors/DeleteSensor`, {params: {sensorId, endUserId}});
        toast.success("Sensor deleted successfully.");
    } catch (error: unknown) {
        const errorMessage = error instanceof AxiosError && error.response?.data?.message
            ? error.response.data.message
            : "Failed to delete sensor.";
        toast.error(errorMessage);
        throw error;
    }
};

export const updateSensor = async (sensorId: string, endUserId: string, updatedSensorData: Partial<Sensor>) => {
    try {
        const response = await apiClient.put(`/api/Sensors/UpdateSensor`, updatedSensorData, {
            params: {sensorId, endUserId},
        });
        toast.success("Sensor updated successfully.");
        return response.data;
    } catch (error: unknown) {
        const errorMessage = error instanceof AxiosError && error.response?.data?.message
            ? error.response.data.message
            : "Failed to update sensor.";
        toast.error(errorMessage);
        throw error;
    }
};

export const addSensor = async (endUserId: string, newSensorData: Partial<Sensor>) => {
    try {
        const response = await apiClient.post(`/api/Sensors/AddSensor`, newSensorData, {
            params: {endUserId},
        });
        toast.success("Sensor added successfully.");
        return response.data;
    } catch (error: unknown) {
        const errorMessage = error instanceof AxiosError && error.response?.data?.message
            ? error.response.data.message
            : "Failed to add sensor.";
        toast.error(errorMessage);
        throw error;
    }
};

export const fetchRecordedValues = async (
    sensorId: string,
    endUserId: string,
    quantity?: number,
    isAscending: boolean = true,
    startDate?: string,
    endDate?: string
): Promise<RecordedValue[]> => {
    try {
        const response = await apiClient.get(`/api/RecordedValues/GetRecordedValues`, {
            params: {sensorId, endUserId, quantity, isAscending, startDate, endDate},
        });
        return response.data;
    } catch (error: unknown) {
        const errorMessage = error instanceof AxiosError && error.response?.data?.message
            ? error.response.data.message
            : "Failed to fetch recorded values.";
        toast.error(errorMessage);
        throw error;
    }
};

export const deleteDeveloper = async (developerId: string) => {
    try {
        await apiClient.delete(`/api/Developers/DeleteDeveloper`, {params: {developerId}});
    } catch (error: unknown) {
        const errorMessage = error instanceof AxiosError && error.response?.data?.message
            ? error.response.data.message
            : "Failed to delete developer.";
        throw new Error(errorMessage);
    }
};

export const fetchEndUserGroups = async (endUserId: string) => {
    try {
        const response = await apiClient.get(`/api/Grouping/GetEndUserGroups`, {
            params: {endUserId},
        });
        return response.data;
    } catch (error: unknown) {
        const errorMessage =
            error instanceof AxiosError && error.response?.data?.message
                ? error.response.data.message
                : "Failed to fetch groups.";
        toast.error(errorMessage);
        throw error;
    }
};

export const fetchSensorsFromGroup = async (groupId: string, endUserId: string): Promise<Sensor[]> => {
    try {
        const response = await apiClient.get(`/api/Sensors/GetSensorsFromGroup`, {
            params: {groupId, endUserId},
        });
        return response.data;
    } catch (error: unknown) {
        const errorMessage = error instanceof AxiosError && error.response?.data?.message
            ? error.response.data.message
            : "Failed to fetch sensors from the group.";
        toast.error(errorMessage);
        throw error;
    }
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