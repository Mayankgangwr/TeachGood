import organizationsController from "../../dataProvider/controllers/organization.controller";
import type { IOrganizationResponse } from "../../types/response.types";
import type { IOrganizationPayload, IUpdatePayload } from "../../types/payload.types";
import { createReduxThunk } from "../../utils/createAsyncThunkWithLoader";

// Insert a new organization
export const insertOrganization = createReduxThunk<IOrganizationResponse, any>(
    'organization/insert',
    async (payload) => {
        const response = await organizationsController.insertOrganization(payload);
        return response;
    }
);

// Update an existing organization
export const updateOrganization = createReduxThunk<any, IUpdatePayload<any>>(
    'organization/update',
    async ({ id, data }) => {
        const response = await organizationsController.updateOrganization(id, data);
        return response;
    }
);

// Get paginated list of organizations
export const getOrganization = createReduxThunk<IOrganizationResponse>(
    'organization/one',
    async () => {
        const response = await organizationsController.getOrganization();
        return response;
    }
);

// Delete an organization
export const deleteOrganization = createReduxThunk<boolean, string>(
    'organizations/delete',
    async (orgId) => {
        const response = await organizationsController.deleteOrganization(orgId);
        return response;
    }
);
