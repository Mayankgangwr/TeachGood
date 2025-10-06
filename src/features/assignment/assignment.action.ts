import assignmentController from "../../dataProvider/controllers/assignment.controller";
import type { IAssignmentPayload, IUpdatePayload } from "../../types/payload.types";
import { createReduxThunk } from "../../utils/createAsyncThunkWithLoader";

export const insertAssignment = createReduxThunk<any, IAssignmentPayload>(
    'assignments/insert-assignment',
    async (payload) => await assignmentController.insertAssignment(payload)
);

export const updateAssignment = createReduxThunk<any, IUpdatePayload<IAssignmentPayload>>(
    'assignments/update-assignment',
    async ({ id, data }) => await assignmentController.updateAssignment(id, data)
);

export const getAssignmentById = createReduxThunk<any, string>(
    'assignments/assignmentById',
    async (assignmentId) => assignmentController.getAssignmentById(assignmentId)
);

export const getAssignments = createReduxThunk<any>(
    'assignments/list',
    async () => await assignmentController.getAssignments()
);



export const submitAssignment = createReduxThunk<any, any>(
    'assignments/submit-assignment',
    async (payload) => await assignmentController.submitAssignment(payload)
);