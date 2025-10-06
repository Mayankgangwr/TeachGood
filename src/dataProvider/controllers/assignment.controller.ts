import type { IAssignmentPayload } from "../../types/payload.types";
import { handleApiRequest } from "../../utils/apiRequest";
import axiosInstance from "../services/axiosInstance";

class AssignmentController {
    public async insertAssignment(assignmentPayload: IAssignmentPayload): Promise<any> {
        const response = await handleApiRequest<any>(() => axiosInstance.post("/assignments", assignmentPayload));
        return response;
    }

    public async updateAssignment(assignmentId: string, assignmentPayload: IAssignmentPayload): Promise<any> {
        const response = await handleApiRequest<any>(() => axiosInstance.post(`/assignments/${assignmentId}`, assignmentPayload));
        return response;
    }

    public async getAssignmentById(assignmentId: string): Promise<any> {
        const response = await handleApiRequest<any>(() => axiosInstance.get(`/assignments/${assignmentId}`));
        return response;
    }

    public async getAssignments(): Promise<any> {
        const response = await handleApiRequest<any>(() => axiosInstance.get(`/assignments`));
        return response;
    }

    public async submitAssignment(assignmentSubmitionPayload: any): Promise<any> {
        const response = await handleApiRequest<any>(() =>
            axiosInstance.post(`/submitted-assignment`, assignmentSubmitionPayload,
                { headers: { "Content-Type": "multipart/form-data" } }
            ));
        return response;
    }
}

const assignmentController = new AssignmentController();
export default assignmentController;