import { createSlice } from "@reduxjs/toolkit";
import {
    getDepartments,
    insertDepartment,
    updateDepartment,
    deleteDepartment,
    hardDeleteDepartment
} from "./department.action";
import { showToast } from "../../components/Toaster";
import type { IDepartmentResponse } from "../../types/response.types";

interface IDepartmentState {
    isLoading: boolean;
    departments: IDepartmentResponse[];
    total: number;
}

const initialState: IDepartmentState = {
    isLoading: false,
    departments: [],
    total: 0,
};

const departmentSlice = createSlice({
    name: "departments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ✅ Get Departments
            .addCase(getDepartments.fulfilled, (state, action) => {
                const { records, total } = action.payload;
                state.departments = records;
                state.total = total;
            })
            .addCase(getDepartments.rejected, (_state, action) => {
                showToast(action.error.message || "Departments list fetch failed", "error");
            })

            // ✅ Insert Department
            .addCase(insertDepartment.fulfilled, (state, action) => {
                state.departments.push(action.payload);
                state.total += 1;
                showToast("Department added successfully", "success");
            })
            .addCase(insertDepartment.rejected, (_state, action) => {
                showToast(action.error.message || "Failed to add department", "error");
            })

            // ✅ Update Department
            .addCase(updateDepartment.fulfilled, (state, action) => {
                const updated = action.payload;
                const index = state.departments.findIndex((d) => d._id === updated._id);
                if (index !== -1) state.departments[index] = updated;
                showToast("Department updated successfully", "success");
            })
            .addCase(updateDepartment.rejected, (_state, action) => {
                showToast(action.error.message || "Failed to update department", "error");
            })

            // ✅ Delete Department (soft delete)
            .addCase(deleteDepartment.fulfilled, (state, action) => {
                const departmentId = action.meta.arg; 
                state.departments = state.departments.filter((d) => d._id !== departmentId);
                state.total -= 1;
                showToast("Department deleted successfully", "success");
            })
            .addCase(deleteDepartment.rejected, (_state, action) => {
                showToast(action.error.message || "Failed to delete department", "error");
            })

            // ✅ Hard Delete Department
            .addCase(hardDeleteDepartment.fulfilled, (state, action) => {
                const departmentId = action.meta.arg;
                state.departments = state.departments.filter((d) => d._id !== departmentId);
                state.total -= 1;
                showToast("Department permanently deleted", "success");
            })
            .addCase(hardDeleteDepartment.rejected, (_state, action) => {
                showToast(action.error.message || "Failed to permanently delete department", "error");
            });
    },
});

export default departmentSlice.reducer;
