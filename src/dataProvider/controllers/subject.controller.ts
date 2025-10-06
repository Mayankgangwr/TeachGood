import type { ISubjectResponse, ListData } from "../../types/response.types";
import { handleApiRequest } from "../../utils/apiRequest";
import axiosInstance from "../services/axiosInstance";

class SubjectController {
    async insertSubject(subjectPayload: any): Promise<ISubjectResponse> {
        const response = await handleApiRequest<ISubjectResponse>(() =>
            axiosInstance.post(`/subjects`, subjectPayload)
        );
        return response;
    }

    async updateSubject(subjectId: string, subjectPayload: any): Promise<ISubjectResponse> {
        const response = await handleApiRequest<ISubjectResponse>(() =>
            axiosInstance.patch(`/subjects/${subjectId}`, subjectPayload)
        );
        return response;
    }

    async getSubjectList(query: Record<string, any>): Promise<ListData<ISubjectResponse[]>> {
        const response = await handleApiRequest<ListData<ISubjectResponse[]>>(() =>
            axiosInstance.get("/subjects", {
                params: query,
            })
        );
        return response;
    }

    async getSubjectById(subjectId: string): Promise<ISubjectResponse> {
        const response = await handleApiRequest<ISubjectResponse>(() =>
            axiosInstance.get(`/subjects/${subjectId}`)
        );
        return response;
    }

    async deleteSubject(subjectId: string): Promise<boolean> {
        const response = await handleApiRequest<boolean>(() =>
            axiosInstance.delete(`/subjects/${subjectId}`)
        );
        return response;
    }

    async hardDeleteSubject(subjectId: string): Promise<boolean> {
        const response = await handleApiRequest<boolean>(() =>
            axiosInstance.delete(`/subjects/${subjectId}/hard`)
        );
        return response;
    }
}

const subjectController = new SubjectController();
export default subjectController;
