import departmentController from "../../dataProvider/controllers/department.controller";
import type { IDepartmentPayload, IUpdatePayload } from "../../types/payload.types";
import type { IDepartmentResponse, ListData } from "../../types/response.types";
import { createReduxThunk } from "../../utils/createAsyncThunkWithLoader";

// Insert Department
export const insertDepartment = createReduxThunk<IDepartmentResponse, IDepartmentPayload>(
  "departments/insert",
  async (payload) => {
    const response = await departmentController.insertDepartment(payload);
    return response;
  }
);

// Update Department
export const updateDepartment = createReduxThunk<IDepartmentResponse, IUpdatePayload<IDepartmentPayload>>(
  "departments/update",
  async ({ id, data }) => {
    const response = await departmentController.updateDepartment(id, data);
    return response;
  }
);

// Get Department List
export const getDepartments = createReduxThunk<ListData<IDepartmentResponse[]>, Record<string, any>>(
  "departments/list",
  async (query) => {
    const response = await departmentController.getDepartmentList(query);
    return response;
  }
);

// Delete Department (soft delete)
export const deleteDepartment = createReduxThunk<boolean, string>(
  "departments/delete",
  async (departmentId) => {
    const response = await departmentController.deleteDepartment(departmentId);
    return response;
  }
);

// Hard Delete Department
export const hardDeleteDepartment = createReduxThunk<boolean, string>(
  "departments/hardDelete",
  async (departmentId) => {
    const response = await departmentController.hardDeleteDepartment(departmentId);
    return response;
  }
);
