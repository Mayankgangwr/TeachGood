import { createSlice } from "@reduxjs/toolkit";
import {
    getStudents,
    upsertStudent,
    deleteStudent,
    hardDeleteStudent,
} from "./student.action";
import { showToast } from "../../components/Toaster";
import type { IStudentResponse } from "../../types/response.types";

interface IStudentsState {
    isLoading: boolean;
    records: IStudentResponse[];
    total: number;
}

const initialState: IStudentsState = {
    isLoading: false,
    records: [],
    total: 0,
};

const students = createSlice({
    name: "students",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 🔹 Get Student List
            .addCase(getStudents.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getStudents.fulfilled, (state, action) => {
                const { records, total } = action.payload;
                state.records = records;
                state.total = total;
                state.isLoading = false;
            })
            .addCase(getStudents.rejected, (state, action) => {
                state.isLoading = false;
                showToast(action.error.message || "Students list fetch failed", "error");
            })

            // 🔹 Update/Upsert Student
            .addCase(upsertStudent.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(upsertStudent.fulfilled, (state, action) => {
                const updated = action.payload;
                const index = state.records.findIndex((s) => s._id === updated._id);
                if (index !== -1) {
                    state.records[index] = updated;
                } else {
                    state.records.unshift(updated); // if new, insert at top
                    state.total += 1;
                }
                state.isLoading = false;
                showToast("Student saved successfully", "success");
            })
            .addCase(upsertStudent.rejected, (_state, action) => {
                showToast(action.error.message || "Failed to update student", "error");
            })

            // 🔹 Delete Student (soft)
            .addCase(deleteStudent.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                const studentId = action.meta.arg; // deleteStudent(studentId)
                state.records = state.records.filter((s) => s._id !== studentId);
                state.total -= 1;
                state.isLoading = false;
                showToast("Student deleted successfully", "success");
            })
            .addCase(deleteStudent.rejected, (_state, action) => {
                showToast(action.error.message || "Failed to delete student", "error");
            })

            // 🔹 Hard Delete Student
            .addCase(hardDeleteStudent.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(hardDeleteStudent.fulfilled, (state, action) => {
                const studentId = action.meta.arg; // hardDeleteStudent(studentId)
                state.records = state.records.filter((s) => s._id !== studentId);
                state.total -= 1;
                state.isLoading = false;
                showToast("Student permanently deleted", "success");
            })
            .addCase(hardDeleteStudent.rejected, (_state, action) => {
                showToast(action.error.message || "Failed to hard delete student", "error");
            });
    },
});

export default students.reducer;
