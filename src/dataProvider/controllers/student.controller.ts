import type { IStudentResponse, ListData } from "../../types/response.types";
import { handleApiRequest } from "../../utils/apiRequest";
import axiosInstance from "../services/axiosInstance";

class StudentController {
    async upsertStudent(studentId: string, studentPayload: any): Promise<IStudentResponse> {
        const response = await handleApiRequest<IStudentResponse>(() =>
            axiosInstance.patch(`/students/${studentId}`, studentPayload)
        );
        return response;
    }

    async getStudentList(query: Record<string, any>): Promise<ListData<IStudentResponse[]>> {
        const response = await handleApiRequest<ListData<IStudentResponse[]>>(() =>
            axiosInstance.get("/students", {
                params: query,
            })
        );
        return response;
    }

    async getStudentById(studentId: string): Promise<IStudentResponse> {
        const response = await handleApiRequest<IStudentResponse>(() =>
            axiosInstance.get(`/students/${studentId}`)
        );
        return response;
    }

    async deleteStudent(studentId: string): Promise<boolean> {
        const response = await handleApiRequest<boolean>(() =>
            axiosInstance.delete(`/students/${studentId}`)
        );
        return response;
    }

    async hardDeleteStudent(studentId: string): Promise<boolean> {
        const response = await handleApiRequest<boolean>(() =>
            axiosInstance.delete(`/students/${studentId}/hard`)
        );
        return response;
    }
}

const studentController = new StudentController();
export default studentController;
