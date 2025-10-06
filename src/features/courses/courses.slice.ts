import { createSlice } from "@reduxjs/toolkit";
import {
    getCourses,
    insertCourse,
    updateCourse,
    deleteCourse,
} from "./courses.action";
import { showToast } from "../../components/Toaster";
import type { ICourseResponse } from "../../types/response.types";

interface ICoursesState {
    isLoading: boolean;
    courses: ICourseResponse[];
    total: number;
}

const initialState: ICoursesState = {
    isLoading: false,
    courses: [],
    total: 0,
};

const courses = createSlice({
    name: "course",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 🔹 Get Course List
            .addCase(getCourses.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCourses.fulfilled, (state, action) => {
                const { records, total } = action.payload;
                state.courses = records;
                state.total = total;
                state.isLoading = false;
            })
            .addCase(getCourses.rejected, (state, action) => {
                state.isLoading = false;
                showToast(action.error.message || "Courses list fetch failed", "error");
            })

            // 🔹 Insert Course
            .addCase(insertCourse.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(insertCourse.fulfilled, (state, action) => {
                state.courses.push(action.payload);
                state.total += 1;
                state.isLoading = false;
                showToast("Course added successfully", "success");
            })
            .addCase(insertCourse.rejected, (state, action) => {
                state.isLoading = false;
                showToast(action.error.message || "Failed to add course", "error");
            })

            // 🔹 Update Course
            .addCase(updateCourse.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                const updated = action.payload;
                const index = state.courses.findIndex(course => course._id === updated._id);
                if (index !== -1) state.courses[index] = updated;
                state.isLoading = false;
                showToast("Course updated successfully", "success");
            })
            .addCase(updateCourse.rejected, (_state, action) => {
                showToast(action.error.message || "Failed to update course", "error");
            })

            // 🔹 Delete Course
            .addCase(deleteCourse.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                const courseId = action.meta.arg; // assuming deleteCourse(courseId)
                state.courses = state.courses.filter((c) => c._id !== courseId);
                state.total -= 1;
                state.isLoading = false;
                showToast("Course deleted successfully", "success");
            })
            .addCase(deleteCourse.rejected, (_state, action) => {
                showToast(action.error.message || "Failed to delete course", "error");
            });
    },
});

export default courses.reducer;
