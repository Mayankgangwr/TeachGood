import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/auth.slice'
import uiReducer from "./features/ui/ui.slice";
import organizationReducer from "./features/organization/organization.slice";
import courseReducer from "./features/courses/courses.slice";
import departmentReducer from "./features/department/department.slice";
import classSessionReducer from "./features/class-session/class-session.slice";
import assignmentReducer from "./features/assignment/assignment.slice";
import batchReducer from "./features/batch/batch.slice";
import subjectReducer from "./features/subject/subject.slice"
import teacherReducer from "./features/teacher/teacher.slice";
import studentReducer from "./features/student/student.slice";
import enrollmentReducer from "./features/enrollment/enrollment.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        organization: organizationReducer,
        course: courseReducer,
        departments: departmentReducer,
        classSession: classSessionReducer,
        assignment: assignmentReducer,
        batch: batchReducer,
        subject: subjectReducer,
        teachers: teacherReducer,
        students: studentReducer,
        enrollments: enrollmentReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
