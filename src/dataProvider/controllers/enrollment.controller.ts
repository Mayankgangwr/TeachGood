import type { IEnrollmentResponse, ListData } from "../../types/response.types";
import { handleApiRequest } from "../../utils/apiRequest";
import axiosInstance from "../services/axiosInstance";

class EnrollmentController {
    // Get enrollment by ID
    public async getEnrollmentById(enrollmentId: string) {
        return await handleApiRequest<IEnrollmentResponse>(
            () => axiosInstance.get(`/enrollments/${enrollmentId}`)
        );
    }

    // Get all enrollments with optional query params
    public async getAllEnrollments(query?: Record<string, IEnrollmentResponse>) {
        return await handleApiRequest<ListData<IEnrollmentResponse[]>>(
            () => axiosInstance.get("/enrollments", { params: query })
        );
    }

    // Soft delete an enrollment
    public async deleteEnrollment(enrollmentId: string) {
        return await handleApiRequest<boolean>(
            () => axiosInstance.delete(`/enrollments/${enrollmentId}`)
        );
    }

    // Hard delete an enrollment
    public async hardDeleteEnrollment(enrollmentId: string) {
        return await handleApiRequest<boolean>(
            () => axiosInstance.delete(`/enrollments/${enrollmentId}/hard`)
        );
    }
}

const enrollmentController = new EnrollmentController();
export default enrollmentController;
