import { createSlice } from "@reduxjs/toolkit";
import {
    getEnrollments,
    getEnrollmentById,
    deleteEnrollment,
    hardDeleteEnrollment,
} from "./enrollment.action";
import { showToast } from "../../components/Toaster";
import type { IEnrollmentResponse } from "../../types/response.types";

interface IEnrollmentsState {
    isLoading: boolean;
    records: IEnrollmentResponse[];
    total: number;
    current?: IEnrollmentResponse | null; // when you need single enrollment detail
}

const initialState: IEnrollmentsState = {
    isLoading: false,
    records: [],
    total: 0,
    current: null,
};

const enrollments = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        clearCurrentEnrollment(state) {
            state.current = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // 🔹 Get Enrollment List
            .addCase(getEnrollments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEnrollments.fulfilled, (state, action) => {
                const { records, total } = action.payload;
                state.records = records;
                state.total = total;
                state.isLoading = false;
            })
            .addCase(getEnrollments.rejected, (state, action) => {
                state.isLoading = false;
                showToast(action.error.message || "Enrollments fetch failed", "error");
            })

            // 🔹 Get Enrollment by ID
            .addCase(getEnrollmentById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEnrollmentById.fulfilled, (state, action) => {
                state.current = action.payload;
                state.isLoading = false;
            })
            .addCase(getEnrollmentById.rejected, (state, action) => {
                state.isLoading = false;
                showToast(action.error.message || "Failed to fetch enrollment", "error");
            })

            // 🔹 Soft Delete Enrollment
            .addCase(deleteEnrollment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteEnrollment.fulfilled, (state, action) => {
                const enrollmentId = action.meta.arg;
                state.records = state.records.filter((e) => e._id !== enrollmentId);
                state.total -= 1;
                state.isLoading = false;
                showToast("Enrollment deleted successfully", "success");
            })
            .addCase(deleteEnrollment.rejected, (_state, action) => {
                showToast(action.error.message || "Failed to delete enrollment", "error");
            })

            // 🔹 Hard Delete Enrollment
            .addCase(hardDeleteEnrollment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(hardDeleteEnrollment.fulfilled, (state, action) => {
                const enrollmentId = action.meta.arg;
                state.records = state.records.filter((e) => e._id !== enrollmentId);
                state.total -= 1;
                state.isLoading = false;
                showToast("Enrollment permanently deleted", "success");
            })
            .addCase(hardDeleteEnrollment.rejected, (_state, action) => {
                showToast(action.error.message || "Failed to hard delete enrollment", "error");
            });
    },
});

export const { clearCurrentEnrollment } = enrollments.actions;
export default enrollments.reducer;
