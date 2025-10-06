import type { IDepartmentPayload } from "../../types/payload.types";
import type { IDepartmentResponse, ListData } from "../../types/response.types";
import { handleApiRequest } from "../../utils/apiRequest";
import axiosInstance from "../services/axiosInstance";

class DepartmentController {
    async insertDepartment(payload: IDepartmentPayload): Promise<IDepartmentResponse> {
        const response = await handleApiRequest<IDepartmentResponse>(() =>
            axiosInstance.post(`/departments`, payload)
        );
        return response;
    }

    async updateDepartment(departmentId: string, payload: IDepartmentPayload): Promise<IDepartmentResponse> {
        const response = await handleApiRequest<IDepartmentResponse>(() =>
            axiosInstance.patch(`/departments/${departmentId}`, payload)
        );
        return response;
    }

    async getDepartmentList(query: Record<string, any>): Promise<ListData<IDepartmentResponse[]>> {
        const response = await handleApiRequest<ListData<IDepartmentResponse[]>>(() =>
            axiosInstance.get("/departments", { params: query })
        );
        return response;
    }

    async getDepartmentById(departmentId: string): Promise<IDepartmentResponse> {
        const response = await handleApiRequest<IDepartmentResponse>(() =>
            axiosInstance.get(`/departments/${departmentId}`)
        );
        return response;
    }

    async deleteDepartment(departmentId: string): Promise<boolean> {
        const response = await handleApiRequest<boolean>(() =>
            axiosInstance.delete(`/departments/${departmentId}`)
        );
        return response;
    }

    async hardDeleteDepartment(departmentId: string): Promise<boolean> {
        const response = await handleApiRequest<boolean>(() =>
            axiosInstance.delete(`/departments/${departmentId}/hard`)
        );
        return response;
    }
}

const departmentController = new DepartmentController();
export default departmentController;
