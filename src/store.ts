import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/auth.slice'
import uiReducer from "./features/ui/ui.slice";
import classSessionReducer from "./features/class-session/class-session.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        classSession: classSessionReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
