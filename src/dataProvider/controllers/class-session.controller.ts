// classes?studentId=6888ccd51efa01e0d5c14848
import type { IClassSessionPayload } from "../../types/payload.types";
import { handleApiRequest } from "../../utils/apiRequest";
import axiosInstance from "../services/axiosInstance";
class ClassSessionController {
    async insertClassSession(sessionPayload: IClassSessionPayload): Promise<any> {
        const response = await handleApiRequest<any>(() => axiosInstance.post("/classes", sessionPayload));
        return response;
    }

    async updateClassSession(classId: string, sessionPayload: any): Promise<any> {
        const response = await handleApiRequest<any>(() => axiosInstance.post("/classes", sessionPayload, {
            params: { classId },
        }));
        return response;
    }

    async getClassSessionList(query: Record<string, any>): Promise<any> {
        const response = await handleApiRequest<any>(() =>
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



}

const classSessionController = new ClassSessionController()
export default classSessionController;