import studentController from "../../dataProvider/controllers/student.controller";
import type { IUpdatePayload } from "../../types/payload.types";
import type { IStudentResponse, ListData } from "../../types/response.types";
import { createReduxThunk } from "../../utils/createAsyncThunkWithLoader";

/**
 * Update student by ID
 */
export const upsertStudent = createReduxThunk<IStudentResponse, IUpdatePayload<any>>(
    "students/upsert",
    async ({ id, data }) => {
        const response = await studentController.upsertStudent(id, data);
        return response;
    }
);

/**
 * Get student list with filters/pagination
 */
export const getStudents = createReduxThunk<ListData<IStudentResponse[]>, Record<string, any>>(
    "students/list",
    async (query) => {
        const response = await studentController.getStudentList(query);
        return response;
    }
);


export const getStudentById = createReduxThunk<IStudentResponse, string>(
    "students/profile",
    async (id) => {
        const response = await studentController.getStudentById(id);
        return response;
    }
);

/**
 * Delete student (soft)
 */
export const deleteStudent = createReduxThunk<boolean, string>(
    "students/delete",
    async (studentId) => {
        const response = await studentController.deleteStudent(studentId);
        return response;
    }
);

/**
 * Hard delete student (permanent)
 */
export const hardDeleteStudent = createReduxThunk<boolean, string>(
    "students/hardDelete",
    async (studentId) => {
        const response = await studentController.hardDeleteStudent(studentId);
        return response;
    }
);
