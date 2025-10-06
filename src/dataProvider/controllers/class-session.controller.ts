import type { IClassSessionPayload } from "../../types/payload.types";
import type { IClassSessionResponse } from "../../types/response.types";
import { handleApiRequest } from "../../utils/apiRequest";
import axiosInstance from "../services/axiosInstance";
class ClassSessionController {
    async insertClassSession(sessionPayload: IClassSessionPayload): Promise<any> {
        const response = await handleApiRequest<any>(() => axiosInstance.post("/classes", sessionPayload));
        return response;
    }

    async updateClassSession(classId: string, sessionPayload: any): Promise<any> {
        const response = await handleApiRequest<any>(() => axiosInstance.patch(`/classes/${classId}`, sessionPayload));
        return response;
    }

    async getClassSessionList(query: Record<string, any>) {
        const response = await handleApiRequest<IClassSessionResponse[]>(() =>
            axiosInstance.get("/classes", {
                params: query,
            })
        );
        return response;
    }

    async getClassSessionById(classId: string): Promise<any> {
        const response = await handleApiRequest<any>(() =>
            axiosInstance.get("/classes", {
                params: { classId },
            })
        );
        return response;
    }

    async deleteClass(classId: string): Promise<any> {
        const response = await handleApiRequest<any>(() => axiosInstance.delete(`/classes/${classId}`));
        return response;
    }



}

const classSessionController = new ClassSessionController()
export default classSessionController;