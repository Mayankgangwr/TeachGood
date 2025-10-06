import type { ICourseResponse, ListData } from "../../types/response.types";
import { handleApiRequest } from "../../utils/apiRequest";
import axiosInstance from "../services/axiosInstance";

class CoursesController {
    async insertCourse(coursePayload: any): Promise<ICourseResponse> {
        const response = await handleApiRequest<ICourseResponse>(() =>
            axiosInstance.post(`/courses`, coursePayload,
                { headers: { "Content-Type": "multipart/form-data" } }
            )
        );
        return response;
    }

    async updateCourse(courseId: string, coursePayload: any): Promise<ICourseResponse> {
        const response = await handleApiRequest<ICourseResponse>(() =>
            axiosInstance.patch(`/courses/${courseId}`, coursePayload)
        ); return response;
    }

    async getCourseList(query: Record<string, any>): Promise<ListData<ICourseResponse[]>> {
        const response = await handleApiRequest<ListData<ICourseResponse[]>>(() =>
            axiosInstance.get("/courses", {
                params: query,
            })
        );
        return response;
    }

    async getCourseById(courseId: string): Promise<ICourseResponse> {
        const response = await handleApiRequest<ICourseResponse>(() => axiosInstance.get(`/courses/${courseId}`));
        return response;
    }

    async deleteCourse(courseId: string): Promise<boolean> {
        const response = await handleApiRequest<boolean>(() => axiosInstance.delete(`/courses/${courseId}`));
        return response;
    }
}

const coursesController = new CoursesController();
export default coursesController;
