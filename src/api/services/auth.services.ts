import { AuthenticatedResponse, RegisterRequest } from "../../features/auth/shared/auth.types"
import apiClient from "../apiClient"
import endpoints from "../endpoints"

export const registerUser = async (
    credentials: RegisterRequest
  ): Promise<AuthenticatedResponse> => {
    const response = (
      await apiClient.post(`${endpoints.auth}/register`, credentials)
    ).data;
    if (!response.success) throw new Error();
    return response.data;
  };