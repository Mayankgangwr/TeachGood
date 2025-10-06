import { createSlice } from "@reduxjs/toolkit";
import {
    getTeachers,
    upsertTeacher,
    deleteTeacher,
    hardDeleteTeacher,
} from "./teacher.action";
import { showToast } from "../../components/Toaster";
import type { ITeacherResponse } from "../../types/response.types";

interface ITeachersState {
    isLoading: boolean;
    records: ITeacherResponse[];
    total: number;
}

const initialState: ITeachersState = {
    isLoading: false,
    records: [],
    total: 0,
};

const teachers = createSlice({
    name: "teachers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 🔹 Get Teacher List
            .addCase(getTeachers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTeachers.fulfilled, (state, action) => {
                const { records, total } = action.payload;
                state.records = records;
                state.total = total;
                state.isLoading = false;
            })
            .addCase(getTeachers.rejected, (state, action) => {
                state.isLoading = false;
                showToast(action.error.message || "Teachers list fetch failed", "error");
            })

            // 🔹 Update Teacher
            .addCase(upsertTeacher.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(upsertTeacher.fulfilled, (state, action) => {
                const updated = action.payload;
                const index = state.records.findIndex((t) => t._id === updated._id);
                if (index !== -1) state.records[index] = updated;
                state.isLoading = false;
                showToast("Teacher updated successfully", "success");
            })
            .addCase(upsertTeacher.rejected, (_state, action) => {
                showToast(action.error.message || "Failed to update teacher", "error");
            })

            // 🔹 Delete Teacher (soft)
            .addCase(deleteTeacher.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTeacher.fulfilled, (state, action) => {
                const teacherId = action.meta.arg; // deleteTeacher(teacherId)
                state.records = state.records.filter((t) => t._id !== teacherId);
                state.total -= 1;
                state.isLoading = false;
                showToast("Teacher deleted successfully", "success");
            })
            .addCase(deleteTeacher.rejected, (_state, action) => {
                showToast(action.error.message || "Failed to delete teacher", "error");
            })

            // 🔹 Hard Delete Teacher
            .addCase(hardDeleteTeacher.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(hardDeleteTeacher.fulfilled, (state, action) => {
                const teacherId = action.meta.arg; // hardDeleteTeacher(teacherId)
                state.records = state.records.filter((t) => t._id !== teacherId);
                state.total -= 1;
                state.isLoading = false;
                showToast("Teacher permanently deleted", "success");
            })
            .addCase(hardDeleteTeacher.rejected, (_state, action) => {
                showToast(action.error.message || "Failed to hard delete teacher", "error");
            });
    },
});

export default teachers.reducer;
