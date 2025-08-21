import type { IAssignmentPayload } from "../../types/payload.types";
import { handleApiRequest } from "../../utils/apiRequest";
import axiosInstance from "../services/axiosInstance";

class AssignmentController {
    public async insertAssignment(sessionPayload: IAssignmentPayload): Promise<any> {
        const response = await handleApiRequest<any>(() => axiosInstance.post("/assignments", sessionPayload));
        return response;
    }

    public async getAssignmentById(assignmentId: string): Promise<any> {
        const response = await handleApiRequest<any>(() =>
            axiosInstance.get(`/assignments/${assignmentId}`)
        );
        return response;
    }

}

const assignmentController = new AssignmentController();
export default assignmentController;