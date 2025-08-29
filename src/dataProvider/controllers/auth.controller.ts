// services/AuthController.ts
import axios, { type AxiosInstance } from "axios";
import { handleApiRequest } from "../../utils/apiRequest";
import type { IAuthPayload } from "../../types/payload.types";
import type { IAuthData, IAuthToken, IUser } from "../../types/response.types";

export class AuthController {
    private axiosInstance: AxiosInstance;

    constructor(apiURL: string) {
        this.axiosInstance = axios.create({
            baseURL: apiURL,
            withCredentials: true,
        });
    }

    async login(authPayload: IAuthPayload): Promise<IAuthData> {
        const data = await handleApiRequest<IAuthData>(() =>
            this.axiosInstance.post("/users/login", authPayload)
        );

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        return data;
    }

    async refreshToken(refreshToken?: string): Promise<IAuthToken> {
        return await handleApiRequest<IAuthToken>(() =>
            this.axiosInstance.post("/users/refresh-token", { refreshToken })
        );
    }

    async logout(): Promise<void> {
        try {
            await this.axiosInstance.post("/users/logout");
        } catch (error) {
            console.warn("Logout failed:", error);
        } finally {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }
    }

}

const apiURL = `http://localhost:3000/api/v1`;
const authController = new AuthController(apiURL);
export default authController;
