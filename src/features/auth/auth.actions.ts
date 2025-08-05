import authController from '../../dataProvider/controllers/auth.controller'
import type { IAuthData, IUser } from '../../types/response.types'
import type { IAuthPayload } from '../../types/payload.types'
import { createReduxThunk, createReduxThunkNoArg } from '../../utils/createAsyncThunkWithLoader';

export const loginUser = createReduxThunk<IAuthData, IAuthPayload>(
    'auth/login',
    async (payload) => await authController.login(payload)
);

export const currentUser = createReduxThunkNoArg<IUser>(
    'auth/current-user',
    async () => await authController.currentUser()
);


export const logoutUser = createReduxThunkNoArg(
    'auth/logout',
    async () => await authController.logout()
);
