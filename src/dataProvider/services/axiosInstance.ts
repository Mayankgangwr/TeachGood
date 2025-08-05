import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import authController from '../controllers/auth.controller';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: `http://localhost:3000/api/v1`,
    withCredentials: true, // Ensure cookies (access and refresh token) are sent with request.
    headers: {
        "Content-Type": 'application/json', // Set default content type
    },
});

// Set Authorization header for every request if accesstoken exists
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const accesstoken = localStorage.getItem('accessToken');
        if (accesstoken) {
            config.headers['Authorization'] = `Bearer ${accesstoken}`; // Set authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);


// Interceptor to handle token expiration and refreshing
axiosInstance.interceptors.response.use(
    (response) => response, // if response is successfull, so return it
    async (error) => {
        const originalRequest = error.config;

        // Checkif the error is due to an expired access token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark th request as retried

            try {
                // Attempt to refresh the token using AuthController
                const refreshToken = localStorage.getItem('refreshToken')
                const { accessToken, refreshToken: newRefreshToken } =
                    refreshToken ? await authController.refreshToken(refreshToken)
                        : await authController.refreshToken();

                // Store the new tokens in localStorage
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', newRefreshToken);

                // Update th original request headers with the new accesstoken
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                // Retry the original request with the updated toekn
                return axiosInstance(originalRequest);

            } catch (refreshError) {
                // If refreshing token fails, log the user out
                authController.logout();
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error) // If it's not a 401 error, so reject the promise
    }
)


export default axiosInstance;