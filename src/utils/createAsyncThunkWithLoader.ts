import { createAsyncThunk, type AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { setLoading } from '../features/ui/ui.slice';

export function createReduxThunk<Returned, ThunkArg = void>(
    typePrefix: string,
    payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg>
) {
    const wrappedPayloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg> = async (payload, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const result = await payloadCreator(payload, thunkAPI);
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.message || error?.message || 'Something went wrong'
            ) as any;
        } finally {
            thunkAPI.dispatch(setLoading(false));
        }
    };

    return createAsyncThunk<Returned, ThunkArg>(typePrefix, wrappedPayloadCreator);
}

export function createReduxThunkNoArg<Returned>(
    typePrefix: string,
    payloadCreator: AsyncThunkPayloadCreator<Returned>
) {
    const wrappedPayloadCreator: AsyncThunkPayloadCreator<Returned> = async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const result = await payloadCreator(_, thunkAPI);
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.message || error?.message || 'Something went wrong'
            ) as any;
        } finally {
            thunkAPI.dispatch(setLoading(false));
        }
    };

    return createAsyncThunk<Returned>(typePrefix, wrappedPayloadCreator);
}
