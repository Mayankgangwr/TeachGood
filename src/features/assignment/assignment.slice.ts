import { createSlice } from "@reduxjs/toolkit";
import { getAssignmentById } from "./assignment.action";


interface IAssignmentState {
    currentAssignment: any;
    assignments: any[];
    loading: boolean;
}

const initialState: IAssignmentState = {
    currentAssignment: null,
    assignments: [],
    loading: false
};

const assignment = createSlice({
    name: 'assignment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAssignmentById.pending, (state) => {
            state.loading = true;
        }).addCase(getAssignmentById.fulfilled, (state, action) => {
            state.currentAssignment = action.payload;
            state.loading = false;
        });
    }
});

export default assignment.reducer;