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

export interface IUpdatePayload<T>{
    id: string,
    data: T
}