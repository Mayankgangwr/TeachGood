import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import authController from "../controllers/auth.controller";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: `http://localhost:3000/api/v1`,
    withCredentials: true, // Ensure cookies (access + refresh token) are sent
});

// ✅ Request Interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const accesstoken = localStorage.getItem("accessToken");

        if (accesstoken) {
            config.headers["Authorization"] = `Bearer ${accesstoken}`;
        }

        // ✅ Auto-detect Content-Type
        if (config.data instanceof FormData) {
            // Let browser set the correct multipart boundary
            delete config.headers["Content-Type"];
        } else {
            config.headers["Content-Type"] = "application/json";
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ Response Interceptor (Token Refresh)
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                const { accessToken, refreshToken: newRefreshToken } =
                    refreshToken
                        ? await authController.refreshToken(refreshToken)
                        : await authController.refreshToken();

                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", newRefreshToken);

                originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                authController.logout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
