import authController from '../../dataProvider/controllers/auth.controller'
import type { IAuthData, IUser } from '../../types/response.types'
import type { IAuthPayload } from '../../types/payload.types'
import { createReduxThunk, createReduxThunkNoArg } from '../../utils/createAsyncThunkWithLoader';
import assignmentController from '../../dataProvider/controllers/assignment.controller';

export const loginUser = createReduxThunk<IAuthData, IAuthPayload>(
    'auth/login',
    async (payload) => await authController.login(payload)
);

export const currentUser = createReduxThunkNoArg<IUser>(
    'auth/current-user',
    async () => await assignmentController.currentUser()
);


export const logoutUser = createReduxThunkNoArg(
    'auth/logout',
    async () => await authController.logout()
);
