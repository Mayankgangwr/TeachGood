import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
    insertOrganization,
    updateOrganization,
    getOrganization,
    deleteOrganization,
} from "./organization.action";
import type { IOrganizationResponse } from "../../types/response.types";

interface IOrganizationState {
    isLoading: boolean;
    data: IOrganizationResponse | null; // single organization
}

const initialState: IOrganizationState = {
    isLoading: false,
    data: null,
};

const organizationSlice = createSlice({
    name: "organization",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Insert organization
        builder
            .addCase(insertOrganization.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(insertOrganization.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(insertOrganization.rejected, (state) => {
                state.isLoading = false;
            });

        // Update organization
        builder
            .addCase(updateOrganization.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateOrganization.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(updateOrganization.rejected, (state) => {
                state.isLoading = false;
            });

        // Get single organization
        builder
            .addCase(getOrganization.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrganization.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(getOrganization.rejected, (state) => {
                state.isLoading = false;
            });

        // Delete organization
        builder
            .addCase(deleteOrganization.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteOrganization.fulfilled, (state) => {
                state.data = null;
                state.isLoading = false;
            })
            .addCase(deleteOrganization.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { setLoading } = organizationSlice.actions;
export default organizationSlice.reducer;
