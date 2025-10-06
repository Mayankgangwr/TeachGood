import teacherController from "../../dataProvider/controllers/teacher.controller";
import type { IUpdatePayload } from "../../types/payload.types";
import type { ITeacherResponse, ListData } from "../../types/response.types";
import { createReduxThunk } from "../../utils/createAsyncThunkWithLoader";

/**
 * Update teacher by ID
 */
export const upsertTeacher = createReduxThunk<ITeacherResponse, IUpdatePayload<any>>(
    "teachers/upsert",
    async ({ id, data }) => {
        const response = await teacherController.upsertTeacher(id, data);
        return response;
    }
);

/**
 * Get teacher list with filters/pagination
 */
export const getTeachers = createReduxThunk<ListData<ITeacherResponse[]>, Record<string, any>>(
    "teachers/list",
    async (query) => {
        const response = await teacherController.getTeacherList(query);
        return response;
    }
);

export const getTeacherById = createReduxThunk<ITeacherResponse, string>(
    "teachers/byid",
    async (id) => {
        const response = await teacherController.getTeacherById(id);
        return response;
    }
);

/**
 * Delete teacher (soft)
 */
export const deleteTeacher = createReduxThunk<boolean, string>(
    "teachers/delete",
    async (teacherId) => {
        const response = await teacherController.deleteTeacher(teacherId);
        return response;
    }
);

/**
 * Hard delete teacher (permanent)
 */
export const hardDeleteTeacher = createReduxThunk<boolean, string>(
    "teachers/hardDelete",
    async (teacherId) => {
        const response = await teacherController.hardDeleteTeacher(teacherId);
        return response;
    }
);
