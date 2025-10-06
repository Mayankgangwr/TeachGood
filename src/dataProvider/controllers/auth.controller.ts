// services/AuthController.ts
import { handleApiRequest } from "../../utils/apiRequest";
import type { IAuthPayload, IUserRegisterPayload } from "../../types/payload.types";
import type { IAuthData, IAuthToken, IUser } from "../../types/response.types";
import axiosInstance from "../services/axiosInstance";
export class AuthController {
    async register(registerPayload: IUserRegisterPayload): Promise<IAuthData> {
        const data = await handleApiRequest<IAuthData>(() =>
            axiosInstance.post("/auth/register", registerPayload)
        );

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        return data;
    }

    async verifyEmail(token: string): Promise<IAuthData> {
        const data = await handleApiRequest<IAuthData>(() =>
            axiosInstance.get(`/auth/verify-email${token}`)
        );

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        return data;
    }

    async login(authPayload: IAuthPayload): Promise<IAuthData> {
        const data = await handleApiRequest<IAuthData>(() =>
            axiosInstance.post("/auth/login", authPayload)
        );

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        return data;
    }

    async refreshToken(refreshToken?: string): Promise<IAuthToken> {
        return await handleApiRequest<IAuthToken>(() =>
            axiosInstance.post("/auth/refresh-token", { refreshToken })
        );
    }

    async logout(): Promise<void> {
        try {
            await axiosInstance.post("/auth/logout");
        } catch (error) {
            console.warn("Logout failed:", error);
        } finally {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }
    }

    public async currentUser() {
        return await handleApiRequest<IUser>(() =>
            axiosInstance.get("/auth/me")
        );
    }
}

const authController = new AuthController();
export default authController;
