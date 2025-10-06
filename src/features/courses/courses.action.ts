import coursesController from "../../dataProvider/controllers/courses.controller";
import type { ICoursePayload, IUpdatePayload } from "../../types/payload.types";
import type { ICourseResponse, ListData } from "../../types/response.types";
import { createReduxThunk } from "../../utils/createAsyncThunkWithLoader";

export const insertCourse = createReduxThunk<ICourseResponse, any>(
    'courses/insert',
    async (payload) => {
        const response = await coursesController.insertCourse(payload);
        return response;
    }
);

export const updateCourse = createReduxThunk<any, IUpdatePayload<any>>(
    'courses/update',
    async ({ id, data }) => {
        const response = await coursesController.updateCourse(id, data);
        return response;
    }
);

export const getCourses = createReduxThunk<ListData<ICourseResponse[]>, Record<string, any>>(
    'courses/list',
    async (query) => {
        const response = await coursesController.getCourseList(query);
        return response;
    }
);

export const deleteCourse = createReduxThunk<boolean, string>(
    'courses/delete',
    async (courseId) => {
        const response = await coursesController.deleteCourse(courseId);
        return response;
    }
);

