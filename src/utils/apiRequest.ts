import type { AxiosResponse } from "axios";
import type { IApiResponse } from "../types/response.types";

/**
 * Generic API handler with global Redux loading management.
 */
export async function handleApiRequest<T>(
    apiCall: () => Promise<AxiosResponse<IApiResponse<T>>>
): Promise<T> {
    try {
        const response = await apiCall();
        const { status, data, message } = response.data;

        if (!status) throw new Error(message || "Request failed.");

        return data;
    } catch (error: any) {
        const apiMessage = error?.response?.data?.message;
        const fallbackMessage = error?.message || "Unexpected API error.";
        throw new Error(apiMessage || fallbackMessage);
    }
}
