export const UserRoles = {
    SuperAdmin: 'SuperAdmin',
    TenantAdmin: 'TenantAdmin',
    BranchManager: 'BranchManager',
    Teacher: 'Teacher',
    Student: 'Student',
} as const;


export const Roles = ["SuperAdmin", "TenantAdmin", "BranchManager", "Teacher", "Student"] as const;

export type Role = (typeof UserRoles)[keyof typeof UserRoles];
