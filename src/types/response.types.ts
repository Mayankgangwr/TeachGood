// types/api.types.ts

import type { AxiosResponse } from "axios";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    username: string;
    phone: string;
    profileImage: string;
    role: string;
    batchIds: string[];
    isLoggedIn: boolean;
    status: boolean;
    isDelete: boolean;
    lastLoginAt: string;
    refreshToken: string;
    updatedAt: string;
}

export interface IAuthData {
    user: IUser;
    accessToken: string;
    refreshToken: string;
}

export interface IAuthToken {
    accessToken: string;
    refreshToken: string;
}

export interface IApiResponse<T = any> {
    statusCode: number;
    status: boolean;
    data: T;
    message?: string;
}

export type ApiResult<T> = Promise<AxiosResponse<IApiResponse<T>>>;
