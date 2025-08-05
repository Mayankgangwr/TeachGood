import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/auth.slice'
import uiReducer from "./features/ui/ui.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
