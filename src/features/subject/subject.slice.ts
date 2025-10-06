import { createSlice } from "@reduxjs/toolkit";
import {
    getSubjects,
    insertSubject,
    updateSubject,
    deleteSubject,
    hardDeleteSubject,
} from "./subject.action";
import { showToast } from "../../components/Toaster";
import type { ISubjectResponse } from "../../types/response.types";


interface ISubjectsState {
    isLoading: boolean;
    subjects: ISubjectResponse[];
    total: number;
}

const initialState: ISubjectsState = {
    isLoading: false,
    subjects: [],
    total: 0,
};

const subjects = createSlice({
    name: "subjects",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 🔹 Get Subject List
            .addCase(getSubjects.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSubjects.fulfilled, (state, action) => {
                const { records, total } = action.payload;
                state.subjects = records;
                state.total = total;
                state.isLoading = false;
            })
            .addCase(getSubjects.rejected, (state, action) => {
                state.isLoading = false;
                showToast(action.error.message || "Subjects list fetch failed", "error");
            })

            // 🔹 Insert Subject
            .addCase(insertSubject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(insertSubject.fulfilled, (state, action) => {
                state.subjects.push(action.payload);
                state.total += 1;
                state.isLoading = false;
                showToast("Subject added successfully", "success");
            })
            .addCase(insertSubject.rejected, (state, action) => {
                state.isLoading = false;
                showToast(action.error.message || "Failed to add subject", "error");
            })

            // 🔹 Update Subject
            .addCase(updateSubject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateSubject.fulfilled, (state, action) => {
                const updated = action.payload;
                const index = state.subjects.findIndex(subject => subject._id === updated._id);
                if (index !== -1) state.subjects[index] = updated;
                state.isLoading = false;
                showToast("Subject updated successfully", "success");
            })
            .addCase(updateSubject.rejected, (_state, action) => {
                showToast(action.error.message || "Failed to update subject", "error");
            })

            // 🔹 Delete Subject (soft)
            .addCase(deleteSubject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteSubject.fulfilled, (state, action) => {
                const subjectId = action.meta.arg; // deleteSubject(subjectId)
                state.subjects = state.subjects.filter((s) => s._id !== subjectId);
                state.total -= 1;
                state.isLoading = false;
                showToast("Subject deleted successfully", "success");
            })
            .addCase(deleteSubject.rejected, (_state, action) => {
                showToast(action.error.message || "Failed to delete subject", "error");
            })

            // 🔹 Hard Delete Subject
            .addCase(hardDeleteSubject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(hardDeleteSubject.fulfilled, (state, action) => {
                const subjectId = action.meta.arg; // hardDeleteSubject(subjectId)
                state.subjects = state.subjects.filter((s) => s._id !== subjectId);
                state.total -= 1;
                state.isLoading = false;
                showToast("Subject permanently deleted", "success");
            })
            .addCase(hardDeleteSubject.rejected, (_state, action) => {
                showToast(action.error.message || "Failed to hard delete subject", "error");
            });
    },
});

export default subjects.reducer;
