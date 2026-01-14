import { useMutation } from "@tanstack/react-query";
import { login, register, type LoginRequest, type RegisterRequest } from "@/api/auth";

export type { LoginRequest, RegisterRequest };

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export const useLogin = () => {
    return useMutation({
        mutationFn: (data: LoginRequest) => login(data),
        onSuccess: (data: LoginResponse) => {
            window.localStorage.setItem("token", data.accessToken);
            if (data.refreshToken) {
                window.localStorage.setItem("refreshToken", data.refreshToken);
            }
        },
    });
};

export const useRegister = () => {
    return useMutation({
        mutationFn: (data: RegisterRequest) => register(data),
    });
};
