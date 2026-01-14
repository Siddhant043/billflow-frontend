import api from "./config";
import { AUTH_API_URL } from "./config";

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export const login = async (data: LoginRequest) => {
  const response = await api.post(`${AUTH_API_URL}/login`, data);
  const loginResponse = {
    accessToken: response.data.access_token,
    refreshToken: response.data.refresh_token,
  };
  return loginResponse;
};

export const register = async (data: RegisterRequest) => {
  const response = await api.post(`${AUTH_API_URL}/register`, data);
  return response.data;
};
