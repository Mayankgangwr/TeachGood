import assignmentController from "../../dataProvider/controllers/assignment.controller";
import type { IAssignmentPayload } from "../../types/payload.types";
import { createReduxThunk } from "../../utils/createAsyncThunkWithLoader";

export const insertAssignment = createReduxThunk<any, IAssignmentPayload>(
    'assignments/insert-assignment',
    async (payload) => await assignmentController.insertAssignment(payload)
);

export const getAssignmentById = createReduxThunk<any, string>(
    'assignments/assignmentById',
    async (assignmentId) => {
        const response = await assignmentController.getAssignmentById(assignmentId);
        return response;
    }
);

export const getAssignments = createReduxThunk<any>(
    'assignments/list',
    async () => {
        const response = await assignmentController.getAssignments();
        return response;
    }
);



export const submitAssignment = createReduxThunk<any, any>(
    'assignments/insert-assignment',
    async (payload) => await assignmentController.submitAssignment(payload)
);