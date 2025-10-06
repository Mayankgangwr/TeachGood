import type { IOrganizationResponse, ListData } from "../../types/response.types";
import { handleApiRequest } from "../../utils/apiRequest";
import axiosInstance from "../services/axiosInstance";

class OrganizationsController {
    // Insert a new organization
    async insertOrganization(orgPayload: any): Promise<IOrganizationResponse> {
        const response = await handleApiRequest<IOrganizationResponse>(() =>
            axiosInstance.post(`/organization`, orgPayload, {
                headers: { "Content-Type": "multipart/form-data" }
            })
        );
        return response;
    }

    // Update an existing organization
    async updateOrganization(orgId: string, orgPayload: any): Promise<IOrganizationResponse> {
        const response = await handleApiRequest<IOrganizationResponse>(() =>
            axiosInstance.patch(`/organization/${orgId}`, orgPayload,
                { headers: { "Content-Type": "multipart/form-data" } }
            )
        );
        return response;
    }


    // Get a organization
    async getOrganization(): Promise<IOrganizationResponse> {
        const response = await handleApiRequest<IOrganizationResponse>(() => axiosInstance.get("/organization"));
        return response;
    }

    // Get a single organization by ID
    async getOrganizationById(orgId: string): Promise<IOrganizationResponse> {
        const response = await handleApiRequest<IOrganizationResponse>(() =>
            axiosInstance.get(`/organization/${orgId}`)
        );
        return response;
    }

    // Delete an organization
    async deleteOrganization(orgId: string): Promise<boolean> {
        const response = await handleApiRequest<boolean>(() =>
            axiosInstance.delete(`/organization/${orgId}`)
        );
        return response;
    }
}

const organizationsController = new OrganizationsController();
export default organizationsController;
