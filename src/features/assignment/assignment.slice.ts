import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getAssignmentById, getAssignments, submitAssignment } from "./assignment.action";

interface IAssignmentState {
  currentAssignment: any;
  assignments: any[];
  submittedAssignment: any;
  loading: boolean;
  isAddAssignmentDialogOpen: boolean;
  isSubmitAssignmentDialogOpen: boolean;
}

const initialState: IAssignmentState = {
  currentAssignment: null,
  assignments: [],
  submittedAssignment: null,
  loading: false,
  isAddAssignmentDialogOpen: false,
  isSubmitAssignmentDialogOpen: false,
};

const assignment = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    // Open/close Add Assignment Form
    toggleAddAssignmentDialog: (state, action: PayloadAction<boolean>) => {
      state.isAddAssignmentDialogOpen = action.payload;
    },
    // Open/close Submit Assignment Form
    toggleSubmitAssignmentDialog: (state, action: PayloadAction<boolean>) => {

      state.isSubmitAssignmentDialogOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAssignmentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAssignmentById.fulfilled, (state, action) => {
        const { submittedAssignment, ...rest } = action.payload;
        state.currentAssignment = rest;
        state.submittedAssignment = submittedAssignment || null;
        state.loading = false;
      });

    builder
      .addCase(getAssignments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAssignments.fulfilled, (state, action) => {
        state.assignments = action.payload;
        state.loading = false;
      })
      .addCase(getAssignments.rejected, (state) => {
        state.loading = false;
      });;

    builder
      .addCase(submitAssignment.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitAssignment.fulfilled, (state, action) => {
        state.submittedAssignment = action.payload;
        state.loading = false;
      });

  },
});

export const {
  toggleAddAssignmentDialog,
  toggleSubmitAssignmentDialog,
} = assignment.actions;

export default assignment.reducer;
