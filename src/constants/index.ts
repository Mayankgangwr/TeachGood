export const UserRoles = {
    Admin: 'Admin',
    Teacher: 'Teacher',
    Student: 'Student',
} as const;


export const Roles = ["Admin", "Teacher", "Student"] as const;

export type Role = (typeof UserRoles)[keyof typeof UserRoles];


export const cklicence = 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NTYxNjYzOTksImp0aSI6ImNmNDhjZTliLTc0YjAtNDI3OS1hMzM2LTZlMTRjYzQ0ZmU2YSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjQ0M2JhNWI1In0.qUAz_YdZ2dTIUzYDv9v_USZG0z3xkpwCnVR5cpLc_Wb3sj_tq_f8SC_YkhSi7IJCFL-AtD5N-yzDyzOuASyAGw';