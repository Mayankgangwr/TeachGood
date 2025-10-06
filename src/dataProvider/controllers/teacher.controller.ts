import type { ITeacherResponse, ListData } from "../../types/response.types";
import { handleApiRequest } from "../../utils/apiRequest";
import axiosInstance from "../services/axiosInstance";

class TeacherController {
    async upsertTeacher(teacherId: string, teacherPayload: any): Promise<ITeacherResponse> {
        const response = await handleApiRequest<ITeacherResponse>(() =>
            axiosInstance.patch(`/teachers/${teacherId}`, teacherPayload)
        );
        return response;
    }

    async getTeacherList(query: Record<string, any>): Promise<ListData<ITeacherResponse[]>> {
        const response = await handleApiRequest<ListData<ITeacherResponse[]>>(() =>
            axiosInstance.get("/teachers", {
                params: query,
            })
        );
        return response;
    }

    async getTeacherById(teacherId: string): Promise<ITeacherResponse> {
        const response = await handleApiRequest<ITeacherResponse>(() =>
            axiosInstance.get(`/teachers/${teacherId}`)
        );
        return response;
    }

    async deleteTeacher(teacherId: string): Promise<boolean> {
        const response = await handleApiRequest<boolean>(() =>
            axiosInstance.delete(`/teachers/${teacherId}`)
        );
        return response;
    }

    async hardDeleteTeacher(teacherId: string): Promise<boolean> {
        const response = await handleApiRequest<boolean>(() =>
            axiosInstance.delete(`/teachers/${teacherId}/hard`)
        );
        return response;
    }
}

const teacherController = new TeacherController();
export default teacherController;
