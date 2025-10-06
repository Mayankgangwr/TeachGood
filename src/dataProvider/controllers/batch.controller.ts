import type { IAssignSubjectToBatchPayload, IBatchPayload } from "../../types/payload.types";
import type { IBatchResponse, ListData } from "../../types/response.types";
import { handleApiRequest } from "../../utils/apiRequest";
import axiosInstance from "../services/axiosInstance";

class BatchController {
    // Create a new batch
    public async insertBatch(batchPayload: IBatchPayload) {
        return await handleApiRequest<IBatchResponse>(
            () => axiosInstance.post("/batches", batchPayload)
        );
    }

    // Update an existing batch
    public async updateBatch(batchId: string, batchPayload: IBatchPayload) {
        return await handleApiRequest<IBatchResponse>(
            () => axiosInstance.patch(`/batches/${batchId}`, batchPayload)
        );
    }

    // Get batch by ID
    public async getBatchById(batchId: string) {
        return await handleApiRequest<IBatchResponse>(
            () => axiosInstance.get(`/batches/${batchId}`)
        );
    }

    // Get all batches with optional query params
    public async getAllBatches(query?: Record<string, any>) {
        return await handleApiRequest<ListData<IBatchResponse[]>>(
            () => axiosInstance.get("/batches", { params: query })
        );
    }

    // Soft delete a batch
    public async deleteBatch(batchId: string) {
        return await handleApiRequest<IBatchResponse>(
            () => axiosInstance.delete(`/batches/${batchId}`)
        );
    }

    // Hard delete a batch
    public async hardDeleteBatch(batchId: string) {
        return await handleApiRequest<IBatchResponse>(
            () => axiosInstance.delete(`/batches/${batchId}/hard`)
        );
    }

    // Assign subjects on existing batch
    public async assignSubjectsOnBatch(batchId: string, batchPayload: IAssignSubjectToBatchPayload[]) {
        return await handleApiRequest<IBatchResponse>(
            () => axiosInstance.patch(`/batches/assign-subjects/${batchId}`, batchPayload)
        );
    }
}

const batchController = new BatchController();
export default batchController;
