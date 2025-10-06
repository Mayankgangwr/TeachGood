import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
    getAllBatches,
    insertBatch,
    updateBatch,
    deleteBatch,
    hardDeleteBatch,
    assignSubjectsOnBatch
} from "./batch.action";
import type { IBatchResponse } from "../../types/response.types";

interface IBatchState {
    batches: IBatchResponse[];
    total: number;
    isLoading: boolean;
}

const initialState: IBatchState = {
    batches: [],
    total: 0,
    isLoading: false,
};

const batchSlice = createSlice({
    name: "batch",
    initialState,
    reducers: {
        resetBatches: (state) => {
            state.batches = [];
            state.total = 0;
        },
    },
    extraReducers: (builder) => {
        // Insert Batch
        builder
            .addCase(insertBatch.pending, (state) => { state.isLoading = true; })
            .addCase(insertBatch.fulfilled, (state, action: PayloadAction<IBatchResponse>) => {
                state.batches.push(action.payload);
                state.isLoading = false;
            })
            .addCase(insertBatch.rejected, (state) => { state.isLoading = false; });

        // Update Batch
        builder
            .addCase(updateBatch.pending, (state) => { state.isLoading = true; })
            .addCase(updateBatch.fulfilled, (state, action: PayloadAction<IBatchResponse>) => {
                const updated = action.payload;
                const index = state.batches.findIndex(batch => batch._id === updated._id);
                if (index !== -1) state.batches[index] = updated;
                state.isLoading = false;
            })
            .addCase(updateBatch.rejected, (state) => { state.isLoading = false; });

        // Get All Batches
        builder
            .addCase(getAllBatches.pending, (state) => { state.isLoading = true; })
            .addCase(getAllBatches.fulfilled, (state, action: PayloadAction<{ records: IBatchResponse[]; total: number }>) => {
                const { records, total } = action.payload;
                state.batches = records;
                state.total = total;
                state.isLoading = false;
            })
            .addCase(getAllBatches.rejected, (state) => { state.isLoading = false; });

        // Soft Delete Batch
        builder
            .addCase(deleteBatch.pending, (state) => { state.isLoading = true; })
            .addCase(deleteBatch.fulfilled, (state, action: PayloadAction<{ _id: string }>) => {
                state.batches = state.batches.filter(batch => batch._id !== action.payload._id);
                state.total -= 1;
                state.isLoading = false;
            })
            .addCase(deleteBatch.rejected, (state) => { state.isLoading = false; });

        // Hard Delete Batch
        builder
            .addCase(hardDeleteBatch.pending, (state) => { state.isLoading = true; })
            .addCase(hardDeleteBatch.fulfilled, (state, action: PayloadAction<{ _id: string }>) => {
                state.batches = state.batches.filter(batch => batch._id !== action.payload._id);
                state.total -= 1;
                state.isLoading = false;
            })
            .addCase(hardDeleteBatch.rejected, (state) => { state.isLoading = false; });

        // Assign subjects
        builder
            .addCase(assignSubjectsOnBatch.pending, (state) => { state.isLoading = true; })
            .addCase(assignSubjectsOnBatch.fulfilled, (state, action: PayloadAction<IBatchResponse>) => {
                const updated = action.payload;
                const index = state.batches.findIndex(batch => batch._id === updated._id);
                if (index !== -1) state.batches[index] = updated;
                state.isLoading = false;
            })
            .addCase(assignSubjectsOnBatch.rejected, (state) => { state.isLoading = false; });

    },
});

export const { resetBatches } = batchSlice.actions;
export default batchSlice.reducer;
