import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getAssignmentById, getAssignments, insertAssignment, submitAssignment, updateAssignment } from "./assignment.action";

interface IAssignmentState {
  currentAssignment: any;
  records: any[];
  total: number;
  submittedAssignment: any;
  loading: boolean;
  isAddAssignmentDialogOpen: boolean;
  isSubmitAssignmentDialogOpen: boolean;
}

const initialState: IAssignmentState = {
  currentAssignment: null,
  records: [],
  total: 0,
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
      .addCase(insertAssignment.pending, (state) => {
        state.loading = true;
      })
      .addCase(insertAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.records.push(action.payload);
      })
      .addCase(insertAssignment.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(updateAssignment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAssignment.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.records.findIndex(assignment => assignment._id === updated._id);
        if (index !== -1) state.records[index] = updated;
      })
      .addCase(updateAssignment.rejected, (state) => {
        state.loading = false;
      });

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
        const { records, total } = action.payload;
        state.records = records;
        state.total = total
        state.loading = false;
      })
      .addCase(getAssignments.rejected, (state) => {
        state.loading = false;
      });;

    builder
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
