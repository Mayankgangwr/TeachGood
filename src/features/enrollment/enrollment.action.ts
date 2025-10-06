import enrollmentController from "../../dataProvider/controllers/enrollment.controller";
import type {  IEnrollmentResponse, ListData } from "../../types/response.types";
import { createReduxThunk } from "../../utils/createAsyncThunkWithLoader";

/**
 * Get enrollment list with filters/pagination
 */
export const getEnrollments = createReduxThunk<ListData<IEnrollmentResponse[]>, Record<string, any>>(
    "enrollments/list",
    async (query) => {
        const response = await enrollmentController.getAllEnrollments(query);
        return response;
    }
);

/**
 * Get enrollment by ID
 */
export const getEnrollmentById = createReduxThunk<IEnrollmentResponse, string>(
    "enrollments/getById",
    async (enrollmentId) => {
        const response = await enrollmentController.getEnrollmentById(enrollmentId);
        return response;
    }
);

/**
 * Delete enrollment (soft)
 */
export const deleteEnrollment = createReduxThunk<boolean, string>(
    "enrollments/delete",
    async (enrollmentId) => {
        const response = await enrollmentController.deleteEnrollment(enrollmentId);
        return response;
    }
);

/**
 * Hard delete enrollment (permanent)
 */
export const hardDeleteEnrollment = createReduxThunk<boolean, string>(
    "enrollments/hardDelete",
    async (enrollmentId) => {
        const response = await enrollmentController.hardDeleteEnrollment(enrollmentId);
        return response;
    }
);
