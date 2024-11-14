import axios from "axios";
import {toast} from "react-toastify";

interface ValidationErrorResponse {
    title: string;
    errors: Record<string, string[]>;
}

export const handleAxiosError = (
    error: unknown,
    defaultMessage = "An unexpected error occurred. Please try again."
) => {
    if (axios.isAxiosError(error)) {
        const {status, data} = error.response || {};

        if (status === 400 && (data as ValidationErrorResponse)?.errors) {
            const errorData = data as ValidationErrorResponse;
            Object.values(errorData.errors).flat().forEach((message) => toast.error(message));
            return;
        }

        if (data?.message) {
            toast.error(data.message);
            return;
        }
    }

    toast.error(defaultMessage);
};
