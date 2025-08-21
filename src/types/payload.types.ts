export interface IAuthPayload {
    email: string;
    password: string;
}

export interface IClassSessionPayload {
    tenantId: string;
    batchId: string;
    title: string;
    teacherId: string;
    startTime: Date;
    endTime: Date;
    isLive: boolean;
    streamLink: string;
}

export interface IUpdatePayload<T> {
    id: string,
    data: T
}

export interface IAssignmentPayload {
    tenantId: string;
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