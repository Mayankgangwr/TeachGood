import type { Role } from "../constants";
import type { CurrencyNames, ISubject } from "./comman.types";

export interface IAuthPayload {
    email: string;
    password: string;
}

export interface IUserRegisterPayload {
    name: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    avatar?: string;
    role: Role;
}

export interface IOrganizationPayload {
    _id?: string;
    name: string;
    logoImage: string
    email: string;
    contactPhone: string;
    address: string;
    domain: string;
    status?: boolean;
    isDeleted?: boolean;
}

export interface IDepartmentPayload {
    name: string;
    description: string;
}

export interface IClassSessionPayload {
    batchId: string;
    subjectId: string;
    title: string;
    startTime: string;
    endTime: string;
    isLive: boolean;
    streamLink: string;
}

export interface IUpdatePayload<T> {
    id: string,
    data: T
}

export interface IAssignmentPayload {
    batchId: string;
    subjectId: string;
    title: string;
    description: string;
    instructions?: string;
    attachments?: string[];
    githubTemplateUrl?: string;
    dueDate: Date;
    maxGrade?: number;
    createdBy: string;
    allowLateSubmission?: boolean;
    latePenaltyPercentage?: number;
}


export interface IBatchPayload {
    courseId: string;
    name: string;
    schedule: Date;
    maxCapacity: number;
    fee: {
        amount: number;
        currency: CurrencyNames;
    };
    duration: number; // duration in months e.g 12 means 12 months
    accessibility: number;  // duration in months e.g 12 means 12 months
}

export interface ISubjectPayload {
    name: string;
    description?: string;
    duration?: number; // total teaching hours
}

export interface IAssignSubjectToBatchPayload {
    teacherId: string
    subjectId: string;
    name: string;
    order: number;
    mandatory: boolean
}

export interface ICoursePayload {
    departmentId: string;
    name: string;
    description: string;
    level: string;
    duration: string;
    bannerImage: string;
}
