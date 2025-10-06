import classSessionController from "../../dataProvider/controllers/class-session.controller";
import type { IClassSessionPayload, IUpdatePayload } from "../../types/payload.types";
import { createReduxThunk } from "../../utils/createAsyncThunkWithLoader";

export const insertClass = createReduxThunk<any, IClassSessionPayload>(
    'classes/insert-class',
    async (payload) => await classSessionController.insertClassSession(payload)
);

export const updateClass = createReduxThunk<any, IUpdatePayload<IClassSessionPayload>>(
    'classes/update-class',
    async ({ id, data }) => {
        const response = await classSessionController.updateClassSession(id, data);
        return response;
    }
);

export const getClasses = createReduxThunk<any, Record<string, any>>(
    'classes/list',
    async (query) => {
        const response = await classSessionController.getClassSessionList(query);
        return response;
    }
);

export const getClassById = createReduxThunk<any, string>(
    'classes/classbyid',
    async (classId) => {
        const response = await classSessionController.getClassSessionById(classId);
        return response;
    }
);

export const deleteClass = createReduxThunk<any, string>(
    'classes/delete',
    async (classId) => {
        const response = await classSessionController.deleteClass(classId);
        return response;
    }
);


