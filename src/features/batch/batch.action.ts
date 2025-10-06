import batchController from "../../dataProvider/controllers/batch.controller";
import type { IAssignSubjectToBatchPayload, IBatchPayload, IUpdatePayload } from "../../types/payload.types";
import { createReduxThunk } from "../../utils/createAsyncThunkWithLoader";

// Create a new batch
export const insertBatch = createReduxThunk<any, IBatchPayload>(
    'batches/insert-batch',
    async (payload) => await batchController.insertBatch(payload)
);

// Update an existing batch
export const updateBatch = createReduxThunk<any, IUpdatePayload<IBatchPayload>>(
    'batches/update-batch',
    async ({ id, data }) => await batchController.updateBatch(id, data)
);

// Get batch by ID
export const getBatchById = createReduxThunk<any, string>(
    'batches/batchById',
    async (batchId) => await batchController.getBatchById(batchId)
);

// Get all batches with optional query
export const getAllBatches = createReduxThunk<any, Record<string, any> | undefined>(
    'batches/list',
    async (query) => await batchController.getAllBatches(query)
);

// Soft delete a batch
export const deleteBatch = createReduxThunk<any, string>(
    'batches/delete',
    async (batchId) => await batchController.deleteBatch(batchId)
);

// Hard delete a batch
export const hardDeleteBatch = createReduxThunk<any, string>(
    'batches/hard-delete',
    async (batchId) => await batchController.hardDeleteBatch(batchId)
);

// Assign subjects on existing batch
export const assignSubjectsOnBatch = createReduxThunk<any, IUpdatePayload<IAssignSubjectToBatchPayload[]>>(
    'batches/assign-subjects',
    async ({ id, data }) => await batchController.assignSubjectsOnBatch(id, data)
);
