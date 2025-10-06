// types/api.types.ts

import type { AxiosResponse } from "axios";
import type { CurrencyNames, EnrollmentStatus, IFee } from "./comman.types";

export interface IUser {
    _id: string;
    tenantId: string;
    name: string;
    email: string;
    username: string;
    phone: string;
    profileImage: string;
    role: string;
    batchIds: string[];
    isLoggedIn: boolean;
    status: boolean;
    isDeleted: boolean;
    isVerified: boolean;
    lastLoginAt: string;
    refreshToken: string;
    updatedAt: string;
}

export interface IAuthData {
    user: IUser;
    accessToken: string;
    refreshToken: string;
    url: string;
}

export interface IAuthToken {
    accessToken: string;
    refreshToken: string;
}

export interface ListData<T> {
    records: T;
    total: number;
}
export interface IApiResponse<T = any> {
    statusCode: number;
    status: boolean;
    data: T;
    message?: string;
}

export type ApiResult<T> = Promise<AxiosResponse<IApiResponse<T>>>;

export interface IOrganizationResponse {
    _id: string;
    name: string;
    logo: string;
    email: string;
    contactPhone: string;
    address: string;
    domain: string;
    status: boolean;
    isDeleted: boolean;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}

export interface IDepartmentResponse {
    _id: string;
    name: string;
    description: string;
    status: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IClassSessionResponse {
    _id: string;
    tenantId: string;
    subjectId: string;
    title: string;
    startTime: string;
    endTime: string;
    streamLink: string;
    isLive: boolean;
    createdAt: Date;
    updatedAt: Date;
    batch: {
        _id: string;
        name: string;
    }
    teacher: {
        _id: string;
        name: string;
    }
}

export interface IClassSessionPayload {
    tenantId: string;
    batchId: string;
    subjectId: string;
    teacherId: string;
}



// Batch Reposne
export interface IOrganization {
    _id: string;
    name: string;
    email: string;
    status: boolean;
}

export interface ICourse {
    _id: string;
    name: string;
    description: string;
    category: string;
    level: string;
    duration: string;
    imageUrl: string;
    fee: number;
    status: boolean;
    isDelete: boolean;
}

export interface IBranch {
    _id: string;
    name: string;
    location: string;
    contactEmail: string;
    phoneNumber: string;
    timeZone: string;
    isMainBranch: boolean;
    holidays: string[];   // ISO date strings
    weeklyOff: string[];  // e.g., ["Saturday", "Sunday"]
}

export interface ITeacher {
    _id: string;
    name: string;
    email: string;
    qualification: string;
    specialization: string[];
    experience: string;
    certifications: string[];
    joinedAt: string; // ISO date
}

export interface IBatchResponse {
    _id: string;
    name: string;
    schedule: string;
    maxCapacity: number;
    remainingSheets: number;
    course: {
        _id: string;
        name: string;
    };
    fee: {
        amount: number;
        currency: CurrencyNames;
    };
    duration: number; // duration in months e.g 12 means 12 months
    accessibility: number;  // duration in months e.g 12 means 12 months
    status: boolean;
    isDeleted: boolean;
    subjects: {
        _id: string;
        name: string;
        order: number;
        mandatory: boolean;
        teacher: {
            _id: string;
            name: string;
            avatar: string;
        }
    }[];
    createdAt: string;
    updatedAt: string;
}

export interface IEnrollmentResponse {
    _id: string;
    fee: IFee;
    status: EnrollmentStatus;
    enrolledAt: string;
    student: {
        _id: string;
        name: string;
    };
    batch: {
        _id: string;
        name: string;
    };
}

export interface ISubjectResponse {
    _id: string;
    name: string;
    description?: string;
    duration?: number;
    status: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ITeacherResponse {
    _id: string;
    name: string;
    email: string;
    role: string;
    phone: string;
    avatar: string;
    experience: number;
    expertise: {
        _id: string,
        name: string,
        description: string
    }[];
    about: string;
    status: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IStudentResponse {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    avatar: string;
    admissionNumber?: string;
    dateOfAdmission?: Date;
    dateOfBirth?: Date;
    address?: string;
    enrollments: IEnrollmentResponse[];
    guardian?: {
        name: string;
        relation: string;
        phone: string;
        email?: string;
    };
    status: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IBatch {
    _id: string;
    schedule: string;
    maxCapacity: number;
    remainingSheets: number;
    isFull: boolean;
    teachers: ITeacher[];
}

export interface IBranch {
    _id: string;
    name: string;
    location: string;
    contactEmail: string;
    phoneNumber: string;
    timeZone: string;
    isMainBranch: boolean;
    holidays: string[];
    weeklyOff: string[];
    batches: IBatch[];
}

export interface ICourseResponse {
    _id: string;
    department: {
        _id: string;
        name: string;
    };
    name: string;
    description: string;
    level: string;
    duration: string;
    banner: string;
    status: boolean;
    isDelete: boolean;
}
