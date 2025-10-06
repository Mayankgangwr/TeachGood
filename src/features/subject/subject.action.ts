import subjectController from "../../dataProvider/controllers/subject.controller";
import type { IUpdatePayload } from "../../types/payload.types";
import type { ISubjectResponse, ListData } from "../../types/response.types";
import { createReduxThunk } from "../../utils/createAsyncThunkWithLoader";

/**
 * Insert new subject
 */
export const insertSubject = createReduxThunk<ISubjectResponse, any>(
    "subjects/insert",
    async (payload) => {
        const response = await subjectController.insertSubject(payload);
        return response;
    }
);

/**
 * Update subject by ID
 */
export const updateSubject = createReduxThunk<ISubjectResponse, IUpdatePayload<any>>(
    "subjects/update",
    async ({ id, data }) => {
        const response = await subjectController.updateSubject(id, data);
        return response;
    }
);

/**
 * Get subject list with filters/pagination
 */
export const getSubjects = createReduxThunk<ListData<ISubjectResponse[]>, Record<string, any>>(
    "subjects/list",
    async (query) => {
        const response = await subjectController.getSubjectList(query);
        return response;
    }
);

/**
 * Delete subject (soft)
 */
export const deleteSubject = createReduxThunk<boolean, string>(
    "subjects/delete",
    async (subjectId) => {
        const response = await subjectController.deleteSubject(subjectId);
        return response;
    }
);

/**
 * Hard delete subject (permanent)
 */
export const hardDeleteSubject = createReduxThunk<boolean, string>(
    "subjects/hardDelete",
    async (subjectId) => {
        const response = await subjectController.hardDeleteSubject(subjectId);
        return response;
    }
);
