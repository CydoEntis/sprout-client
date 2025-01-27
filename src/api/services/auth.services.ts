import {
  AuthenticatedResponse,
  LoginRequest,
  RefreshTokensResponse,
  RegisterRequest,
} from "../../features/auth/shared/auth.types";
import apiClient from "../apiClient";
import endpoints from "../endpoints";

export const registerUser = async (
  credentials: RegisterRequest
): Promise<AuthenticatedResponse> => {
  const response = (
    await apiClient.post(`${endpoints.auth}/register`, credentials)
  ).data;
  if (!response.success) throw new Error(response.message);
  return response.data;
};

export const loginUser = async (
  credentials: LoginRequest
): Promise<AuthenticatedResponse> => {
  const response = (
    await apiClient.post(`${endpoints.auth}/login`, credentials)
  ).data;
  if (!response.success) throw new Error(response.message);
  return response.data;
};

export const refreshTokens = async (): Promise<RefreshTokensResponse> => {
  const response = (await apiClient.post(`${endpoints.auth}/refresh-tokens`)).data;
  console.log(response);
  if (!response.success) throw new Error(response.message);
  return response.data;
};
